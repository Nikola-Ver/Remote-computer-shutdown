require('dotenv').config({ path: './.env' });
const exec = require('child_process').exec;
const os = require('os');
const firebase = require('firebase');
const notifier = require('node-notifier');

const CONNECTION_UPDATE_TIME = 5 * 1000;
const WAKE_UP_TIME = 30 * 1000;
const PING_TIME = 5 * 60 * 1000;

function checkConnection() {
  require('dns').resolve('www.google.com', (err) => {
    if (err) {
      setTimeout(checkConnection, CONNECTION_UPDATE_TIME);
    } else {
      run();
    }
  });
}
checkConnection();

function run() {
  firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
  });

  const firestore = firebase.firestore();

  const nets = os.networkInterfaces();
  let ipAddress = '';
  let macAddress = '';

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        if (
          name.includes('Беспроводная сеть') ||
          name.includes('Wireless network') ||
          name === 'Ethernet' ||
          name.includes('Wi-Fi')
        ) {
          ipAddress = net.address;
          macAddress = net.mac;
        }
      }
    }
  }

  function shutdown() {
    exec(`shutdown -s -t 0`, function (error, stdout, stderr) {
      if (error)
        exec(`sudo shutdown -h now`, function (error, stdout, stderr) {});
    });
  }

  async function showMessage(message) {
    if (message.indexOf('http') === 0 && !/ /.test(message)) {
      const start =
        process.platform == 'darwin'
          ? 'open'
          : process.platform == 'win32'
          ? 'start'
          : 'xdg-open';
      exec(start + ' ' + message);
    } else {
      notifier.notify({
        title: 'Remote computer shutdown',
        message,
        icon: './form/img/logo.png',
        sound: true,
        wait: true,
      });
    }

    const { status, lastAction } = (
      await firestore.collection('computers').doc(macAddress).get()
    ).data();

    await firestore
      .collection('computers')
      .doc(macAddress)
      .set({
        name: os.hostname(),
        localIp: ipAddress,
        status,
        lastAction,
        pingTime: new Date().toLocaleString('ru').replace(/\//g, '.'),
        userName: os.userInfo().username,
        message: '',
      });
  }

  (async () => {
    let canOff = false;

    setTimeout(() => {
      canOff = true;
      (async () => {
        const { status } = (
          await firestore.collection('computers').doc(macAddress).get()
        ).data();

        if (!status) shutdown();
        else {
          setInterval(async () => {
            const { lastAction, message } = (
              await firestore.collection('computers').doc(macAddress).get()
            ).data();

            await firestore
              .collection('computers')
              .doc(macAddress)
              .set({
                name: os.hostname(),
                localIp: ipAddress,
                status: true,
                pingTime: new Date().toLocaleString('ru').replace(/\//g, '.'),
                userName: os.userInfo().username,
                lastAction,
                message,
              });
          }, PING_TIME);
        }
      })();
    }, WAKE_UP_TIME);

    await firestore
      .collection('computers')
      .doc(macAddress)
      .set({
        name: os.hostname(),
        localIp: ipAddress,
        status: true,
        pingTime: new Date().toLocaleString('ru').replace(/\//g, '.'),
        lastAction: new Date().toLocaleString('ru').replace(/\//g, '.'),
        userName: os.userInfo().username,
        message: '',
      });

    firestore
      .collection('computers')
      .doc(macAddress)
      .onSnapshot((doc) => {
        const { status, message } = doc.data();
        if (!status && canOff) shutdown();
        if (message.length) showMessage(message);
      });
  })();
}
