<?php

use yii\bootstrap\ActiveForm;
use yii\helpers\Html;
$this->title = "Login";

?>
<?php $form = ActiveForm::begin(); ?>
    <h3><?php $this->title?></h3>

    <div class="form-group">
        <?= Html::label("username:") ?>
        <?= Html::textInput("username","",['required'=>'required'])?>
    </div>
    <div class="form-group">
        <?= Html::label("Password:") ?>
        <?= Html::passwordInput("password","",['required'=>'required'])?>
    </div>
    <div class="form-group">
        <?= Html::submitButton("Login",['class' => 'btn btn-primary']) ?>
    </div>

<?php ActiveForm::end(); ?>
