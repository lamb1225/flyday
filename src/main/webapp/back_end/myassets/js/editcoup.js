(() => {
    const editbtn = document.querySelector('#editbtn');
    const ncoupno = document.querySelector('#ncoupno');
    const ncoupname = document.querySelector('#ncoupname');
 	const nintroduction = document.querySelector('#nintroduction');
    const ndiscount = document.querySelector('#ndiscount');
    const nstartdate = document.querySelector('#nstartdate');
    const nenddate = document.querySelector('#nenddate');
    const nusestartdate = document.querySelector('#nusestartdate');
    const nuseenddate = document.querySelector('#nuseenddate');
    const nminicharge = document.querySelector('#nminicharge');
    const nstate = document.querySelector('#nstate');
    const msg = document.querySelector('#msg');


    editbtn.addEventListener('click', function () {
        // ncoupname.value = 'New Value';
        console.log("sss");

        fetch('/flyday/pkg/PkgCoupEdit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                pkgCoupNo: ncoupno.value,
                pkgCoupName: ncoupname.value,
                pkgCoupIntroduce: nintroduction.value,
                pkgCoupDiscount: ndiscount.value,
                pkgCoupStartDate: nstartdate.value,
                pkgCoupEndDate: nenddate.value,
                pkgCoupUseStartDate: nusestartdate.value,
                pkgCoupUseEndDate: nuseenddate.value,
                pkgCoupMinicharge: nminicharge.value,
                pkgCoupState: nstate.value
            })
        }).then(function(response){
        	return response.json(); // 拿json字串
        }).then(data =>{
        	const { successful, message} = data;
        	if (successful) {
        	    msg.textContent = '';
        		console.log("ya");
        		console.log(data.pkgCoupName);
				ncoupname.value=data.pkgCoupName;
				nintroduction.value=data.pkgCoupIntroduce; //因為轉成json格式 可以直接.變數名，不用寫get
				ndiscount.value=data.pkgCoupDiscount;
				nstartdate.value=data.pkgCoupStartDate;
				nenddate.value=data.pkgCoupEndDate;
				nusestartdate.value=data.pkgCoupUseStartDate;
				nuseenddate.value=data.pkgCoupUseEndDate;
				nminicharge.value=data.pkgCoupMinicharge;
				nstate.value=data.pkgCoupState;
                msg.textContent = message;
			//將從 JSON 中獲取的數據分別設置到不同的表單輸入框的 .value 屬性中，這些值被設置到對應的表單輸入框中，並且直接顯示在畫面上，因為使用 .value 屬性來設置這些表單元素的值。
        	} else {
        		console.log("no");
        		msg.textContent = message;
        	}
        	
        });
        
        
    });

})();