<?php
namespace App\Models\admin;
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

    public function get_all()
    {
        

        $query = $this->db->query("select * from projects,project_sections 
									where projects.section_id=project_sections.section_id
									order by creation_date DESC");

        return $query->getResultArray();

    }

    public function get_sections()
    {
        

        $query = $this->db->query("select * from project_sections order by section_id DESC");

        return $query->getResultArray();

    }


    public function get_section_by_id($id)
    {
        

        $query = $this->db->query("select * from project_sections where section_id= '$id'");

        return $query->getResultArray();

    }

    public function get_item($id)
    {
        

        $query = $this->db->query("select * from projects,project_sections where projects.id='$id' and projects.section_id=project_sections.section_id ");

        return $query->getResultArray();

    }

    public function get_multi_photo($id)
    {
        
        $query = $this->db->query("select * from project_multiphotos where id='$id' order by img_id ASC");
        return $query->getResultArray();

    }

    public function insert_project($title,$category,$slug,$tags,$description,$body,$project_photo,$alt,$multi_photo,$ar_title,$ar_body,$ar_tags,$ar_description)
    {

        
        date_default_timezone_set("Africa/Cairo");
        $__date = date('Y-m-d');
        $__time = date('H:i:s');
        $query = $this->db->query("insert into projects (title,section_id,slug,tags,description,body,image,alt,ar_title,ar_description,ar_tags,ar_body,creation_date,creation_time,modified_date,modified_time)
                                 values('$title','$category','$slug','$tags','$description','$body','$project_photo','$alt','$ar_title','$ar_description','$ar_tags','$ar_body','$__date','$__time','$__date','$__time')");
        $id = $this->db->insertID();


        $imgs = explode(',', $multi_photo);
        for ($i = 0; $i <= count($imgs) - 1; $i++) {
            if (!empty($imgs[$i])) {
                $this->db->query("insert into project_multiphotos (id,src) values ('$id','$imgs[$i]')");
            }
        }
    }


    public function update_project($id,$title,$category,$slug,$tags,$description,$body,$project_photo,$alt,$multi_photo,$ar_title,$ar_body,$ar_tags,$ar_description)
    {
        
        date_default_timezone_set("Africa/Cairo");
        $__date = date('Y-m-d');
        $__time = date('H:i:s');
        $query = $this->db->query("update projects set title='$title',section_id='$category',slug='$slug',tags='$tags',description='$description',body='$body',image='$project_photo',alt='$alt',ar_title='$ar_title',ar_tags='$ar_tags',ar_description='$ar_description',ar_body='$ar_body',modified_date='$__date',modified_time='$__time' where id='$id'");
        $this->db->query("delete from project_multiphotos where id='$id'");
        $imgs = explode(',', $multi_photo);
        for ($i = 0; $i <= count($imgs) - 1; $i++) {
            if (!empty($imgs[$i])) {
                $this->db->query("insert into project_multiphotos (id,src) values ('$id','$imgs[$i]')");
            }

        }

    }

    public function delete_project($id)
    {
        
         $this->db->query("delete  from projects where id='$id'");
         $this->db->query("delete  from project_multiphotos where id='$id'");
    }


    public function insert_section($section_name,
                                   $tags,
                                   $description,
                                   $slug,
                                   $ar_section_name,
                                   $ar_tags,$ar_description)
    {

        
        $query = $this->db->query("insert into project_sections (section_name,section_tags,section_description,section_slug,section_ar_name,section_ar_tags,section_ar_description)
                                  values('$section_name','$tags','$description','$slug','$ar_section_name','$ar_tags','$ar_description')");


    }


    public function update_section($id,$section_name,$tags,$description,$slug,$ar_section_name,$ar_tags,$ar_description)
    {

        $this->db->query("update project_sections set section_name= '$section_name',section_tags='$tags',section_description='$description',section_slug='$slug',section_ar_name='$ar_section_name',section_ar_tags='$ar_tags',section_ar_description='$ar_description' where section_id='$id'");


    }

    public function delete_section($id)
    {

        
       $this->db->query("delete  from project_sections where section_id='$id'");


    }


}
