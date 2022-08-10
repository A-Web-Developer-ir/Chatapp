import { replayId } from "./replay.js";
import { registerEmojies } from "./emoji.js";

const socket = io();

//Query DOM
const messageInput = document.getElementById("message-Input");
const chatForm = document.getElementById("chat-Form");
const chatBox = document.getElementById("chat-box");

registerEmojies(messageInput);

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
      replayedTo: replayId,
    });

    messageInput.value = "";
  }
});

// listen

socket.on("chat-message", (data) => {
  const replayMessage = data.replayedTo
    ? `<div replay data-messageId=${data.replayedTo} class="text-sm text-gray-400">Please wait ...</div>`
    : ``;

  chatBox.innerHTML += `
    <div
        ondblclick="replay(this)"
        data-messageId="${data._id}"
        class="flex flex-col items-stretch gap-1.5 bg-white px-4 py-1.5 rounded-t-xl rounded-br-xl shadow select-none">
        <div class="flex flex-row gap-3 items-stretch w-full">
            <span class="text-gray-500 text-xs" name>
                ${data.name}
            </span>
            <span class="text-gray-500 text-xs">
                ${data.time}
            </span>
        </div>
        ${replayMessage}
        <p dir="auto" class="text-gray-700">
            ${data.message}
        </p>
    </div>
    `;
  const { scrollHeight } = document.body;
  window.scrollTo({ left: 0, top: scrollHeight, behavior: "smooth" });
  unReplay();
  loadReplay();
});

socket.on("online-users", (onlineUsers) => {
  document.getElementById("onlines").innerHTML = onlineUsers;
});

window.chatttBox = function () {
  var objDiv = document.getElementById("chat-box");
  objDiv.scrollTop = objDiv.scrollHeight;
};

window.addEventListener("load", () => {
  const { scrollHeight } = document.body;
  window.scrollTo({ left: 0, top: scrollHeight, behavior: "smooth" });
});
