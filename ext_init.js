try {

//           fetch('https://api.github.com/repos/o-murphy/telegram_bot_redirect/branches/main').then(
//             (data) => {
//                 return data.json()
//             }
//           ).then((json) => {
//             sha = json.commit.sha
//             var cdn = "https://cdn.jsdelivr.net/gh/o-murphy/telegram_bot_redirect"
            var base_url = "https://o-murphy.github.io/telegram_bot_redirect"
//             sources = {
//                 lang_dict: `${cdn}@${sha}/lang_dict.js`,
//                 custom_user_menu: `${cdn}@${sha}/custom_user_menu.js`,
//                 cicada_battery_stats: `${cdn}@${sha}/cicada_battery_stats.js`,
//                 ext_backup: `${cdn}@${sha}/ext_backup.js`,
//                 additional: ``
//             }
            sources = {
                lang_dict: `${base_url}/lang_dict.js`,
                custom_user_menu: `${base_url}/custom_user_menu.js`,
                cicada_battery_stats: `${base_url}/cicada_battery_stats.js`,
                ext_backup: `${base_url}/ext_backup.js`,
                additional: ``
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
          })
          
} catch (error) {console.log(error)}
