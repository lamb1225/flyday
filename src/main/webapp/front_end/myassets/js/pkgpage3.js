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
    //顯示單筆行程
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
            headpichtml ='';
        
            for (i = 0; i < pic.length; i++) {
           
			if(i===0){
                    html += `

              
                    <div class="carousel-item active">
                    <img src="${pic[i].pkgImg}" style="width: 200px; height: 150px;">
                    </div>
                    `;
                }else{
                    html += `

              
                    <div class="carousel-item">
                    <img src="${pic[i].pkgImg}" style="width: 200px; height: 150px;">
                    </div>
                    `;
                }

                // 頁首大圖

                if(i===0){
                    headpichtml += `
                     <div class="col-12">
								<a data-glightbox data-gallery="gallery" href='${pic[i].pkgImg}'>
									<div class="card card-grid-sm card-element-hover card-overlay-hover overflow-hidden"
										style="background-image:url('${pic[i].pkgImg}'); background-position: center left; background-size: cover;">
										<!-- Card hover element -->
										<div class="hover-element position-absolute w-100 h-100">
											<i
												class="bi bi-fullscreen fs-6 text-white position-absolute top-50 start-50 translate-middle bg-dark rounded-1 p-2 lh-1"></i>
										</div>
									</div>
								</a>
							</div>

                    `;
                }else{

                    headpichtml += `
                    <div class="col-md-6">
                    <a data-glightbox data-gallery="gallery" href='${pic[i].pkgImg}'>
                        <div class="card card-grid-lg card-element-hover card-overlay-hover overflow-hidden"
                            style="background-image:url('${pic[i].pkgImg}'); background-position: center left; background-size: cover;">
                            <!-- Card hover element -->
                            <div class="hover-element position-absolute w-100 h-100">
                                <i
                                    class="bi bi-fullscreen fs-6 text-white position-absolute top-50 start-50 translate-middle bg-dark rounded-1 p-2 lh-1"></i>
                            </div>
                        </div>
                    </a>
                </div>
                `;
                }
               
		}
            showpic.innerHTML = html;
            headpic.innerHTML = headpichtml;

        })
})


