const { networkInterfaces } = require("os");
const nets = networkInterfaces();

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    if (net.family === "IPv4" && !net.internal) {
      if (
        name.includes("Беспроводная сеть") ||
        name.includes("Wireless network") ||
        name === "Ethernet" ||
        name.includes("Wi-Fi")
      )
      console.log(`http://${net.address}:3000`);
    }
  }
}

