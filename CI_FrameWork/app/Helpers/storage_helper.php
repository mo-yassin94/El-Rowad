<?php



   function Directory_Manager_Call($date,$section,$dir){
        $timestamp=strtotime($date);
        $Y=date('Y',$timestamp);
        $M=date('m',$timestamp);
        $D=date('d',$timestamp);
        $folderlename = '../../uploads/images/'.$dir.'/';
        $dirs=$folderlename.$Y.'/'.$M.'/'.$D;
        if(!file_exists($folderlename.$Y)){
            mkdir($folderlename.$Y,0777);
        }
        if(!file_exists($folderlename.$Y.'/'.$M)){
            mkdir($folderlename.$Y.'/'.$M,0777);
        }
        if(!file_exists($dirs)){
            mkdir($folderlename.$Y.'/'.$M.'/'.$D,0777);
        }
        return($dir.'/'.$Y.'/'.$M.'/'.$D);
    }

    function Directory_Manager($section,$dir){
        $Y=date('Y');
        $M=date('m');
        $D=date('d');
        $folderlename = './uploads/images/'.$dir.'/';
        $dirs=$folderlename.$Y.'/'.$M.'/'.$D;

        if(!file_exists($folderlename.$Y)){
            mkdir($folderlename.$Y,0777);
        }
        if(!file_exists($folderlename.$Y.'/'.$M)){
            mkdir($folderlename.$Y.'/'.$M,0777);
        }
        if(!file_exists($dirs)){
            mkdir($folderlename.$Y.'/'.$M.'/'.$D,0777);
        }
        Directory_Manager_Thumb($section,$dir);
        return($dir.'/'.$Y.'/'.$M.'/'.$D);

    }

    function Directory_Manager_Thumb($section,$dir){
        $Y=date('Y');
        $M=date('m');
        $D=date('d');
        $folderlename = './uploads/thumbs/images/'.$dir.'/';
        $dirs=$folderlename.$Y.'/'.$M.'/'.$D;

        if(!file_exists($folderlename.$Y)){
            mkdir($folderlename.$Y,0777);
        }
        if(!file_exists($folderlename.$Y.'/'.$M)){
            mkdir($folderlename.$Y.'/'.$M,0777);
        }
        if(!file_exists($dirs)){
            mkdir($folderlename.$Y.'/'.$M.'/'.$D,0777);
        }
        //return($section.'/'.$Y.'/'.$M.'/'.$D);

    }
