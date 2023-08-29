(() => {
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
    
    btn1.addEventListener('click', () => {
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
        // const proddescLength = $("#proddesc div").text();
		// if (proddescLength < 2 || proddescLength > 5000) {
		// 	msg.textContent = '景點介紹需介於2~5000字元';
		// 	return;
		// }

        // const noticeLength = $("#notice div").text();
		// if (noticeLength < 2 || noticeLength > 500) {
		// 	msg.textContent = '購買須知需介於2~500字元';
		// 	return;
		// }

        // const howuseLength = $("#howuse div").text();
		// if (howuseLength < 2 || howuseLength > 500) {
		// 	msg.textContent = '如何使用的介紹需介於2~500字元';
		// 	return;
		// }

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

        const tktsortLength = tktsort.value;
		if (tktsortLength == '') {
			msg.textContent = '請選擇票券類型';
			return;
		}

        // const plannameLength = planname.value.length;
		// if (plannameLength < 2 || plannameLength > 40) {
		// 	msg.textContent = '方案名稱需介於2~40字元';
		// 	return;
		// }

		msg.textContent = '';
		fetch('addtkt', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			    tktname: tktname.value,
                tktstartdate: new Date(tktstartdate.value),
                tktenddate: new Date(tktenddate.value),
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
                      
			.then(body => {
                console.log(body)
				const { successful } = body;
				if (successful) {
					for (let input of inputs) {
						input.disabled = true;
					}
					btn1.disabled = true;
					msg.className = 'info';
					msg.textContent = '新增成功';
                    window.location.href='http://localhost:8081/flyday/tktt/tkt-listing-added.html';
				} else {
					msg.className = 'error';
					msg.textContent = '新增失敗';
				}
			})
            .then(data => console.log(data));
	});


})();