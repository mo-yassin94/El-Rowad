<?php

namespace App\Models\admin;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Model;
use CodeIgniter\Session\Session;
use CodeIgniter\Validation\ValidationInterface;

class ClientsModel extends Model {

    protected $table = 'projects';
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


        $query = $this->db->query("select * from clients order by creation_date DESC");

        return $query->getResultArray();

    }




    public function get_item($id)
    {


        $query = $this->db->query("select * from clients where id='$id' ");

        return $query->getResultArray();

    }



    public function insert_client($title,$slug,$tags,$description,$body,$project_photo,$ar_title,$ar_body,$ar_tags,$ar_description)
    {


        date_default_timezone_set("Africa/Cairo");
        $__date = date('Y-m-d');
        $__time = date('H:i:s');
        $query = $this->db->query("insert into clients (name,slug,tags,description,body,logo,ar_name,ar_description,ar_tags,ar_body,creation_date,creation_time,modified_date,modified_time)
                                 values('$title','$slug','$tags','$description','$body','$project_photo','$ar_title','$ar_description','$ar_tags','$ar_body','$__date','$__time','$__date','$__time')");


    }


    public function update_client($id,$title,$slug,$tags,$description,$body,$project_photo,$ar_title,$ar_body,$ar_tags,$ar_description)
    {

        date_default_timezone_set("Africa/Cairo");
        $__date = date('Y-m-d');
        $__time = date('H:i:s');
        $query = $this->db->query("update clients set name='$title',slug='$slug',tags='$tags',description='$description',body='$body',logo='$project_photo',ar_name='$ar_title',ar_tags='$ar_tags',ar_description='$ar_description',ar_body='$ar_body',modified_date='$__date',modified_time='$__time' where id='$id'");

    }

    public function delete_client($id)
    {

        $this->db->query("delete  from clients where id='$id'");

    }


}
