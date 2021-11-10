loader.push(function () {
    WebCMS.after_init_call(function () {
        fetch('https://api.github.com/repos/o-murphy/telegram_bot_redirect/branches/main').then(
            (data) => {
                return data.json()
            }
        ).then((json) => {
            sha = json.commit.sha
            var cdn = "https://cdn.jsdelivr.net/gh/o-murphy/telegram_bot_redirect"
            url = `${cdn}@${sha}/ext_init.js`

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
            ext_script_init('ext_init', url);
        });
    });
});
