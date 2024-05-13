<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            Careers
            <small>advanced tables</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li><a href="#">Careers</a></li>
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
                                <th class="col-md-4">Name</th>
                                <th class="col-md-2">Applicants</th>
                                <th class="col-md-3">Creation Date</th>
                                <th class="col-md-2">Edit</th>
                            </tr>
                            </thead>
                            <tbody>

                            <?php
                            helper('date_time');
                            $applicant=new \App\Models\admin\CareersModel();

                            foreach ($data as $row){
                                if($row['status']==1){
                                    $status= '';
                                }else{
                                    $status= '<span class="btn btn-xs btn-danger  rounded"> <i class="fa fa-close"> Closed </i> </span> ';
                                }
                                echo '
                                <tr>
                                    <td><a href="./careers/'.$row['id'].'"> '.$row['title'].'</a> '.$status.'</td>
                                      <td>'.$applicant->applicants($row['id']).'</td>
                                    <td >'.format_date($row['modified_date']).' - '
                                    .format_Time($row['modified_time']).'</td>
                                   
                                    <td>
                                       
                                        <a class="btn btn-warning" href="./careers/edit/'.$row['id'].'">
                                            <i class="fa fa-edit"></i> Edit
                                        </a>
                                        <a class="btn btn-danger" href="./careers/delete/'.$row['id'].'">
                                            <i class="fa fa-remove"></i> Delete
                                        </a>

                                    </td>

                                </tr>';
                            }


                            ?>




                            </tbody>
                            <tfoot>
                            <tr>
                                <th class="col-md-4">Name</th>
                                <th class="col-md-2">Applicants</th>
                                <th class="col-md-3">Creation Date</th>
                                <th class="col-md-2">Edit</th>
                            </tr>
                            </tfoot>
                        </table>
                    </div><!-- /.box-body -->
                </div><!-- /.box -->
            </div><!-- /.col -->
        </div><!-- /.row -->
    </section><!-- /.content -->
</div><!-- /.content-wrapper -->


