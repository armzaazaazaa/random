<?php
/* @var $this yii\web\View */
$this->title = '';


use yii\helpers\Html;
use yii\grid\GridView;
use yii\bootstrap\Modal;
use yii\bootstrap\ActiveForm;
use yii\web\View;
use yii\widgets\Pjax;
use app\api\DateTime;
use yii\helpers\ArrayHelper;
use yii\web\JsExpression;

use yii\helpers\Url;

use yii\data\ActiveDataProvider;
use yii\widgets\ListView;
use app\api\Utility;
use app\api\ApiHr;

$this->registerJsFile(Yii::$app->request->baseUrl . '/js/global/master-utility-function.js?t=' . time(), ['depends' => [\yii\web\JqueryAsset::className()]]); //java
$this->registerJsFile(Yii::$app->request->baseUrl . '/js/global/validator.min.js', ['depends' => [\yii\web\JqueryAsset::className()]]); //java
$this->registerJsFile(Yii::$app->request->baseUrl . '/js/random/index.js?t=' . time(), ['depends' => [\yii\web\JqueryAsset::className()]]);
?>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<div class="box box-danger">
    <div class="breadcrumbs" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a>ทำการสุ่มรางวัล</a>
            </li>
            <li class="active"></li>
        </ul><!-- /.breadcrumb -->
        <!-- /section:basics/content.searchbox -->
    </div>
    <div class="box-body">
        <div class="col-md-12">


            <!--modal start-->
            <div class="row">

                <form role="form" id="pgenerate"name="pgenerate">
                    <div class="form-group">

                        <div class="box-body">
                            <label>เลขที่ออก </label>

                                <input type="text" size=21 name="output" id="randorm">
                            จำนวนหลัก<input type="text" name="thelength" size=3 value="3">หลัก

                        </div>

                        <div class="box-body">
                            <div class="form-group col-lg-4">
                                <label>รางวัลที่ต้องการสุ่ม</label>
                                <select class="form-control" id="numname">
                                    <option value="1">รางวัลที่ 1</option>
                                    <option value="2">รางวัลที่ 2</option>
                                    <option value="1a">รางวัลเลขข้างเคียงรางวัลที่ 1</option>
                                    <option value="2a">รางวัลเลขท้าย 2 ตัว</option>

                                </select>
                            </div>
                        </div>


                        <div class="box-body">
                            <button class="btn btn-primary" name="button" type="button" onClick="populateform(this.form.thelength.value)"  style="cursor:hand;" id="btnSave">จับรางวัล</button>
<!--                            --><?php //echo Html::hiddenInput('hide', null, ['id' => 'hide', 'class' => 'hide']); ?>
<!--                            --><?php //echo Html::button(' สุ่มรางวัล', ['class' => 'btn btn-primary', 'id' => 'btnSave']); ?>
                        </div>
                    </div>
                </form>


            </div>


            <div class="row">
                <div class="col-sm-12">
                    <?php
                    Pjax::begin(['id' => 'pjax_tb']);
                    echo GridView::widget([
                        'dataProvider' =>  $showemasterindex,
                        'filterModel' => $showemaster,
                        'columns' => [
                            [
                                'header' => 'ที่',
                                'class' => 'yii\grid\SerialColumn',
                                'headerOptions' => ['width' => '23'],
                            ],
                            [
                                'attribute' => 'randorm',
                                'header' => 'เลขที่ออก',
                                'value' => 'randorm',
                                'contentOptions' => ['style' => 'width: 500px;', 'align=center']
                            ],
                            [
                                'header' => 'รางวัล',
                                //'value' => 'id_doctor',
                                'value' => function ($data) {
                                    $modelResultemp = ApiHr::award($data->numname);
                                    return $modelResultemp;
                                },
                                'contentOptions' => ['style' => 'width: 500px;', 'align=center']
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


<br>
