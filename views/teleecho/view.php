<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model app\models\Patient */
//$this->title = '';
//$this->title = $model->name;

?>

<div class="box box-danger">
    <div class="breadcrumbs" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="/hospital/index.php/teleecho/patient">กลับไปหน้าจัดกาคนไข้</a>
            </li>
            <li class="active"><?= Html::encode($this->title = $model->name) ?></li>
        </ul><!-- /.breadcrumb -->
        <!-- /section:basics/content.searchbox -->
    </div>
    <div class="box-body">
        <div class="row">
            <div class="col-md-12">
                <div class="patient-view">

                    <h1><?= Html::encode($this->title = $model->name) ?></h1>

                    <p>
                     <!--   <?/*= Html::a('Update', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) */?>
                        --><?/*= Html::a('Delete', ['delete', 'id' => $model->id], [
                            'class' => 'btn btn-danger',
                            'data' => [
                                'confirm' => 'Are you sure you want to delete this item?',
                                'method' => 'post',
                            ],
                        ]) */?>
                    </p>

                    <?= DetailView::widget([
                        'model' => $model,
                        'attributes' => [
                            'date',
                            'name',
                            'gender',
                            'age',
                            'height',
                            'weight',
                        ],
                    ]) ?>

                </div>
            </div>
        </div>
    </div>
</div>
