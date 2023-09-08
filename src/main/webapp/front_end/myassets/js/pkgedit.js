document.addEventListener("DOMContentLoaded", function () {

	const storePics = document.getElementsByClassName("store-pic");
	function storename(){
	        document.getElementById("storename1").textContent = sessionStorage.getItem("storeName");
	        for(let storePic of storePics){
        			const picBase64Url = sessionStorage.getItem("storePicBase64");
        			storePic.setAttribute("src", "data:image/jpeg;base64," + picBase64Url); 
      			}
	}
	
	storename();

	const imgpic = document.getElementById("imgpic");
	const name = document.getElementById("pkgname")
	const group = document.getElementById("pkggroup")
	const gather = document.getElementById("gather")
	const place = document.getElementById("place")
	const address = document.getElementById("address")
	const latitude = document.getElementById("latitude")
	const longitude = document.getElementById("longitude")
	const sort = document.getElementById("sort")
	const pkgcontent = document.getElementById("pkgcontent")
	const pkgnotice = document.getElementById("pkgnotice")
	const refpolicy = document.getElementById("refpolicy")
	
	const bt = document.getElementById("sent")
	
	const img = document.getElementById("image")
	    
	
	const check = /^[0-9.]+$/;
	
	const errMsg = document.getElementById("errMsg");


        fetch('/flyday/pkg/selectpkgno', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                pkgNo: sessionStorage.getItem("pkgNo")
            })
        }).then(function (resp) {
            return resp.json()
        }).then(function (jsonObject) {
            const { successful, message, pkgName, pkgGroup, pkgGather, pkgPlace, pkgAddress, pkgLatitude, pkgLongitude, pkgSort, pkgContent, pkgNotice, pkgRefpolicy, pkgPicBase64} = jsonObject;
            name.value = pkgName;
            group.selectedIndex = pkgGroup;
            gather.value = pkgGather;
            place.value =  pkgPlace;
            address.value = pkgAddress;
            latitude.value = pkgLatitude;
            longitude.value = pkgLongitude;
            sort.selectedIndex = pkgSort;
            pkgcontent.value = pkgContent;
            pkgnotice.value = pkgNotice;
            refpolicy.value = pkgRefpolicy;
            imgpic.setAttribute("src", "data:image/jpeg;base64," + pkgPicBase64);
        })
        
        bt.addEventListener("click", function(){
        errMsg.textContent = "";
        if(
            name.value === null || name.value.trim().length === 0||
            group.value === null || group.value.trim().length === 0||
            gather.value === null || gather.value.trim().length === 0||
            place.value === null || place.value.trim().length === 0||
            address.value === null || address.value.trim().length === 0||
            latitude.value === null || latitude.value.trim().length === 0||
            longitude.value === null || longitude.value.trim().length === 0||
            sort.value === null || sort.value.trim().length === 0||
            pkgcontent.value === null || pkgcontent.value.trim().length === 0||
            pkgnotice.value === null || pkgnotice.value.trim().length === 0||
            refpolicy.value === null || refpolicy.value.trim().length === 0||
            img.files.length <= 0 ){
                errMsg.textContent = "尚有必填欄位未輸入";
            }else if(! check.test(latitude.value)){
                errMsg.textContent = "經度不正確";
            }else if(! check.test(longitude.value)){
                errMsg.textContent = "緯度不正確";
            }else{
		    	const formData = new FormData();
		    	
            	formData.append("image", img.files[0]);
            	formData.append("pkgNo", sessionStorage.getItem("pkgNo"));            	
            	formData.append("storeNo", sessionStorage.getItem("storeNo"));
            	formData.append("pkgName", name.value);
            	formData.append("pkgGroup", group.value);
            	formData.append("pkgGather", gather.value);
            	formData.append("pkgPlace", place.value);
            	formData.append("pkgAddress", address.value);
            	formData.append("pkgLatitude", latitude.value);
            	formData.append("pkgLongitude", longitude.value);
            	formData.append("pkgSort", sort.value);
            	formData.append("pkgContent", pkgcontent.value);
            	formData.append("pkgNotice", pkgnotice.value);
            	formData.append("pkgRefpolicy", refpolicy.value);
            
                fetch("/flyday/pkg/edit", {
                    method: "POST",
                    body: formData
                }).then(function(response){
                    return response.json();
                }).then(function(jsonObject){
                    const{successful, message} = jsonObject;
                    if(successful){
                        location: "/flyday/front_end/test-account-profile.html";
                    }
                    errMsg.textContent = message
                })
			}
    })
        
})