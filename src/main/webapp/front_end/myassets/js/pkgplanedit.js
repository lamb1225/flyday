document.addEventListener("DOMContentLoaded",function(){
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

    fetch("/flyday/pkgplan/selectpkgplanno",{
        method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({
            pkgPlanNo: sessionStorage.getItem("pkgPlanNo")
        })
    }).then(function(resp){
        return resp.json();
    }).then(data =>{
        planname.value = data.pkgPlanTitle;
        plannum.value = data.pkgPlanNum;
		pkgdeposit.value = data.pkgGroupMoney;
		plancontent.value = data.pkgPlanContent;
    })
	
	const check = /^[0-9]+$/;
	const check2 = /^.{1,100}$/;
	const check3 = /^.{1,500}$/;
	
	planname.addEventListener("blur", function(){
		errmsg1.textContent="";
		if(planname.value === null ||planname.value.trim().length === 0){
			errmsg1.textContent="行程方案名稱不能為空";
		}else if(!check2.test(planname.value)){
			errmsg1.textContent="行程方案名稱字數過多";
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
		}else if(!check3.test(plancontent.value)){
			errmsg4.textContent="行程方案內容字數過多";
		}
	})

    bt.addEventListener("click", async function(){
		errmsg.textContent="";
		fetch("/flyday/pkgplan/edit",{
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
			    pkgPlanNo: sessionStorage.getItem("pkgPlanNo"),
			    pkgNo: sessionStorage.getItem("pkgNo"),
				pkgPlanTitle: planname.value,
				pkgPlanNum: plannum.value,
				pkgGroupMoney: pkgdeposit.value,
				pkgPlanContent: plancontent.value,
				pkgPlanReview: 0
			})
		}).then(resp => resp.json())
        .then(data => {
            if(data.successful){
                errmsg.textContent = data.message;
			    window.location.href = "pkgplanlist.html";
            }
        })
		
	})
})