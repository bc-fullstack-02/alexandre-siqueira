import io from "socket.io-client";

function messageRabbit() {
  /* const profile = localStorage.getItem("profile") as string; */
  const user = localStorage.getItem("user") as string;
  /* const token = localStorage.getItem("accessToken") */
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2Mzk0OTUxNzBlNDIwZDBjOWM4ZjE4YjAiLCJ1c2VyIjoibGl6emVyYSIsIl9fdiI6MCwicHJvZmlsZSI6IjYzOTQ5NTE3MGU0MjBkMGM5YzhmMThiMiJ9.9BFngbjirkhg7SD_Y9e6SovenGJHY_adwSWyFqEeTZE";
  const socket = io("http://localhost:4000/", { auth: { token } });

  socket.on("connect", () => {
    console.log(`connected as ${user}`);
  });

  socket.on("connect_profile", (profile) => {
    socket.profile = profile;
    console.log(`connected ${socket.profile.name}`);
  });

  socket.on("disconnect", () => {
    console.log(`status socket connected: ${socket.connected}`)
  });

  socket.on("post", (data) => {
    console.log("post: " + JSON.stringify(data))
  });

  socket.on("post-like", (data) => {
    console.log("post-like: " + JSON.stringify(data))
  });

  socket.on("comment", (data) => {
    console.log("comment: " + JSON.stringify(data))
  });

  socket.on("comment-like", (data) => {
    console.log("comment-like: " + JSON.stringify(data))
  });

  socket.on("follow", (data) => {
    console.log("follow: " + JSON.stringify(data) + "<br />")
  });

  socket.on("connect_error", (err) => {
    alert(err);
  });
}
export default messageRabbit
