<?php


namespace App\Controllers;


class Error_404  extends BaseController
{

        public function show404(){
            helper('lang');
            lang_check();
            $data['title']="404";
            $request = \Config\Services::request();
            $data['lang']=$request->getLocale();
               echo view('404',$data);
        }

}