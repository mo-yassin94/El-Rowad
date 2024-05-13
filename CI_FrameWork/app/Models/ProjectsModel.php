<?php
namespace App\Models;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Model;
use CodeIgniter\Validation\ValidationInterface;

class ProjectsModel extends Model
{

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



    public function get_sections()
    {
        

        $query = $this->db->query("select * from project_sections order by section_id DESC");

        return $query->getResultArray();

    }


    public function get_section_projects($slug)
    {


        $query = $this->db->query("select * from projects,project_sections where projects.section_id=project_sections.section_id and project_sections.section_slug= '$slug'");

        return $query->getResultArray();

    }

    public function get_item($section,$slug)
    {
        

        $query = $this->db->query("select * from projects,project_sections where projects.slug='$section' and project_sections.section_id=projects.section_id ");

        
       return $query->getResultArray();

    }

    public function get_multi_photo($id)
    {
        
        $query = $this->db->query("select * from project_multiphotos where id='$id' order by img_id ASC");
        return $query->getResultArray();

    }








}
