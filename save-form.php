<?php

$conn = mysqli_connect("localhost", "root", "", "wmc");

if(isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["pass"])){

	$name = $_POST['name'];
	$pass = $_POST['pass'];
	$email = $_POST['email'];
    echo $name . $pass . $email;

	

	$sql = "INSERT INTO userlogin(name, pass, email) VALUES ('{$name}', '{$pass}', '{$email}')";

	if(mysqli_query($conn, $sql)){
		echo "Hello {$name} your record is saved.";
	}else{
		echo "Can't save form data.";
	}

}else{
	echo "Must filled all form fields.";
}

?>