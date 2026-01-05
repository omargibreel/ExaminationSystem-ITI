var loginForm = document.getElementById("loginForm");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var verifyAlert = document.getElementById("verify-alert");

var students = JSON.parse(localStorage.getItem("allStudents")) || [];

window.addEventListener("load", function () {
    if (localStorage.getItem("isLoggedIn") === "true") {
        navigateTo("start/start.html");
    }
})

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();


    verifyAlert.classList.add("hidden");

    var emailValue = emailInput.value;
    var passwordValue = passwordInput.value;
    var userFound = false;
    var user;

    for (var i = 0; i < students.length; i++) {
        if (students[i].email.toLowerCase() === emailValue.toLowerCase()) {
            if (students[i].password === passwordValue) {
                user = students[i]
                userFound = true;
            } else {
                verifyAlert.textContent = "Incorrect password.";
                verifyAlert.classList.remove("hidden");
            }
            break;
        }
    }

    if (!userFound) {
        var emailExists = false;
        for (var j = 0; j < students.length; j++) {
            if (students[j].email.toLowerCase() === emailValue.toLowerCase()) {
                emailExists = true;
                break;
            }
        }
        if (!emailExists) {
            verifyAlert.textContent = "Email not registered.";
            verifyAlert.classList.remove("hidden");
        }
    }

    if (userFound) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", user.email)
        localStorage.setItem("fullName", `${user.fName} ${user.lName}`)
        navigateTo("start/start.html");
    }
});
