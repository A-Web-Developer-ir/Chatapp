const socket = io();

//Query DOM
const messageInput = document.getElementById("message-Input"),
    chatForm = document.getElementById("chat-Form"),
    chatBox = document.getElementById("chat-box");

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const timeee = new Date(),
        hours = timeee.getHours(),
        minutes = timeee.getMinutes(),
        secounds = timeee.getSeconds(),
        years = timeee.getFullYear(),
        months = timeee.getMonth() + 1,
        days = timeee.getDate(),
        messageTime = `${hours}:${minutes}:${secounds} | ${years}/${months}/${days}`;

    // Emit Events
    if (messageInput.value) {
        socket.emit("chat-message", {
            message: messageInput.value,
            time: messageTime,
        });
        messageInput.value = "";
    }

});

// listen

socket.on('chat-message', (newData) => {

    chatBox.innerHTML += `
            <div class="container">
            <div class="message">
            <span class="name">${newData.name}</span>
                    <span class="time">${newData.time}</span><br>
                    <p class="text">${newData.message}</p>
                    </div>
                    </div>`;

    var objDiv = document.getElementById("chat-box");
    objDiv.scrollTop = objDiv.scrollHeight;

})

socket.on('online-users', (onlineUsers) => {
    document.getElementById("onlines").innerHTML = onlineUsers;
})


function chatttBox() {
    var objDiv = document.getElementById("chat-box");
    objDiv.scrollTop = objDiv.scrollHeight;
}



