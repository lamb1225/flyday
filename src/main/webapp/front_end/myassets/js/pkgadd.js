(() =>{
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

    bt.addEventListener("click", async function(){
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
            
                const response = await fetch("/flyday/pkg/add", {
                	method: "POST",
                	body: formData
            	});
	            if (response.ok) {
	                const jsonObject = await response.json();
	                const { successful, message ,pkgNo} = jsonObject;
	                if (successful) {
	                    name.value = "";
	                    group.selectedIndex = 0;
	                    gather.value = "";
	                    place.value = "";
	                    address.value = "";
	                    latitude.value = "";
	                    longitude.value = "";
	                    sort.selectedIndex = 0;
	                    pkgcontent.value = "";
	                    pkgnotice.value = "";
	                    refpolicy.value = "";
	                    img.value = "";
	                    
	                    const pkgno = pkgNo;
                        
                        const inpics = document.getElementById("pkgpics");
						const onepic = inpics.querySelectorAll("img");
						const onepicarray = Array.from(onepic);
						const picarrry = [];
						for(let pic of onepicarray){
						    const srcValue = pic.getAttribute("src");
						    picarrry.push(srcValue);
						} ;
						const uploadPromises = picarrry.map(async (element) => {
	                        const picResponse = await fetch("/flyday/pkgpic/add", {
						        method: "POST",
						        headers: {"Content-Type": "application/json"},
						        body: JSON.stringify({
						            pkgNo: pkgno,
						            pkgImg: element
						        })
						    })
							if (!picResponse.ok) {
						        throw new Error("上傳圖片時發生錯誤");
						    }
						});
						await Promise.all(uploadPromises);
                    }
                    errMsg.textContent = message
                }
			};
    });
})()