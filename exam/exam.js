var student = null;
var students = []
window.addEventListener("load", function () {
    students = JSON.parse(localStorage.getItem("allStudents")) || [];

    if (this.localStorage.getItem("isLoggedIn") !== "true") {
        navigateTo("index.html");
    }

    if (this.localStorage.getItem("examInProgress") !== "true") {
        navigateTo("start/start.html");
    }

    for (var i = 0; i < students.length; i++) {
        if (students[i].email == this.localStorage.getItem("userEmail")) {
            student = students[i];
            break;
        }
    }

    if (!student) {
        navigateTo("index.html");
        return;
    }

    if (student.isExamFinished == true || student.isExamTaken == true) {
        navigateTo("result/result.html");
        return
    }
    student.isExamTaken = true
    localStorage.setItem("allStudents", JSON.stringify(students));

})

window.addEventListener("unload", function () {
    if (student) {
        if (student.isExamTaken == true) {
            navigateTo("result/result.html");
        }
    }
})

var trackQuestion = 0;
var timer = document.getElementById("timer")
var minutes = 60;
var seconds = 0;
var sliderSeconds = 0;
var progress = document.getElementById("progress")
var questionTitle = document.getElementById("questionTitle")
var questionContainer = document.getElementById("questionContainer")
var choiceLabels
var choiceInputs
var navBack = document.getElementById("navBack")
var navForward = document.getElementById("navForward")
// var questionIndex = document.getElementById("questionIndex")
var markerBtn = document.getElementById("markerBtn")
var markerContainer = document.getElementById("markerContainer")
// var markedQuestions
var finishExamBtn = document.getElementById("finishExamBtn")
var markerButtons = document.querySelectorAll("#markerContainer button")
var questions = [
    ["Javascript considered ....... language", ["interpreted", "compiled", "markup", "none of the above"], "interpreted", null, 1, "Not Visited"],
    ["Which symbol is used for comments in JS?", ["//", "/* */", "#", "both // and /* */"], "both // and /* */", null, 1, "Not Visited"],
    ["Which of the following is NOT a JS data type?", ["Number", "String", "Boolean", "Character"], "Character", null, 1, "Not Visited"],
    ["What is the output of: console.log(typeof NaN); ?", ["number", "NaN", "undefined", "object"], "number", null, 1, "Not Visited"],
    ["Which method is used to add an element at the end of an array?", ["push()", "pop()", "shift()", "unshift()"], "push()", null, 1, "Not Visited"],
    ["Which keyword is used to declare a variable in ES6?", ["var", "let", "const", "all of the above"], "all of the above", null, 1, "Not Visited"],
    ["Which method converts JSON string to JS object?", ["JSON.parse()", "JSON.stringify()", "parseJSON()", "toObject()"], "JSON.parse()", null, 1, "Not Visited"],
    ["What does DOM stand for?", ["Document Object Model", "Data Object Model", "Document Oriented Model", "Digital Object Model"], "Document Object Model", null, 1, "Not Visited"],
    ["Which operator is used to compare value and type?", ["==", "=", "===", "!="], "===", null, 1, "Not Visited"],
    ["Which function is used to print something in console?", ["print()", "log()", "console.log()", "alert()"], "console.log()", null, 1, "Not Visited"]
];
for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
}

function removeSpan(button) {
    var mySpan = button.querySelector(".animate-ping");
    if (mySpan) {
        mySpan.parentElement.remove();
    }
}

function addSpan(button) {
    if (!button.querySelector(".animate-ping")) {
        button.innerHTML += `
        <span class="absolute -top-1 -right-1 flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        `;
    }
}

function checkMarker(currentQuestion) {
    for (i = 0; i < markerButtons.length; i++) {
        removeSpan(markerButtons[i]);

        if (i === currentQuestion) {
            questions[i][5] = "Current"
            var spanInside = markerButtons[i].querySelector("span.absolute.-top-1.-right-1")
            if (spanInside) {
                spanInside.remove();
            }
        }
        if (questions[i][5] === "Not Visited") {
            markerButtons[i].className = ""
            markerButtons[i].className = "btn btn-square btn-md btn-outline border-gray-200 text-gray-400"
        }
        if (questions[i][5] === "Current") {
            markerButtons[i].className = ""
            markerButtons[i].className = "btn btn-square btn-md btn-primary"
        }
        if (questions[i][5] === "Answered") {
            markerButtons[i].className = ""
            markerButtons[i].className = "btn btn-square btn-md bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
        }
        if (questions[i][5] === "Marked") {
            markerButtons[i].className = ""
            markerButtons[i].className = "btn btn-square btn-md bg-red-100 text-red-600 border-red-200 hover:bg-red-200"
        }
        if (questions[i][5] === "Not Answered") {
            markerButtons[i].className = "";
            markerButtons[i].className = "btn btn-square btn-md bg-red-100 text-red-600 border-red-200 hover:bg-red-200 relative"
            addSpan(markerButtons[i]);
        }
    }
}


function markQuestion() {
    questions[trackQuestion][5] = "Marked"
    console.log("Hi")
}

markerBtn.addEventListener("click", markQuestion)
function loadQuestion() {
    questionTitle.innerText = `${questions[trackQuestion][0]}`
    questionContainer.innerHTML = `
    <label onclick="checkStudentAnswer(this)" class="flex items-center gap-x-4 bg-white rounded-2xl p-5 border-2 border-transparent shadow-sm cursor-pointer hover:border-indigo-100 transition-all group has-[:checked]:border-primary has-[:checked]:bg-blue-50/30">
        <input type="radio" name="options" class="radio radio-primary"/>
        <span class="text-gray-700 font-medium">${questions[trackQuestion][1][0]}</span>
    </label>

    <label onclick="checkStudentAnswer(this)" class="flex items-center gap-x-4 bg-white rounded-2xl p-5 border-2 border-transparent shadow-sm cursor-pointer hover:border-indigo-100 transition-all group has-[:checked]:border-primary has-[:checked]:bg-blue-50/30">
        <input type="radio" name="options" class="radio radio-primary" />
        <span class="text-gray-700 font-medium">${questions[trackQuestion][1][1]}</span>
    </label>

    <label onclick="checkStudentAnswer(this)" class="flex items-center gap-x-4 bg-white rounded-2xl p-5 border-2 border-transparent shadow-sm cursor-pointer hover:border-indigo-100 transition-all group has-[:checked]:border-primary has-[:checked]:bg-blue-50/30">
        <input type="radio" name="options" class="radio radio-primary" />
        <span class="text-gray-700 font-medium">${questions[trackQuestion][1][2]}</span>
    </label>

    <label onclick="checkStudentAnswer(this)" class="flex items-center gap-x-4 bg-white rounded-2xl p-5 border-2 border-transparent shadow-sm cursor-pointer hover:border-indigo-100 transition-all group has-[:checked]:border-primary has-[:checked]:bg-blue-50/30">
        <input type="radio" name="options" class="radio radio-primary" />
        <span class="text-gray-700 font-medium">${questions[trackQuestion][1][3]}</span>
    </label>
    `

    choiceInputs = Array.from(document.querySelectorAll('fieldset label input'));
    choiceLabels = Array.from(document.querySelectorAll('fieldset label'));
    checkPaginationButtons();
    for (i = 0; i < 4; i++) {
        if (choiceLabels[i].innerText == questions[trackQuestion][3]) {
            choiceInputs[i].checked = true;
        }
    }

    checkMarker(trackQuestion);
    questionNum.innerText = `Question ${trackQuestion + 1} of 10`
}

function checkPaginationButtons() {
    if (trackQuestion + 1 == 1) {
        navBack.disabled = true;
        navForward.disabled = false;
    }
    else if (trackQuestion + 1 == 10) {
        navBack.disabled = false;
        navForward.disabled = true;
    }
    else {
        navBack.disabled = false;
        navForward.disabled = false;
    }
}

function getNextQuestion() {
    if (questions[trackQuestion][5] === "Current") {
        if (questions[trackQuestion][3] == null) {
            questions[trackQuestion][5] = "Not Answered"
        }
        else {
            questions[trackQuestion][5] = "Answered"
        }
    }
    trackQuestion++;
    loadQuestion()
}
function getPrevQuestion() {
    if (questions[trackQuestion][5] === "Current") {
        if (questions[trackQuestion][3] == null) {
            questions[trackQuestion][5] = "Not Answered"
        }
        else {
            questions[trackQuestion][5] = "Answered"
        }
    }
    trackQuestion--;
    loadQuestion()
}
navForward.addEventListener("click", getNextQuestion)
navBack.addEventListener("click", getPrevQuestion)

function checkStudentAnswer(el) {
    for (var i = 0; i < choiceInputs.length; i++) {
        choiceInputs[i].checked = false;
    }
    elInput = el.querySelector("input")
    elChoice = el.querySelector("span")

    elInput.checked = true;
    questions[trackQuestion][3] = elChoice.innerText;
    questions[trackQuestion][5] = "Answered"
}
window.addEventListener("load", loadQuestion)
var counter = setInterval(function () {
    var displayedMinutes = minutes < 10 ? "0" + minutes : minutes
    var displayedSeconds = seconds < 10 ? "0" + seconds : seconds

    timer.innerHTML = displayedMinutes + ":" + displayedSeconds;

    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(counter)
            timer.textContent = "times Up!"
            student.isTimeOut = true;
            localStorage.setItem("allStudents", JSON.stringify(students));
            localStorage.removeItem("examInProgress")
            finishExam()
        }
        minutes--;
        seconds = 59;
    }
    else {
        seconds--;
    }
    sliderSeconds++;
    if (minutes < 59) {
        timer.classList.add("text-red-500")
        progress.classList.remove("progress-primary")
        progress.classList.add("progress-error")
    }
    progress.value = sliderSeconds;
}, 1000)

function finishExam() {
    currentGrade = 0
    for (i = 0; i < questions.length; i++) {
        if (questions[i][2] == questions[i][3]) {
            currentGrade += questions[i][4]
        }
    }
    student.grade = currentGrade
    localStorage.setItem("allStudents", JSON.stringify(students));
    localStorage.removeItem("examInProgress")
    if (student.isTimeOut == true) {
        navigateTo("TimeComplete/timeComplete.html");
    }
    else {
        student.isExamFinished = true;
        localStorage.setItem("allStudents", JSON.stringify(students));
        navigateTo("result/result.html");
    }
}
finishExamBtn.addEventListener("click", finishExam)

var questionNum = document.getElementById("questionNum")

