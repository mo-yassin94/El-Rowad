    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
              Projects Sections
                <small>advanced tables</small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><a href="#">Projects Sections</a></li>
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
									<th class="col-md-1">#</th>
                                    <th class="col-md-4">Title</th>
									<th class="col-md-2">Edit</th>
                                </tr>
                                </thead>
                                <tbody>

                                <?php
								  $i=1;
                                foreach ($data as $row){
                                    echo '
                                <tr>
                              		  <td>'.$i.'</td>
                                    
                                    <td>'.$row['section_name'].'</td>
                                   
                                    <td>
                                        <a class="btn btn-warning" href="'.base_url('admin/projects/sections/edit/'.$row['section_id']).'">
                                            <i class="fa fa-edit"></i> Edit
                                        </a>
                                        <a class="btn btn-danger" href="'.base_url('admin/projects/sections/delete/'.$row['section_id']).'">
                                            <i class="fa fa-remove"></i> Delete
                                        </a>

                                    </td>

                                </tr>';
                                    $i++;
                                }


                                ?>



                                </tbody>
                                <tfoot>
                                <tr>
									<th class="col-md-1">#</th>
                                    <th class="col-md-4">Title</th>
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
