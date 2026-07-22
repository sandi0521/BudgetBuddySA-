// ===========================================
// BudgetBuddy SA
// Main JavaScript File
// Version 2.0
// ===========================================

// ==========================
// REGISTER
// ==========================

function register() {

    let fullName = document.getElementById("fullName").value.trim();
    let studentNumber = document.getElementById("studentNumber").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (
        fullName === "" ||
        studentNumber === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {
        alert("Please complete all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    localStorage.setItem("fullName", fullName);
    localStorage.setItem("studentNumber", studentNumber);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Account created successfully!");

    window.location.href = "index.html";
}

// ==========================
// LOGIN
// ==========================

function login() {

    let studentNumber =
        document.getElementById("loginStudentNumber").value.trim();

    let password =
        document.getElementById("loginPassword").value;

    let savedStudentNumber =
        localStorage.getItem("studentNumber");

    let savedPassword =
        localStorage.getItem("password");

    if (
        studentNumber === savedStudentNumber &&
        password === savedPassword
    ) {

        alert("Login Successful!");

        window.location.href = "dashboard.html";

    } else {

        alert("Invalid Student Number or Password.");

    }

}

// ==========================
// DASHBOARD
// ==========================

function loadDashboard() {

    let name =
        localStorage.getItem("fullName") || "Student";

    let income =
        localStorage.getItem("income") || "0";

    let expenses =
        localStorage.getItem("totalExpenses") || "0";

    let balance =
        localStorage.getItem("remainingBalance") || "0";

    if(document.getElementById("welcomeUser")){
        document.getElementById("welcomeUser").innerHTML =
        "Welcome, " + name + " 👋";
    }

    if(document.getElementById("dashIncome")){
        document.getElementById("dashIncome").innerHTML =
        "R" + income;
    }

    if(document.getElementById("dashExpenses")){
        document.getElementById("dashExpenses").innerHTML =
        "R" + expenses;
    }

    if(document.getElementById("dashBalance")){
        document.getElementById("dashBalance").innerHTML =
        "R" + balance;
        let savingRate = 0;
let spendingRate = 0;

if(Number(income) > 0){

    savingRate =
    ((Number(balance) / Number(income)) * 100).toFixed(1);

    spendingRate =
    ((Number(expenses) / Number(income)) * 100).toFixed(1);

}

document.getElementById("savingRate").innerHTML =
savingRate + "%";

document.getElementById("spendingRate").innerHTML =
spendingRate + "%";

if(Number(balance) >= 0){

    document.getElementById("dashboardAdvice").innerHTML =
    "✅ Keep saving!";

}else{

    document.getElementById("dashboardAdvice").innerHTML =
    "⚠ Reduce unnecessary expenses.";

}
    }

    let health = 100;

    if(Number(balance) < 0){

        health = 40;

    }else if(Number(balance) < Number(income) * 0.2){

        health = 70;

    }

    if(document.getElementById("healthScore")){
        document.getElementById("healthScore").innerHTML =
        health + "%";
    }

    if(document.getElementById("healthStatus")){

        if(health >= 80){

            document.getElementById("healthStatus").innerHTML =
            "🟢 Excellent";

        }else if(health >= 60){

            document.getElementById("healthStatus").innerHTML =
            "🟡 Good";

        }else{

            document.getElementById("healthStatus").innerHTML =
            "🔴 Needs Improvement";

        }

    }

}

// ==========================
// LOGOUT
// ==========================

function logout() {

    let answer = confirm("Are you sure you want to logout?");

    if(answer){

        window.location.href = "index.html";

    }

}
// ==========================
// BUDGET CALCULATOR
// ==========================

function calculateBudget() {

    let income =
        Number(document.getElementById("income").value);

    let food =
        Number(document.getElementById("food").value);

    let transport =
        Number(document.getElementById("transport").value);

    let accommodation =
        Number(document.getElementById("accommodation").value);

    let books =
        Number(document.getElementById("books").value);

    let entertainment =
        Number(document.getElementById("entertainment").value);

    // Validation

    if(income <= 0){

        alert("Please enter a valid monthly income.");

        return;

    }

    let totalExpenses =
        food +
        transport +
        accommodation +
        books +
        entertainment;

    let remainingBalance =
        income - totalExpenses;

    // Display Results

    document.getElementById("totalExpenses").innerHTML =
        "R" + totalExpenses.toFixed(2);

    document.getElementById("remainingBalance").innerHTML =
        "R" + remainingBalance.toFixed(2);

    if(remainingBalance >= 0){

        document.getElementById("budgetStatus").innerHTML =
            "✅ Within Budget";

    }else{

        document.getElementById("budgetStatus").innerHTML =
            "❌ Over Budget";

    }

    // Save to Local Storage

    localStorage.setItem("income", income);
    localStorage.setItem("totalExpenses", totalExpenses);
    localStorage.setItem("remainingBalance", remainingBalance);

    alert("Budget saved successfully!");

}
// ==========================
// PROFILE
// ==========================

function loadProfile(){

    if(document.getElementById("profileName")){
        document.getElementById("profileName").innerHTML =
        localStorage.getItem("fullName") || "N/A";
    }

    if(document.getElementById("profileStudent")){
        document.getElementById("profileStudent").innerHTML =
        localStorage.getItem("studentNumber") || "N/A";
    }

    if(document.getElementById("profileEmail")){
        document.getElementById("profileEmail").innerHTML =
        localStorage.getItem("email") || "N/A";
    }

    if(document.getElementById("profileIncome")){
        document.getElementById("profileIncome").innerHTML =
        "R" + (localStorage.getItem("income") || 0);
    }

    if(document.getElementById("profileBalance")){
        document.getElementById("profileBalance").innerHTML =
        "R" + (localStorage.getItem("remainingBalance") || 0);
    }

}
// ==========================
// REPORT
// ==========================

function loadReport(){

    if(document.getElementById("reportIncome")){
        document.getElementById("reportIncome").innerHTML =
        "R" + (localStorage.getItem("income") || 0);
    }

    if(document.getElementById("reportExpenses")){
        document.getElementById("reportExpenses").innerHTML =
        "R" + (localStorage.getItem("totalExpenses") || 0);
    }

    if(document.getElementById("reportBalance")){
        document.getElementById("reportBalance").innerHTML =
        "R" + (localStorage.getItem("remainingBalance") || 0);
    }

    let balance = Number(localStorage.getItem("remainingBalance") || 0);

    if(document.getElementById("reportStatus")){

        if(balance >= 0){
            document.getElementById("reportStatus").innerHTML =
            "✅ Within Budget";
        }else{
            document.getElementById("reportStatus").innerHTML =
            "❌ Over Budget";
        }

    }

}
// ==========================
// STATEMENT
// ==========================

function loadStatement(){

    let balance = Number(localStorage.getItem("remainingBalance") || 0);

    document.getElementById("statementName").innerHTML =
    localStorage.getItem("fullName") || "N/A";

    document.getElementById("statementStudent").innerHTML =
    localStorage.getItem("studentNumber") || "N/A";

    document.getElementById("statementIncome").innerHTML =
    "R" + (localStorage.getItem("income") || 0);

    document.getElementById("statementExpenses").innerHTML =
    "R" + (localStorage.getItem("totalExpenses") || 0);

    document.getElementById("statementBalance").innerHTML =
    "R" + (localStorage.getItem("remainingBalance") || 0);

    if(balance >= 0){
        document.getElementById("statementStatus").innerHTML =
        "✅ Within Budget";
    }else{
        document.getElementById("statementStatus").innerHTML =
        "❌ Over Budget";
    }

}
// ==========================
// BUDGETBUDDY AI
// ==========================

function chatAI(){

    let question =
    document.getElementById("question").value;

    let answer = "";

    switch(question){

        case "save":
            answer = "💡 Save at least 20% of your monthly income before spending.";
            break;

        case "food":
            answer = "🥗 Buy groceries in bulk and cook at home to reduce food expenses.";
            break;

        case "transport":
            answer = "🚌 Use public transport or share rides to reduce transport costs.";
            break;

        case "budget":
            answer = "📊 Reduce unnecessary expenses and prioritise your essential needs.";
            break;

        default:
            answer = "Please choose a question first.";

    }

    document.getElementById("aiAnswer").innerHTML =
    answer;

}
// ==========================
// PDF DOWNLOAD
// ==========================

function downloadPDF(){

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    let name =
    localStorage.getItem("fullName");

    let student =
    localStorage.getItem("studentNumber");

    let income =
    localStorage.getItem("income");

    let expenses =
    localStorage.getItem("totalExpenses");

    let balance =
    localStorage.getItem("remainingBalance");

    let status =
    Number(balance) >= 0 ?
    "Within Budget" :
    "Over Budget";

    doc.setFontSize(22);
    doc.text("BudgetBuddy SA",20,20);

    doc.setFontSize(15);
    doc.text("Student Budget Statement",20,35);

    doc.text("Student Name: " + name,20,55);
    doc.text("Student Number: " + student,20,70);

    doc.text("Monthly Income: R" + income,20,90);
    doc.text("Total Expenses: R" + expenses,20,105);
    doc.text("Remaining Balance: R" + balance,20,120);
    doc.text("Budget Status: " + status,20,135);

    doc.save("BudgetBuddy_Statement.pdf");

}
