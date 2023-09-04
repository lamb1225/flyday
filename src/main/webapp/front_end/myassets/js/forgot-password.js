const emailInput = document.getElementById("email-input");
const emailRegex =/^\w+((-\w+)|(\.\w+))*\@\w+((\.|-)\w+)*\.[A-Za-z]+$/;

const verificationInput = document.getElementById("verification-input");
const verificationRegex = /^[0-9]{6}$/;

const sendEmailBtn = document.getElementById("send-email-btn");
const resetPasswordBtn = document.getElementById("reset-password-btn");

const errMsg = document.getElementById("errMsg");

emailInput.addEventListener("change", function(){
    sendEmailBtn.removeAttribute("disabled");
});

verificationInput.addEventListener("change", function(){
    resetPasswordBtn.removeAttribute("disabled");
});

const contextPath = window.location.pathname.split('/')[1];
let countdown = 60;
//--設定發送驗證信
sendEmailBtn.addEventListener("click", function(){
    errMsg.textContent="";
    if(emailInput.value === null || emailInput.value.trim().length === 0){
        errMsg.textContent = "未輸入Email";
    }else if(! emailRegex.test(emailInput.value)){
        errMsg.textContent = "email輸入格式不符"
    }else{
    const formData = new FormData();
    formData.append("memEmail", emailInput.value )
    formData.append("action", "sendEmail")

        fetch(`/${contextPath}/mem/forgetPassword`,{
            method: "POST",
            body: formData
        }).then(function(response){
            return response.json();
        }).then(function(jsonObject){
            const{successful, message}=jsonObject;
            if(successful){ 
                emailInput.setAttribute("disabled", true);  //按下發送驗證信後，就不讓使用者更改電子信箱，避免錯誤
                errMsg.textContent = message;
                //設計每過60秒才能再次發送驗證信
                sendEmailBtn.setAttribute("disabled", true)
                sendEmailBtn.textContent = `再次發送(${countdown}s)`;

                const timer = setInterval(function(){
                    countdown--;
                    sendEmailBtn.textContent = `再次發送(${countdown}s)`;

                    if(countdown <= 0){
                        clearInterval(timer);
                        sendEmailBtn.textContent = "發送驗證信" ;
                        sendEmailBtn.removeAttribute("disabled");
                        countdown = 60;
                    }
                },1000);
            }else{
                errMsg.textContent = message;
            }
        })
    }
});

//--點擊輸入驗證碼時，錯誤訊息會刪除
verificationInput.addEventListener("focus", function(){
errMsg.textContent = "";
});

//--完成變更前確認驗證碼是否正確
resetPasswordBtn.addEventListener("click", function(){
errMsg.textContent = "";
if(verificationInput.value === null || verificationInput.value.trim().length === 0){
    errMsg.textContent = "未輸入驗證碼";
}else if(! verificationRegex.test(verificationInput.value)){
    errMsg.textContent = "驗證碼輸入格式不符"
}else{
    const formData = new FormData();
    formData.append("verificationInput" , verificationInput.value);
    formData.append("action", "resetPassword");
    formData.append("memEmail", emailInput.value);

    fetch(`/${contextPath}/mem/forgetPassword`,{
            method: "POST",
            body:formData
        }).then(function(response){
            return response.json();
        }).then(function(jsonObject){
        const{successful , message} = jsonObject;
        if(successful){
            alert(message);
            location =  `/${contextPath}/front_end/new-password-unsigned.html`;
        }else{
            errMsg.textContent = message;
        }

    })  
}
})
