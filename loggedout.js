menu = document.getElementsByClassName('appstore-buttons')[0];


let telegram_link = document.createElement('span');
telegram_link.innerHTML = '<a href="https://t.me/tcs_okdesk_bot" target="_blank"><img src="https://telegram.org/favicon.ico?3" alt=""></a>';
menu.appendChild(telegram_link);

let okdesk_link = document.createElement('span');
okdesk_link.innerHTML = '<a href="https://trans-control.okdesk.ru/" target="_blank"><img src="https://trans-control.okdesk.ru/favicon.ico" alt=""></a>';
menu.appendChild(okdesk_link);
