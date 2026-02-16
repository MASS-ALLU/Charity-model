function handleCredentialResponse(response) {

    const responsePayload = parseJwt(response.credential);

    document.getElementById("userInfo").innerHTML =
        "Welcome, " + responsePayload.name;

    document.getElementById("logoutBtn").style.display = "inline";

    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("userName", responsePayload.name);
}

function logout() {
    google.accounts.id.disableAutoSelect();
    document.getElementById("userInfo").innerHTML = "";
    document.getElementById("logoutBtn").style.display = "none";
    localStorage.clear();
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
