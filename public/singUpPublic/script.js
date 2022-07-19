function typinggg() {
    const input1 = document.getElementById("input1").value,
    input2 = document.getElementById("input2").value;
    if (input1 == "" || input2 == "") {
        document.getElementById("btnSubmit").disabled = true;
    }
    else {
        document.getElementById("btnSubmit").disabled = false;
    }
}