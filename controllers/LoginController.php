<?php

namespace app\controllers;

use app\models\Doctor;

class LoginController extends \yii\web\Controller
{
    public function actionIndex()
    {
        if(!empty($_POST)){
            $username = $_POST['username'];
            $password = $_POST['password'];
        }
        $model = Doctor::find()

            ->where([
                'username' => $username,
                'password' => $password,


            ])
            ->asArray()
            ->all();

       if(!empty($model)){
           \Yii::$app->session['Login'] = $model;
           $this->redirect(['hospital']);
       }else{
           return $this->redirect(['index']);
       }

        return $this->render('index');
    }

}
