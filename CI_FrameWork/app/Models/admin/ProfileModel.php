<?php

namespace App\Models\admin;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Model;
use CodeIgniter\Session\Session;
use CodeIgniter\Validation\ValidationInterface;

class ProfileModel extends Model {

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


	public function update_profile($email,$avatar,$old_password,$password){

        $session= \Config\Services::session();
		$session_id=$session->get('session');
		 $old_pass=md5($old_password);
		 $new_pass=md5($password)  ;
		if(!empty($password) && strlen($password) >=8 ){

			$this->db->query("update admins set email='$email',avatar='$avatar',password='$new_pass' where password='$old_pass' and session_id='$session_id'");

			if ($this->db->affectedRows()>=1){
			    return true;
            }else{
			    return false;
            }

		}else{
			$this->db->query("update admins set email='$email',avatar='$avatar' where session_id='$session_id'");
		}



	}

}
