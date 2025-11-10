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

















Got it 👍
You want a **matching gradient background** for this section (black + yellow theme, professional security look like in your screenshot).

Here’s a **CSS gradient** that perfectly complements your design — modern, dark, and focuses attention on the center images and glowing yellow text:

---

### 🎨 **Recommended Gradient Background**

```css
.masking-section {
  background: radial-gradient(
    circle at center,
    #1a1a1a 0%,
    #0a0a0a 40%,
    #000000 70%,
    #000000 100%
  );
  position: relative;
  overflow: hidden;
}
```

---

### ⚡ If you want a hint of yellow glow (matching the "Stringling" text):

```css
.masking-section {
  background: radial-gradient(
    circle at center,
    rgba(255, 215, 0, 0.05) 0%,
    #0a0a0a 30%,
    #000000 100%
  );
  position: relative;
  overflow: hidden;
}
```

---

### 🌈 If you prefer a more **cinematic gradient** (deep black + subtle golden tone):

```css
.masking-section {
  background: linear-gradient(
    160deg,
    #000000 0%,
    #111111 40%,
    #1a1a00 80%,
    #000000 100%
  );
}
```

---

Would you like me to make it **animated** (slow glowing gradient effect to give it a premium motion feel)?
