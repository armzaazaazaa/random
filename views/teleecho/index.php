<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\models\PatientSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = '';

?>
<div class="box box-danger">
    <div class="breadcrumbs" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="#">รายชื่อคนไข้ทั้งหมด</a>
            </li>
            <li class="active"></li>
        </ul><!-- /.breadcrumb -->
        <!-- /section:basics/content.searchbox -->
    </div>
    <div class="box-body">
        <div class="row">
            <div class="col-md-12">


                <div class="patient-index">

                    <h1><?= Html::encode($this->title) ?></h1>
                    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>


                    <?= GridView::widget([
                        'dataProvider' => $dataProvider,
                        'filterModel' => $searchModel,
                        'columns' => [
                            ['class' => 'yii\grid\SerialColumn'],
                            'name',
                            'gender',
                            'age',
                            'date',
                            'height',
                            'weight',
                            //'id_doctor',


                        ],
                    ]); ?>
                </div>
            </div>
        </div>
    </div>
</div>