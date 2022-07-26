export let replayId = null;

const replayBox = document.getElementById("replayBox");

window.replay = (messageElement) => {
    replayId = messageElement.dataset.messageid;
    replayBox.querySelector("p").innerHTML = messageElement.querySelector("p").innerHTML;
    replayBox.classList.remove("hidden");
    replayBox.classList.add("flex");
}
window.unReplay = () => {
    replayId = null;
    replayBox.classList.add("hidden");
    replayBox.classList.remove("flex");
}