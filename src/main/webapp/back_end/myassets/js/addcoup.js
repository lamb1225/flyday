(() => {
                const btn = document.querySelector('#btn');
            	const coupname = document.querySelector('#coupname');
            	const introduction = document.querySelector('#introduction');
            	const discount = document.querySelector('#discount');
            	const startdate = document.querySelector('#startdate');
            	const enddate = document.querySelector('#enddate');
            	const usestartdate = document.querySelector('#usestartdate');
            	const useenddate = document.querySelector('#useenddate');
            	const minicharge = document.querySelector('#minicharge');
            	const state = document.querySelector('#state');
            	const addmsg = document.querySelector('#addmsg');
            	const errmsg = document.querySelector('#errmsg');
				const moneyRegex = /^[0-9]*$/;
				var dtToday=new Date();
				
            	btn.addEventListener('click', () => {
        			errmsg.textContent = '';
        			addmsg.textContent = '';
        			console.log(startdate.value);
					
        			const coupnameLength = coupname.value.length;
        			if (coupnameLength < 2 || coupnameLength > 40) {
        				errmsg.textContent = '優惠券名稱長度須介於2~40字元';
        				addmsg.textContent = '新增失敗';
        				return;//停止後續的程式執行
        			}

        			if (! moneyRegex.test(discount.value)) {
        				errmsg.textContent = '只能輸入數字';
        				addmsg.textContent = '新增失敗';
        				return;
        			}
        			
        			if (discount.value.trim().length===0) {
        				errmsg.textContent = '折扣金額不可為空';
        				addmsg.textContent = '新增失敗';
        				return;
        			}
        			
        			if (! moneyRegex.test(minicharge.value)) {
        				errmsg.textContent = '只能輸入數字';
        				addmsg.textContent = '新增失敗';
        				return;
        			}
        			
        			if (minicharge.value.trim().length===0) {
        				errmsg.textContent = '最低消費金額不可為空';
        				addmsg.textContent = '新增失敗';
        				return;
        			}
        			       			
        			const startdateValue = new Date(startdate.value);
        			startdateValue.setHours(23);
					startdateValue.setMinutes(59);
					console.log(dtToday);
					console.log(startdateValue);
					
					
					
					
        			if (startdateValue<dtToday) {
        				errmsg.textContent = '日期不可小於今天';
        				addmsg.textContent = '新增失敗';
        				return;
        			}
        			
        			
        			        			
            		fetch('/flyday/pkg/PkgCoup', {
            			method: 'POST',
            			headers: {
            				'Content-Type': 'application/json',
            			},
            			body: JSON.stringify({		
            				pkgCoupName: coupname.value,
            				pkgCoupIntroduce: introduction.value,
            				pkgCoupDiscount: discount.value,
            				pkgCoupStartDate: startdate.value,
            				pkgCoupEndDate: enddate.value,
            				pkgCoupUseStartDate: usestartdate.value,
            				pkgCoupUseEndDate: useenddate.value,
            				pkgCoupMinicharge: minicharge.value,
            				pkgCoupState: state.value
            			})
            		}).then(function(response){
                        return response.json();
            		}).then(body => {
        				const { successful, message} = body;
        				if (successful) {
        					addmsg.textContent = "新增成功";
        					setTimeout(function() {        					
        					location.reload(); 
        					}, 600);
        					
        				} else {
        					addmsg.textContent = "新增失敗";
        				}
        			});
            			
            			
            	});

            })();