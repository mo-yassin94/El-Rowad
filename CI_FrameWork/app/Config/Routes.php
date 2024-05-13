<?php namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php'))
{
	require SYSTEMPATH . 'Config/Routes.php';
}

/**
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

/**
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.



$routes->group('/admin', function($routes)
{
    $routes->add('/', 'admin\Login::index');
    $routes->add('login', 'admin\Login::Log_in');
    $routes->add('profile', 'admin\Profile::show');
    $routes->post('profile/update', 'admin\Profile::update');
    $routes->add('dashboard', 'admin\Dashboard::show');
    $routes->add('logout', 'admin\Login::logout');


    $routes->get('projects', 'admin\Projects::index');
    $routes->get('projects/new', 'admin\Projects::new_project');
    $routes->post('projects/add', 'admin\Projects::add');
    $routes->get('projects/edit/(:any)', 'admin\Projects::edit/$1');
    $routes->post('projects/update/(:any)', 'admin\Projects::update/$1');
    $routes->get('projects/delete/(:any)', 'admin\Projects::delete/$1');

    $routes->get('projects/sections', 'admin\Projects::sections');
    $routes->get('projects/sections/new', 'admin\Projects::newsection');
    $routes->post('projects/sections/add', 'admin\Projects::add_section');
    $routes->get('projects/sections/edit/(:any)', 'admin\Projects::edit_section/$1');
    $routes->post('projects/sections/update/(:any)', 'admin\Projects::update_section/$1');
    $routes->get('projects/sections/delete/(:any)', 'admin\Projects::delete_section/$1');

    $routes->get('services', 'admin\Services::index');
    $routes->get('services/new', 'admin\Services::new_project');
    $routes->post('services/add', 'admin\Services::add');
    $routes->get('services/edit/(:any)', 'admin\Services::edit/$1');
    $routes->post('services/update/(:any)', 'admin\Services::update/$1');
    $routes->get('services/delete/(:any)', 'admin\Services::delete/$1');

    $routes->get('clients', 'admin\Clients::index');
    $routes->get('clients/new', 'admin\Clients::new_project');
    $routes->post('clients/add', 'admin\Clients::add');
    $routes->get('clients/edit/(:any)', 'admin\Clients::edit/$1');
    $routes->post('clients/update/(:any)', 'admin\Clients::update/$1');
    $routes->get('clients/delete/(:any)', 'admin\Clients::delete/$1');


    $routes->get('careers', 'admin\Careers::index');
    $routes->get('careers/new', 'admin\Careers::new_job');
    $routes->post('careers/add', 'admin\Careers::add');
    $routes->get('careers/edit/(:any)', 'admin\Careers::edit/$1');
    $routes->post('careers/update/(:any)', 'admin\Careers::update/$1');
    $routes->get('careers/delete/(:any)', 'admin\Careers::delete/$1');

    $routes->get('careers/(:num)','admin\Careers::applicants/$1');
    $routes->get('careers/(:num)/delete/(:num)','admin\Careers::delete_applicant/$2');

    $routes->get('users', 'admin\Users::index');
    $routes->get('users/new', 'admin\Users::new_user');
    $routes->post('users/add', 'admin\Users::add');
    $routes->get('users/edit/(:any)', 'admin\Users::edit/$1');
    $routes->post('users/update/(:any)', 'admin\Users::update/$1');
    $routes->get('users/delete/(:any)', 'admin\Users::delete/$1');

    $routes->get('storage', 'admin\Storage::index');

    $routes->get('api/slug','admin/Api::slug');
    $routes->post('api/upload_multi_images','admin/Api::upload_multi_photos');
    $routes->post('api/upload_project_photo','admin/Api::upload_project_photo');

});


$routes->get('/', function()
{
    return redirect()->to('/ar');
});

$routes->get('/404', 'Error_404::show404');

$routes->add('{locale}/', 'Home::index/$1');

$routes->add('{locale}/contact', 'Contact::index');
$routes->post('{locale}/contact/send', 'Contact::send');

$routes->get('{locale}/about', 'About::index');

$routes->get('{locale}/services', 'Services::index');
$routes->get('{locale}/services/(:any)', 'Services::show/$1');

$routes->add('{locale}/projects', 'Projects::index');
$routes->add('{locale}/projects/(:any)', 'Projects::all_projects/$1');
$routes->get('{locale}/projects/(:any)/(:any)', 'Projects::show/$2/$3');


$routes->get('{locale}/clients', 'Clients::index');


$routes->get('{locale}/careers', 'Careers::index');
$routes->get('{locale}/careers/(:any)/', 'Careers::show/$1/$2');
$routes->post('{locale}/careers/(:any)/submit', 'Careers::send_cv/$1/$2');

$routes->get('{locale}/articles', 'admin\Articles::index');
$routes->get('{locale}/articles/new', 'admin\Articles::new_project');
$routes->post('{locale}/articles/add', 'admin\Articles::add');
$routes->get('{locale}/articles/edit/(:any)', 'admin\Articles::edit/$1');
$routes->post('{locale}/articles/update/(:any)', 'admin\Articles::update/$1');
$routes->get('{locale}/articles/delete/(:any)', 'admin\Articles::delete/$1');

$routes->get('{locale}/articles/(:any)', 'Articles::show/$1');


$routes->set404Override('App\Controllers\Error_404::show404');










/**
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need to it be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php'))
{
	require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
