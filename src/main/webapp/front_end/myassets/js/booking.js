
    const btn = document.querySelector('#paybtn');
    const pkgOrgPrice = document.querySelector('#pkgorgprice');
    const pkgDiscPrice = document.querySelector('#pkgdiscprice');
    const pkgPayPrice = document.querySelector('#pkgpayprice');
    const conName = document.querySelector('#conname');
    const conPhone = document.querySelector('#conphone');
    const conEmail = document.querySelector('#conemail');
    const pkgOrderDate = document.querySelector('#pkgorderdate');
    const orderState = document.querySelector('#orderstate');
    const errmsg = document.querySelector('#errmsg');
    const paymsg = document.querySelector('#paymsg');
    const errname = document.querySelector('#errname');
    const erremail = document.querySelector('#erremail');
    const errphone = document.querySelector('#errphone');
    const phoneRegex = /^09[0-9]{8}$/
    const numRegex = /^09[0-9]{8}$/
    const emailRegex =/^\w+((-\w+)|(\.\w+))*\@\w+((\.|-)\w+)*\.[A-Za-z]+$/;
    const cvvRegex = /^[0-9]*$/;
    // var dtToday=new Date();
    
    // ==========================================================

    const cartno = document.querySelector('#cartno');
    const cartname = document.querySelector('#cartname');
    const totalElement = document.querySelector('#total');
    const cartall = document.querySelector('#cartall');
    const content = document.querySelector('#content');
    const planname = document.querySelector('#planname');
    const amount = document.querySelector('#amount');
    const eachprice = document.querySelector('#eachprice');
    const cvv = document.querySelector('#cvv');
    const cardnumber = document.querySelector('#cardnumber');
    const cardname = document.querySelector('#cardname');
    const cardmonth = document.querySelector('#cardmonth');
    const cardyear = document.querySelector('#cardyear');
    const errcvv = document.querySelector('#errcvv');
    const errcardnumber = document.querySelector('#errcardnumber');
    const errcardname = document.querySelector('#errcardname');
    const errcardmonth = document.querySelector('#errmonth');
    const errcardyear = document.querySelector('#erryear');


    let qty;
    document.addEventListener("DOMContentLoaded", async function () {
        // 顯示會員結帳商品
        await fetch('/flyday/pkg/PkgShopFindAll', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pkgShopCartid: {
                    memNo: sessionStorage.getItem("memno")
                }
            })
        })
            .then(function (resp) {
                return resp.json()
            })
            .then(function (data) {
                carthtml = '';
                for (i = 0; i < data.length; i++) {
                 
                            amount.textContent= `${data[i].pkgShopCart.pkgQty}`;

                }
                
            })
    
    })
    
    let amountValue;
    
    //拿數量
        // function calculateTotal(element, pkgPlanNo) {
        //        console.log(element.value);
        //     amountValue = parseInt(element.value);
        //     totalAmount(singlePrice);
        // }
      
    
     //拿金額
        // function totalAmount(pkgGroupMoney) {
    
        //     console.log(pkgGroupMoney);
        //     const totalAmount = amountValue * pkgGroupMoney;
        //         console.log(totalAmount);
        
            // 在这里你可以执行任何你需要的操作，比如更新显示总金额的元素等等
            // 例如，假设你有一个显示总金额的<span>元素：
        //     totalElement.textContent = totalAmount;
    
            
        
        // }
    
    
    
    
    let singlePrice;
    
    //顯示單筆行程
    fetch('/flyday/pkgplan/selectpkgplanno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pkgPlanNo: 1 })
    })
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {

            content.textContent = `${data.pkgPlanContent}`;
            planname.textContent = `${data.pkgPlanTitle}`;
            eachprice.textContent=`${data.pkgGroupMoney}`;
            pkgorgprice.textContent =`${data.pkgGroupMoney}`;
            pkgpayprice.textContent =`${data.pkgGroupMoney}`;

            singlePrice = data.pkgGroupMoney;
            // totalElement.textContent = '';
            // console.log(amountValue);
            // console.log(singlePrice);
            
        })
    


    // ==============================================================================
    conname.addEventListener('blur', () => {
        errname.textContent = '';
        if (conname.value.trim().length===0) {
            errname.textContent = '姓名為必填';
            return;
        }else{
            errname.textContent = '';
        }
        
    })
    conphone.addEventListener('blur', () => {
        errphone.textContent = '';
        if(! phoneRegex.test(conphone.value)) {
            errphone.textContent = '請輸入手機號碼格式';
            return;
        }else{
            errphone.textContent = '';
        }
        
    })

    conemail.addEventListener('blur', () => {
        erremail.value = '';
        if(! emailRegex.test(conemail.value)) {
            erremail.textContent = '請輸入正確信箱格式';
            return;
        }else{
            erremail.textContent = '';
        }
        
    })

    cvv.addEventListener('blur', () => {
        errcvv.textContent = '';
        if(! cvvRegex.test(cvv.value)) {
            errcvv.textContent = '請輸入正確cvv三碼';
            return;
        }else{
            errcvv.textContent = '';
        }
        
    })

    cardname.addEventListener('blur', () => {
        errcardname.textContent = '';
        if(cardname.value.trim().length===0) {
            errcardname.textContent = '姓名為必填';
            return;
        }else{
            errcardname.textContent = '';
        }
        
    })

    cardyear.addEventListener('blur', () => {
        errcardyear.textContent = '';
        if(cardyear.value.trim().length===0) {
            errcardyear.textContent = '年不可為空';
            return;
        }else{
            errcardyear.textContent = '';
        }
        
    })

    cardmonth.addEventListener('blur', () => {
        errcardmonth.textContent = '';
        if(cardmonth.value.trim().length===0) {
            errcardmonth.textContent = '月不可為空';
            return;
        }else{
            errcardmonth.textContent = '';
        }
        
    })

    cardnumber.addEventListener('blur', () => {
        errcardnumber.textContent = '';
        if(cardnumber.value.trim().length===0) {
            errcardnumber.textContent = '信用卡號碼不可為空並請輸入數字';
            return;
        }else{
            errcardnumber.textContent = '';
        }
        
    })


    

    btn.addEventListener('click', () => {
        errmsg.textContent = '';
  
        
                            
        fetch('/flyday/pkg/PkgOrdAdd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({		
                pkgOrgPrice: pkgorgprice.textContent,
                pkgDiscPrice: pkgdiscprice.textContent,
                pkgPayPrice: pkgpayprice.textContent,
                conName: conname.value,
                conPhone: conphone.value,
                conEmail: conemail.value,
                memNo: sessionStorage.getItem("memno"),
                orderState: 1

            })
        }).then(function(response){
            return response.json();
        }).then(body => {
            const { successful, message} = body;
            if (successful) {
                errmsg.textContent = "新增成功";
                setTimeout(function() {        					
                location.reload(); 
                }, 600);
                
            } else {
                errmsg.textContent = "新增失敗";
            }
        });
            
           
    });
