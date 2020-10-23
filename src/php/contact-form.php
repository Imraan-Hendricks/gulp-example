<?php

require 'utils.php'; 
require 'validation.php'; 

function validation($body){
  $firstNameRes = checkFirstName($body->firstName, true, 'body');
  $lastNameRes = checkLastName($body->lastName, true, 'body');
  $emailRes = checkEmail($body->email, true, 'body');
  $messageRes = checkMessage($body->message, true, 'body');

  $valRes = array();

  if($firstNameRes) array_push($valRes, $firstNameRes);
  if($lastNameRes) array_push($valRes, $lastNameRes);
  if($emailRes) array_push($valRes, $emailRes);
  if($messageRes) array_push($valRes, $messageRes);

  if(count($valRes) > 0){
    $res = new stdClass();
    $res->success = false;
    $res->err = $valRes;
    return $res;
  }
}

function main() {
  $err = checkRequestMethod("POST");
  if($err) return $err;

  $err = checkContentType("application/json");
  if($err) return $err;

  $body = json_decode(file_get_contents('php://input'));
  
  $valRes = validation($body);
  if($valRes) return $valRes;
   
  $fullName = $body->firstName." ".$body->lastName;
  $from = $body->email;
  $to = "hndx07@yahoo.com";
  $subject = "This is the email subject";
  $message = "<p>".$body->message."</p>";
  $replyTo = $body->email;

  return sendMail($fullName, $from, $to, $subject, $message, $replyTo);
}

echo json_encode(main());