loader.push(function () {
    WebCMS.after_init_call(function () {
        // make sure that if an error occurs, it doesn't break other scripts on the page

        fetch('https://api.github.com/repos/o-murphy/telegram_bot_redirect/branches/main').then(
            (data) => {
                return data.json()
            }
        ).then((json) => {
            sha = json.commit.sha
            var cdn = "https://cdn.jsdelivr.net/gh/o-murphy/telegram_bot_redirect"
            sources = {
                lang_dict: `${cdn}@${sha}/lang_dict.js`,
                custom_user_menu: `${cdn}@${sha}/custom_user_menu.js`,
                cicada_battery_stats: `${cdn}@${sha}/cicada_battery_stats.js`,
                ext_backup: `${cdn}@${sha}/ext_backup.js`
            }

            function ext_script_init(key, value) {
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
        })
    });
});
