@echo off
SET CSFILE=%~dp0Get-VS7.cs
powershell -ExecutionPolicy Unrestricted -Command "&{ Add-Type -Path %CSFILE%; [VisualStudioConfiguration.Program]::Main(@())}"