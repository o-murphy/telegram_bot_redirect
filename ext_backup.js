function makeMSGBackup() {
    i = wialon.core.Session.getInstance();
    itemId = document.getElementById("messages_filter_units").getVTBValue()
    timeTo = i.getServerTime()
    timeFrom = timeTo - 31622400

    messages_filter = WebCMS.get_module('messages_filter')
    msgs_backup_button = document.getElementById('messages_filter_interval_backup')

    messages_filter.disable_inputs(!0)
    messages_filter.disable_execute_button(!0)
    messages_filter.busy = !0;
    msgs_backup_button.disabled = !0

    loader = i.getMessagesLoader()
    loader.loadInterval(itemId, timeFrom, timeTo, 0xFF00, 0x0000, 0xffffffff, function (code, data) {
        console.log(code, data)
        if (code || data.count === 0) {  
            messages_filter.disable_inputs(!1)
            messages_filter.disable_execute_button(!1)
            messages_filter.busy = !1;
            msgs_backup_button.disabled = !1
            WebCMS.log_msg(WebCMS.get_error_text(1001), 2)
            return;
        }
        var r = {
            format: 'wlb',
            itemId: itemId,
            compress: 1,
            timeFrom: timeFrom,
            timeTo: timeTo
        }
        url = location.origin + i.getApiPath() + "?sid=" + i.getId() + "&svc=exchange/export_messages&params=" + qx.lang.Json.stringify(r)
        messages_filter.disable_inputs(!1)
        messages_filter.disable_execute_button(!1)
        messages_filter.busy = !1;
        msgs_backup_button.disabled = !1

        jQuery("#download_message_file").size() || jQuery("body").append("<iframe id='download_message_file' style='display: none'></iframe>"),
        jQuery("#download_message_file").attr("src", url)
    })
}

function makeBackupButton() {
    filter = document.getElementById('messages_filter_interval_backup')
    if (!filter) {
        var msgs_backup_button = document.createElement('input')
        Object.assign(msgs_backup_button, {
            className: 'wui-button _min-w-button _mb-2',
            type: 'button',
            id: 'messages_filter_interval_backup',
            value: 'Backup',
            onclick: makeMSGBackup
        })
        msgs_buttons = document.getElementsByClassName('msgs-filter-table-buttons')
        msgs_buttons[0].insertAdjacentElement('afterbegin', msgs_backup_button)
    }
}

document.getElementById('hb_mi_messages').onclick = makeBackupButton


