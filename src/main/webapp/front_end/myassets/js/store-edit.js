(()=>{
    const name =  document.getElementById("name");
    const email =  document.getElementById("email");
    const tel =  document.getElementById("tel");
    const storeadd =  document.getElementById("storeadd");
    const reply =  document.getElementById("reply");
    const bt =  document.getElementById("change");
    
    const pwd =  document.getElementById("psw-input")
    const pwdConfirm =  document.getElementById("psw-input-confirm")

  

    const errMsg = document.getElementById("errMsg");



    const pwdRegex = /^\w{6,12}$/
    const emailRegex =/^\w+((-\w+)|(\.\w+))*\@\w+((\.|-)\w+)*\.[A-Za-z]+$/;

    bt.addEventListener("click", function(){
        errMsg.textContent = "";
        if( name.value === null || name.value.trim().length === 0
        ||  email.value === null || email.value.trim().length === 0
        ||  tel.value === null || tel.value.trim().length === 0
        ||  storeadd.value === null || storeadd.value.trim().length === 0
        ||  reply.value === null || reply.value.trim().length === 0
        ||  pwd.value === null || pwd.value.trim().length === 0
        ||   pwdConfirm.value === null || pwdConfirm.value.trim().length === 0){
            errMsg.textContent = "尚有必填欄位未輸入";
        }else if(! emailRegex.test(email.value)){
            errMsg.textContent = "email輸入格式不符"
        }else if(! pwdRegex.test(pwd.value)){
        errMsg.textContent = "密碼應由6-12個英數字組合而成"
        }else if(pwdConfirm.value !== pwd.value){
        errMsg.textContent = "確認密碼欄位與輸入密碼不相符"
        }else{
            fetch("/flyday/store/edit", {
                method: "POST",
                headers:  { "Content-Type": "application/json" },
                body: JSON.stringify({
                    storeName: name.value,
                    storeEmail: email.value,
                    storeTel: tel.value,
                    storeAdd: storeadd.value,
                    storePwd: pwd.value,
                    storeReply: reply.value
                })
            }).then(function(response){
                return response.json();
            }).then(function(jsonObject){
                const{successful, message} = jsonObject;
                if(successful){
                    const {storeName} = jsonObject;
                    sessionStorage.setItem("storeName", storeName);
                    name.value = "";
                    email.value = "";
                    tel.value = "";
                    storeadd.value = "";
                    reply.value = "";
                    pwd.value = "";
                    pwdConfirm.value = "";
                }
                errMsg.textContent = message
            })
        }
    })

    function storename(){
        document.getElementById("storename1").textContent = sessionStorage.getItem("storeName");
        document.getElementById("storename2").textContent = sessionStorage.getItem("storeName");
    }

    storename();

	const logout = document.getElementById("logout");
    logout.addEventListener("click", function(){
        sessionStorage.removeItem("storeNo");
        sessionStorage.removeItem("storeName");
        fetch("/flyday/store/logout")
        location = "/flyday/front_end/store-sign-in.html";
    })

})();