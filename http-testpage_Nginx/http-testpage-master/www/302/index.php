<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
	<title>302重定向测试页面——首页</title>
</head>
<body>

<a href="#">
<img src="logo">
</a>
<p>
<?php
foreach ($_SERVER as $key => $value) {
	echo '$_SERVER: ' . $key . "=" . $value . "</BR>\n";
}
?>
</p>
<p>
<?php
foreach ($_REQUEST as $key => $value) {
	echo '$_REQUEST: ' . $key . "=" . $value . "</BR>\n";
}
?>
</p>
<p>
<?php
foreach ($_ENV as $key => $value) {
	echo '$_ENV: ' . $key . "=" . $value . "</BR>\n";
}
?>
</p>
<p>
点击<a href='302_relative.php'>下一步</a>开始相对地址重定向至：relative.php
</p>
</body>
</html>
