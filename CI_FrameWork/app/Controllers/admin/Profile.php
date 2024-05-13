<?php

namespace App\Controllers\admin;


use App\Models\admin\AuthModel;

use App\Models\admin\ProfileModel;
use App\Models\admin\ProjectsModel;
use CodeIgniter\Controller;

class Profile extends Controller {


    protected $db;
    protected $session;
    protected $helpers = ['url', 'form'];
    protected $adminModel;
    protected $profile;

    public function __construct()
    {

        $this->adminModel = new AuthModel();
         $this->profile=new ProfileModel();
        $this->session =  \Config\Services::session();
        if(!$this->adminModel->AUTH()){
            header('Location: '.base_url('admin'));
            exit();
        }
    }

	public function show()
	{

		$data['title']="Profile";
		$data['css']='';
		$data['js']='';
		$data['script']='';

		echo view('admin/layout/header',$data);
		echo view('admin/layout/menu');
		echo view('admin/profile/profile',$data);
		echo view('admin/layout/footer');  
	}


    public function update()
    {

        $validation =  \Config\Services::validation();
        $request = \Config\Services::request();

		$validation->setRule('password', 'Password', 'min_length[8]');

		$validation->setRule('email', 'Email', 'min_length[8]|valid_email');
		$validation->setRule('old_password', 'Old Password', 'min_length[8]');
		$validation->setRule('user_photo_src', 'Avatar', 'required');


		$old_password=$request->getPost('old_password');
		$avatar=$request->getPost('user_photo_src');
		$email=$request->getPost('email');
		$password=$request->getPost('password');





		if ($validation->run()) {
			$this->session->setFlashdata('error', $validation->getErrors());
            return redirect()->to(base_url('admin/profile'));
		}else{

			if(!empty($old_password)){
                if($this->profile->update_profile($email,$avatar,$old_password,$password)){
                    $this->session->setFlashdata('success', "Profile Updated Successfully");
                }else{
                    $this->session->setFlashdata('error', array("Password Must be greater than 8 characters"));
                }
            }else{
                $this->profile->update_profile($email,$avatar,'','');
                $this->session->setFlashdata('success', "Profile Updated Successfully");
            }



            return redirect()->to(base_url('admin/profile'));
		}




    	
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
			$this->form_validation->set_message('valid_password', 'The {field} field is required.');
			return FALSE;
		}
		if (preg_match_all($regex_lowercase, $password) < 1)
		{
			$this->form_validation->set_message('valid_password', 'The {field} field must be at least one lowercase letter.');
			return FALSE;
		}
		if (preg_match_all($regex_uppercase, $password) < 1)
		{
			$this->form_validation->set_message('valid_password', 'The {field} field must be at least one uppercase letter.');
			return FALSE;
		}
		if (preg_match_all($regex_number, $password) < 1)
		{
			$this->form_validation->set_message('valid_password', 'The {field} field must have at least one number.');
			return FALSE;
		}
		if (preg_match_all($regex_special, $password) < 1)
		{
			$this->form_validation->set_message('valid_password', 'The {field} field must have at least one special character.' . ' ' . htmlentities('!@#$%^&*()\-_=+{};:,<.>§~'));
			return FALSE;
		}
		if (strlen($password) < 8)
		{
			$this->form_validation->set_message('valid_password', 'The {field} field must be at least 5 characters in length.');
			return FALSE;
		}
		if (strlen($password) > 32)
		{
			$this->form_validation->set_message('valid_password', 'The {field} field cannot exceed 32 characters in length.');
			return FALSE;
		}
		return TRUE;
	}


}
