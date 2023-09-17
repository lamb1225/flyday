const getcoupbtn = document.querySelector('#getcoupbtn');
const msg = document.querySelector('#coupmsg');
const memcoupbtn = document.querySelector('#memcoupbtn');
const memcoups = document.querySelector('#memcoup');

let coups;
let memcoup;

// 查詢所有行程優惠券
fetch('/flyday/pkg/PkgCoupFindall', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
})
    .then(function (resp) {
        return resp.json()
    })
    .then(function (data) {
        coups = data;
    })
    .catch(function (error) {
        console.log(error);
    })

// 點擊優惠券專區
getcoupbtn.addEventListener('click', function () {
    console.log("okokok");
    showgetcoup();
})

// 當點擊優惠券專區，顯示所有已上架優惠券
function showgetcoup() {
    let getcouphtml = '';

    for (let i = 0; i < coups.length; i++) {

        if (coups[i].pkgCoupState === 1) {
            getcouphtml += `
										<div class="card border mb-4">
											<div
												class="card-header border-bottom d-md-flex justify-content-md-between align-items-center">

												<div class="d-flex align-items-center">
													<div class="icon-lg bg-light rounded-circle flex-shrink-0"><i
															class="fa-solid fa-tag"></i></div>

													<div class="ms-2">
														<h6 class="card-title mb-0">${coups[i].pkgCoupName}</h6>
														<ul class="nav nav-divider small">
															<li class="nav-item">Coupon ID: </li>
															<li class="nav-item">${coups[i].pkgCoupNo}</li>
														</ul>
													</div>

													<div class="ms-4">
														<h6 class="card-title mb-0">優惠券介紹</h6>
														<span>${coups[i].pkgCoupIntroduce}</span>
													</div>

													<div class="ms-8 mt-md-0">
														<button class="btn btn-primary-soft mb-0" type="button" onclick='getcoupon(${coups[i].pkgCoupNo})' id="getcoupon${coups[i].pkgCoupNo}">領取</button>
													</div>
												</div>


											</div>

											<div class="card-body">
												<div class="row g-3">

													<div class="col-sm-6 col-md-4">
														<span>折扣金額</span>
														<h6 class="mb-0">${coups[i].pkgCoupDiscount}</h6>
													</div>

													<div class="col-md-4">
														<span>最低消費金額</span>
														<h6 class="mb-0">${coups[i].pkgCoupMinicharge}</h6>
													</div>


													<div class="col-sm-6 col-md-4">
														<span>領取截止日</span>
														<h6 class="mb-0">${coups[i].pkgCoupEndDate}</h6>
													</div>

													<div class="col-sm-6 col-md-4">
														<span>使用起始日</span>
														<h6 class="mb-0">${coups[i].pkgCoupUseStartDate}</h6>
													</div>

													<div class="col-sm-6 col-md-4">
														<span>使用截止日</span>
														<h6 class="mb-0">${coups[i].pkgCoupUseEndDate}</h6>
													</div>
												</div>
											</div>
										</div>

                                        `;
            getcoup.innerHTML = getcouphtml;
        }
    }
}

// 當點擊領取按鈕，新增到會員優惠券
function getcoupon(pkgCoupNo){
    fetch('/flyday/pkg/MemCoupAdd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            pkgCoupNo: pkgCoupNo ,
            memNo : 2,
            memPkgCoupState : 0
        })
    })
        .then(function (resp) {
            return resp.json()
        })
        .then(function (body) {
            const { successful, message} = body;
            if (successful) {
                msg.textContent = "領取成功";
                let button = document.querySelector("#getcoupon"+pkgCoupNo);
                console.log("btn");
                button.disabled = true;
                button.value = "已領取";
            } else {
                msg.textContent = "領取失敗";
            }
        })
       
}


// 查詢所有會員優惠券
fetch('/flyday/pkg/MemCoupFindAll', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
})
    .then(function (resp) {
        return resp.json()
    })
    .then(function (data) {
        memcoup = data;
        showmemcoup;
    })
    .catch(function (error) {
        console.log(error);
    })

// 點擊我的優惠券
memcoupbtn.addEventListener('click', function () {
    showmemcoup();
})

function showmemcoup(){
    let memcouphtml = '';

    for (let i = 0; i < memcoup.length; i++) {

        if (memcoup[i].memPkgCoupState === 0) {
            memcouphtml += `
										<div class="card border mb-4">
											<div
												class="card-header border-bottom d-md-flex justify-content-md-between align-items-center">

												<div class="d-flex align-items-center">
													<div class="icon-lg bg-light rounded-circle flex-shrink-0"><i
															class="fa-solid fa-tag"></i></div>

													<div class="ms-2">
														<h6 class="card-title mb-0">${memcoup[i].pkgCoupName}</h6>
														<ul class="nav nav-divider small">
															<li class="nav-item">Coupon ID: </li>
															<li class="nav-item">${memcoup[i].pkgCoupNo}</li>
														</ul>
													</div>

													<div class="ms-4">
														<h6 class="card-title mb-0">優惠券介紹</h6>
														<span>${memcoup[i].pkgCoupIntroduce}</span>
													</div>

													<div class="ms-8 mt-md-0">
														<button class="btn btn-primary-soft mb-0" type="button" onclick='getcoupon(${memcoup[i].pkgCoupNo})' id="getcoupon${coups[i].pkgCoupNo}">領取</button>
													</div>
												</div>


											</div>

											<div class="card-body">
												<div class="row g-3">

													<div class="col-sm-6 col-md-4">
														<span>折扣金額</span>
														<h6 class="mb-0">${memcoup[i].pkgCoupDiscount}</h6>
													</div>

													<div class="col-md-4">
														<span>最低消費金額</span>
														<h6 class="mb-0">${memcoup[i].pkgCoupMinicharge}</h6>
													</div>


													<div class="col-sm-6 col-md-4">
														<span>領取截止日</span>
														<h6 class="mb-0">${memcoup[i].pkgCoupEndDate}</h6>
													</div>

													<div class="col-sm-6 col-md-4">
														<span>使用起始日</span>
														<h6 class="mb-0">${memcoup[i].pkgCoupUseStartDate}</h6>
													</div>

													<div class="col-sm-6 col-md-4">
														<span>使用截止日</span>
														<h6 class="mb-0">${memcoup[i].pkgCoupUseEndDate}</h6>
													</div>
												</div>
											</div>
										</div>

                                        `;
            memcoups.innerHTML = memcouphtml;
        }
    }
}