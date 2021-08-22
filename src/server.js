const PORT = 3000;
const exec = require('child_process').exec;
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const loudness = require('loudness');
require('./firebase');

let volume = 0;
(async () => {
  volume = await loudness.getVolume();
})();

// Get local IP
const { networkInterfaces } = require('os');
const nets = networkInterfaces();
let serverAddress = '';

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    if (net.family === 'IPv4' && !net.internal) {
      if (
        name.includes('Беспроводная сеть') ||
        name.includes('Wireless network') ||
        name === 'Ethernet' ||
        name.includes('Wi-Fi')
      )
        serverAddress = `${net.address}:${PORT}`;
    }
  }
}

app.use(express.static(path.join(__dirname, 'form')));
let timeSleep = null;
let timerId = null;

io.on('connection', (socket) => {
  socket.emit('volume', JSON.stringify(volume));

  socket.on('time', (time) => {
    if (JSON.parse(time)) {
      timeSleep = JSON.parse(time).timeSleep;
      const timer = JSON.parse(time).timer;
      console.log(timer);
      console.info(`The computer will turn off after ${timeFormat(timer)}`);

      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        exec(`shutdown -s -t 0`, function (error, stdout, stderr) {
          if (error)
            exec(`sudo shutdown -h now`, function (error, stdout, stderr) {});
        });
      }, timer * 1000);
    } else {
      if (timeSleep) socket.emit('time', timeSleep);
    }
  });

  socket.on('volume', async (vol) => {
    volume = JSON.parse(vol);
    if (volume === 0) await loudness.setMuted(true);
    else {
      await loudness.setMuted(false);
      await loudness.setVolume(volume);
    }
    socket.emit('volume', JSON.stringify(volume));
  });

  socket.on('stop', () => {
    if (timerId) {
      clearTimeout(timerId);
      timeSleep = null;
      timerId = null;
      console.log('The timer has been stopped');
    }
  });

  let idTimerBackward = 0;
  let idTimerForwards = 0;
  socket.on('media', (data) => {
    const command = JSON.parse(data);
    if (command === 'backward down') {
      if (idTimerBackward === 0) {
        exec(
          `start simulating_keystrokes/backward.vbs`,
          function (error, stdout, stderr) {}
        );
        idTimerBackward = setInterval(() => {
          exec(
            `start simulating_keystrokes/backward.vbs`,
            function (error, stdout, stderr) {}
          );
        }, 100);
      }
    } else if (command === 'backward up') {
      if (idTimerBackward !== 0) {
        clearInterval(idTimerBackward);
        idTimerBackward = 0;
      }
    } else if (command === 'pause press') {
      exec(
        `start simulating_keystrokes/pause.vbs`,
        function (error, stdout, stderr) {}
      );
    } else if (command === 'forwards down') {
      if (idTimerForwards === 0) {
        exec(
          `start simulating_keystrokes/forwards.vbs`,
          function (error, stdout, stderr) {}
        );
        idTimerForwards = setInterval(() => {
          exec(
            `start simulating_keystrokes/forwards.vbs`,
            function (error, stdout, stderr) {}
          );
        }, 100);
      }
    } else if (command === 'forwards up') {
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
