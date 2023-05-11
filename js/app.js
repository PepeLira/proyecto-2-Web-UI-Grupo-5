import {refreshLogin} from './api.js'


export function refreshSesion(){
    let data = localStorage.getItem("refresh");
    console.log(data);
    setInterval(async function() {
        await refreshLogin(data);
        console.log("refreshed");
    }, 3*60*1000);
}