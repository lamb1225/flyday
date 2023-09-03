const acc = document.getElementById("storeacc");
const email = document.getElementById("email-input");
const mobile = document.getElementById("mobile-input");
const name = document.getElementById("store-name");
const tel = document.getElementById("store-number");
const storeadd = document.getElementById("store-add");
const pwd = document.getElementById("psw-input");
const pwdConfirm = document.getElementById("psw-input-confirm");
const errMsg = document.getElementById("errMsg");
const register = document.getElementById("btn-register");

const accRegex = /^\w{6,20}$/
const pwdRegex = /^\w{6,12}$/
const mobileRegex = /^09[0-9]{8}$/
const emailRegex =/^\w+((-\w+)|(\.\w+))*\@\w+((\.|-)\w+)*\.[A-Za-z]+$/;

register.addEventListener("click", function(){
    errMsg.textContent = ""
    if( acc.value === null || acc.value.trim().length === 0
    	|| email.value === null || email.value.trim().length === 0
        || pwd.value === null || pwd.value.trim().length === 0
        || pwdConfirm.value === null || pwdConfirm.value.trim().length === 0){

        errMsg.textContent = "尚有必填欄位未輸入";
    }else if(! accRegex.test(acc.value)){
        errMsg.textContent = "帳號應由6-20個英數字組合而成"
    }else if(! emailRegex.test(email.value)){
        errMsg.textContent = "email輸入格式不符"
    }else if(! pwdRegex.test(pwd.value)){
        errMsg.textContent = "密碼應由6-12個英數字組合而成"
    }else if(pwdConfirm.value !== pwd.value){
        errMsg.textContent = "確認密碼欄位與輸入密碼不相符"
    }else{
        fetch("/flyday/store/register", {
        method: "POST",
        headers:  { "Content-Type": "application/json" },
        body: JSON.stringify({
            storeAcc: acc.value,
            storeName: name.value,
            storeEmail: email.value,
            storeTel: tel.value,
            storeAdd: storeadd.value,
            storePwd: pwd.value
            })
        }).then(function(response){
            return response.json();
        }).then(function(jsonObject){
            const{successful, message} = jsonObject;
            if(successful){
                location = "/flyday/front_end/store-sign-in.html";
            }else{
                errMsg.textContent = message;
            }
        })
    }
});
