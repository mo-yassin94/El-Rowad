<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <!-- Sidebar user panel -->
		<?php

        	$user=new \App\Models\admin\AuthModel();
          	$session_id=session()->get('session');
          	$data=$user->get_user_data($session_id);
                foreach ($data as $item){}
		?>
        <div class="user-panel">
            <div class="pull-left image">
                <img src="<?= base_url($item['avatar'])?>" class="img-circle" alt="User Image">
            </div>
            <div class="pull-left info">
                <p>  <?= $item['name'];?></p>
                <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
        </div>

        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu">
            <li class="header"><i>- Main Navigation </i></li>
            <li class="active">
                <a href="<?= base_url('admin/dashboard')?>">
                    <i class="fa fa-dashboard"></i> <span>Dashboard</span>
                </a>
            </li>

            <li class="header"><i>- Site Sections</i></li>
            <li class="treeview">
                <a href="#">
                    <i class="fa fa-gear"></i> <span>Services</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">

                    <li><a href="<?= base_url('admin/services/')?>"><i class="fa fa-reorder"></i> Services</a></li>
                    <li><a href="<?= base_url('admin/services/new')?>"><i class="fa fa-plus-circle"></i> New Service</a></li>
                </ul>
            </li>
            
            <li class="treeview">
                <a href="#">
                    <i class="fa fa-gear"></i> <span>Articles</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">

                    <li><a href="<?= base_url('admin/articles/')?>"><i class="fa fa-reorder"></i> Articles</a></li>
                    <li><a href="<?= base_url('admin/articles/new')?>"><i class="fa fa-plus-circle"></i> New Article</a></li>
                </ul>
            </li>
            
            <li class="treeview">
                <a href="#">
                    <i class="fa fa-building"></i> <span>Projects</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">

                    <li>

                                <a href="#"><i class="fa fa-tasks"></i> Projects <i class="fa fa-angle-left
                                pull-right"></i></a>
                                <ul class="treeview-menu">
                                    <li><a href="<?= base_url('admin/projects/')?>"><i class="fa fa-reorder"></i>
                                            Projects</a></li>
                                    <li><a href="<?= base_url('admin/projects/new')?>"><i class="fa
                                    fa-plus-circle"></i> New Project</a></li>

                                </ul>
                            </li>
                            <li>
                                <a href="#"><i class="fa fa-tag"></i> Sections <i class="fa fa-angle-left pull-right"></i></a>
                                <ul class="treeview-menu">
                                    <li><a href="<?= base_url('admin/projects/sections/')?>"><i
												class="fa fa-reorder"></i> Sections</a></li>
                                    <li><a href="<?= base_url('admin/projects/sections/new')?>"><i class="fa fa-plus-circle"></i> New Section</a></li>

                                </ul>
                            </li>
                </ul>
            </li>



            <li class="treeview">
                <a href="#">
                    <i class="fa fa-bank"></i> <span>Clients</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">


                            <li><a href="<?= base_url('admin/clients/')?>"><i class="fa fa-reorder"></i> Clients</a></li>
                            <li><a href="<?= base_url('admin/clients/new')?>"><i class="fa fa-plus-circle"></i> New Client</a></li>

                </ul>
            </li>

            <li class="header"><i>- Careers</i></li>

            <li class="treeview">
                <a href="#">
                    <i class="fa fa-graduation-cap"></i> <span>Careers</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">

                    <li>
                      <li><a href="<?= base_url('admin/careers')?>"><i class="fa fa-reorder"></i> Careers</a></li>
                      <li><a href="<?= base_url('admin/careers/new')?>"><i class="fa fa-plus-circle"></i> New Job</a></li>

                    </li>
                </ul>
            </li>





            <li class="header"><i>- Site Administration</i></li>
            

            <li class="treeview">
                <a href="#">
                    <i class="fa fa-users"></i><span>Users</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">

                    <li><a href="<?= base_url('admin/users')?>"><i class="fa fa-gears"></i> Manage</a></li>
                    <li><a href="<?= base_url('admin/users/new')?>"><i class="fa fa-user-plus"></i> New User</a></li>
                </ul>
            </li>

            <li class="">
                <a href="<?= base_url('admin/storage')?>">
                    <i class="fa fa-hdd-o"></i> <span>Storage</span>
                </a>
            </li>

            <li class="">
                <a href="<?= base_url()?>">
                    <i class="fa fa-globe"></i> <span>Site</span>
                </a>
            </li>


        </ul>
    </section>
    <!-- /.sidebar -->
</aside>
