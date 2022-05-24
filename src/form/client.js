function startProgram() {
  document.body.style = "";
  const socket = io();
  let timeSleep = null;
  let intervalId = null;
  let intervalId10 = null;
  let countCalls = 0;
  let flagVibrate = true;
  let flagPhone =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent
    );

  const hintTime = document.getElementById("hint-time");
  const timeInput = document.getElementById("time");

  timeInput.onkeyup = (e) => {
    const countColon = timeInput.value.split(":").length;
    if (countColon === 2) {
      hintTime.textContent = "Minutes : Seconds";
    } else if (countColon === 3) {
      hintTime.textContent = "Hours : Minutes : Seconds";
    } else {
      hintTime.textContent = "Seconds";
    }
  };

  socket.on("time", (time) => {
    timeSleep = time;
    document.getElementById("submit").style.display = "none";
    timeInput.style.display = "none";
    document.getElementById("stop").style.display = "";
    intervalId = showTime();
  });

  socket.emit("time", JSON.stringify(null));

  document.getElementById("submit").onclick = (e) => {
    if (timeInput.value.toLowerCase() === "on") {
      try {
        flagVibrate && window.navigator.vibrate(300);
      } catch {}
      flagBlockDisplayVolume = false;
      timeInput.value = "";
      return;
    }

    if (timeInput.value.toLowerCase() === "off") {
      try {
        flagVibrate && window.navigator.vibrate(300);
      } catch {}
      flagBlockDisplayVolume = true;
      timeInput.value = "";
      return;
    }

    if (timeInput.value.length === 0) timeInput.value = "0";
    const timer = getSeconds(timeInput.value);

    timeSleep = new Date().getTime() + timer * 1000;
    if (isNaN(timeSleep)) return;

    if (timer < 10) countCalls = 11 - timer;

    try {
      flagVibrate && window.navigator.vibrate(300);
    } catch {}

    document.getElementById("submit").style.display = "none";
    timeInput.style.display = "none";
    if (timeInput.value === "0")
      document.getElementById("stop").style.display = "none";
    else document.getElementById("stop").style.display = "";

    socket.emit(
      "time",
      JSON.stringify({
        timeSleep,
        timer,
      })
    );

    intervalId = showTime();
  };

  document.getElementById("stop").onclick = () => {
    if (intervalId) {
      try {
        flagVibrate && window.navigator.vibrate([200, 100, 100]);
      } catch {}
      if (intervalId10) {
        clearInterval(intervalId10);
        intervalId10 = null;
        countCalls = 0;
      }
      document.getElementById("submit").style.display = "";
      timeInput.style.display = "";
      document.getElementById("stop").style.display = "none";
      clearInterval(intervalId);
      intervalId = null;
      document.getElementById("time-left").textContent = "";
      socket.emit("stop");
    }
  };

  function timeFormat(timerSeconds) {
    let hours = Math.trunc((timerSeconds / 60 / 60) % 60);
    let minutes = Math.trunc((timerSeconds / 60) % 60);
    let seconds = timerSeconds % 60;

    return `${(hours < 10 ? "0" : "") + hours}:${
      (minutes < 10 ? "0" : "") + minutes
    }:${(seconds < 10 ? "0" : "") + seconds}`;
  }

  function showTime() {
    return setInterval(() => {
      const timeLeft = timeSleep - new Date().getTime();
      document.getElementById("time-left").innerHTML = timeFormat(
        Math.trunc(timeLeft / 1000)
      );
      if (!intervalId10 && timeLeft / 1000 <= 11)
        intervalId10 = setInterval(() => {
          if (countCalls < 10) {
            flagVibrate && window.navigator.vibrate([200]);
            countCalls++;
          } else {
            clearInterval(intervalId10);
            intervalId10 = null;
            countCalls = 0;
          }
        }, 1000);
      if (timeSleep - new Date().getTime() <= 0) {
        try {
          flagVibrate && window.navigator.vibrate([300, 200, 100, 100, 100]);
        } catch {}
        clearInterval(intervalId);
        document.getElementById("time-left").textContent = "";
        document.getElementById("stop").style.display = "none";
        window.close();
      }
    }, 100);
  }

  function showMessage(msg) {
    try {
      window.navigator.vibrate([300, 200, 100, 100, 100]);
    } catch {}
    const messageBox = document.getElementById("message");
    const messageText = document.getElementById("message-text");
    if (messageBox.classList.contains("off"))
      messageBox.classList.remove("off");
    messageText.textContent = msg;
    setTimeout(() => {
      messageBox.classList.add("off");
    }, 2000);
  }

  let flagNotBody = false;
  let idTimerBody = 0;
  let numberOfClicks = 0;
  if (flagPhone)
    document.body.ontouchstart = (e) => {
      if (e.target === backward) backwardDown();
      else if (e.target === pause) pausePress();
      else if (e.target === forwards) forwardsDown();
      numberOfClicks++;
      if (idTimerBody === 0)
        idTimerBody = setTimeout(() => {
          if (numberOfClicks === 1) {
            if (e.path.length === 4 && !flagNotBody) mouseDown(e);
            if (e.target !== document.body) flagNotBody = true;
            else flagNotBody = false;
          } else if (numberOfClicks === 2) {
            flagVibrate = !flagVibrate;
            if (flagVibrate) showMessage("Vibration on");
            else showMessage("Vibration off");
          } else if (numberOfClicks > 2) {
            const el = document.documentElement;
            const rfs =
              el.requestFullScreen ||
              el.webkitRequestFullScreen ||
              el.mozRequestFullScreen;
            rfs.call(el);
          }
          idTimerBody = 0;
          numberOfClicks = 0;
        }, 50);
    };

  function getSeconds(time) {
    const times = time.split(":");
    if (times.length === 3) {
      return (
        Number.parseInt(times[0].length ? times[0] : "0") * 3600 +
        Number.parseInt(times[1].length ? times[1] : "0") * 60 +
        Number.parseInt(times[2].length ? times[2] : "0")
      );
    } else if (times.length === 2) {
      return (
        Number.parseInt(times[0].length ? times[0] : "0") * 60 +
        Number.parseInt(times[1].length ? times[1] : "0")
      );
    } else {
      return Number.parseInt(times[0].length ? times[0] : "0");
    }
  }

  const volText = document.getElementById("vol-text");
  const volValText = document.getElementById("volume-value");
  function changeVol(vol) {
    document.documentElement.style.setProperty(
      "--vol-value",
      String(vol) + "%"
    );
    volText.textContent = String(vol) + "%";
    volValText.textContent = String(vol) + "%";
  }

  let currentVol = 20;
  let shift = 0;
  socket.on("volume", (vol) => {
    currentVol = JSON.parse(vol);
    changeVol(currentVol);
  });

  let flagBlockDisplayVolume = true;
  const volumeButton = document.getElementById("volume-button");
  let flagMouseDownVolume = false;
  let startPosVolume = 0;

  function mouseDownVolume(e) {
    flagMouseDownVolume = true;
    startPosVolume = e.screenX ? e.screenX : e.changedTouches[0].screenX;
  }

  function mouseMoveVolume(e) {
    if (flagMouseDownVolume) {
      console.log("yes 1");
      shift = Math.ceil(
        ((startPosVolume -
          (e.screenX ? e.screenX : e.changedTouches[0].screenX)) /
          document.body.clientWidth) *
          2 *
          100
      );
      let vol =
        currentVol - shift < 0
          ? 0
          : currentVol - shift > 100
          ? 100
          : currentVol - shift;
      changeVol(vol);
    }
  }

  function mouseUpVolume(e) {
    if (flagMouseDownVolume) {
      flagMouseDownVolume = false;
      currentVol =
        currentVol - shift < 0
          ? 0
          : currentVol - shift > 100
          ? 100
          : currentVol - shift;
      socket.emit("volume", JSON.stringify(currentVol));
    }
  }

  if (flagPhone)
    volumeButton.ontouchstart = (e) => {
      mouseDownVolume(e);
    };
  else
    volumeButton.onmousedown = (e) => {
      mouseDownVolume(e);
    };

  const volBox = document.getElementById("vol-box");
  let flagMouseDown = false;
  let startPos = 0;
  let flagVisible = false;
  let idTimer = 0;

  function mouseDown(e) {
    if (idTimer !== 0) {
      clearTimeout(idTimer);
      idTimer = 0;
    }
    idTimer = setTimeout(() => {
      if (!flagBlockDisplayVolume) {
        volBox.style.display = "flex";
        flagMouseDown = true;
        startPos = e.screenY ? e.screenY : e.changedTouches[0].screenY;
        idTimer = 0;
      }
    }, 250);
  }

  function mouseMove(e) {
    if (flagMouseDown && !flagBlockDisplayVolume) {
      shift = Math.ceil(
        (((e.screenY ? e.screenY : e.changedTouches[0].screenY) - startPos) /
          document.body.clientHeight) *
          100
      );
      let vol =
        currentVol - shift < 0
          ? 0
          : currentVol - shift > 100
          ? 100
          : currentVol - shift;
      changeVol(vol);
    }
  }

  function mouseUp(e) {
    if (idTimer !== 0) {
      clearTimeout(idTimer);
      idTimer = 0;
    }
    if (flagMouseDown && !flagBlockDisplayVolume) {
      flagMouseDown = false;
      volBox.style.display = "none";
      currentVol =
        currentVol - shift < 0
          ? 0
          : currentVol - shift > 100
          ? 100
          : currentVol - shift;
      socket.emit("volume", JSON.stringify(currentVol));
    }
  }

  if (!flagPhone) {
    document.body.onmousedown = (e) => {
      if (e.path.length === 4 && !flagNotBody) mouseDown(e);
      if (e.target !== document.body) flagNotBody = true;
      else flagNotBody = false;
    };
    document.body.onmousemove = (e) => {
      mouseMove(e);
      mouseMoveVolume(e);
      mouseMoveMediaSwitch(e);
    };
    document.body.onmouseup = (e) => {
      mouseUp(e);
      mouseUpVolume(e);
      mouseUpMediaSwitch(e);
      backwardUp();
      forwardsUp();
    };
  } else {
    document.body.ontouchmove = (e) => {
      mouseMove(e);
      mouseMoveVolume(e);
      mouseMoveMediaSwitch(e);
    };
    document.body.ontouchend = (e) => {
      mouseUp(e);
      mouseUpVolume(e);
      mouseUpMediaSwitch(e);
      backwardUp();
      forwardsUp();
    };
  }

  // Media
  let flagDownMediaSwitch = false;
  let startPosMediaSwitch = 0;
  let prevDelta = 0;
  let delta = 0;

  const mediaSwitcher = document.getElementById("media-switch");
  const mediaBox = document.getElementById("media-box");

  function mouseDownMediaSwitch(e) {
    mediaBox.className = "";
    flagDownMediaSwitch = true;
    startPosMediaSwitch = e.screenY ? e.screenY : e.changedTouches[0].screenY;
  }

  function mouseMoveMediaSwitch(e) {
    if (flagDownMediaSwitch) {
      delta =
        ((e.screenY ? e.screenY : e.changedTouches[0].screenY) -
          startPosMediaSwitch) /
          120 +
        prevDelta;
      if (delta > 0 && delta < 1) {
        document.documentElement.style.setProperty(
          "--media-height",
          String(delta)
        );
      } else if (delta < 0) {
        delta = 0;
        document.documentElement.style.setProperty("--media-height", String(0));
      } else if (delta > 1) {
        delta = 1;
        document.documentElement.style.setProperty("--media-height", String(1));
      }
    }
  }

  function mouseUpMediaSwitch(e) {
    mediaBox.className = "transition";
    flagDownMediaSwitch = false;
    if (delta > 0.5) {
      delta = 1;
      document.documentElement.style.setProperty("--media-height", String(1));
    } else {
      delta = 0;
      document.documentElement.style.setProperty("--media-height", String(0));
    }
    prevDelta = delta;
  }

  if (flagPhone) {
    mediaBox.ontouchstart = (e) => {
      mouseDownMediaSwitch(e);
    };
    mediaBox.ontouchend = (e) => {
      mouseUp(e);
      mouseUpMediaSwitch(e);
    };
  } else {
    mediaBox.onmousedown = (e) => {
      mouseDownMediaSwitch(e);
    };
  }

  // Media keys

  let flagDownBackward = false;
  let flagDownForwards = false;

  const backward = document.getElementById("backward");
  const pause = document.getElementById("pause");
  const forwards = document.getElementById("forwards");

  function backwardDown() {
    flagDownBackward = true;
    socket.emit("media", JSON.stringify("backward down"));
  }

  function backwardUp() {
    if (flagDownBackward) {
      flagDownBackward = false;
      socket.emit("media", JSON.stringify("backward up"));
    }
  }

  function pausePress() {
    socket.emit("media", JSON.stringify("pause press"));
  }

  function forwardsDown() {
    flagDownForwards = true;
    socket.emit("media", JSON.stringify("forwards down"));
  }

  function forwardsUp() {
    if (flagDownForwards) {
      flagDownForwards = false;
      socket.emit("media", JSON.stringify("forwards up"));
    }
  }

  if (!flagPhone) {
    backward.onmousedown = () => {
      backwardDown();
    };
    pause.onmousedown = () => {
      pausePress();
    };
    forwards.onmousedown = () => {
      forwardsDown();
    };
  }
}

const endPoint = ((l) => l.protocol + "//" + l.hostname + ":4002")(
  window.location
);

async function enterAccessKey() {
  const accessKey = prompt("Enter access key");
  const res = await fetch(`${endPoint}/accessKey`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessKey }),
  });
  const canUse = await res.json();
  if (canUse) {
    startProgram();
  } else {
    alert("The access key was entered incorrectly");
    enterAccessKey();
  }
}

enterAccessKey();
