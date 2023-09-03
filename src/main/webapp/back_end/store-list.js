const storelist = document.getElementById("storelist");

document.addEventListener("DOMContentLoaded",function(){
	fetch('/flyday/store/getinfoall')
	    .then(resp => {
	        return resp.json()
	    })
	    .then( (data => {
        data.forEach(datas => {
            storelist.innerHTML += `<div class="row row-cols-xl-7 align-items-lg-center border-bottom g-4 px-2 py-4">
						<!-- Data item -->
						<div class="col">
							<small class="d-block d-lg-none">廠商編號</small>
							<div class="d-flex align-items-center">
								
								<!-- Info -->
								<div class="ms-2">
									<h6 class="mb-0 fw-light">${datas.storeNo}</h6>
								</div>
							</div>
						</div>	

						<!-- Data item -->
						<div class="col">
							<small class="d-block d-lg-none">廠商名稱</small>
							<h6 class="mb-0 fw-normal"${datas.storeName}</h6>
						</div>

						<!-- Data item -->
						<div class="col">
							<small class="d-block d-lg-none">電話</small>
							<h6 class="mb-0 fw-normal"${datas.storeTel}</h6>
						</div>

						<!-- Data item -->
						<div class="col">
							<small class="d-block d-lg-none">地址</small>
							<h6 class="mb-0 fw-normal">${datas.storeAdd}</h6>
						</div>

						

						<!-- Data item -->
						<div class="col">
							<small class="d-block d-lg-none">信箱</small>
							<h6 class="mb-0 fw-normal">${datas.storeEmail}</h6>
						</div>

						<!-- Data item -->
						<div class="col">
							<select class="js-choice" id="">
								<option value="0">未審核</option>
								<option value="1">未過審</option>
								<option value="2">已過審</option>
							</select>
						</div>

						<!-- 確認 -->
						<div class="col"><button class="btn btn-sm btn-light mb-0" id="aaa${datas.storeNo}">送出</button></div>
					</div>`
        });
    }))
})