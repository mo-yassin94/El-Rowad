<?php
echo view('layout/header');


foreach ($data as $item){
    $id=$item['id'];
    if($lang=="en"){
        $content= $item['body'];
        $description=$item['description'];
        $section=$section_name;
    }else{
        $content= $item['ar_body'];
        $description=$item['ar_description'];
        $section=$section_ar_name;
    }

}
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
                            <h2 class="m-b0">  <?= lang('sections.breadcrumb-msg1')?> </h2>
                        </div>
                    </div>
                    <!-- BREADCRUMB ROW -->

                    <div>
                        <ul class="mt-breadcrumb breadcrumb-style-2">
                            <li ><a href="<?= base_url($lang)?>" style="color: #fff"> <?= lang('sections.breadcrumb-home')?></a></li>
                            <li><?=$section?></li>
                            <li><?=$title?></li>
                        </ul>
                    </div>

                    <!-- BREADCRUMB ROW END -->
                </div>
            </div>
        </div>
        <!-- INNER PAGE BANNER END -->

        <?php
        if (count($data)){ ?>



        <div class="section-full p-tb80 inner-page-padding">
            <div class="container">
                <div class="project-detail-outer">
                    <div class="m-b0">
                        <div class="row">

                        </div>
                    </div>

                    <div class="m-b30">
                        <div class="row">
                            
                            <div class="col-md-12">
                                <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                                    <!-- Indicators -->
                                    <ol class="carousel-indicators">
                                        <?php
                                                echo '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>';
                                           
                                        ?>

                                    </ol>

                                    <!-- Wrapper for slides -->
                                    <div class="carousel-inner" role="listbox">
                                        <?php


                                        echo '  <div class="item active">
                                        <img src="'.base_url('uploads/images/'.$image).'" width="100%" style="height: 450px" alt="">
                                           </div>';



                                        // foreach ($imgs as $img){
                                        //     echo '  <div class="item ">
                                        // <img src="'.base_url('uploads/images/'.$img['src']).'" width="100%" style="height: 450px"  alt="">
                                        //  </div>';
                                        // }
                                        ?>

                                    </div>

                                    <!-- Controls -->
                                    <!--<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">-->
                                    <!--    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>-->
                                    <!--    <span class="sr-only">Previous</span>-->
                                    <!--</a>-->
                                    <!--<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">-->
                                    <!--    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>-->
                                    <!--    <span class="sr-only">Next</span>-->
                                    <!--</a>-->
                                </div>
                                    

                                </div>
                            </div>

                    </div>

                    <hr>
                    <div class="project-detail-containt">
                        <div class="bg-white text-black">
                            <h1 class="font-weight-600"><?= $title?></h1>
                            <p><?= html_entity_decode($content)?></p>


                        </div>
                    </div>

                </div>
            </div>
        </div>

         <?php

            }else{
            echo view('error-404');
        }
            ?>


    </div>
    <!-- CONTENT END -->

<?php
echo view('layout/footer');
?>