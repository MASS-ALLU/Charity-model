function openLogin() {
    document.getElementById("loginModal").style.display = "block";
}

function openSignup() {
    document.getElementById("signupModal").style.display = "block";
}

function closeModal() {
    document.getElementById("loginModal").style.display = "none";
    document.getElementById("signupModal").style.display = "none";
}

function signup() {
    let user = document.getElementById("signupUser").value;
    let pass = document.getElementById("signupPass").value;

    localStorage.setItem("username", user);
    localStorage.setItem("password", pass);

    alert("Account Created Successfully!");
    closeModal();
}

function login() {
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;

    if(user === localStorage.getItem("username") &&
       pass === localStorage.getItem("password")) {
        alert("Login Successful!");
        localStorage.setItem("loggedIn", "true");
        document.getElementById("logoutBtn").style.display = "inline";
        closeModal();
    } else {
        alert("Invalid Credentials");
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    document.getElementById("logoutBtn").style.display = "none";
    alert("Logged Out");
}

function donate() {
    if(localStorage.getItem("loggedIn") === "true") {
        alert("Redirecting to payment gateway...");
    } else {
        alert("Please login first to donate.");
    }
}
