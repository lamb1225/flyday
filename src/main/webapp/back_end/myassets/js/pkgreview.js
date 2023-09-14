const pkglist = document.getElementById("pkglist");

document.addEventListener("DOMContentLoaded",function(){
	const arr = [];
	fetch('/flyday/pkg/findall', {
        method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({})
    })
	    .then(resp => {
	        return resp.json()
	    })
	    .then( (data => {
        data.forEach(datas => {
        	arr.push(datas);
            html = `<div class="row row-cols-xl-7 align-items-lg-center border-bottom g-4 px-2 py-4">
						<!-- Data item -->
						<div class="col">
							<small class="d-block d-lg-none">行程編號</small>
							<div class="d-flex align-items-center">
								
								<!-- Info -->
								<div class="ms-2">
									<h6 class="mb-0 fw-light">${datas.pkgNo}</h6>
								</div>
							</div>
						</div>	

						<!-- Data item -->
						<div class="col">
							<small class="d-block d-lg-none">行程名稱</small>
							<h6 class="mb-0 fw-normal">${datas.pkgName}</h6>
						</div>`;
                        switch (datas.pkgGroup) {
                            case 0:
                                html += 
                                `<!-- Data item -->
                                <div class="col">
                                    <small class="d-block d-lg-none">是否開放揪團</small>
                                    <h6 class="mb-0 fw-normal">否</h6>
                                </div>
        
                                <!-- Data item -->
                                <div class="col">
                                    <small class="d-block d-lg-none">行程地點</small>
                                    <h6 class="mb-0 fw-normal">${datas.pkgPlace}</h6>
                                </div>`
                               
                                break;
                            case 1:
                                html += 
                                `<!-- Data item -->
                                <div class="col">
                                    <small class="d-block d-lg-none">是否開放揪團</small>
                                    <h6 class="mb-0 fw-normal">是</h6>
                                </div>
        
                                <!-- Data item -->
                                <div class="col">
                                    <small class="d-block d-lg-none">行程地點</small>
                                    <h6 class="mb-0 fw-normal">${datas.pkgPlace}</h6>
                                </div>`
                                
                                break;
                        

                        }


						switch (datas.pkgReview) {
							case 0:
								html += 
								`<!-- Data item -->
								<div class="col">
									<select class="js-choice" id="a${datas.pkgNo}">
										<option value="0" selected>未審核</option>
										<option value="1">未過審</option>
										<option value="2">已過審</option>
									</select>
								</div>`
								break;
							case 1:
								html +=
								`<!-- Data item -->
								<div class="col">
									<select class="js-choice" id="a${datas.pkgNo}">
										<option value="0">未審核</option>
										<option value="1" selected>未過審</option>
										<option value="2">已過審</option>
									</select>
								</div>`
								break;
							case 2:
								html +=
								`<!-- Data item -->
								<div class="col">
									<select class="js-choice" id="a${datas.pkgNo}">
										<option value="0">未審核</option>
										<option value="1">未過審</option>
										<option value="2" selected>已過審</option>
									</select>
								</div>`
								break;
							default:
                                html +=
								`<!-- Data item -->
								<div class="col">
									<select class="js-choice" id="a${datas.pkgNo}">
										<option value="0">未審核</option>
										<option value="1">未過審</option>
										<option value="2" selected>已過審</option>
									</select>
								</div>`
                                break;
						}
						html +=
						`<!-- 確認 -->
						<div class="col"><button class="btn btn-sm btn-light mb-0" onclick=sent(${datas.pkgNo})>送出</button></div>
					</div>`;
			pkglist.innerHTML += html;
        });
    }))
    
    const a1 = document.getElementById("re0");
    const a2 = document.getElementById("re1");
	const a3 = document.getElementById("re2");
	const aa = document.getElementById("re");
	
	a1.addEventListener("click", function(){
		while (pkglist.firstChild) {
    		pkglist.removeChild(pkglist.firstChild);
		}
		arr.map(datas =>{
			if (datas.pkgReview === 0) {
				html = `<div class="row row-cols-xl-7 align-items-lg-center border-bottom g-4 px-2 py-4">
						<!-- Data item -->
						<div class="col">
							<small class="d-block d-lg-none">行程編號</small>
							<div class="d-flex align-items-center">
								
								<!-- Info -->
								<div class="ms-2">
									<h6 class="mb-0 fw-light">${datas.pkgNo}</h6>
								</div>
							</div>
						</div>	

						<!-- Data item -->
						<div class="col">
							<small class="d-block d-lg-none">行程名稱</small>
							<h6 class="mb-0 fw-normal">${datas.pkgName}</h6>
						</div>`;
                        switch (datas.pkgGroup) {
                            case 0:
                                html += 
                                `<!-- Data item -->
                                <div class="col">
                                    <small class="d-block d-lg-none">是否開放揪團</small>
                                    <h6 class="mb-0 fw-normal">否</h6>
                                </div>
        
                                <!-- Data item -->
                                <div class="col">
                                    <small class="d-block d-lg-none">行程地點</small>
                                    <h6 class="mb-0 fw-normal">${datas.pkgPlace}</h6>
                                </div>`
                               
                                break;
                            case 1:
                                html += 
                                `<!-- Data item -->
                                <div class="col">
                                    <small class="d-block d-lg-none">是否開放揪團</small>
                                    <h6 class="mb-0 fw-normal">是</h6>
                                </div>
        
                                <!-- Data item -->
                                <div class="col">
                                    <small class="d-block d-lg-none">行程地點</small>
                                    <h6 class="mb-0 fw-normal">${datas.pkgPlace}</h6>
                                </div>`
                                
                                break;
                        }

						switch (datas.pkgReview) {
							case 0:
								html += 
								`<!-- Data item -->
								<div class="col">
									<select class="js-choice" id="a${datas.pkgNo}">
										<option value="0" selected>未審核</option>
										<option value="1">未過審</option>
										<option value="2">已過審</option>
									</select>
								</div>`
								break;
							case 1:
								html +=
								`<!-- Data item -->
								<div class="col">
									<select class="js-choice" id="a${datas.pkgNo}">
										<option value="0">未審核</option>
										<option value="1" selected>未過審</option>
										<option value="2">已過審</option>
									</select>
								</div>`
								break;
							case 2:
								html +=
								`<!-- Data item -->
								<div class="col">
									<select class="js-choice" id="a${datas.pkgNo}">
										<option value="0">未審核</option>
										<option value="1">未過審</option>
										<option value="2" selected>已過審</option>
									</select>
								</div>`
								break;
							default:
                                html +=
								`<!-- Data item -->
								<div class="col">
									<select class="js-choice" id="a${datas.pkgNo}">
										<option value="0">未審核</option>
										<option value="1">未過審</option>
										<option value="2" selected>已過審</option>
									</select>
								</div>`
                                break;
						}
						html +=
						`<!-- 確認 -->
						<div class="col"><button class="btn btn-sm btn-light mb-0" onclick=sent(${datas.pkgNo})>送出</button></div>
					</div>`;
			pkglist.innerHTML += html;
			}
		})
	})
	a2.addEventListener("click", function(){
		while (pkglist.firstChild) {
    		pkglist.removeChild(pkglist.firstChild);
		}
		arr.map(datas =>{
			if (datas.pkgReview === 1) {
				html = `<div class="row row-cols-xl-7 align-items-lg-center border-bottom g-4 px-2 py-4">
						<!-- Data item -->
						<div class="col">
							<small class="d-block d-lg-none">行程編號</small>
							<div class="d-flex align-items-center">
								
								<!-- Info -->
								<div class="ms-2">
									<h6 class="mb-0 fw-light">${datas.pkgNo}</h6>
								</div>
							</div>
						</div>	

						<!-- Data item -->
						<div class="col">
							<small class="d-block d-lg-none">行程名稱</small>
							<h6 class="mb-0 fw-normal">${datas.pkgName}</h6>
						</div>`;
                        switch (datas.pkgGroup) {
                            case 0:
                                html += 
                                `<!-- Data item -->
                                <div class="col">
                                    <small class="d-block d-lg-none">是否開放揪團</small>
                                    <h6 class="mb-0 fw-normal">否</h6>
                                </div>
        
                                <!-- Data item -->
                                <div class="col">
                                    <small class="d-block d-lg-none">行程地點</small>
                                    <h6 class="mb-0 fw-normal">${datas.pkgPlace}</h6>
                                </div>`
                               
                                break;
                            case 1:
                                html += 
                                `<!-- Data item -->
                                <div class="col">
                                    <small class="d-block d-lg-none">是否開放揪團</small>
                                    <h6 class="mb-0 fw-normal">是</h6>
                                </div>
        
                                <!-- Data item -->
                                <div class="col">
                                    <small class="d-block d-lg-none">行程地點</small>
                                    <h6 class="mb-0 fw-normal">${datas.pkgPlace}</h6>
                                </div>`
                                
                                break;
                        }

						switch (datas.pkgReview) {
							case 0:
								html += 
								`<!-- Data item -->
								<div class="col">
									<select class="js-choice" id="a${datas.pkgNo}">
										<option value="0" selected>未審核</option>
										<option value="1">未過審</option>
										<option value="2">已過審</option>
									</select>
								</div>`
								break;
							case 1:
								html +=
								`<!-- Data item -->
								<div class="col">
									<select class="js-choice" id="a${datas.pkgNo}">
										<option value="0">未審核</option>
										<option value="1" selected>未過審</option>
										<option value="2">已過審</option>
									</select>
								</div>`
								break;
							case 2:
								html +=
								`<!-- Data item -->
								<div class="col">
									<select class="js-choice" id="a${datas.pkgNo}">
										<option value="0">未審核</option>
										<option value="1">未過審</option>
										<option value="2" selected>已過審</option>
									</select>
								</div>`
								break;
							default:
                                html +=
								`<!-- Data item -->
								<div class="col">
									<select class="js-choice" id="a${datas.pkgNo}">
										<option value="0">未審核</option>
										<option value="1">未過審</option>
										<option value="2" selected>已過審</option>
									</select>
								</div>`
                                break;
						}
						html +=
						`<!-- 確認 -->
						<div class="col"><button class="btn btn-sm btn-light mb-0" onclick=sent(${datas.pkgNo})>送出</button></div>
					</div>`;
			pkglist.innerHTML += html;
			}
		})
	})
	a3.addEventListener("click", function(){
		while (pkglist.firstChild) {
    		pkglist.removeChild(pkglist.firstChild);
		}
		arr.map(datas =>{
			if (datas.pkgReview === 2) {
				html = `<div class="row row-cols-xl-7 align-items-lg-center border-bottom g-4 px-2 py-4">
						<!-- Data item -->
						<div class="col">
							<small class="d-block d-lg-none">行程編號</small>
							<div class="d-flex align-items-center">
								
								<!-- Info -->
								<div class="ms-2">
									<h6 class="mb-0 fw-light">${datas.pkgNo}</h6>
								</div>
							</div>
						</div>	

						<!-- Data item -->
						<div class="col">
							<small class="d-block d-lg-none">行程名稱</small>
							<h6 class="mb-0 fw-normal">${datas.pkgName}</h6>
						</div>`;
                        switch (datas.pkgGroup) {
                            case 0:
                                html += 
                                `<!-- Data item -->
                                <div class="col">
                                    <small class="d-block d-lg-none">是否開放揪團</small>
                                    <h6 class="mb-0 fw-normal">否</h6>
                                </div>
        
                                <!-- Data item -->
                                <div class="col">
                                    <small class="d-block d-lg-none">行程地點</small>
                                    <h6 class="mb-0 fw-normal">${datas.pkgPlace}</h6>
                                </div>`
                               
                                break;
                            case 1:
                                html += 
                                `<!-- Data item -->
                                <div class="col">
                                    <small class="d-block d-lg-none">是否開放揪團</small>
                                    <h6 class="mb-0 fw-normal">是</h6>
                                </div>
        
                                <!-- Data item -->
                                <div class="col">
                                    <small class="d-block d-lg-none">行程地點</small>
                                    <h6 class="mb-0 fw-normal">${datas.pkgPlace}</h6>
                                </div>`
                                
                                break;
                        }

						switch (datas.pkgReview) {
							case 0:
								html += 
								`<!-- Data item -->
								<div class="col">
									<select class="js-choice" id="a${datas.pkgNo}">
										<option value="0" selected>未審核</option>
										<option value="1">未過審</option>
										<option value="2">已過審</option>
									</select>
								</div>`
								break;
							case 1:
								html +=
								`<!-- Data item -->
								<div class="col">
									<select class="js-choice" id="a${datas.pkgNo}">
										<option value="0">未審核</option>
										<option value="1" selected>未過審</option>
										<option value="2">已過審</option>
									</select>
								</div>`
								break;
							case 2:
								html +=
								`<!-- Data item -->
								<div class="col">
									<select class="js-choice" id="a${datas.pkgNo}">
										<option value="0">未審核</option>
										<option value="1">未過審</option>
										<option value="2" selected>已過審</option>
									</select>
								</div>`
								break;
							default:
                                html +=
								`<!-- Data item -->
								<div class="col">
									<select class="js-choice" id="a${datas.pkgNo}">
										<option value="0">未審核</option>
										<option value="1">未過審</option>
										<option value="2" selected>已過審</option>
									</select>
								</div>`
                                break;
						}
						html +=
						`<!-- 確認 -->
						<div class="col"><button class="btn btn-sm btn-light mb-0" onclick=sent(${datas.pkgNo})>送出</button></div>
					</div>`;
			pkglist.innerHTML += html;
			}
		})
	})
	aa.addEventListener("click", function(){
		while (pkglist.firstChild) {
    		pkglist.removeChild(pkglist.firstChild);
		}
		arr.map(datas =>{
				html = `<div class="row row-cols-xl-7 align-items-lg-center border-bottom g-4 px-2 py-4">
						<!-- Data item -->
						<div class="col">
							<small class="d-block d-lg-none">行程編號</small>
							<div class="d-flex align-items-center">
								
								<!-- Info -->
								<div class="ms-2">
									<h6 class="mb-0 fw-light">${datas.pkgNo}</h6>
								</div>
							</div>
						</div>	

						<!-- Data item -->
						<div class="col">
							<small class="d-block d-lg-none">行程名稱</small>
							<h6 class="mb-0 fw-normal">${datas.pkgName}</h6>
						</div>`;
                        switch (datas.pkgGroup) {
                            case 0:
                                html += 
                                `<!-- Data item -->
                                <div class="col">
                                    <small class="d-block d-lg-none">是否開放揪團</small>
                                    <h6 class="mb-0 fw-normal">否</h6>
                                </div>
        
                                <!-- Data item -->
                                <div class="col">
                                    <small class="d-block d-lg-none">行程地點</small>
                                    <h6 class="mb-0 fw-normal">${datas.pkgPlace}</h6>
                                </div>`
                               
                                break;
                            case 1:
                                html += 
                                `<!-- Data item -->
                                <div class="col">
                                    <small class="d-block d-lg-none">是否開放揪團</small>
                                    <h6 class="mb-0 fw-normal">是</h6>
                                </div>
        
                                <!-- Data item -->
                                <div class="col">
                                    <small class="d-block d-lg-none">行程地點</small>
                                    <h6 class="mb-0 fw-normal">${datas.pkgPlace}</h6>
                                </div>`
                                
                                break;
                        }

						switch (datas.pkgReview) {
							case 0:
								html += 
								`<!-- Data item -->
								<div class="col">
									<select class="js-choice" id="a${datas.pkgNo}">
										<option value="0" selected>未審核</option>
										<option value="1">未過審</option>
										<option value="2">已過審</option>
									</select>
								</div>`
								break;
							case 1:
								html +=
								`<!-- Data item -->
								<div class="col">
									<select class="js-choice" id="a${datas.pkgNo}">
										<option value="0">未審核</option>
										<option value="1" selected>未過審</option>
										<option value="2">已過審</option>
									</select>
								</div>`
								break;
							case 2:
								html +=
								`<!-- Data item -->
								<div class="col">
									<select class="js-choice" id="a${datas.pkgNo}">
										<option value="0">未審核</option>
										<option value="1">未過審</option>
										<option value="2" selected>已過審</option>
									</select>
								</div>`
								break;
							default:
                                html +=
								`<!-- Data item -->
								<div class="col">
									<select class="js-choice" id="a${datas.pkgNo}">
										<option value="0">未審核</option>
										<option value="1">未過審</option>
										<option value="2" selected>已過審</option>
									</select>
								</div>`
                                break;
						}
						html +=
						`<!-- 確認 -->
						<div class="col"><button class="btn btn-sm btn-light mb-0" onclick=sent(${datas.pkgNo})>送出</button></div>
					</div>`;
			pkglist.innerHTML += html;
		})
	})
    
})
    function sent(pkgno){
		let reviewno = document.getElementById(`a${pkgno}`).value;
		fetch("/flyday/pkg/editreview",{
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				pkgNo: pkgno,
				pkgReview: reviewno
			})
		}).then(resp => resp.json())
		.then(data =>{
			if (data.successful) {
				location = "pkgreview.html";
			}
		})
	}