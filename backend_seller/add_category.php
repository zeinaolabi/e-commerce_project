<?php

header ("Access-Control-Allow-Origin:*");
header ("Access-Control-Allow-Headers: *");
include ("connection.php");


$description = $_POST["description"];
$thumbnail = $_POST["thumbnail"];
$name = $_POST["name"];
$seller_id = $_POST["seller_id"];

// validate category name
if(!isset($name) || empty($name) ){ 
    http_response_code(400);
    echo json_encode([
        'error' => 400,
        'message' => 'Invalid name'
    ]);
    
    return;   
}

//validate seller_id
if(!isset($seller_id) || empty($seller_id) ){ 
    http_response_code(400);
    echo json_encode([
        'error' => 400,
        'message' => 'Invalid user id'
    ]);
    
    return;   
}

//validate category thumbnail
if(!isset($thumbnail) || empty($thumbnail) ){ 
    http_response_code(400);
    echo json_encode([
        'error' => 400,
        'message' => 'Invalid user thumbnail'
    ]);
    
    return;   
}

//validate category description
if(!isset($description) || empty($description) ){ 
    http_response_code(400);
    echo json_encode([
        'error' => 400,
        'message' => 'Invalid user description'
    ]);
    
    return;   
}


?>