const acc = document.getElementById("storeacc");
const pwd = document.getElementById("psw-input");
const errMsg = document.getElementById("errMsg");
const signIn = document.getElementById("sign-in");

signIn.addEventListener("click", function(){
    fetch("/flyday/store/login", {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({
            storeAcc: acc.value,
            storePwd: pwd.value
        })
    }).then(function(response){
        return response.json();
    }).then(function(jsonObject){
        const{successful, message} = jsonObject;
        if(successful){
            const{storeNo, storeName, storePicBase64} = jsonObject;
            sessionStorage.setItem("storeNo", storeNo);
            sessionStorage.setItem("storeName", storeName);
            sessionStorage.setItem("storePicBase64", storePicBase64);
            location = "/flyday/front_end/store-edit.html";
        }else{
            errMsg.textContent = message;
        }
    })
})