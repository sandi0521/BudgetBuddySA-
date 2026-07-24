// ==========================================
// BudgetBuddy SA Version 5.0
// Part 1 - Authentication
// ==========================================

// ==========================
// SHOW / HIDE PASSWORD
// ==========================

function togglePassword(inputId, button) {

    const input = document.getElementById(inputId);

    if (!input) return;

    if (input.type === "password") {
        input.type = "text";
        button.innerHTML = "🙈";
    } else {
        input.type = "password";
        button.innerHTML = "👁️";
    }
}

// ==========================
// REGISTER
// ==========================

function register() {

    const fullName = document.getElementById("fullName").value.trim();
    const studentNumber = document.getElementById("studentNumber").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

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

    const studentNumber = document.getElementById("loginStudentNumber").value.trim();
    const password = document.getElementById("loginPassword").value;

    const savedStudent = localStorage.getItem("studentNumber");
    const savedPassword = localStorage.getItem("password");

    if (studentNumber === savedStudent && password === savedPassword) {

        alert("Login Successful!");

        window.location.href = "dashboard.html";

    } else {

        alert("Invalid Student Number or Password.");

    }
}

// ==========================
// LOGOUT
// ==========================

function logout() {

    if (confirm("Are you sure you want to logout?")) {

        window.location.href = "index.html";

    }
}
// ==========================================
// PART 2 - BUDGET CALCULATOR
// ==========================================

function calculateBudget() {

    // Get values from the form
    const income = Number(document.getElementById("income").value) || 0;
    const food = Number(document.getElementById("food").value) || 0;
    const transport = Number(document.getElementById("transport").value) || 0;
    const accommodation = Number(document.getElementById("accommodation").value) || 0;
    const books = Number(document.getElementById("books").value) || 0;
    const entertainment = Number(document.getElementById("entertainment").value) || 0;

    // Validate income
    if (income <= 0) {
        alert("Please enter a valid monthly income.");
        return;
    }

    // Calculate totals
    const totalExpenses =
        food +
        transport +
        accommodation +
        books +
        entertainment;

    const remainingBalance = income - totalExpenses;

    // Save data
    localStorage.setItem("income", income);
    localStorage.setItem("totalExpenses", totalExpenses);
    localStorage.setItem("remainingBalance", remainingBalance);

    // Show results on budget.html
    document.getElementById("totalExpenses").innerHTML =
        "R" + totalExpenses.toFixed(2);

    document.getElementById("remainingBalance").innerHTML =
        "R" + remainingBalance.toFixed(2);

    if (remainingBalance >= 0) {
        document.getElementById("budgetStatus").innerHTML =
            "✅ Within Budget";
    } else {
        document.getElementById("budgetStatus").innerHTML =
            "❌ Over Budget";
    }

    alert("Budget calculated successfully!");
}
// ==========================================
// PART 3 - DASHBOARD
// ==========================================

function loadDashboard() {

    const name = localStorage.getItem("fullName") || "Student";
    const income = Number(localStorage.getItem("income")) || 0;
    const expenses = Number(localStorage.getItem("totalExpenses")) || 0;
    const balance = Number(localStorage.getItem("remainingBalance")) || 0;

    // Welcome Message
    if (document.getElementById("welcomeUser")) {
        document.getElementById("welcomeUser").innerHTML =
            "Welcome, " + name + " 👋";
    }

    // Dashboard Cards
    if (document.getElementById("dashIncome")) {
        document.getElementById("dashIncome").innerHTML =
            "R" + income.toFixed(2);
    }

    if (document.getElementById("dashExpenses")) {
        document.getElementById("dashExpenses").innerHTML =
            "R" + expenses.toFixed(2);
    }

    if (document.getElementById("dashBalance")) {
        document.getElementById("dashBalance").innerHTML =
            "R" + balance.toFixed(2);

        document.getElementById("dashBalance").style.color =
            balance >= 0 ? "green" : "red";
    }

    // Financial Health
    let health = 100;
    let status = "🟢 Excellent";

    if (income <= 0) {
        health = 0;
        status = "⚫ No Income";
    } else if (balance < 0) {
        health = 0;
        status = "🔴 Critical";
    } else {
        const percentage = (balance / income) * 100;

        if (percentage >= 50) {
            health = 100;
            status = "🟢 Excellent";
        } else if (percentage >= 20) {
            health = 75;
            status = "🟡 Good";
        } else if (percentage > 0) {
            health = 50;
            status = "🟠 Fair";
        } else {
            health = 25;
            status = "🔴 Poor";
        }
    }

    if (document.getElementById("healthScore")) {
        document.getElementById("healthScore").innerHTML = health + "%";
    }

    if (document.getElementById("healthStatus")) {
        document.getElementById("healthStatus").innerHTML = status;
    }

    // Rates
    if (income > 0) {

        if (document.getElementById("savingRate")) {
            document.getElementById("savingRate").innerHTML =
                ((balance / income) * 100).toFixed(1) + "%";
        }

        if (document.getElementById("spendingRate")) {
            document.getElementById("spendingRate").innerHTML =
                ((expenses / income) * 100).toFixed(1) + "%";
        }
    }

    // Advice
    if (document.getElementById("dashboardAdvice")) {

        if (balance >= 0) {
            document.getElementById("dashboardAdvice").innerHTML =
                "✅ Great! Keep saving every month.";
        } else {
            document.getElementById("dashboardAdvice").innerHTML =
                "⚠ You are spending more than your income.";
        }
    }

    // Progress Bar
    if (document.getElementById("budgetProgress")) {

        let progress = income > 0 ? (expenses / income) * 100 : 0;

        if (progress > 100) {
            progress = 100;
        }

        document.getElementById("budgetProgress").style.width =
            progress + "%";

        if (document.getElementById("progressText")) {
            document.getElementById("progressText").innerHTML =
                progress.toFixed(0) + "%";
        }
    }
}
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("welcomeUser")) {
        loadDashboard();
    }
});
function downloadPDF() {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get stored values
    const name = localStorage.getItem("fullName") || "Student";
    const income = localStorage.getItem("income") || "0";
    const expenses = localStorage.getItem("totalExpenses") || "0";
    const balance = localStorage.getItem("remainingBalance") || "0";

    // Budget Status
    let status = Number(balance) >= 0 ? "Within Budget" : "Over Budget";

    // PDF Title
    doc.setFontSize(18);
    doc.text("BudgetBuddy SA", 20, 20);

    doc.setFontSize(14);
    doc.text("Budget Report", 20, 30);

    // User Details
    doc.setFontSize(12);
    doc.text("Student: " + name, 20, 45);
    doc.text("Income: R" + income, 20, 55);
    doc.text("Expenses: R" + expenses, 20, 65);
    doc.text("Balance: R" + balance, 20, 75);
    doc.text("Status: " + status, 20, 85);

    doc.save("BudgetBuddy_Report.pdf");
}
document.getElementById("reportIncome").innerHTML =
    "R" + (Number(localStorage.getItem("income")) || 0).toFixed(2);

document.getElementById("reportExpenses").innerHTML =
    "R" + (Number(localStorage.getItem("totalExpenses")) || 0).toFixed(2);

document.getElementById("reportBalance").innerHTML =
    "R" + (Number(localStorage.getItem("remainingBalance")) || 0).toFixed(2);
function askAI() {

    const question = document.getElementById("question").value;
    let response = "";

    switch (question) {

        case "How can I lower transport costs?":
            response = "🚍 Use public transport, walk when possible, or share rides with classmates.";
            break;

        case "How can I save more money?":
            response = "💰 Save at least 10% of your monthly income before spending.";
            break;

        case "How do I reduce food expenses?":
            response = "🍲 Cook at home, buy in bulk, and avoid unnecessary takeaways.";
            break;

        default:
            response = "🤖 Keep tracking your budget and spend wisely.";
    }

    document.getElementById("aiResponse").innerHTML = response;
} 
// ==========================
// BUDGETBUDDY AI
// ==========================

function askAI() {

    const question = document.getElementById("question").value;
    let answer = "";

    switch (question) {

        case "save":
            answer = "💰 Save at least 10% of your monthly income before spending.";
            break;

        case "food":
            answer = "🍽️ Plan your meals, cook at home, and avoid buying unnecessary snacks.";
            break;

        case "transport":
            answer = "🚌 Use public transport, walk when possible, or share rides with classmates.";
            break;

        case "budget":
            answer = "📊 You are over budget because your expenses are greater than your income. Try reducing unnecessary spending.";
            break;

        default:
            answer = "🤖 Please choose a question first.";
    }

    document.getElementById("aiAnswer").innerHTML = answer;
}
