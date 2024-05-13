<?php

/** This file is part of KCFinder project
  *
  *      @desc Browser calling script
  *   @package KCFinder
  *   @version 2.51
  *    @author Pavel Tzonkov <pavelc@users.sourceforge.net>
  * @copyright 2010, 2011 KCFinder Project
  *   @license http://www.opensource.org/licenses/gpl-2.0.php GPLv2
  *   @license http://www.opensource.org/licenses/lgpl-2.1.php LGPLv2
  *      @link http://kcfinder.sunhater.com
  */
ob_start();
session_start();

if(isset($_COOKIE['csrf_cookie_name']) && isset($_SESSION['logged_in'])){
	require "components/kcfinder/core/autoloadi.php";
	$browser = new browser();
	$browser->action();
}
?>
