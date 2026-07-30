<?php
session_start();

$errors=[
        'login' => $_SESSION['login_error'] ?? '',
        'Register' =>$_SESSION['register_error'] ?? ''
];

$activeForm=$_SESSION['active_form'] ?? 'login';
session_unset();

function showError($error): string
{
  return !empty($error) ? "<p class='error-message'>$error</p> "  : '' ;
}

function isActiveForm($formName,$activeForm): string
{
return $formName === $activeForm ? 'active' : '';
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>login </title>
  <link rel="stylesheet" href="login.css">
</head>
<body>
    <div class="container">
        <div class="form-box  <?= isActiveForm('login',$activeForm); ?>" id="login-form">
          <form action="login_register.php" method="post">
            <h2 class="login-label">Login to StockIT</h2>
            <?= showError($errors['login']); ?>
            <input type="email" name="email" placeholder="EMAIL" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit" name="login"> Login></button>
            <p class="dont-have-acc">Don't have an account? <a class="register-link" href="#" onclick="showForm('Register-form');">Register</a></p>
          </form>


        </div>
      <div class="form-box  <?= isActiveForm('Register',$activeForm); ?> " id="Register-form">
        <form action="login_register.php"  method="post">
          <h2 class="register-label">Register to StockIT</h2>
          <?= showError($errors['Register']); ?>
          <input type="text" name="name" placeholder="Name" required>
          <input type="email" name="email" placeholder="Email" required>
          <input type="password" name="password" placeholder="Password" required>
          <select name="role" required>
            <option value="">--select role</option>
            <option value="user">user</option>
            <option value="admin"> admin</option>
          </select>
          <button type="submit" name="Register"> Register</button>
          <p class="have-acc">Already have an account? <a class="login-link" href="#" onclick="showForm('login-form') ;">Login</a></p>
        </form>

      </div>


    </div>

<script src="login.js">

</script>
</body>
</html>