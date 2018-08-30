<?php
$this->title = '';

/**
 * Created by PhpStorm.
 * User: watcharaphan
 * Date: 16/7/2018 AD
 * Time: 12:15
 */

use yii\helpers\Html;
use yii\grid\GridView;
use yii\bootstrap\Modal;
use yii\bootstrap\ActiveForm;
use yii\web\View;
use yii\widgets\Pjax;
use app\api\Utility;
use app\api\DateTime;
use yii\helpers\ArrayHelper;
use yii\web\JsExpression;
use yii\helpers\Url;
use yii\data\ActiveDataProvider;
use yii\widgets\ListView;
use app\api\ApiHr;

$imghr = Yii::$app->request->baseUrl . '/images/wshr';
$this->registerJsFile(Yii::$app->request->baseUrl . '/js/global/master-utility-function.js?t=' . time(), ['depends' => [\yii\web\JqueryAsset::className()]]); //java
$this->registerJsFile(Yii::$app->request->baseUrl . '/js/global/validator.min.js', ['depends' => [\yii\web\JqueryAsset::className()]]); //java
$this->registerJsFile(Yii::$app->request->baseUrl . '/js/hospital/patient.js?t='. time(), ['depends' => [\yii\web\JqueryAsset::className()]]);
?>


<div class="box box-danger">
    <div class="breadcrumbs" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="#">Home</a>
            </li>
            <li class="active">กล่องจดหมาย</li>
        </ul><!-- /.breadcrumb -->
        <!-- /section:basics/content.searchbox -->
    </div>
    <div class="box-body">
        <div class="row">
            <div class="col-md-12">
                <div class="tab-content">
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-12">


                                <!--modal start-->
                                <div class="row">
                                    <div class="col-md-11"></div>

                                    <div class="col-md-1">
                                        <?php
                                        Modal::begin([
                                            'id' => 'modalfrmAddpatient',
                                            'header' => '<strong>จัดการlevel </strong>',
                                            'toggleButton' => [
                                                'id' => 'btnAddNewpatient',
                                                'label' => '<i class="fa fa-plus-circle"></i>  เพิ่ม ',
                                                'class' => 'btn btn-success'
                                            ],
                                            'closeButton' => [
                                                'label' => '<i class="fa fa-close"></i>',
                                                //'class' => 'close pull-right',
                                                'class' => 'btn btn-success btn-sm pull-right'
                                            ],
                                            'size' => 'modal-md',
                                        ]);
                                        ?>
                                        <form role="form" id="frmAddpatient">
                                            <div class="form-group">
                                                <div class="box-body">
                                                    <div class="col-md-12">

                                                    </div>
                                                </div>

                                                <div class="box-body">
                                                    <label>ชื่อlevel <span>*</span></label>
                                                    <input id="name" name="name"
                                                           data-required="true"
                                                           class="form-control name" type="text"
                                                           placeholder="ชื่อ">
                                                </div>
                                                <div class="box-body">
                                                    <label>ชื่อlevel <span>*</span></label>
                                                    <input id="gender" name="gender"
                                                           data-required="true"
                                                           class="form-control model_name" type="text"
                                                           placeholder="ชื่อ">
                                                </div>
                                                <div class="box-body">
                                                    <label>ชื่อlevel <span>*</span></label>
                                                    <input id="age" name="age"
                                                           data-required="true"
                                                           class="form-control age" type="text"
                                                           placeholder="ชื่อ">
                                                </div>
                                                <div class="box-body">
                                                    <label>ชื่อlevel <span>*</span></label>
                                                    <input id="height" name="height"
                                                           data-required="true"
                                                           class="form-control height" type="text"
                                                           placeholder="ชื่อ">
                                                </div>
                                                <div class="box-body">
                                                    <label>ชื่อlevel <span>*</span></label>
                                                    <input id="weight" name="weight"
                                                           data-required="true"
                                                           class="form-control weight" type="text"
                                                           placeholder="ชื่อ">
                                                </div>



                                                </div>


                                                <div class="box-body">
                                                    <?php echo Html::hiddenInput('hide_activityedit_patient', null, ['id' => 'hide_activityedit_patient', 'class' => 'hide_activityedit_patient']); ?>
                                                    <?php echo Html::button('<i class="fa fa-save"></i> บันทึก', ['class' => 'btn btn-primary', 'id' => 'btnSaveActivitypatient']); ?>
                                                </div>
                                            </div>
                                        </form>
                                        <?php
                                        Modal::end();
                                        ?>
                                    </div>

                                </div>

                                <div class="row">
                                    <div class="col-sm-12">
                                        <?php
                                        Pjax::begin(['id' => 'pjax_tb_savepatient']);
                                        echo GridView::widget([
                                            'dataProvider' => $showsee,
                                            'filterModel' => $showpatient,
                                            'columns' => [
                                                [
                                                    'header' => 'ที่',
                                                    'class' => 'yii\grid\SerialColumn',
                                                    'headerOptions' => ['width' => '23'],
                                                ],
                                                [
                                                    'attribute' => 'name',
                                                    'header' => 'ชื่อ',
                                                    'value' => 'name',
                                                    'contentOptions' => ['style' => 'width: 500px;', 'align=center']
                                                ],
                                                [

                                                    'header' => 'เพศ',
                                                    'value' => 'gender',
                                                    'contentOptions' => ['style' => 'width: 500px;', 'align=center']
                                                ],
                                                [

                                                    'header' => 'อายุ',
                                                    'value' => 'age',
                                                    'contentOptions' => ['style' => 'width: 500px;', 'align=center']
                                                ],
                                                [

                                                    'header' => 'ส่วนสูง',
                                                    'value' => 'height',
                                                    'contentOptions' => ['style' => 'width: 500px;', 'align=center']
                                                ],
                                                [

                                                    'header' => 'น้ำหนัก',
                                                    'value' => 'weight',
                                                    'contentOptions' => ['style' => 'width: 500px;', 'align=center']
                                                ],
                                                [
                                                    'header' => 'วันที่',
                                                    'value' => function ($data) {
                                                        return DateTime::ThaiDateTime($data->date);
                                                    },
                                                    'contentOptions' => ['style' => 'width: 500px;', 'align=center']
                                                ],
                                                [
                                                    'attribute' => 'id_doctor',
                                                    'header' => 'หมอ',
                                                    //'value' => 'id_doctor',
                                                    'value' => function ($data) {
                                                        $modelResultemp = ApiHr::getEmpNameForCreateByInIdcard($data->id_doctor);
                                                        return $modelResultemp['0']['Fullname'];
                                                    },
                                                    'contentOptions' => ['style' => 'width: 500px;', 'align=center']
                                                ],
                                                [

                                                    'class' => 'yii\grid\ActionColumn',
                                                    'header' => 'จัดการข้อมูลผู้ป่วย',
                                                    'template' => '{view} &nbsp;&nbsp; {update}  &nbsp;&nbsp; {delete}',
                                                    'buttons' => [
                                                        'update' => function ($url, $data) {
                                                            return Html::a('<img src="' . Yii::$app->request->baseUrl . '/images/global/edit-icon.png">', 'javascript:;', [
                                                                'title' => 'แก้ไข',
                                                                'onclick' => '(function($event) {
                                                                        updatepatient(' . $data->id . ',1);
                                                                })();'
                                                            ]);
                                                        },

//                                                        'delete' => function ($url, $data) {
//                                                            return Html::a('<img src="' . Yii::$app->request->baseUrl . '/images/global/delete-icon.png">', 'javascript:;', [
//                                                                'title' => 'ลบ',
//                                                                'onclick' => '(function($event) {
//                                                                        bootbox.confirm({
//                                                                            size: "small",
//                                                                           message:"<h4 class=\"btalert\">คุณแน่ใจว่าจะลบรายการ ' . $data->name . '? </h4>",
//                                                                            callback: function(result){
//                                                                                if(result==1) {
//                                                                                    deletepatient (' . $data->id . ',1);
//                                                                                }
//                                                                            }
//                                                                        });
//
//                                                                    })();'
//                                                            ]);
//                                                        },
                                                    ],

                                                    'contentOptions' => ['style' => 'width: 200px;', 'align=center']

                                                ],


                                            ],

                                        ]);
                                        Pjax::end();
                                        ?>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

