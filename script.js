function openLogin() {
    let user = prompt("Enter Username:");
    let pass = prompt("Enter Password:");

    if(user === localStorage.getItem("username") &&
       pass === localStorage.getItem("password")) {
        alert("Login Successful!");
        localStorage.setItem("loggedIn", "true");
        document.getElementById("logoutBtn").style.display = "inline";
    } else {
        alert("Invalid Credentials");
    }
}

function openSignup() {
    let user = prompt("Create Username:");
    let pass = prompt("Create Password:");

    localStorage.setItem("username", user);
    localStorage.setItem("password", pass);

    alert("Account Created Successfully!");
}

function logout() {
    localStorage.removeItem("loggedIn");
    document.getElementById("logoutBtn").style.display = "none";
    alert("Logged Out");
}

function donate() {
    if(localStorage.getItem("loggedIn") === "true") {
        alert("Proceed to payment section below.");
    } else {
        alert("Please login first.");
    }
}

function processPayment() {
    let amount = document.getElementById("donationAmount").value;

    if(localStorage.getItem("loggedIn") !== "true") {
        alert("Please login before donating.");
        return;
    }

    if(amount > 0) {
        alert("Processing payment of ₹" + amount + " (Demo Mode)");
        alert("Payment Successful! Thank you for your donation ❤️");
    } else {
        alert("Please enter valid amount.");
    }
}
