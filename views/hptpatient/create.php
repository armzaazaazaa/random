<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model app\models\Hptpatient */

$this->title = 'Create Hptpatient';
$this->params['breadcrumbs'][] = ['label' => 'Hptpatients', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="hptpatient-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
