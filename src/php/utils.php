<?php

function checkRequestMethod($method){
  if ($_SERVER["REQUEST_METHOD"] == $method) return;

  $res = new stdClass();
  $res->err[0] = new stdClass();
  $res->success = false;
  $res->err[0]->location = 'request';
  $res->err[0]->param = 'general';
  $res->err[0]->message = 'Invalid request method';
  $res->err[0]->value = '';

  return $res;
}

function checkContentType($cType){
  $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
  if ($contentType === $cType) return;

  $res = new stdClass();
  $res->err[0] = new stdClass();
  $res->success = false;
  $res->err[0]->location = 'request';
  $res->err[0]->param = 'general';
  $res->err[0]->message = 'Invalid content type';
  $res->err[0]->value = '';

  return $res;
}

function checkRequest($method, $contentType){
  $err = checkRequestMethod($method);
  if($err) return $err;

  $err = checkContentType($contentType);
  if($err) return $err;
}

function sendMail($fullName, $from, $to, $subject, $message, $replyTo){
  $headers = "From:"." ".$fullName." ".$from."\r\n";
  $headers .= "Reply-To:"." ".$replyTo."\r\n";
  $headers .= "Content-Type: text/html\r\n";

  /*
  $send_email = mail($to, $subject, $message, $headers);

  if(!$send_email){
    $res = new stdClass();
    $res->err[0] = new stdClass();
    $res->success = false;
    $res->err[0]->location = "mail";
    $res->err[0]->param = "general";
    $res->err[0]->message = "An error has occured. Please try again.";
    $res->err[0]->value = "";
    
    return $res;
  }
  */

  $res = new stdClass();
  $res->data = new stdClass();
  $res->success = true;
  $res->data->fullName = $fullName;
  $res->data->from = $from;
  $res->data->to = $to;
  $res->data->subject = $subject;
  $res->data->message = $message;
  $res->data->replyTo = $replyTo;
  $res->data->headers = $headers;
  
  return $res;
}