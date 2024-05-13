<?php
echo view('layout/header');


                    foreach ($data as $item) {
                        if ($lang == "en") {
                            $title = $item['title'];
                            $description = $item['description'];
                            $content=$item['body'];
                        } else {
                            $title = $item['ar_title'];
                            $description = $item['ar_description'];
                            $content=$item['ar_body'];
                        }

                    }
                        
                        ?>
    <!-- CONTENT START -->
    <div class="page-content">

        <!-- INNER PAGE BANNER -->
        <div class="mt-bnr-inr overlay-wraper bg-parallax bg-top-center"  data-stellar-background-ratio="0.5"  >
            <div class="overlay-main bg-black opacity-07"></div>
            <div class="container">
                <div class="mt-bnr-inr-entry">
                    <div class="banner-title-outer">
                        <div class="banner-title-name">
                            <h2 class="m-b0">  <?= lang('sections.breadcrumb-msg1')?> </h2>
                        </div>
                    </div>
                    <!-- BREADCRUMB ROW -->

                    <div>
                        <ul class="mt-breadcrumb breadcrumb-style-2">
                            <li ><a href="<?= base_url($lang)?>" style="color: #fff"><?= lang('sections.breadcrumb-home')?></a></li>
                            <li ><a href="<?= base_url($lang.'/careers')?>" style="color: #fff"><?= lang('sections.breadcrumb-careers')?></a></li>
                            <li><?=$title?></li>
                        </ul>
                    </div>

                    <!-- BREADCRUMB ROW END -->
                </div>
            </div>
        </div>
        <!-- INNER PAGE BANNER END -->
        <!-- OUR SPECIALLIZATION START -->
        <div class="section-full mobile-page-padding bg-white  p-t80 p-b30 bg-repeat square_shape1" style="background-image:url('../assets/images/background/bg-5.png');">
            <div class="container">
                <!-- IMAGE CAROUSEL START -->
                <div class="section-content">
                    <div class="row">


                        <div class="col-lg-3 col-md-6 col-sm-12 m-b30">

                            <div class="mt-box our-speciallization-content">
                                <img src="<?= base_url('uploads/images/'.$item['image']) ?>" alt="">
                            </div>

                        </div>

                        <div class="col-lg-9 col-md-6 col-sm-12 m-b30">

                         <?= html_entity_decode($content)?>

                        </div>

                        <hr>
                        <?php

                        if($item['status']==1){   ?>

                        <div class="col-md-8 col-sm-6">
                            <form class="contact-form cons-contact-form" method="post" action="<?= base_url($lang.'/careers/'.$item['slug'].'/submit')?>" enctype="multipart/form-data">
                                <div class="contact-one m-b30">

                                    <!-- TITLE START -->
                                    <div class="section-head">
                                        <div class="mt-separator-outer separator-left">
                                            <div class="mt-separator">
                                                <h2 class="text-uppercase sep-line-one ">
                                                    <span class="font-weight-300 text-primary"><?= lang('sections.careers-jobs-open')?> </span>  </h2>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- TITLE END -->
                                    <?php
                                    $session=session();
                                    if($session->getFlashdata('sent')){
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

                                    }elseif($session->getFlashdata('st_error')){
                                        echo '<div class="alert alert-danger alert-dismissable">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <h4><i class="icon fa fa-ban"></i> Error!</h4>';

                                        echo $session->getFlashdata('st_error');
                                        echo '</div>';
                                    }
                                    ?>
                                    <div class="form-group">
                                        <input name="fullname" type="text" required="" class="form-control" placeholder="<?= lang('sections.careers-apply-name')?> ">
                                    </div>
                                    <div class="form-group">
                                        <input name="phone" type="text" class="form-control" required="" placeholder="<?= lang('sections.careers-apply-phone')?> ">
                                    </div>
                                    <div class="form-group">
                                        <input name="email" type="email" class="form-control" required="" placeholder="<?= lang('sections.careers-apply-email')?>">
                                    </div>
                                    <input type="hidden" name="<?= csrf_token()?>" value="<?= csrf_hash()?>">
                                    <div class="form-group">
                                        <label for=""><?= lang('sections.careers-apply-cv')?></label>
                                        <input name="cv" type="file" class="form-control" required="" placeholder="">
                                    </div>

                                    <div class="text-right">
                                        <button name="submit" type="submit" value="Submit" class="site-button btn-effect"><?= lang('sections.careers-apply-submit')?>

                                        </button>
                                    </div>

                                </div>
                            </form>                                                                             
                        </div>

                            <?php
                        } else{
                           echo ' <h2 class="text-uppercase sep-line-one center-block" align="center">
                                     <span class="font-weight-300 text-primary"> '.lang('sections.careers-jobs-closed').'  </span> 
                                  </h2>
                                  <br><br>';
                        }
                        ?>
                      



                    </div>
                </div>
            </div>
            <div class="hilite-title text-right p-r50 text-uppercase text-pop-up-top">
                &nbsp;
            </div>
        </div>
        <!-- OUR SPECIALLIZATION END -->



    </div>
    <!-- CONTENT END -->

<?php
echo view('layout/footer');
?>