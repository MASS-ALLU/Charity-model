emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");

// SIGNUP
function signup() {
    let username = prompt("Create Username:");
    let password = prompt("Create Password:");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.push({
        username: username,
        password: password,
        total: 0,
        profilePic: "https://i.pravatar.cc/150?u=" + username
    });

    localStorage.setItem("users", JSON.stringify(users));
    alert("Account Created!");
}

// LOGIN
function login() {
    let username = prompt("Username:");
    let password = prompt("Password:");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.username === username && u.password === password);

    if(user) {
        localStorage.setItem("currentUser", username);
        alert("Login Successful!");
    } else {
        alert("Invalid Credentials");
    }
}

// LOGOUT
function logout() {
    localStorage.removeItem("currentUser");
    alert("Logged Out");
}

// DONATE (PROTECTED)
function donate() {

    let currentUser = localStorage.getItem("currentUser");
    if(!currentUser) {
        alert("Please login first!");
        return;
    }

    let amount = parseInt(document.getElementById("amount").value);
    if(amount <= 0) {
        alert("Enter valid amount");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users"));
    let user = users.find(u => u.username === currentUser);

    user.total += amount;

    localStorage.setItem("users", JSON.stringify(users));

    generatePDF(currentUser, amount);
    sendReceiptEmail(currentUser, amount);

    alert("Donation Successful!");
    updateLeaderboard();
}

// PROFILE
function showProfile() {
    let currentUser = localStorage.getItem("currentUser");
    if(!currentUser) {
        alert("Login first!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users"));
    let user = users.find(u => u.username === currentUser);

    document.getElementById("profileSection").classList.remove("hidden");
    document.getElementById("profilePic").src = user.profilePic;
    document.getElementById("profileName").innerText = "Username: " + user.username;
    document.getElementById("totalDonation").innerText = "Total Donated: ₹" + user.total;
}

// ADMIN PANEL
function showAdmin() {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    document.getElementById("adminSection").classList.remove("hidden");

    let list = document.getElementById("userList");
    list.innerHTML = "";

    users.forEach(user => {
        let li = document.createElement("li");
        li.innerText = user.username + " - ₹" + user.total;
        list.appendChild(li);
    });
}

// LEADERBOARD
function updateLeaderboard() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.sort((a,b) => b.total - a.total);

    let board = document.getElementById("leaderboard");
    board.innerHTML = "";

    users.slice(0,5).forEach(user => {
        let li = document.createElement("li");
        li.innerText = user.username + " - ₹" + user.total;
        board.appendChild(li);
    });
}

updateLeaderboard();

// PDF RECEIPT
function generatePDF(username, amount) {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Bright Future Foundation", 20, 20);
    doc.text("Donation Receipt", 20, 30);
    doc.text("Donor: " + username, 20, 50);
    doc.text("Amount: ₹" + amount, 20, 60);
    doc.save("Donation_Receipt.pdf");
}

// EMAIL RECEIPT
function sendReceiptEmail(username, amount) {

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        user: username,
        amount: amount
    });
}
