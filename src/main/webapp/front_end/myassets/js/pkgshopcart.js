const cartno = document.querySelector('#cartno');
const cartname = document.querySelector('#cartname');
const total = document.querySelector('#total');
let qty;
let totalamount =0;
let eachprice;
document.addEventListener("DOMContentLoaded", async function () {
    // 顯示會員購物車
    fetch('/flyday/pkg/PkgShopFindAll', {
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
                carthtml += `                
            <div class="row" style="height:110px;">

            <div class="col">
            <div class="row">行程名稱 : ${data[i].pkgPlan.pkgPlanContent}</div>
            <div class="row">行程方案 : ${data[i].pkgPlan.pkgPlanTitle}</div>

            <div class="row main align-items-center">
                <img style="width:190px;height: 110px;" src="/flyday/front_end/assets/images/gallery/14.jpg">

                
                <div class="col">
                    <label>數量</label>
                    <input class="form-control" style="width:80px;margin-top: 30%;" type="number" id="count" value="${data[i].pkgShopCart.pkgQty}"
                    onblur="calculateTotal(this, ${data[i].pkgShopCart.pkgPlanNo})" min="0" max="1000000" maxlength="7">
                </div>
                
                <div class="col">
                <label>$</label>${data[i].pkgPlan.pkgGroupMoney}
                </div>

                <button type="button" class="btn-close" style="margin-top: 5%;" data-bs-dismiss="modal"
                    aria-label="Close" data-bs-toggle="modal" data-bs-target="#map360"></button>

            </div>
        </div>
        <br>
        
        <hr>
        
                        `;

                        eachprice= `${data[i].pkgPlan.pkgGroupMoney}`;
                        qty= `${data[i].pkgShopCart.pkgQty}`;
                       
                        totalamount +=  qty * eachprice;
                        
            }
            
            cartall.innerHTML = carthtml;
            total.textContent=totalamount;

        })

})



