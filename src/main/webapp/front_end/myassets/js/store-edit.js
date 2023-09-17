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

	fetch("/flyday/store/select",{
		method: "POST",
        headers:  { "Content-Type": "application/json" },
        body: JSON.stringify({storeNo: sessionStorage.getItem("storeNo")})
	}).then(resp => resp.json())
	.then(data =>{
		name.value = data.storeName;
        email.value = data.storeEmail;
        tel.value = data.storeTel;
        storeadd.value = data.storeAdd;
		if(data.storeReply != null){
			reply.value = data.storeReply;
		}
        
	})

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
                    pwd.value = "";
                    pwdConfirm.value = "";
                }
                errMsg.textContent = message
            })
        }
    })
    
    
    const storePics = document.getElementsByClassName("store-pic");
    const updatepic = document.getElementById("uploadfile-1");
    updatepic.addEventListener("change", function() {
        const formData = new FormData();
  		formData.append("image", updatepic.files[0]);
  		formData.append("storeNo", sessionStorage.getItem("storeNo"));
       	
       	fetch("/flyday/store/editpic", {
        	method: "POST",
            body: formData
        }).then(function(response){
    		return response.json();
  		}).then(function(jsonObject){
    		const{successful, message, storePicBase64} = jsonObject;
    		if(successful){
      			for(let storePic of storePics){
        			const picBase64Url = storePicBase64;
        			storePic.setAttribute("src", "data:image/jpeg;base64," + picBase64Url); 
      			}
    		}
    		sessionStorage.setItem("storePicBase64", storePicBase64);
  		});
    });
    
    

    function storename(){
        document.getElementById("storename1").textContent = sessionStorage.getItem("storeName");
        document.getElementById("storename2").textContent = sessionStorage.getItem("storeName");
        for(let storePic of storePics){
        			const picBase64Url = sessionStorage.getItem("storePicBase64");
        			storePic.setAttribute("src", "data:image/jpeg;base64," + picBase64Url); 
      	}
    }

    storename();

	const logout = document.getElementById("logout");
    logout.addEventListener("click", function(){
        sessionStorage.removeItem("storeNo");
        sessionStorage.removeItem("storeName");
        sessionStorage.removeItem("storePicBase64");
        fetch("/flyday/store/logout")
        location = "/flyday/front_end/store-sign-in.html";
    })

})();