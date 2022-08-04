<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
	<title>302重定向测试页面——相对地址重定向跳转结果</title>
</head>
<body>
<p>
点击<a href='302_by_host.php'>下一步</a>开始进行绝对地址（根据来源的Host头）重定向至：<?php echo "http://" . $_SERVER['HTTP_HOST'] . "/by_host.php"; ?>
</p>
</body>
</html>