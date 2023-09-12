const pwd = document.getElementById("psw-input");
const pwdConfirm = document.getElementById("psw-input-confirm");
const pwdRegex = /^\w{6,12}$/

const submitBtn = document.getElementById("submit-btn");
const errMsg = document.getElementById("errMsg");

const contextPath = window.location.pathname.split('/')[1];

submitBtn.addEventListener("click", function(){
	if(pwd.value === null || pwd.value.trim().length === 0
		|| pwdConfirm.value === null || pwdConfirm.value.trim().length === 0){

		errMsg.textContent = "尚有必填欄位未輸入";
	}else if(! pwdRegex.test(pwd.value)){
		errMsg.textContent = "密碼應由6-12個英數字組合而成";
	}else if(pwdConfirm.value !== pwd.value){
		errMsg.textContent = "確認密碼欄位與輸入密碼不相符";
	}else{
		document.forms[0].submit();
	}
});

//載入頁面時如果有成功修改密碼，會alert跳出成功訊息，並且跳轉網頁
const successMsg = document.getElementById("successMsg");

window.addEventListener("load", function(){
	if(successMsg.textContent.trim().length !== 0){
		alert(successMsg.textContent);
		location = `/${contextPath}/front_end/account-profile.html`
	}
})
