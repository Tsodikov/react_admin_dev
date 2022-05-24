<?php
$deletedFile = "../../kshcamf23n3i632.html";
if (file_exists($deletedFile)) {
    unlink($deletedFile);
} else {
    header("HTTP/1.0 400 Bad Request");
}