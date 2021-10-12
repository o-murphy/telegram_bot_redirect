loader.push(function () {
    WebCMS.after_init_call(function () {
        // make sure that if an error occurs, it doesn't break other scripts on the page

        var telegramBot = "https://t.me/tcs_okdesk_bot"
        var telegramCicadaTools = "tcs_cicada_bot"
        var okdeskFav = 'https://static-ck.okdesk.ru/okdesktest/favicons/1/original/okdesk_avatar_02_no-bg_%282%29.ico'
        var okdeskUrl = 'https://trans-control.okdesk.ru'

        try {


            menu = document.getElementById('sub_dom_f5acebef_3');
            menu_ul = menu.firstChild;

            menu_support = document.getElementById('sub_dom_f5acebef_3_5');

            new_menu_support = document.createElement('a')
            new_menu_support.setAttribute('id', 'okd_login')
            new_menu_support.innerHTML = `<span class="menuname" style="background-image: url(\'${okdeskFav}\');display: inline-block;height: 14px;width: 14px;background-size: cover;margin-right: 0.5rem"></span><span class="menuname">Техподдержка</span>`
            menu_support.replaceWith(new_menu_support)

            elements = [
                '<li class="menu-separator-top"></li>',
                `<a target="_blank" href="${telegramBot}"><span class="menuname" style="background-image: url(\'https://telegram.org/favicon.ico?3\');display: inline-block;height: 14px;width: 14px;background-size: cover;margin-right: 0.5rem"></span><span class="menuname">Telegram</span></a>`,
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
                fetch(`http://${baseurl}/wialon/ajax.html?svc=core/create_auth_hash&params={}&sid=${sid}`)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        window.open(`https://${okdeskUrl}/wialonauth/?user=${username}&baseUrl=http%3A%2F%2F${baseurl}&authHash=${data.authHash}`)
                    });
            }

            var onct = function onCicadaTools() {
                var output = {};
                document.cookie.split(/\s*;\s*/).forEach(function (pair) {
                    pair = pair.split(/\s*=\s*/);
                    output[pair[0]] = pair.splice(1).join('=');
                });
                baseurl = wialon.core.Session.getInstance().__appDns
                sid = wialon.core.Session.getInstance().__sessionId
                fetch(`http://${baseurl}/wialon/ajax.html?svc=core/create_auth_hash&params={}&sid=${sid}`)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        window.open(`https://t.me/${telegramCicadaTools}?start=${data.authHash}`)
                    });
            }

            document.getElementById('okd_login').onclick = onokd
            document.getElementById('cicada_tools').onclick = onct

        }
        catch (err) {
            console.log(err);
        }


        try {

            let dns = wialon.core.Session.getInstance().__appDns
            let sid = wialon.core.Session.getInstance().__sessionId

            let url = `http://${dns}/wialon/ajax.html`

            async function postData(url = '', data = '') {
                const response = await fetch(url, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        // 'Content-Type': 'application/json'
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: data
                });
                return await response.json();
            }

            (function () {

                var ev = new $.Event('remove'),
                    orig = $.fn.remove;
                var evap = new $.Event('append'),
                    origap = $.fn.append;
                $.fn.remove = function () {
                    $(this).trigger(ev);
                    return orig.apply(this, arguments);
                }
                $.fn.append = function () {
                    $(this).trigger(evap);
                    return origap.apply(this, arguments);
                }


            })();

            $(document.getElementById('monitoring_units_target')).on('append', function (e) {
                let target = e.currentTarget
                let bats = target.querySelectorAll('[mod="monitoring_units_battery"]')

                bats.forEach(element => {


                    let child = element.firstChild
                    let object_id = parseInt(child.classList[0].split('-')[3])

                    hw_type = WebCMS.getHwById(wialon.core.Session.getInstance().__itemsById[object_id].$$user_deviceTypeId)

                    if (hw_type.name === 'Bitrek BI 310') {

                        element.setAttribute('title', 'Нажмите, что бы обнулить заряд')

                        let resetBat = function onResetBat() {
                            var answer = window.confirm("Вы точно хотите обнулить заряд аккумулятора? Это действие нельзя отменить!");
                            if (answer === true) {

                                let dns = wialon.core.Session.getInstance().__appDns
                                let sid = wialon.core.Session.getInstance().__sessionId

                                let url = `http://${dns}/wialon/ajax.html`
                                let sens103 = wialon.core.Session.getInstance().__itemsById[object_id].$$user_lastMessage.p.sens103


                                let sens = wialon.core.Session.getInstance().__itemsById[object_id].$$user_sensors
                                sens_id = Object.values(sens).map((x) => x).find(x => x.n === 'reset_battery_value').id

                                let params = {
                                    "itemId": object_id,
                                    "n": "reset_battery_value",
                                    "t": "custom",
                                    "d": "cicada_tools_aс",
                                    "m": "",
                                    "p": `const${sens103}`,
                                    "f": 0,
                                    "c": "{\"act\":0,\"appear_in_popup\":false,\"ci\":{},\"cm\":1,\"mu\":0,\"pos\":6,\"show_time\":false,\"timeout\":0}",
                                    "vt": 0,
                                    "vs": 0,
                                    "tbl": [],
                                    "unlink": false,
                                    "callMode": 'update',
                                    'id': sens_id
                                }

                                formData = `svc=unit/update_sensor&params=${JSON.stringify(params)}&sid=${sid}`

                                postData(url, formData)
                                    .then((data) => {
                                        console.log()
                                    });


                            }
                        }

                        element.onclick = resetBat
                    }
                });

            });

            $(document).on('remove', function (e) { });
        }
        catch (err) {
            console.log(err);
        }

    });
});
