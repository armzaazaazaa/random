<?php
/**
 * Created by PhpStorm.
 * User: watcharaphan
 * Date: 17/9/2018 AD
 * Time: 12:07
 */
$this->title = '';
?>

<div class="col-md-3">

    <!-- Profile Image -->
    <div class="box box-primary">
        <div class="box-body box-profile">
            <img class="profile-user-img img-responsive img-circle"
                 src=<?php echo Yii::$app->request->baseUrl . '/upload/1560100306369.png' ?> alt="User profile picture">

            <h3 class="profile-username text-center">Watcharapahn Phaddee</h3>

            <p class="text-muted text-center">PHP developer</p>

            <ul class="list-group list-group-unbordered">
                <li class="list-group-item">
                    <b>ชื่อ</b>
                    <p class="pull-right">วัชรพันธ์</p>
                </li>
                <li class="list-group-item">
                    <b>นามสกุล</b>
                    <p class="pull-right">ผัดดี</p>
                </li>
                <li class="list-group-item">
                    <b>ชื่อเล่น</b>
                    <p class="pull-right">อาร์ม</p>
                </li>
            </ul>

            <a href="#" class="btn btn-primary btn-block"><i class="fa  fa-phone-square"></i> <b>083-4713795</b></a>
        </div>
        <!-- /.box-body -->
    </div>
    <!-- /.box -->

    <!-- About Me Box -->
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">About Me</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
            <strong><i class="fa fa-book margin-r-5"></i> E-mail</strong>
            <br>
            <a class="text-muted" href="https://plus.google.com/u/0/110775948160904373600">
                armzaazaazaa01@gmail.com
            </a>

            <hr>
            <strong><i class="fa fa-facebook-square" aria-hidden="true"></i></strong>
            <br>
            <a class="text-muted" href="https://plus.google.com/u/0/110775948160904373600">
                armzaazaazaa01@gmail.com
            </a>

            <hr>

            <strong><i class="fa fa-map-marker margin-r-5"></i></strong>

            <p class="text-muted">236 หมู่ 6 ตำบล จำป่าหวาย อำเภอ เมือง จังหวัดพะเยา</p>

            <hr>

            <strong><i class="fa fa-pencil margin-r-5"></i> Skills</strong>

            <p>
                <span class="label label-success">PHP yii2 framework</span>
                <span class="label label-info">Javascript</span>
                <span class="label label-warning">PHP</span>
                <span class="label label-primary">MySQL</span>
            </p>

            <hr>


        </div>
        <!-- /.box-body -->
    </div>
    <!-- /.box -->
</div>
<!-- /.col -->
<div class="col-md-9">
    <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
            <li class="active"><a href="#Experience" data-toggle="tab">Work Experience</a></li>
            <li><a href="#Education" data-toggle="tab">Education</a></li>
        </ul>
        <div class="tab-content col-lg-12">
            <div class="active tab-pane" id="Experience">
                <!-- Post -->
                <div class="post col-lg-12">
                    <div class="user-block">
                        <img class="img-circle img-bordered-sm"
                             src=<?php echo Yii::$app->request->baseUrl . '/upload/3560500575223.png' ?>  alt="user
                             image">
                        <span class="username">
                          <a href="#">Hornbill Solution co.,lte</a>

                        </span>
                        <span class="description">February 2018 - present</span>
                    </div>

                </div>


                <div class="col-lg-12">
                    <B class="col-lg-2">
                        Work
                    </B>
                    <p class="col-lg-5"> Developer system EasyHR </p>
                    <p class="col-lg-5"><i class="fa fa-code" aria-hidden="true"></i>
                        Yii2 framework , JS , CSS , Bootstrap , Html , MySql
                    </p>

                    <p class="col-lg-2">

                    </p>
                    <p class="col-lg-5"> Design Festival</p>
                    <p class="col-lg-5"><i class="fa fa-code" aria-hidden="true"></i>
                        Angular , material themes , canvas , Html5
                    </p>

                    <p class="col-lg-2">

                    </p>
                    <p class="col-lg-5"> BayDashboard</p>
                    <p class="col-lg-5"><i class="fa fa-code" aria-hidden="true"></i>
                        Angular , canvas , Html5
                    </p>
                    <B class="col-lg-2">
                        Tool
                    </B>
                    <p class="col-lg-10"> PhpStorm , Visual Studio Code , xampp </p>

                    <B class="col-lg-2">
                        Commputer
                    </B>
                    <p class="col-lg-5"> Mac pro 15 year 2013 </p>
                    <p class="col-lg-5">
                    </p>


                </div>

            </div>

            <div class="tab-pane" id="Education">
                <div class=" col-lg-12">
                    <div class="post col-lg-12">
                        <div class="user-block">
                            <img class="img-circle img-bordered-sm"
                                 src=<?php echo Yii::$app->request->baseUrl . '/upload/UP.png' ?>  alt="user
                                 image">
                            <span class="username">
                          <a href="#">University of Phayao</a>
                        </span>
                            <span class="description">2013 - 2017</span>
                        </div>

                    </div>
                    <hr>
                    <div class="post col-lg-12">
                        <B class="col-lg-2">
                            Faculty
                        </B>
                        <p class="col-lg-10"> Information and communication  </p>


                        <B class="col-lg-2">
                            Branch
                        </B>
                        <p class="col-lg-10"> Software Engineering </p>

                        <p class="col-lg-2">

                    </div>
                </div>

                <div class=" col-lg-12">
                    <div class="post col-lg-12">
                        <div class="user-block">
                            <img class="img-circle img-bordered-sm"
                                 src=<?php echo Yii::$app->request->baseUrl . '/upload/logodmr-150x150.jpg' ?>  alt="user
                                 image">
                            <span class="username">
                          <a href="#">โรงเรียน ธรรมราชศึกษา(วัดพระสิงห์ เชียงใหม่)</a>
                        </span>
                            <span class="description">2008 - 2012</span>
                        </div>

                    </div>
                    <hr>
                    <div class="post col-lg-12">
                        <B class="col-lg-2">
                            สาย
                        </B>
                        <p class="col-lg-10"> วิทย์ - คณิต  </p>


                    </div>
                </div>

            </div>




        </div>

    </div>

</div>

</div>
