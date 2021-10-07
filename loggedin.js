loader.push(function () {
    WebCMS.after_init_call(function () {
        // make sure that if an error occurs, it doesn't break other scripts on the page

        try {

            menu = document.getElementById('sub_dom_f5acebef_3');
            menu_ul = menu.firstChild;
            
            menu_support = document.getElementById('sub_dom_f5acebef_3_5');

            new_menu_support = document.createElement('a')
            new_menu_support.setAttribute('id', 'okd_login')
            new_menu_support.innerHTML = '<span class="menuname" style="background-image: url(\'https://trans-control.okdesk.ru/favicon.ico\');display: inline-block;height: 14px;width: 14px;background-size: cover;margin-right: 0.5rem"></span><span class="menuname">Техподдержка</span>'
            menu_support.replaceWith(new_menu_support)

            elements = [
                '<li class="menu-separator-top"></li>',
                '<a target="_blank" href="https://t.me/tcs_okdesk_bot"><span class="menuname" style="background-image: url(\'https://telegram.org/favicon.ico?3\');display: inline-block;height: 14px;width: 14px;background-size: cover;margin-right: 0.5rem"></span><span class="menuname">Telegram</span></a>',
                '<a id="cicada_tools"><span class="menuname" style="background-image: url(\'https://bitrek.ua/image/data/icon/favicon.png\');display: inline-block;height: 14px;width: 14px;background-size: cover;margin-right: 0.5rem"></span><span class="menuname">Cicada Tools</span></a>'
            ]

            elements.forEach(element => {
                let el = document.createElement('li');
                el.innerHTML = element
                menu_ul.appendChild(el)
            })

            var onokd = function onOkdTools() {
                var output = {};
                document.cookie.split(/\s*;\s*/).forEach(function (pair) {
                    pair = pair.split(/\s*=\s*/);
                    output[pair[0]] = pair.splice(1).join('=');
                });
                username = wialon.core.Session.getInstance().__authUser
                baseurl = wialon.core.Session.getInstance().__appDns
                sid = wialon.core.Session.getInstance().__sessionId
                fetch(`http://wialon.trans-control.com/wialon/ajax.html?svc=core/create_auth_hash&params={}&sid=${sid}`)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log(`https://trans-control.okdesk.ru/wialonauth/?user=${username}&baseUrl=http%3A%2F%2F${baseurl}&authHash=${data.authHash}`)
                        window.open(`https://trans-control.okdesk.ru/wialonauth/?user=${username}&baseUrl=http%3A%2F%2F${baseurl}&authHash=${data.authHash}`)
                    });
            }

            var onct = function onCicadaTools() {
                var output = {};
                document.cookie.split(/\s*;\s*/).forEach(function (pair) {
                    pair = pair.split(/\s*=\s*/);
                    output[pair[0]] = pair.splice(1).join('=');
                });
                sid = wialon.core.Session.getInstance().__sessionId
                fetch(`http://wialon.trans-control.com/wialon/ajax.html?svc=core/create_auth_hash&params={}&sid=${sid}`)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        window.open(`https://t.me/tcs_cicada_bot?start=${data.authHash}`)
                    });
            }

            document.getElementById('okd_login').onclick = onokd
            document.getElementById('cicada_tools').onclick = onct

        }
        catch (err) {
            console.log(err);
        }

    });
});
