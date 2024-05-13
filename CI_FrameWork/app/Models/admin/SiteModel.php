<?php
/**
 * Created by PhpStorm.
 * User: DEV
 * Date: 11/14/2018
 * Time: 4:49 PM
 */

class SiteModel extends CI_Model {



    public function signed(){
        $this->db->having(array('title =' => 'My Title', 'id <' => $id));

    }




}