<?php
$this->title = '';
/**
 * Created by PhpStorm.
 * User: watcharaphan
 * Date: 15/6/2018 AD
 * Time: 10:54
 */


use yii\helpers\Html;
use yii\helpers\Url;
use yii\widgets\ActiveForm;
use yii\helpers\ArrayHelper;

use app\models\Doctor;
use kartik\widgets\Select2;
use kartik\widgets\FileInput;
use kartik\date\DatePicker;

$this->registerJsFile(Yii::$app->request->baseUrl . '/js/hospital/from.js?t='. time(), ['depends' => [\yii\web\JqueryAsset::className()]]);
?>


<div class="box box-danger">
    <div class="breadcrumbs" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="#">Home</a>
            </li>
            <li class="active">ลงทะเบียน</li>
        </ul><!-- /.breadcrumb -->
        <!-- /section:basics/content.searchbox -->
    </div>
    <div class="box-body">
        <div class="row">
            <div class="col-md-12">

                <div class="tab-content">

                    <!-- /.tab-pane -->

                    <!-- /.tab-pane -->

                    <div class="tab-pane active" id="settings">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label for="inputName" class="col-sm-2 control-label">Name</label>

                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputName" placeholder="Name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputName" class="col-sm-2 control-label">Last names</label>

                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputName" placeholder="Last names">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="inputName" class="col-sm-2 control-label">Usernsme</label>

                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputName" placeholder="Usernsme">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="inputName" class="col-sm-2 control-label">password</label>

                                <div class="col-sm-10">
                                    <input  class="form-control" type="password"  id="password" placeholder="password">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="inputName" class="col-sm-2 control-label">confirm password:</label>

                                <div class="col-sm-10">
                                    <input  class="form-control" type="password" id="confirm_password"  placeholder="password">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="inputName" class="col-sm-2 control-label">email</label>

                                <div class="col-sm-10">
                                    <input type="email" class="form-control" id="inputName" placeholder="email">
                                </div>
                            </div>


                            <div class="form-group">
                                <label for="inputName" class="col-sm-2 control-label">address</label>

                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputName" placeholder="address">
                                </div>
                            </div>


                            <div class="form-group">
                                <div class="col-sm-offset-2 col-sm-10">
                                    <button type="submit" class="btn btn-danger">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!-- /.tab-pane -->
                </div>

            </div>

        </div>
    </div>
</div>