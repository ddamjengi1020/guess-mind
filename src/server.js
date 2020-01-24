import express from "express";
import logger from "morgan";
import { join } from "path";
import dotenv from "dotenv";
import socketIO from "socket.io";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000;

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res) => {
  res.render("main");
});

const handleListening = () => {
  console.log(`🟢  Server running : http://localhost:${PORT}`);
};

const server = app.listen(PORT, handleListening);
const io = socketIO.listen(server);

io.on("connection", socket => {
  socket.on("client hello", () => {
    setTimeout(() => {
      console.log("client hi!");
    }, 5000);
  });

  setTimeout(() => {
    socket.emit("server hello");
  }, 6000);
});
