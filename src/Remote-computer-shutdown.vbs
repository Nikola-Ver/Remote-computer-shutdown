Set WshShell=WScript.CreateObject("WSCript.shell")
WshShell.CurrentDirectory = "C:\Remote-computer-shutdown\src"
RetCode=WshShell.Run("hiddenStart.vbs",0,False)