<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $meeting_date = $_POST['meeting_date'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    // Services checkboxes
    $services_selected = "No services selected";
    if (!empty($_POST['services']) && is_array($_POST['services'])) {
        $services_selected = implode(", ", $_POST['services']);
    }

    $to = "info@stirlingssecurityservices.co.uk"; // RECEIVER
    $subject = "New Meeting Request Submission";

    // Email body
    $body = "New Meeting Request\n\n";
    $body .= "Meeting Date: $meeting_date\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n\n";
    $body .= "Services Interested: $services_selected\n\n";
    $body .= "Message:\n$message\n";

    // IMPORTANT FOR GODADDY
    $headers = "From: info@stirlingssecurityservices.co.uk\r\n";  
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "error sending mail";
    }
}
?>
