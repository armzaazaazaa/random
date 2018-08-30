<?php

namespace app\controllers;

use app\models\Doctor;
use app\models\Hptpatient;
use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;

class HelloController extends Controller
{
    public function actionIndex()
    {

        $arra = 'ssssss';
        $model = Hptpatient::find()
            ->asArray()
            ->all();


        return $this->render('index', [
            'd' => $model,
            'a' => $arra
        ]);
    }
    public function actionFroms()
    {

        $arra = 'ssssss';
        $model = Hptpatient::find()
            ->asArray()
            ->all();


        return $this->render('from', [
            'd' => $model,
            'a' => $arra
        ]);
    }






}