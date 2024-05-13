<?php
echo view('layout/header');

?>

    <!-- CONTENT START -->
    <div class="page-content">

        <!-- INNER PAGE BANNER -->
        <div class="mt-bnr-inr overlay-wraper bg-parallax bg-top-center"  data-stellar-background-ratio="0.5">
            <div class="overlay-main bg-black opacity-07"></div>
            <div class="container">
                <div class="mt-bnr-inr-entry">
                    <div class="banner-title-outer">
                        <div class="banner-title-name">
                            <h2 class="m-b0">  <?= lang('sections.breadcrumb-msg1')?></h2>
                        </div>
                    </div>
                    <!-- BREADCRUMB ROW -->

                    <div>
                        <ul class="mt-breadcrumb breadcrumb-style-2">
                            <li ><a href="<?= base_url($lang)?>" style="color: #fff"><?= lang('sections.breadcrumb-home')?></a></li>
                            <li> <?= lang('sections.breadcrumb-about')?></li>
                        </ul>
                    </div>

                    <!-- BREADCRUMB ROW END -->
                </div>
            </div>
        </div>
        <!-- INNER PAGE BANNER END -->

        <!-- ABOUT COMPANY SECTION START -->
        <div class="section-full p-t30 p-b80 bg-white inner-page-padding">
            <div class="container">
                <div class="section-content ">
                    <div class="row">
                        <div class="col-md-5 col-sm-6">
                            <div class="m-about">
                                <div class="owl-carousel about-us-carousel">
                                    <!-- COLUMNS 1 -->
                                    <div class="item">
                                        <div class="ow-img">
                                            <a href="javascript:void(0);"><img src="../assets/images/pic4.jpg" alt=""></a>
                                        </div>
                                    </div>
                                    <!-- COLUMNS 2 -->
                                    <div class="item">
                                        <div class="ow-img">
                                            <a href="javascript:void(0);"><img src="../assets/images/pic5.jpg" alt=""></a>
                                        </div>
                                    </div>
                                    <!-- COLUMNS 3 -->
                                    <div class="item">
                                        <div class="ow-img">
                                            <a href="javascript:void(0);"><img src="../assets/images/pic7.jpg" alt=""></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-7 col-sm-6">
                            <div class="m-about-containt text-black p-t80">
                                <div class="m-about-years bg-moving" style="background-image:url(../assets/images/background/line.png);">
                                    <span class="text-primary large-title"><?= date('Y')- 2000?></span>
                                    <span class="large-title-info"><?= lang('home.years-of-experience')?></span>
                                </div>
                                <h3 class="font-weight-600"><?= lang('home.ceo-msg-title')?></h3>
                                <p class="cairo"><?= lang('home.ceo-msg')?></p>
                                <div class="author-info p-t20">



                                    <div class="author-name">
                                        <h4 class="m-t0"><?= lang('home.job-title')?></h4>
                                      
                                    </div>
                                    <a href="../<?=$lang?>/contact" class="site-button btn-effect m-b15"><span><?= lang('home.keep-on-touch')?></span></a>

                                </div>




                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <!-- ABOUT COMPANY SECTION END -->


        <!-- OUR SPECIALLIZATION START -->
        <div class="section-full p-tb80 bg-white bg-repeat square_shape2 inner-page-padding"  style="background-image:url(images/background/ptn-1.png)">

            <div class="container">

                <!-- TITLE START -->
                <div class="section-head">
                    <div class="mt-separator-outer separator-left">
                        <div class="mt-separator">
                            <h2 class="text-uppercase sep-line-one "><span class="font-weight-300 text-primary"><?= lang('home.our-services')?></span> </h2>
                        </div>
                    </div>
                </div>
                <!-- TITLE END -->

                <!-- IMAGE CAROUSEL START -->
                <div class="section-content">
                    <div class="row">

                        <div class="col-md-3 col-sm-6">

                            <div class="mt-icon-box-wraper m-b30">
                                <div class="relative icon-count-2 bg-gray p-a30 p-tb50">
                                    <span class="icon-count-number">1</span>
                                    <div class="icon-md inline-icon m-b15 text-primary scale-in-center">
                                        <span class="icon-cell"><img src="<?= base_url('assets/images/icon/crane-1.png')?>" alt=""></span>
                                    </div>
                                    <div class="icon-content">
                                        <h4 class="mt-tilte m-b25"><?= lang('home.services1')?></h4>

                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="col-md-3 col-sm-6">

                            <div class="mt-icon-box-wraper m-b30">
                                <div class="relative icon-count-2 bg-gray p-a30 p-tb50">
                                    <span class="icon-count-number">2</span>
                                    <div class="icon-md inline-icon m-b15 text-primary scale-in-center">
                                        <span class="icon-cell"><img src="<?= base_url('assets/images/icon/renovation.png')?>" alt=""></span>
                                    </div>
                                    <div class="icon-content">
                                        <h4 class="mt-tilte m-b25"><?= lang('home.services2')?></h4>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="col-md-3 col-sm-6">

                            <div class="mt-icon-box-wraper m-b30">
                                <div class="relative icon-count-2 bg-gray p-a30 p-tb50">
                                    <span class="icon-count-number">3</span>
                                    <div class="icon-md inline-icon m-b15 text-primary scale-in-center">
                                        <span class="icon-cell"><img src="<?= base_url('assets/images/icon/toolbox.png')?>" alt=""></span>
                                    </div>
                                    <div class="icon-content">
                                        <h4 class="mt-tilte m-b25"><?= lang('home.services4')?></h4>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="col-md-3 col-sm-6">

                            <div class="mt-icon-box-wraper m-b30">
                                <div class="relative icon-count-2 bg-gray p-a30 p-tb50">
                                    <span class="icon-count-number">4</span>
                                    <div class="icon-md inline-icon m-b15 text-primary scale-in-center">
                                        <span class="icon-cell"><img src="<?= base_url('assets/images/icon/compass.png')?>" alt=""></span>
                                    </div>
                                    <div class="icon-content">
                                        <h4 class="mt-tilte m-b25"><?= lang('home.services3')?></h4>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
        <!-- OUR SPECIALLIZATION END -->

       

        <!-- OUR STORY SECTION START -->
        <div class="section-full p-t80 p-b80 bg-dark bg-repeat square_shape2 inner-page-padding" style="background-image:url(../assets/images/background/bg-6.png)">
            <div class="container">
                <!-- TITLE START -->
                <div class="section-head">
                    <div class="mt-separator-outer separator-left">
                        <div class="mt-separator text-white">
                            <h2 class="text-uppercase sep-line-one "><span class="font-weight-300 text-primary"><?= lang('home.about-section')?></span> </h2>
                        </div>
                    </div>
                </div>
                <!-- TITLE END -->

                <div class="section-content our-story">

                    <div class="row">
                        <div class="col-md-4 col-sm-6">
                            <div class="our-story-pic-block">
                                <div class="mt-media our-story-pic">
                                    <img src="../assets/images/about/our-value.png" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8 col-sm-6">
                            <div class="mt-box our-story-detail bg-moving bg-cover" style="background-image:url(../assets/images/background/line.png)">

                                <h4 class="m-b20"><?= lang('sections.about-msg-title')?></h4>
                                <p class="cairo"><?= lang('sections.about-msg')?></p>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4 col-sm-6">
                            <div class="our-story-pic-block">
                                <div class="mt-media our-story-pic">
                                    <img src="../assets/images/about/our-mission.png" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8 col-sm-6">
                            <div class="mt-box our-story-detail bg-moving bg-cover" style="background-image:url(../images/background/line.png)">

                                <h4 class="m-b20"><?= lang('sections.about-mission')?></h4>
                                <p class="cairo"><?= lang('sections.about-mission-msg')?></p>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4 col-sm-6">
                            <div class="our-story-pic-block">
                                <div class="mt-media our-story-pic">
                                    <img src="../assets/images/about/our-vision.png" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8 col-sm-6">
                            <div class="mt-box our-story-detail bg-moving bg-cover" style="background-image:url(../images/background/line.png)">

                                <h4 class="m-b20"><?= lang('sections.about-vision')?></h4>
                                <p class="cairo"><?= lang('sections.about-vision-msg')?></p>
                            </div>
                        </div>
                    </div>

                    


                </div>
            </div>


        </div>
        <!-- OUR STORY SECTION END -->

    </div>
    <!-- CONTENT END -->

<?php
echo view('layout/footer');
?>