const acc = document.getElementById("acc-input");
const pwd = document.getElementById("psw-input");
const errMsg = document.getElementById("errMsg");
const signIn = document.getElementById("sign-in");

const accRegex = /^\w{6,12}$/
const pwdRegex = /^\w{6,12}$/

const contextPath = window.location.pathname.split('/')[1]

signIn.addEventListener("click", function(){
	if(pwd.value === null || pwd.value.trim().length === 0
			|| acc.value === null || acc.value.trim().length === 0){

		errMsg.textContent = "尚有必填欄位未輸入";
	}else if(! accRegex.test(acc.value)){
		errMsg.textContent = "帳號應由6-12個英數字組合而成";
	}else if(! pwdRegex.test(pwd.value)){
		errMsg.textContent = "密碼應由6-12個英數字組合而成";
	}else{
		const formData = new FormData(document.forms[0]);
		formData.append("action","checkLogin");

		fetch(`/${contextPath}/mem/login`, {
			method: "POST",
			body: formData
		}).then(function(response){
			return response.json();
		}).then(function(jsonObject){
			const{successful, message, memNo} = jsonObject;
			if(successful){
				sessionStorage.setItem("memNo", memNo);
				const nextURL = sessionStorage.getItem("originalURL");
				if(nextURL !== null && typeof nextURL !== "undefined"){
					sessionStorage.removeItem("originalURL");	
					location = nextURL;
				}else{
					location = "index.html"
				}
				
				//用在純後端的驗證
				// document.forms[1].action = `/${contextPath}/mem/login`;
				// document.forms[1].submit();
			}else{
				errMsg.textContent = message;
			}
		})
	}
	
});