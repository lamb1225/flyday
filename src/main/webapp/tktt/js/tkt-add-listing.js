document.addEventListener("DOMContentLoaded", function () {

    const btn1 = document.querySelector('#btn1');
    const msg = document.querySelector('#msg');
    const small = document.querySelectorAll("small[class='tkt-error-color']");

    const tktsort = document.querySelector('#tktsort');
    const tktname = document.querySelector('#tktname');
    const tktstartdate = document.querySelector('#tktstartdate');
    const tktenddate = document.querySelector('#tktenddate');
	const tktinstruction = document.querySelector('#tktinstruction');
    const location = document.querySelector('#location');
    const city = document.querySelector('#city');
    const districts = document.querySelector('#districts');
    const address = document.querySelector('#address');

    const sclatitude = document.querySelector('#sclatitude');
    const sclongitude = document.querySelector('#sclongitude');

    const schowarrival = document.querySelector('#schowarrival');
    const scservicehr = document.querySelector('#scservicehr');
    
    const proddesc = document.querySelector('#proddesc > div');
    const notice = document.querySelector('#notice > div');
    const howuse = document.querySelector('#howuse > div');

    // 城市和位置的映射
    const cityPositionMap = {
        '臺北市': 0,
        '新北市': 0,
        '基隆市': 0,
        '桃園市': 0,
        '新竹縣': 0,
        '新竹市': 0,
        '宜蘭縣': 0,
        '苗栗縣': 1,
        '臺中市': 1,
        '南投縣': 1,
        '彰化縣': 1,
        '雲林縣': 1,
        '嘉義縣': 2,
        '嘉義市': 2,
        '臺南市': 2,
        '高雄市': 2,
        '屏東縣': 2,
        '花蓮縣': 3,
        '臺東縣': 3,
        '澎湖縣': 4,    
        '金門縣': 4,
        '連江縣': 4
    };

    const planname = document.querySelector('#planname');
    
    const inputs = document.querySelectorAll('input');

    // 票券類型(驗證)
    tktsort.addEventListener("change", function () {
        if (tktsort.value == -1) {
            small[0].textContent = '請選擇票券類型';
        } else {
            small[0].textContent = '';
        }
    });
    // 標題名稱(驗證)
    tktname.addEventListener("blur", function () {
        const tktnameTrim = tktname.value.trim();
        const tktnameLength = tktnameTrim.length;
        if (tktnameTrim === '') {
            small[1].textContent = '請輸入標題名稱';
        } else if (tktnameLength < 2 || tktnameLength > 40){
            small[1].textContent = '標題長度需介於2~40字元';
        } else {
            small[1].textContent = '';
        }
    });
    // 開始日期(驗證)
    tktstartdate.addEventListener("change", function () {
        if (tktstartdate.value === '') {
            small[2].textContent = '請選擇商品開始日期';
        } else {
            small[2].textContent = '';
        }
    });
    // 結束日期(驗證)
    tktenddate.addEventListener("change", function () {
        if (tktenddate.value === '') {
            small[3].textContent = '請選擇商品結束日期';
        } else {
            small[3].textContent = '';
        }
    });
    // 商品簡介(驗證)
    tktinstruction.addEventListener("blur", function () {
        const tktinstructionTrim = tktinstruction.value.trim();        
        const tktinstructionLength = tktinstructionTrim.length;
        if (tktinstructionTrim === '') {
            small[4].textContent = '請輸入商品簡介';
        } else if (tktinstructionLength < 2 || tktinstructionLength > 500){
            small[4].textContent = '商品簡介需介於2~500字元';
        } else {
            small[4].textContent = '';
        }
    });
    // 景點名稱(驗證)
    location.addEventListener("blur", function () {
        const locationTrim = location.value.trim();
        const locationLength = locationTrim.length;
        if (locationTrim === '') {
            small[5].textContent = '請輸入景點名稱';
        } else if (locationLength < 2 || locationLength > 40){
            small[5].textContent = '景點名稱長度需介於2~40字元';
        } else {
            small[5].textContent = '';
        }
    });
     // 縣市(驗證)
     city.addEventListener("change", function () {
        if (city.value == 0) {
            small[6].textContent = '請選擇所在縣市';
        } else {
            small[6].textContent = '';
        }
    });
    // 鄉鎮市區(驗證)
    districts.addEventListener("change", function () {
        if (districts.value == 0) {
            small[7].textContent = '請選擇所在地區';
        } else {
            small[7].textContent = '';
        }
    });
    // 地址(驗證)
    address.addEventListener("blur", function () {
        const addressTrim = address.value.trim();
        const addressLength = addressTrim.length;
        if (addressTrim === '') {
            small[8].textContent = '請輸入地址';
        } else if (addressLength < 2 || addressLength > 40){
            small[8].textContent = '地址長度需介於2~40字元';
        } else {
            small[8].textContent = '';
        }
    });
    // 景點介紹(驗證)
    proddesc.addEventListener("blur", function () {
        const proddescText = proddesc.textContent.trim();
        const proddescLength = proddescText.length;
        if (proddescLength == 0) {
            $("#proddescMsgs").text('景點介紹請勿空白');
        } else if (proddescLength < 2 || proddescLength > 5000) {
            $("#proddescMsgs").text('內容需介於2~5000字元');
        } else {
            $("#proddescMsgs").text('');
        }
    });
    // 購買須知(驗證)
    notice.addEventListener("blur", function () {
        const noticeText = notice.textContent.trim();
        const noticeLength = noticeText.length;
        if (noticeLength == 0) {
            $("#noticeMsgs").text('購買須知請勿空白');
        } else if (noticeLength < 2 || noticeLength > 500){
            $("#noticeMsgs").text('內容需介於2~500字元');
        } else {
            $("#noticeMsgs").text('');
        }
    });
    // 如何使用(驗證)
    howuse.addEventListener("blur", function () {
        const howuseText = howuse.textContent.trim();
        const howuseLength = howuseText.length;
        if (howuseLength == 0) {
            $("#howuseMsgs").text('如何使用的介紹請勿空白');
        } else if (howuseLength < 2 || howuseLength > 500){
            $("#howuseMsgs").text('內容需介於2~500字元');
        } else {
            $("#howuseMsgs").text('');
        }
    });


    // 監聽"完成"按鈕
    btn1.addEventListener('click', async function() {
        // 圖片庫(存入)
        const tktimg = document.getElementById("tktimg");
        const onepic = tktimg.querySelectorAll("img");
        const picArray = Array.from(onepic);
        const picArrryAll = [];
        for(let pic of picArray){
            const srcValue = pic.getAttribute("src");
            picArrryAll.push(srcValue);
        };
        // console.log(picArrryAll);

        // 票券類型(驗證)
        if (tktsort.value == -1) {
            small[0].textContent = '請選擇票券類型';
        } else {
            small[0].textContent = '';
        }
        // 取得商品狀態(上/下架)
        const tktstat = document.querySelector('input[name="tktstat"]:checked');
        // 標題名稱(驗證)
        const tktnameTrim = tktname.value.trim();
        const tktnameLength = tktnameTrim.length;
        if (tktnameTrim === '') {
            small[1].textContent = '請輸入標題名稱';
        } else if (tktnameLength < 2 || tktnameLength > 40){
            small[1].textContent = '標題長度需介於2~40字元';
        } else {
            small[1].textContent = '';
        }
        // 開始日期(驗證)
        if (tktstartdate.value === '') {
            small[2].textContent = '請選擇商品開始日期';
        } else {
            small[2].textContent = '';
        }
         // 結束日期(驗證)
        if (tktenddate.value === '') {
            small[3].textContent = '請選擇商品結束日期';
        } else {
            small[3].textContent = '';
        }
        // 方位
        const direction = cityPositionMap[city.value];
        // 商品簡介(驗證)
        const tktinstructionTrim = tktinstruction.value.trim();        
        const tktinstructionLength = tktinstructionTrim.length;
        if (tktinstructionTrim === '') {
            small[4].textContent = '請輸入商品簡介';
        } else if (tktinstructionLength < 2 || tktinstructionLength > 500){
            small[4].textContent = '商品簡介需介於2~500字元';
        } else {
            small[4].textContent = '';
        }
        // 商品簡介(存入)
        const tktinstructionValue = tktinstruction.value;
        const tktinstructionParagraphs = tktinstructionValue.split('\n'); // 將文本分割成多個段落
            // 使用<br>標籤分隔段落並合併
        const tktinstructionHTML = tktinstructionParagraphs.map(tktinstructionParagraphs => `${tktinstructionParagraphs.trim()}<br>`).join('');        
        // console.log("tktinstructionHTML="+tktinstructionHTML);

        // 景點名稱(驗證)
        const locationTrim = location.value.trim();
        const locationLength = locationTrim.length;
        if (locationTrim === '') {
            small[5].textContent = '請輸入景點名稱';
        } else if (locationLength < 2 || locationLength > 40){
            small[5].textContent = '景點名稱長度需介於2~40字元';
        } else {
            small[5].textContent = '';
        }
        // 縣市(驗證)
        if (city.value == 0) {
            small[6].textContent = '請選擇所在縣市';
        } else {
            small[6].textContent = '';
        }
        // 鄉鎮市區(驗證)
        if (districts.value == 0) {
            small[7].textContent = '請選擇所在地區';
        } else {
            small[7].textContent = '';
        }
        // 地址(驗證)
        const addressTrim = address.value.trim();
        const addressLength = addressTrim.length;
        if (addressTrim === '') {
            small[8].textContent = '請輸入地址';
        } else if (addressLength < 2 || addressLength > 40){
            small[8].textContent = '地址長度需介於2~40字元';
        } else {
            small[8].textContent = '';
        }
        // 如何抵達(存入)
        const schowarrivalValue = schowarrival.value;
        let schowarrivalHTML;
        if(schowarrivalValue.trim() === ''){
            schowarrivalHTML = '';
        } else {
            const schowarrivalParagraphs = schowarrivalValue.split('\n'); // 將文本分割成多個段落
                // 使用<br>標籤分隔段落並合併
            schowarrivalHTML = schowarrivalParagraphs.map(schowarrivalParagraphs => `${schowarrivalParagraphs.trim()}<br>`).join('\n');
        }
        // console.log("schowarrivalHTML="+schowarrivalHTML);
        
        // 開放時間(存入)
        const scservicehrValue = scservicehr.value;
        let scservicehrHTML;
        if(scservicehrValue.trim() === ''){
            scservicehrHTML = '';
        } else {
            const scservicehrParagraphs = scservicehrValue.split('\n'); // 將文本分割成多個段落
            // 使用<br>標籤分隔段落並合併
            scservicehrHTML = scservicehrParagraphs.map(scservicehrParagraphs => `${scservicehrParagraphs.trim()}<br>`).join('\n');  
        }
        // console.log("scservicehrHTML="+scservicehrHTML);
        // 景點介紹(驗證)
        const proddescText = proddesc.textContent.trim();
        const proddescLength = proddescText.length;
        if (proddescLength == 0) {
            $("#proddescMsgs").text('景點介紹請勿空白');
        } else if (proddescLength < 2 || proddescLength > 5000) {
            $("#proddescMsgs").text('內容需介於2~5000字元');
        } else {
            $("#proddescMsgs").text('');
        }
        // 購買須知(驗證)
        const noticeText = notice.textContent.trim();
        const noticeLength = noticeText.length;
        if (noticeLength == 0) {
            $("#noticeMsgs").text('購買須知請勿空白');
        } else if (noticeLength < 2 || noticeLength > 500){
            $("#noticeMsgs").text('內容需介於2~500字元');
        } else {
            $("#noticeMsgs").text('');
        }
        // 如何使用(驗證)
        const howuseText = howuse.textContent.trim();
        const howuseLength = howuseText.length;
        if (howuseLength == 0) {
            $("#howuseMsgs").text('如何使用的介紹請勿空白');
        } else if (howuseLength < 2 || howuseLength > 500){
            $("#howuseMsgs").text('內容需介於2~500字元');
        } else {
            $("#howuseMsgs").text('');
        }

        // 方案名稱(存入+驗證)
        const plannameInputs = document.querySelectorAll('input[name="planname"]');
        const plannameValues = [];
        plannameInputs.forEach(function(input) {
            plannameValues.push(input.value);
        });        
        // console.log(plannameValues);
        $("small[id^='plannameMsg']").text('');
        $("input[name^='planname']").each(function() {
            const value = $(this).val();
            const length = $(this).val().length; 
            if (value === '') {
                $(this).prev().text('方案名稱請勿空白');
            } else if (length < 2 || length > 40) {
                $(this).prev().text('方案名稱需介於2~40個字之間');
            }
        });
        // 方案內容(存入+驗證)
        const plancontentInputs = document.querySelectorAll('textarea[name="plancontent"]');
        const plancontentValues = [];
        let plancontentHTML;
        plancontentInputs.forEach(function(input) {
        const plancontentText = input.value;
        if(plancontentText.trim() === ''){
            plancontentHTML = '';
        } else {
            const plancontentParagraphs = plancontentText.split('\n'); // 將文本分割成多個段落
                // 使用<br>標籤分隔段落並合併
            plancontentHTML = plancontentParagraphs.map(plancontentParagraphs => `${plancontentParagraphs.trim()}<br>`).join('');
        }
            plancontentValues.push(plancontentHTML);
        });     
        //  console.log(plancontentValues);
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

        // 票種(存入+驗證)
        const tkttypeAll = [];
        $("div[name='planpoint']").each(function(){
            const tkttypeValues = [];
            $(this).find("input[name='tkttype']").each(function() {
                tkttypeValues.push($(this).val());
            });            
            tkttypeAll.push(tkttypeValues.join('|'));
        });
        //  console.log(tkttypeAll);
        $("small[id^='tkttypeMsgs']").text('');
        $("div[name='planpoint']").each(function(){            
            $(this).find("input[name='tkttype']").each(function() {
            const value = $(this).val();
            const length = $(this).val().length; 
                if (value === '') {
                    $(this).prev().text('票種請勿空白');
                } else if (length < 2 || length > 50) {
                    $(this).prev().text('票種需介於2~50個字之間');
                }
            });
        });
        // 票價(存入+驗證)
        const priceAll = [];
        $("div[name='planpoint']").each(function(){
            const priceValues = [];
            $(this).find("input[name='price']").each(function() {
                priceValues.push($(this).val());
            });            
            priceAll.push(priceValues.join('|'));
        });
        //   console.log(priceAll);
        $("small[id^='priceMsgs']").text('');
        $("div[name='planpoint']").each(function(){            
            $(this).find("input[name='price']").each(function() {
                const value = $(this).val();
                const length = $(this).val().length; 
                if (value === '') {
                    $(this).prev().text('票價請勿空白');
                }
            });
        });
        // 票券
        await fetch('addtkt', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			    tktname: tktname.value,
                tktstartdate: tktstartdate.value,
                tktenddate: tktenddate.value,
                tktinstruction:  tktinstructionHTML,
                proddesc: $("#proddesc div").html(),
                notice: $("#notice div").html(),
                howuse: $("#howuse div").html(),
                location: location.value,
                direction: direction,
                city: city.value,
                districts: districts.value,
                address: address.value,

                sclatitude: 123,
                sclongitude: 123,
                
                schowarrival: schowarrivalHTML,
                scservicehr: scservicehrHTML,

                tktstat: tktstat.value,
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
			.then(data => {
                // console.log(data)
                errorMsgs = data;
                showTkterrorMegs(); // 將Tkt錯誤訊息顯示在畫面上
			})
            // 圖片
            const picResponse = await fetch('addtkt', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    tktimgBase64: picArrryAll,
                })
            })
            if (!picResponse.ok) {
                throw new Error("上傳圖片時發生錯誤");
            }
            // 方案
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
                // console.log(data)
                errorMsgs = data;
                showPlanerrorMegs(); // 將Tktplan錯誤訊息顯示在畫面上
            })
            // 票種
            await fetch('addtkt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tkttype: tkttypeAll,
                    price: priceAll,           
                    
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
                // console.log(data)
                errorMsgs = data;
                showTypeerrorMegs(); // 將Tkttype錯誤訊息顯示在畫面上
            })
    });

});

function showTkterrorMegs(){
    $("#msg").html('');
    if (errorMsgs.hasOwnProperty('msg')){
        $("#msg").html(`${errorMsgs.msg}`);
    }
}

function showPlanerrorMegs(){
    if (errorMsgs.hasOwnProperty('msg')){
        $("#msg").html(`${errorMsgs.msg}`);
    }
}

function showTypeerrorMegs(){
    if (errorMsgs.hasOwnProperty('msg')){
        $("#msg").html(`${errorMsgs.msg}`);
        if($("#msg").text() === "商品新增成功"){
           window.location.href='http://localhost:8081/flyday/tktt/tkt-listing-added.html';
        }
    }
}
