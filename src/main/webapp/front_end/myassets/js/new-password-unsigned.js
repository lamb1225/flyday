//載入頁面時自動帶入帳號
const myMemAcc = document.getElementById("myMemAcc");
const contextPath = window.location.pathname.split('/')[1];

document.write('<script src="/flyday/front_end/myassets/js/sweetalert2.all.min.js"></script>'); //載入sweetalert

window.addEventListener("DOMContentLoaded", function(){
const formData = new FormData();
console.log("xxx");
formData.append("action", "accLoaded");

fetch(`/${contextPath}/mem/forgetPassword`,{
    method: "POST",
    body: formData
}).then(function(response){
    return response.text();
}).then(function(text){
    if(text === "null"){

        Swal.fire(
            '請先做電子郵件驗證！',
            '',
            'warning'
        ).then(function(){
            location = "forgot-password.html";
        })

    }else{
        myMemAcc.value = text;
    }
})
});

//更改密碼
const pwd = document.getElementById("psw-input");
const pwdConfirm = document.getElementById("psw-input-confirm");
const pwdRegex = /^\w{6,12}$/

const submitBtn = document.getElementById("submit-btn");
const errMsg = document.getElementById("errMsg");

submitBtn.addEventListener("click", function(){
if(pwd.value === null || pwd.value.trim().length === 0
    || pwdConfirm.value === null || pwdConfirm.value.trim().length === 0){

    errMsg.textContent = "尚有必填欄位未輸入";
}else if(! pwdRegex.test(pwd.value)){
    errMsg.textContent = "密碼應由6-12個英數字組合而成";
}else if(pwdConfirm.value !== pwd.value){
        errMsg.textContent = "確認密碼欄位與輸入密碼不相符";
}else{
    const formData = new FormData();
    formData.append("action", "updatePassword");
    formData.append("newMemPwd", pwd.value);
    
    fetch(`/${contextPath}/mem/forgetPassword`,{
        method: "POST",
        body: formData
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
                location = "sign-in.html";
            })

        }else{
            errMsg.textContent = message;
        }
    })
}
});