function response(forgiven) {
    let message = document.getElementById("response-message");
    
    if (forgiven) {
        message.innerHTML = "¡Gracias por perdonarme! Prometo que aprenderé de esto ❤️";
        message.style.color = "#4caf50";
    } else {
        message.innerHTML = "Lo entiendo, tomaré el tiempo que necesites. Pero siempre estaré aquí para ti. 💔";
        message.style.color = "#ff5722";
    }
}
