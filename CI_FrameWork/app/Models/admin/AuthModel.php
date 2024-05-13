<?php
namespace App\Models\admin;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Model;
use CodeIgniter\Validation\ValidationInterface;


class AuthModel extends Model{

    protected $table = 'admins';
    protected $db;
    protected $session;

    public function __construct(ConnectionInterface &$db = null,
                                ValidationInterface $validation = null)
    {
        $this->db= \Config\Database::connect();
        $this->session =  \Config\Services::session();
        parent::__construct($db, $validation);

          self::AUTH();
    }

    public function login($username,$pass){

		$password=md5($pass);
		$query = $this->db->query("select * from admins where user_name='$username' and password='$password'");
		return count($query->getResult());


	}

	
	public function get_auth_id($user_name){

		$query = $this->db->query("select id from admins where user_name='$user_name'");
		$row=$query->getResultArray();

		foreach ($row as $user){
			return $user['id'];
		}


	}

	
	public function update_session($id,$session_id){
       

		$this->db->query("update admins set session_id='$session_id' where id='$id'");

		
	}

	public function get_user_data($session_id){

        if (self::AUTH() == false){
            return redirect()->to(base_url('admin'));
        }

		$query = $this->db->query("select * from admins where session_id='$session_id'");
		return $query->getResultArray();

		
	}


	public function AUTH(){
        
        if($this->session->get("ID")){
            $session_id= $this->session->get('session');;
        }else{
            $session_id="nosession";
        }
        
        $query = $this->db->query("select * from admins where session_id='$session_id'");

        
        if(count($query->getResult()) >= 1){
            return true;
        } else{
            redirect()->to(base_url('admin'));
            return false;
        }
    }



}
