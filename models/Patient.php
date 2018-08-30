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
 * This is the model class for table "patient".
 *
 * @property int $id
 * @property string $date
 * @property string $name
 * @property string $gender
 * @property int $age
 * @property int $height
 * @property int $weight
 * @property string $id_doctor
 */
class Patient extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'patient';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['date', 'name', 'gender', 'age', 'height', 'weight', 'id_doctor'], 'required'],
            [['date'], 'safe'],
            [['age', 'height', 'weight'], 'integer'],
            [['name', 'gender', 'id_doctor'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'date' => 'Date',
            'name' => 'Name',
            'gender' => 'Gender',
            'age' => 'Age',
            'height' => 'Height',
            'weight' => 'Weight',
            'id_doctor' => 'Id Doctor',
        ];
    }
    public function search($params)
    {
        $data = Patient::find();
        $this->load($params);
        $data->andFilterWhere(['like','name',$this->name]);
        $data->andFilterWhere(['like','id_doctor',$this->id_doctor]);
        return $dataProvider = new ActiveDataProvider([
            'query' => $data,
            'pagination' => [
                'pageSize' => 20,
            ]
        ]);

    }
}
