var student = null;
var students = []
window.addEventListener("load", function () {
   if (this.localStorage.getItem("isLoggedIn") !== "true") {
      navigateTo("index.html");
   }
   for (var i = 0; i < students.length; i++) {
      if (students[i].email == this.localStorage.getItem("userEmail")) {
         student = students[i];
         break;
      }
   }
   if (student.isExamTaken != true) {
      this.window.location.href = "../start/start.html"
   }
})
var toGradeBtn = document.getElementById("toGradeBtn")
toGradeBtn.addEventListener("click", function () {
   navigateTo("result/result.html");
})

var showUserName = document.getElementById("showUserName")
showUserName.innerText = `Times Up, ${localStorage.getItem("fullName")}`