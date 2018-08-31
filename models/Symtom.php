<?php

namespace app\models;

use Yii;
use yii\db\Expression;
use yii\behaviors\AttributeBehavior;
use yii\db\ActiveRecord;
use yii\web\Session;
use yii\helpers\ArrayHelper;
use yii\data\ActiveDataProvider;
use yii\grid\GridView;

/**
 * This is the model class for table "symtom".
 *
 * @property int $id
 * @property int $id_doctor
 * @property int $id_patient
 * @property int $id_send
 * @property int $id_file
 * @property string $pasthistory
 * @property string $preentillness
 * @property string $lab
 * @property string $ekg
 * @property string $diagnosis
 * @property string $plan
 * @property string $comment
 * @property string $date
 */
class Symtom extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'symtom';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id_doctor', 'id_patient', 'id_send', 'id_file', 'pasthistory', 'preentillness', 'lab', 'ekg', 'diagnosis', 'plan', 'comment', 'date'], 'required'],
            [['id_doctor', 'id_patient', 'id_send', 'id_file'], 'integer'],
            [['pasthistory', 'preentillness', 'lab', 'ekg', 'diagnosis', 'plan', 'comment'], 'string'],
            [['date'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'id_doctor' => 'Id Doctor',
            'id_patient' => 'Id Patient',
            'id_send' => 'Id Send',
            'id_file' => 'Id File',
            'pasthistory' => 'Pasthistory',
            'preentillness' => 'Preentillness',
            'lab' => 'Lab',
            'ekg' => 'Ekg',
            'diagnosis' => 'Diagnosis',
            'plan' => 'Plan',
            'comment' => 'Comment',
            'date' => 'Date',
        ];
    }

    public function search($params,$doctorid = null)
    {


        $arrCond = [];
        if($doctorid == null || $doctorid  == 0) {  // ALL RECORD
            $arrCond = [];
        }
        else {
            $arrCond['id_doctor']  = $doctorid;
        }

        $data = Symtom::find()->where($arrCond);
        $this->load($params);
        $data->andFilterWhere(['like','id_doctor',$this->id_doctor]);
        $data->andFilterWhere(['like','id_patient',$this->id_patient]);
        return $dataProvider =  new ActiveDataProvider([
            'query' => $data,
            'pagination' => [
                'pageSize' => 20,
            ]
        ]);

    }
}
