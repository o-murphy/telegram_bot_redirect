try {
    (function () {
        var ev = new $.Event('remove'),
            orig = $.fn.remove;
        var evap = new $.Event('append'),
            origap = $.fn.append;
        $.fn.remove = function () {
            $(this).trigger(ev);
            return orig.apply(this, arguments);
        }
        $.fn.append = function () {
            $(this).trigger(evap);
            return origap.apply(this, arguments);
        }
    })();

    var mfunc = function mainFunc(e) {
        target = document.getElementById('monitoring_units_target')
        let bats = target.querySelectorAll('[mod="monitoring_units_battery"]')

        bats.forEach(element => {

            let child = element.firstChild
            if (child.hasOwnProperty("_monitoringUnitsBattery")) {
                reg = new RegExp(lang_dict[language]['title'], "g")
                if (child._monitoringUnitsBattery.title.search(reg) === -1 
                    && child._monitoringUnitsBattery.title != 'Состояние неизвестно') {
                    child._monitoringUnitsBattery.title += `\n${lang_dict[language]['title']}`
                }

                let object_id = parseInt(child.classList[0].split('-')[3])
                sess = wialon.core.Session.getInstance()
                u = sess.__itemsById[object_id]

                hw_type = WebCMS.getHwById(u.$$user_deviceTypeId)
                if (hw_type.name === 'Bitrek BI 310') {

                    element.setAttribute('style', 'cursor: pointer;');

                    let resetBat = function onResetBat() {
                        var answer = window.confirm(lang_dict[language]['alert']);
                        if (answer === true) {
                            sess = wialon.core.Session.getInstance()
                            u = sess.__itemsById[object_id]
                            sens103 = u.$$user_lastMessage.p.sens103
                            sensors = u.$$user_sensors

                            cur_sens = Object.values(sensors).map((x) => x).find(x => x.n === 'reset_battery_value')
                            console.log(cur_sens)
                            cur_sens.p = `const${sens103}`
                            u.updateSensor(cur_sens, function(code, data) {
                                if (code) msg(wialon.core.Errors.getErrorText(code));
                                else{
                                    msg("<b>'"+ data.n +"'</b> sensor updated successfully ");
                                    if (window.confirm(lang_dict[language]['reload'])) {location.reload()}
                                }
                            })
                        }
                    }

                    if (element.firstChild.firstChild) {
                        let own_class = element.firstChild.firstChild.classList[0]
                        element.onclick = resetBat
                        element.firstChild.onmouseover = function () {
                            element.firstChild.firstChild.setAttribute('class', 'icon-remove')
                        }
                        element.firstChild.onmouseleave = function () {
                            element.firstChild.firstChild.setAttribute('class', own_class)
                        }
                    } 
                }
            }
        });
    }

    $(document.getElementById('monitoring_units_target')).on('append', mfunc);
    document.getElementById('monitoring_units_target_div').onmousewheel = mfunc
    document.getElementById('monitoring_units_target_div').onscroll = mfunc
    $(document).on('remove', function (e) { });
}
catch (err) {
    console.log(err);
}
