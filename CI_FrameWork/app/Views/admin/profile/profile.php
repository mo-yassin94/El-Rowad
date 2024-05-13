<?php
$get=new \App\Models\admin\AuthModel();
$session=session();
$data=$get->get_user_data($session->get('session'));
foreach ($data as $row){
	$data['id']=$row['id'];
	$data['name']=$row['name'];
	$data['email']=$row['email'];
	$data['avatar']=$row['avatar'];
	$data['user_name']=$row['user_name'];
	$data['password']=$row['password'];


}

?>
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<!-- Content Header (Page header) -->
	<section class="content-header">
		<h1>
			Profile
			<small>Control panel</small>
		</h1>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
			<li class="active">Profile</li>
		</ol>
	</section>
	<!-- Main content -->
	<section class="content-details">
		<form class="content" action="./profile/update/" method="post" enctype="multipart/form-data" >
			<h4># Edit : <?=$data['user_name'];?></h4>
            <?php

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
							<label class="col-xs-3">Email</label>
							<div class="col-xs-10 pull-left">
								<input class="form-control" type="text" placeholder="Email" value="<?=$data['email'];?>" id="title" name="email" required>
								<i class="small"> &nbsp;</i>
							</div>
						</div>

						<div class="row">
							<label class="col-xs-3">Old Password</label>
							<div class="col-xs-10 pull-left">
								<input class="form-control input-sm" type="text" placeholder="Old Password" value="" name="old_password" >
							</div>
						</div>

						<div class="row">
							<label class="col-xs-3">Password</label>
							<div class="col-xs-10 pull-left">
								<input class="form-control input-sm" type="text" placeholder="Password" value="" name="password" >
							</div>
						</div>

					</div>
					<br><br>
					<div class="form-group col-md-10" style="padding-top: 25px;">
						<label class="col-xs-3"> Avatar</label>

						<input type="text" onclick="openKCFinder_img(this)" class="form-control " value="<?=$data['avatar'];?>" name="user_photo_src">



					</div>


					<?php

					helper('storage_helper');
					?>

					<script type="text/javascript">


						function openKCFinder_img( field ) {
							window.KCFinder = {
								callBack: function ( url ) {
									field.value = url;
									window.KCFinder = null;
								}
							};
							window.open( '../assets/plugins/kcfinder/browse.php?type=images&dir=images/avatar/' , 'kcfinder_textbox',
								'status=0, toolbar=0, location=0, menubar=0, directories=0, ' +
								'resizable=1, scrollbars=0, width=800, height=600'
							);
						}


					</script>






				</div>

			<div class="col-2 pull-left">
				<img src="<?= base_url($row['avatar'])?>" width="120" height="120" class="rounded">


			</div>



				<input type="hidden" name="<?= csrf_token();?>" value="<?= csrf_hash();?>">







				<div class="row col-md-6">
					<div class="col-md-3 pull-left" ><input type="submit" class="btn btn-block btn-success btn-sm col-md-2 pull-right" id="insert" value="Update"></div>

				</div>





				<script>
					var baseURL='<?=base_url();?>';
				</script>

		</form>
	</section><!-- /.content -->
</div><!-- /.content-wrapper -->

