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
                        <li><?= lang('sections.breadcrumb-clients')?></li>
                    </ul>
                </div>

                <!-- BREADCRUMB ROW END -->
            </div>
        </div>
    </div>
    <!-- INNER PAGE BANNER END -->
    <!-- TESTIMONIALS SECTION START -->
    <div class="section-full mobile-page-padding p-t80 p-b50 square_shape2 bg-cover" style="background-image:url(assets/images/background/bg6.jpg);">
        <div class="container">
            <div class="section-content">

                <!-- TITLE START -->
                <div class="section-head">
                    <div class="mt-separator-outer separator-center">
                        <div class="mt-separator">
                            <h2 class="text-uppercase sep-line-one "><span class="font-weight-300 text-primary"><?= lang('sections.our-clients')?></span></h2>
                        </div>
                    </div>
                </div>
                <!-- TITLE END -->


                <!-- TESTIMONIAL 4 START ON BACKGROUND -->
                <div class="section-content">
                    <div class="section-content p-tb10 owl-btn-vertical-center">
                        <div class="owl-carousel home-client-carousel-2">

                            <?php

                            foreach ($clients as $client){
                                echo ' <div class="item">
                                <div class="ow-client-logo">
                                    <div class="client-logo client-logo-media">
                                        <a href="javascript:void(0);"><img src="'.base_url('uploads/images/'.$client['logo']).'" alt=""></a></div>
                                </div>
                            </div>';
                            }
                            ?>



                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hilite-title text-left p-l50 text-uppercase text-pop-up-top">
            &nbsp;
        </div>
    </div>
    <!-- TESTIMONIALS SECTION END -->
    </div>
    <!-- CONTENT END -->













<?php
echo view('layout/footer');
?>