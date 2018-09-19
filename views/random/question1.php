<?php
$this->title = '';
/**
 * Created by PhpStorm.
 * User: watcharaphan
 * Date: 17/9/2018 AD
 * Time: 17:00
 */
?>
<div class="box box-danger">
    <div class="breadcrumbs" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="fa fa-question" aria-hidden="true"></i>
                <a>คำถามที่ 1</a>
            </li>
            <li class="active"></li>
        </ul><!-- /.breadcrumb -->
        <!-- /section:basics/content.searchbox -->
    </div>
    <div class="box-body">
        <div class="row">

            <div class="col-md-12">
                <div class="nav-tabs-custom">
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#Experience" data-toggle="tab">ฐานข้อมูล</a></li>
                        <li><a href="#Education" data-toggle="tab">ข้อเสนอเครื่องมือ</a></li>
                    </ul>
                    <div class="tab-content col-lg-12">

                        <div class="active tab-pane" id="Experience">
                            <div class="col-md-12">
                                <div class="tab-content">
                                    <div class="col-lg-12">
                                        <center><B class="col-lg-12" style="font-size: 20px">ฐานข้อมูล</B></center>
                                        <center><img src=<?php echo Yii::$app->request->baseUrl . '/upload/ERRR.png' ?>></center>

                                        <hr>
                                        <center><B>(Data Dictionary)</B></center>
                                        <div class="container">
                                            <h2>Table users</h2>
                                            <p>เก็บข้อมูลสมาชิก</p>
                                            <table class="table">
                                                <thead>
                                                <tr>
                                                    <th>Attribute</th>
                                                    <th>Data type</th>
                                                    <th>Description</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>id</td>
                                                    <td>INT(11)</td>
                                                    <td>ใช้เก็บ id ของuserโดยการเพิ่มแบบ auto เพื่อเป็น PRIMARY KEY</td>
                                                </tr>
                                                <tr>
                                                    <td>name</td>
                                                    <td>varvhar(255)</td>
                                                    <td>เก็บข้อมูลชื่อของผู้ใช้</td>
                                                </tr>
                                                <tr>
                                                    <td>username</td>
                                                    <td>varvhar(255)</td>
                                                    <td>ใช้เก็บข้อมูลเพื่อlogin</td>
                                                </tr>
                                                <tr>
                                                    <td>password</td>
                                                    <td>int(11)</td>
                                                    <td>ใช้เก็บรหัสผ่านเพื่อlogin</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <hr>
                                        <div class="container">
                                            <h2>Table products</h2>
                                            <p>เก็บข้อมูลสินค้าที่ต้องการรีวิว</p>
                                            <table class="table">
                                                <thead>
                                                <tr>
                                                    <th>Attribute</th>
                                                    <th>Data type</th>
                                                    <th>Description</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>id</td>
                                                    <td>INT(11)</td>
                                                    <td>ใช้เก็บ id ของproductsโดยการเพิ่มแบบ auto เพื่อเป็น PRIMARY KEY</td>
                                                </tr>
                                                <tr>
                                                    <td>name</td>
                                                    <td>text(500)</td>
                                                    <td>เก็บรายละเอียดการรีวิวของสินค้าเช่นชื้อหรือบทความแนะนำสินค้า</td>
                                                </tr>
                                                <tr>
                                                    <td>img_product</td>
                                                    <td>varvhar(255)</td>
                                                    <td>ใช้เก็บข้อมูลรูปภาพของสินค้า</td>
                                                </tr>
                                                <tr>
                                                    <td>create_datitame</td>
                                                    <td>datetime</td>
                                                    <td>ใช้เก็บวันและเวลาในการสร้าง</td>
                                                </tr>
                                                <tr>
                                                    <td>update_datetime</td>
                                                    <td>datetime</td>
                                                    <td>ใช้เก็บวันและเวลาในการแก้ไข</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <hr>
                                        <div class="container">
                                            <h2>Table comments</h2>
                                            <p>เก็บข้อมูล ความคิดเห็น</p>
                                            <table class="table">
                                                <thead>
                                                <tr>
                                                    <th>Attribute</th>
                                                    <th>Data type</th>
                                                    <th>Description</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>id</td>
                                                    <td>INT(11)</td>
                                                    <td>ใช้เก็บ id ของcommentsโดยการเพิ่มแบบ auto เพื่อเป็น PRIMARY KEY</td>
                                                </tr>
                                                <tr>
                                                    <td>comments</td>
                                                    <td>text(500)</td>
                                                    <td>ใช้เก็บข้อความแสดงความคิดเห็น</td>
                                                </tr>
                                                <tr>
                                                    <td>users_id</td>
                                                    <td>INT(11)</td>
                                                    <td>เก็บ id ของ user</td>
                                                </tr>
                                                <tr>
                                                    <td>products_id</td>
                                                    <td>INT(11)</td>
                                                    <td>เก็บ id ของ product</td>
                                                </tr>
                                                <tr>
                                                    <td>create_datitame</td>
                                                    <td>datetime</td>
                                                    <td>ใช้เก็บวันและเวลาในการสร้าง</td>
                                                </tr>
                                                <tr>
                                                    <td>update_datetime</td>
                                                    <td>datetime</td>
                                                    <td>ใช้เก็บวันและเวลาในการแก้ไข</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>

                        <div class="tab-pane" id="Education">
                           <div class="col-lg-12">
                               <B class="col-lg-2">ใช้</B> <p class="col-lg-10">PHP , JS , CSS , Bootstrap , Html </p>
                               <B class="col-lg-2">framework</B> <p class="col-lg-10">Yii2 framework </p>
                               <B class="col-lg-2"></B> <p class="col-lg-10">ใช้กาพัฒนาแบบเป็น modules เพื่อจะได้ต่อยอดได้ </p>
                               <B class="col-lg-2">ฐานข้อมูลที่ใช้</B> <p class="col-lg-10">my SQL</p>
                           </div>

                        </div>


                    </div>

                </div>

            </div>

        </div>
    </div>
</div>
