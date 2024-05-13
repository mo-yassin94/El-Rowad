<!-- FOOTER START -->
<footer class="site-footer footer-large  footer-dark	footer-wide">
    <div class="container call-to-action-wrap bg-no-repeat bg-center" style="background-image:url('../assets/images/background/bg-site.webp');">
        <div class="p-a30 bg-primary ">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="call-to-action-left text-black">
                        <h4 class="text-uppercase m-b10 m-t0 bg-primary" align="center"> <?= lang('site.footer')?></h4>
                        <span></span>
                    </div>
                </div>

               
            </div>
        </div>
    </div>
    <!-- FOOTER BLOCKES START -->
    <div class="footer-top overlay-wraper">
        <div class="overlay-main"></div>
        <div class="container">
            <div class="row">
                <!-- ABOUT COMPANY -->
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="widget widget_about">
                        <!--<h4 class="widget-title">About Company</h4>-->
                        <div class="logo-footer clearfix p-b15">
                            <a href="<?= base_url($lang)?>"><img src="<?= base_url('front/images/logo.webp')?>" alt="<?= lang('site.title')?>" title="<?= lang('site.title')?>"></a>
                        </div>
                        <p class="max-w900 font-14 cairo"><br>
                            <?= lang('site.footer-msg')?>
                            </p>

                            <div class="appint-btn">
                                <a href="<?= base_url('ar').substr(uri_string(),2);?>" class="site-button" style="background: none">
                                    <img src="<?=base_url('assets/images/ar-flag-icon.jpg')
                                    ?>" width="25" height="20" alt="<?= lang('site.title')?>" title="<?= lang('site.title')?>"> </a>
                                <a href="<?= base_url('en').substr(uri_string(),2);?>" class="site-button" style="background: none"><img src="<?=base_url('assets/images/en-flag-icon.jpg')
                                    ?>" width="25" height="20" alt="<?= lang('site.title')?>" title="<?= lang('site.title')?>"> </a>
                            </div>
                        <br><br>
                        <ul class="social-icons  mt-social-links">
                            <li><a href="https://www.facebook.com/El-Rowad-Contracting-102481154863335/" target="_blank" class="fa fa-facebook"></a></li>
                            <li><a href="https://www.linkedin.com/company/elrowad-eg" target="_blank" class="fa fa-linkedin"></a></li>
                            <li><a href="https://twitter.com/el_rowad_eg" target="_blank" class="fa fa-twitter"></a></li>
                        </ul>
                    </div>
                </div>

                <!-- RESENT POST -->
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="widget widget_address_outer">
                        <h4 class="widget-title"><?= lang('site.footer-title1')?></h4>
                        <ul class="widget_address">
                            <li class="cairo"> <i class="fa fa-map-marker"></i> <?= lang('site.contact-address')?>  </li>
                            <li class="cairo"> <a href="mailto:Info@ElRowad-eg.com" class="off-white"> <i class="fa fa-envelope"></i> Info@ElRowad-eg.com</a></li>
                            <li class="cairo"> <a href="tel:01020953030" class="off-white"> <i class="fa fa-mobile-phone"></i> 01020953030</a></li>
                            <li class="cairo"> <a href="https://wa.me/00201020953030" class="off-white" target="_blank"> <i class="fa fa-whatsapp"></i> 01020953030</a></li>
                            <li class="cairo"> <a href="tel:002-25600005" class="off-white"> <i class="fa fa-phone"></i> 002-25600005</a></li>
                        </ul>

                    </div>
                </div>

                <!-- USEFUL LINKS -->
                <div class="col-lg-4 col-md-6 col-sm-6 footer-col-3">
                    <div class="widget widget_services inline-links">
                        <h4 class="widget-title"><?= lang('site.footer-title2')?></h4>
                        <ul>
                            <li><a href="<?= base_url($lang.'/about')?>"><?= lang('site.menu-2')?></a></li>
                            <li><a href="<?= base_url($lang.'/projects')?>"><?= lang('site.menu-4')?></a></li>
                            <li><a href="<?= base_url($lang.'/services')?>"><?= lang('site.menu-3')?></a></li>
                            <li><a href="<?= base_url($lang.'/careers')?>"><?= lang('site.menu-7')?></a></li>
                            <li><a href="<?= base_url($lang.'/contact')?>"><?= lang('site.menu-6')?></a></li>
                        </ul>
                    </div>
                </div>

                

            </div>
        </div>
    </div>
    <!-- FOOTER COPYRIGHT -->
    <div class="footer-bottom overlay-wraper">
        <div class="overlay-main"></div>
        <div class="container">
            <div class="row">
                <div class="mt-footer-bot-center" dir="ltr">
                    <span class="copyrights-text"> <span> © 2011 -  <?= date('Y')?> </span> <a href="<?= base_url($lang)?>" class="navy-color">ElRowad Contracting</a>.
                </div>
            </div>
        </div>
    </div>
</footer>
<!-- FOOTER END -->

<!-- BUTTON TOP START -->
<button class="scroltop"><span class="fa fa-angle-up  relative" id="btn-vibrate"></span></button>

</div>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-171479155-1"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-171479155-1');
</script>


<!-- JAVASCRIPT  FILES ========================================= -->
<script  src="<?= base_url('assets/js/jquery-1.12.4.min.js')?>"></script><!-- JQUERY.MIN JS -->
<script  src="<?= base_url('assets/js/bootstrap.min.js')?>"></script><!-- BOOTSTRAP.MIN JS -->

<script  src="<?= base_url('assets/js/magnific-popup.min.js')?>"></script><!-- MAGNIFIC-POPUP JS -->

<script  src="<?= base_url('assets/js/waypoints.min.js')?>"></script><!-- WAYPOINTS JS -->
<script  src="<?= base_url('assets/js/counterup.min.js')?>"></script><!-- COUNTERUP JS -->
<script  src="<?= base_url('assets/js/waypoints-sticky.min.js')?>"></script><!-- COUNTERUP JS -->

<script  src="<?= base_url('assets/js/isotope.pkgd.min.js')?>"></script><!-- MASONRY  -->

<script  src="<?= base_url('assets/js/owl.carousel.min.js')?>"></script><!-- OWL  SLIDER  -->
<script src="<?= base_url('assets/js/jquery.owl-filter.js')?>"></script>

<script  src="<?= base_url('assets/js/stellar.min.js')?>"></script><!-- PARALLAX BG IMAGE   -->

<script  src="<?= base_url('assets/js/all.js')?>"></script><!-- CUSTOM FUCTIONS  -->





<script  src="<?= base_url('assets/js/jquery.bgscroll.js')?>"></script><!-- BACKGROUND SCROLL -->

<!-- REVOLUTION JS FILES -->

<script  src="<?= base_url('assets/plugins/revolution/revolution/js/jquery.themepunch.tools.min.js')?>"></script>
<script  src="<?= base_url('assets/plugins/revolution/revolution/js/jquery.themepunch.revolution.min.js')?>"></script>

<!-- SLIDER REVOLUTION 5.0 EXTENSIONS  (Load Extensions only on Local File Systems !  The following part can be removed on Server for On Demand Loading) -->
<script  src="<?= base_url('assets/plugins/revolution/revolution/js/extensions/revolution-plugin.js')?>"></script>

<!-- REVOLUTION SLIDER SCRIPT FILES -->
<script  src="<?= base_url('assets/js/rev-script-1.js')?>"></script>



</body>

</html>