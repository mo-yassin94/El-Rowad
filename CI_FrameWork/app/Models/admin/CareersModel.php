<?php

namespace App\Models\admin;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Model;
use CodeIgniter\Validation\ValidationInterface;

class CareersModel extends Model {


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

    public function get_all(){
        

        $query = $this->db->query("select * from careers order by id DESC");

        return $query->getResultArray();

    }

    public function get_item($id){
        

        $query = $this->db->query("select * from careers where id='$id'");

        return $query->getResultArray();

    }

    public function insert_career($title,$slug,$description,$tags,$img,$body,$open,$ar_title,$ar_tags,$ar_description,$ar_body){

        date_default_timezone_set("Africa/Cairo");
        $__date=date('Y-m-d');
        $__time=date('H:i:s');
        $query = $this->db->query("insert into careers (title,slug,description,tags,body,image,creation_date,creation_time,modified_date,modified_time,status,ar_title,ar_description,ar_tags,ar_body)
                                                       values ('$title','$slug','$description','$tags','$body','$img','$__date','$__time','$__date','$__time','$open','$ar_title','$ar_description','$ar_tags','$ar_body')");

    }


    public function update_career($id,$title,$slug,$description,$tags,$img,$body,$open,$ar_title,$ar_tags,$ar_description,$ar_body){

        date_default_timezone_set("Africa/Cairo");
		$__date=date('Y-m-d');
		$__time=date('H:i:s');
        $query = $this->db->query("update careers set title='$title',slug='$slug',description='$description',tags='$tags',body='$body',image='$img',modified_date='$__date',modified_time='$__time',status='$open',ar_title='$ar_title',ar_description='$ar_description',ar_tags='$ar_tags',ar_body='$ar_body' where id='$id'");

    }

    public function delete_career($id){

        self::delete_all_cvs($id);

        

        $this->db->query("delete from applicants where id= '$id'");
        $this->db->query("delete from careers where id= '$id'");

    }


	public function applicants($id){

		

		$query = $this->db->query("select id from applicants
									where id='$id'");

		return count($query->getResultArray());



	}
	public function get_applicants($id){

		

		$query = $this->db->query("select * from careers,applicants
									where careers.id=applicants.id and applicants.id='$id'
									order by apply_date DESC");

		return $query->getResultArray();



	}


    public function delete_all_cvs($id){
        $query = $this->db->query("select cv from applicants where id='$id'");


        foreach ($query->getResultArray() as $cvfile){
            $cv=$cvfile['cv'];
            unlink('uploads/files/careers/cv/'.$cv);
        }


    }

	 public function get_cv($id){
		 
		 $query = $this->db->query("select cv from applicants where applicant_id='$id'");

		 return $query->getResultArray();
	 }

	public function delete_applicant($id){
		
		$getcv=self::get_cv($id);
		foreach ($getcv as $cvfile){
			$cv=$cvfile['cv'];
		}
	
		unlink('uploads/files/careers/cv/'.$cv);
		$this->db->query("delete  from applicants where applicant_id='$id'");


	}


}
