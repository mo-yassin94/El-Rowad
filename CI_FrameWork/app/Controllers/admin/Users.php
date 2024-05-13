<?php

namespace App\Controllers\admin;


use App\Models\admin\AuthModel;
use App\Models\admin\UsersModel;
use CodeIgniter\Controller;

class Users extends Controller {
    protected $db;
    protected $session;
    protected $helpers = ['url', 'form'];
    protected $adminModel;
    protected $users;

    public function __construct()
    {

        $this->adminModel = new AuthModel();
        $this->users=new UsersModel();
        $this->session =  \Config\Services::session();
        if(!$this->adminModel->AUTH()){
            header('Location: '.base_url('admin'));
            exit();
        }
    }

	public function index()
	{


		$data['title']="Users";
		$data['css']='<link rel="stylesheet" href="'.base_url('assets/plugins/datatables/dataTables.bootstrap.css').'">';
		$data['js']='<script src="'.base_url('assets/plugins/datatables/jquery.dataTables.min.js').'"></script>
                    <script src="'.base_url('assets/plugins/datatables/dataTables.bootstrap.min.js').'"></script>';
		$data['script']='<script>
                    $(function () {
                        $("#example2").DataTable({
                            "paging": true,
                            "lengthChange": 5,
                            "searching": false,
                            "ordering": true,
                            "info": true,
                            "autoWidth": false
                        });
                    });
                </script>';

		echo view('admin/layout/header',$data);
		echo view('admin/layout/menu');
		echo view('admin/users/list',$data);
		echo view('admin/layout/footer',$data);
	}


	public function new_user(){
		$data['title']='New User';
	
		$data['css']='<!-- Select2 -->
    <link rel="stylesheet" href="'.base_url('assets/plugins/select2/select2.min.css').'">';
		$data['js']='';
		$data['script']='<script src="'.base_url('assets/dist/js/script.js').'"></script>';


		echo view('admin/layout/header',$data);
		echo view('admin/layout/menu');
		echo view('admin/users/new',$data);
		echo view('admin/layout/footer',$data);

	}


	public function add(){
        $validation =  \Config\Services::validation();
        $request = \Config\Services::request();


		$validation->setRule('name', 'Name', 'trim|required|min_length[5]',array(
			'required'      => 'You have not provided %s.',
			'min_length'    => 'Your %s is too short.',
			'[admins.name]'     => 'This %s already exists.'
		));
		$validation->setRule('user_name', 'User Name', 'trim|required|min_length[5]|is_unique[admins.user_name]');
		$validation->setRule('password', 'Password', 'trim|required|min_length[8]|callback_valid_password');
		$validation->setRule('user_photo_src', 'Avatar', 'trim|required');

		$name=$request->getPost('name');
		$user_name=$request->getPost('user_name');
		$avatar=$request->getPost('user_photo_src');
		$email=$request->getPost('email');
		$password=$request->getPost('password');




		if ($validation->run()) {
			$this->session->setFlashdata('error', $validation->getErrors());
            return redirect()->to(base_url('admin/users/new'));
		}else{

			$this->users->insert_user($name,$email,$avatar,$user_name,$password);
			$this->session->setFlashdata('success', "User Inserted Successfully");

            return redirect()->to(base_url('admin/users/new'));
		}



	}



	public function edit($id){
		
		$data['title']='New User';
		$data['id']=$id;
		$data['css']='<!-- Select2 -->
    <link rel="stylesheet" href="'.base_url('assets/plugins/select2/select2.min.css').'">';
		$data['js']='';
		$data['script']='<script src="'.base_url('assets/dist/js/script.js').'"></script>';


		echo view('admin/layout/header',$data);
		echo view('admin/layout/menu',$data);
		echo view('admin/users/edit',$data);
		echo view('admin/layout/footer',$data);

	}

	public function update($id)
	{
        $validation =  \Config\Services::validation();
        $request = \Config\Services::request();

		$validation->setRule('name', 'Name', 'trim|required|min_length[5]',array(
			'required'      => 'You have not provided %s.',
			'min_length'    => 'Your %s is too short.'

		));
		$validation->setRule('user_name', 'User Name', 'trim|required|min_length[5]');
		$validation->setRule('password', 'Password', 'trim|min_length[8]|callback_valid_password');
		$validation->setRule('user_photo_src', 'Avatar', 'trim|required');

		$name=$request->getPost('name');
		$user_name=$request->getPost('user_name');
		$avatar=$request->getPost('user_photo_src');
		$email=$request->getPost('email');
		$password=$request->getPost('password');





		if ($validation->run()) {
			$this->session->setFlashdata('error', $validation->getErrors());
            return redirect()->to(base_url('admin/users/edit/'.$id));
		}else{

			$this->users->update_user($id,$name,$email,$avatar,$user_name,$password);
			$this->session->setFlashdata('success', "User Updated Successfully");

            return redirect()->to(base_url('admin/users/edit/'.$id));
		}


	}

	public function delete($id)
	{
		$this->users->delete_user($id);
        return redirect()->to(base_url('admin/users'));

	}



	public function valid_password($password = '')
	{
	    $validation =  \Config\Services::validation();
        $request = \Config\Services::request();
		$password = trim($password);
		$regex_lowercase = '/[a-z]/';
		$regex_uppercase = '/[A-Z]/';
		$regex_number = '/[0-9]/';
		$regex_special = '/[!@#$%^&*()\-_=+{};:,<.>§~]/';
		if (empty($password))
		{
			$validation->set_message('valid_password', 'The {field} field is required.');
			return FALSE;
		}
		if (preg_match_all($regex_lowercase, $password) < 1)
		{
			$validation->set_message('valid_password', 'The {field} field must be at least one lowercase letter.');
			return FALSE;
		}
		if (preg_match_all($regex_uppercase, $password) < 1)
		{
			$validation->set_message('valid_password', 'The {field} field must be at least one uppercase letter.');
			return FALSE;
		}
		if (preg_match_all($regex_number, $password) < 1)
		{
			$validation->set_message('valid_password', 'The {field} field must have at least one number.');
			return FALSE;
		}
		if (preg_match_all($regex_special, $password) < 1)
		{
			$validation->set_message('valid_password', 'The {field} field must have at least one special character.' . ' ' . htmlentities('!@#$%^&*()\-_=+{};:,<.>§~'));
			return FALSE;
		}
		if (strlen($password) < 8)
		{
			$validation->set_message('valid_password', 'The {field} field must be at least 5 characters in length.');
			return FALSE;
		}
		if (strlen($password) > 32)
		{
			$validation->set_message('valid_password', 'The {field} field cannot exceed 32 characters in length.');
			return FALSE;
		}
		return TRUE;
	}

}
