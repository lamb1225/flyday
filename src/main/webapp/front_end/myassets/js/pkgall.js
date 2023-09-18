let pkgall;

function $id(id) {
    return document.getElementById(id);
}

//畫面載入顯示全部行程
window.addEventListener("load", function () {
	const showpkgall = document.querySelector('#showpkgall')

    fetch('/flyday/pkg/findall', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            pkgall = data;
            showPkgall(); //將其顯示在頁面中
        })
        .catch(function (error) {
            console.log(error);
        })
})

// 顯示全部行程
function showPkgall() {
    let html = '';
    for (let i = 0; i < pkgall.length; i++) {
        if(`${pkgall[i].pkgReview}`==3){
        html += `
        <div class="card shadow p-2 pkgs" data-options="type${pkgall[i].pkgSort}">
        <div class="row g-0">

            <div class="col-md-5 position-relative">

                <div class="image-container rounded" style="margin-top: 25px; cursor: pointer;">
                    
                        <img onclick=view(${pkgall[i].pkgNo}) src="data:image/jpeg;base64,${pkgall[i].pkgPicBase64}">
                </div>

            </div>

            <div class="col-md-7 pkgs" data-options="type${pkgall[i].pkgSort}">
                <div class="card-body py-md-2 d-flex flex-column h-100 position-relative">


                    <div class="d-flex justify-content-between align-items-center">
                        <ul class="list-inline mb-0">
                            <li class="list-inline-item me-0 small"><i
                                    class="fa-solid fa-star text-warning"></i></li>
                            <li class="list-inline-item me-0 small"><i
                                    class="fa-solid fa-star text-warning"></i></li>
                            <li class="list-inline-item me-0 small"><i
                                    class="fa-solid fa-star text-warning"></i></li>
                            <li class="list-inline-item me-0 small"><i
                                    class="fa-solid fa-star text-warning"></i></li>
                            <li class="list-inline-item me-0 small"><i
                                    class="fa-solid fa-star-half-alt text-warning"></i></li>
                        </ul>

                        <ul class="list-inline mb-0 z-index-2">

                            <li class="list-inline-item">
                                <a href="#" class="btn btn-sm btn-round btn-light"><i
                                        class="fa-solid fa-fw fa-heart"></i></a>
                            </li>

                            <li class="list-inline-item dropdown">
                                <a href="#" class="btn btn-sm btn-round btn-light" role="button"
                                    id="dropdownShare" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <i class="fa-solid fa-fw fa-share-alt"></i>
                                </a>
                                
                            </li>
                        </ul>
                    </div>

                    <h5 class="card-title mb-1" style="cursor: pointer;"><a onclick=view(${pkgall[i].pkgNo}) target="_blank">${pkgall[i].pkgName}</a></h5>
                    <small><i class="bi bi-geo-alt me-2"></i>${pkgall[i].pkgAddress}</small>

                    <ul class="nav nav-divider mt-3">
                    
                        <li class="nav-item">
                        <div class="two-lines">
                        ${pkgall[i].pkgContent}
                        </div>
                        </li>
                        
                    </ul>


                    <ul class="list-group list-group-borderless small mb-0 mt-2">
                        <li class="list-group-item d-flex text-success p-0">
                            <i class="bi bi-patch-check-fill me-2"></i>${pkgall[i].pkgRefpolicy}
                        </li>
                        <li class="list-group-item d-flex text-success p-0">
                            <i class="bi bi-patch-check-fill me-2"></i>${pkgall[i].pkgNotice}
                        </li>
                    </ul>

                    <div
                        class="d-sm-flex justify-content-sm-between align-items-center mt-3 mt-md-auto">

                        <div class="d-flex align-items-center">
                        <h5 class="fw-bold mb-0 me-1">$<span>${pkgall[i].pkgRatetotal}</span></h5>
                           <span class="mb-0 me-2">/day</span>
                        </div>

                        <div class="mt-3 mt-sm-0">
                            <a onclick=view(${pkgall[i].pkgNo}) class="btn btn-sm btn-dark mb-0 w-100">Select</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <br>
        `;
        }
    }

    showpkgall.innerHTML = html;

}

function view(pkgNo) {
    sessionStorage.setItem("pkgNo", pkgNo);
    sessionStorage.setItem("pkgno", pkgNo);
    location = "package-detail-temp1.html";

}

 // 獲取複選框元素
 const checkboxes = document.querySelectorAll('.form-check-input');

 // 監聽複選框變化事件
 checkboxes.forEach(checkbox => {
     checkbox.addEventListener('change', updateFilters);
 });

 // 初始化篩選
 updateFilters();

 function updateFilters() {
     // 獲取選中的選項
     const selectedOptions = Array.from(checkboxes)
         .filter(checkbox => checkbox.checked)
         .map(checkbox => checkbox.value);

     // 獲取所有行程元素
     const trips = document.querySelectorAll('.card.shadow.p-2.pkgs, .col-md-7.pkgs');

     trips.forEach(trip => {
         const options = trip.getAttribute('data-options').split(' ');
         const shouldShow = selectedOptions.includes('all') || options.every(option => selectedOptions.includes(option));
         trip.style.display = shouldShow ? 'block' : 'none';
     });
 }

