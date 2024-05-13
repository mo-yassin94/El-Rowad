<?php

namespace App\Models\admin;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Model;
use CodeIgniter\Session\Session;
use CodeIgniter\Validation\ValidationInterface;

class ServicesModel extends Model {

    protected $table = 'services';
    protected $db;
    protected $session;

    public function __construct(ConnectionInterface &$db = null,
                                ValidationInterface $validation = null)
    {
        $this->db = \Config\Database::connect();
        $this->session = \Config\Services::session();
        parent::__construct($db, $validation);



    }

    public function get_all()
    {


        $query = $this->db->query("select * from services order by creation_date DESC");

        return $query->getResultArray();

    }

  


    public function get_item($id)
    {


        $query = $this->db->query("select * from services where id='$id' ");

        return $query->getResultArray();

    }

   

    public function insert_service($title,$slug,$tags,$description,$body,$project_photo,$alt,$ar_title,$ar_body,$ar_tags,$ar_description)
    {


        date_default_timezone_set("Africa/Cairo");
        $__date = date('Y-m-d');
        $__time = date('H:i:s');
        $query = $this->db->query("insert into services (title,slug,tags,description,body,image,alt,ar_title,ar_description,ar_tags,ar_body,creation_date,creation_time,modified_date,modified_time)
                                 values('$title','$slug','$tags','$description','$body','$project_photo','$alt','$ar_title','$ar_description','$ar_tags','$ar_body','$__date','$__time','$__date','$__time')");
        

    }


    public function update_service($id,$title,$slug,$tags,$description,$body,$project_photo,$alt,$ar_title,$ar_body,$ar_tags,$ar_description)
    {

        date_default_timezone_set("Africa/Cairo");
        $__date = date('Y-m-d');
        $__time = date('H:i:s');
        $query = $this->db->query("update services set title='$title',slug='$slug',tags='$tags',description='$description',body='$body',image='$project_photo',alt='$alt',ar_title='$ar_title',ar_tags='$ar_tags',ar_description='$ar_description',ar_body='$ar_body',modified_date='$__date',modified_time='$__time' where id='$id'");

    }

    public function delete_service($id)
    {

        $this->db->query("delete  from services where id='$id'");
        
    }


}
