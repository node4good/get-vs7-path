:: Copyright 2017 - Refael Ackermann
:: Distributed under MIT style license
:: See accompanying file LICENSE at https://github.com/node4good/windows-autoconf
:: version: 1.11.0

:: proper output starts with '    ' so we can filter debug output, but stay JSON transparent
@IF NOT DEFINED DEBUG_GETTER @ECHO OFF
SETLOCAL
SET PROMPT=$G
CALL "%~dp0check_VS2017_COM.cmd" > nul
IF ERRORLEVEL 1 (ECHO     ["No COM"]& EXIT /B)
SET CS_NAME="%~dp0..\tools-core\GetVS2017Configuration.cs"
SET CS_NAME2="%~dp0VS2017ConfigurationHelper.cs"
SET EXE_NAME="%~dp0GetVS2017Configuration.exe"
DEL /Q %EXE_NAME%
FOR /f %%I IN ('cmd /d /c dir /b /s %windir%\Microsoft.NET\Framework\csc.exe') DO SET CSC=%%I
%CSC% /out:%EXE_NAME% %CS_NAME% %CS_NAME2% > csc.log
%EXE_NAME%
