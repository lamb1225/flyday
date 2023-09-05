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

            	btn.addEventListener('click', () => {
        			console.log("111");
        			console.log(startdate.value);
					
        			const coupnameLength = coupname.value.length;
        			if (coupnameLength < 2 || coupnameLength > 40) {
        				addmsg.textContent = '優惠券名稱長度須介於2~40字元';
        				return;//停止後續的程式執行
        			}

        			
        			if (discount.value.trim().length===0) {
        				addmsg.textContent = '折扣金額不可為空';
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
        					console.log("ya");
        					addmsg.textContent = message;
        				} else {
        					console.log("no");
        					addmsg.textContent = message;
        				}
        			});
            			
            			
            	});

            })();