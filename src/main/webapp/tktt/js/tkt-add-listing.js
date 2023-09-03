$(function () {
    const btn1 = document.querySelector('#btn1');
    const msg = document.querySelector('#msg');
	const tktname = document.querySelector('#tktname');
    const tktstartdate = document.querySelector('#tktstartdate');
    const tktenddate = document.querySelector('#tktenddate');
    const tktinstruction = document.querySelector('#tktinstruction');
    const proddesc = document.querySelector('#proddesc');
    const notice = document.querySelector('#notice');
    const howuse = document.querySelector('#phowuse');
    const location = document.querySelector('#location');
    const countycity = document.querySelector('#countycity');
    const address = document.querySelector('#address');

    const sclatitude = document.querySelector('#sclatitude');
    const sclongitude = document.querySelector('#sclongitude');

    const schowarrival = document.querySelector('#schowarrival');
    const scservicehr = document.querySelector('#scservicehr');

    // const tktstat = document.querySelector('#tktstat');
    const tktsort = document.querySelector('#tktsort');

    const planname = document.querySelector('#planname');
    
    const inputs = document.querySelectorAll('input');

    
    btn1.addEventListener('click', async function() {
		// const tktnameLength = tktname.value.length;
		// if (tktnameLength < 2 || tktnameLength > 40) {
		// 	msg.textContent = '標題長度需介於2~40字元';
		// 	return;
		// }

        // const tktstartdateLength = tktstartdate.value.length;
		// if (tktstartdateLength == '') {
		// 	msg.textContent = '請選擇商品開始日期';
		// 	return;
		// }

        // const tktenddateLength = tktenddate.value.length;
		// if (tktenddateLength == '') {
		// 	msg.textContent = '請選擇商品結束日期';
		// 	return;
		// }

        // const tktinstructionLength = tktinstruction.value.length;
		// if (tktinstructionLength < 2 || tktinstructionLength > 40) {
		// 	msg.textContent = '商品簡介需介於2~500字元';
		// 	return;
		// }

        // console.log($("#proddesc div").html());
        // console.log($("#proddesc div").text());

        // let currentPage = $(".content.fade:visible");
        // console.log(currentPage);
        // let prevPage = currentPage.prev(".content.fade");
        // console.log(prevPage);

        // if (prevPage.length === 0) {
        //     $("html, body").animate({ scrollTop: 0 }, 1000);
        // } else {
        //     // 否则，滚动到前一个分页的顶部
        //     $("html, body").animate({
        //         scrollTop: prevPage.offset().top
                
        //     }, 1000); // 1000 是滚动动画的持续时间（以毫秒为单位）
        // }

        // 景點簡介(驗證)
        $("#proddescMsgs").text('');
        const proddescLength = $("#proddesc div").text().length;
		if (proddescLength == '') {
			$("#proddescMsgs").text('景點簡介請勿空白');

            // $("#step-2").attr("aria-labelledby", "true");
            // $("#step-3").attr("aria-labelledby", "false");
            
            // $('html, body').animate({          
    
            //     scrollTop: $("#proddescMsgs").offset().top
            // }, 1000);

		} else if (proddescLength < 2 || proddescLength > 5000){
            $("#proddescMsgs").text('景點介紹需介於2~5000字元');
        }

        // 購買須知(驗證)
        $("#noticeMsgs").text('');
        const noticeLength = $("#notice div").text().length;
		if (noticeLength == '') {
            $("#noticeMsgs").text('購買須知請勿空白');
		} else if (noticeLength < 2 || noticeLength > 500){
            $("#noticeMsgs").text('購買須知需介於2~500字元');

        }

        // 如何使用(驗證)
        $("#howuseMsgs").text('');
        const howuseLength = $("#howuse div").text().length;
		if (howuseLength == '') {
			$("#howuseMsgs").text('如何使用的介紹請勿空白');
		} else if (howuseLength < 2 || howuseLength > 500){
			$("#howuseMsgs").text('如何使用的介紹需介於2~500字元');
        }

        // const locationLength = location.value.length;
		// if (locationLength < 2 || locationLength > 40) {
		// 	msg.textContent = '景點名稱需介於2~40字元';
		// 	return;
		// }

        // const countycityLength = countycity.value.length;
		// if (countycityLength == '') {
		// 	msg.textContent = '未輸入縣市名稱';
		// 	return;
		// }

        // const addressLength = address.value.length;
		// if (addressLength == '') {
		// 	msg.textContent = '未輸入地址';
		// 	return;
		// }
       
        // const sclatitudeLength = sclatitudevalue.length;
		// if (sclatitudeLength == '') {
		// 	msg.textContent = '未輸入緯度';
		// 	return;
		// }

        // const sclongitudeLength = sclongitude.value.length;
		// if (sclongitudeLength == '') {
		// 	msg.textContent = '未輸入精度';
		// 	return;
		// }

        // const schowarrivalLength = schowarrival.value.length;
		// if (schowarrivalLength > 500) {
		// 	msg.textContent = '景點抵達內容不得超過500字元';
		// 	return;
		// }

        // const scservicehrLength = scservicehr.value.length;
		// if (scservicehrLength > 500) {
		// 	msg.textContent = '景點開放時間內容不得超過500字元';
		// 	return;
		// }

        // const tktsortLength = tktsort.value;
		// if (tktsortLength == '') {
		// 	msg.textContent = '請選擇票券類型';
		// 	return;
		// }

        // 方案(存入+驗證)
        const plannameInputs = document.querySelectorAll('[name="planname"]');
        const plannameValues = [];
        plannameInputs.forEach(function(input) {
            plannameValues.push(input.value);
        });        
        // console.log(plannameValues);
        $("small[id^='plannameMsg']").text('');
        $("input[id^='planname']").each(function() {
            const value = $(this).val();
            const length = $(this).val().length; 
            if (value === '') {
                $(this).prev().text('方案名稱請勿空白');
            } else if (length < 2 || length > 40) {
                $(this).prev().text('方案名稱需介於2~40個字之間');
            }
        });

        // 方案內容(存入+驗證)
        const plancontentInputs = document.querySelectorAll('[name="plancontent"]');
        const plancontentValues = [];
        plancontentInputs.forEach(function(input) {
            plancontentValues.push(input.value);
        });     
        // console.log(plancontentValues);
        $("small[id^='plancontentMsgs']").text('');
        $("textarea[id^='plancontent']").each(function() {
            const value = $(this).val();
            const length = $(this).val().length; 
            if (value === '') {
                $(this).prev().text('方案內容請勿空白');
            } else if (length < 2 || length > 500) {
                $(this).prev().text('方案內容需介於2~500個字之間');
            }
        });

        // 方案狀態(存入)
        const planstatInputs = document.querySelectorAll('input[id="planstatRadio"]:checked');
        const planstatValues = [];
        planstatInputs.forEach(function(input) {
            planstatValues.push(input.value);
        });  
        // console.log(planstatValues);
        

		// msg.textContent = '';
        
 
       
		await fetch('addtkt', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			    tktname: tktname.value,
                tktstartdate: tktstartdate.value,
                tktenddate: tktenddate.value,
                tktinstruction: tktinstruction.value,
                proddesc: $("#proddesc div").html(),
                notice: $("#notice div").html(),
                howuse: $("#howuse div").html(),
                location: location.value,
                countycity: countycity.value,
                address: address.value,

                sclatitude: 123,
                sclongitude: 123,
                
                schowarrival: schowarrival.value,
                scservicehr: scservicehr.value,

                tktstat: 1,
                tktsort: tktsort.value,

                ratetotal: 0,
                rateqty: 0,
			}),
		})
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    const { status, statusText } = response;
                    throw Error(`${status}: ${statusText}`);
                }
            })
            // .then(text => msg.textContent = text)
            // .then(obj => console.log(obj))
            // .catch(({ message }) => msg.textContent = message);
                      
			.then(data => {
                console.log(data)
                errorMsgs = data;
                showTkterrorMegs(); // 將Tkt錯誤訊息顯示在畫面上
                
				// const { successful } = data;
              
				// if (successful) {
				// 	for (let input of inputs) {
				// 		input.disabled = true;
				// 	}
				// 	btn1.disabled = true;
				// 	msg.className = 'info';
				// 	msg.textContent = '新增成功';
                //     window.location.href='http://localhost:8081/flyday/tktt/tkt-listing-added.html';
				// } else {
				// 	msg.className = 'error';
				// 	msg.textContent = '新增失敗';
				// }
			})
            .then(data => console.log(data));
            await fetch('addtkt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planname: plannameValues,
                    plancontent: plancontentValues,
                    soldamount: 0,
                    planstat: planstatValues,
                    
                }),
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    const { status, statusText } = response;
                    throw Error(`${status}: ${statusText}`);
                }
            })
            .then(data => {
                console.log(data)
                errorMsgs = data;
                showPlanerrorMegs(); // 將Tktplan錯誤訊息顯示在畫面上
            })
            .then(data => console.log(data));


	});
});

function showTkterrorMegs(){
    $("#msg").html('');
    $("#tktnameMsgs").html('');
    $("#tktstartdateMsgs").html('');
    $("#tktenddateMsgs").html(''); 
    $("#tktinstructionMsgs").html('');

    $("#locationMsgs").html('');
    $("#countycityMsgs").html('');
    $("#addressMsgs").html('');

    $("#tktsortMsgs").html('');

    if (errorMsgs.hasOwnProperty('msg')){
        $("#msg").html(`${errorMsgs.msg}`);
    }

    if (errorMsgs.hasOwnProperty('tktnameMsgs')){
        $("#tktnameMsgs").html(`${errorMsgs.tktnameMsgs}`);
    }
    
    if (errorMsgs.hasOwnProperty('tktstartdateMsgs')){
        $("#tktstartdateMsgs").html(`${errorMsgs.tktstartdateMsgs}`);
    }

    if (errorMsgs.hasOwnProperty('tktenddateMsgs')){
        $("#tktenddateMsgs").html(`${errorMsgs.tktenddateMsgs}`);
    }


    if (errorMsgs.hasOwnProperty('tktinstructionMsgs')){
        $("#tktinstructionMsgs").html(`${errorMsgs.tktinstructionMsgs}`);
    }

    if (errorMsgs.hasOwnProperty('locationMsgs')){
        $("#locationMsgs").html(`${errorMsgs.locationMsgs}`);
    }
    if (errorMsgs.hasOwnProperty('countycityMsgs')){
        $("#countycityMsgs").html(`${errorMsgs.countycityMsgs}`);
    }
    if (errorMsgs.hasOwnProperty('addressMsgs')){
        $("#addressMsgs").html(`${errorMsgs.addressMsgs}`);
    }

    if (errorMsgs.hasOwnProperty('tktsortMsgs')){
        $("#tktsortMsgs").html(`${errorMsgs.tktsortMsgs}`);
    }
}

function showPlanerrorMegs(){
    $("#msg").html('');
    // $("#plannameMsgs").html('');

    if (errorMsgs.hasOwnProperty('msg')){
        $("#msg").html(`${errorMsgs.msg}`);
        if($("#msg").text() === "tktplan新增成功"){
        //    window.location.href='http://localhost:8081/flyday/tktt/tkt-listing-added.html';
        }
    }

    // if (errorMsgs.hasOwnProperty('plannameMsgs')){
    //     $("#plannameMsgs").html(`${errorMsgs.plannameMsgs}`);
    // }
}

    