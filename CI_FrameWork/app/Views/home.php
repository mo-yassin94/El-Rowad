<?php
echo view('layout/header');
if($lang=="en"){
    echo view('layout/slider');
}else{
    echo view('layout/ar_slider');
} ?>


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
                                        <a href="javascript:void(0);"><img src="assets/images/pic4.webp" alt="<?= lang('site.title')?>" title="<?= lang('site.title')?>"></a>
                                    </div>
                                </div>
                                <!-- COLUMNS 2 -->
                                <div class="item">
                                    <div class="ow-img">
                                        <a href="javascript:void(0);"><img src="assets/images/pic5.webp"alt="<?= lang('site.title')?>" title="<?= lang('site.title')?>"></a>
                                    </div>
                                </div>
                                <!-- COLUMNS 3 -->
                                <div class="item">
                                    <div class="ow-img">
                                        <a href="javascript:void(0);"><img src="assets/images/pic7.webp"alt="<?= lang('site.title')?>" title="<?= lang('site.title')?>"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-7 col-sm-6">
                        <div class="m-about-containt text-black p-t80">
                            <div class="m-about-years bg-moving" style="background-image:url(assets/images/background/line.png);">
                                <span class="text-primary large-title"><?= date('Y')- 2000?></span>
                                <span class="large-title-info"><?= lang('home.years-of-experience')?></span>
                            </div>
                            <h1 class="font-weight-600"><?= lang('home.ceo-msg-title')?></h1>
                            <p class="cairo font-16"><?= lang('home.ceo-msg')?></p>
                            <div class="author-info p-t20">



                                <div class="author-name">
                                    <h2 class="m-t0"><?= lang('home.job-title')?></h2>

                                </div>
                                <a href="<?=$lang?>/contact" class="site-button btn-effect m-b15"><span><?= lang('home.keep-on-touch')?></span></a>

                            </div>




                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <!-- ABOUT COMPANY SECTION END -->

    <!-- ABOUT COMPANY START -->
    <div class="section-full mobile-page-padding p-t80 p-b30 bg-dark bg-repeat square_shape2 bg-moving" style="background-image:url('assets/images/background/bg-6.png')">
        <div class="container">
            <!-- TITLE START -->
            <div class="section-head">
                <div class="mt-separator-outer separator-center">
                    <div class="mt-separator">
                        <h2 class="text-white text-uppercase sep-line-one "><span class="font-weight-300 text-primary"> <?= lang('home.about-section')?></span></h2>
                    </div>
                </div>
            </div>
            <!-- TITLE END -->

            <div class="section-content">
                <div class="row">
                    <div class="col-md-9 col-sm-12">
                        <div class="owl-carousel about-home owl-btn-vertical-center">
                            <!-- COLUMNS 1 -->
                            <div class="item ">
                                <div class="mt-img-effect zoom-slow">
                                    <a href="javascript:void(0);"><img src="<?= base_url('assets/images/about/1.webp')?>" alt="<?= lang('site.title')?>" title="<?= lang('site.title')?>"></a>
                                </div>
                            </div>
                            <!-- COLUMNS 2 -->
                            <div class="item ">
                                <div class="mt-img-effect zoom-slow">
                                    <a href="javascript:void(0);"><img src="<?= base_url('assets/images/about/2.webp')?>" alt="<?= lang('site.title')?>" title="<?= lang('site.title')?>"></a>
                                </div>
                            </div>
                            <!-- COLUMNS 3 -->
                            <div class="item ">
                                <div class="mt-img-effect zoom-slow">
                                    <a href="javascript:void(0);"><img src="<?= base_url('assets/images/about/3.webp')?>" alt="<?= lang('site.title')?>" title="<?= lang('site.title')?>"></a>
                                </div>
                            </div>
                            <!-- COLUMNS 4 -->
                            <div class="item ">
                                <div class="mt-img-effect zoom-slow">
                                    <a href="javascript:void(0);"><img src="<?= base_url('assets/images/about/4.webp')?>"alt="<?= lang('site.title')?>" title="<?= lang('site.title')?>"></a>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="col-md-3 col-sm-12">
                        <div class="about-home-right bg-white p-a30">
                            <h3 class="m-t0"><?= lang('sections.about-msg-title')?> </h3>
                            <p class="cairo" style="font-size: 16px"><h3>
                                    <?= lang('sections.about-msg')?>

                                </h3></p>
                          
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hilite-title text-left p-l50 text-uppercase hilite-dark">
            &nbsp;
        </div>
    </div>
    <!-- ABOUT COMPANY END -->


    <!-- OUR MISSION START -->
    <div class="section-full mobile-page-padding mission-outer-section  p-t80 p-b30 bg-gray bg-no-repeat bg-right-center" style="background-image:url(assets/images/left-men.png), url(images/background/bg-4.png); ">
        <div class="section-content">
            <div class="container">
                <!-- TITLE START -->
                <div class="section-head">
                    <div class="mt-separator-outer separator-center">
                        <div class="mt-separator">
                            <h2 class="text-uppercase sep-line-one "><span class="font-weight-300 text-primary"><?= lang('home.mission-section')?></span></h2>
                        </div>
                    </div>
                </div>
                <!-- TITLE END -->

                <div class="row">
                    <div class="col-md-4 col-sm-6">
                        <div class="mission-left bg-white m-b30 p-a30 bg-no-repeat bg-bottom-left" style="background-image:url(assets/images/background/bg-site.png);">
                            <h3 class="m-t0"><?= lang('home.company-departments')?></h3>
                            <br> <br>
                            <p class="cairo" style="font-size: 16px;"><?= lang('home.company-departments-description')?></p>
                            <br> <br> 
                            <h4> <?= lang('home.company-departments2')?></h4>
                            <ul class="list-angle-right anchor-line">
                                <li class="cairo"><a href="#"><?= lang('home.department1')?></a></li>
                                <li class="cairo"><a href="#"><?= lang('home.department2')?></a></li>
                                <li class="cairo"><a href="#"><?= lang('home.department3')?></a></li>
                                <li class="cairo"><a href="#"><?= lang('home.department4')?></a></li>
                                <li class="cairo"><a href="#"><?= lang('home.department5')?></a></li>
                            </ul>
                            
                        </div>
                    </div>

                    <div class="col-md-4 col-sm-6">
                        <div class="mission-mid bg-no-repeat bg-cover m-b30" style="background-image:url(assets/images/mission.webp);"></div>
                    </div>

                    <div class="col-md-4 col-sm-12">
                        <div class="contact-home1-left bg-dark p-a30 m-b0">
                            <h3 class="text-white m-t0"><span class="font-weight-100"><?= lang('home.contact-section')?></span></h3>
                            <form class="cons-contact-form2 form-transparent" method="post" action="<?= base_url($lang.'/contact/send')?>">

                                <div class="input input-animate">
                                    <label for="name"><?= lang('sections.careers-apply-name')?></label>
                                    <input type="text" name="name"  id="name" required>
                                    <span class="spin"></span>
                                </div>

                                <div class="input input-animate">
                                    <label for="email"><?= lang('sections.careers-apply-email')?></label>
                                    <input type="email" name="email"   id="email" required>
                                    <span class="spin"></span>
                                </div>

                                <div class="input input-animate">
                                    <label for="Phone"><?= lang('sections.careers-apply-phone')?></label>
                                    <input type="text" name="phone"  id="Phone" required>
                                    <span class="spin"></span>
                                </div>

                                <div class="input input-animate">
                                    <label for="message"><?= lang('sections.contact-msg')?></label>
                                    <textarea name="message"  id="message" required></textarea>
                                    <input type="hidden" name="<?= csrf_token()?>" value="<?= csrf_hash()?>">
                                    <input type="hidden" name="section" value="homepage">
                                    <span class="spin"></span>
                                </div>

                                <div class="text-center p-t10">
                                    <button type="submit" class="site-button btn-effect ">
                                        <?= lang('sections.careers-apply-submit')?>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="hilite-title text-left p-l50 text-uppercase text-pop-up-top">
            &nbsp;
        </div>
    </div>
    <!-- OUR MISSION  END -->

    <!-- OUR SERVICES START -->
    <div class="section-full mobile-page-padding  p-b50  square_shape2">
        <div class="section-content">
            <div class="Service-half-top p-t80  bg-dark bg-moving" style="background-image:url(assets/images/background/bg-6.png)" >
                <div class="container">
                    <!-- TITLE START -->
                    <div class="section-head text-white">
                        <div class="mt-separator-outer separator-left">
                            <div class="mt-separator">
                                <h2 class="text-white text-uppercase sep-line-one "><span class="font-weight-300 text-primary"><?= lang('home.our-services');?></span></h2>
                            </div>
                        </div>
                    
                    </div>
                    <!-- TITLE END -->
                </div>
            </div>
            <div class="services-half-bottom">
                <div class="container">
                    <div class="row">
                        <div class="col-md-3 col-sm-6">

                            <div class="mt-icon-box-wraper m-b30">
                                <div class="relative icon-count-2 bg-gray p-a30 p-tb50">
                                    <span class="icon-count-number">1</span>
                                    <div class="icon-md inline-icon m-b15 text-primary scale-in-center">
                                        <span class="icon-cell"><img src="<?= base_url('assets/images/icon/crane-1.png')?>" alt="<?= lang('site.title')?>" title="<?= lang('site.title')?>"></span>
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
                                        <span class="icon-cell"><img src="<?= base_url('assets/images/icon/renovation.png')?>" alt="<?= lang('site.title')?>" title="<?= lang('site.title')?>"></span>
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
                                        <span class="icon-cell"><img src="<?= base_url('assets/images/icon/toolbox.png')?>"  alt="<?= lang('site.title')?>" title="<?= lang('site.title')?>"></span>
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
                                        <span class="icon-cell"><img src="<?= base_url('assets/images/icon/compass.png')?>" alt="<?= lang('site.title')?>" title="<?= lang('site.title')?>"></span>
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
        <div class="hilite-title text-left p-l50 text-uppercase text-pop-up-top">
            &nbsp;
        </div>
    </div>
    <!-- OUR SERVICES  END -->

    <!-- CALL US SECTION START -->
    <div class="section-full mobile-page-padding p-tb80 overlay-wraper bg-cover bg-center" style="background-image:url(assets/images/background/bg-1.webp)">
        <div class="overlay-main bg-primary opacity-07"></div>
        <div class="container">

            <div class="section-content">
                <div class="call-us-section text-center">
                    <h4 class="m-b15 white-color" ><?= lang('home.contact-section')?></h4>
                    <h2 class="call-us-number m-b15 m-b0 white-color">002-25600005</h2>
                    <h4 class="call-us-address m-t0 m-b20 white-color"><?= lang('site.contact-address')?></h4>
                    <a href="<?= base_url($lang.'/contact')?>" class="site-button-secondry btn-effect bg-dark"><?= lang('sections.contact-us')?></a>
                </div>
            </div>

        </div>
    </div>
    <!-- CALL US SECTION END -->
<?php
/*

    <!-- OUR PROJECT START -->
    <div class="section-full mobile-page-padding p-t80 p-b30 square_shape2" >
        <div class="container">
            <!-- TITLE START -->
            <div class="section-head">
                <div class="mt-separator-outer separator-left">
                    <div class="mt-separator">
                        <h2 class="text-uppercase sep-line-one "><span class="font-weight-300 text-primary">Our</span> Project</h2>
                    </div>
                </div>
            </div>
            <!-- TITLE END -->

            <div class="section-content">

                <div class="portfolio-wrap row mfp-gallery product-stamp clearfix">
                    <!-- COLUMNS 1 -->
                    <div class="stamp col-md-3 col-sm-6 m-b30">
                        <div class="bg-gray p-a30">
                            <div class="filter-wrap">
                                <ul class="filter-navigation masonry-filter text-uppercase">
                                    <li class="active"><a data-filter="*" data-hover="All" href="#">All</a></li>
                                    <li><a data-filter=".cat-1" data-hover="Commercial" href="javascript:;">Commercial</a></li>
                                    <li><a data-filter=".cat-4" data-hover="Education" href="javascript:;">Education</a></li>
                                    <li><a data-filter=".cat-2" data-hover="Hospital" href="javascript:;">Hospital </a></li>
                                    <li><a data-filter=".cat-3" data-hover="Residentia" href="javascript:;">Residentia</a></li>
                                    <li><a data-filter=".cat-5" data-hover="Office" href="javascript:;">Office</a></li>
                                    <li><a data-filter=".cat-6" data-hover="Reconstruction" href="javascript:;" >Reconstruction </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- COLUMNS 2 -->
                    <div class="masonry-item  cat-2 col-md-3 col-sm-6 m-b30">
                        <div class="mt-box   image-hover-block">
                            <div class="mt-thum-bx">
                                <img src="<?= base_url('assets/images/projects/portrait/pic1.jpg')?>" alt="">
                            </div>
                            <div class="mt-info  p-t20 text-white">
                                <h4 class="mt-tilte m-b10 m-t0">Chair Furniture</h4>
                                <p class="m-b0">Muscat, Sultanate of Oman</p>
                            </div>
                            <a href="#"></a>
                        </div>
                    </div>

                    <!-- COLUMNS 3 -->
                    <div class="masonry-item  cat-2 col-md-3 col-sm-6 m-b30">
                        <div class="mt-box   image-hover-block">
                            <div class="mt-thum-bx">
                                <img src="<?= base_url('assets/images/projects/portrait/pic2.jpg')?>" alt="">
                            </div>
                            <div class="mt-info  p-t20 text-white">
                                <h4 class="mt-tilte m-b10 m-t0">Furniture</h4>
                                <p class="m-b0">North House</p>
                            </div>
                            <a href="#"></a>
                        </div>
                    </div>

                    <!-- COLUMNS 4 -->
                    <div class="masonry-item  cat-6 col-md-3 col-sm-6 m-b30">
                        <div class="mt-box   image-hover-block">
                            <div class="mt-thum-bx">
                                <img src="<?= base_url('assets/images/projects/portrait/pic3.jpg')?>" alt="">
                            </div>
                            <div class="mt-info  p-t20 text-white">
                                <h4 class="mt-tilte m-b10 m-t0">Living room</h4>
                                <p class="m-b0">Aqaba, Jordan</p>
                            </div>
                            <a href="#"></a>
                        </div>
                    </div>

                    <!-- COLUMNS 5 -->
                    <div class="masonry-item  cat-6 col-md-3 col-sm-6 m-b30">
                        <div class="mt-box   image-hover-block">
                            <div class="mt-thum-bx">
                                <img src="<?= base_url('assets/images/projects/portrait/pic4.jpg')?>" alt="">
                            </div>
                            <div class="mt-info  p-t20 text-white">
                                <h4 class="mt-tilte m-b10 m-t0">Dream Workspace</h4>
                                <p class="m-b0">Perth, Australia </p>
                            </div>
                            <a href="#"></a>
                        </div>
                    </div>

                    <!-- COLUMNS 6 -->
                    <div class="masonry-item  cat-3 col-md-3 col-sm-6 m-b30">
                        <div class="mt-box   image-hover-block">
                            <div class="mt-thum-bx">
                                <img src="<?= base_url('assets/images/projects/portrait/pic5.jpg')?>" alt="">
                            </div>
                            <div class="mt-info  p-t20 text-white">
                                <h4 class="mt-tilte m-b10 m-t0">Decore</h4>
                                <p class="m-b0">Aqaba, Jordan</p>
                            </div>
                            <a href="#"></a>
                        </div>
                    </div>

                    <!-- COLUMNS 7 -->
                    <div class="masonry-item  cat-3 col-md-3 col-sm-6 m-b30">
                        <div class="mt-box   image-hover-block">
                            <div class="mt-thum-bx">
                                <img src="<?= base_url('assets/images/projects/portrait/pic6.jpg')?>" alt="">
                            </div>
                            <div class="mt-info  p-t20 text-white">
                                <h4 class="mt-tilte m-b10 m-t0">Modern Decoration</h4>
                                <p class="m-b0">Muscat, Sultanate of Oman</p>
                            </div>
                            <a href="#"></a>
                        </div>
                    </div>

                    <!-- COLUMNS 8 -->
                    <div class="masonry-item  cat-1 col-md-3 col-sm-6 m-b30">
                        <div class="mt-box   image-hover-block">
                            <div class="mt-thum-bx">
                                <img src="<?= base_url('assets/images/projects/portrait/pic7.jpg')?>" alt="">
                            </div>
                            <div class="mt-info  p-t20 text-white">
                                <h4 class="mt-tilte m-b10 m-t0">Bathroom</h4>
                                <p class="m-b0">North House</p>
                            </div>
                            <a href="#"></a>
                        </div>
                    </div>

                    <!-- COLUMNS 11 -->
                    <div class="masonry-item  cat-6 col-md-6 col-sm-6 m-b30">
                        <div class="mt-box   image-hover-block">
                            <div class="mt-thum-bx">
                                <img src="<?= base_url('assets/images/projects/pic-l-5.jpg')?>" alt="">
                            </div>
                            <div class="mt-info  p-t20 text-white">
                                <h4 class="mt-tilte m-b10 m-t0">Lamp decoration</h4>
                                <p class="m-b0">Aqaba, Jordan</p>
                            </div>
                            <a href="#"></a>
                        </div>
                    </div>


                    <!-- COLUMNS 9 -->
                    <div class="masonry-item  cat-5 col-md-3 col-sm-6 m-b30">
                        <div class="mt-box   image-hover-block">
                            <div class="mt-thum-bx">
                                <img src="<?= base_url('assets/images/projects/pic-1.jpg')?>" alt="">
                            </div>
                            <div class="mt-info  p-t20 text-white">
                                <h4 class="mt-tilte m-b10 m-t0">Building house</h4>
                                <p class="m-b0">Ultanate of Oman </p>
                            </div>
                            <a href="#"></a>
                        </div>
                    </div>

                    <!-- COLUMNS 10 -->
                    <div class="masonry-item  cat-4 col-md-3 col-sm-6 m-b30">
                        <div class="mt-box   image-hover-block">
                            <div class="mt-thum-bx">
                                <img src="<?= base_url('assets/images/projects/pic-2.jpg')?>" alt="">
                            </div>
                            <div class="mt-info  p-t20 text-white">
                                <h4 class="mt-tilte m-b10 m-t0">Spa residence</h4>
                                <p class="m-b0">Perth, Australia </p>
                            </div>
                            <a href="#"></a>
                        </div>
                    </div>


                </div>

            </div>

        </div>
        <div class="hilite-title text-left p-l50 text-uppercase text-pop-up-top">
            &nbsp;
        </div>
    </div>
    <!-- OUR PROJECT END -->

    */?>

    <!-- TESTIMONIALS SECTION START -->
    <div class="section-full mobile-page-padding p-t80 p-b50 square_shape2 bg-cover" style="background-image:url(assets/images/background/bg6.webp);">
        <div class="container">
            <div class="section-content">

                <!-- TITLE START -->
                <div class="section-head">
                    <div class="mt-separator-outer separator-center">
                        <div class="mt-separator">
                            <h2 class="text-uppercase sep-line-one "><span class="font-weight-300 text-primary"><?= lang('home.our-clients');?></span></h2>
                        </div>
                    </div>
                </div>
                <!-- TITLE END -->


                <!-- TESTIMONIAL 4 START ON BACKGROUND -->
                <div class="section-content">
                    <div class="section-content p-tb10 owl-btn-vertical-center">
                        <div class="owl-carousel home-client-carousel-2">

                            <?php
                             $clients=new \App\Models\ClientsModel();

                            foreach ($clients->get_all() as $client){
                                echo ' <div class="item">
                                <div class="ow-client-logo">
                                    <div class="client-logo client-logo-media">
                                        <a href="javascript:void(0);"><img src="'.base_url('uploads/images/'.$client['logo']).'" alt="'.lang('site.title').'" title="'.lang('site.title').'" ></a></div>
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