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
                            <h2 class="m-b0"><?= lang('sections.breadcrumb-msg2')?></h2>
                        </div>
                    </div>
                    <!-- BREADCRUMB ROW -->

                    <div>
                        <ul class="mt-breadcrumb breadcrumb-style-2">
                            <li><a href="<?= base_url($lang)?>" style="color: #fff"><?= lang('sections.breadcrumb-home')?></a></li>
                            <li><?= lang('sections.breadcrumb-services')?></li>
                        </ul>
                    </div>

                    <!-- BREADCRUMB ROW END -->
                </div>
            </div>
        </div>
        <!-- INNER PAGE BANNER END -->

        <!-- ABOUT COMPANY SECTION START -->
        <div class="section-full p-t80 bg-white">
            <div class="container">
                <div class="section-content ">
                    <div class="m-service-containt text-black">
                        <div class="row">
                            <div class="col-md-5 col-sm-12">
                                <div class="service-about-left">
                                    <div class="mt-media">
                                        <img src="../assets/images/about/pic2.jpg" alt="" width="100%" style="height: 400px">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-7 col-sm-12">
                                <div class="service-about-right m-b30">
                                    <h3 class="m-t0"><?= lang('sections.services-first-section-title')?></h3>
                                    <p><?= lang('sections.services-first-section')?></p>
                                    <div class="call-for-quote-outer">
                                        <div class="call-quote">

                                            <h4 class="white-color"><?= lang('sections.contact-us')?></h4>
                                        </div>
                                        <div class="call-estimate bg-dark">
                                            <a href="" class="site-button-secondry btn-effect"><?= lang('sections.send-message')?></a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ABOUT COMPANY SECTION END -->

        

        <!-- OUR All SERVICES START -->
        <div class="section-full p-t80 p-b50 bg-white" style="background-image:url(../assets/images/background/bg-5.png);">

            <div class="container">

                <!-- TITLE START -->
                <div class="section-head">
                    <div class="mt-separator-outer separator-center">
                        <div class="mt-separator">
                            <h2 class="text-uppercase sep-line-one "><span class="font-weight-300 text-primary"><?= lang('sections.services')?></span> </h2>
                        </div>
                    </div>
                </div>
                <!-- TITLE END -->

                <!-- IMAGE CAROUSEL START -->
                <div class="section-content">
                    <div class="row">

                        <div class="col-md-6 col-sm-6 m-b30">
                            <div class="mt-icon-box-wraper bx-style-1 p-a20 left bg-white block-shadow">
                                <div class="mt-icon-box-xs text-secondry bg-white radius bdr-1  bdr-solid scale-in-center">
                                    <span class="icon-cell text-secondry"><i class="fa fa-trophy"></i></span>
                                </div>
                                <div class="icon-content">
                                    <h4 class="mt-tilte"><?= lang('sections.service1')?></h4>
                                    <p><?= lang('sections.service1-description')?></p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 col-sm-6 m-b30">
                            <div class="mt-icon-box-wraper bx-style-1 p-a20 left bg-white block-shadow">
                                <div class="mt-icon-box-xs text-secondry bg-white radius bdr-1  bdr-solid scale-in-center">
                                    <span class="icon-cell text-secondry"><i class="fa fa-trophy"></i></span>
                                </div>
                                <div class="icon-content">
                                    <h4 class="mt-tilte"><?= lang('sections.service2')?></h4>
                                    <p><?= lang('sections.service2-description')?></p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 col-sm-6 m-b30">
                            <div class="mt-icon-box-wraper bx-style-1 p-a20 left bg-white block-shadow">
                                <div class="mt-icon-box-xs text-secondry bg-white radius bdr-1  bdr-solid scale-in-center">
                                    <span class="icon-cell text-secondry"><i class="fa fa-trophy"></i></span>
                                </div>
                                <div class="icon-content">
                                    <h4 class="mt-tilte"><?= lang('sections.service3')?></h4>
                                    <p><?= lang('sections.service3-description')?></p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 col-sm-6 m-b30">
                            <div class="mt-icon-box-wraper bx-style-1 p-a20 left bg-white block-shadow">
                                <div class="mt-icon-box-xs text-secondry bg-white radius bdr-1  bdr-solid scale-in-center">
                                    <span class="icon-cell text-secondry"><i class="fa fa-trophy"></i></span>
                                </div>
                                <div class="icon-content">
                                    <h4 class="mt-tilte"><?= lang('sections.service4')?></h4>
                                    <p><?= lang('sections.service4-description')?></p>
                                </div>
                            </div>
                        </div>


                        <div class="col-md-6 col-sm-6 m-b30">
                            <div class="mt-icon-box-wraper bx-style-1 p-a20 left bg-white block-shadow">
                                <div class="mt-icon-box-xs text-secondry bg-white radius bdr-1  bdr-solid scale-in-center">
                                    <span class="icon-cell text-secondry"><i class="fa fa-trophy"></i></span>
                                </div>
                                <div class="icon-content">
                                    <h4 class="mt-tilte"><?= lang('sections.service5')?></h4>
                                    <p><?= lang('sections.service5-description')?></p>
                                </div>
                            </div>
                        </div>


                        <div class="col-md-6 col-sm-6 m-b30">
                            <div class="mt-icon-box-wraper bx-style-1 p-a20 left bg-white block-shadow">
                                <div class="mt-icon-box-xs text-secondry bg-white radius bdr-1  bdr-solid scale-in-center">
                                    <span class="icon-cell text-secondry"><i class="fa fa-trophy"></i></span>
                                </div>
                                <div class="icon-content">
                                    <h4 class="mt-tilte"><?= lang('sections.service6')?></h4>
                                    <p><?= lang('sections.service6-description')?></p>
                                </div>
                            </div>
                        </div>

                      



                    </div>
                </div>
            </div>

        </div>
        <!-- OUR All SERVICES END -->

        <!-- ABOUT COMPANY SECTION START -->
        <div class="section-full p-t80 p-b50 bg-gray bg-no-repeat bg-bottom-right" style="background-image:url(../assets/images/background/bg-4.png);">
            <div class="container">
                <div class="section-content ">
                    <div class="row">
                        <div class="col-md-7 col-sm-6  m-b30">
                            <div class="brochur bg-dark p-a20">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="p-a30 bg-primary bg-bottom-right" style="background-image:url(images/background/bg-site.png);">
                                            <div class="text-black">
                                                <h4 class="mt-tilte m-t0"><?= lang('sections.service-company-profile')?></h4>
                                              
                                                <a href="javascript:;" class="site-button-secondry btn-half"><span> <?= lang('sections.service-company-profile-download')?></span></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="text-white p-r15">
                                            <h4 class="mt-tilte"><?= lang('sections.service-let-us-help-you')?></h4>
                                            <br><br>
                                            <a href="javascript:;" class="site-button btn-effect"><?= lang('sections.contact-us')?></a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5 col-sm-6 m-b30">
                            <div class="our-exp">
                                <div class="mt-box"><br><br><br>
                                    <h3 class="m-t0"><span class="font-weight-100"> </span><span class="text-primary"> <?= date('Y')- 2000?> </span><?= lang('sections.service-years')?> </h3>
                                </div>
                                




                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ABOUT COMPANY SECTION END -->

        

        <!-- FAQ START -->
        <div class="section-full p-t80 p-b50 bg-white inner-page-padding">

            <div class="container">


                <!-- IMAGE CAROUSEL START -->
                <div class="section-content">
                    <div class="row">
                        <div class="col-md-6 col-sm-6">

                            <!-- TITLE START -->
                            <div class="section-head">
                                <div class="mt-separator-outer separator-left">
                                    <div class="mt-separator">
                                        <h2 class="text-uppercase sep-line-one "><span class="font-weight-300 text-primary"><?= lang('sections.service-features')?></span> </h2>
                                    </div>
                                </div>
                            </div>
                            <!-- TITLE END -->

                            <div class="section-content p-b30">
                                <div class="mt-accordion acc-bg-gray" id="accordion5">

                                    <div class="col-md-6 col-sm-6 m-b30">
                                        <div class="mt-icon-box-wraper bx-style-1 p-a30 center bg-white hover-shadow">
                                            <div class="icon-xl m-b20 scale-in-center">
                                                <span class="icon-cell text-primary"><i class="fa fa-line-chart"></i></span>
                                            </div>
                                            <div class="icon-content">
                                                <h4 class="mt-tilte"><?= lang('sections.service-feature1')?></h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6 m-b30">
                                        <div class="mt-icon-box-wraper bx-style-1 p-a30 center bg-white hover-shadow">
                                            <div class="icon-xl m-b20 scale-in-center">
                                                <span class="icon-cell text-primary"><i class="fa fa-eye"></i></span>
                                            </div>
                                            <div class="icon-content">
                                                <h4 class="mt-tilte"><?= lang('sections.service-feature2')?></h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6 m-b30">
                                        <div class="mt-icon-box-wraper bx-style-1 p-a30 center bg-white hover-shadow">
                                            <div class="icon-xl m-b20 scale-in-center">
                                                <span class="icon-cell text-primary"><i class="fa fa-lightbulb-o"></i></span>
                                            </div>
                                            <div class="icon-content">
                                                <h4 class="mt-tilte"><?= lang('sections.service-feature3')?></h4>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6 m-b30">
                                        <div class="mt-icon-box-wraper bx-style-1 p-a30 center bg-white hover-shadow">
                                            <div class="icon-xl m-b20 scale-in-center">
                                                <span class="icon-cell text-primary"><i class="fa fa-rocket"></i></span>
                                            </div>
                                            <div class="icon-content">
                                                <h4 class="mt-tilte"><?= lang('sections.service-feature4')?></h4>

                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6">

                            <!-- TITLE START -->
                            <div class="section-head">
                                <div class="mt-separator-outer separator-left">
                                    <div class="mt-separator">
                                        <h2 class="text-uppercase sep-line-one "><span class="font-weight-300 text-primary"><?= lang('sections.service-support')?> </span> </h2>
                                    </div>
                                </div>
                            </div>
                            <!-- TITLE END -->
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mt-icon-box-wraper p-a25 m-b30 onhover-box-shadow bg-primary center">
                                        <div class="mt-icon-box-sm inline-icon text-primary  m-b20 radius bg-secondry  scale-in-center">
                                            <span class="icon-cell text-primary"><i class="flaticon-sketch white-color"></i></span>
                                        </div>
                                        <div class="icon-content text-black">
                                            <h4 class="mt-tilte text-uppercase font-weight-600 m-b20"><?= lang('sections.service-help')?></h4>
                                            <p><?= lang('sections.service-help-get',[date('Y')-2000])?></p>

                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mt-icon-box-wraper p-a25 m-b30 onhover-box-shadow bg-dark center">
                                        <div class="mt-icon-box-sm inline-icon text-primary  m-b20 radius bg-secondry  scale-in-center">
                                            <span class="icon-cell text-primary"><i class="flaticon-ui white-color"></i></span>
                                        </div>
                                        <div class="icon-content text-white">
                                            <h4 class="mt-tilte text-uppercase font-weight-600 m-b20"><?= lang('sections.service-support')?></h4>
                                            <p><?= lang('sections.service-support-subtitle')?></p>
                                           
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- FAQ -->






        </div>
        <!-- FAQ END -->

        <!-- CONTENT END -->

<?php
echo view('layout/footer');
?>