<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "vishnuprakash9597@gmail.com"; // 🔹 Replace with your email
    $subject = "New Meeting Request";

    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $date = htmlspecialchars($_POST["date"]);
    $message = htmlspecialchars($_POST["message"]);
    $services = isset($_POST["services"]) ? implode(", ", $_POST["services"]) : "Not specified";

    $body = "
    Meeting Request Details:\n
    ---------------------------\n
    Name: $name\n
    Email: $email\n
    Phone: $phone\n
    Date & Time: $date\n
    Services Interested: $services\n
    Message: $message
    ";

    $headers = "From: $email\r\nReply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Thank you! Your meeting request has been sent successfully.'); window.location.href='meeting-booking.html';</script>";
    } else {
        echo "<script>alert('Sorry, something went wrong. Please try again.'); window.history.back();</script>";
    }
}
?>
