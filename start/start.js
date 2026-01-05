window.addEventListener("load", function () {
    if (this.localStorage.getItem("isLoggedIn") !== "true") {
        navigateTo("index.html");
    }
})



var signoutBtn = document.getElementById("signoutBtn")
signoutBtn.addEventListener("click", function () {
    console.log("hi")
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("fullName")

    navigateTo("index.html");
})

var students = JSON.parse(localStorage.getItem("allStudents")) || [];
var student = null
for (var i = 0; i < students.length; i++) {
    if (students[i].email == this.localStorage.getItem("userEmail")) {
        student = students[i];
        break;
    }
}

var startExamBtn = document.getElementById("startExamBtn")
startExamBtn.addEventListener("click", function () {
    student.isExamTaken = true;
    localStorage.setItem("examInProgress", "true")
    navigateTo("exam/exam.html");
})

