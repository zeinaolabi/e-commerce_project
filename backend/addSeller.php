<?php
    include('connection.php');
    require_once('headers.php');
    require_once("jwtFunc.php");

    //Check JWT token
    if(!jwtAuth()){
        return;
    }

    // initilize variables
    $username = trim($_POST['username']);
    $email = $_POST['email'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $address = $_POST['address'];
    $phoneNumber = $_POST['phoneNumber'];
    $password =hash('sha256', $_POST["password"]) ;
    $userTypeSeller = 2;

    //Check if the inputs are correct
    if(
        !isset($username) || empty($username)
        || !isset($email) || empty($email)
        || !isset($firstName) || empty($firstName)
        || !isset($lastName) || empty($lastName)
        || !isset($password) || empty($password)
    ) {
        http_response_code(400);
        echo json_encode(['Error' =>"400", "Message" => "Incomplete data"]);
        return;
    }

    // Get usernames
    $query = $mysqli->prepare("SELECT username FROM users WHERE username = ?");
    $query ->bind_param('s',$username);
    $query ->execute();
    $query ->store_result();

    //Check if username exists 
    $num_rows = $query->num_rows();
    if($num_rows != 0){
        http_response_code(400);

        echo json_encode(["error" => "400",
                            "message" =>"Username Taken"]);
        return;
    }

    // Get email 
    $query = $mysqli->prepare("SELECT * FROM users where email = ?"); // checks for email if taken
    $query ->bind_param('s',$email);
    $query->execute();
    $query ->execute();
    $query ->store_result();
    
    // Check if email exists
    $num_rows = $query->num_rows();
    if($num_rows != 0){
        http_response_code(400);

        echo json_encode(["error" => "400",
                            "message" =>"Email Taken"]);
        return;
    }

    // Insert data into db
    $query = $mysqli->prepare("INSERT INTO users (`username`, `password`, `email`, `first_name`, `last_name`, `address`, `phone_number`, `user_type_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $query ->bind_param('ssssssii',$username, $password, $email, $firstName, $lastName, $address, $phoneNumber, $userTypeSeller);
    $query ->execute(); 

    // Success response
    $response = [];
    $response["success"] = true;
    echo json_encode($response);

?>