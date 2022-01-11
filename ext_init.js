try {
            var base_url = "https://o-murphy.github.io/telegram_bot_redirect"
            sources = {
                lang_dict: `${base_url}/lang_dict.js`,
                custom_user_menu: `${base_url}/custom_user_menu.js`,
                cicada_battery_stats: `${base_url}/cicada_battery_stats.js`,
                ext_backup: `${base_url}/ext_backup.js`,
                additional: ``,
                wln_auth: `${base_url}/wln_auth.js`,
                wialon_js: `https://hst-api.wialon.com/wsdk/script/wialon.js`
            }
            function ext_script_init(key, value) {
                if (value) {
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
            }

            Object.entries(sources).forEach(([key, value]) => ext_script_init(key, value))
          
} catch (error) {console.log(error)}
