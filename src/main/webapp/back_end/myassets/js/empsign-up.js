	const acc = document.getElementById("acc-input");
	const name = document.getElementById("name-input");
	const pwd = document.getElementById("psw-input");
	const pwdConfirm = document.getElementById("psw-input-confirm");
	const errMsg = document.getElementById("errMsg");
	const register = document.getElementById("btn_signUp");
	//邏輯判斷
	const accRegex = /^\w+((-\w+)|(\.\w+))*\@\w+((\.|-)\w+)*\.[A-Za-z]+$/;
	const pwdRegex = /^\w{5,8}$/
	const nameRegex = /^.{1,10}$/



	const contextPath = window.location.pathname.split('/')[1]

	register.addEventListener("click",  function (event) {
		
		console.log(acc.value, pwd.value, name.value);
		
	    if (event.target.getAttribute('value')==="btn-signUp") {
	        event.preventDefault();
	        errMsg.textContent = ""
	        if (acc.value === null || acc.value.trim().length === 0
	            || pwd.value === null || pwd.value.trim().length === 0
	            || pwdConfirm.value === null || pwdConfirm.value.trim().length === 0) {

	            errMsg.textContent = "尚有必填欄位未輸入";
	        } else if (!accRegex.test(acc.value)) {
	            errMsg.textContent = "帳號不符email輸入格式"
	        } else if (!pwdRegex.test(pwd.value)) {
	            errMsg.textContent = "密碼應設置5-8位"
	        } else if (pwdConfirm.value !== pwd.value) {
	            errMsg.textContent = "確認密碼欄位與輸入密碼不相符"
	        }else if(!nameRegex.test(name.value)){
	        	errMsg.textContent = "姓名限制10字以內"
	        }else{
	            fetch("/flyday/emp/controller", {
	                method: "POST",
	                headers: { "Content-Type": "application/json" },
	                body: JSON.stringify({
	                    empAcc: acc.value,
	                    empPwd: pwd.value,
	                    empName: name.value,
	                    signUp: "btn-signUp"
	                })
	            }).then(function (response) {
	            	if (!response.ok) {
	                    throw new Error('Network response was not ok'); 
	                }
	                return response.json();
	            }).then(function (jsonObject) {
	                const { successful, message } = jsonObject;
	                if (successful) {
	                    location = "empList.html";
	                } else {
	                    errMsg.textContent = message;
	                }
	            }).catch(function(error) {
	                console.error('提取操作出現問題:', error.message);
	            });
	        }
	    }
	});