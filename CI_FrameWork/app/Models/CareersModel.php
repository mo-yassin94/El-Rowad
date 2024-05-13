<?php

namespace App\Models;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Model;
use CodeIgniter\Session\Session;
use CodeIgniter\Validation\ValidationInterface;

class CareersModel extends Model {

    protected $table = 'careers';
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

	public function get_item($slug){
	

		$query = $this->db->query("select * from careers where slug='$slug'");

		return $query->getResultArray();

	}


	public function get_id($slug){
	

		$query = $this->db->query("select id from careers where slug='$slug' and status=1");

		return $query->getResultArray();

	}

	public function insert_cv($slug,$name,$email,$phone,$cv){
        
		$get_id=self::get_id($slug);
		foreach ($get_id as $item_id){
			$id=$item_id['id'];
		}
		
		date_default_timezone_set("Africa/Cairo");
		$__date=date('Y-m-d');
		$__time=date('H:i:s');
		 $this->db->query("insert into applicants (id,name,email,phone,apply_date,apply_time,cv) values ('$id','$name','$email','$phone','$__date','$__time','$cv')");
		  if($this->db->affectedRows() >=1 ){
		  	return true;
		  }else{
		  	return false;
		  }
	}
}
