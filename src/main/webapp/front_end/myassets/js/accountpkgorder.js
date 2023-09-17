
const orderinfo = document.querySelector('#orderinfo');

    document.addEventListener("DOMContentLoaded", async function () {
        // 顯示會員結帳商品
        await fetch('/flyday/pkg/PkgOrdFindAll', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            }).then(function (data) {
                return data.json()
            }).then(function (data) {
                console.log("edge");
                orderhtml = '';
                for (i = 0; i < data.length; i++) {
                    if(data[i].memNo==sessionStorage.getItem("memno")){
                           orderhtml+=`
                           
                           <div class="card-body">
												<div class="row g-3">

													<div class="col-sm-6 col-md-4">
														<span>旅客姓名</span>
														<h6 class="mb-0">${data[i].conName}</h6>
													</div>

													<div class="col-md-4">
														<span>電話</span>
														<h6 class="mb-0">${data[i].conPhone}</h6>
													</div>


													<div class="col-sm-6 col-md-4">
														<span>信箱</span>
														<h6 class="mb-0">${data[i].conEmail}</h6>
													</div>

													<div class="col-sm-6 col-md-4">
														<span>實付總金額</span>
														<h6 class="mb-0">${data[i].pkgPayPrice}</h6>
													</div>

													
												</div>
											</div>
										</div>
                           
                           
                           `;

                        }
                }
                orderinfo.innerHTML=orderhtml;
                
            })
    })
    
