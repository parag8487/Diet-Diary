document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const signupSuccess = urlParams.get("signup");

    if (signupSuccess === "success") {
        const errorMessage = document.getElementById("error-message");
        if (errorMessage) {
            errorMessage.textContent = "Signup successful! You can now login.";
            errorMessage.style.color = "green";
        }
    }
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Retrieve the stored credentials from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    // Check if the entered credentials match the stored credentials
    if (username === storedUsername && password === storedPassword) {
        // Redirect to the dashboard if credentials are correct
        window.location.href = "dashboard.html";
    } else {
        // Show error message if credentials are incorrect
        const errorMessage = document.getElementById("error-message");
        if (errorMessage) {
            errorMessage.textContent = "Invalid login. Please try again.";
            errorMessage.style.color = "red";
        }
    }
});
