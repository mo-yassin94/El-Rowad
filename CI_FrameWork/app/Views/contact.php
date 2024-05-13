<?php
echo view('layout/header');

?>

    <!-- CONTENT START -->
    <div class="page-content">

        <!-- INNER PAGE BANNER -->
        <div class="mt-bnr-inr overlay-wraper bg-parallax bg-top-center"  data-stellar-background-ratio="0.5" >
            <div class="overlay-main bg-black opacity-07"></div>
            <div class="container">
                <div class="mt-bnr-inr-entry">
                    <div class="banner-title-outer">
                        <div class="banner-title-name">
                            <h2 class="m-b0"><?= lang('sections.breadcrumb-msg1')?></h2>
                        </div>
                    </div>
                    <!-- BREADCRUMB ROW -->

                    <div>
                        <ul class="mt-breadcrumb breadcrumb-style-2">
                            <li><a href="<?= base_url($lang)?>" style="color: #fff"><?= lang('sections.breadcrumb-home')?></a></li>
                            <li><?= lang('sections.breadcrumb-contact')?></li>
                        </ul>
                    </div>

                    <!-- BREADCRUMB ROW END -->
                </div>
            </div>
        </div>
        <!-- INNER PAGE BANNER END -->

        <!-- SECTION CONTENTG START -->
        <div class="section-full p-tb80 inner-page-padding">
            <!-- LOCATION BLOCK-->
            <div class="container">

                <!-- GOOGLE MAP & CONTACT FORM -->
                <div class="section-content">
                    <!-- CONTACT FORM-->
                    <div class="row">
                        <div class="col-md-8 col-sm-6">
                            <form class="contact-form cons-contact-form" method="post" action="<?= base_url($lang.'/contact/send')?>">
                                <div class="contact-one m-b30">

                                    <!-- TITLE START -->
                                    <div class="section-head">
                                        <div class="mt-separator-outer separator-left">
                                            <div class="mt-separator">
                                                <h2 class="text-uppercase sep-line-one ">
                                                    <span class="font-weight-300 text-primary"><?= lang('sections.contact-get-call')?></span>  </h2>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- TITLE END -->
                                    <?php
                                    $session=session();
                                    if($session->getFlashdata('email_sent')){

                                        echo '<div class="alert alert-success alert-dismissable">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <h4>	<i class="icon fa fa-check"></i> Successful!</h4>   ';
                                        if($lang=="en"){
                                            echo  $session->getFlashdata('email_sent');
                                        }else{
                                            echo "تم ارسال الرساله بنجاح";
                                        }

                                        echo '</div>';

                                    }elseif($session->getFlashdata('email_error')){
                                        echo '<div class="alert alert-danger alert-dismissable">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <h4><i class="icon fa fa-ban"></i> Error!</h4>';
                                              if($lang=="en"){
                                               echo   $session->getFlashdata('email_error') . '<br>';
                                              }else{
                                                   echo "حدث خطا .... حاول مره اخري ";
                                              }

                                        
                                        echo '</div>';

                                    }elseif($session->getFlashdata('error')){
                                        echo '<div class="alert alert-danger alert-dismissable">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <h4><i class="icon fa fa-ban"></i> Error!</h4>';
                                        if($lang=="en"){
                                            foreach ($session->getFlashdata('error') as $Validation_Err) {
                                                echo $Validation_Err . '<br>';
                                            }
                                        }else{
                                            
                                        }


                                        echo '</div>';

                                    }

                                    ?>
                                    <div class="form-group">
                                        <input name="name" type="text" value="" required class="form-control" placeholder="<?= lang('sections.careers-apply-name')?>">
                                    </div>
                                    <div class="form-group">
                                        <input name="phone" type="text"  value="" class="form-control" required placeholder="<?= lang('sections.careers-apply-phone')?>">
                                    </div>
                                    <div class="form-group">
                                        <input name="email" type="email" value="" class="form-control" required placeholder="<?= lang('sections.careers-apply-email')?>">
                                    </div>

                                    <div class="form-group">
                                        <textarea name="message" rows="4" class="form-control " required placeholder="<?= lang('sections.contact-msg')?>">

                                        </textarea>
                                    </div>
                                    <input type="hidden" name="<?= csrf_token()?>" value="<?= csrf_hash()?>">
                                    <div class="text-right">
                                        <input name="submit" type="submit" class="site-button btn-effect" value="<?= lang('sections.careers-apply-submit')?>"  >

                                        </button>
                                    </div>

                                </div>
                            </form>
                        </div>
                        <div class="col-md-4 col-sm-6">
                            <div class="contact-info m-b30">
                                <!-- TITLE START -->
                                <div class="section-head">
                                    <div class="mt-separator-outer separator-left">
                                        <div class="mt-separator">
                                            <h2 class="text-uppercase sep-line-one "><span class="font-weight-300 text-primary"><?= lang('sections.contact-info')?></span> </h2>
                                        </div>
                                    </div>
                                </div>
                                <!-- TITLE END -->
                                <div class="bg-navy p-a20 text-white">
                                    <div class="mt-icon-box-wraper left p-b40">
                                        <div class="icon-xs"><i class="fa fa-phone"></i></div>
                                        <div class="icon-content">
                                            <h5 class="m-t0 font-weight-500"><?= lang('sections.contact-phone')?></h5>
                                            <a href="tel:002-25600005" class="white-color">002-25600005</a>
                                        </div>
                                    </div>

                                    <div class="mt-icon-box-wraper left p-b40">
                                        <div class="icon-xs"><i class="fa fa-mobile-phone"></i></div>
                                        <div class="icon-content">
                                            <h5 class="m-t0 font-weight-500"><?= lang('sections.contact-mobile')?></h5>
                                            <a href="tel:01020953030" class="white-color">01020953030</a>
                                        </div>
                                    </div>

                                    <div class="mt-icon-box-wraper left p-b40">
                                        <div class="icon-xs"><i class="fa fa-whatsapp"></i></div>
                                        <div class="icon-content">
                                            <h5 class="m-t0 font-weight-500"><?= lang('sections.contact-whats')?> </h5>
                                            <a href="https://wa.me/00201020953030" target="_blank" class="white-color">01020953030</a>
                                        </div>
                                    </div>

                                    <div class="mt-icon-box-wraper left p-b40">
                                        <div class="icon-xs"><i class="fa fa-envelope"></i></div>
                                        <div class="icon-content">
                                            <h5 class="m-t0 font-weight-500"> <?= lang('sections.contact-email')?></h5>
                                            <a class="white-color" href="mailto:Info@ElRowad-EG.com">Info@ElRowad-EG.com</a>
                                        </div>
                                    </div>

                                    <div class="mt-icon-box-wraper left">
                                        <div class="icon-xs"><i class="fa fa-map-marker"></i></div>
                                        <div class="icon-content">
                                            <h5 class="m-t0 font-weight-500"> <?= lang('sections.contact-address')?></h5>
                                            <p class="cairo"><?= lang('site.contact-address')?></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="gmap-outline">
                    <iframe src="https://www.google.com/maps/d/embed?mid=1mLY_2YZz9d2pK7U2R_-eYExMGWtzpObb" width="100%" height="500"></iframe>
                </div>
            </div>
        </div>

        <!-- SECTION CONTENT END -->

    </div>
    <!-- CONTENT END -->



<?php
echo view('layout/footer');
?>