<?php



$this->title = '';
//$this->baseUrl(Yii::$app->request->baseUrl . '/js/aeedy.js?t=' . time(), ['depends' => [\yii\web\JqueryAsset::className()]]);  //edit  here  ?t='. time()   --re

//print_r($this->baseUrl);
/*echo 'baseUrl = >'.Yii::$app->request->baseUrl . '/js/aeedy.js?t=' . time(), ['depends' => [\yii\web\JqueryAsset::className()]];  //edit  here  ?t='. time()   --re;
echo '<br>';
echo 'absoluteUrl = >'.Yii::$app->request->absoluteUrl;
echo '<br>';
echo 'scriptUrl = >'.Yii::$app->request->scriptUrl;
echo '<br>';
echo 'url = >'.Yii::$app->request->url;
echo '<br>';
echo 'getBaseUrl = >'.Yii::$app->request->getBaseUrl();
echo '<br>';
echo Yii::$app->basePath;
echo '<br>';*/
/*echo \Yii::getAlias('@webroot');*/
use \app\models\Hptpatient;

$this->registerJsFile(Yii::$app->request->baseUrl . '/js/aeedy.js?t='. time(), ['depends' => [\yii\web\JqueryAsset::className()]]);
\app\assetsxx\AppAsset::register($this);

echo '<pre>';
print_r($d);
echo  '</pre>';


?>
<style type="text/css">
    body {
        background-color: #444540;
        background-size: cover;
    }

</style>

<div>
<!--    <img src="--><?php //echo Yii::$app->request->baseUrl . '/upload/' . '1528454762317.jpg'; ?><!--"-->
<!--         style="margin:auto; display:block; text-align:center;"-->
<!--         width="600" HEIGHT="600" >-->
</div>
