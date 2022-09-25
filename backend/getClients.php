<?php
    require_once("headers.php");
    include("connection.php");

    $query = $mysqli->prepare("SELECT * FROM users WHERE user_type_id =3");
    $query->execute();
    $array = $query->get_result();

    $response = [];

    while($a = $array->fetch_assoc()){
        $response[] = $a;
    }

    $json = json_encode($response);
    echo $json;
?>