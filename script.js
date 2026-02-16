// Login System
function signup() {
    let user = prompt("Create Username:");
    let pass = prompt("Create Password:");
    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);
    alert("Account Created!");
}

function login() {
    let user = prompt("Enter Username:");
    let pass = prompt("Enter Password:");
    if(user === localStorage.getItem("user") &&
       pass === localStorage.getItem("pass")) {
        localStorage.setItem("loggedIn", "true");
        document.getElementById("logoutBtn").style.display = "inline";
        alert("Login Successful!");
    } else {
        alert("Invalid Credentials");
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    document.getElementById("logoutBtn").style.display = "none";
    alert("Logged Out");
}

// Animated Counters
function animateValue(id, start, end, duration) {
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let obj = document.getElementById(id);
    let timer = setInterval(function() {
        current += increment;
        obj.textContent = current + "+";
        if (current == end) clearInterval(timer);
    }, stepTime);
}

animateValue("donationCount", 0, 500, 2000);
animateValue("childrenCount", 0, 3000, 2000);
animateValue("volunteerCount", 0, 120, 2000);

// Scroll
function scrollToDonate() {
    document.getElementById("donateSection").scrollIntoView();
}

// Donation + PDF Receipt
function processPayment() {

    if(localStorage.getItem("loggedIn") !== "true") {
        alert("Please login first.");
        return;
    }

    let name = document.getElementById("donorName").value;
    let amount = document.getElementById("amount").value;

    if(name === "" || amount <= 0) {
        alert("Enter valid details.");
        return;
    }

    alert("Payment Successful (Demo Mode)");

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Bright Future Foundation", 20, 20);
    doc.text("Donation Receipt", 20, 30);
    doc.text("Donor Name: " + name, 20, 50);
    doc.text("Amount Donated: ₹" + amount, 20, 60);
    doc.text("Thank you for supporting our mission!", 20, 80);

    doc.save("Donation_Receipt.pdf");
}

// Complaint
function submitComplaint() {
    let name = document.getElementById("complaintName").value;
    let text = document.getElementById("complaintText").value;

    if(name === "" || text === "") {
        alert("Please fill all fields.");
    } else {
        alert("Complaint submitted successfully!");
    }
}
