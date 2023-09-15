const pkgno = document.querySelector('#pkgno');
const pkgname = document.querySelector('#pkgname')
const group = document.querySelector('#pkggroup')
const gatherloc = document.querySelector('#gatherloc')
const pkgloc = document.querySelector('#pkgloc')
const address = document.querySelector('#address')
const latitude = document.querySelector('#latitude')
const longitude = document.querySelector('#longitude')
const pkgtype = document.querySelector('#pkgtype')
const pkgcontent = document.querySelector('#pkgcontent')
const pkgnotice = document.querySelector('#pkgnotice')
const refpolicy = document.querySelector('#refpolicy')
const pkgimgs = document.querySelector('#pkgimgs')

document.addEventListener("DOMContentLoaded", function () {
    fetch('/flyday/pkg/selectpkgno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pkgNo: pkgno.textContent })
    })
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {

            pkgname.textContent = data.pkgName;
            group.textContent = data.pkgGroup;
            gatherloc.textContent = data.pkgGather;
            pkgloc.textContent = data.pkgPlace;
            address.textContent = data.pkgAddress;
            latitude.textContent = data.pkgLatitude;
            longitude.textContent = data.pkgLongitude;
            pkgtype.textContent = data.pkgSort;
            pkgcontent.textContent = data.pkgContent;
            pkgnotice.textContent = data.pkgNotice;
            refpolicy.textContent = data.pkgRefpolicy;
            pkgimgs.setAttribute("src", "data:image/jpeg;base64," + data.pkgPicBase64);
        })

    //顯示行程圖片
    fetch('/flyday/pkgpic/select', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pkgNo: pkgno.textContent })
    })
        .then(function (resp) {
            return resp.json()
        })
        .then(function (pic) {
            html = '';
            html += `
                
										<div class="card shadow p-3">
                                        <div class="row g-4">

                                            <div class="col-md-5 position-relative">

                                                <div class="position-absolute top-0 start-0 z-index-1 mt-3 ms-4">
                                                    <div class="badge text-bg-danger">優惠中</div>
                                                </div>

                                                <div
                                                    class="tiny-slider arrow-round arrow-xs arrow-dark overflow-hidden rounded-2">
                                                    <div class="tiny-slider-inner" data-autoplay="true"
                                                        data-arrow="true" data-dots="false" data-items="1">
                                `;
            for (i = 0; i < pic.length; i++) {
                html += `
                <div><img src="${pic[i].pkgImg}"
                ></div>
                `;
                console.log(pic[i].pkgImg);
            }

            html += `
            </div>
            </div>
            </div>
            `;

            html += `
                                    <div class="col-md-7">
													<div class="card-body d-flex flex-column h-100 p-0">

														<h5 class="card-title"><a
																href="#">【58折起】全新海灣客廳室露營拖車四人房型｜一張雙人床、一張單人上下舖</a></h5>

														<ul class="nav nav-divider mb-2">
															<li class="nav-item">Air Conditioning</li>
															<li class="nav-item">Wifi</li>
															<li class="nav-item">Kitchen</li>

														</ul>

														<p class="text-success mb-0">7天前可免費取消
														</p>

														<div
															class="d-sm-flex justify-content-sm-between align-items-center mt-auto">
															<div class="d-flex align-items-center">
																<h5 class="fw-bold mb-0 me-1">$3960</h5>
																<span class="mb-0 me-2">/day</span>
																<span
																	class="text-decoration-line-through mb-0">$1000</span>
															</div>
															<div class="mt-3 mt-sm-0">
																<a href="package-booking.html" target="_blank"
																	class="btn btn-sm btn-primary mb-0">選擇</a>

															</div>
														</div>
													</div>
												</div>
											</div>
										</div>


                                        `;



            showpic.innerHTML = html;

        })
})



