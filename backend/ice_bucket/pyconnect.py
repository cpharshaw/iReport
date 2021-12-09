import pyodbc

 

conn = pyodbc.connect(
                      'Driver={SQL Server};'
                      'Server=OH01PSQL97;'
                      'Database=BI_Presentation;'
                      'Trusted_Connection=yes;')

 

cursor = conn.cursor()
query = cursor.execute("""

 

    SELECT top(2) * FROM BI_Presentation.MIPortfolioMonthlyData.MIPolicyMonthlySummary

 

""")