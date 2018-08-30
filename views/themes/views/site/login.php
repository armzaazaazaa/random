<?php
use yii\helpers\Html;
use yii\bootstrap\ActiveForm;

/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model ..\common\models\LoginForm */

$this->title = 'login';


?>

<div class="login-box">
    <div class="login-logo">
        <a href="#"><b>TELE</b>ECHO</a>
    </div>
    <img src="<?php echo Yii::$app->request->baseUrl . '/upload/' . '1528454762317.jpg'; ?>"
         style="margin:auto; display:block; text-align:center;"
         width="100" HEIGHT="100" >
    <!-- /.login-logo -->

    <div class="login-box-body">

        <p class="login-box-msg">Sign in to start your session</p>

        <?php $form = ActiveForm::begin(); ?>


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


        <!-- /.social-auth-links -->

        <a href="#">I forgot my password</a><br>
        <a href="/hospital/index.php/teleecho/froms" class="text-center">ลงทะเบียน</a>
        <a href="index" class="text-center">เข้าระบบ</a>

    </div>
    <!-- /.login-box-body -->
</div><!-- /.login-box -->
