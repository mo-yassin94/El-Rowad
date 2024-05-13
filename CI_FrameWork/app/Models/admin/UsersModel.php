<?php

namespace App\Models\admin;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Model;
use CodeIgniter\Validation\ValidationInterface;
class UsersModel extends Model {

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
		
	

	$query = $this->db->query("select * from admins where id <> 1 order by id ASC");

	return $query->getResultArray();

}


	public function get_item($id){
		

		$query = $this->db->query("select * from admins where id='$id' and id<>1");

		return $query->getResultArray();

	}



	public function insert_user($name,$email,$avatar,$user_name,$password){

		
		date_default_timezone_set("Africa/Cairo");
		$__date=date('Y-m-d');
		$__time=date('H:i:s');
		$hash=md5($password);
		$this->db->query("insert into admins (name,email,avatar,user_name,password)
                                 values('$name','$email','$avatar','$user_name','$hash')");


	}


	public function update_user($id,$name,$email,$avatar,$user_name,$password){
		
		date_default_timezone_set("Africa/Cairo");
		$__date=date('Y-m-d');
		$__time=date('H:i:s');
		$hash=md5($password);
		if(empty($password)){
			$this->db->query("update admins set name ='$name',email='$email',avatar='$avatar',user_name='$user_name' where id='$id' and id <>1");
		}else{
			$this->db->query("update admins set name ='$name',email='$email',avatar='$avatar',user_name='$user_name',password='$hash',session_id='' where id='$id' and id<>1");
		}



	}

	public function delete_user($id){
		
		$query=$this->db->query("delete  from admins where id='$id' and id <> 1");
	
	}

}
