<?php
//echo $_SERVER['DOCUMENT_ROOT']
if(isset($_FILES['file']['name'])){
   // file name
   $filename = $_FILES['file']['name'];

   // Location
   // $location = 'uploads/'.$filename;
   $location = 'memetemplate/'.$filename;
//    $location = "/root/memetemplate/".$filename;
// $path = $_SERVER['DOCUMENT_ROOT'];

//    $location = dirname($path)."/memetemplate/".$filename;

   // file extension
   $file_extension = pathinfo($location, PATHINFO_EXTENSION);
   $file_extension = strtolower($file_extension);

   // Valid extensions
   $valid_ext = array("pdf","doc","docx","jpg","png","jpeg","JPG");

   $response = 0;
   if(in_array($file_extension,$valid_ext)){
      // Upload file
      if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
         $response = 1;
      } 
   }

   echo $response;
   exit;
}



