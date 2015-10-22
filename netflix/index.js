"use strict";
let Nightmare = require("nightmare");

new Nightmare()
    .goto('https://www.netflix.com/Login?locale=es-EC')
    .type('#email', process.env.EMAIL)
    .type('#password', process.env.PASSWORD)
    .click('#login-form-contBtn')
    .wait('.profile-icon')
    .evaluate(function(){
       let a = document.querySelectorAll('.rowTitle > span');
       a.map((item) => {
         return item.innerText;
       });
       return a;
    }, function(result){
        console.log(result);
    })
    .run();
