loader.push(function () {
    WebCMS.after_init_call(function () {
        // make sure that if an error occurs, it doesn't break other scripts on the page

        try {

            menu = document.getElementById('sub_dom_f5acebef_3');
            menu_ul = menu.firstChild;

            let separator = document.createElement('li');
            separator.innerHTML = '<li class="menu-separator-top"></li>'
            menu_ul.appendChild(separator)

            let telegram_link = document.createElement('li');
            telegram_link.innerHTML = '<a target="_blank" href="https://t.me/tcs_okdesk_bot"><span dir="auto" class="menuname"><span style="background-image: url(\'https://telegram.org/favicon.ico?3\');display: inline-block;height: 14px;width: 14px;background-size: cover;margin-right: 0.5rem"></span><span>Telegram</span></span></a>';
            menu_ul.appendChild(telegram_link);

            let okdesk_link = document.createElement('li');
            okdesk_link.innerHTML = '<a id="okd_auth"><span dir="auto" class="menuname"><span style="background-image: url(\'https://trans-control.okdesk.ru/favicon.ico\');display: inline-block;height: 14px;width: 14px;background-size: cover;margin-right: 0.5rem"></span><span>OKDESK</span></span></a>';
            menu_ul.appendChild(okdesk_link);

            let cicada_tools = document.createElement('li');
            cicada_tools.innerHTML = '<a id="cicada_tools"><span dir="auto" class="menuname"><span style="background-image: url(\'https://bitrek.ua/image/data/icon/favicon.png\');display: inline-block;height: 14px;width: 14px;background-size: cover;margin-right: 0.5rem"></span><span>Cicada Tools</span></span></a>';
            menu_ul.appendChild(cicada_tools);



            var onct = function onCicadaTools() {
                var output = {};
                document.cookie.split(/\s*;\s*/).forEach(function (pair) {
                    pair = pair.split(/\s*=\s*/);
                    output[pair[0]] = pair.splice(1).join('=');
                });
                fetch(`http://wialon.trans-control.com/wialon/ajax.html?svc=core/create_auth_hash&params={}&sid=${output.sessions}`)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        window.open(`https://t.me/tcs_cicada_bot?start=${data.authHash}`)
                    });
            }

            document.getElementById('cicada_tools').onclick = onct

            var onokd = function onOkdTools() {
                var output = {};
                document.cookie.split(/\s*;\s*/).forEach(function (pair) {
                    pair = pair.split(/\s*=\s*/);
                    output[pair[0]] = pair.splice(1).join('=');
                });
                username = wialon.core.Session.getInstance().__authUser
                baseurl = wialon.core.Session.getInstance().__appDns
                fetch(`http://wialon.trans-control.com/wialon/ajax.html?svc=core/create_auth_hash&params={}&sid=${output.sessions}`)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log(`https://trans-control.okdesk.ru/wialonauth/?user=${username}&baseUrl=http%3A%2F%2F${baseurl}&authHash=${data.authHash}`)
                        window.open(`https://trans-control.okdesk.ru/wialonauth/?user=${username}&baseUrl=http%3A%2F%2F${baseurl}&authHash=${data.authHash}`)
                    });
            }

            document.getElementById('okd_auth').onclick = onokd

        }
        catch (err) {
            // do nothing
        }

    });
});
