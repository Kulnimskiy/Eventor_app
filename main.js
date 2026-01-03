const tg = window.Telegram.WebApp;

// Initialize the app
tg.ready();
tg.expand();

// Access user data
const user = tg.initDataUnsafe?.user;
const user_info = document.getElementById("user-info")

if (user) {
    user_info.innerText =
        `Здравствуйте, ${user.first_name}!`;
} else {
    user_info.innerText =
        "User data not available.";
}

document.getElementById("actionBtn").addEventListener("click", () => {
    tg.sendData(JSON.stringify({
        action: "button_clicked",
        time: Date.now()
    }));
});
