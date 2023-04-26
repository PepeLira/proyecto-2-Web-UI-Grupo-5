import {login} from '../api.js'
// import {addTokensToStorage} from './dataManagement.js'

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

        const username = this.uname.value;
        const password = this.upass.value;

        try{
            await login(username,password);
            window.location.pathname = 'gamesIndex.html';
        } catch (error) {
            console.log("ERROR:", error);
        }
    }
}