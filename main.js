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

async function getNotifications() {
    try {
        console.log("call 2")

        const response = await fetch("http://127.0.0.1:8000/notifications/list/?from_user_id=1226837950");
        if (!response.ok) throw new Error("Request failed");

        const data = await response.json();
        user_info.innerText = JSON.stringify(data, null, 2);
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}


document.getElementById("actionBtn").addEventListener("click", () => {
    console.log("call")
    getNotifications();
    tg.sendData(JSON.stringify({
        action: "button_clicked",
        time: Date.now()
    }));
});
