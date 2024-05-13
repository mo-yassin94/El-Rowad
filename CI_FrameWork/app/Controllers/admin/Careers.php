<?php

namespace App\Controllers\admin;


use App\Models\admin\AuthModel;
use App\Models\admin\CareersModel;
use CodeIgniter\Controller;

class Careers extends Controller {

    protected $db;
    protected $session;
    protected $helpers = ['url', 'form'];
    protected $adminModel;
    protected $careers;

    public function __construct()
    {

        $this->adminModel = new AuthModel();
        $this->careers=new CareersModel();
        $this->session =  \Config\Services::session();

        if(!$this->adminModel->AUTH()){
            header('Location: '.base_url('admin'));
            exit();
        }
    }
   
    public function index()
    {

        $data['data']=$this->careers->get_all();
        $data['title']="Careers";
        $data['css']='<link rel="stylesheet" href="'.base_url('assets/plugins/datatables-bs4/css/dataTables.bootstrap4.css').'">';
        $data['js']='<script src="'.base_url('assets/plugins/datatables/jquery.dataTables.js').'"></script>
                    <script src="'.base_url('assets/plugins/datatables-bs4/js/dataTables.bootstrap4.js').'"></script>';
        $data['script']='<script>
                    $(function () {
                    	 $("#example1").DataTable();
                        $("#example2").DataTable({
                           "paging": true,
						  "lengthChange": true,
						  "searching": false,
						  "ordering": true,
						  "info": true,
						  "autoWidth": false,
                        });
                    });
                </script>';



        echo view('admin/layout/header',$data);
        echo view('admin/layout/menu',$data);
        echo view('admin/careers/list',$data);
        echo view('admin/layout/footer',$data);

    }
    public function new_job()
    {
        $data['title']='New Job';
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


        echo view('admin/layout/header',$data);
        echo view('admin/layout/menu',$data);
        echo view('admin/careers/new',$data);
        echo view('admin/layout/footer',$data);


    }


    public function add()
    {

        $validation =  \Config\Services::validation();
        $request = \Config\Services::request();

        $validation->setRule('title', 'Title', 'trim|required|min_length[5]');

        $validation->setRule('slug', 'Slug', 'trim|required|min_length[5]');
        $validation->setRule('area3', 'Body', 'trim|required|min_length[15]');
        $validation->setRule('project_photo_src', 'Project Photo', 'trim|required');
        $validation->setRule('ar_title', 'Project Photo', 'trim|required');
        $validation->setRule('area4', 'Arabic Project Description', 'trim|required');


        $title=htmlentities($request->getPost('title'));
        $img=$request->getPost('project_photo_src');
        $body=htmlentities($request->getPost('area3'));
        $slug=$request->getPost('slug');
        $description=htmlentities($request->getPost('desc'));
        $tags=$request->getPost('tags');
        $open=$request->getPost('open');

        $ar_title= $request->getPost('ar_title');
        $ar_body= $request->getPost('area4');
        $ar_description= $request->getPost('ar_desc');
        $ar_tags= $request->getPost('ar_tags');

        if ($validation->run()) {

            $this->session->setFlashdata('error', $validation->getErrors());
            return redirect()->to(base_url('admin/careers/new'));
        }else{
            $this->session->setFlashdata('success', "Job Inserted Successfully");
            $this->careers->insert_career($title,$slug,$description,$tags,$img,$body,$open,$ar_title,$ar_tags,$ar_description,$ar_body);
            return redirect()->to(base_url('admin/careers/new'));
        }



    }



    public function edit($id)
    {


        $data['title']='Edit Job';
        $data['id']=$id;
		$data['css']='';
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

        echo view('admin/layout/header',$data);
        echo view('admin/layout/menu',$data);
        echo view('admin/careers/edit',$data);
        echo view('admin/layout/footer',$data);


    }

    public function update($id)
    {
        $validation =  \Config\Services::validation();
        $request = \Config\Services::request();
        
        $validation->setRule('title', 'Title', 'trim|required|min_length[5]');

        $validation->setRule('slug', 'Slug', 'trim|required|min_length[5]');
        $validation->setRule('area3', 'Body', 'trim|required|min_length[15]');
        $validation->setRule('project_photo_src', 'Project Photo', 'trim|required');
        $validation->setRule('ar_title', 'Project Photo', 'trim|required');
        $validation->setRule('area4', 'Arabic Project Description', 'trim|required');


        $title=htmlentities($request->getPost('title'));
        $img=$request->getPost('project_photo_src');
        $body=htmlentities($request->getPost('area3'));
        $slug=$request->getPost('slug');
		$description=htmlentities($request->getPost('desc'));
		$tags=$request->getPost('tags');
		$open=$request->getPost('open');

        $ar_title= $request->getPost('ar_title');
        $ar_body= $request->getPost('area4');
        $ar_description= $request->getPost('ar_desc');
        $ar_tags= $request->getPost('ar_tags');
        if ($validation->run()) {

            $this->session->setFlashdata('error', $validation->getErrors());
            return redirect()->to(base_url('admin/careers/edit/'.$id));
        }else{
            $this->session->setFlashdata('success', "Job Updated Successfully");
            $this->careers->update_career($id,$title,$slug,$description,$tags,$img,$body,$open,$ar_title,$ar_tags,$ar_description,$ar_body);
            return redirect()->to(base_url('admin/careers/edit/'.$id));
        }
    }

    public function delete($id)
    {
        $this->careers->delete_career($id);
        return redirect()->to(base_url('admin/careers'));

    }


	public function applicants($id)
	{

		$data['data']=$this->careers->get_applicants($id);
		$data['title']="Applicants";
		$data['css']='<link rel="stylesheet" href="'.base_url('assets/plugins/datatables-bs4/css/dataTables.bootstrap4.css').'">';
		$data['js']='<script src="'.base_url('assets/plugins/datatables/jquery.dataTables.js').'"></script>
                    <script src="'.base_url('assets/plugins/datatables-bs4/js/dataTables.bootstrap4.js').'"></script>';
		$data['script']='<script>
                    $(function () {
                    	 $("#example1").DataTable();
                        $("#example2").DataTable({
                           "paging": true,
						  "lengthChange": true,
						  "searching": false,
						  "ordering": true,
						  "info": true,
						  "autoWidth": false,
                        });
                    });
                </script>';



        echo view('admin/layout/header',$data);
        echo view('admin/layout/menu',$data);
		echo view('admin/careers/applicant',$data);
        echo view('admin/layout/footer',$data);

	}


	public function delete_applicant($id)
	{
		$this->careers->delete_applicant($id);
        $request = \Config\Services::request();
        return redirect()->to(base_url('admin/careers/'.$request->uri->getSegment(3)));

	}

}
