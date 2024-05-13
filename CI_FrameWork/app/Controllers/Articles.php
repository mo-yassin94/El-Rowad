<?php
namespace App\Controllers;


use App\Models\admin\AuthModel;
use App\Models\admin\ServicesModel;
use CodeIgniter\Controller;


class Articles extends Controller {

    protected $db;
    protected $session;
    protected $helpers = ['url', 'form'];
    protected $adminModel;
    protected $services;
    
    public function __construct()
    {

        $this->adminModel = new AuthModel();
        $this->services=new ServicesModel();
        $this->session =  \Config\Services::session();
    }


 public function show($id)
    {
        $data['css']="";
        $data['js']="";
        $request = \Config\Services::request();
        $data['lang']=$request->getLocale();
        $data['data']=$this->services->get_item($id);
        $data['section_name']='articles';
        $data['section_ar_name']='المفالات';
        if(count($data['data'])){
            foreach ($data['data'] as $row) {
                $data['image']=$row['image'];
                if($data['lang']=="en"){
                    $data['title'] = $row['title'];
                    $data['description']=$row['description'];
                }else{
                    $data['title'] = $row['ar_title'];
                    $data['description']=$row['ar_description'];
                }
                $data['meta'] = '
       <meta name="description" content="' . $data['description'] . '"/>
        <meta property="og:title" content="' . $data['title'] . '"> 
		<meta property="og:description" content="' . $data['description'] . '"> 
		<meta property="og:type" content="website">  
		<meta property="og:url" content="' . $_SERVER['REQUEST_URI'] . '"> 
		<meta property="og:image" content="' . base_url('uploads/images/' . $row['image']) . '"> 
		<meta property="og:image:url" content="' . base_url('uploads/images/' . $row['image']) . '"> 
		<meta property="og:image:alt" content="'  . $data['title'] . '"> 
		<meta name="og:email" content="info@elrowad-eg.com"/>
		<meta property="og:site_name" content="El Rowad Contracting">';


            }
        } else{

            $data['title']='Error Not Found';

        }

        echo view('articles/show',$data);

    }



}
