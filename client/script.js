const socket = io("http://localhost:3003");

const sendMessageForm = document.getElementById("send-message-form");
const joinRoomForm = document.getElementById("join-room-form");
const messageDiv = document.getElementById("messages-div");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");

const createNewMessageDiv = (value, from) => {
  const newMessageDiv = document.createElement("div");
  newMessageDiv.style.padding = "4px";
  newMessageDiv.style.textAlign = from === "client" ? "right" : "left";
  newMessageDiv.style.backgroundColor =
    from === "client" ? "#b5d1ff" : "#ffffff";
  newMessageDiv.style.border = "1px solid black";
  newMessageDiv.innerHTML = value;
  messageDiv.appendChild(newMessageDiv);
};

sendMessageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  createNewMessageDiv(messageInput.value, "client");

  if (roomInput.value.length > 0) {
    socket.emit("send-message-to-room", {
      message: messageInput.value,
      room: roomInput.value || undefined,
    });
  } else {
    socket.emit("send-message", messageInput.value);
  }

  messageInput.value = "";
});

joinRoomForm.addEventListener("submit", (e) => {
  e.preventDefault();

  socket.emit("join-room", roomInput.value);
});

socket.on("connect", (client) => {});

socket.on("reply-message", (message) => {
  console.log("message received: " + message);
  createNewMessageDiv(message, "server");
});
