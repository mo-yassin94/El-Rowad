<?php
namespace App\Controllers\admin;


use App\Models\admin\AuthModel;
use CodeIgniter\Controller;

class Login extends Controller {


    protected $session;
    protected $helpers = ['url', 'form'];
    protected $adminModel;

	public function __construct()
    {
        $this->adminModel = new AuthModel();

        $this->session =  \Config\Services::session();

    }
	public function index(){

       if($this->adminModel->AUTH()==true){
           return redirect()->to(base_url('admin/dashboard'));
       }else{
           self::Log_in();
           echo view('admin/login');
       }

	}
	
    public function Log_in(){

        $request = \Config\Services::request();
        $username=htmlentities($request->getPost('username'));
        $pass=htmlentities($request->getPost('password'));

        if($this->adminModel->login($username,$pass)>=1){

        	$id=$this->adminModel->get_auth_id($username);

            $Login_data = array(
                'logged_in' => TRUE,
                'session'   =>  $this->session->session_id,
                'ID'   => $id
            );

              $this->session->set($Login_data);
              $this->adminModel->update_session($id ,$this->session->session_id);
            return redirect()->to(base_url('admin/dashboard'));

        }else{

            return redirect()->to('./admin');
        }
           
        


    }



	public function logout(){



	
		$id=$this->session->get('ID');

        $this->adminModel->update_session($id,'');
        session_destroy();
        return redirect()->to('./admin');
             
	}
}
