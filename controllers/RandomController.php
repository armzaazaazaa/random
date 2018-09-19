<?php

namespace app\controllers;


use app\models\Randorm;
use Yii;
use yii\db\Expression;
use yii\web\UploadedFile;
use yii\data\ActiveDataProvider;

class RandomController extends \yii\web\Controller
{
    public function actionIndex()
    {

        $showemaster = new Randorm();
        $showemasterindex = $showemaster->search(\Yii::$app->request->queryParams);

        $ran = (mt_rand(000, 999));
        return $this->render('index', [
            'ran' => $ran,
            'showemaster' => $showemaster,
            'showemasterindex' => $showemasterindex

        ]);
    }

    public function actionResume()
    {
        return $this->render('resume');
    }

    public function actionQuestion1()
    {
        return $this->render('question1');
    }

    public function actionQuestion2()
    {
        return $this->render('question2');
    }

    public function actionAddrecord()
    {
        echo 'www';
    }

    public function actionSave()
    {
        $post = Yii::$app->request->post();
        print_r($post);

        $model = Randorm::findOne(['numname' => $post['numname']]);
      //  $model = new Randorm();
        $model->randorm = $post['randorm'];
        $model->numname = $post['numname'];
        $model->save();


    }


}
