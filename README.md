# Remote-computer-shutdown

Love to watch autoplay movies and TV shows but hate getting out of bed to turn off your computer? Then this is the program for you!

The program can remotely shutdown your computer from any device (if the device and the computer are on the same network)

## Overview

### Setting the timer to turn off

- The timer can be set: in seconds, in minutes : seconds, in hours : minutes : seconds

<p align="center">
<img src="src\form\img\readme\set-timer.gif" width="350" />
</p>

- You can also skip numbers when setting the timer

<p align="center">
<img src="src\form\img\readme\set-timer-with-skip.gif" width="350" />
</p>

- If you do not enter anything in the input field of the timer, and press "start", then the computer will shut down early

### Media buttons

- Using the media buttons, you can: rewind, stop playback, rewind, change the computer volume

<p align="center">
<img src="src\form\img\readme\media.gif" width="350" />
</p>

### On-screen volume control

- To turn on the on-screen volume control, you must enter "on" in the input field of the timer, then press "start". To turn off the on-screen volume control, you must enter "off" in the input field of the timer, and then press "start".
  After you have turned on the on-screen volume control, you can change the volume of the computer by holding the cursor in an empty space and moving it up or down

<p align="center">
<img src="src\form\img\readme\display-volume.gif" width="350" />
</p>

### Turning vibrations on and off

- To turn vibrations on or off, hold two fingers on the screen

<p align="center">
<img src="src\form\img\readme\set-vibration.gif" width="350" />
</p>

### Full screen mode

- To enter full screen mode, you need to hold 3 fingers on the screen

### Running the program

- To start the program, you need to go to the "start_program" folder, after which you need to run the "start" ("start.bat") or "hiddenStart" ("hiddenStart.vbs") file. The first file runs the program in the console, after which the program can be closed if desired, and the second file runs the program in the background. To close a program in the background, you will need to find it in the task manager and close it yourself

- To find out the address to which you need to go, run "getAddress" ("getAddress.bat"), which is located in the "get_address" folder. Then go from any device to the specified address, for example "http://192.168.100.4:3000/"

<p align="center">
<img src="src\form\img\readme\get-address.png" />
</p>

Detailed installation instructions are in the "<a href="installation">installation</a>" folder

Happy viewing :)
