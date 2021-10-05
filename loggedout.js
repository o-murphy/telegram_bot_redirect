(function () {
  try  {

      menu = document.getElementsByClassName('appstore-buttons')[0];


      let telegram_link = document.createElement('span');
      telegram_link.innerHTML = '<a href="https://t.me/tcs_okdesk_bot" target="_blank"><img src="https://telegram.org/favicon.ico?3" alt="" style="background-color: white;border-bottom-left-radius: 20%;border-bottom-right-radius: 20%;border-top-left-radius: 20%;border-top-right-radius: 20%;padding: 0.3em;width: 31px;"></a>';
      menu.appendChild(telegram_link);

      let okdesk_link = document.createElement('span');
      okdesk_link.innerHTML = '<a href="https://trans-control.okdesk.ru/" target="_blank"><img src="https://trans-control.okdesk.ru/favicon.ico" alt="" style="background-color: white;border-bottom-left-radius: 20%;border-bottom-right-radius: 20%;border-top-left-radius: 20%;border-top-right-radius: 20%;padding: 0.3em;width: 31px;"></a>';
      menu.appendChild(okdesk_link);

      let fb_link = document.createElement('span');
      fb_link.innerHTML = '<a href="https://www.facebook.com/TransControlService/" target="_blank"><img src="https://static.xx.fbcdn.net/rsrc.php/yD/r/d4ZIVX-5C-b.ico" alt="" style="background-color: white;border-bottom-left-radius: 20%;border-bottom-right-radius: 20%;border-top-left-radius: 20%;border-top-right-radius: 20%;padding: 0.3em;width: 31px;"></a>';
      menu.appendChild(fb_link);
    }
  catch (err) {
      // do nothing
    }
  })()
