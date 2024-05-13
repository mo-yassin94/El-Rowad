    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                Articles
                <small>advanced tables</small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><a href="#">Articles</a></li>
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
                                    <th class="col-md-4">Title</th>

                                    <th class="col-md-3">Creation Date</th>
                                    <th class="col-md-2">Edit</th>
                                </tr>
                                </thead>
                                <tbody>

                                <?php
							    helper('date_time');
                                foreach ($data as $row){
                                    echo '
                                <tr>
                                    <td>'.$row['title'].'</td>
                                   
                                    <td title="Last Modified: '.format_date($row['modified_date']).' - '.format_Time($row['modified_time']).'">'.format_date($row['creation_date']).' - '
										.format_Time
										($row['creation_time']).'</td>
                                   
                                    <td>
                                        <a class="btn btn-success" href="'.base_url('ar/articles/'.$row['id']).'" target="_blank">
                                            <i class="fa fa-search"></i> View
                                        </a>

                                        <a class="btn btn-warning" href="./articles/edit/'.$row['id'].'">
                                            <i class="fa fa-edit"></i> Edit
                                        </a>
                                        <a class="btn btn-danger" href="./articles/delete/'.$row['id'].'">
                                            <i class="fa fa-remove"></i> Delete
                                        </a>

                                    </td>

                                </tr>';
                                }


                                ?>



                                </tbody>
                                <tfoot>
                                <tr>
                                    <th class="col-md-4">Title</th>
                                    
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
