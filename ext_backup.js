try {
    function backupBusy(is_true) {
        messages_filter = WebCMS.get_module('messages_filter')
        msgs_backup_button = document.getElementById('messages_filter_interval_backup')

        messages_filter.disable_inputs(is_true)
        messages_filter.disable_execute_button(is_true)
        messages_filter.busy = is_true
        msgs_backup_button.disabled = is_true
        document.getElementById('msgs_backup_busy').hidden = !is_true
    }

    function makeMSGBackup() {
        i = wialon.core.Session.getInstance();
        itemId = document.getElementById("messages_filter_units").getVTBValue()
        
        u = i.__itemsById[itemId]
        filename = u.$$user_name + '_' + u.$$user_uniqueId

        timeTo = i.getServerTime()
        timeFrom = timeTo - 31622400
        var r = {
            format: 'wlb',
            itemId: itemId,
            compress: 1,
            timeFrom: timeFrom,
            timeTo: timeTo
        }
        url = location.origin + i.getApiPath() + "?sid=" + i.getId() + "&svc=exchange/export_messages&params=" + qx.lang.Json.stringify(r)

        function download(url, filename) {
            backupBusy(!0)
            fetch(url, {
                mode: 'no-cors' 
            }).then((transfer) => {
                return transfer.blob();                 // RETURN DATA TRANSFERED AS BLOB
            }).then((bytes) => {
                if (bytes.type === "application/json") {
                    backupBusy(!1)
                    bytes.text().then((code) => {
                        if (code) {
                            // WebCMS.log_msg(WebCMS.get_error_text(JSON.parse(code).error), 2)
                            WialonHosting.alerts.info({
                                html: (WebCMS.get_error_text(JSON.parse(code).error)),
                                autoHideTimeout: 1e4
                                    })
                        }
                    })
                    return;
                }
                let elm = document.createElement('a');  // CREATE A LINK ELEMENT IN DOM
                elm.href = URL.createObjectURL(bytes);  // SET LINK ELEMENTS CONTENTS
                elm.setAttribute('download', filename); // SET ELEMENT CREATED 'ATTRIBUTE' TO DOWNLOAD, FILENAME PARAM AUTOMATICALLY
                elm.click()                             // TRIGGER ELEMENT TO DOWNLOAD
                backupBusy(!1)
            }).catch((error) => {
                console.log(error);                     // OUTPUT ERRORS, SUCH AS CORS WHEN TESTING NON LOCALLY
                backupBusy(!1)
            })
        }

        download(url, filename)        
    }

    function makeBackupButton() {
        filter = document.getElementById('messages_filter_interval_backup')
        if (!filter) {
            var msgs_backup_button = document.createElement('input')
            Object.assign(msgs_backup_button, {
                className: 'wui-button _min-w-button _mb-2',
                type: 'button',
                id: 'messages_filter_interval_backup',
                value: lang_dict[language]['backup'],
                onclick: makeMSGBackup,
                title: lang_dict[language]['backup_title']
            })
            var msgs_backup_busy = document.createElement('img')
            Object.assign(msgs_backup_busy, {
                id: "msgs_backup_busy",
                src: "/static/images/wait.gif",
                hidden: true
            })
            
            msgs_buttons = document.getElementsByClassName('msgs-filter-table-buttons')
            msgs_buttons[0].insertAdjacentElement('afterbegin', msgs_backup_button)
            msgs_buttons[0].insertAdjacentElement('afterbegin', msgs_backup_busy)
        }
    }

    document.getElementById('hb_mi_messages').onclick = makeBackupButton

} catch (err) {
    console.log(err);
}
