Set WshShell=WScript.CreateObject("WSCript.shell")
WshShell.CurrentDirectory = "C:\Remote-computer-shutdown\src\start_program"
RetCode=WshShell.Run("hiddenStart.vbs",0,False)