try {
    function onResetBat(event, u) {
        console.log(u)
        var answer = window.confirm(lang_dict[language]['alert']);
        if (answer === true) {
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

    function updateUnit(u, target) {
        element = target.querySelector(`.monitoring-units-battery-${u._id}`)
        if (element) {
            if (element.hasOwnProperty("_monitoringUnitsBattery")) {
                reg = new RegExp(lang_dict[language]['title'], "g")
                if (element._monitoringUnitsBattery.title.search(reg) === -1 
                    && element._monitoringUnitsBattery.title != 'Состояние неизвестно') {
                        element._monitoringUnitsBattery.title += `\n${lang_dict[language]['title']}`
                }
                element.setAttribute('style', 'cursor: pointer;');
                if (element.firstChild) {
                    element.onclick = (event) => { onResetBat(event, u) }
                    element.onmouseover = (event) => { 
                        event.target.setAttribute('_last_icon', event.target.classList[0])
                        event.target.setAttribute('class', 'icon-remove') 
                    }
                    element.onmouseleave = (event) => { 
                        event.target.firstChild.setAttribute('class', event.target.firstChild.getAttribute('_last_icon')) 
                    }
                } 
            }
        }
    }

    function mainFunc() {
        units = WebCMS.get_module('monitoring_units').units
        if (units) {
            units_filtered = Object.values(units).filter((val) => WebCMS.getHwById(val.$$user_deviceTypeId).name === 'Bitrek BI 310')
        }
        target = document.getElementById('monitoring_units_target')
        units_filtered.forEach((u) => {
            updateUnit(u, target)
        })
    }

    let observer = new MutationObserver(mainFunc);
    observer.observe(document.getElementById('monitoring_units_target'), {childList: true, subtree: true});
}
catch (err) {
    console.log(err);
}
