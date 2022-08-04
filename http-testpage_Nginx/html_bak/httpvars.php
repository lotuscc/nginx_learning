<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
	<title>HTTP±äÁ¿</title>
</head>

<body>

	<?php
	echo count($_COOKIE) . " COOKIE<br/>";
	foreach (array_keys($_COOKIE) as $key) {
		echo $key . "=" . $_COOKIE[$key] . "<br/>";
	}

	echo count($_REQUEST) . " REQUEST<br/>";
	foreach (array_keys($_REQUEST) as $key) {
		echo $key . "=" . $_REQUEST[$key] . "<br/>";
	}

	echo count($_GET) . " GET<br/>";
	foreach (array_keys($_GET) as $key) {
		echo $key . "=" . $_GET[$key] . "<br/>";
	}

	echo count($_POST) . " POST<br/>";
	foreach (array_keys($_POST) as $key) {
		echo $key . "=" . $_POST[$key] . "<br/>";
	}

	echo count($_SERVER) . " SERVER<br/>";
	foreach (array_keys($_SERVER) as $key) {
		echo $key . "=" . $_SERVER[$key] . "<br/>";
	}
	?>

</body>

</html>