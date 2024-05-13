<?php


namespace App\Controllers;


use App\Models\ProjectsModel;
use CodeIgniter\Controller;

class Projects extends Controller{

    public $projects;
    public function __construct()
    {
        helper('lang');
        lang_check();
        $this->projects=new ProjectsModel();
    }

    public function index()
    {
        $data['title']='Projects';
        $data['css']="";
        $data['js']="";
        $data['meta']='
       <meta name="description" content=" Projects - El Rowad Contracting"/>
        <meta property="og:title" content="'.$data['title'].'"> 
		<meta property="og:description" content=" Projects - El Rowad Contracting"> 
		<meta property="og:type" content="website">  
		<meta property="og:url" content="'.$_SERVER['REQUEST_URI'].'"> 
		<meta property="og:image" content="//elrowad-eg.com/assets/images/logo.png"> 
		<meta property="og:image:url" content="//elrowad-eg.com/assets/images/logo.png"> 
		<meta property="og:image:alt" content="'.$data['title'].'"> 
		<meta name="og:email" content="info@elrowad-eg.com"/>
		<meta property="og:site_name" content="El Rowad Contracting">';
        $request = \Config\Services::request();
        $data['lang']=$request->getLocale();
        $data['sections']=$this->projects->get_sections();

        echo view('projects/sections',$data);
            
    }

    public function all_projects($slug)
    {

        $data['css']="";
        $data['js']="";
        $request = \Config\Services::request();
        $data['lang']=$request->getLocale();
        $data['data']=$this->projects->get_section_projects($slug);
        if(count($data['data'])){

            foreach ($data['data'] as $row) {
                if($data['lang']=="en"){
                    $data['title'] = $row['section_name'];
                }else{
                    $data['title'] = $row['section_ar_name'];
                }
                $data['meta']='
       <meta name="description" content="'.$data['title'].' - Projects - El Rowad Contracting"/>
        <meta property="og:title" content="'.$data['title'].'"> 
		<meta property="og:description" content="'.$data['title'].' - Projects - El Rowad Contracting"> 
		<meta property="og:type" content="website">  
		<meta property="og:url" content="'.$_SERVER['REQUEST_URI'].'"> 
		<meta property="og:image" content="//elrowad-eg.com/assets/images/logo.png"> 
		<meta property="og:image:url" content="//elrowad-eg.com/assets/images/logo.png"> 
		<meta property="og:image:alt" content="'.$data['title'].'"> 
		<meta name="og:email" content="info@elrowad-eg.com"/>
		<meta property="og:site_name" content="El Rowad Contracting">';


            }
        } else{

            $data['title']='Error Not Found';

        }
        echo view('projects/projects',$data);

    }

    public function show($section,$slug)
    {



        $data['css']="";
        $data['js']="";
        $request = \Config\Services::request();
        $data['lang']=$request->getLocale();
        $data['data']=$this->projects->get_item($section,$slug);

        if(count($data['data'])){
            foreach ($data['data'] as $row) {
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

        echo view('projects/show',$data);

    }
}