document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("signupForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        const newUsername = document.getElementById("newUsername").value;
        const newPassword = document.getElementById("newPassword").value;

        // Store credentials in localStorage
        localStorage.setItem("username", newUsername);
        localStorage.setItem("password", newPassword);

        // Show success message and redirect
        const errorMessage = document.getElementById("error-message");
        if (errorMessage) {
            errorMessage.textContent = "Signup successful! Redirecting to login...";
            errorMessage.style.color = "green";
        }

        // Redirect after a short delay to let the user see the message
        setTimeout(function() {
            window.location.href = "login.html";
        }, 2000);
    });
});
