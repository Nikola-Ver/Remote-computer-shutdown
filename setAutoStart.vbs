Set WshShell=WScript.CreateObject("WSCript.shell")
WshShell.CurrentDirectory = "C:\Remote-computer-shutdown"
RetCode=WshShell.Run("hiddenStartWin.vbs",0,False)