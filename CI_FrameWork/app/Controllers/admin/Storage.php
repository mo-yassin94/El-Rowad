<?php
namespace App\Controllers\admin;


use App\Models\admin\AuthModel;
use App\Models\admin\UsersModel;
use CodeIgniter\Controller;


class Storage extends Controller {
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



    public function index(){
	

        $data['title']='Storage';
        $data['css']='';
        $data['js']='';
        $data['script']='';

        echo view('admin/layout/header',$data);
        echo view('admin/layout/menu');
        echo view('admin/hdd');
        echo view('admin/layout/footer',$data);

    }
}
