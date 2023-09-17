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
                <img style="width:190px;height: 110px;" src="assets/images/gallery/14.jpg">

                
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

// let amountValue;

// //拿數量
//     function calculateTotal(element, pkgPlanNo) {
//        	console.log(element.value);
//         amountValue = parseInt(element.value);
//         totalAmount(singlePrice);
//     }
  

//  //拿金額
//     function totalAmount(pkgGroupMoney) {

//     	console.log(pkgGroupMoney);
//         const totalAmount = amountValue * pkgGroupMoney;
//         	console.log(totalAmount);
    
//         // 在这里你可以执行任何你需要的操作，比如更新显示总金额的元素等等
//         // 例如，假设你有一个显示总金额的<span>元素：
//         totalElement.textContent = totalAmount;

        
    
//     }




// let singlePrice;

// //顯示單筆行程
// fetch('/flyday/pkgplan/selectpkgplanno', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ pkgPlanNo: 1 })
// })
//     .then(function (resp) {
//         return resp.json()
//     })
//     .then(function (data) {
//         carthtml = '';

//         carthtml += `

   
 
//   <tr>
//   	<td>行程名稱 : </td>
//     <th>${data.pkgPlanContent}</th>
//     </tr>
//    <br>
//   <tr>
//     <th>方案內容 : </th>
//     <td>${data.pkgPlanTitle}</td>
//   </tr>

            
//                         `;

//         carthtml += `
//                         <div class="col" style="margin-top: 30%; margin-left: 65%">&#36; ${data.pkgGroupMoney}</div>
//                         `;
//         cartname.innerHTML = carthtml;
//         singlePrice = data.pkgGroupMoney;

//         totalElement.textContent = '';
//         console.log(amountValue);
//         console.log(singlePrice);
		
//     })

