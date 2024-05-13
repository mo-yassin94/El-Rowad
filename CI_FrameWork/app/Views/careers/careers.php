<?php
echo view('layout/header');
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
                            <li><?= lang('sections.breadcrumb-careers')?></li>
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

                    <?php
                    foreach ($data as $item){
                         if ($lang=="en"){
                             $title=$item['title'];
                         }else{
                             $title=$item['ar_title'];
                         }

                        echo '<div class="col-lg-3 col-md-4  col-sm-6 m-b30">

                        <div class="image-effect-one hover-shadow">
                           <a href="'.base_url($lang.'/careers/'.$item['slug']).'"><img src="'.base_url('uploads/images/'.$item['image']).'" alt="" /></a> 
                            <div class="figcaption bg-dark">
                                <h4>'.$title.'</h4>
                               
                                <a href="'.base_url($lang.'/careers/'.$item['slug']).'"><i class="link-plus bg-primary"></i></a>
                            </div>

                        </div>

                    </div>';
                    }
                    ?>


                    <div class="col-lg-3 col-md-12 col-sm-6 m-b30">

                        <div class="mt-box our-speciallization-content">
                            <h3 class="m-t0"><b class="font-weight-100"><?= lang('sections.careers-jobs')?></b> <br></h3>
                            <p class="cairo"><?= lang('sections.careers-jobs-apply')?></p>
                            <a href="mailto:jobs@elrowad-eg.com" class="site-button btn-effect" style="font-size: 12px"><?= lang('sections.careers-jobs-send')?></a>
                        </div>

                    </div>
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