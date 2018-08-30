<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;
use dosamigos\datepicker\DatePicker;

/* @var $this yii\web\View */
/* @var $model app\models\Patient */
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
                <div class="patient-form">

                    <?php $form = ActiveForm::begin(); ?>

                    <?= $form->field($model, 'date')->widget(
                        DatePicker::className(), [
                        // inline too, not bad
                        'inline' => true,
                        // modify template for custom rendering
                        'template' => '<div class="well well-sm" style="background-color: #fff; width:250px">{input}</div>',
                        'clientOptions' => [
                            'autoclose' => true,
                            'format' => 'yyyy-mm-dd'
                        ]
                    ]); ?>

                    <?= $form->field($model, 'name')->textInput(['maxlength' => true]) ?>

                    <?= $form->field($model, 'gender')->textInput(['maxlength' => true]) ?>

                    <?= $form->field($model, 'age')->textInput() ?>

                    <?= $form->field($model, 'height')->textInput() ?>

                    <?= $form->field($model, 'weight')->textInput() ?>

                    <?= $form->field($model, 'id_doctor')->textInput(['maxlength' => true]) ?>

                    <div class="form-group">
                        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
                    </div>

                    <?php ActiveForm::end(); ?>

                </div>
            </div>
        </div>
    </div>

</div>
