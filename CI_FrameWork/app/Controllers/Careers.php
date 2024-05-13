<?php


namespace App\Controllers;


use App\Models\CareersModel;
use CodeIgniter\Controller;

class Careers extends Controller{

    protected $careers;
    protected $session;
    protected $helpers = ['url', 'form'];
    public function __construct()
    {
        helper('lang');
        lang_check();
        $this->careers= new CareersModel();
        $this->session =  \Config\Services::session();
    }



    public function index()
    {
        $data['title']='Careers';
        $request = \Config\Services::request();
        $data['lang']=$request->getLocale();
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
        $data['data']=$this->careers->get_all();

        echo view('careers/careers',$data);
    }

    public function show($slug,$l)
    {

        $request = \Config\Services::request();
        $data['lang']=$request->getLocale();
        $data['data']=$this->careers->get_item($slug);
        $data['meta']='';
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
        echo view('careers/show',$data);
    }




    public function send_cv($slug,$named)
    {

        $request = \Config\Services::request();
        $lang=$request->getLocale();
        $validation =  \Config\Services::validation();


        
        $validation->setRule('fullname', 'Full Name', 'required|min_length[3]');

        $validation->setRule('phone', 'Phone Number', 'required|min_length[11]|max_length[15]');

        $validation->setRule('email', 'Email', 'required|min_length[5]|valid_email');




        $name  = htmlentities($request->getPost('fullname'));
        $email = htmlentities($request->getPost('email'));
        $phone = htmlentities($request->getPost('phone'));


        if ($validation->withRequest($this->request)->run()){
     
            $cv_file=self::upload_cv($slug,$name);

            if($cv_file == false){
                $this->session->setFlashdata("st_error", " Error While sending CV");
                return redirect()->to(base_url($lang.'/careers/'.$slug.'/'));
            }

            if ($this->careers->insert_cv($slug,$name,$email,$phone,$cv_file)) {
                $this->session->setFlashdata("sent", "Congratulations, Your CV Submitted Successfully.");
            } else {
                $this->session->setFlashdata("st_error", "You have encountered an error While sending CV");

            }


        }else {

            $this->session->setFlashdata('error', $validation->getErrors());
        }

         return redirect()->to(base_url($lang.'/careers/'.$slug.'/'));



    }




    public function upload_cv($slug,$name)
    {


        $ext = strtolower(pathinfo($_FILES['cv']['name'], PATHINFO_EXTENSION));


        $uid = uniqid();
        if(($_FILES['cv']['type'] == "application/pdf") ||  ($_FILES['cv']['type'] =="application/msword") || ( $_FILES['cv']['type']=="application/vnd.openxmlformats-officedocument.wordprocessingml.document" ) && ($_FILES['cv']['size'] < 5*1048576)){
             $filename = $slug.'_'. str_replace(' ','_',$name) . '_' . $uid . "." . $ext;
            // move uploaded file from temp to uploads directory
            if (move_uploaded_file($_FILES['cv']['tmp_name'], './uploads/files/careers/cv/' . $filename)) {

                return $filename;

            }

        }else {

          return false;
        }


    }

}