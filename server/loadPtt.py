import sys
from PyPtt import PTT

ptt_bot = PTT.API()
try:
    ptt_bot.login(ptt_id, password)
except PTT.exceptions.LoginError:
    ptt_bot.log('登入失敗')
    sys.exit()
except PTT.exceptions.WrongIDorPassword:
    ptt_bot.log('帳號密碼錯誤')
    sys.exit()
except PTT.exceptions.LoginTooOften:
    ptt_bot.log('請稍等一下再登入')
    sys.exit()
ptt_bot.log('登入成功')

if ptt_bot.unregistered_user:
    print('未註冊使用者')

    if ptt_bot.process_picks != 0:
        print(f'註冊單處理順位 {ptt_bot.process_picks}')

if ptt_bot.registered_user:
    print('已註冊使用者')

# call ptt_bot other api

ptt_bot.logout()