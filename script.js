// DEFAULT ADMIN ACCOUNT
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// DARK / LIGHT MODE
function toggleMode() {
    document.body.classList.toggle("dark");
}

// SIGNUP
function signup() {
    let username = prompt("Create Username:");
    let password = prompt("Create Password:");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.push({
        username: username,
        password: password,
        total: 0,
        role: "user",
        profilePic: "https://i.pravatar.cc/150?u=" + username
    });

    localStorage.setItem("users", JSON.stringify(users));
    alert("Account Created!");
}

// LOGIN
function login() {
    let username = prompt("Username:");
    let password = prompt("Password:");

    // Admin login
    if(username === ADMIN_USERNAME && password === ADMIN_PASSWORD){
        localStorage.setItem("currentUser", username);
        localStorage.setItem("role", "admin");
        alert("Admin Login Successful!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.username === username && u.password === password);

    if(user){
        localStorage.setItem("currentUser", username);
        localStorage.setItem("role", "user");
        alert("Login Successful!");
    } else {
        alert("Invalid Credentials");
    }
}

// LOGOUT
function logout(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("role");
    alert("Logged Out");
}

// DONATION (Protected)
function donate(){
    let currentUser = localStorage.getItem("currentUser");
    let role = localStorage.getItem("role");

    if(!currentUser || role !== "user"){
        alert("Only logged-in users can donate.");
        return;
    }

    let amount = parseInt(document.getElementById("amount").value);
    if(amount <= 0){
        alert("Enter valid amount.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users"));
    let user = users.find(u => u.username === currentUser);

    user.total += amount;
    localStorage.setItem("users", JSON.stringify(users));

    alert("Donation Successful!");
    updateLeaderboard();
}

// PROFILE
function showProfile(){
    let currentUser = localStorage.getItem("currentUser");
    let role = localStorage.getItem("role");

    if(!currentUser || role !== "user"){
        alert("Login as user first.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users"));
    let user = users.find(u => u.username === currentUser);

    document.getElementById("profileSection").classList.remove("hidden");
    document.getElementById("profilePic").src = user.profilePic;
    document.getElementById("profileName").innerText = "Username: " + user.username;
    document.getElementById("totalDonation").innerText = "Total Donated: ₹" + user.total;
}

// ADMIN PANEL (Protected)
function showAdmin(){
    let role = localStorage.getItem("role");

    if(role !== "admin"){
        alert("Access Denied! Admin Only.");
        return;
    }

    document.getElementById("adminSection").classList.remove("hidden");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let list = document.getElementById("userList");
    list.innerHTML = "";

    users.forEach(user=>{
        let li = document.createElement("li");
        li.innerText = user.username + " - ₹" + user.total;
        list.appendChild(li);
    });
}

// LEADERBOARD
function updateLeaderboard(){
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.sort((a,b)=> b.total - a.total);

    let board = document.getElementById("leaderboard");
    board.innerHTML = "";

    users.slice(0,5).forEach(user=>{
        let li = document.createElement("li");
        li.innerText = user.username + " - ₹" + user.total;
        board.appendChild(li);
    });
}

updateLeaderboard();
