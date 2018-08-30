<?php


/**
 * Created by PhpStorm.
 * User: adithep
 * Date: 2/1/2017 AD
 * Time: 10:50
 */

namespace app\api;


use app\api\Common;
use app\models\Doctor;
use app\modules\hr\models\Empsalary;
use app\modules\hr\models\OrgConfigmaster;
use app\modules\hr\models\PayrollConfigTemplate;
use app\modules\hr\models\Workingcompany;
use app\modules\hr\models\Department;
use app\modules\hr\models\Section;
use app\modules\hr\models\Empdata;
use app\modules\hr\models\TaxIncomeSection;
use app\modules\hr\models\TaxIncomeType;
use app\modules\hr\models\Place;
use app\api\DBConnect;
use app\modules\vhc\models\VHC\VhcModel;
use Yii;

class ApiHr
{


    public static function getOrgMasterConfig()
    {
        $data = OrgConfigmaster::findOne(1);
        return $data;
    }


    public static function getPayrollConfigTemplate()
    {
        $data = PayrollConfigTemplate::findOne(1);
        return $data;
    }

    public static function selectProgram()
    {
        $data = Place::find()
            ->where('status <> 99 ')
            ->asArray()
            ->all();

        return $data;
    }

    public static function getWorking_company()
    {
        $data = Workingcompany::find()
            ->where('status <> 99 ')
            ->asArray()
            ->all();
        $result = [];
        foreach ($data as $item) {
            $result[$item['id']] = $item;
        }

        return $result;
    }

    public static function getWorking_companyById($id)
    {
        $data = Workingcompany::find()
            ->where('status <> 99 and id = ' . $id)
            ->asArray()
            ->all();
        $result = [];
        foreach ($data as $item) {
            $result[$item['id']] = $item;
        }

        return $result;
    }

    public static function getDepartment($id_company)
    {
        $data = Department::find()
            ->where('company = ' . $id_company . ' ')
            ->asArray()
            ->all();
        $result = [];
        foreach ($data as $item) {
            $result[$item['id']] = $item;
        }

        return $result;
    }

    public static function getDepartmentAll()
    {
        $data = Department::find()
            ->asArray()
            ->all();
        $result = [];
        foreach ($data as $item) {
            $result[$item['id']] = $item;
        }

        return $result;
    }

    public static function getSectionAll()
    {
        $data = Section::find()
            ->asArray()
            ->all();
        $result = [];
        foreach ($data as $item) {
            $result[$item['id']] = $item;
        }

        return $result;
    }

    public static function getSection($id_department)
    {
        $data = Section::find()
            ->where('department = ' . $id_department . ' AND status <> 99')
            ->groupBy('id')
            ->asArray()
            ->all();
        $result = [];
        foreach ($data as $item) {
            $result[$item['id']] = $item;
        }

        return $result;
    }

    public static function getSectionInId($id_section)
    {
        $str_where = '';
        $str_section = (is_array($id_section)) ? JOIN(',', $id_section) : '';
        if ($str_section != '') {
            $str_where = 'section.id in (' . $str_section . ') AND';
        }
        $data = Section::find()
            ->select('section.*,position.*,position.id as positionid,section.id as sectionid')
            ->join('INNER JOIN', 'position', 'section.id = position.Section')
            ->where($str_where . ' section.status <> 99 AND position.status <> 99')
            ->groupBy('position.WorkCompany ,position.Department ,position.Section ,position.WorkType ,position.Level')
            ->asArray()
            ->all();
        $result = [];
        foreach ($data as $item) {
            $result[$item['sectionid']][$item['positionid']] = $item;
        }

        return $result;
    }


    public static function getEmpSalaryAll()
    {
        $model = Empsalary::find()->select('EMP_SALARY_ID,EMP_SALARY_ID_CARD,EMP_SALARY_WORKING_COMPANY,EMP_SALARY_WAGE')
            ->where([
                'status' => 1
            ])->asArray()->orderBy(['EMP_SALARY_WORKING_COMPANY' => SORT_ASC])->all();
        $arrEmpSalary = [];
        if (is_array($model) || is_object($model)) {
            foreach ($model as $item) {
                $arrEmpSalary[$item['EMP_SALARY_ID_CARD']][$item['EMP_SALARY_WORKING_COMPANY']][$item['EMP_SALARY_ID']] = $item['EMP_SALARY_WAGE'];
            }
        }
        return $arrEmpSalary;
    }

    public static function getEmpSalaryByIDCard($idcard)
    {

        $arrIDcard = (!is_array($idcard)) ? [$idcard] : $idcard;
        $model = Empsalary::find()->select('EMP_SALARY_ID,EMP_SALARY_ID_CARD,EMP_SALARY_WORKING_COMPANY,EMP_SALARY_WAGE')
            ->where([
                'status' => 1,
            ])->andWhere([
                'IN', 'EMP_SALARY_ID_CARD', $arrIDcard
            ])->asArray()->orderBy(['EMP_SALARY_WORKING_COMPANY' => SORT_ASC])->all();


        $arrEmpSalary = [];
        if (is_array($model) || is_object($model)) {
            foreach ($model as $item) {
                $arrEmpSalary[$item['EMP_SALARY_ID_CARD']][$item['EMP_SALARY_WORKING_COMPANY']][$item['EMP_SALARY_ID']] = $item['EMP_SALARY_WAGE'];
            }
        }
        return $arrEmpSalary;
    }

    public static function getEmpWorkTimeByIDCard($idcard)
    {
        $arrIDcard = (!is_array($idcard)) ? [$idcard] : $idcard;

        $model = Empdata::find()->select('DataNo,ID_Card,startWorkTime as start_time,beginLunch,endLunch,endWorkTime as end_time')
            ->where([
                'IN', 'ID_Card', $arrIDcard
            ])->asArray()->orderBy(['DataNo' => SORT_ASC])->all();

        $arrList = [];
        if (is_array($model) || is_object($model)) {
            foreach ($model as $item) {
                $arrList[$item['ID_Card']] = $item;
            }
        }
        return $arrList;
    }



    public static function getSeachDataPersonalByIdcard($id_card)
    {
        //* Change Connect from  ***/
        //$db['ou'] = DBConnect::getDBConn()['ou'];
        //$db['ct'] = Yii::$app->params['dbConn']['ERP_easyhr_checktime'];

        /* To connection like this */
        $db['ou'] = DBConnect::getDBConn()['ou'];
        $db['ct'] = DBConnect::getDBConn()['ct'];
        $db['pl'] = DBConnect::getDBConn()['pl'];

        $sql = "SELECT $db[ct].emp_data.*, $db[pl].EMP_SALARY.*,
        $db[ou].department.name AS NameDepartment,
        $db[ou].section.name AS NameSection,
        $db[ou].working_company.name AS NameCompany
        FROM $db[ct].emp_data
        INNER JOIN $db[pl].EMP_SALARY ON $db[ct].emp_data.ID_Card = $db[pl].EMP_SALARY.EMP_SALARY_ID_CARD
        INNER JOIN $db[ou].working_company ON $db[ou].working_company.id = $db[pl].EMP_SALARY.EMP_SALARY_WORKING_COMPANY
        INNER JOIN $db[ou].department ON $db[ou].department.id = $db[pl].EMP_SALARY.EMP_SALARY_DEPARTMENT
        INNER JOIN $db[ou].section ON  $db[ou].section.id = $db[pl].EMP_SALARY.EMP_SALARY_SECTION
        WHERE $db[ct].emp_data.ID_Card = '$id_card' ";


        $connection = \Yii::$app->dbERP_easyhr_PAYROLL;
        $data = $connection->createCommand($sql)->queryOne();
        return $data;
    }

    public static function getCompanyByIdcard($id_card)
    {
        // $data = Empdata::find()
        //     ->select(['working_company.id AS IdCompany',
        //         'working_company.name AS NameCompany'])
        //     ->from('emp_data')
        //     ->where('emp_data.ID_Card = :id_card AND working_company.status != "99"')
        //     ->innerJoin('working_company', 'working_company.id = emp_data.Working_Company')
        //     ->addParams([':id_card' => $id_card])
        //     ->asArray()
        //     ->all();
        // return $data;

        $db['ou'] = DBConnect::getDBConn()['ou'];
        $db['ct'] = DBConnect::getDBConn()['ct'];
        $db['pl'] = DBConnect::getDBConn()['pl'];

        $sql = "SELECT  $db[ou].working_company.id as IdCompany,
        $db[ou].working_company.name as NameCompany
        FROM $db[pl].EMP_SALARY
        INNER JOIN $db[ou].working_company ON $db[ou].working_company.id = $db[pl].EMP_SALARY.EMP_SALARY_WORKING_COMPANY
        INNER JOIN $db[ct].emp_data ON $db[ct].emp_data.ID_Card = $db[pl].EMP_SALARY.EMP_SALARY_ID_CARD
        WHERE $db[pl].EMP_SALARY.EMP_SALARY_ID_CARD = $id_card ";

        $connection = \Yii::$app->dbERP_easyhr_checktime;
        $data = $connection->createCommand($sql)->queryAll();
        return $data;
    }

    public static function getEmpdataByCompany($id_company, $id_department, $id_section)
    {
        $db['ou'] = DBConnect::getDBConn()['ou'];
        $db['ct'] = DBConnect::getDBConn()['ct'];
        $db['pl'] = DBConnect::getDBConn()['pl'];

        $sql1 = $sql2 = $sqlCond = $sqlBase = $sqlMain = null;
        $sqlBase = "SELECT $db[ct].emp_data.ID_Card as ID_Cardauto,
            CONCAT($db[ct].emp_data.Name,' ',$db[ct].emp_data.Surname) as Fullnameauto
            FROM $db[ct].emp_data
            INNER JOIN $db[pl].EMP_SALARY ON $db[ct].emp_data.ID_Card = $db[pl].EMP_SALARY.EMP_SALARY_ID_CARD
            INNER JOIN $db[ou].working_company ON $db[ou].working_company.id = $db[pl].EMP_SALARY.EMP_SALARY_WORKING_COMPANY
            INNER JOIN $db[ou].department ON $db[ou].department.id = $db[pl].EMP_SALARY.EMP_SALARY_DEPARTMENT
            INNER JOIN $db[ou].section ON  $db[ou].section.id = $db[pl].EMP_SALARY.EMP_SALARY_SECTION
            WHERE 1=1 ";

        $sql1 .= $sqlBase;
        $sql1 .= " AND $db[ct].emp_data.Prosonnal_Being <> 3 AND $db[ct].emp_data.username <> '#####Out Off###' ";

        if(!empty($id_company) && $id_company != '') {
            $sqlCond .=" AND $db[pl].EMP_SALARY.EMP_SALARY_WORKING_COMPANY = $id_company ";
        }

        if(!empty($id_department) && $id_department != '') {
            $sqlCond .=" AND $db[pl].EMP_SALARY.EMP_SALARY_DEPARTMENT = $id_department ";
        }

        if(!empty($id_section) && $id_section != '') {
            $sqlCond .=" $db[pl].EMP_SALARY.EMP_SALARY_SECTION = $id_section ";
        }

        $sql1 .= $sqlCond;
        $sql1 .= " UNION ";
        $sql2 .= $sqlBase;
        $sql2 .= $sqlCond;
        $sql2 .= " AND   DATEDIFF(NOW(),End_date) <= 45 ";

        $sqlMain .= $sql1;
        $sqlMain .= $sql2;

        $connection = \Yii::$app->dbERP_easyhr_checktime;
        $data = $connection->createCommand($sqlMain)->queryAll();
        return $data;
    }

    public static function getEmpNameForCreateByInIdcard($id_card)
    {
        $data = Doctor::find()
            ->select(['doctor.id as id',
                'CONCAT(doctor.firstname," ",doctor.lastname) as Fullname'])
            ->where(['id'=> $id_card])
            ->asArray()
            ->all();
        return $data;
    }

    public static function getEmpfullnameForCreateByIdcard($id_card)
    {
        $data = Empdata::find()
            ->select(['emp_data.ID_Card as ID_Card',
                'CONCAT(emp_data.Name," ",emp_data.Surname) as Fullname'])
            ->where(['ID_Card'=> $id_card])
            ->asArray()
            ->one();
        return ($data) ? $data['Fullname'] : $id_card;
    }



    public static function seachEmpAndCompany($id_company, $id_department, $id_section)
    {
        $db['ou'] = DBConnect::getDBConn()['ou'];
        $db['ct'] = DBConnect::getDBConn()['ct'];
        $db['pl'] = DBConnect::getDBConn()['pl'];


        $sql1 = $sql2 = $sqlCond = $sqlBase = $sqlMain = null;

        $sqlBase = "SELECT $db[ct].emp_data.ID_Card as ID_Card,
            CONCAT($db[ct].emp_data.Name,' ',$db[ct].emp_data.Surname) as Fullname,
            $db[ou].working_company.name as CompanyName,
            $db[ou].department.name as DepartmentName,
            $db[ou].section.name as SectionName,
            $db[pl].EMP_SALARY.EMP_SALARY_POSITION_CODE as Position
            FROM $db[ct].emp_data
            INNER JOIN $db[pl].EMP_SALARY ON $db[ct].emp_data.ID_Card = $db[pl].EMP_SALARY.EMP_SALARY_ID_CARD
            INNER JOIN $db[ou].working_company ON $db[ou].working_company.id = $db[pl].EMP_SALARY.EMP_SALARY_WORKING_COMPANY
            INNER JOIN $db[ou].department ON $db[ou].department.id = $db[pl].EMP_SALARY.EMP_SALARY_DEPARTMENT
            INNER JOIN $db[ou].section ON  $db[ou].section.id = $db[pl].EMP_SALARY.EMP_SALARY_SECTION
            WHERE  ($db[ct].emp_data.Prosonnal_Being <> 3 AND   $db[ct].emp_data.username <> '#####Out Off###')
            ";


        $sql1 .= $sqlBase;
        $sql1 .= " AND $db[ct].emp_data.Prosonnal_Being <> 3 AND $db[ct].emp_data.username <> '#####Out Off###' ";

        if(!empty($id_company) && $id_company != '') {
            $sqlCond .=" AND $db[pl].EMP_SALARY.EMP_SALARY_WORKING_COMPANY = $id_company ";
        }

        if(!empty($id_department) && $id_department != '') {
            $sqlCond .=" AND $db[pl].EMP_SALARY.EMP_SALARY_DEPARTMENT = $id_department ";
        }

        if(!empty($id_section) && $id_section != '') {
            $sqlCond .=" $db[pl].EMP_SALARY.EMP_SALARY_SECTION = $id_section ";
        }

        $sql1 .= $sqlCond;
        $sql1 .= " UNION ";
        $sql2 .= $sqlBase;
        $sql2 .= $sqlCond;
        $sql2 .= " AND   DATEDIFF(NOW(),End_date) <= 45 ";

        $sqlMain .= $sql1;
        $sqlMain .= $sql2;

        $connection = \Yii::$app->dbERP_easyhr_checktime;
        $data = $connection->createCommand($sqlMain)->queryAll();
        return $data;


        /*
        if(!empty($id_company) && $id_company != '') {
            $sql .=" AND $db[pl].EMP_SALARY.EMP_SALARY_WORKING_COMPANY = $id_company ";
        }

        if(!empty($id_department) && $id_department != '') {
            $sql .=" AND $db[pl].EMP_SALARY.EMP_SALARY_DEPARTMENT = $id_department ";
        }

        if(!empty($id_section) && $id_section != '') {
            $sql .=" $db[pl].EMP_SALARY.EMP_SALARY_SECTION = $id_section ";
        }



        $connection = \Yii::$app->dbERP_easyhr_checktime;
        $data = $connection->createCommand($sql)->queryAll();
        return $data;
        */
        /*



        if (!empty($id_company) AND !empty($id_department) AND !empty($id_section)) {
            $sql = "SELECT $db[ct].emp_data.ID_Card as ID_Card,
            CONCAT($db[ct].emp_data.Name,' ',$db[ct].emp_data.Surname) as Fullname,
            $db[ou].working_company.name as CompanyName,
            $db[ou].department.name as DepartmentName,
            $db[ou].section.name as SectionName,
            $db[pl].EMP_SALARY.EMP_SALARY_POSITION_CODE as Position
            FROM $db[ct].emp_data
            INNER JOIN $db[pl].EMP_SALARY ON $db[ct].emp_data.ID_Card = $db[pl].EMP_SALARY.EMP_SALARY_ID_CARD
            INNER JOIN $db[ou].working_company ON $db[ou].working_company.id = $db[pl].EMP_SALARY.EMP_SALARY_WORKING_COMPANY
            INNER JOIN $db[ou].department ON $db[ou].department.id = $db[pl].EMP_SALARY.EMP_SALARY_DEPARTMENT
            INNER JOIN $db[ou].section ON  $db[ou].section.id = $db[pl].EMP_SALARY.EMP_SALARY_SECTION
            WHERE $db[pl].EMP_SALARY.EMP_SALARY_WORKING_COMPANY = $id_company
            AND   $db[pl].EMP_SALARY.EMP_SALARY_DEPARTMENT = $id_department
            AND   $db[pl].EMP_SALARY.EMP_SALARY_SECTION = $id_section
            AND   $db[ct].emp_data.Prosonnal_Being <> 3
            AND   $db[ct].emp_data.username <> '#####Out Off###'";

            $connection = \Yii::$app->dbERP_easyhr_checktime;
            $data = $connection->createCommand($sql)->queryAll();
            return $data;
        } elseif (!empty($id_company) AND !empty($id_department)) {

            $sql = "SELECT $db[ct].emp_data.ID_Card as ID_Card,
            CONCAT($db[ct].emp_data.Name,' ',$db[ct].emp_data.Surname) as Fullname,
            $db[ou].working_company.name as CompanyName,
            $db[ou].department.name as DepartmentName,
            $db[ou].section.name as SectionName,
            $db[pl].EMP_SALARY.EMP_SALARY_POSITION_CODE as Position
            FROM $db[ct].emp_data
            INNER JOIN $db[pl].EMP_SALARY ON $db[ct].emp_data.ID_Card = $db[pl].EMP_SALARY.EMP_SALARY_ID_CARD
            INNER JOIN $db[ou].working_company ON $db[ou].working_company.id = $db[pl].EMP_SALARY.EMP_SALARY_WORKING_COMPANY
            INNER JOIN $db[ou].department ON $db[ou].department.id = $db[pl].EMP_SALARY.EMP_SALARY_DEPARTMENT
            INNER JOIN $db[ou].section ON  $db[ou].section.id = $db[pl].EMP_SALARY.EMP_SALARY_SECTION
            WHERE $db[pl].EMP_SALARY.EMP_SALARY_WORKING_COMPANY = $id_company
            AND   $db[pl].EMP_SALARY.EMP_SALARY_DEPARTMENT = $id_department
            AND   $db[ct].emp_data.Prosonnal_Being <> 3
            AND   $db[ct].emp_data.username <> '#####Out Off###'";

            $connection = \Yii::$app->dbERP_easyhr_checktime;
            $data = $connection->createCommand($sql)->queryAll();
            return $data;
        } else if (!empty($id_company)) {

            $sql = "SELECT $db[ct].emp_data.ID_Card as ID_Card,
            CONCAT($db[ct].emp_data.Name,' ',$db[ct].emp_data.Surname) as Fullname,
            $db[ou].working_company.name as CompanyName,
            $db[ou].department.name as DepartmentName,
            $db[ou].section.name as SectionName,
            $db[pl].EMP_SALARY.EMP_SALARY_POSITION_CODE as Position
            FROM $db[ct].emp_data
            INNER JOIN $db[pl].EMP_SALARY ON $db[ct].emp_data.ID_Card = $db[pl].EMP_SALARY.EMP_SALARY_ID_CARD
            INNER JOIN $db[ou].working_company ON $db[ou].working_company.id = $db[pl].EMP_SALARY.EMP_SALARY_WORKING_COMPANY
            INNER JOIN $db[ou].department ON $db[ou].department.id = $db[pl].EMP_SALARY.EMP_SALARY_DEPARTMENT
            INNER JOIN $db[ou].section ON  $db[ou].section.id = $db[pl].EMP_SALARY.EMP_SALARY_SECTION
            WHERE $db[pl].EMP_SALARY.EMP_SALARY_WORKING_COMPANY = $id_company
            AND   $db[ct].emp_data.Prosonnal_Being <> 3
            AND   $db[ct].emp_data.username <> '#####Out Off###'";

            $connection = \Yii::$app->dbERP_easyhr_checktime;
            $data = $connection->createCommand($sql)->queryAll();
            return $data;
        }
        */


    }

    public static function getworkingcompanyByid($id)
    {
        $data = Workingcompany::find()
            ->where(['id' => $id])
            ->asArray()
            ->all();

        return $data;
    }

    public static function getempdataInidcard($arrIdcard)
    {
        $data = Empdata::find()
            ->select(['emp_data.ID_Card as ID_Card',
                'CONCAT(emp_data.Name," ",emp_data.Surname) as Fullname',
                'DataNo'])
            ->where(['IN', 'ID_Card', $arrIdcard])
            ->asArray()
            ->all();

        return $data;
    }

    public static function getempdataall()
    {
        $data = Empdata::find()
            ->select(['DataNo,CONCAT(Name," ",Surname) as label', 'ID_Card as value'])
            ->where('Prosonnal_Being <> 3 ')
            ->andWhere('username != "#####Out Off###"')
            ->orWhere(' DATEDIFF(NOW(),End_date) <= 45')
            ->asArray()
            ->all();

        return $data;
    }

    public static function getAllEmpinDB()
    {
        $data = Empdata::find()
            ->select(['DataNo,CONCAT(Name," ",Surname) as label', 'ID_Card as value'])
            ->orderBy('DataNo ASC')
            ->asArray()
            ->all();
        $arrEmp = [];
        foreach ($data as $item) {
            $arrEmp[$item['value']] = $item['label'];
        }
        return $arrEmp;
    }

    public static function gettaxincomesection()
    {
        $data = TaxIncomeSection::find()
            ->where('status_active = "1"')
            ->asArray()
            ->All();
        return $data;
    }

    public static function gettaxincometype()
    {
        $data = TaxIncomeType::find()
            ->where('status_active = "1"')
            ->asArray()
            ->All();
        return $data;
    }

    public static function gettaxnameincomesection($id)
    {
        $data = TaxIncomeSection::find()
            ->where('status_active = "1"')
            ->andWhere(['id' => $id])
            ->asArray()
            ->All();
        return $data;
    }

    public static function gettaxnameincometype($id)
    {
        $data = TaxIncomeType::find()
            ->where('status_active = "1"')
            ->andWhere(['id' => $id])
            ->asArray()
            ->All();
        return $data;
    }

    public static function getdatabyusername($username)
    {
        $model = Empdata::find()
            ->where(['username' => $username])
            ->asArray()
            ->one();
        return $model;
    }


    public static function getCurAddress()
    {
        return '-';
    }

    public static function getHomeAddress()
    {
        $address = Yii::$app->session->get('address');
        $moo = Yii::$app->session->get('moo');
        $road = Yii::$app->session->get('road');
        $village = Yii::$app->session->get('village');
        $subdistrict = Yii::$app->session->get('subdistrict');
        $district = Yii::$app->session->get('district');
        $province = Yii::$app->session->get('province');

        $_address = ($address != '' && $address != 'ไม่ระบุ' && $address != '-') ? $address : '';
        $_moo = ($moo != '' && $moo != 'ไม่ระบุ' && $moo != '-') ? '  หมู่' . $moo : '';
        $_road = ($road != '' && $road != 'ไม่ระบุ' && $road != '-') ? ' ถนน' . $road : '';
        $_village = ($village != '' && $village != 'ไม่ระบุ' && $village != '-') ? ' ' . $village : '';

        $_subdistrict = ($subdistrict != '' && $subdistrict != 'ไม่ระบุ' && $subdistrict != '-') ? ' ต.' . $subdistrict : '';
        $_district = ($district != '' && $district != 'ไม่ระบุ' && $district != '-') ? ' อ.' . $district : '';
        $_province = ($province != '' && $province != 'ไม่ระบุ' && $province != '-') ? ' จ.' . $province : '';

        return $_address . $_moo . $_road . $_village . $_subdistrict . $_district . $_province;
    }


    public static function getEducation()
    {
        return '-';
    }




}


?>