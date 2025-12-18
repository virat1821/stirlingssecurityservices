<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $first = $_POST['first_name'];
    $last = $_POST['last_name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $message = $_POST['message'];

    $to = "info@stirlingssecurityservices.co.uk"; // your domain email
    $subject = "New Contact Form Submission";

    $body = "Contact Form Submission\n\n";
    $body .= "Full Name: $first $last\n";
    $body .= "Email: $email\n";
    $body .= "Mobile: $mobile\n\n";
    $body .= "Message:\n$message\n";

    // IMPORTANT — GoDaddy mail headers
    $headers = "From: info@stirlingssecurityservices.co.uk\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message.";
    }
}
?>
