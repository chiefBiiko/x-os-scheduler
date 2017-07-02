schtasks.exe /change /tn "%1" /disable
schtasks.exe /end /tn "%1"
schtasks.exe /delete /tn "%1" /f