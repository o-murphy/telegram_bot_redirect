try {
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
