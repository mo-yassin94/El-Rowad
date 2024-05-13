<?php


namespace App\Controllers;

use App\Models\admin\ServicesModel;
use CodeIgniter\Controller;

class Services extends BaseController{

    protected $services;

    public function __construct()
    {
        $this->services=new ServicesModel();
        helper('lang');
        lang_check();
    }




    public function index()
    {
        $data['title']='Services'  ;
        $data['css']="";
        $data['js']="";
        $data['meta']='
       <meta name="description" content=""/>
        <meta property="og:title" content="'.$data['title'].'"> 
		<meta property="og:description" content=""> 
		<meta property="og:type" content="website">  
		<meta property="og:url" content="'.$_SERVER['REQUEST_URI'].'"> 
		<meta property="og:image" content="//elrowad-eg.com/assets/images/logo.png"> 
		<meta property="og:image:url" content="//elrowad-eg.com/assets/images/logo.png"> 
		<meta property="og:image:alt" content="'.$data['title'].'"> 
		<meta name="og:email" content="info@elrowad-eg.com"/>
		<meta property="og:site_name" content="El Rowad Contracting">';
        $request = \Config\Services::request();
        $data['lang']=$request->getLocale();
           echo view('services/services',$data);
            
    }
    
    public function show($id)
    {
        $data['css']="";
        $data['js']="";
        $request = \Config\Services::request();
        $data['lang']=$request->getLocale();
        $data['data']=$this->services->get_item($id);
        $data['section_name']='services';
        $data['section_ar_name']='الخدمات';
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

        echo view('services/show',$data);

    }





}