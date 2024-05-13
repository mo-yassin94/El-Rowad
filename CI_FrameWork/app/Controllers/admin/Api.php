<?php

namespace App\Controllers\admin;
use App\Models\admin\AuthModel;
use App\Models\admin\Apis;
use CodeIgniter\Controller;
class Api extends Controller{

    protected $db;
    protected $session;
    protected $helpers = ['url', 'form'];
    protected $adminModel;
    protected $api;

    public function __construct()
    {

        $this->adminModel = new AuthModel();
        $this->api=new Apis();
        $this->session =  \Config\Services::session();
        if(!$this->adminModel->AUTH()){
            header('Location: '.base_url('admin'));
            exit();
        }
    }


    public function slug(){

        $request = \Config\Services::request();
		$slug=$request->getGet('slug');

		$section=$request->getGet('section');



        echo $this->api->check_slug($slug,$section);

    }






    public function upload_project_photo(){


        $this->api->upload_project_photo();
    }

    public function upload_multi_photos(){


        $this->api->upload_multi_images();

    }
}
