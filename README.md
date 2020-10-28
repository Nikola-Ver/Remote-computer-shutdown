# Remote-computer-shutdown

Love to watch autoplay movies and TV shows but hate getting out of bed to turn off your computer? Then this is the program for you!

The program can remotely shutdown your computer from any device (if the device and the computer are on the same network).

## It requires

### Start the server on your computer along with the series

- Open a file called startWin (startWin.bat if you work from windows operating system) or start (start.sh if work from other systems)

### Go to the specified address from any device

- The address is shown in the picture (http:\\\\192.168.43.82:3000):

<p align="center">
<img src="form\img\readme\start.png" />
</p>

- Then you can close the console and run the program in the background hiddenStartWin (hiddenStartWin.vbs), works only on Windows

### Setting autorun on computer startup

- If you want to set automatic startup, then moved the folder with the program to the C drive. Then hold down the Win button and press the R button, enter "shell:startup" in the field that appears, press Enter. Then move there the file called setAutoStart (setAutoStart.bat) from the program files (Remote-computer-shutdown, Remote-computer-shutdown\setAutoStart.bat). The program will now start automatically

### <a href="https://ichip.ru/sovety/ekspluataciya/kak-uznat-svoy-ili-chuzhoy-ip-adres-656332#:~:text=%D0%92%D1%8B%20%D0%BC%D0%BE%D0%B6%D0%B5%D1%82%D0%B5%20%D0%BB%D0%B5%D0%B3%D0%BA%D0%BE%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D0%B2%D0%B0%D1%88%20%D1%81%D0%BE%D0%B1%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9%20IP%2D%D0%B0%D0%B4%D1%80%D0%B5%D1%81&text=%D0%9E%D1%82%D0%BA%D1%80%D0%BE%D0%B9%D1%82%D0%B5%20CMD%3A%20%D0%B4%D0%BB%D1%8F%20%D1%8D%D1%82%D0%BE%D0%B3%D0%BE%20%D0%BE%D0%B4%D0%BD%D0%BE%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D0%BE,%D0%BF%D0%BE%D0%BB%D0%B5%20%C2%ABIPv4%2D%D0%B0%D0%B4%D1%80%D0%B5%D1%81%C2%BB.">Determining the ip of the computer</a>

- Open CMD: to do this, simultaneously press Win + R. In the window that appears, enter "cmd" and confirm your choice by clicking on "OK". Now enter "ipconfig" at the command line. You can find your IP address in the "IPv4 Address" field.

### Set the timer or stop it (especially for "well, this is definitely the last episode")

- Time can be set in: seconds, minutes: seconds, hours: minutes: seconds

<p align="center">
<img src="form\img\readme\shutdown.gif" />
</p>

- Also you can only enter hours, minutes or seconds

<p align="center">
<img src="form\img\readme\shutdown-without.gif" />
</p>

### You can turn vibration on and off by placing two fingers on the screen

<p align="center">
<img src="form\img\readme\switch-vibration.gif" />
</p>

### By putting three fingers on the screen, you can go to full screen mode

P. s. To start, you must also download the <a href="https://nodejs.org/en/download/">Node js</a>.

Happy viewing! :)
