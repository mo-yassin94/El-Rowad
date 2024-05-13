<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            Projects
            <small>advanced tables</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li><a href="#">Projects</a></li>
            <li class="active">List</li>
        </ol>
    </section>
    <!-- Main content -->
    <section class="content">
        <div class="row">
            <div class="col-xs-12">


                <div class="box">
                    <div class="box-header">

                    </div><!-- /.box-header -->
                    <div class="box-body">
								<table id="example2" class="table table-bordered table-striped">

									<thead>
                                <tr>
                                    <th class="">Name</th>
                                    <th class="">Email</th>
                                    <th class="">Phone</th>

                                    <th class="">Applied Date</th>
                                    <th class="">CV</th>
                                    <th class="">Manage</th>
                                </tr>
                                </thead>
                                <tbody>

                                <?php
								 helper('date_time');
                                foreach ($data as $row){
                                    echo '
                                <tr>
                                    <td> '.$row['name'].'</td>
                                    <td> '.$row['email'].'</td>
                                    <td> '.$row['phone'].'</td>
                                    
                                    <td>'.format_date($row['apply_date']).' - '
										.format_Time
										($row['apply_time']).'</td>
                                    <td><a href="'.base_url('uploads/files/careers/cv/'.$row['cv']).'"><i class="fa fa-download"></i> Download</a> </td>
                                    <td>
                                        
                                        <a class="btn btn-danger" href="../careers/'.$row['id'].'/delete/'.$row['applicant_id'].'">
                                            <i class="fa fa-remove"></i> Delete
                                        </a>

                                    </td>

                                </tr>';
                                }


                                ?>



                                </tbody>
									</tfoot>
								</table>
                    </div><!-- /.box-body -->
                </div><!-- /.box -->
            </div><!-- /.col -->
        </div><!-- /.row -->
    </section><!-- /.content -->
</div><!-- /.content-wrapper -->


