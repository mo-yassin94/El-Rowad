<?php




     function time_formate($t){
        $cr_times=strtotime($t);
        $cr_time=date('A  h : i ',$cr_times);
        return($cr_time);
    }

     function format_date($d){
        $timestamp = @strtotime($d);

        $month= date('F', $timestamp);
        $day_num=date('j',$timestamp);
        $year=date('Y',$timestamp);
        return($day_num.' '.$month.' '.$year);
    }

    function get_day($d){
		$timestamp = @strtotime($d);
		$day=date('j',$timestamp);
		return($day);
	}

	function get_month($d){
		$timestamp = @strtotime($d);
		$month= date('F', $timestamp);
		return($month);
	}

	function get_year($d){
		$timestamp = @strtotime($d);
		$year=date('Y',$timestamp);
		return($year);
	}
     function format_Time($t){
        $cr_times=strtotime($t);
        $cr_time=date(' h : i  A',$cr_times);
        return($cr_time);
    }










