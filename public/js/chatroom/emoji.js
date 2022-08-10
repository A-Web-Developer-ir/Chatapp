export function registerEmojies(inputElem) {
  const emojies = document.getElementsByClassName("emoji");
  for (let i = 0; i < emojies.length; i++) {
    emojies[i].addEventListener("click", () => {
      inputElem.value += emojies[i].innerHTML;
    });
  }
}
