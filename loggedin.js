(function () {
  try  {

      menu = document.getElementById('sub_dom_f5acebef_3');
      menu_ul = menu.firstChild;

      let separator = document.createElement('li');
      separator.innerHTML = '<li class="menu-separator-top"></li>';
      menu_ul.appendChild(separator);

      let telegram_link = document.createElement('li');
      telegram_link.innerHTML = '<li><a target="_blank" href="https://t.me/tcs_okdesk_bot"><span dir="auto" class="menuname"><span style="background-image: url(\'https://telegram.org/favicon.ico?3\');display: inline-block;height: 14px;width: 14px;background-size: cover;margin-right: 0.5rem"></span><span>Telegram</span></span></a></li>';
      menu_ul.appendChild(telegram_link);

      let okdesk_link = document.createElement('li');
      okdesk_link.innerHTML = '<li><a target="_blank" href="https://trans-control.okdesk.ru/"><span dir="auto" class="menuname"><span style="background-image: url(\'https://trans-control.okdesk.ru/favicon.ico\');display: inline-block;height: 14px;width: 14px;background-size: cover;margin-right: 0.5rem"></span><span>OKDESK</span></span></a></li>';
      menu_ul.appendChild(okdesk_link);
    
    }
  catch (err) {
      // do nothing
    }
  })()
