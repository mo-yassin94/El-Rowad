<!-- MAIN Vav -->
<div class="header-nav navbar-collapse collapse">
    <ul class=" nav navbar-nav">
        <li class="cairo">
            <a href="<?= base_url($lang)?>"><?= lang('site.menu-1')?></a>
            
        </li>

        <li class="cairo">
            <a href="<?= base_url($lang.'/about')?>"><?= lang('site.menu-2')?></a>
        </li>
        <li class="cairo">
            <a href="<?= base_url($lang.'/services')?>"><?= lang('site.menu-3')?></a>
        </li>
     
        <li class="cairo">
            <a href="javascript:;"><?= lang('site.menu-4')?></a>
            <ul class="sub-menu">

                <?php
                $sections=new \App\Models\ProjectsModel();

                foreach ($sections->get_sections() as $item){
                    if($lang =="en"){
                        $name=$item['section_name'];

                    }  else{
                        $name=$item['section_ar_name'];
                    }
                    echo '<li><a href="'.base_url($lang.'/projects/'.$item['section_slug']).'">'.$name.'</a></li>';
                }
                ?>
            </ul>
        </li>
        
        <li class="cairo">
            <a href="javascript:;"><?php
                    if($lang =="en"){
                        echo 'Articles';

                    }  else{
                        echo 'المقالات';
                    }?></a>
            <ul class="sub-menu">

                <?php
                $sections=new \App\Models\admin\ServicesModel();

                foreach ($sections->getArticles() as $item){
                    if($lang =="en"){
                        $name=$item['title'];

                    }  else{
                        $name=$item['ar_title'];
                    }
                    echo '<li><a href="'.base_url($lang.'/articles/'.$item['id']).'">'.$name.'</a></li>';
                }
                ?>
            </ul>
        </li>

        <li class="cairo">
            <a href="<?= base_url($lang.'/clients')?>"><?= lang('site.menu-5')?></a>

        </li>
        <li class="cairo">
            <a href="<?= base_url($lang.'/careers')?>"><?= lang('site.menu-7')?></a>

        </li>
        <li class="cairo">
            <a href="<?= base_url($lang.'/contact')?>"><?= lang('site.menu-6')?></a>

        </li>
    </ul>
</div>