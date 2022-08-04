<?php
header("Transfer-Encoding: chunked");
@apache_setenv('no-gzip', 1);
@ini_set('zlib.output_compression', 0);
@ini_set('implicit_flush', 1);
for ($i = 0; $i < ob_get_level(); $i++) {
	ob_end_flush();
}
ob_implicit_flush(1);
flush();

function dump_chunk($chunk)
{
	printf("%x\r\n%s\r\n", strlen($chunk), $chunk);
	flush();
}

$bs = 1024;
if (array_key_exists($_REQUEST, "bs")) {
	$bs = intval($_REQUEST["bs"]);
	if ($bs < 1) {
		$bs = 1;
	}
}

$count = 1000;
if (array_key_exists($_REQUEST, "count")) {
	$count = intval($_REQUEST["count"]);
	if ($count < 1) {
		$count = 1;
	}
}

$f = fopen('/dev/urandom', 'r');
$data = base64_encode(fread($f, $bs));
fclose($f);
for ($i = 0; $i < $count; $i++) {
	dump_chunk($data);
}

printf("00\r\n\r\n");
