loader.push(function () {
    WebCMS.after_init_call(function () {
        // make sure that if an error occurs, it doesn't break other scripts on the page

        var sources = {
            custom_user_menu: "https://cdn.jsdelivr.net/gh/o-murphy/telegram_bot_redirect@main/custom_user_menu.js",
            cicada_battery_stats: "https://cdn.jsdelivr.net/gh/o-murphy/telegram_bot_redirect@main/cicada_battery_stats.js",
            ext_backup: "https://cdn.jsdelivr.net/gh/o-murphy/telegram_bot_redirect@main/ext_backup.js"
        }

        function ext_script_init(key, value) {
            console.log(key, value)
            try {
                var ext_script = document.createElement('script')
                Object.assign(ext_script, {
                    id: key,
                    type: "text/javascript",
                    charset: "UTF-8",
                    async: true,
                    defer: true,
                    src: value
                })
    
                document.head.insertAdjacentElement('beforeend', ext_script)
            }
            catch (err) {
                console.log(err);
            }
        }
        
        Object.entries(sources).forEach(([key, value]) => ext_script_init(key, value))

     });
});
