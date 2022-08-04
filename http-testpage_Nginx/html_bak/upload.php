<!DOCTYPE html>
<html>
<body>

<form action="upload.php" method="post" enctype="multipart/form-data">
    Select file to upload:
    <input type="file" name="fileToUpload" id="fileToUpload">
    <input type="submit" value="Upload File" name="submit">
    <input type="checkbox" value="true" name="storeFile">Store uploaded file
</form>

</body>
</html>

<?php
// https://www.w3schools.com/php/php_file_upload.asp
if(isset($_POST["submit"])) {
  $upload_file_info = $_FILES["fileToUpload"];
  if ($upload_file_info["size"] <= 0) {
    echo "Sorry, the file is empty.";
    exit;
  }
  if ($upload_file_info["error"] != UPLOAD_ERR_OK) {
    echo "Sorry, there was an error uploading your file.";
    print_r($upload_file_info);
    exit;
  }

  $target_dir = "uploads/";
  $target_file = $target_dir . basename($upload_file_info["name"]);
  if ($_POST["storeFile"] != "true") {
    echo "The file ". basename($upload_file_info["name"]). " (size=" . $upload_file_info["size"]. ") has been uploaded successfully, but discarded.";
  } else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
      echo "The file ". basename($upload_file_info["name"]). " (size=" . $upload_file_info["size"]. ")  has been uploaded and stored successfully in ". $_SERVER['DOCUMENT_ROOT'] . "/" . $target_file;
    } else {
      echo "Sorry, there was an error storing your file.";
    }
  }
}
