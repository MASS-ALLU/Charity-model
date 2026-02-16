const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

function toggleMode(){
    document.body.classList.toggle("dark");
}

function signup(){
    let u = prompt("Username:");
    let p = prompt("Password:");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({username:u,password:p,total:0});
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account Created!");
}

function login(){
    let u = prompt("Username:");
    let p = prompt("Password:");

    if(u===ADMIN_USER && p===ADMIN_PASS){
        localStorage.setItem("role","admin");
        localStorage.setItem("currentUser",u);
        alert("Admin Logged In");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users"))||[];
    let user = users.find(x=>x.username===u && x.password===p);
    if(user){
        localStorage.setItem("role","user");
        localStorage.setItem("currentUser",u);
        alert("Login Success");
    } else alert("Invalid");
}

function logout(){
    localStorage.clear();
    alert("Logged Out");
}

function donate(){
    let role = localStorage.getItem("role");
    if(role!=="user"){
        alert("Login as user to donate");
        return;
    }

    let amount = parseInt(document.getElementById("amount").value);
    let users = JSON.parse(localStorage.getItem("users"));
    let current = localStorage.getItem("currentUser");
    let user = users.find(x=>x.username===current);

    user.total += amount;
    localStorage.setItem("users", JSON.stringify(users));

    alert("Donation Successful!");
    updateLeaderboard();
}

function updateLeaderboard(){
    let users = JSON.parse(localStorage.getItem("users"))||[];
    users.sort((a,b)=>b.total-a.total);
    let list=document.getElementById("leaderboardList");
    list.innerHTML="";
    users.slice(0,5).forEach(u=>{
        let li=document.createElement("li");
        li.innerText=u.username+" - ₹"+u.total;
        list.appendChild(li);
    });
}
updateLeaderboard();

function showProfile(){
    if(localStorage.getItem("role")!=="user"){
        alert("Login first");
        return;
    }
    let users = JSON.parse(localStorage.getItem("users"));
    let current=localStorage.getItem("currentUser");
    let user=users.find(x=>x.username===current);

    document.getElementById("profileSection").classList.remove("hidden");
    document.getElementById("profileName").innerText="Username: "+user.username;
    document.getElementById("profileTotal").innerText="Total Donated: ₹"+user.total;
}

function showAdmin(){
    if(localStorage.getItem("role")!=="admin"){
        alert("Admin only!");
        return;
    }
    document.getElementById("adminSection").classList.remove("hidden");
    let users = JSON.parse(localStorage.getItem("users"))||[];
    let list=document.getElementById("adminList");
    list.innerHTML="";
    users.forEach(u=>{
        let li=document.createElement("li");
        li.innerText=u.username+" - ₹"+u.total;
        list.appendChild(li);
    });
}

function scrollDonate(){
    document.getElementById("donate").scrollIntoView({behavior:"smooth"});
}

// Animated counters
function animate(id, end){
    let obj=document.getElementById(id);
    let start=0;
    let interval=setInterval(()=>{
        start+=50;
        obj.innerText=start+"+";
        if(start>=end) clearInterval(interval);
    },20);
}
animate("count1",3000);
animate("count2",15000);
animate("count3",120);
