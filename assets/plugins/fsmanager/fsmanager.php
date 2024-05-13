<?php

// ROOT Directory

$root = "./uploads/";
		
$url_img="../assets/plugins/fsmanager/img";
$url_link="./storage?";
?>

<link rel="stylesheet" type="text/css" href="../assets/plugins/fsmanager/fsmanager.css" />
<link rel="stylesheet" href="../assets/plugins/tinybox/style.css"/>
<script type="text/javascript" language="javascript" src="../assets/plugins/tinybox/tinybox.js"></script>

	<div id="body_matrix">
		<div id="bhody"><div id="body_border">
<div style="height:30px;background:#036;"><div style="line-height:25px;font-size:16px;color:#FFF;font-weight:bold;" align="center" >El Rowad File Manager</div>
</div></div>
<div align="center" id="canvas_matrix"><div id="canvas">
<div align="center" id="ums_matrix"><div id="ums">
<?php
$a = @$_GET['a']; // action
$e = @$_GET['e']; // setting
$do = @$_GET['do']; // sub-level action
$id = @$_GET['id']; // sub-level object

$agent = $_SERVER['HTTP_USER_AGENT']; // browser
$ip = $_SERVER['REMOTE_ADDR']; // remote ip
$ts = $_SERVER['REQUEST_TIME']; // timestamp
$self = $_SERVER['PHP_SELF']; // script source
$key = md5($agent.$ip.$ts.$self); // random md5
$uri = addslashes($_SERVER['REQUEST_URI']); // complete uri
$url = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; // complete uri
$host = $_SERVER['HTTP_HOST']; // http domain name incl prefix
$domain = str_replace(array("www.", "cms.", "cpp."), "", $host); // http domain name
$max_upload = (int)(ini_get('upload_max_filesize'));
$max_post   = (int)( ini_get('post_max_size') );
$max_memory = (int)( ini_get('memory_limit') );
$upload_max = min($max_upload, $max_post, $max_memory);

function file_byte($a_bytes)
 {
     if ($a_bytes < 1024) {
         return $a_bytes .' B';
     } elseif ($a_bytes < 1048576) {
         return round($a_bytes / 1024, 0) .' KB';
     } elseif ($a_bytes < 1073741824) {
         return round($a_bytes / 1048576, 1) . ' MB';
     } elseif ($a_bytes < 1099511627776) {
         return round($a_bytes / 1073741824, 2) . ' GB';
     } elseif ($a_bytes < 1125899906842624) {
         return round($a_bytes / 1099511627776, 2) .' TB';
     } elseif ($a_bytes < 1152921504606846976) {
         return round($a_bytes / 1125899906842624, 2) .' PB';
     } elseif ($a_bytes < 1180591620717411303424) {
         return round($a_bytes / 1152921504606846976, 2) .' EB';
     } elseif ($a_bytes < 1208925819614629174706176) {
         return round($a_bytes / 1180591620717411303424, 2) .' ZB';
     } else {
         return round($a_bytes / 1208925819614629174706176, 2) .' YB';
     }
}

function dirsize($directory) {
   $size = 0;
   foreach(new RecursiveIteratorIterator(new RecursiveDirectoryIterator($directory)) as $file){
      $size+=$file->getSize();
   }
   return $size;
}

function filename_safe($name) {
    $except = array('#', '=', '!', '\\', '/', ':', ';', '*', '?', '"', '<', '>', '|', '{', '}', '%', '@', '¤', '\'', '(', ')', '$', '£', '´', '`', '~', '¨', '^', ',', '&');
    return str_replace($except, '', $name); 
} 

function remdir($dir) {
   if (is_dir($dir)) {
      $objects = scandir($dir);
      foreach ($objects as $object) {
         if ($object != "." && $object != "..") {
            if (filetype($dir."/".$object) == "dir") remdir($dir."/".$object); else unlink($dir."/".$object);
         }
      }
      reset($objects);
      rmdir($dir);
   }
}
function filter_img_type($e){
	$ff=explode('/', $e);
	  $c=count($ff)-1;
	  $file_n=$ff[$c];
	  $pos=strpos($file_n,'.')+1;
	  $sub=substr($file_n,$pos);
	  return ($sub);	
	}
$type = @$_GET['type'];
if($type == "1") { $type = "dir"; } else { $type = "file"; }

$dir = @$_GET['dir'];
if($dir==null || $dir=="." || $dir=="/" || $dir=="./" || $dir[0]=="/" || substr($dir, -2) == ".." || substr($dir, -2) == "./" || substr($dir, -2) == "//" || substr($dir, -1) == "." ) { $dir = $root; }
if(substr($dir, 0, strlen($root)) != $root) { $dir = $root.$dir; }
$path = $dir;

$folder = explode('/', $path, -1);
$count = count(explode('/', $path, -1));
$count = $count-1;

$uri = @$_GET['uri'];
$uri_path = explode('/', $uri, -1);
$uri_count = count(explode('/', $uri, -1));
$uri_count = $uri_count-1;

$css_row = 0;

$title = $path;
if($count >= 2)
{
   $title = $folder[0].'/';
   $slashes = $count - 1;
   while($slashes>0)
   {
      $title .= '../';
      $slashes--;
   }
   $title .= $folder[$count];
   $title .= '/';
}

$strip_last = strlen($folder[$count]) + 1;
$up = substr($path, 0, -$strip_last);


if($a == "rename"){

   echo '<div id="h2"><span style="color:#bbb;">Rename ';
   if($type == "dir") { echo "folder"; } else { echo "file"; }
   echo '</span> '.$uri_path[$uri_count].'</div>'."\n";
   echo '<br />'."\n";
   echo '<div style="width:960px;height:24px;border-bottom:1px solid #eee;" align="left">'."\n";
   echo '   <div style="width:300px;float:left;">'."\n";
   echo '   <table align="left" cellspacing="0" cellpadding="0"><tr>'."\n";
   echo '   <td align="left" valign="middle"><span class="f_icon"><img src="'.$url_img.'/';
   if($type == "dir") { echo "folder.png"; } else { echo "file.png"; }
   echo '" height="20" width="20" border="0" /></span></td>'."\n";
   echo '   <td align="left" valign="top"><span class="f_file" style="color:#777;font-weight:bold;">Rename ';
   if($type == "dir") { echo "folder"; } else { echo "file"; }
   echo '   </span></td>'."\n";
   echo '   </tr></table>'."\n";
   echo '   </div>'."\n";
   echo '   <div style="width:300px;float:right;">'."\n";
   echo '   <table align="right" cellspacing="0" cellpadding="0"><tr>'."\n";
   echo '   <td align="right" valign="middle"><a href="'.$url_link.'script=fsmanager&dir='.$dir.'" class="f_icon" style="margin:0 0 0 15px;"><img src="'.$url_img.'/edit_undo.png" height="20" width="20" border="0" /></a></td>'."\n";
   echo '   <td align="right" valign="top"><a href="'.$url_link.'script=fsmanager&dir='.$dir.'" class="f_file" style="color:#333;">Cancel</a></td>'."\n";
   echo '   </tr></table>'."\n";
   echo '   </div>'."\n";
   echo '</div>'."\n";
   echo '<div style="width:960px;height:80px;background:#f9f9f9;border-bottom:1px solid #eee;" align="left">'."\n";
   echo '   <form action="'.$url_link.'script=fsmanager&exec=rename&dir='.$dir.'&uri='.substr($uri, 0, -1).'" method="post">'."\n";
   echo '   <div style="width:960px;" align="center">'."\n";
   echo '   <table align="center" height="80" cellspacing="0" cellpadding="0"><tr>'."\n";
   echo '   <td valign="middle"><img src="'.$url_img.'/';
   if($type == "dir") { echo "folder.png"; } else { echo "file.png"; }
   echo '" height="32" width="32" border="0" /></td>'."\n";
   echo '   <td valign="middle">&nbsp;<input type="text" class="input" style="font-size:14px;" value="'.$uri_path[$uri_count].'" name="rename" /></td>'."\n";
   echo '   <td valign="middle"><input type="submit" class="submit" value=" Rename " name="exec" /></td>'."\n";
   echo '   </tr></table>'."\n";
   echo '   </div>'."\n";
   echo '   </form>'."\n";
   echo '</div>'."\n";

} elseif($a == "upload"){

   echo '<div id="h2"><span style="color:#bbb;">Upload file in</span> '.$title.'</div>'."\n";
   echo '<br />'."\n";
   echo '<div style="width:960px;height:24px;border-bottom:1px solid #eee;" align="left">'."\n";
   echo '   <div style="width:300px;float:left;">'."\n";
   echo '   <table align="left" cellspacing="0" cellpadding="0"><tr>'."\n";
   echo '   <td align="left" valign="middle"><span class="f_icon"><img src="'.$url_img.'/document_new.png" height="20" width="20" border="0" /></span></td>'."\n";
   echo '   <td align="left" valign="top"><span class="f_file" style="color:#777;font-weight:bold;">Upload file</span></td>'."\n";
   echo '   </tr></table>'."\n";
   echo '   </div>'."\n";
   echo '   <div style="width:300px;float:right;">'."\n";
   echo '   <table align="right" cellspacing="0" cellpadding="0"><tr>'."\n";
   echo '   <td align="right" valign="middle"><a href="'.$url_link.'script=fsmanager&dir='.$dir.'" class="f_icon" style="margin:0 0 0 15px;"><img src="'.$url_img.'/edit_undo.png" height="20" width="20" border="0" /></a></td>'."\n";
   echo '   <td align="right" valign="top"><a href="'.$url_link.'script=fsmanager&dir='.$dir.'" class="f_file" style="color:#333;">Cancel</a></td>'."\n";
   echo '   </tr></table>'."\n";
   echo '   </div>'."\n";
   echo '</div>'."\n";
   echo '<div style="width:960px;height:100px;background:#f9f9f9;border-bottom:1px solid #eee;" align="left">'."\n";
   echo '   <form action="'.$url_link.'script=fsmanager&exec=upload&dir='.$dir.'" method="post" enctype="multipart/form-data">'."\n";
   echo '   <div style="width:960px;" align="center">'."\n";
   echo '   <table align="center" height="100" cellspacing="0" cellpadding="0"><tr>'."\n";
   echo '   <td valign="middle"><img src="'.$url_img.'/document_new.png" height="32" width="32" border="0" /></td>'."\n";
   echo '   <td valign="middle">&nbsp;<input type="file" class="input" style="height:24px;" name="upload" /></td>'."\n";
   echo '   <td valign="middle"><input type="submit" class="submit" value=" Upload " name="exec" /></td>'."\n";
   echo '   </tr><td colspan="3" height="20" valign="top" align="center"><div align="center" style="font-size:11px;">Max filesize: <b>'.$upload_max.'MB</b>! (from server settings)</div></td>';
   echo '   </tr></table>'."\n";
   echo '   </div>'."\n";
   echo '   </form>'."\n";
   echo '</div>'."\n";

} elseif($a == "mkdir"){

   echo '<div id="h2"><span style="color:#bbb;">New folder in</span> '.$title.'</div>'."\n";
   echo '<br />'."\n";
   echo '<div style="width:960px;height:24px;border-bottom:1px solid #eee;" align="left">'."\n";
   echo '   <div style="width:300px;float:left;">'."\n";
   echo '   <table align="left" cellspacing="0" cellpadding="0"><tr>'."\n";
   echo '   <td align="left" valign="middle"><span class="f_icon"><img src="'.$url_img.'/folder_new.png" height="20" width="20" border="0" /></span></td>'."\n";
   echo '   <td align="left" valign="top"><span class="f_file" style="color:#777;font-weight:bold;">New folder</span></td>'."\n";
   echo '   </tr></table>'."\n";
   echo '   </div>'."\n";
   echo '   <div style="width:300px;float:right;">'."\n";
   echo '   <table align="right" cellspacing="0" cellpadding="0"><tr>'."\n";
   echo '   <td align="right" valign="middle"><a href="'.$url_link.'script=fsmanager&dir='.$dir.'" class="f_icon" style="margin:0 0 0 15px;"><img src="'.$url_img.'/edit_undo.png" height="20" width="20" border="0" /></a></td>'."\n";
   echo '   <td align="right" valign="top"><a href="'.$url_link.'script=fsmanager&dir='.$dir.'" class="f_file" style="color:#333;">Cancel</a></td>'."\n";
   echo '   </tr></table>'."\n";
   echo '   </div>'."\n";
   echo '</div>'."\n";
   echo '<div style="width:960px;height:80px;background:#f9f9f9;border-bottom:1px solid #eee;" align="left">'."\n";
   echo '   <form action="'.$url_link.'script=fsmanager&exec=mkdir&dir='.$dir.'" method="post">'."\n";
   echo '   <div style="width:960px;" align="center">'."\n";
   echo '   <table align="center" height="80" cellspacing="0" cellpadding="0"><tr>'."\n";
   echo '   <td valign="middle"><img src="'.$url_img.'/folder_new.png" height="32" width="32" border="0" /></td>'."\n";
   echo '   <td valign="middle">&nbsp;<input type="text" class="input" style="font-size:14px;" value="" name="mkdir" /></td>'."\n";
   echo '   <td valign="middle"><input type="submit" class="submit" value=" Save " name="exec" /></td>'."\n";
   echo '   </tr></table>'."\n";
   echo '   </div>'."\n";
   echo '   </form>'."\n";
   echo '</div>'."\n";

} else {

   if(isset($_GET['exec'])) {

      $exec = $_GET['exec'];

      if($exec == "mkdir")
      {
         if(($_POST['mkdir']))
         {
            mkdir($dir.filename_safe($_POST['mkdir']));
         }
      }

      if($exec == "unlink")
      {
         if($type == "dir")
         {
            remdir($uri);
         }
         elseif($type == "file")
         {
            unlink($uri);
         }
      }

      if($exec == "rename")
      {
         rename($uri, $dir.filename_safe($_POST['rename']));
      }

      if($exec == "upload")
      {
         if(@file_exists($_FILES['upload']['tmp_name'])) {
            move_uploaded_file($_FILES['upload']['tmp_name'], $dir.filename_safe($_FILES['upload']['name']));
         }
      }

   }

   if($dir!=null && $dir!=$root)
   {
      echo '<div id="h2"><span style="color:#bbb;">Browsing</span> '.$title.'</div>'."\n";
      echo '<table class="f_row" style="width:960px;" cellspacing="0" cellpadding="0">'."\n";
      echo '<tr>'."\n";
      echo '<td style="border-bottom:1px solid #eee;" colspan="6" align="left" valign="bottom">'."\n";
      echo '   <div style="float:left;width:250px;"><table align="left" cellspacing="0" cellpadding="0"><tr>'."\n";
      echo '      <td class="f_row_td1" align="left" valign="middle"><span class="f_icon"><img src="'.$url_img.'/folder.png" height="20" width="20" border="0" /></span></td>'."\n";
      echo '      <td class="f_row_td2" align="left" valign="top"><span class="f_file" style="color:#5E98E1;font-weight:bold;">'.substr($folder[$count], 0, 25).'</span></td>'."\n";
      echo '   </tr></table></div>'."\n";
      echo '   <div style="float:right;width:400px;"><table align="right" cellspacing="0" cellpadding="0"><tr>'."\n";
      echo '      <td valign="middle"><table cellspacing="0" cellpadding="0"><tr><td valign="middle"><a class="f_icon" style="margin:0 0 0 15px;" href="'.$url_link.'script=fsmanager&dir='.$up.'"><img src="'.$url_img.'/go_up.png" height="20" width="20" border="0" /></a></td><td valign="top"><a class="f_file" style="color:#333;" href="'.$url_link.'script=fsmanager&dir='.$up.'">Up</a></td></tr></table></td>'."\n";
      echo '      <td valign="middle"><table cellspacing="0" cellpadding="0"><tr><td valign="middle"><a class="f_icon" style="margin:0 0 0 15px;" href="'.$url_link.'script=fsmanager&dir='.$root.'"><img src="'.$url_img.'/folder_home.png" height="20" width="20" border="0" /></a></td><td valign="top"><a class="f_file" style="color:#333;" href="'.$url_link.'script=fsmanager&dir='.$root.'">Root</a></td></tr></table></td>'."\n";
      echo '      <td valign="middle"><table cellspacing="0" cellpadding="0"><tr><td valign="middle"><a class="f_icon" style="margin:0 0 0 15px;" href="'.$url_link.'script=fsmanager&a=upload&dir='.$path.'"><img src="'.$url_img.'/document_new.png" height="20" width="20" border="0" /></a></td><td valign="top"><a class="f_file" style="color:#333;" href="'.$url_link.'script=fsmanager&a=upload&dir='.$path.'">Upload file</a></td></tr></table></td>'."\n";
      echo '      <td valign="middle"><table cellspacing="0" cellpadding="0"><tr><td valign="middle"><a class="f_icon" style="margin:0 0 0 15px;" href="'.$url_link.'script=fsmanager&a=mkdir&dir='.$path.'"><img src="'.$url_img.'/folder_new.png" height="20" width="20" border="0" /></a></td><td valign="top"><a class="f_file" style="color:#333;" href="'.$url_link.'script=fsmanager&a=mkdir&dir='.$path.'">New folder</a></td></tr></table></td>'."\n";
      echo '   </tr></table></div>'."\n";
      echo '</td>'."\n";
      echo '</tr>'."\n";
   } else {
      echo '<div id="h2"><span style="color:#bbb;">Browsing</span> '.$title.'</div>'."\n";
      echo '<table class="f_row" style="width:960px;" cellspacing="0" cellpadding="0">'."\n";
      echo '<tr>'."\n";
      echo '<td style="border-bottom:1px solid #eee;" colspan="6" align="left" valign="bottom">'."\n";
      echo '   <div style="float:left;width:250px;"><table align="left" cellspacing="0" cellpadding="0"><tr>'."\n";
      echo '      <td class="f_row_td1" align="left" valign="middle"><span class="f_icon"><img src="'.$url_img.'/folder_home.png" height="20" width="20" border="0" /></span></td>'."\n";
      echo '      <td class="f_row_td2" align="left" valign="top"><span class="f_file" style="color:#5E98E1;font-weight:bold;">Root</span></td>'."\n";
      echo '   </tr></table></div>'."\n";
      echo '   <div style="float:right;width:400px;"><table align="right" cellspacing="0" cellpadding="0"><tr>'."\n";
      echo '      <td valign="middle"><table cellspacing="0" cellpadding="0"><tr><td valign="middle"><a class="f_icon" style="margin:0 0 0 15px;" href="'.$url_link.'script=fsmanager&a=upload&dir='.$path.'"><img src="'.$url_img.'/document_new.png" height="20" width="20" border="0" /></a></td><td valign="top"><a class="f_file" style="color:#333;" href="'.$url_link.'script=fsmanager&a=upload&dir='.$path.'">Upload file</a></td></tr></table></td>'."\n";
      echo '      <td valign="middle"><table cellspacing="0" cellpadding="0"><tr><td valign="middle"><a class="f_icon" style="margin:0 0 0 15px;" href="'.$url_link.'script=fsmanager&a=mkdir&dir='.$path.'"><img src="'.$url_img.'/folder_new.png" height="20" width="20" border="0" /></a></td><td valign="top"><a class="f_file" style="color:#333;" href="'.$url_link.'script=fsmanager&a=mkdir&dir='.$path.'">New folder</a></td></tr></table></td>'."\n";
      echo '   </tr></table></div>'."\n";
      echo '</td>'."\n";
      echo '</tr>'."\n";
   }

   $folder = array();
   $dir_handle = @opendir($dir) or die("Unable to open $path");
   $tr_bg = 0;
   $i=0;
   while($foldername = readdir($dir_handle)) { if($foldername != '.' && $foldername != '..' && $foldername != 'fsmanager' && is_dir($dir.$foldername) == true) { $folder[$i] = $foldername; $i++; } }
   array_multisort(array_map('strtolower', $folder), $folder);
   for($i=0; $i<sizeof($folder); $i++)
   {
	   if($tr_bg % 2 == 0){
		   $bg='style="background:#ececec"';
		   }else{
			   $bg="";
			   }
		$tr_bg++;	   
      $ext = substr(strrchr($folder[$i], '.'), 1);
      $css_row++;
      echo '<tr class="f_row_s'.($css_row & 1).'" '.$bg.'>'."\n";
      echo '   <td class="f_row_td1" align="left" valign="middle" style="padding-top:1px;"><a class="f_icon" href="'.$url_link.'script=fsmanager&dir='.$path.$folder[$i].'/"><img src="'.$url_img.'/folder.png" height="20" width="20" border="0" /></a></td>'."\n";
      echo '   <td class="f_row_td2" align="left" valign="top" style=""><a class="f_file" style="color:#333;text-decoration:none;" href="'.$url_link.'script=fsmanager&dir='.$path.$folder[$i].'/">'.substr($folder[$i], 0, 70).'</a></td>'."\n";
      echo '   <td class="f_row_td3" align="left" valign="top" style="padding-top:1px;"><a class="f_file" style="color:#333;text-decoration:none;" href="'.$url_link.'script=fsmanager&dir='.$path.$folder[$i].'/">'.file_byte(dirsize($path.$folder[$i])).'</a></td>'."\n";
      echo '   <td class="f_row_td4" align="left" valign="top" style="padding-top:1px;text-align:right;"><a class="f_file" style="color:#333;text-decoration:none;" href="'.$url_link.'script=fsmanager&dir='.$path.$folder[$i].'/"><em>'.date("d.m.Y H:i", filemtime($path.$folder[$i])).'</em></a></td>'."\n";
      echo '   <td class="f_row_td5" align="left" valign="middle" style="padding-top:1px;text-align:right;"><a class="f_icon" href="'.$url_link.'script=fsmanager&a=rename&type=1&dir='.$dir.'&uri='.$path.$folder[$i].'/" title="Rename folder"><img src="'.$url_img.'/edit_rename.png" width="18" height="18" border="0" /></a></td>'."\n";
      echo '   <td class="f_row_td6" align="left" valign="middle" style="padding-top:1px;text-align:right;"><a class="f_icon" href="'.$url_link.'script=fsmanager&exec=unlink&type=1&dir='.$dir.'&uri='.$path.$folder[$i].'/" title="Delete folder"><img src="'.$url_img.'/edit_delete.png" width="16" height="16" border="0" /></a></td>'."\n";
      echo '</tr>'."\n";
   }
   closedir($dir_handle);
   $file = array();
   $dir_handle = @opendir($dir) or die("Unable to open $path");
   while($filename = readdir($dir_handle)) { if($filename != '.' && $filename != '..' && $filename != 'fsmanager.php' && is_dir($dir.$filename) != true) { $file[$i] = $filename; $i++; } }
   array_multisort(array_map('strtolower', $file), $file);
   for($i=0; $i<sizeof($file); $i++)
   {
	    if($tr_bg % 2 == 0){
		   $bg='style="background:#f5f5f5"';
		   }else{
			   $bg="";
			   }
		$tr_bg++;	   
      $ext = substr(strrchr($file[$i], '.'), 1);
      $css_row++;
	  $get_t=filter_img_type($path.$file[$i]);
	  $img_array=array('gif','png','jpg','ico','bmp','','','');
	  if(in_array($get_t,$img_array)){
		  $tiny_box="TINY.box.show({image:'.".$dir.$file[$i]."',boxid:'frameless',animate:true,openjs:function(){openJS()}})";}else{$tiny_box='';}
      echo '<tr class="f_row_s'.($css_row & 1).'" '.$bg.'>'."\n";
      echo '<td class="f_row_td1" align="left" valign="middle"><img src="'.$url_img.'/'.strtolower($ext).'.png" height="20" width="20" border="0" /></td>'."\n";
      echo '<td class="f_row_td2" align="left" valign="top" style="padding-top:1px;"><a class="f_file" style="color:#333;cursor:pointer;text-decoration:none;" onclick="'.$tiny_box.'" target="_BLANK">'.substr($file[$i], 0, 70).'</a></td>';
      echo '   <td class="f_row_td3" align="left" valign="top" style="padding-top:1px;"><a class="f_file" style="color:#333;text-decoration:none;" href="'.@$path.$file[$i].'" target="_BLANK">'.file_byte(@filesize($path.$file[$i])).'</a></td>'."\n";
      echo '<td class="f_row_td4" align="left" valign="top" style="padding-top:1px;text-align:right;"><a class="f_file" style="color:#333;text-decoration:none;" href="'.@$path.$file[$i].'" target="_BLANK"><em>'.date("d.m.Y H:i", @filemtime(@$path.$file[$i])).'</em></a></td>'."\n";
      echo '<td class="f_row_td5" align="left" valign="middle" style="padding-top:1px;text-align:right;"><a class="f_icon" href="'.$url_link.'script=fsmanager&a=rename&type=2&dir='.$dir.'&uri='.$path.$file[$i].'/" title="Rename file"><img src="'.$url_img.'/edit_rename.png" width="18" height="18" border="0" /></a></td>'."\n";
      echo '<td class="f_row_td6" align="left" valign="middle" style="padding-top:1px;text-align:right;"><a class="f_icon" href="'.$url_link.'script=fsmanager&exec=unlink&type=2&dir='.$dir.'&uri='.$path.$file[$i].'" title="Delete file"><img src="'.$url_img.'/edit_delete.png" width="16" height="16" border="0" /></a></td>'."\n";
      echo '</tr>'."\n";

   }
   closedir($dir_handle);
   echo '</table>'."\n";

}

?>
</div></div>
</div></div>
</div></div></div>
</div>
