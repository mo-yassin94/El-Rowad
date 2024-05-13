<?php
namespace App\Controllers;


use CodeIgniter\Controller;

class Contact extends Controller
{
      protected $session;
      protected $helpers = ['url', 'form'];


    public function __construct()
    {
        helper('lang');
        lang_check();
        $this->session =  \Config\Services::session();
    }

	public function index()
	{
		$data['title'] = 'Contact US';
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
		echo view('contact', $data);
	}


	public function send(){
        $validation =  \Config\Services::validation();
        $request = \Config\Services::request();
        $lang=$request->getLocale();
        $email = \Config\Services::email();
        helper(['form','url']);

      

        $validation->setRule('name', 'Name', 'required|min_length[5]');
        $validation->setRule('phone', 'Phone Number', 'required|min_length[11]|max_length[15]');
        $validation->setRule('email', 'Email', 'required|min_length[5]|valid_email');
        $validation->setRule('message', 'Message', 'required|min_length[5]');

        $name = htmlentities($request->getPost('name'));
        $from = htmlentities($request->getPost('email'));
        $phone = htmlentities($request->getPost('phone'));
        $message = htmlentities($request->getPost('message'));


			if ($validation->withRequest($this->request)->run()) {

                $to_email = "info@elrowad-eg.com";
                $config['protocol'] = 'sendmail';
                $config['mailpath'] = '/usr/sbin/sendmail';
                $config['charset'] = 'utf-8';
                $config['wordwrap'] = TRUE;

                $email->initialize($config);
                $email->setFrom($from, 'ElRowad Website  Visitors');

                $email->setTo($to_email);
                $email->setSubject('Contact Form: ' . $name);
                $email->setMessage(strip_tags($message)."\n".$name."\n".$phone);

                //Send mail
                if ($email->send()) {

                    $this->session->setFlashdata("email_sent", "Congratulations, Email Send Successfully.");
                } else {
                    $this->session->setFlashdata("email_error", "You have encountered an error While sending Email");

                }


			}else {
                $this->session->setFlashdata('error', $validation->getErrors());
            }

	    	return redirect()->to(base_url($lang.'/contact'));
		}
}
