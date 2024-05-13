<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            Project Section
            <small>Control panel</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Project Section</li>
        </ol>
    </section>
    <!-- Main content -->
    <section class="content-details">
    <form class="content" action="<?= base_url('admin/projects/sections/add');?>" method="post" enctype="multipart/form-data">
		
    <h4># New Project Section</h4>

        <div class="container-fluid subscription-form">
            <div class="row">
                <div class="col-md-12">
                    <div class="tabbable-panel">
                        <div class="tabbable-line">

                            <ul class="nav nav-tabs">
                                <li class="active">
                                    <a href="#tab_default_1" data-toggle="tab">
                                        <img src="<?= base_url('assets/images/en-flag-icon.jpg')?>" width="20" height="15">   English </a>
                                </li>
                                <li>
                                    <a href="#tab_default_2" data-toggle="tab">
                                        <img src="<?= base_url('assets/images/ar-flag-icon.jpg')?>" width="20" height="15">   Arabic </a>
                                </li>
                            </ul>

                            <div class="tab-content">

                                <div class="tab-pane active" id="tab_default_1">

                                    <?php
                                    $session=session();
                                    if($session->getFlashdata('success')){
                                        echo '<div class="alert alert-success alert-dismissable">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <h4>	<i class="icon fa fa-check"></i> Successful!</h4>
                    '.$session->getFlashdata('success').'
                  </div>';

                                    }elseif($session->getFlashdata('error')){
                                        echo '<div class="alert alert-danger alert-dismissable">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <h4><i class="icon fa fa-ban"></i> Error!</h4>';
                                        foreach ($session->getFlashdata('error') as $Validation_Err) {
                                            echo $Validation_Err . '<br>';
                                        }

                                        echo '</div>';

                                    }
                                    ?>
                                    <br>
                                    
        <div class="col-lg-8 row">
        <div class="col-lg-12">
            <br>
            <div class="row">
            <label class="col-xs-1">Title</label>
            <div class="col-xs-6 pull-left">
                <input class="form-control" type="text" placeholder="Title" id="title" name="title" required>
                <i class="small"> &nbsp;</i>
            </div>
             </div>


            <div class="row">
                <label class="col-xs-1">Slug</label>
                <div class="col-xs-6 pull-left">
                    <input class="form-control input-sm" type="text" placeholder="Project-slug" name="slug" id="slug">
                    <i class="small" id="slug_status">  &nbsp;</i>
                </div>
            </div>

        </div>

			<br><br>
            
            
    </div>


        <aside class="box box-primary" style="border-top: none">
            <div class="col-md-4">
                <h4><i class="fa fa-fw fa-file-text-o"></i> Section Meta</h4>
                <!-- Custom Tabs -->
                <div class="nav-tabs-custom">
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">Description</a></li>
                        <li class=""><a href="#tab_2" data-toggle="tab"
										aria-expanded="false">Tags</a></li>


                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="tab_1">
                            <div class="form-group">
                                <label>Describe Your Project:</label>
                                <textarea class="form-control" rows="3" name="desc" placeholder="Enter ..."></textarea>
                            </div>

                        </div><!-- /.tab-pane -->
                        <div class="tab-pane" id="tab_2">
                            <div class="form-group">
                                <label>Project Keywords:</label>
                                <textarea class="form-control" rows="3" name="tags"
										  placeholder="Enter ..."></textarea>
                            </div>

                        </div><!-- /.tab-pane -->

                    </div><!-- /.tab-content -->
                </div><!-- nav-tabs-custom -->

            </div>


            <input type="hidden" name="<?= csrf_token() ?>" value="<?= csrf_hash() ?>" />
			<input type="hidden" name="section" value="project_sections">
			
			
        <div class="col-md-1 col-sm-2 col-xs-4">
            <input type="reset" class="btn btn-block btn-warning btn-sm col-sm-1 pull-left" value="Reset">
        </div>

        <div class="col-md-1 col-sm-2 col-xs-4">
            <input type="submit" class="btn btn-block btn-success btn-sm col-sm-1 pull-right" value="Insert">
        </div>
		

</aside>
                                </div>

        <div class="tab-pane" id="tab_default_2" dir="rtl">

            <div class="tab-pane" id="tab_default_2" dir="rtl">

                <div class="col-md-4">
                    <h4><i class="fa fa-fw fa-file-text-o"></i>تفاصيل اخرى </h4>
                    <!-- Custom Tabs -->
                    <div class="nav-tabs-custom">
                        <ul class="nav nav-tabs pull-right">
                            <li class="active"><a href="#tab_4" data-toggle="tab" aria-expanded="true">الوصف</a></li>

                            <li class=""><a href="#tab_6" data-toggle="tab" aria-expanded="false">الوسوم</a></li>

                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="tab_4">
                                <div class="form-group">
                                    <label>وصف قصير للمشروع :</label>
                                    <textarea class="form-control" rows="3" name="ar_desc" placeholder=" ..."></textarea>
                                </div>

                            </div><!-- /.tab-pane -->

                            <div class="tab-pane" id="tab_6">

                                <div class="form-group">
                                    <label>الوسوم :</label>
                                    <textarea class="form-control" rows="3" name="ar_tags" placeholder=" ..."></textarea>
                                </div>
                            </div><!-- /.tab-pane -->
                        </div><!-- /.tab-content -->
                    </div><!-- nav-tabs-custom -->

                </div>
                <div class="col-lg-8 row">
                    <br>
                    <div class="row" dir="rtl">
                        <label class="col-xs-1 pull-right">العنوان </label>
                        <div class="col-xs-6 pull-right">
                            <input class="form-control" type="text" placeholder="العنوان" id="ar_title" name="ar_title" required>
                            <i class="small"> &nbsp;</i>
                        </div>
                    </div>


                </div>



            </div>


        </div><!-- End Tab-content -->
</div><!-- End Tabbed-Line -->
</div><!-- Tabbed Panel -->
</div><!-- End col-md-12 -->
</div><!--end Row -->
</div><!-- end Container  -->







</form>
    </section><!-- /.content -->
</div><!-- /.content-wrapper -->

