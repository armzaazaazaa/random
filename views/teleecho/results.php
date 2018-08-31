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
?>

<div class="box box-danger">
    <div class="breadcrumbs" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="/hospital/index.php/teleecho/symptom">กลับไปหน้ากล่องจดหมาย</a>
            </li>
            <li class="active">ผลการครวจ</li>
        </ul><!-- /.breadcrumb -->
        <!-- /section:basics/content.searchbox -->
    </div>
    <div class="box-body">
        <div class="row">
            <div class="col-md-12">
                <div class="tab-content">

                    <div class="box">
                        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        ...
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body table-responsive no-padding">
                            <table class="table table-hover">
                                <tbody>
                                <tr>
                                    <th>ลำดับที่</th>
                                    <th>ผู้ส่ง</th>
                                    <th>ผู้ปวย</th>
                                    <th>Status</th>
                                    <th>จัดการ</th>
                                </tr>
                                <? for ($i = 1; $i <= 10; $i++) { ?>
                                <tr>
                                    <td><?php print($i); ?></td>
                                    <td>John Doe</td>
                                    <td>11-7-2014</td>
                                    <td><span class="label label-success">Approved</span></td>
                                    <td>
                                        <button type="button" class="btn btn-primary" data-toggle="modal"
                                                data-target="#exampleModalCenter">
                                            Launch demo modal
                                        </button>
                                    </td>
                                </tr>
                                <? }?>


                                </tbody>
                            </table>
                        </div>
                        <!-- /.box-body -->
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
