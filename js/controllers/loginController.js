import {login} from '../api.js'

export class LoginController{
    constructor(){
        this.uname = document.getElementById("username");
        this.upass = document.getElementById("password");

        this.form = document.querySelector('form');
        this.submitButton = document.getElementById("submit");
        this.form.addEventListener("submit", this.onSubmit.bind(this));
    }

    async onSubmit(event){
        event.preventDefault();
        localStorage.removeItem("access");

        const username = this.uname.value;
        const password = this.upass.value;

        try{
            await login(username,password);
            setTimeout(function(){
                if(localStorage.getItem("access") != null){
                    window.location.pathname = 'gamesIndex.html';
                }else{
                    alert("Login failed");
                }
            }, 1000);
        } catch (error) {
            console.log("ERROR:", error);
        }
    }
}