import pymysql, pandas as pd
from datetime import datetime, timedelta

# 서버 데이터 베이스 접속 함수
def get_connect1():    
    conn = pymysql.connect(
        host="database-1.cjfyk8ntjeyl.ap-northeast-2.rds.amazonaws.com",
        user = "gudgement",
        password = "d106gudgement",
        db = "gudgement",
        charset= "utf8"
    )

    return conn

# # 로컬 데이터 베이스 접속 함수
# def get_connect2():
#     conn = pymysql.connect(
#         host="localhost",
#         charset= "utf8"
#     )

#     return conn

# 해당 일의 주차를 계산하는 함수
def week_of_month(year, month, day):
    now = datetime(year, month, day)

    # 이번 달 첫날 가져오기
    first_day_of_month = now.replace(day=1)

    # 이번 달 첫날이 월요일부터 시작하는 주차를 구하기
    if first_day_of_month.weekday() == 6:  # 일요일인 경우, 다음주로 간주
        first_week_number = first_day_of_month.isocalendar()[1] + 1
    else:
        first_week_number = first_day_of_month.isocalendar()[1]

    # 오늘의 주차와 첫날의 주차 차이 계산하기 (월요일부터 일요일을 한 주로 간주)
    week_number_of_month = now.isocalendar()[1] - first_week_number + 1

    if (week_number_of_month == 0):
        week_number_of_month = 1
    elif (week_number_of_month == 6):
        week_number_of_month = 5

    return week_number_of_month

# 해당하는 일자의 월 차트 데이터를 가져올 함수
def get_Member_Month_Chart(member_id, year, month):
    if (month == 0):
        month = 12
        year -= 1

    conn = get_connect1()
    cursor = conn.cursor()

    sql = 'SELECT * FROM chart WHERE member_id = %s AND year = %s AND month = %s'

    cursor.execute(sql, (member_id, year, month))

    chart_data = cursor.fetchall()
    conn.close()

    return chart_data

# 해당하는 달의 월 소비내역을 가져오는 함수
def get_Member_Month_Transaction_History(virtualId, year, month):
    if (month == 0):
        month = 12
        year -= 1

    this_month = datetime(year, month, 1)

    if (month % 12 == 0):
        year += 1

    next_month = datetime(year, month % 12 + 1, 1) - timedelta(seconds=1)

    conn = get_connect1()

    sql = 'SELECT * FROM transaction_history WHERE virtual_account_id = %s AND transaction_date >= %s AND transaction_date <= %s'
    
    df = pd.read_sql_query(sql, conn,
                           params=(virtualId, this_month.strftime('%Y-%m-%d %H:%M:%S'), next_month.strftime('%Y-%m-%d %H:%M:%S')))

    conn.close()

    return df

# +-10만원 과소비 기준을 가진 인원들을 찾아 데이터화 하는 함수
# Member 객체를 찾아야함, 필요한 기준 : 목표 금액 (Nan제외), 
def compare_to_member(month_overconsumption):
    sql = 'SELECT * FROM member WHERE month_overconsumption IS NOT NULL AND month_overconsumption >= %s AND month_overconsumption <= %s'
    
    conn = get_connect1()

    df = pd.read_sql_query(sql, conn,
                           params=(month_overconsumption-100000, month_overconsumption+100000))

    conn.close()

    return df

# 현재 소비 금액 %(를 통한 정렬), 전체 데이터 개수와 나의 순위 %

# 달 분석 내용을 추가하는 함수
def insert_month_analyze(virtualId, year, month, best_amount, best_destination,
                         frequency_count, frequency_destination, frequency_amount, count, ranking,
                        last_month_amount, last_month_amount_rate, this_month_amount, this_month_amount_rate):
    
    conn = get_connect1()
    cursor = conn.cursor()

    sql = """INSERT INTO month_analyze 
        (year, month, virtual_account_id, best_amount, best_destination,
        frequency_count, frequency_destination, frequency_amount, count, ranking,
        last_month_amount, last_month_amount_rate, this_month_amount, this_month_amount_rate) 
        VALUES 
        (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);
        """
    
    values = (year, month, virtualId, best_amount, best_destination,
    frequency_count, frequency_destination, frequency_amount, count, ranking,
    last_month_amount, last_month_amount_rate, this_month_amount, this_month_amount_rate)
    
    cursor.execute(sql, values)
    conn.commit()
    conn.close()

    return

# 목표 금액 구하기 (년, 월에 맞는 목표 금액을 찾아야함)
def month_overconsumption_rate(member_id, year, month):
    member_chart = get_Member_Month_Chart(member_id, year, month)
    month_over = None
    for i in member_chart:
        if (i[5] != None):
            month_over = i[5]
    
    return month_over

# 지난 달 분석 리스트 있으면 가져오기
def last_month_analyze(virtualId, year, month):
    if (month == 0):
        month = 12
        year -= 1

    conn = get_connect1()
    cursor = conn.cursor()

    sql = 'SELECT * FROM month_analyze WHERE virtual_account_id = %s AND year = %s AND month = %s'

    cursor.execute(sql, (virtualId, year, month))

    analyze_data = cursor.fetchone()
    conn.close()

    return analyze_data

# 지난 달 분석 리스트 있으면 삭제하기
def delete_last_month_analyze(virtualId, year, month):
    if (month == 0):
        month = 12
        year -= 1

    conn = get_connect1()
    cursor = conn.cursor()

    sql = 'DELETE FROM month_analyze WHERE virtual_account_id = %s AND year = %s AND month = %s'

    cursor.execute(sql, (virtualId, year, month))

    conn.commit()
    conn.close()

    return "delete_ok"