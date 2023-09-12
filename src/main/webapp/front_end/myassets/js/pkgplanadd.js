document.addEventListener("DOMContentLoaded", function(){
	const planname = document.getElementById("planname");
	const plannum = document.getElementById("plannum");
	const pkgdeposit = document.getElementById("pkgdeposit");
	const plancontent = document.getElementById("plancontent");
	const bt = document.getElementById("sent");
	const errmsg1 = document.getElementById("errMsg1");
	const errmsg2 = document.getElementById("errMsg2");
	const errmsg3 = document.getElementById("errMsg3");
	const errmsg4 = document.getElementById("errMsg4");
	const errmsg = document.getElementById("errMsg");
	
	const storePics = document.getElementsByClassName("store-pic");
	function storename(){
	        document.getElementById("storename1").textContent = sessionStorage.getItem("storeName");
	        for(let storePic of storePics){
        			const picBase64Url = sessionStorage.getItem("storePicBase64");
        			storePic.setAttribute("src", "data:image/jpeg;base64," + picBase64Url); 
      			}
	}
	
	storename();
	
	const check = /^[0-9]+$/;
	
	planname.addEventListener("blur", function(){
		errmsg1.textContent="";
		if(planname.value === null ||planname.value.trim().length === 0){
			errmsg1.textContent="行程方案名稱不能為空";
		}
	})
	
	plannum.addEventListener("blur", function(){
		errmsg2.textContent="";
		if(plannum.value === null ||plannum.value.trim().length === 0){
			errmsg2.textContent="行程方案人數不能為空";
		}else if(!check.test(plannum.value)){
			errmsg2.textContent="行程方案人數只能為整數";
		}
	})
	
	pkgdeposit.addEventListener("blur", function(){
		errmsg3.textContent="";
		if(pkgdeposit.value === null ||pkgdeposit.value.trim().length === 0){
			errmsg3.textContent="行程方案訂金不能為空";
		}else if(!check.test(pkgdeposit.value)){
			errmsg3.textContent="行程方案訂金只能為整數";
		}
	})
	
	plancontent.addEventListener("blur", function(){
		errmsg4.textContent="";
		if(plancontent.value === null ||plancontent.value.trim().length === 0){
			errmsg4.textContent="行程方案內容不能為空";
		}
	})
	
	
	
	bt.addEventListener("click", async function(){
		errmsg.textContent="";
		const response = await fetch("/flyday/pkgplan/add",{
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
			    pkgNo: sessionStorage.getItem("pkgNo"),
				pkgPlanTitle: planname.value,
				pkgPlanNum: plannum.value,
				pkgGroupMoney: pkgdeposit.value,
				pkgPlanContent: plancontent.value,
				pkgPlanReview: 0
			 })
		});
		if (response.ok) {
			const jsonObject = await response.json();
			const { successful, message ,pkgPlanNo} = jsonObject;
			if (successful) {
				planname.value = "";
				plannum.value = "";
				pkgdeposit.value = "";
				plancontent.value = "";
				
				
				const pkgplanno = pkgPlanNo;
				
				const inpics = document.getElementById("pkgplanpics");
				const onepic = inpics.querySelectorAll("img");
				const onepicarray = Array.from(onepic);
				const picarrry = [];
				for(let pic of onepicarray){
					const srcValue = pic.getAttribute("src");
					picarrry.push(srcValue);
				} ;
				const uploadPromises = picarrry.map(async (element) => {
					const picResponse = await fetch("/flyday/pkgplanpic/add", {
						method: "POST",
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify({
							pkgPlanNo: pkgplanno,
							pkgPlanImg: element
						})
					})
					if (!picResponse.ok) {
						throw new Error("上傳圖片時發生錯誤");
					}
				});
				await Promise.all(uploadPromises);
			}
			errmsg.textContent = message;
			window.location.href = "test-account-wishlist.html";
		}
	})
})