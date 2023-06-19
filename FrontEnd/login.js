import { getLogin } from "./api.js";

const loginButton = document.querySelector("#login");

// Login button
loginButton.addEventListener("click", async function (event) {
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
    window.localStorage.setItem("userId", result.userId);
    window.location.replace("./index.html");
})