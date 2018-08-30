<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "file".
 *
 * @property int $id
 * @property int $id_patient
 * @property string $name
 * @property string $date
 * @property int $type
 * @property int $id_doctor
 */
class File extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'file';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id_patient', 'name', 'date', 'type', 'id_doctor'], 'required'],
            [['id_patient', 'type', 'id_doctor'], 'integer'],
            [['date'], 'safe'],
            [['name'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'id_patient' => 'Id Patient',
            'name' => 'Name',
            'date' => 'Date',
            'type' => 'Type',
            'id_doctor' => 'Id Doctor',
        ];
    }
}
