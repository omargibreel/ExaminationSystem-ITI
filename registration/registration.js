var signupForm = document.querySelector("form");
var fName = document.querySelector("#fName");
var lName = document.querySelector("#lName");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
var rePassword = document.querySelector("#re-password");
var submitBtn = document.querySelector("#submitBtn");

var students = JSON.parse(localStorage.getItem("allStudents")) || [];
var selectedInputs = document.querySelectorAll("input");

window.addEventListener("load", function () {
    if (localStorage.getItem("isLoggedIn") === "true") {
        navigateTo("start/start.html");
    }
})

for (var i = 0; i < selectedInputs.length; i++) {
    selectedInputs[i].addEventListener("input", function (e) {
        validateInput(e.target.id, e.target.value);
        checkFormValidity();
    });
}

signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (submitBtn.disabled) return;

    for (var i = 0; i < students.length; i++) {
        if (students[i].email.toLowerCase() === email.value.toLowerCase()) {
            var alertEl = document.getElementById("email-alert");
            alertEl.textContent = "This email is already registered.";
            alertEl.classList.remove("hidden");
            email.classList.replace("border-gray-300", "border-red-500");
            return;
        }
    }

    var allValid = true;
    for (var i = 0; i < selectedInputs.length; i++) {
        var input = selectedInputs[i];
        var valid = validateInput(input.id, input.value);
        if (!valid) {
            allValid = false;
        }
    }

    if (!allValid) return;

    var student = {
        fName: fName.value,
        lName: lName.value,
        email: email.value,
        password: password.value,
        isExamTaken: false,
        isExamFinished: false,
        isTimeOut: false,
        grade: null
    };

    students.push(student);
    localStorage.setItem("allStudents", JSON.stringify(students));

    console.log(student);

    signupForm.reset();
    submitBtn.disabled = true;
    submitBtn.classList.add("opacity-50", "cursor-not-allowed");

    navigateTo("index.html");

});

function checkFormValidity() {
    var allValid = true;

    for (var i = 0; i < selectedInputs.length; i++) {
        var input = selectedInputs[i];
        if (!validateInput(input.id, input.value)) {
            allValid = false;
        }
    }

    if (allValid) {
        submitBtn.disabled = false;
        submitBtn.classList.remove("opacity-50", "cursor-not-allowed");
    } else {
        submitBtn.disabled = true;
        submitBtn.classList.add("opacity-50", "cursor-not-allowed");
    }
}

function validateInput(inputId, inputValue) {
    var validationRules = {
        fName: {
            regex: /^[A-Za-z]{3,}$/,
            message: "First Name must be at least 3 letters."
        },
        lName: {
            regex: /^[A-Za-z]{3,}$/,
            message: "Last Name must be at least 3 letters."
        },
        email: {
            regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Enter a valid email address."
        },
        password: {
            regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: "Password needs 8+ characters, letters, and numbers."
        }
    };

    var ele = document.getElementById(inputId);
    var alertEl = document.getElementById(inputId + "-alert");

    if (inputId === "re-password") {
        if (inputValue === password.value && inputValue !== "") {
            ele.classList.replace("border-red-500", "border-green-500");
            alertEl.classList.add("hidden");
            return true;
        } else {
            ele.classList.replace("border-gray-300", "border-red-500");
            alertEl.textContent = "Passwords do not match.";
            alertEl.classList.remove("hidden");
            return false;
        }
    }

    if (validationRules[inputId].regex.test(inputValue)) {
        ele.classList.replace("border-red-500", "border-green-500");
        alertEl.classList.add("hidden");
        return true;
    } else {
        ele.classList.replace("border-gray-300", "border-red-500");
        alertEl.textContent = validationRules[inputId].message;
        alertEl.classList.remove("hidden");
        return false;
    }
}