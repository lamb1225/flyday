let tkts;
let tktsToRender;
let tktimgs;
let firstImages = {};

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
        tktimgs = data;
        showTktimglist(); //將其顯示到頁面中(初始顯示頁面)
    })
    .then(obj => console.log(obj))
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
        console.log(data);
        tkts = data;
        showTktlist(); //將其顯示到頁面中(初始顯示頁面)
    })
    .then(obj => console.log(obj))
    .catch(function (error) {
        console.log(error);
    })

    // 點擊查看詳情，回傳值到另一個HTML檔
    $("button[id='tktDetial']").on("click", function () {
        const buttonValue = $(this).val();
        const dataToStore = {
            buttonValue: buttonValue,         
        };        
        sessionStorage.setItem("myData", JSON.stringify(dataToStore));
        window.location.href='tkt-detail.html';
    });

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
function showTktlist(){
    let html = "";
    for (let i = 0; i < tkts.length; i++) {
        html += htmlList(i);  
    }    
    $("#addTktPriceList").html(html);
    // document.getElementById("t1").innerHTML = html;
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
                            <li class="list-inline-item">
                                <a href="#" class="btn btn-sm btn-round btn-light"><i class="fa-solid fa-fw fa-heart"></i></a>
                            </li>
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
                            <button class="btn btn-sm btn-dark mb-0 w-100" name="tktDetial" id="tktDetial" value="${tkts[i].tktno}">查看詳情</button>    
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