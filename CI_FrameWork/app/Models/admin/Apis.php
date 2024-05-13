<?php

namespace App\Models\admin;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Model;
use CodeIgniter\Validation\ValidationInterface;

class Apis extends Model{

    protected $db;
    protected $session;

    public function __construct(ConnectionInterface &$db = null,
                                ValidationInterface $validation = null)
    {
        $this->db = \Config\Database::connect();
        $this->session = \Config\Services::session();
        parent::__construct($db, $validation);


    }

    public function check_slug($slug,$section){



       $query = $this->db->query("select slug from $section where slug='$slug'");

        if( count($query->getResult()) >=1){
            $response = false;
        } else {
            $response = true;
        }

        header('Content-Type:application/json;');
        echo json_encode($response);
         
    }



    public function upload_project_photo()
    {

        header('Content-Type: application/json');
        $json = array();
        helper('storage');
        $request = \Config\Services::request();

        $section = $request->getPost('section');
        helper('imageresizer');
        $valid_exts = array('jpeg', 'jpg', 'png', 'gif'); // valid extensions

        $path = "./uploads/images/" . Directory_Manager($section, $section) . "/";
        $dir = Directory_Manager($section, $section) . "/";
        $ext = strtolower(pathinfo($_FILES['p_image']['name'], PATHINFO_EXTENSION));

        // looking for format and size validity
        if (in_array($ext, $valid_exts)) {
            $uid = uniqid();

            $filename = "elrowad_" . str_replace('/','_',$section) . '_' . $uid . "." . $ext;
            // move uploaded file from temp to uploads directory
            if (move_uploaded_file($_FILES['p_image']['tmp_name'], $path . $filename)) {

                resizephoto($dir, $filename, $ext);
                create_thumb($dir, $filename, $ext, 300, 250);
                $json['path'] = $dir.$filename;

            }
            echo str_replace('\\','',$dir).$filename;
        }
    }


    public function upload_multi_images(){


        header('Content-Type: application/json');

        $valid_exts = array('jpeg', 'jpg', 'png', 'gif'); // valid extensions
        $max_size = 150000 * 1024; // max file size in bytes

        helper('storage');
        helper('imageresizer');
        $request = \Config\Services::request();
        $section = $request->getPost('section');
        $json = array();

        if ( $_SERVER['REQUEST_METHOD'] === 'POST' )
        {

            $path="./uploads/images/".Directory_Manager($section,$section)."/";
            $dir=Directory_Manager($section,$section)."/";
            for($i=0;$i<count($_FILES['image']['tmp_name']);$i++) {
            	
                if(is_uploaded_file($_FILES['image']['tmp_name'][$i]) )
                {
                    // get uploaded file extension
                    $ext = strtolower(pathinfo($_FILES['image']['name'][$i], PATHINFO_EXTENSION));
                    // looking for format and size validity
                    if (in_array($ext, $valid_exts) AND $_FILES['image']['size'][$i] < $max_size)
                    {
                        // unique file path
                        $uid = uniqid();
                        $filename="elrowad_" . str_replace('/','_',$section). '_' . $uid . "." .$ext;


                        // move uploaded file from temp to uploads directory
                       if (move_uploaded_file($_FILES['image']['tmp_name'][$i], $path.$filename)) {


                            resizephoto($dir,$filename,$ext);
                            create_thumb($dir,$filename,$ext,300,250);

                            $json['path'][$i]=$dir.$filename;


                        }else {
                            $json['path'] = 'Upload Fail: Unknown error occurred!';
                        }


                    }else {
                        $json['path'] = 'Upload Fail: Unsupported file format or It is too large to upload!';
                    }


                }else {
                    $json['path'] = 'Upload Fail: File not uploaded!';
                }
            }




        }else {
            $json['path'] = 'Bad request!';
        }


        echo json_encode($json['path']);

        
    }



}
