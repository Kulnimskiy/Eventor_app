const tg = window.Telegram.WebApp;

// Initialize the app
tg.ready();
tg.expand();

// Access user data
const user = tg.initDataUnsafe?.user;

if (user) {
    document.getElementById("user-info").innerText =
        `Здравствуйте, ${user.first_name}!`;
} else {
    document.getElementById("user-info").innerText =
        "User data not available.";
}

document.getElementById("actionBtn").addEventListener("click", () => {
    tg.sendData(JSON.stringify({
        action: "button_clicked",
        time: Date.now()
    }));
});
