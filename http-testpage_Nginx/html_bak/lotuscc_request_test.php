<html>

<head>
    <meta charset="utf-8">
</head>

<body>
    <p>hello, world!</p>
    <?php
    $fn = $_REQUEST["fname"];
    $ln = $_REQUEST["lname"];
    echo "First name: " . $fn  . "Last name: " . $ln . "<br>";
    ?>

</body>

</html>