<?php

namespace app\models;

use Yii;
use yii\data\ActiveDataProvider;
/**
 * This is the model class for table "randorm".
 *
 * @property int $id
 * @property int $randorm
 * @property string $numname
 */
class Randorm extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'randorm';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['randorm', 'numname'], 'required'],
            [['randorm'], 'integer'],
            [['numname'], 'string', 'max' => 250],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'randorm' => 'Randorm',
            'numname' => 'Numname',
        ];
    }
    public function search($params)
    {
        $data = Randorm::find();
        $this->load($params);
        $data->andFilterWhere(['like','id',$this->id]);
        $data->andFilterWhere(['like','randorm',$this->randorm]);
        return $dataProvider = new ActiveDataProvider([
            'query' => $data,
            'pagination' => [
                'pageSize' => 10,
            ]
        ]);

    }
}
