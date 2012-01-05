@ECHO OFF
SET NANT_HOME=%CD%"\tools\nant-0.91\bin"

"%NANT_HOME%\nant.exe" -buildfile:default.build -t:net-4.0 %1
PAUSE