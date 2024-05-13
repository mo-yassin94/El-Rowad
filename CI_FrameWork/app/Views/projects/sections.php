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
                            <h2 class="m-b0">  <?= lang('sections.breadcrumb-msg1')?> </h2>
                        </div>
                    </div>
                    <!-- BREADCRUMB ROW -->

                    <div>
                        <ul class="mt-breadcrumb breadcrumb-style-2">
                            <li ><a href="<?= base_url($lang)?>" style="color: #fff"> <?= lang('sections.breadcrumb-home')?></a></li>
                            <li><?= lang('sections.breadcrumb-projects')?></li>

                        </ul>
                    </div>

                    <!-- BREADCRUMB ROW END -->
                </div>
            </div>
        </div>
        <!-- INNER PAGE BANNER END -->


        <div class="container">
                 <div class="row">

                     <?php

                     foreach ($sections as $item){
                        if($lang == "en"){
                            $title=$item['section_name'];
                        }else{
                            $title=$item['section_ar_name'];
                        }
                         echo ' <div class="col-md-3 col-sm-6">
                <div class="mt-icon-box-wraper m-b30">
                    <div class="relative icon-count-2 bg-gray p-a30 p-tb50">
                       
                        <div class="icon-md inline-icon m-b15 text-primary scale-in-center">
                            <i class="flaticon-builder">    </i>
                        </div>
                        <div class="icon-content">
                            <h4 class="mt-tilte m-b25"><a href="'.base_url($lang.'/projects/'.$item['section_slug']).'"> '.$title.'</a></h4>

                            <a href="'.base_url($lang.'/projects/'.$item['section_slug']).'" class="site-button-link" data-hover="Read More"> '.lang('sections.projects-all').' <i class="fa fa-angle-right arrow-animation"></i></a>
                        </div>
                    </div>
                </div>
            </div>';
                     }
                     ?>

        </div>
           

        </div>







    </div>
    <!-- CONTENT END -->
<?php
echo view('layout/footer');
?>