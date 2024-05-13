<?php

namespace App\Models;
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



}
