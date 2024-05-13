<?php
$request = \Config\Services::request();
$lang=$request->getLocale();
?>
    <!DOCTYPE html>
<html lang="en">

<head>

    <!-- META -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="keywords" content="" />
    <meta name="author" content="" />
    <meta name="robots" content="" />
    <meta name="description" content="" />

    <!-- FAVICONS ICON -->
    <link rel="apple-touch-icon" sizes="180x180" href="<?= base_url('apple-touch-icon.png');?>">
    <link rel="icon" type="image/png" sizes="32x32" href="<?= base_url('favicon-32x32.png');?>">
    <link rel="icon" type="image/png" sizes="16x16" href="<?= base_url('favicon-16x16.png');?>">
    <link rel="manifest" href="<?= base_url('site.webmanifest');?>">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">

    <!-- PAGE TITLE HERE -->
    <title>404</title>

    <!-- MOBILE SPECIFIC -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- [if lt IE 9]>
    <script src="<?= base_url('assets/js/html5shiv.min.js')?>"></script>
    <script src="<?= base_url('assets/js/respond.min.js')?>"></script>
    <![endif] -->

    <?php
    if($lang=="en"){
        echo '<!-- BOOTSTRAP STYLE SHEET -->
    <link rel="stylesheet" type="text/css" href="'.base_url('assets/css/bootstrap.min.css').'">';

    }else{
        echo '<!-- BOOTSTRAP STYLE SHEET -->
    <link rel="stylesheet" type="text/css" href="'.base_url('assets/css/bootstrap-rtl.min.css').'">';
    }
    ?>


    <!-- FONTAWESOME STYLE SHEET -->
    <link rel="stylesheet" type="text/css" href="<?= base_url('assets/css/fontawesome/css/font-awesome.min.css')?>" />

    <!-- OWL CAROUSEL STYLE SHEET -->
    <link rel="stylesheet" type="text/css" href="<?= base_url('assets/css/owl.carousel.min.css')?>">

    <!-- MAGNIFIC POPUP STYLE SHEET -->
    <link rel="stylesheet" type="text/css" href="<?= base_url('assets/css/magnific-popup.min.css')?>">

    <!-- FLATICON STYLE SHEET -->
    <link rel="stylesheet" type="text/css" href="<?= base_url('assets/css/flaticon.min.css')?>">

    <?php
    if($lang=="en"){
        echo ' <!-- MAIN STYLE SHEET -->
    <link rel="stylesheet" type="text/css" href="'.base_url('assets/css/style.css').'">
    <!-- Color Theme Change Css -->
    <link rel="stylesheet" class="skin" type="text/css" href="'.base_url('assets/css/skin/skin-8.css').'">';
    }else{
        echo ' <!-- MAIN STYLE SHEET -->
    <link rel="stylesheet" type="text/css" href="'.base_url('assets/css/style.css').'">
    <link rel="stylesheet" type="text/css" href="'.base_url('assets/css/rtl.css').'">
    <!-- Color Theme Change Css -->
    <link rel="stylesheet" class="skin" type="text/css" href="'.base_url('assets/css/skin/skin-8.css').'">';
    }
    ?>

    <!-- REVOLUTION SLIDER CSS -->
    <link rel="stylesheet" type="text/css" href="<?= base_url('assets/plugins/revolution/revolution/css/settings.css')?>">

    <!-- REVOLUTION NAVIGATION STYLE -->
    <link rel="stylesheet" type="text/css" href="<?= base_url('assets/plugins/revolution/revolution/css/navigation.css')?>">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Poppins:200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

</head>

<body>

<div class="page-wraper">

    <!-- HEADER START -->
    <header class="site-header header-style-1">
        <div class="top-bar bg-gray">
            <div class="container">
                <div class="row">
                    <div class="mt-topbar-left clearfix">
                        <ul class="list-unstyled e-p-bx pull-right">
                            <li><i class="fa fa-phone"></i>01020953030</li><li><i class="fa fa-envelope"></i> Info@ElRowad-EG.com</li>
                        </ul>
                    </div>
                    <div class="mt-topbar-right clearfix">
                        <div class="appint-btn">
                            <a href="<?= base_url('ar')?>" class="site-button" style="background: none"><img
                                        src="<?=base_url('assets/images/ar-flag-icon.jpg')
                                        ?>" width="25" height="20"> </a>
                            <a href="<?= base_url('en')?>" class="site-button" style="background: none"><img
                                        src="<?=base_url('assets/images/en-flag-icon.jpg')
                                        ?>" width="25" height="20"> </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sticky-header main-bar-wraper">
            <div class="main-bar bg-white">
                <div class="container">
                    <div class="logo-header">
                        <div class="logo-header-inner logo-header-one">
                            <a href="index.html">
                                <img src="<?= base_url('assets/images/logo.png')?>" alt="" />
                            </a>
                        </div>
                    </div>
                    <!-- NAV Toggle Button -->
                    <button data-target=".header-nav" data-toggle="collapse" type="button" class="navbar-toggle collapsed">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <!-- ETRA Nav -->
                    <div class="extra-nav">

                        <div class="extra-cell">
                            <a href="#" class="contact-slide-show"><i class="fa fa-angle-left arrow-animation"></i></a>
                        </div>
                    </div>
                    <!-- ETRA Nav -->

                    <!-- Contact Nav -->
                    <div class="contact-slide-hide " style="background-image:url(images/background/bg-5.png)">
                        <div class="contact-nav">
                            <a href="javascript:void(0)" class="contact_close">&times;</a>
                            <div class="contact-nav-form p-a30">
                                <div class="contact-info   m-b30">

                                    <div class="mt-icon-box-wraper center p-b30">
                                        <div class="icon-xs m-b20 scale-in-center"><i class="fa fa-phone"></i></div>
                                        <div class="icon-content">
                                            <h5 class="m-t0 font-weight-500"><?= lang('site.contact-mobile')?></h5>
                                            <p>01020953030</p>
                                        </div>
                                    </div>

                                    <div class="mt-icon-box-wraper center p-b30">
                                        <div class="icon-xs m-b20 scale-in-center"><i class="fa fa-envelope"></i></div>
                                        <div class="icon-content">
                                            <h5 class="m-t0 font-weight-500"><?= lang('site.contact-email')?></h5>
                                            <p>Info@ElRowad-EG.com</p>
                                        </div>
                                    </div>

                                    <div class="mt-icon-box-wraper center p-b30">
                                        <div class="icon-xs m-b20 scale-in-center"><i class="fa fa-map-marker"></i></div>
                                        <div class="icon-content">
                                            <h5 class="m-t0 font-weight-500">Address info</h5>
                                            <p>201 Liverpool Street, Suite 721, London</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="full-social-bg">
                                    <ul>
                                        <li><a href="#" class="facebook"><i class="fa fa-facebook"></i></a></li>
                                        <li><a href="#" class="facebook"><i class="fa fa-linkedin"></i></a></li>
                                        <li><a href="#" class="twitter"><i class="fa fa-twitter"></i></a></li>

                                    </ul>
                                </div>
                                <div class="text-center">
                                    <h4 class="font-weight-600">&copy;  El Rowad Contracting</h4>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    </header>
    <!-- HEADER END -->

    <!-- CONTENT START -->
    <div class="page-content">



    <!-- ABOUT COMPANY SECTION START -->
    <div class="section-full p-t30 p-b80 bg-white inner-page-padding">
        <div class="container">
            <div class="section-content ">
                <div class="row">  <br> <br><br>
                    <div class="col-md-5 col-sm-6">

                                <!-- COLUMNS 1 -->
                                <div class="item">
                                    <div class="ow-img">
                                        <a href="javascript:void(0);"><img src="<?=base_url('assets/images/404.png')?>" alt="" ></a>
                                    </div>
                                </div>
                                
                            
                    </div>
                    <div class="col-md-7 col-sm-6">
                        <div class="m-about-containt text-black p-t80">

                            <h3 class="font-weight-600"> <?= lang('site.404')?></h3>






                        </div>
                    </div>
                    <br> <br><br>
                </div>
            </div>
        </div>
    </div>
    <!-- ABOUT COMPANY SECTION END -->

    
    <!-- CONTENT END -->



<?php
echo view('layout/footer');
?>