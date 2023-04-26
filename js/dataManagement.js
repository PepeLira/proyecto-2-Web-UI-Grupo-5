function addTokensToStorage(data){
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("access", data.access);
}