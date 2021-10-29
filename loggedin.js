loader.push(function () {
    WebCMS.after_init_call(function () {
    // make sure that if an error occurs, it doesn't break other scripts on the page

        var telegramBot = "https://t.me/tcs_okdesk_bot"
        var telegramCicadaTools = "tcs_cicada_bot"
        var okdeskFav = 'https://static-ck.okdesk.ru/okdesktest/favicons/1/original/okdesk_avatar_02_no-bg_%282%29.ico'
        var okdeskUrl = 'https://trans-control.okdesk.ru'

        language = wialon.core.Session.getInstance().__currUser.$$user_customProps.language
        function msg(text) { $("#log").prepend(text + "<br/>"); }

        lang_dict = {
            'ru': {
                'title': 'Нажмите, что бы обнулить заряд',
                'alert': 'Вы точно хотите обнулить заряд аккумулятора? Это действие нельзя отменить!',
                'reload': 'Требуется перезагрузить страницу, чтобы новые данные появились в панели "Мониторинг". Перезагрузить?'
            },
            'uk': {
                'title': 'Натисніть, щоб скинути заряд',
                'alert': 'Ви точно хочете скинути заряд акумулятора? Цю дію не можна скасувати!',
                'reload': 'Потрібно оновити сторінку, аби нові дані з\'явились у панелі "Моніторинг". Оновити?'
            },
            'en': {
                'title': 'Click, to reset battery charge',
                'alert': "Are you sure you want to reset your battery? This action cannot be undone!",
                'reload': 'Page need to be update to reload data on "Monitoring" tab. Update?'
            },
        }

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
                username = wialon.core.Session.getInstance().__authUser
                baseurl = wialon.core.Session.getInstance().__appDns
                wialon.core.Session.getInstance().createAuthHash(function(code, data) {
                    if (code != 0) {
                        console.log(code); return;
                    }
                    window.open(                            
                        encodeURI(
                            `${okdeskUrl}/wialonauth/?user=${username}&baseUrl=http://${baseurl}&authHash=${data.authHash}`
                            )
                        )
                })};

            var onct = function onCicadaTools() {
                wialon.core.Session.getInstance().createAuthHash(function(code, data) {
                    if (code != 0) {
                        console.log(code); return;
                    }
                    window.open(                            
                        encodeURI(
                            `https://t.me/${telegramCicadaTools}?start=${data.authHash}`
                            )
                        )
                })};

            document.getElementById('okd_login').onclick = onokd
            document.getElementById('cicada_tools').onclick = onct
        }
        catch (err) {
            console.log(err);
        }

        try {
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

                    sess = wialon.core.Session.getInstance()
                    u = sess.__itemsById[object_id]

                    hw_type = WebCMS.getHwById(u.$$user_deviceTypeId)
                    if (hw_type.name === 'Bitrek BI 310') {

                        element.setAttribute('style', 'cursor: pointer;');

                        let resetBat = function onResetBat() {
                            var answer = window.confirm(lang_dict[language]['alert']);
                            if (answer === true) {
                                sess = wialon.core.Session.getInstance()
                                u = sess.__itemsById[object_id]
                                sens103 = u.$$user_lastMessage.p.sens103
                                sensors = u.$$user_sensors

                                cur_sens = Object.values(sensors).map((x) => x).find(x => x.n === 'reset_battery_value')
                                console.log(cur_sens)
                                cur_sens.p = `const${sens103}`
                                u.updateSensor(cur_sens, function(code, data) {
                                    if (code) msg(wialon.core.Errors.getErrorText(code));
                                    else{
                                        msg("<b>'"+ data.n +"'</b> sensor updated successfully ");
                                        if (window.confirm(lang_dict[language]['reload'])) {location.reload()}
                                    }
                                })
                            }
                        }

                        if (element.firstChild.firstChild) {
                            let own_class = element.firstChild.firstChild.classList[0]
                            element.onclick = resetBat
                            element.firstChild.onmouseover = function () {
                                element.firstChild.firstChild.setAttribute('class', 'icon-remove')
                            }
                            element.firstChild.onmouseleave = function () {
                                element.firstChild.firstChild.setAttribute('class', own_class)
                            }
                        } 
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
