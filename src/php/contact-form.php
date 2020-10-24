<?php

require 'utils.php'; 
require 'validation.php'; 

function validate($body){
  return getValRes(array(
    checkFirstName($body->firstName, true, 'body'),
    checkLastName($body->lastName, true, 'body'),
    checkEmail($body->email, true, 'body'),
    checkMessage($body->message, true, 'body')
  )); 
}

function send($data){
  $fullName = $data->firstName." ".$data->lastName;
  $from = $data->email;
  $to = "hndx07@yahoo.com";
  $subject = "This is the email subject";
  $message = "<p>".$data->message."</p>";
  $replyTo = $data->email;

  return sendMail($fullName, $from, $to, $subject, $message, $replyTo);
}

function main() {
  $err = checkRequest("POST", "application/json");
  if($err) return $err;

  $body = json_decode(file_get_contents('php://input'));
  
  $valRes = validate($body);
  if($valRes) return $valRes;

  return send($body);
}

echo json_encode(main());