<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
	<title>302重定向测试页面——绝对地址重定向（根据来源Host）跳转结果</title>
</head>
<body>
<p>
点击<a href='302_by_servername.php'>下一步</a>开始进行绝对地址（根据自身ServerAddr地址）重定向至：<?php echo "http://" . $_SERVER['SERVER_ADDR'] . "/by_servername.php"; ?>
</p>
</body>
</html>