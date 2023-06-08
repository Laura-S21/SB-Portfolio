const loginButton = document.querySelector("#login");


async function getLogin(argEmail, argPassword) {
   const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: argEmail,
            password: argPassword,
        })
    });

    return response
}



// Login button
loginButton.addEventListener("click", async function(event) {
    event.preventDefault();
    let userEmail = document.querySelector("#email").value;
    let userPassword = document.querySelector("#password").value;
    let response = await getLogin(userEmail, userPassword);

    if (!response.ok) {
        document.querySelector("#error-message").style.display = "block";
        return;
    }
    const result = await response.json();
    window.localStorage.setItem("token", result.token);
    window.location.replace("./index.html");
})