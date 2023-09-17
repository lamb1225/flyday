let tkts;
let tktsToRender;
let tktimgs;
let firstImages = {};
let tktsSelectedSorts; // 放篩選後的資料(票券種類)


document.addEventListener("DOMContentLoaded", async function(){
    // 圖片
    await fetch('addtktimglist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },        
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            const { status, statusText } = response;
            throw Error(`${status}: ${statusText}`);
        }
    })
    .then(function (data) {
        // console.log(data);
        tktimgs = data;
        showTktimglist(); //將其顯示到頁面中(初始顯示頁面)
    })
    .catch(function (error) {
        console.log(error);
    })
    // 票券資料(文字)
    await fetch('tktLowPriceList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },        
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            const { status, statusText } = response;
            throw Error(`${status}: ${statusText}`);
        }
    })
    .then(function (data) {
        // console.log(data);
        tkts = data;
        showTktList(); //將其顯示到頁面中(初始顯示頁面)
    })
    .catch(function (error) {
        console.log(error);
    })

    // 篩選按鈕
    const filterBtn = document.getElementById("filterBtn");
    filterBtn.addEventListener("click", function () {
        const selectAll = document.querySelector('.tktSortAll');
        if (selectAll.checked) {
            return showTktList(); // 顯示所有票券
        } else {
            const elements = document.querySelectorAll(".tktSort"); // 找到所有的checkbox
            // console.log(elements);    
            let tktSorts = [];
            elements.forEach(ele=>tktSorts.push(ele.checked)); // 存true/false，確認所有checkbox的打勾狀態
            // console.log(tktSorts);
            // 算有打勾的checkbox個數
            let count = 0
            for(let i = 0; i < tktSorts.length; i++){
                if(tktSorts[i] == true){
                    count++;
                }
            }  
            // 篩選資料(票券種類)
            tktsSelectedSorts = tkts.filter(item => {
                if(tktSorts[item.tktsort]){
                    return true
                }
            })
            if (count == 0) {
                document.getElementById("tktSort-1").checked = true;
                showTktList();
            } else {
                showFilterTktList(); // 顯示篩選後的票券
            }
        }
    })

    // 票券種類選擇"全部"
    function handleClickTktSort (e){
        const selectAll = document.querySelector('.tktSortAll');
        if (selectAll.checked) {
            return showTktList(); // 顯示所有票券
        }
    }

    // header轉跳篩選後的頁面
    let url = new URL(location.href);
    // console.log('hash',url.hash);
    if(url.hash){
        // console.log('hash',url.hash);
        const [,hash] = url.hash.split('#');
        document.getElementById("tktSort-1").checked = false;
        document.getElementById(hash).checked = true; // 該checkbox打勾
        filterBtn.click(); // 點擊"篩選結果"按鈕
    }



});

// 篩選出每個商品的第一個圖片
function showTktimglist(){
    for (const image of tktimgs) {
        const tktno = image.tktno;    
        // 如果該tktno尚未在firstImages對像中存在，將其添加為第一個圖片
        if (!(tktno in firstImages)) {
            firstImages[tktno] = image.tktimgBase64;
        }
    }
}

// 顯示所有票券(初始顯示頁面)
function showTktList(){
    let html = "";
    for (let i = 0; i < tkts.length; i++) {
        html += htmlList(i);  
    }    
    $("#addTktPriceList").html(html);
    // document.getElementById("t1").innerHTML = html;
}

// 顯示篩選後的票券
function showFilterTktList(){
    let html = "";
    let count = 0;
    for (let i = 0; i < tktsSelectedSorts.length; i++) {
        html += htmlListFilter(i);
        count++;
    }    
    if(count === 0){
        html = `<h4 class="form-control-centered text-secondary">沒有此類型的商品</h4>`;
    }  
    $("#addTktPriceList").html(html);
}

// HTML程式碼
function htmlList(i){
    mark = tkts[i].tktno;
    let html ="";
    html += `
    <!-- Card item START -->
    <div class="card shadow p-2">
        <div class="row g-0">

            <!-- Card img -->
            <div class="col-md-5 position-relative">
    `;     
    if (firstImages[mark] !== undefined) {
        html += `<img src="data:image/jpeg;base64,${firstImages[mark]}" class="card-img rounded-2" alt="Card image" name="tktimg${tkts[i].tktno}" id="tktimg${tkts[i].tktno}">`;
    } else {
        html += `<img class="rounded" src="../assets/images/DefaultPicture.jpg" alt="avatar" name="tktimg${tkts[i].tktno}" id="tktimg${tkts[i].tktno}">`;
    }
    html += `
            </div>

            <!-- Card body -->
            <div class="col-md-7">
                <div class="card-body py-md-2 d-flex flex-column h-100 position-relative">

                    <!-- Rating and buttons -->
                    <div class="d-flex justify-content-between align-items-center">
                        <ul class="list-inline mb-0">
                            <li class="list-inline-item me-0 small"><i class="fa-solid fa-star text-warning"></i></li>
                            <li class="list-inline-item me-0 small"><i class="fa-solid fa-star text-warning"></i></li>
                            <li class="list-inline-item me-0 small"><i class="fa-solid fa-star text-warning"></i></li>
                            <li class="list-inline-item me-0 small"><i class="fa-solid fa-star text-warning"></i></li>
                            <li class="list-inline-item me-0 small"><i class="fa-solid fa-star-half-alt text-warning"></i></li>
                        </ul>

                        <ul class="list-inline mb-0 z-index-2">
                            <!-- Heart icon -->
                            <!-- <li class="list-inline-item">
                                <a href="#" class="btn btn-sm btn-round btn-light"><i class="fa-solid fa-fw fa-heart"></i></a>
                            </li> -->
                        </ul>
                    </div>

                    <!-- Title -->
                    <h5 class="card-title mb-1">${tkts[i].tktname}</h5>
                    <small><i class="bi bi-geo-alt me-2"></i>台灣 ${tkts[i].city}</small>               
                    <!-- Amenities -->
                    <ul class="nav nav-divider mt-3">
                        <li class="nav-item">${tkts[i].tktinstruction}</li>
                        <!-- <li class="nav-item"><a href="#" class="mb-0 text-primary">More+</a></li> -->
                    </ul>
                    
                    <!-- Price and Button -->
                    <div class="d-sm-flex justify-content-sm-between align-items-center mt-3 mt-md-auto">
                        <!-- Price -->
                        <div class="d-flex align-items-center">
                            <h5 class="fw-bold mb-0 me-1">TWD ${tkts[i].price}</h5>
                            <span class="mb-0 me-2">起</span>
                        </div>
                        <!-- Button -->
                        <div class="mt-3 mt-sm-0">
                            <button class="btn btn-sm btn-dark mb-0 w-100 tktDetial" onclick="tktDetialBtn(${tkts[i].tktno})" name="tktDetial" id="tktDetial${tkts[i].tktno}" value="${tkts[i].tktno}">查看詳情</button>    
                        </div>                  
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Card item END -->    
    `;

    return html;
}

// 篩選後的HTML程式碼
function htmlListFilter(i){
    mark = tktsSelectedSorts[i].tktno;
    let html ="";
    html += `
    <!-- Card item START -->
    <div class="card shadow p-2">
        <div class="row g-0">

            <!-- Card img -->
            <div class="col-md-5 position-relative">
    `;     
    if (firstImages[mark] !== undefined) {
        html += `<img src="data:image/jpeg;base64,${firstImages[mark]}" class="card-img rounded-2" alt="Card image" name="tktimg${tktsSelectedSorts[i].tktno}" id="tktimg${tktsSelectedSorts[i].tktno}">`;
    } else {
        html += `<img class="rounded" src="../assets/images/DefaultPicture.jpg" alt="avatar" name="tktimg${tktsSelectedSorts[i].tktno}" id="tktimg${tktsSelectedSorts[i].tktno}">`;
    }
    html += `
            </div>

            <!-- Card body -->
            <div class="col-md-7">
                <div class="card-body py-md-2 d-flex flex-column h-100 position-relative">

                    <!-- Rating and buttons -->
                    <div class="d-flex justify-content-between align-items-center">
                        <ul class="list-inline mb-0">
                            <li class="list-inline-item me-0 small"><i class="fa-solid fa-star text-warning"></i></li>
                            <li class="list-inline-item me-0 small"><i class="fa-solid fa-star text-warning"></i></li>
                            <li class="list-inline-item me-0 small"><i class="fa-solid fa-star text-warning"></i></li>
                            <li class="list-inline-item me-0 small"><i class="fa-solid fa-star text-warning"></i></li>
                            <li class="list-inline-item me-0 small"><i class="fa-solid fa-star-half-alt text-warning"></i></li>
                        </ul>

                        <ul class="list-inline mb-0 z-index-2">
                            <!-- Heart icon -->
                            <!-- <li class="list-inline-item">
                                <a href="#" class="btn btn-sm btn-round btn-light"><i class="fa-solid fa-fw fa-heart"></i></a>
                            </li> -->
                        </ul>
                    </div>

                    <!-- Title -->
                    <h5 class="card-title mb-1">${tktsSelectedSorts[i].tktname}</h5>
                    <small><i class="bi bi-geo-alt me-2"></i>台灣 ${tktsSelectedSorts[i].city}</small>               
                    <!-- Amenities -->
                    <ul class="nav nav-divider mt-3">
                        <li class="nav-item">${tktsSelectedSorts[i].tktinstruction}</li>
                        <!-- <li class="nav-item"><a href="#" class="mb-0 text-primary">More+</a></li> -->
                    </ul>
                    
                    <!-- Price and Button -->
                    <div class="d-sm-flex justify-content-sm-between align-items-center mt-3 mt-md-auto">
                        <!-- Price -->
                        <div class="d-flex align-items-center">
                            <h5 class="fw-bold mb-0 me-1">TWD ${tktsSelectedSorts[i].price}</h5>
                            <span class="mb-0 me-2">起</span>
                        </div>
                        <!-- Button -->
                        <div class="mt-3 mt-sm-0">
                            <button class="btn btn-sm btn-dark mb-0 w-100 tktDetial" onclick="tktDetialBtn(${tktsSelectedSorts[i].tktno})" name="tktDetial" id="tktDetial${tktsSelectedSorts[i].tktno}" value="${tktsSelectedSorts[i].tktno}">查看詳情</button>    
                        </div>                  
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Card item END -->    
    `;

    return html;
}

// Function，點擊查看詳情，回傳值到另一個HTML檔
function tktDetialBtn (tktno) {
    const dataToStore = {
        buttonValue: tktno,         
    };        
    sessionStorage.setItem("myData", JSON.stringify(dataToStore));
    window.open('tkt-detail.html', '_blank');
}