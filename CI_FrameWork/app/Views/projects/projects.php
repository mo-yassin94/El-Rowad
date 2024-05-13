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
                            <li><?=$title?></li>
                        </ul>
                    </div>

                    <!-- BREADCRUMB ROW END -->
                </div>
            </div>
        </div>
        <!-- INNER PAGE BANNER END -->


        <div class="section-full p-tb80 inner-page-padding">
            <div class="container">

                <!-- GALLERY CONTENT START -->
                <div class="portfolio-wrap mfp-gallery work-grid row ">


                    <?php

                    foreach ($data as $item){
                        if($lang=="en"){
                            $title=$item['title'];
                            $description=$item['description'];
                        }else{
                            $title=$item['ar_title'];
                            $description=$item['ar_description'];
                        }
                        echo ' <div class="masonry-item  col-md-4 col-sm-6 m-b30">
                        <div class="image-effect-two hover-shadow">
                          <a href="'.base_url($lang.'/projects/'.$item['section_slug'].'/'.$item['slug']).'">  
                          <img src="'.base_url('uploads/images/'.$item['image']).'" alt=""></a>
                            <div class="figcaption">
                                <a href="'.base_url($lang.'/projects/'.$item['section_slug'].'/'.$item['slug']).'"><h4 class="mt-tilte">'.$title.'</h4>  </a>
                                <p>'.$description.'</p>
                                <a href="'.base_url($lang.'/projects/'.$item['section_slug'].'/'.$item['slug']).'" class="read-more site-button btn-effect">'.lang('sections.view').'</a>
                                <a class="mfp-link" href="'.base_url('uploads/images/'.$item['image']).'">
                                    <i class="fa fa-arrows-alt"></i>
                                </a>
                            </div>
                        </div>
                    </div>';
                    }

                    ?>





                </div>
                <!-- GALLERY CONTENT END -->

            </div>


        </div>




    </div>
    <!-- CONTENT END -->
<?php
echo view('layout/footer');
?>