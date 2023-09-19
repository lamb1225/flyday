const acc = document.getElementById("acc-input");
const email = document.getElementById("email-input");
const mobile = document.getElementById("mobile-input");
const pwd = document.getElementById("psw-input");
const pwdConfirm = document.getElementById("psw-input-confirm");
const errMsg = document.getElementById("errMsg");
const register = document.getElementById("btn-register");

const accRegex = /^\w{6,12}$/
const pwdRegex = /^\w{6,12}$/
const mobileRegex = /^09[0-9]{8}$/
const emailRegex =/^\w+((-\w+)|(\.\w+))*\@\w+((\.|-)\w+)*\.[A-Za-z]+$/;

const contextPath = window.location.pathname.split('/')[1];

document.write('<script src="/flyday/front_end/myassets/js/sweetalert2.all.min.js"></script>'); //載入sweetalert

register.addEventListener("click", function(){
    errMsg.textContent = ""
    if(acc.value === null || acc.value.trim().length === 0 
        || email.value === null || email.value.trim().length === 0
        || mobile.value === null || mobile.value.trim().length === 0
        || pwd.value === null || pwd.value.trim().length === 0
        || pwdConfirm.value === null || pwdConfirm.value.trim().length === 0){

        errMsg.textContent = "尚有必填欄位未輸入";
    }else if(! accRegex.test(acc.value)){
        errMsg.textContent = "帳號應由6-12個英數字組合而成"
    }else if(! emailRegex.test(email.value)){
        errMsg.textContent = "email輸入格式不符"
    }else if(! mobileRegex.test(mobile.value)){
        errMsg.textContent = "手機號碼輸入格式不符"
    }else if(! pwdRegex.test(pwd.value)){
        errMsg.textContent = "密碼應由6-12個英數字組合而成"
    }else if(pwdConfirm.value !== pwd.value){
        errMsg.textContent = "確認密碼欄位與輸入密碼不相符"
    }else{
        fetch(`/${contextPath}/mem/register`, {
            method: "POST",
            headers:  { "Content-Type": "application/json" },
            body: JSON.stringify({
                memAcc: acc.value,
                memEmail: email.value,
                memMobile: mobile.value,
                memPwd: pwd.value,
            })
        }).then(function(response){
            return response.json();
        }).then(function(jsonObject){
            const{successful, message} = jsonObject;
            if(successful){

                Swal.fire(
                    message,
                    '',
                    'warning'
                ).then(function(){
                    location = "index.html";
                })


                // alert(message);
                // location = "index.html";
            }else{
                errMsg.textContent = message;
            }
        })
    }
});
