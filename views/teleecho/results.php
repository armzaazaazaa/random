<?php
/**
 * Created by PhpStorm.
 * User: watcharaphan
 * Date: 16/6/2018 AD
 * Time: 14:42
 */
$this->title = '';
?>

<div class="box box-danger">
    <div class="breadcrumbs" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="/hospital/index.php/teleecho/symptom">กลับไปหน้ากล่องจดหมาย</a>
            </li>
            <li class="active">ผลการครวจ</li>
        </ul><!-- /.breadcrumb -->
        <!-- /section:basics/content.searchbox -->
    </div>
    <div class="box-body">
        <div class="row">
            <div class="col-md-12">
                <div class="tab-content">

                    <div class="box">
                        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        ...
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body table-responsive no-padding">
                            <table class="table table-hover">
                                <tbody>
                                <tr>
                                    <th>ลำดับที่</th>
                                    <th>ผู้ส่ง</th>
                                    <th>ผู้ปวย</th>
                                    <th>Status</th>
                                    <th>จัดการ</th>
                                </tr>
                                <? for ($i = 1; $i <= 10; $i++) { ?>
                                <tr>
                                    <td><?php print($i); ?></td>
                                    <td>John Doe</td>
                                    <td>11-7-2014</td>
                                    <td><span class="label label-success">Approved</span></td>
                                    <td>
                                        <button type="button" class="btn btn-primary" data-toggle="modal"
                                                data-target="#exampleModalCenter">
                                            Launch demo modal
                                        </button>
                                    </td>
                                </tr>
                                <? }?>


                                </tbody>
                            </table>
                        </div>
                        <!-- /.box-body -->
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
