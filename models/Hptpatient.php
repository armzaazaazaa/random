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
 * This is the model class for table "hpt_patient".
 *
 * @property int $id
 * @property string $name
 * @property string $last_name
 * @property string $id_card
 */
class Hptpatient extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'hpt_patient';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id'], 'integer'],
            [['name', 'last_name', 'id_card'], 'string', 'max' => 50],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'last_name' => 'Last Name',
            'id_card' => 'Id Card',
        ];
    }

    public function search($params)
    {
        $data = Hptpatient::find() ->where('status_active <> 99 ');
        $this->load($params);
        $data->andFilterWhere(['like','id',$this->id]); //รหัสบริษัท
        $data->andFilterWhere(['like','name',$this->name]); // ชื่อเต็มบริษัท
        return $dataProvider = new ActiveDataProvider([
            'query' => $data,
            'pagination' => [
                'pageSize' => 10,
            ]
        ]);

    }
}
