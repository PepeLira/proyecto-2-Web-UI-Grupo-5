import {login} from api.js
import {addTokensToStorage} from dataManagement.js

export class LoginController{
    constructor(){
        this.uname = document.getElementById("username");
        this.upass = document.getElementById("password");

        this.submitButton = document.getElementById("submit");
        this.submitButton.addEventListener("submit", this.onSubmit.bind(this));
    }

    async onSubmit(event){
        event.preventDefault();

        const username = this.uname.value;
        const password = this.upass.value;

        try{
            const token = await login(username,password);
            localStorage.setItem("refresh", token.refresh);
            localStorage.setItem("access", token.access);
        } catch (error) {
            console.log("ERROR:", error);
        }
    }
}