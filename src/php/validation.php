<?php

function checkFirstName($firstName, $required, $location){
  if(!$required && !isset($firstName)) return;

  $check = new stdClass();
  $check->location = $location;
  $check->param = 'firstName';
  $check->value = $firstName;

  if(!isset($firstName)){
    $check->message = 'First name is required';
    return $check;
  }

  if (empty($firstName)) {
    $check->message = 'First name cannot be empty';
    return $check;
  } 

  if (!preg_match("/^[A-Z](['-](?!['-])|[a-z])*[a-z]$/",$firstName)) {
    $check->message = 'invalid first name';
    return $check;
  }  
}

function checkLastName($lastName, $required, $location){
  if(!$required && !isset($lastName)) return;

  $check = new stdClass();
  $check->location = $location;
  $check->param = 'lastName';
  $check->value = $lastName;

  if(!isset($lastName)){
    $check->message = 'Last name is required';
    return $check;
  }

  if (empty($lastName)) {
    $check->message = 'Last name cannot be empty';
    return $check;
  } 

  if (!preg_match("/^[A-Z](['-](?!['-])|[a-z])*[a-z]$/",$lastName)) {
    $check->message = 'invalid last name';
    return $check;
  }   
}

function checkEmail($email, $required, $location){
  if(!$required && !isset($email)) return;

  $check = new stdClass();
  $check->location = $location;
  $check->param = 'email';
  $check->value = $email;

  if(!isset($email)){
    $check->message = 'Email is required';
    return $check;
  }

  if (empty($email)) {
    $check->message = 'Email cannot be empty';
    return $check;
  } 

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $check->message = 'Invalid email';
    return $check;
  }
}

function checkMessage($message, $required, $location){
  if(!$required && !isset($message)) return;

  $check = new stdClass();
  $check->location = $location;
  $check->param = 'message';
  $check->value = $message;

  if(!isset($message)){
    $check->message = 'Message is required';
    return $check;
  }

  if (empty($message)) {
    $check->message = 'Message cannot be empty';
    return $check;
  } 
}