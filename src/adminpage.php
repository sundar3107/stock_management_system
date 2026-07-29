<?php

session_start();
if (!is_scalar($_SESSION['email'])){
    header('location: login.php');
    exit();
}
?>


<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="login.css">
    <title>Admin Page</title>
</head>
<body style="background-color: black">
<div class="box">
    <h1>Welcome,<span><?= $_SESSION['name'];?></span></h1>
    <h1>This is an <span> Admin </span>page</h1>
    <button onclick="window.location.href='logout.php' ">Logout</button>
</div>
</body>
</html>
