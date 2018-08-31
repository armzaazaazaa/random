<?php
/**
 * Created by PhpStorm.
 * User: watcharaphan
 * Date: 16/6/2018 AD
 * Time: 14:42
 */

$this->title = '';
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
use kartik\select2\Select2;
use app\api\ApiHr;

use app\models\Province;

use kartik\widgets\FileInput;
use kartik\date\DatePicker;

$imghr = Yii::$app->request->baseUrl . '/images/wshr';
$this->registerJsFile(Yii::$app->request->baseUrl . '/js/global/master-utility-function.js?t=' . time(), ['depends' => [\yii\web\JqueryAsset::className()]]); //java
$this->registerJsFile(Yii::$app->request->baseUrl . '/js/global/validator.min.js', ['depends' => [\yii\web\JqueryAsset::className()]]); //java
$this->registerJsFile(Yii::$app->request->baseUrl . '/js/hospital/jquery-ui.js', ['depends' => [\yii\web\JqueryAsset::className()]]);
$this->registerJsFile(Yii::$app->request->baseUrl . '/js/hospital/symptom.js?t=' . time(), ['depends' => [\yii\web\JqueryAsset::className()]]);
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


                    <div class="col-md-12">


                        <!--modal start-->
                        <div class="row">
                            <div class="col-md-11"></div>

                            <div class="col-md-1">
                                <?php
                                Modal::begin([
                                    'id' => 'modalfrmAddsymptom',
                                    'header' => '<strong>จัดการอาการป่วย </strong>',
                                    'toggleButton' => [
                                        'id' => 'btnAddNewsymptom',
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
                                <form role="form" id="frmAddsymptom">
                                    <div class="form-group">
                                        <div class="box-body">
                                            <div class="col-md-12">

                                            </div>
                                        </div>

                                        <div class="box-body">
                                            <div class="col-lg-12">
                                                <label for="monthselect"
                                                       class="col-sm-4 control-label">ชื่อคนไข้</label>
                                                <div class="col-sm-8">
                                                    <select id="id_patient" name="id_patient"
                                                            class="form-control select2">
                                                        <option value="id"></option>
                                                        <?php foreach ($modelpatient as $k => $v) { ?>
                                                            <option value="<?php echo $v['id'] ?>"><?php echo $v['name'] ?></option>
                                                        <?php }; ?>
                                                    </select>
                                                </div>
                                            </div>
                                            <br>  <br>
                                            <div class="col-lg-12">
                                                <label for="monthselect"
                                                       class="col-sm-4 control-label">อาการ</label>
                                                <div class="col-sm-8">
                                                    <input style="width: 310px;height: 30px" type="text" id="diagnosis" name="diagnosis">
                                                </div>
                                            </div>
                                            <br>  <br>
                                            <div class="col-lg-12">
                                                <label for="monthselect"
                                                       class="col-sm-4 control-label">ผลตรวจทางห้องปฏิบัติการ</label>
                                                <div class="col-sm-8">
                                                    <textarea type="text" class="form-control" rows="3" id="lab" name="lab"></textarea>
                                                </div>
                                            </div>
                                            <br>  <br><br>  <br>
                                            <div class="col-lg-12">
                                                <label for="monthselect"
                                                       class="col-sm-4 control-label">แผนการรักษา</label>
                                                <div class="col-sm-8">
                                                    <textarea type="text" class="form-control" rows="3" id="pan" name="pan"></textarea>
                                                </div>
                                            </div>
                                            <br>  <br><br>  <br>
                                            <div class="col-lg-12">
                                                <label for="monthselect"
                                                       class="col-sm-4 control-label">comment</label>
                                                <div class="col-sm-8">
                                                    <textarea type="text" class="form-control" rows="3" id="comment" name="comment"></textarea>
                                                </div>
                                            </div>

                                            <br>  <br><br>  <br>
                                            <div class="col-lg-12">
                                                <label for="monthselect"
                                                       class="col-sm-4 control-label">ส่งรายงาน</label>
                                                <div class="col-sm-8">
                                                    <select id="id_send" name="id_send"
                                                            class="form-control select2">
                                                        <option value="">ไม่ส่ง</option>
                                                        <?php foreach ($modeldocter as $k => $v) { ?>
                                                            <option value="<?php echo $v['id'] ?>"><?php echo $v['firstname']." "." ".$v['lastname'] ?></option>
                                                        <?php }; ?>
                                                    </select>
                                                </div>
                                            </div>


                                        </div>


                                    </div>


                                    <div class="box-body">
                                        <?php echo Html::hiddenInput('hide_activityedit_symptom', null, ['id' => 'hide_activityedit_symptom', 'class' => 'hide_activityedit_symptom']); ?>
                                        <?php echo Html::button('<i class="fa fa-save"></i> บันทึก', ['class' => 'btn btn-primary', 'id' => 'btnSaveActivitysymptom']); ?>
                                    </div>
                            </div>
                            </form>
                            <?php
                            Modal::end();
                            ?>
                        </div>

                    </div>

                    <div class="row">
                        <label class="col-lg-6">คนไข้ที่เราทำการเพิ่มอาการ</label>
                        <div class="col-sm-12">
                            <?php
                            Pjax::begin(['id' => 'pjax_tb_savesymptom']);
                            echo GridView::widget([
                                'dataProvider' => $showsymtomsearch ,
                                'filterModel' => $showsymtomprovider,
                                'columns' => [
                                    [
                                        'header' => 'ที่',
                                        'class' => 'yii\grid\SerialColumn',
                                        'headerOptions' => ['width' => '23'],
                                    ],
                                    [
                                        'attribute' => 'id_patient',
                                        'header' => 'ชื่อคนไข้',
                                        'value' => function ($data) {
                                            $modelResultemp = ApiHr::getEmpNameForCreateByInIdcardpatient($data->id_patient);
                                            return $modelResultemp['0']['Fullname'];
                                        },
                                        'contentOptions' => ['style' => 'width: 280px;', 'align=center']
                                    ],
                                    [
                                        'attribute' => 'id_doctor',
                                        'header' => 'ผู้บันทึก',
                                        //'value' => 'id_doctor',
                                        'value' => function ($data) {
                                            $modelResultemp = ApiHr::getEmpNameForCreateByInIdcard($data->id_doctor);
                                            return $modelResultemp['0']['Fullname'];
                                        },
                                        'contentOptions' => ['style' => 'width: 500px;', 'align=center']
                                    ],
                                    [
                                        'header' => 'วันที่บันทึกอาการ',
                                        'value' => function ($data) {
                                            return DateTime::ThaiDateTime($data->date);
                                        },
                                        'contentOptions' => ['style' => 'width: 100px;', 'align=center']
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
                                                                        updatesymptom(' . $data->id . ',1);
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
