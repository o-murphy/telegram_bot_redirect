function get(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}
tg = 'https://t.me/'
const [bot, start] = get('start').split(',')
const value = get(start)
if (start != undefined && bot != undefined) {
    window.location.href = `${tg+bot}?start=${value}`
} else {
    close()
}
