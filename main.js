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

const notificationsContainer = document.getElementById("notifications-container");

async function getNotifications() {
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/notifications/list/?from_user_id=1226837950`
        );
        if (!response.ok) throw new Error("Request failed");

        const data = await response.json();

        notificationsContainer.innerHTML = "";

        if (data.length === 0) {
            notificationsContainer.innerText = "No notifications";
            return;
        }

        data.forEach(n => {
            const card = document.createElement("div");
            card.className = "notification" + (n.active ? "" : " inactive");

            card.innerHTML = `
                <div class="notification-header">
                    <span class="notification-name">${n.to_user_name}</span>
                    <span class="notification-date">
                        ${new Date(n.created_at).toLocaleString()}
                    </span>
                </div>
                <div class="notification-message">
                    ${n.message}
                </div>
            `;

            notificationsContainer.appendChild(card);
        });
        return data

    } catch (err) {
        console.error(err);
        notificationsContainer.innerText = "Failed to load notifications";
        return {error: err.message}
    }
}


document.getElementById("actionBtn").addEventListener("click", async () => {
    console.log("call")
    let data = await getNotifications();
    tg.sendData(JSON.stringify({
        action: "button_clicked",
        data: data,
        time: Date.now()
    }));
});
