<?php

if(!function_exists('lang_check')) {
    function lang_check()
    {
        $request = \Config\Services::request();
        if ($request->uri->getSegment(1) != $request->getLocale()) {
            echo view('404');
            exit();
        }
    }
}