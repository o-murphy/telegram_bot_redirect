try {
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
} catch (error) {console.log(error)}
