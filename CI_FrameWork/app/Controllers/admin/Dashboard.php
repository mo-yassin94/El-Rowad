<?php
namespace App\Controllers\admin;
use App\Models\admin\DashboardModel;
use CodeIgniter\Controller;
use App\Models\admin\AuthModel;

class Dashboard extends Controller {

    protected $db;
    protected $session;
    protected $helpers = ['url', 'form'];
    protected $adminModel;
    protected $dashboard;

    public function __construct()
    {
        $this->adminModel = new AuthModel();
        $this->dashboard=new DashboardModel();
        $this->session =  \Config\Services::session();
        if(!$this->adminModel->AUTH()){

            return redirect()->to(base_url('admin'));
        }


    }

	public function show()
	{

        if($this->adminModel->AUTH() == false){

            return redirect()->to(base_url('admin'));
        }

       $data = array(
            'title' => 'Admin panel || Dashboard',
            'css' => '',
            'js' => '',
            'script' => ''
        );

        echo view('admin/layout/header',$data);
        echo view('admin/layout/menu',$data);
        echo view('admin/dashboard');
        echo view('admin/layout/footer',$data);
	}
}
