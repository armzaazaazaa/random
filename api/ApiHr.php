<?php


/**
 * Created by PhpStorm.
 * User: adithep
 * Date: 2/1/2017 AD
 * Time: 10:50
 */

namespace app\api;


use app\api\Common;
use Yii;

class ApiHr
{
    public static function award($id_card)
    {
        if ($id_card == '1'){
            $data = 'รางวัลที่1';
        }elseif ($id_card == '2a'){
            $data = 'รางวัลเลขท้าย 2 ตัว';
        }elseif ($id_card == '2'){
            $data = 'รางวัลที่2';
        }elseif ($id_card == '1a'){
            $data = 'รางวัลเลขข้างเคียงรางวัลที่ 1';
        }

        return $data;
    }


}


?>