const acc = document.getElementById("acc-input");
const pwd = document.getElementById("psw-input");
const errMsg = document.getElementById("errMsg");
const signIn = document.getElementById("sign-in");

signIn.addEventListener("click", function(){
	fetch("/flyday/mem/login", {
		method: "POST",
		headers:  { "Content-Type": "application/json" },
		body: JSON.stringify({
			memAcc: acc.value,
			memPwd: pwd.value
		})
	}).then(function(response){
		return response.json();
	}).then(function(jsonObject){
		const{successful, message} = jsonObject;
		if(successful){
			const{memAcc} = jsonObject;
			sessionStorage.setItem("memAcc", memAcc);
			location = "index.html";
		}else{
			errMsg.textContent = message;
		}
	})
});