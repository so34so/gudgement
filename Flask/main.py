import db
from flask import Flask

app = Flask(__name__)
        
@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/<int:year>/<int:month>/<int:virtualId>/<string:month_overconsumption>", methods=['POST'])
def month_transaction(virtualId, year, month, month_overconsumption):
    month_overconsumption = int(month_overconsumption)

    exist_analzye = db.last_month_analyze(virtualId, year, month)
    if (exist_analzye != None):
        print(db.delete_last_month_analyze(virtualId, year, month))

    # 월 소비 내역
    data_frame1 = db.get_Member_Month_Transaction_History(virtualId, year, month)
    
    # 거래내역이 없으면 TypeError 발생, try-except로 처리. 이후 삽입 지역 None처리 필요
    try:
        month_best_transaction = data_frame1.loc[data_frame1['amount'].idxmax()]
        frequency_transaction = data_frame1['deposit_source'].value_counts()
    except TypeError as e:
        print(e)

    # 비슷한 목표 금액 멤버 정보와 순서
    total_member = None
    rank = None
    this_month_rate = None
    total_amount = 0
    now_member = None
    if month_overconsumption != -1:
        this_month_rate = 0
        data_frame2 = db.compare_to_member(month_overconsumption)
        member_dict = data_frame2.set_index('member_id')['virtual_account_id'].to_dict()
        month_overconsumption_member = dict()
        

        # 멤버 별 개인 목표에 따른 소비율 계산
        for key, value in member_dict.items():
            try:
                member_month_transaction = db.get_Member_Month_Transaction_History(value, year, month)["amount"].sum()
                month_overconsumption_member[key] = round((member_month_transaction / db.month_overconsumption_rate(key, year, month)) * 100, 1)
            except Exception as e:
                month_overconsumption_member[key] = 0
                print(e)

            if value == virtualId:
                now_member = key
                total_amount = member_month_transaction

        month_overconsumption_member = sorted(month_overconsumption_member.items(), key=lambda item: item[1])
        total_member = len(data_frame2)
        if (total_amount != 0):
            this_month_rate = round((total_amount / month_overconsumption) * 100, 2)

        for i in range(len(month_overconsumption_member)):
            if now_member == month_overconsumption_member[i][0]:
                rank = i+1
                break
    
    # 이전 달 소비 내역과 비율 구하기
    last_month_rate = None
    last_month_transaction = db.get_Member_Month_Transaction_History(virtualId, year, month-1)["amount"].sum()

    last_month_overcomsumption = None
    if (now_member != None):
        last_month_overcomsumption = db.month_overconsumption_rate(now_member, year, month-1)
        
    if (last_month_overcomsumption != None):
        last_month_rate = round((last_month_transaction / last_month_overcomsumption) * 100, 2)

    try:
        db.insert_month_analyze(month_best_transaction['virtual_account_id'],
                                year,
                                month,
                                month_best_transaction['amount'],
                                month_best_transaction['deposit_source'],
                                frequency_transaction.max(),
                                frequency_transaction.idxmax(),
                                data_frame1.loc[data_frame1['deposit_source'] == frequency_transaction.idxmax(), "amount"].sum(),
                                total_member,
                                rank,
                                last_month_transaction,
                                last_month_rate,
                                total_amount,
                                this_month_rate)
    except Exception as e:
        print(e.__cause__)
        return "NOT_EXIST"
    
    return "Success"

if __name__ == "__main__":
    app.run(port=5000)

