
'Create an Excel object
Set objExcel = CreateObject ("Excel.Application")

'Make it visible (optional)
objExcel.Visible = True

'Open a workbook
Set objWorkbook = objExcel.Workbooks.Open ("C:\Users\ADMIN\Downloads\AutomationCode\Sample.xlsm")

'Do something with the workbook (optional)
objWorkbook.Worksheets ("Sheet1").Range ("A1").Value = 5

Dim value
value = objWorkbook.Worksheets ("Sheet1").Range ("A1").Value
WScript.Echo value

'Save and close the workbook
objWorkbook.Close True

'Quit Excel
objExcel.Quit

'Release the objects
Set objWorkbook = Nothing
Set objExcel = Nothing