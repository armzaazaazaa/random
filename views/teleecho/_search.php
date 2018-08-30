<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\PatientSearch */
/* @var $form yii\widgets\ActiveForm */
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
                <div class="patient-search">

                    <?php $form = ActiveForm::begin([
                        'action' => ['index'],
                        'method' => 'get',
                    ]); ?>




                    <?= $form->field($model, 'name') ?>

                    <?= $form->field($model, 'gender') ?>


                    <?php // echo $form->field($model, 'height') ?>

                    <?php // echo $form->field($model, 'weight') ?>

                    <?php // echo $form->field($model, 'id_doctor') ?>

                    <div class="form-group">
                        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
                        <?= Html::resetButton('Reset', ['class' => 'btn btn-default']) ?>
                    </div>

                    <?php ActiveForm::end(); ?>

                </div>
            </div>
        </div>
    </div>

</div>