<?php
namespace App\Controllers\admin;


use App\Models\admin\AuthModel;
use App\Models\admin\ClientsModel;
use CodeIgniter\Controller;


class Clients extends Controller {

    protected $db;
    protected $session;
    protected $helpers = ['url', 'form'];
    protected $adminModel;
    protected $clients;
    
    public function __construct()
    {

        $this->adminModel = new AuthModel();
        $this->clients=new ClientsModel();
        $this->session =  \Config\Services::session();
        if(!$this->adminModel->AUTH()){
            header('Location: '.base_url('admin'));
            exit();
        }
    }


    public function index()
    {

        $data['data']=$this->clients->get_all();
        $data['title']="Clients";
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



        echo view('admin/layout/header',$data);
        echo view('admin/layout/menu');
        echo view('admin/clients/list',$data);
        echo view('admin/layout/footer',$data);
    }
    public function new_project()
    {
       
        $data['title']='New Client';

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
        echo view('admin/layout/menu');
        echo view('admin/clients/new',$data);
        echo view('admin/layout/footer',$data);

    }


    public function add()
    {

        $validation =  \Config\Services::validation();
        $request = \Config\Services::request();

        $validation->setRule('title', 'Title', 'trim|required|min_length[5]');
        $validation->setRule('slug', 'Slug', 'trim|required|min_length[5]');
         
         $validation->setRule('area3', 'Project Description', 'trim|required');
         $validation->setRule('project_photo_src', 'Project Photo', 'trim|required');
         $validation->setRule('ar_title', 'Project Photo', 'trim|required');
         $validation->setRule('area4', 'Arabic Project Description', 'trim|required');


        $title= $request->getPost('title');
        $slug= $request->getPost('slug');

	
        $project_photo= $request->getPost('project_photo_src');


        $body= $request->getPost('area3');
        $description= $request->getPost('desc');
        $tags= $request->getPost('tags');

        $ar_title= $request->getPost('ar_title');
        $ar_body= $request->getPost('area4');
        $ar_description= $request->getPost('ar_desc');
        $ar_tags= $request->getPost('ar_tags');


        if ($validation->run()) {
            $this->session->setFlashdata('error', $validation->getErrors());
            return redirect()->to(base_url('admin/clients/new'));
        }else{

            $this->clients->insert_client($title,$slug,$tags,$description,$body,$project_photo,$ar_title,$ar_body,$ar_tags,$ar_description);
            $this->session->setFlashdata('success', "Client Inserted Successfully");

            return redirect()->to(base_url('admin/clients/new'));
        }


    }



    public function edit($id)
    {
        $data['title']='Edit  Client';
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


        echo view('admin/layout/header',$data);
        echo view('admin/layout/menu',$data);
        echo view('admin/clients/edit',$data);
        echo view('admin/layout/footer',$data);

    }

    public function update($id)
    {

        $validation =  \Config\Services::validation();
        $request = \Config\Services::request();

        $validation->setRule('title', 'Title', 'trim|required|min_length[5]');
        $validation->setRule('slug', 'Slug', 'trim|required|min_length[5]');
        $validation->setRule('area3', 'Project Description', 'trim|required');
        $validation->setRule('project_photo_src', 'Project Photo', 'trim|required');
        $validation->setRule('ar_title', 'Project Photo', 'trim|required');
        $validation->setRule('area4', 'Arabic Project Description', 'trim|required');


        $title= $request->getPost('title');
        $slug= $request->getPost('slug');


        $project_photo= $request->getPost('project_photo_src');


        $body= $request->getPost('area3');
        $description= $request->getPost('desc');
        $tags= $request->getPost('tags');

        $ar_title= $request->getPost('ar_title');
        $ar_body= $request->getPost('area4');
        $ar_description= $request->getPost('ar_desc');
        $ar_tags= $request->getPost('ar_tags');




		if ($validation->run()) {
			$this->session->setFlashdata('error', $validation->getErrors());
            return redirect()->to(base_url('admin/clients/edit/'.$id));
		}else{

			$this->clients->update_client($id,$title,$slug,$tags,$description,$body,$project_photo,$ar_title,$ar_body,$ar_tags,$ar_description);
			$this->session->setFlashdata('success', "Client Updated Successfully");

            return redirect()->to(base_url('admin/clients/edit/'.$id));
		}


    }

    public function delete($id)
    {
		$this->clients->delete_client($id);
        return redirect()->to(base_url('admin/clients'));

    }


}
