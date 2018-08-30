<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 4/10/2559
 * Time: 16:38
 */

namespace app\api;


use yii\db\Exception;

class DateTime
{
    public static function getTodayDateTime()
    {
        return date('Y-m-d H:i:s');
    }

    public static function getTodayDate()
    {
        return date('Y-m-d');
    }

    public static function makeDateRangeDeduct($sm,$sy,$em,$ey){
        if(empty($sm) || $sm=='0' || $sm=='00') {
            throw new Exception('Invalid Month');
        }

        if(empty($sy) || $sy=='0' || $sy=='00') {
            throw new Exception('Invalid Month');
        }

        $stime = strtotime("$sy-$sm-01");
        $startDate = date('Y-m-01',$stime);

        $endDate = null;
        if(empty($em) || $em=='0' || $em=='00' || empty($ey) || $ey=='0' || $ey=='00') {
            $endDate = null;
        }
        else {
            $etime = strtotime("$ey-$em-01");
            $endDate = date('Y-m-t',$etime);
        }


        return [
            'start_date'=>$startDate,
            'end_date' => $endDate,
        ];

    }

    public static function makeDayFromMonthPicker($dt=null)
    {
        if($dt == null) {
            return date('Y-m-t');
        }
        else {
            //format 07-2017
            $ex = explode('-',$dt);
            $m = ($ex[0]) ? $ex[0] : date('m');
            $y = ($ex[1]) ? $ex[1] : date('Y');

            $start = $y.'-'.$m.'-01';
            $strTime = strtotime($start);
            $end = date('Y-m-t',$strTime);

            return [
                'start_date'=>$start,
                'end_date'=>$end,
            ];
        }

    }

    public static function buildSalaryCircleFormatDate($date_pay) {
        $ex = explode('-',$date_pay);
        $m = ($ex[0]) ? $ex[0] : date('m');
        $y = ($ex[1]) ? $ex[1] : date('Y');
        $mo = (strlen($m)==1) ? '0'.$m : $m;
        return $y.'-'.$mo.'-'.'01';
    }


    public static function findCircleMonth($date_pay=null)
    {
        /*Array
        (
            [prv_date_pay]   => 11-2017
            [prv_date_start] => 2017-11-01
            [prv_date_end]   => 2017-11-30
            [nxt_date_pay]   => 01-2018
            [nxt_date_start] => 2018-01-01
            [nxt_date_end]   => 2018-01-31
            [cur_date_pay]   => 12-2017
            [cur_date_start] => 2017-12-01
            [cur_date_end]   => 2017-12-31
            [cur_month]      => 12
            [cur_year]       => 2017
        )
        */
        if($date_pay !== null) {
            $fmd = DateTime::buildSalaryCircleFormatDate($date_pay);

            $prv_date = date('Y-m-d', strtotime("$fmd first day of previous month"));
            $nxt_date = date('Y-m-d', strtotime("$fmd first day of next month"));
            $cur_date = date('Y-m-d', strtotime($fmd));

            $arrRet = [
                'prv_date_pay'  => date('m-Y',strtotime($prv_date)),
                'prv_date_start'=> $prv_date,
                'prv_date_end'  => date('Y-m-t',strtotime($prv_date)),
                'nxt_date_pay'  => date('m-Y',strtotime($nxt_date)),
                'nxt_date_start'=> $nxt_date,
                'nxt_date_end'  => date('Y-m-t',strtotime($nxt_date)),
                'cur_date_pay'  => date('m-Y',strtotime($cur_date)),
                'cur_date_start'=> $cur_date,
                'cur_date_end'  => date('Y-m-t',strtotime($cur_date)),
                'cur_month'     => date('m',strtotime($cur_date)),
                'cur_year'      => date('Y',strtotime($cur_date)),
            ];

            return $arrRet;
        }
        else {
            return null;
        }
    }

    public static function convertMonth($intMonth)
    {
        $intMonth=(int)$intMonth;
        $arrMonth = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
        return $arrMonth [$intMonth-1];
    }

    public static function createArrayMonth()
    {
        $arrMonth = [];
        for($i=1;$i<=12;$i++) {
            $arrMonth[$i] = self::mappingMonth($i);
        }
        return $arrMonth;
    }

    public static function mappingMonth($intMonth)
    {
        $intMonth=(int)$intMonth;
        $arrMonth = ['1'=>'มกราคม', 
                     '2'=>'กุมภาพันธ์',
                     '3'=>'มีนาคม', 
                     '4'=>'เมษายน', 
                     '5'=>'พฤษภาคม', 
                     '6'=>'มิถุนายน', 
                     '7'=>'กรกฎาคม', 
                     '8'=>'สิงหาคม', 
                     '9'=>'กันยายน', 
                     '10'=>'ตุลาคม', 
                     '11'=>'พฤศจิกายน', 
                     '12'=>'ธันวาคม'];
        
        return $arrMonth[$intMonth];
    }
    public static function mappingMonthContraction($intMonth)
    {
        $intMonth=(int)$intMonth;
        $arrMonth = ['1'=>'ม.ค.', 
                     '2'=>'กุ.พ.',
                     '3'=>'มี.ค.', 
                     '4'=>'เม.ย.', 
                     '5'=>'พ.ค.', 
                     '6'=>'มิ.ย.', 
                     '7'=>'ก.ค.', 
                     '8'=>'ส.ค.', 
                     '9'=>'ก.ย.', 
                     '10'=>'ต.ค.', 
                     '11'=>'พ.ย.', 
                     '12'=>'ธ.ค.'];
        
        return $arrMonth[$intMonth];
    }


    public static function calculateAge($bithdayDate)
    {
        if($bithdayDate != null && $bithdayDate !='0000-00-00') {
            $date = new \DateTime($bithdayDate);
            $now = new \DateTime();
            $interval = $now->diff($date);
            return $interval->y;
        }
        else {
            return '-';
        }
    }



    public static function ThaiDateTime($dt)
    {
        if ($dt == '' || $dt == null || $dt=='0000-00-00 00:00:00') {
            return '';
        } else {
            $x = explode(" ", trim($dt));
            $e1 = explode("-", trim($x[0]));
            $t = null;
            if(count($x[1]) > 0) {
                $t = ' '.substr($x[1],0,8);
            }
            $f = $e1[2] . '/' . $e1[1] . '/' . $e1[0].$t;
            return $f;
        }
    }

    public static function ThaiDateNoTime($dt)
    {
        if ($dt == '' || $dt == null || $dt=='0000-00-00 00:00:00') {
            return '';
        } else {
            $x = explode(" ", trim($dt));
            $e1 = explode("-", trim($x[0]));
            $f = $e1[2] . '/' . $e1[1] . '/' . $e1[0];
            return $f;
        }
    }

    public static function CalendarDateNotime($dt)
    {
        if ($dt == '' || $dt == null || $dt=='0000-00-00 00:00:00') {
            return '';
        } else {
            $x = explode(" ", trim($dt));
            $e1 = explode("-", trim($x[0]));
            $f = $e1[2] . '/' . $e1[1] . '/' . $e1[0];
            return $f;
        }
    }

    public static function CalendarDate($dt)
    {
        if ($dt == '' || $dt == null || $dt=='0000-00-00') {
            return '';
        } else {
            $e1 = explode("-", trim($dt));
            $f = $e1[2] . '/' . $e1[1] . '/' .$e1[0];
            return $f;
        }
    }

    public static function DateToMysqlDB($dt)
    {
        $f = null;
        if ($dt == '' || $dt == null) {
            return null;
        } else {
            $e1 = explode("/",trim($dt));
            if(count($e1) > 0) {
                $f = $e1[2] . '-' . $e1[1] . '-' . $e1[0];
            }
        }
        return $f;
    }




    public static function FindWorkDayAndSunday($StartDate, $EndDate)
    {
        // $StartDate = "2016-09-01";
        //$EndDate = "2016-09-30";
        $WorkDay = $Sunday = 0;
        $_starttime = strtotime($StartDate);
        $_endtime = strtotime($EndDate);
        $_arrSunday = $_arrWorkday = [];
        while ($_starttime <= $_endtime) {
            $Day = date("w", $_starttime);
            if ($Day == 0) { // 0 = Sunday
                $Sunday++;
                array_push($_arrSunday, date('Y-m-d', $_starttime));
            } else {
                $WorkDay++;
                array_push($_arrWorkday, date('Y-m-d', $_starttime));
            }
            $_starttime += 86400;
        }

        return [
            'total_sunday' => $Sunday,
            'total_workday' => $WorkDay,
            'array_sunday' => $_arrSunday,
            'array_workday' => $_arrWorkday,
        ];
    }


    //Input format 01/12/2016 - 31/12/2016
    //Output format array [start_date] => 2016-12-01
    //[end_date] => 2016-12-31
    public static function FormatDateFromCalendarRange($DateString)
    {
        if($DateString !=null) {
            $tmp = explode("-",$DateString);
            $_start = $tmp[0];
            $_end = $tmp[1];
            return [
                'start_date'=>self::DateToMysqlDB($_start),
                'end_date'=>self::DateToMysqlDB($_end),
            ];
        }
        else return null;
    }


    public static function calculateTimeElapsed($secs) {
        $bit = array(
            'y' => $secs / 31556926 % 12,
            'w' => $secs / 604800 % 52,
            'd' => $secs / 86400 % 7,
            'h' => $secs / 3600 % 24,
            'm' => $secs / 60 % 60,
            's' => $secs % 60
        );

        foreach ($bit as $k => $v)
            if ($v > 0)
                $ret[$k] = $v;

       // return join('|', $ret);

        return $ret;
    }
    
    public static  function getFormatTime($H,$m,$s)
    {
        if(empty($H)){
            $H = "00";
        }elseif(strlen($H) ==1) {
            $H = str_pad($H,2,"0",STR_PAD_LEFT);
        }else{
            $H = $H;
        }

        if(empty($m)){
            $m = "00";
        }elseif(strlen($m) ==1) {
            $m = str_pad($m,2,"0",STR_PAD_LEFT);
        }else{
            $m = $m;
        }
        if(empty($s)){
            $s = "00";
        }elseif(strlen($s) ==1) {
            $s = str_pad($s,2,"0",STR_PAD_LEFT);
        }else{
            $s = $s;
        }

        return $H.":".$m.":".$s;


    }
    public static function selectAddTwoYear()
    {
        $yearStart = date('Y');
        $yearEnd   = date('Y',strtotime('+ 2 year'));
        $yearRange = Range($yearStart,$yearEnd);
        return $yearRange ;
    }
    public static function selectMonthNotZero($month)
    {
        $year = substr($month,0,4);
        $monthzero = substr($month,5,2);
        if(substr($monthzero,0,1)=="0")
        {
            $monthresult = substr($monthzero,1,1);
        }else
        {
            $monthresult = $monthzero;
        }
        return [
            'year' => $year,
            'monthresult' => $monthresult,
        ];
    }
    public static function selectMonthHaveZero($month)
    {
        $year = substr($month,0,4);
        $monthresult = substr($month,5,2);

        return [
            'year' => $year,
            'monthresult' => $monthresult,
        ];
    }
    public static function mapMonth($month)
    {
        //echo $month;
        $arrMonth = [ "01"=>"มกราคม",
                      "02"=>'กุมภาพันธ์',
                      "03"=>'มีนาคม',
                      "04"=>'เมษายน',
                      "05"=>'พฤษภาคม', 
                      "06"=>'มิถุนายน', 
                      "07"=>'กรกฎาคม', 
                      "08"=>'สิงหาคม', 
                      "09"=>'กันยายน', 
                      "10"=>'ตุลาคม', 
                      "11"=>'พฤศจิกายน', 
                      "12"=>'ธันวาคม'
                    ];
        if(array_key_exists($month,$arrMonth))
        {
            $resultMonth = $arrMonth[$month];
        }
       
        return $resultMonth;
    }
    public static function convertFormatMonthYear($month)
    {
        $year = substr($month,3,4);
        $monthresult = substr($month,0,2);

        return [
            'year' => $year,
            'monthresult' => $monthresult,
        ];
    }

    public static function makeHour()
    {
        $arrHour = [];
        for($i=0;$i<=23;$i++) {
            $k = (strlen($i) < 2) ? '0'.$i : $i;
            $arrHour[$k] = $k;
        }
        return $arrHour;
    }

    public static function makeMinute()
    {
        $arrMinute = [];
        for($i=0;$i<=59;$i+=5) {
            $k = (strlen($i) < 2) ? '0'.$i : $i;
            $arrMinute[$k] = $k;
        }
        return $arrMinute;
    }


    public static function maketimeformat($hour,$minute)
    {
        $h = (strlen($hour)==1) ? '0'.$hour : $hour;
        $m = (strlen($minute)==1) ? '0'.$minute : $minute;
        return $h.':'.$m.':00';
    }


    public static function calculate_time_diff($starttime,$endtime)
    {
        $time1 = strtotime($starttime);
        $time2 = strtotime($endtime);
        $difference = round(($time2 - $time1) / 3600,2);
        return $difference;
    }


    public static function makeTimeStamp($date=null,$ret='date')
    {
        $today = ($date==null) ?  date('Y-m-d') : $date;
        $arrDateTime = [];
        $arrTimeStamp = [];
        for($hour=0;$hour<=23;$hour++) {
            $h =  (strlen($hour) <= 1) ? '0' . $hour : $hour;
            for ($minute = 0; $minute <= 59; $minute += 5) {
                $str = (strlen($minute) <= 1) ? '0' . $minute : $minute;
                $dt = $today.' '.$h.':'. $str.':00';
                array_push($arrDateTime,$dt);
                array_push($arrTimeStamp,strtotime($dt));
            }
        }

        return ($ret=='date') ? $arrDateTime : $arrTimeStamp;
    }

    public  static  function convertdmyToymd($date){
        $a = explode('-',$date);
        return  $my_new_date = $a[2].'-'.$a[1].'-'.$a[0];
    }
    public static function datefullformate()
    {
        return date('d').' '.self::mapMonth(date('m')).' '.(date('Y')+543).' '.date('H:i:s');
    }


}