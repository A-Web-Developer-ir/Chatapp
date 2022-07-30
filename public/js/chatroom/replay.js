export let replayId = null;
export let replayText = null;

const replayBox = document.getElementById("replayBox");

window.replay = (messageElement) => {
  replayId = messageElement.dataset.messageid;
  replayText = messageElement.querySelector("p").innerHTML;
  replayBox.querySelector("p").innerHTML = replayText;
  replayBox.classList.remove("hidden");
  replayBox.classList.add("flex");
};

window.unReplay = () => {
  replayId = null;
  replayBox.classList.add("hidden");
  replayBox.classList.remove("flex");
};

window.loadReplay = async () => {
  const replayMessages = document.querySelectorAll("[replay]");
  for (let i = 0; i < replayMessages.length; i++) {
    const replayMessage = replayMessages[i];
    const replayInfo = await (
      await fetch(
        "http://localhost:3000/info/message/?id=" +
          replayMessage.dataset.messageid
      )
    ).json();
    replayMessage.innerHTML = `Replay to ${replayInfo.name}: ${replayInfo.message}`;
    replayMessage.removeAttribute("replay");
  }
};

loadReplay();
