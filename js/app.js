import {refreshLogin} from './api.js'


export function refreshSesion(){
    let data = localStorage.getItem("refresh");
    setInterval(async function() {
        await refreshLogin(data);
        console.log("refreshed");
    }, 5*60*1000);
}