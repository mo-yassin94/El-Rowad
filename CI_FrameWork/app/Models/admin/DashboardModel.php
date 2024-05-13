<?php
namespace App\Models\admin;
use CodeIgniter\Model;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Validation\ValidationInterface;

class DashboardModel extends Model
{
    protected $db;
    protected $session;

    public function __construct(ConnectionInterface &$db = null,
                                ValidationInterface $validation = null)
    {
        $this->db= \Config\Database::connect();
        $this->session =  \Config\Services::session();
        parent::__construct($db, $validation);


    }




}
