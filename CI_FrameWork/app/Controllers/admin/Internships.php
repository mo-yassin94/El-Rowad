<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Internships extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->library('session');
		$this->load->helper(array('form', 'url'));
		$this->load->model('admin/authModel','auth');
		if($this->auth->AUTH()==false){
			redirect('./admin', 'refresh');
		}
		$this->load->model('admin/InternshipsModel','admin_internships_model');
	}

	public function index()
	{

		$data['data']=$this->admin_internships_model->get_all();
		$data['title']="Internships";
		$data['css']='<link rel="stylesheet" href="'.base_url('assets/plugins/datatables/dataTables.bootstrap.css').'">';
		$data['js']='<script src="'.base_url('assets/plugins/datatables/jquery.dataTables.min.js').'"></script>
                    <script src="'.base_url('assets/plugins/datatables/dataTables.bootstrap.min.js').'"></script>';
		$data['script']='<script>
                    $(function () {
                        $("#example2").DataTable({
                            "paging": true,
                            "lengthChange": 5,
                            "searching": false,
                            "ordering": true,
                            "info": true,
                            "autoWidth": false
                        });
                    });
                </script>';



		$this->load->view('admin/layout/header',$data);
		$this->load->view('admin/layout/menu');
		$this->load->view('admin/internship/list',$data);
		$this->load->view('admin/layout/footer',$data);
	}
	public function new_project()
	{
		$data['title']='New Internship Project';

		$data['css']='<!-- Select2 -->
    <link rel="stylesheet" href="'.base_url('assets/plugins/select2/select2.min.css').'">';
		$data['js']=' <!-- Select2 -->
    <script src="'.base_url('assets/plugins/select2/select2.full.min.js').'"></script><!-- InputMask -->
    <script src="'. base_url('assets/plugins/input-mask/jquery.inputmask.js').'"></script>
    <script src="'. base_url('assets/plugins/input-mask/jquery.inputmask.date.extensions.js').'"></script>
    <script src="'. base_url('assets/plugins/input-mask/jquery.inputmask.extensions.js').'"></script>
    <!-- date-range-picker -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script>
    <script src="'.base_url('assets/plugins/daterangepicker/daterangepicker.js').'"></script>
    <!-- bootstrap color picker -->
    <script src="'.base_url('assets/plugins/colorpicker/bootstrap-colorpicker.min.js').'"></script>
    <!-- bootstrap time picker -->
    <script src="'. base_url('assets/plugins/timepicker/bootstrap-timepicker.min.js').'"></script>
    <!-- SlimScroll 1.3.0 -->
    <script src="'. base_url('assets/plugins/slimScroll/jquery.slimscroll.min.js').'"></script>
    <!-- iCheck 1.0.1 -->
    <script src="'. base_url('assets/plugins/iCheck/icheck.min.js').'"></script>
    <!-- FastClick -->
    <script src="'. base_url('assets/plugins/fastclick/fastclick.min.js').'"></script>';
		$data['script']='<script src="'.base_url('assets/dist/js/script.js').'"></script>';


		$this->load->view('admin/layout/header',$data);
		$this->load->view('admin/layout/menu');
		$this->load->view('admin/internship/new',$data);
		$this->load->view('admin/layout/footer',$data);

	}


	public function add()
	{

		$this->load->library('form_validation');

		$this->form_validation->set_rules('title', 'Title', 'trim|required|min_length[5]',array(
			'required'      => 'You have not provided %s.',
			'min_length'    => 'Your %s is too short.',
			'is_unique'     => 'This %s already exists.'
		));

		$this->form_validation->set_rules('project_photo_src', 'Project Photo', 'trim|required');

		$title=$this->input->post('title');
		$slug=$this->input->post('slug');

		$project_photo=$this->input->post('project_photo_src');
		$alt=$this->input->post('alt');
		$body=$this->input->post('area3');
		$description=$this->input->post('desc');
		$tags=$this->input->post('tags');
		$keywords=$this->input->post('keys');
		$open=$this->input->post('open');




		if ($this->form_validation->run() == FALSE) {
			$this->session->set_flashdata('error', validation_errors());
			redirect('./admin/internships/new');
		}else{

			$this->admin_internships_model->insert($title,$slug,$tags,$description,$keywords,$body,$project_photo,$alt,$open);
			$this->session->set_flashdata('success', "Project Inserted Successfully");

			redirect('./admin/internships/new');
		}



	}



	public function edit($id)
	{
		$data['title']='New Internship Project';
		$data['id']=$id;
		$data['css']='<!-- Select2 -->
    <link rel="stylesheet" href="'.base_url('assets/plugins/select2/select2.min.css').'">';
		$data['js']=' <!-- Select2 -->
    <script src="'.base_url('assets/plugins/select2/select2.full.min.js').'"></script><!-- InputMask -->
    <script src="'. base_url('assets/plugins/input-mask/jquery.inputmask.js').'"></script>
    <script src="'. base_url('assets/plugins/input-mask/jquery.inputmask.date.extensions.js').'"></script>
    <script src="'. base_url('assets/plugins/input-mask/jquery.inputmask.extensions.js').'"></script>
    <!-- date-range-picker -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script>
    <script src="'.base_url('assets/plugins/daterangepicker/daterangepicker.js').'"></script>
    <!-- bootstrap color picker -->
    <script src="'.base_url('assets/plugins/colorpicker/bootstrap-colorpicker.min.js').'"></script>
    <!-- bootstrap time picker -->
    <script src="'. base_url('assets/plugins/timepicker/bootstrap-timepicker.min.js').'"></script>
    <!-- SlimScroll 1.3.0 -->
    <script src="'. base_url('assets/plugins/slimScroll/jquery.slimscroll.min.js').'"></script>
    <!-- iCheck 1.0.1 -->
    <script src="'. base_url('assets/plugins/iCheck/icheck.min.js').'"></script>
    <!-- FastClick -->
    <script src="'. base_url('assets/plugins/fastclick/fastclick.min.js').'"></script>';
		$data['script']='<script src="'.base_url('assets/dist/js/script.js').'"></script>';


		$this->load->view('admin/layout/header',$data);
		$this->load->view('admin/layout/menu',$data);
		$this->load->view('admin/internship/edit',$data);
		$this->load->view('admin/layout/footer',$data);

	}

	public function update($id)
	{
		$this->load->library('form_validation');

		$this->form_validation->set_rules('title', 'Title', 'trim|required|min_length[5]',array(
			'required'      => 'You have not provided %s.',
			'min_length'    => 'Your %s is too short.',
			'is_unique'     => 'This %s already exists.'
		));

		$this->form_validation->set_rules('project_photo_src', 'Project Photo', 'trim|required');

		$title=$this->input->post('title');
		$slug=$this->input->post('slug');

		$project_photo=$this->input->post('project_photo_src');
		$alt=$this->input->post('alt');

		$body=$this->input->post('area3');
		$description=$this->input->post('desc');
		$tags=$this->input->post('tags');
		$keywords=$this->input->post('keys');
		$open=$this->input->post('open');




		if ($this->form_validation->run() == FALSE) {
			$this->session->set_flashdata('error', validation_errors());
			redirect('./admin/internships/edit/'.$id);
		}else{

			$this->admin_internships_model->update($id,$title,$slug,$tags,$description,$keywords,$body,$project_photo,$alt,$open);
			$this->session->set_flashdata('success', "Project Updated Successfully");

			redirect('./admin/internships/edit/'.$id);
		}


	}

	public function delete($id)
	{
		$this->admin_internships_model->delete($id);
		redirect('./admin/internships');

	}



	public function internship($id){

		$data['data']=$this->admin_internships_model->get_applicants($id);
		$data['title']="Internships";
		$data['css']='<link rel="stylesheet" href="'.base_url('assets/plugins/datatables/dataTables.bootstrap.css').'">';
		$data['js']='<script src="'.base_url('assets/plugins/datatables/jquery.dataTables.min.js').'"></script>
                    <script src="'.base_url('assets/plugins/datatables/dataTables.bootstrap.min.js').'"></script>';
		$data['script']='<script>
                    $(function () {
                        $("#example2").DataTable({
                            "paging": true,
                            "lengthChange": 5,
                            "searching": false,
                            "ordering": true,
                            "info": true,
                            "autoWidth": false
                        });
                    });
                </script>';



		$this->load->view('admin/layout/header',$data);
		$this->load->view('admin/layout/menu');
		$this->load->view('admin/internship/applicant',$data);
		$this->load->view('admin/layout/footer',$data);

	}


	public function delete_employee($applicant_id){
		$applicant_id=$this->uri->segment(5);
		$this->admin_internships_model->delete_employee($applicant_id);
		redirect('./admin/internships/'. $this->uri->segment(3));

	}
}
