<?php namespace App\Controllers;

class Home extends BaseController
{




    public function __construct()
    {

        helper('lang');
        lang_check();
    }

    public function index($lang)
	{
	    
 
	    $data['title']="El Rowad Contracting";
	    $data['css']="home";
	    $data['js']="home";
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
            return view('home',$data);

	}

	

}
