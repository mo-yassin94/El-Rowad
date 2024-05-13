<?php


namespace App\Controllers;


use App\Models\ClientsModel;
use CodeIgniter\Controller;

class Clients extends Controller{

    protected $clients;
    public function __construct()
    {
        helper('lang');
        lang_check();
        $this->clients=new ClientsModel();
    }




    public function index()
    {
        $data['title']='Clients';
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
        $data['clients']=$this->clients->get_all();
        $request = \Config\Services::request();
        $data['lang']=$request->getLocale();
        echo view('clients/clients',$data);
            
    }





}