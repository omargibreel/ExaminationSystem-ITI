var student = null;
var students = []
var grade = null
window.addEventListener("load", function () {
    students = JSON.parse(localStorage.getItem("allStudents")) || [];


    if (!this.localStorage.getItem("isLoggedIn")) {
        navigateTo("index.html");
    }

    for (var i = 0; i < students.length; i++) {
        if (students[i].email == this.localStorage.getItem("userEmail")) {
            student = students[i];
            break;
        }
    }


    if (student.grade == null) {
        if (student.isExamTaken == false) {
            navigateTo("start/start.html");
        }
        else {
            student.grade = 0
        }
    }

    grade = student.grade

    showGrade()
})


function showGrade() {
    var gradeHeader = document.getElementById("gradeHeader");
    var gradePercentage = (grade / 10) * 100;

    var progress = document.getElementById("radial-progress");
    function setProgress(value) {
        progress.style.setProperty("--value", value);
        progress.setAttribute("aria-valuenow", value);
    }

    setProgress(grade * 10);
    gradeHeader.innerText = gradePercentage + "%";

    document.getElementById("correctNum").innerText = `${grade}/10`;

    var userName = localStorage.getItem("fullName");
    document.getElementById("congratHeader").innerText = `Great Job, ${userName}`;

    var today = new Date();
    document.getElementById("todayDate").innerText =
        today.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });

    var correctNum = document.getElementById("correctNum")
    correctNum.innerText = `${grade}/10`
}

var backToStartBtn = document.getElementById("backToStartBtn")
backToStartBtn.addEventListener("click", function () {
    navigateTo("start/start.html");
})

var signoutBtn = document.getElementById("signoutBtn")
signoutBtn.addEventListener("click", function () {
    console.log("hi")
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("fullName")

    navigateTo("index.html");
})