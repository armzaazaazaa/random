<?php

namespace app\controllers;

use app\models\Doctor;
use app\models\Symtom;
use Yii;
use app\models\Patient;
use app\models\PatientSearch;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

/**
 * TeleechoController implements the CRUD actions for Patient model.
 */
class TeleechoController extends Controller
{
    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['POST'],
                ],
            ],
        ];
    }

    /**
     * Lists all Patient models.
     * @return mixed
     */
    public function actionIndex()
    {
        $searchModel = new PatientSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Patient model.
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }

    /**
     * Creates a new Patient model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        $model = new Patient();

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id]);
        }

        return $this->render('create', [
            'model' => $model,
        ]);
    }

    /**
     * Updates an existing Patient model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id]);
        }

        return $this->render('update', [
            'model' => $model,
        ]);
    }

    /**
     * Deletes an existing Patient model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionDelete($id)
    {
        $this->findModel($id)->delete();

        return $this->redirect(['patient']);
    }

    /**
     * Finds the Patient model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $id
     * @return Patient the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Patient::findOne($id)) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }
    //////////////////////////////////////อาการ ////////////////////////////////////////////////////////////
    public function actionSymptom()
    {
        $modelpatient = Patient ::find()->asArray()->all();
        $modeldocter =  Doctor ::find()->asArray()->all();
        $showsymtom = new Symtom();
        $showsymtomsee = $showsymtom->search(\Yii::$app->request->queryParams);

        return $this->render('symptom',[
        'showsymtom' => $showsymtom,
         'showsymtomsee' => $showsymtomsee,
         'modelpatient' => $modelpatient,
         'modeldocter'=>$modeldocter

        ]);
    }
    public function actionSavesymptom()
    {
        if (Yii::$app->request->isAjax) {
            $post = Yii::$app->request->post();
//             print_r($post);
//             exit();


            if ($post['hide_activityedit_symptom'] != '') {
                $model = Symtom::findOne(['id' => $post['hide_activityedit_symptom']]);
                $model->id_doctor = 1;
                $model->id_send = $post['id_send'];
                $model->id_patient = $post['id_patient'];;
                $model->id_file = 1;   //$post['height'];
                $model->pasthistory = 'dd'; //$post['height']; // ประวัติที่ผ่านมา
                $model->preentillness = 'ff';  //$post['height']; // ผู้ป่วยปัจจุบัน
                $model->lab	 = $post['lad'];
                $model->ekg	 = 'ekg';//$post['weight'];
                $model->diagnosis = $post['diagnosis'];
                $model->plan = $post['pan'];
                $model->comment = $post['comment'];

                $model->save();
                if ($model->save() !== false) {
                    echo true;
                } else {
                    $errors = $model->errors;
                    echo "model can't validater <pre>";
                    print_r($errors);
                    echo "</pre>";
                }
            } else {
                $model = new Symtom();
                $model->id_doctor = 1;
                $model->id_send = $post['id_send'];
                $model->id_patient = $post['id_patient'];;
                $model->id_file = 1;   //$post['height'];
                $model->pasthistory = 'dd'; //$post['height']; // ประวัติที่ผ่านมา
                $model->preentillness = 'ff';  //$post['height']; // ผู้ป่วยปัจจุบัน
                $model->lab	 = $post['lad'];
                $model->ekg	 = 'ekg';//$post['weight'];
                $model->diagnosis = $post['diagnosis'];
                $model->plan = $post['pan'];
                $model->comment = $post['comment'];

                $model->date = date('Y-m-d ');

                $model->save();
                //   self::printobj($model);
                if ($model->save() !== false) {
                    echo true;
                } else {
                    $errors = $model->errors;
                    echo "model can't validater <pre>";
                    print_r($errors);
                    echo "</pre>";
                }
            }
        }
    }




    //////////////////////////////////////อาการ ////////////////////////////////////////////////////////////










    public function actionShowresults()
    {
        return $this->render('results');
    }


    //////////////////////////////////////ประวัติคนไข้ ////////////////////////////////////////////////////////////

    public function actionPatient()
    {
        /*  $showsdoctor = Doctor::find()
              ->where(['firstname'])
              ->asArray()
              ->all();*/

        $showpatient = new Patient();
        $showsee = $showpatient->search(\Yii::$app->request->queryParams);

        return $this->render('patient',[
            'showpatient'=>$showpatient,
            'showsee' =>$showsee

        ]);
    }

    public function actionSavepatient()
    {
        if (Yii::$app->request->isAjax) {
            $post = Yii::$app->request->post();
            /* print_r($post);
             exit();*/


            if ($post['hide_activityedit_patient'] != '') {
                $model = Patient::findOne(['id' => $post['hide_activityedit_patient']]);
                $model->name = $post['name'];
                $model->gender = $post['gender'];
                $model->age = $post['age'];;
                $model->height = $post['height'];;
                $model->weight = $post['weight'];
                $model->id_doctor = $post['id_doctor'];
                $model->date = date('Y-m-d ');

                $model->save();
                if ($model->save() !== false) {
                    echo true;
                } else {
                    $errors = $model->errors;
                    echo "model can't validater <pre>";
                    print_r($errors);
                    echo "</pre>";
                }
            } else {
                $model = new Patient();
                $model->name = $post['name'];
                $model->gender = $post['gender'];
                $model->age = $post['age'];;
                $model->height = $post['height'];;
                $model->weight = $post['weight'];
                $model->id_doctor = $post['id_doctor'];
                $model->date = date('Y-m-d ');

                $model->save();
                //   self::printobj($model);
                if ($model->save() !== false) {
                    echo true;
                } else {
                    $errors = $model->errors;
                    echo "model can't validater <pre>";
                    print_r($errors);
                    echo "</pre>";
                }
            }
        }
    }

    public function actionUpdatepatient()
    {
        if (Yii::$app->request->isAjax) {
            $id = Yii::$app->request->post('id');
            if (($model = Patient::findOne(['id' => $id])) !== null) {
                \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
                return $model;
            } else {
                throw new NotFoundHttpException('The requested page does not exist.');
            }
        }
    }

    public function actionDeletepatient()
    {
        if (Yii::$app->request->isAjax) {
            $post = Yii::$app->request->post();
           print_r($post);
           exit();
        }
    }

    public function actionLogin()
    {

            $postValue = Yii::$app->request->get();

            print_r($postValue);
            exit();

    }

}
