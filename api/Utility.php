<?php

/**
 * Created by PhpStorm.
 * User: adithep
 * Date: 9/12/2016 AD
 * Time: 11:56 AM
 * Utility function  เป็นฟังก์ชั่น อัตถประโยชน์ ที่ทุกๆ โมดูลสามารถเข้าถึงได้
 */
namespace app\api;
use Yii;

class Utility
{
    /** JoinArrayToString
     *  function convert array string/int to string with comma
     *  INPUT [1,2,3,4,5]
     *  OUTPUT '1','2','3','4','5'
     */
    public static function JoinArrayToString($arrItem)
    {
        return "'".implode("', '", $arrItem)."'";
    }

    public static function ShowPercentageValue($val)
    {
        return number_format($val/100,Yii::$app->params['TYPE_DECIMAL']);
    }

    //rounding money when calculate OT
    public static function ot_round_money($val)
    {
        //MODE = PHP_ROUND_HALF_UP
        //PRECISION = 0
        return round($val,0,PHP_ROUND_HALF_UP);
    }

    public static function wage_round_money($val)
    {
        //MODE = PHP_ROUND_HALF_UP
        //PRECISION = 0
        return round($val,0,PHP_ROUND_HALF_UP);
    }



    public static function CheckValidIDCard($id)
    {
        if(strlen($id) != 13) return false;
        for($i=0, $sum=0; $i<12;$i++)
            $sum += (int)($id{$i})*(13-$i);

        if((11-($sum%11))%10 == (int)($id{12})) return true;
        return false;
    }


    public static function RoundUp($number, $precision = null)
    {
        $_precision = ($precision != null) ? $precision : Yii::$app->params['TYPE_DECIMAL'];
        $fig = pow(10, $_precision);
        return (ceil($number * $fig) / $fig);
    }



    public static function CalculateTax($tax_rate,$val)
    {
        $v = ($tax_rate/100) * $val;
        return self::RoundUp($v);
    }

    public static function CalculateWitholdingTax($tax_rate,$val)
    {
        $v = ($tax_rate/100) * $val;
        return self::RoundUp($v);
    }



    public static function MakeRound($number, $precision = null)
    {
        //$_precision = ($precision != null) ? $precision : Yii::$app->params['TYPE_DECIMAL'];
        return round($number);
    }


    public static function MakeFloor($number)
    {
        return floor($number);
    }


    public static function MakeCeil($number)
    {
        return ceil($number);
    }


    public static function printobj($obj)
    {
        echo 'COUNT =>'.count($obj);
        echo '<pre>';
        print_r($obj);
        echo '</pre>';

        exit();
    }


    public static function removeDashIDcard($str)
    {
        return ($str) ? str_replace("-","",$str) : null;
    }
    

    public  static function displayIDcard($str)
    {
        if ($str == null || $str == '') {
            return '';
        } else {
            $a = substr($str, 0, 1);
            $b = substr($str, 1, 4);
            $c = substr($str, 5, 5);
            $d = substr($str, 10, 2);
            $e = substr($str, 12, 1);
            return "$a-$b-$c-$d-$e";
        }
    }


    public static function dispActive($id)
    {
        if($id==Yii::$app->params['ACTIVE_STATUS'])
            return \Yii::$app->request->BaseUrl.'/images/wshr/yes.png';
        else
            return \Yii::$app->request->BaseUrl.'/images/wshr/no.png';
    }
     public static function  convnum2str($number){
		$number=str_replace(",","",$number);
		$t1 = array("ศูนย์", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า");
		$t2 = array("เอ็ด", "ยี่","สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน");
		$zerobahtshow = 0; // ã¹¡Ã³Õ·ÕèÁÕáµèšÓ¹Ç¹ÊµÒ§€ì àªè¹ 0.25 ËÃ×Í .75 šÐãËéáÊŽ§€ÓÇèÒ ÈÙ¹ÂìºÒ· ËÃ×ÍäÁè 0 = äÁèáÊŽ§, 1 = áÊŽ§
		//(string) $number;
		
		$number = explode(".", $number);
		if(!empty($number[1])){
			if(strlen($number[1]) == 1){
				$number[1] .= "0";
			}elseif(strlen($number[1]) > 2){
				if($number[1]{2} < 5){
					$number[1] = substr($number[1], 0, 2);
				}else{
					$number[1] = $number[1]{0}.($number[1]{1}+1);
				}
			}
		}
		
		for($i=0; $i<count($number); $i++){
			$countnum[$i] = strlen($number[$i]);
			if($countnum[$i] <= 7){
				$var[$i][] = $number[$i];
			}else{
				$loopround = ceil($countnum[$i]/6);
				for($j=1; $j<=$loopround; $j++){
					if($j == 1){
						$slen = 0;
						$elen = $countnum[$i]-(($loopround-1)*6);
					}else{
						$slen = $countnum[$i]-((($loopround+1)-$j)*6);
						$elen = 6;
					}
					$var[$i][] = substr($number[$i], $slen, $elen);
				}
			}
			
			$nstring[$i] = "";
			for($k=0; $k<count($var[$i]); $k++){
				if($k > 0) $nstring[$i] .= $t2[7];
				$val = $var[$i][$k];
				$tnstring = "";
				$countval = strlen($val);
				
				for($l=7; $l>=2; $l--){
					if($countval >= $l){
						$v = substr($val, -$l, 1);
						if($v > 0){
							if($l == 2 && $v == 1){
								$tnstring .= $t2[($l)];
							}elseif($l == 2 && $v == 2){
								$tnstring .= $t2[1].$t2[($l)];
							}else{
								$tnstring .= $t1[$v].$t2[($l)];
							}
						}
					}
				}
				
				if($countval >= 1){
					$v = substr($val, -1, 1);
					if($v > 0){
						if($v == 1 && $countval > 1 && substr($val, -2, 1) > 0){
							$tnstring .= $t2[0];
						}else{
							$tnstring .= $t1[$v];
						}
					}
				}
				$nstring[$i] .= $tnstring;
			}
		}
		
		$rstring = "";
		if(!empty($nstring[0]) || $zerobahtshow == 1 || empty($nstring[1])){
			if($nstring[0] == "") $nstring[0] = $t1[0];
			$rstring .= $nstring[0]."บาท";
		}
		
		if(count($number) == 1 || empty($nstring[1])){
			$rstring .= "ถ้วน";
		}else{
			$rstring .= $nstring[1]."สตางค์";
		}
		
	return $rstring;
	}

	public static function removeCommar($str)
    {
        return ($str) ? str_replace(",","",$str) : null;
    }
}