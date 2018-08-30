<aside class="main-sidebar">

    <section class="sidebar">

        <!-- Sidebar user panel -->

        <!-- search form -->

        <!-- /.search form -->
        <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>

        <?= dmstr\widgets\Menu::widget(
            [
                'options' => ['class' => 'sidebar-menu tree' , 'data-widget'=> 'tree'],
                'items' => [
                    [ 'class'=>'fa fa-fw fa-amazon', 'label' => 'Home', 'url' => ['/teleecho']],
                    ['label' => 'About', 'url' => ['/teleecho']],
                    ['label' => 'from', 'url' => ['/teleecho/froms']],
                    Yii::$app->user->isGuest ? (
                    ['label' => 'Login', 'url' => ['/site/login']]
                    ) : (
                        '<li>'
                        . Html::beginForm(['/site/logout'], 'post')
                        . Html::submitButton(
                            'Logout (' . Yii::$app->user->identity->username . ')',
                            ['class' => 'btn btn-link logout']
                        )
                        . Html::endForm()
                        . '</li>'
                    )
                ],
            ]
        ) ?>

        <ul class="sidebar-menu" data-widget="tree">
            <li class="header">HEADER</li>
            <!-- Optionally, you can add icons to the links -->
            <li><a href="/hospital/index.php/teleecho"><i class="fa fa-link"></i> <span>Another Link</span></a></li>
            <li class="treeview">
                <a href="#"><i class="fa fa-fw  fa-ambulance"></i> <span>จัดการข้อมูล</span>
                    <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
                </a>
                <ul class="treeview-menu">
                    <li><a href="/hospital/index.php/teleecho/addpueblo">เพิ่มคนไข้</a></li>
                    <li><a href="/hospital/index.php/teleecho/symptom">เพิ่มผลวินิฉัย</a></li>
                    <li><a href="/hospital/index.php/teleecho/showresults">------</a></li>
                    <li><a href="/hospital/index.php/teleecho/patient">จัดการคนไข้</a></li>


                </ul>
            </li>
        </ul>

    </section>

</aside>
