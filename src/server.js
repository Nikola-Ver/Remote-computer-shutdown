const { port: PORT, accessKey: ACCESS_KEY } = require("./settings.json");
const exec = require("child_process").exec;
const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const loudness = require("loudness");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./firebase");
const isWin = /^win/.test(process.platform);

let volume = 0;
(async () => {
  volume = await loudness.getVolume();
})();

// Get local IP
const { networkInterfaces } = require("os");
const nets = networkInterfaces();
let serverAddress = "";

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    if ((net.family === "IPv4" || net.family === 4) && !net.internal) {
      if (
        name.includes("Беспроводная сеть") ||
        name.includes("Wireless network") ||
        name === "Ethernet" ||
        name.includes("Wi-Fi") ||
        name.includes("en0")
      )
        serverAddress = `${net.address}:${PORT}`;
    }
  }
}

app
  .use(cors({ origin: "*" }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, "form")))
  .post("/accessKey", (req, res) => {
    res.send(ACCESS_KEY === req.body.accessKey);
  });
let timeSleep = null;
let timerId = null;

io.on("connection", (socket) => {
  socket.emit("volume", JSON.stringify(volume));

  socket.on("time", (time) => {
    if (JSON.parse(time)) {
      timeSleep = JSON.parse(time).timeSleep;
      const timer = JSON.parse(time).timer;
      console.log(timer);
      console.info(`The computer will turn off after ${timeFormat(timer)}`);

      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        exec(isWin ? `shutdown -s -t 0` : `sudo shutdown -h now`, () => {});
      }, timer * 1000);
    } else {
      if (timeSleep) socket.emit("time", timeSleep);
    }
  });

  socket.on("volume", async (vol) => {
    volume = JSON.parse(vol);
    if (volume === 0) await loudness.setMuted(true);
    else {
      await loudness.setMuted(false);
      await loudness.setVolume(volume);
    }
    socket.emit("volume", JSON.stringify(volume));
  });

  socket.on("stop", () => {
    if (timerId) {
      clearTimeout(timerId);
      timeSleep = null;
      timerId = null;
      console.log("The timer has been stopped");
    }
  });

  let idTimerBackward = 0;
  let idTimerForwards = 0;
  socket.on("media", (data) => {
    const command = JSON.parse(data);
    if (command === "backward down") {
      if (idTimerBackward === 0) {
        exec(
          isWin
            ? `start simulating_keystrokes/backward.vbs`
            : `exec simulating_keystrokes/backward.sh`,
          function (error, stdout, stderr) {}
        );
        idTimerBackward = setInterval(() => {
          exec(
            isWin
              ? `start simulating_keystrokes/backward.vbs`
              : `exec simulating_keystrokes/backward.sh`,
            function (error, stdout, stderr) {}
          );
        }, 100);
      }
    } else if (command === "backward up") {
      if (idTimerBackward !== 0) {
        clearInterval(idTimerBackward);
        idTimerBackward = 0;
      }
    } else if (command === "pause press") {
      exec(
        isWin
          ? `start simulating_keystrokes/pause.vbs`
          : `exec simulating_keystrokes/pause.sh`,
        function (error, stdout, stderr) {}
      );
    } else if (command === "forwards down") {
      if (idTimerForwards === 0) {
        exec(
          isWin
            ? `start simulating_keystrokes/forwards.vbs`
            : `exec simulating_keystrokes/forwards.sh`,
          function (error, stdout, stderr) {}
        );
        idTimerForwards = setInterval(() => {
          exec(
            isWin
              ? `start simulating_keystrokes/forwards.vbs`
              : `exec simulating_keystrokes/forwards.sh`,
            function (error, stdout, stderr) {}
          );
        }, 100);
      }
    } else if (command === "forwards up") {
      if (idTimerForwards !== 0) {
        clearInterval(idTimerForwards);
        idTimerForwards = 0;
      }
    }
  });
});

server.listen(PORT, () =>
  console.info(`\nThe server is running\nhttp:\\\\${serverAddress}\n`)
);

function timeFormat(seconds) {
  return `${Math.trunc((seconds / 60 / 60) % 60)} hours ${Math.trunc(
    (seconds / 60) % 60
  )} minutes ${seconds % 60} seconds`;
}
