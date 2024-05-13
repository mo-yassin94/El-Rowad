    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
               Users  
                <small>advanced tables</small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><a href="#">Users</a></li>
                <li class="active">List</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-xs-12">


                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">Data Table With Full Features</h3>
                        </div><!-- /.box-header -->
                        <div class="box-body">
                            <table id="example2" class="table table-bordered table-striped">
                                <thead>
                                <tr>
									<th class="col-md-2">Avatar</th>
                                    <th class="col-md-4">Name</th>
									<th class="col-md-1">Email</th>
                                    <th class="col-md-3">User Name</th>
                                    <th class="col-md-2">Edit</th>
                                </tr>
                                </thead>
                                <tbody>

                                <?php
							    helper('date_time');
								$users=New \App\Models\admin\UsersModel();
								$data=$users->get_all();
                              
								foreach ($data as $row){

                                    echo '
                                <tr>
                                <td> <img src="'.base_url($row['avatar']).'" width="45" height="45" ></td>
                                    <td> '.$row['name'].'</td>
                                     <td>'.$row['email'].'</td>
                                    <td >'.$row['user_name'].'</td>
                                
                                    <td>
                                        

                                        <a class="btn btn-warning" href="./users/edit/'.$row['id'].'">
                                            <i class="fa fa-edit"></i> Edit
                                        </a>
                                        <a class="btn btn-danger" href="./users/delete/'.$row['id'].'">
                                            <i class="fa fa-remove"></i> Delete
                                        </a>

                                    </td>

                                </tr>';
                                }


                                ?>



                                </tbody>
                                <tfoot>
                                <tr>
									<th class="col-md-2">Avatar</th>
									<th class="col-md-4">Name</th>
									<th class="col-md-1">Email</th>
									<th class="col-md-3">User Name</th>
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
