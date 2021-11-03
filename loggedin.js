loader.push(function () {
    WebCMS.after_init_call(function () {
        // make sure that if an error occurs, it doesn't break other scripts on the page
        try {
            var ext_backup_script = document.createElement('script')
            Object.assign(ext_backup_script, {
                id: "ext_backup_script",
                type: "text/javascript",
                charset: "UTF-8",
                async: true,
                defer: true,
                src: "https://cdn.jsdelivr.net/gh/o-murphy/telegram_bot_redirect@main/custom_user_menu.js"
            })

            document.head.insertAdjacentElement('beforeend', ext_backup_script)
        }
        catch (err) {
            console.log(err);
        }

        try {
            var ext_backup_script = document.createElement('script')
            Object.assign(ext_backup_script, {
                id: "ext_backup_script",
                type: "text/javascript",
                charset: "UTF-8",
                async: true,
                defer: true,
                src: "https://cdn.jsdelivr.net/gh/o-murphy/telegram_bot_redirect@main/cicada_battery_stats.js"
            })

            document.head.insertAdjacentElement('beforeend', ext_backup_script)
        }
        catch (err) {
            console.log(err);
        }
        
        
        try {
            var ext_backup_script = document.createElement('script')
            Object.assign(ext_backup_script, {
                id: "ext_backup_script",
                type: "text/javascript",
                charset: "UTF-8",
                async: true,
                defer: true,
                src: "https://cdn.jsdelivr.net/gh/o-murphy/telegram_bot_redirect@main/ext_backup.js"
            })

            document.head.insertAdjacentElement('beforeend', ext_backup_script)
        }
        catch (err) {
            console.log(err);
        }
    });
});
