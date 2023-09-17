let tktno;
let tktImgs;
let tktDetial;
let tktPlanTypes;
let html = "";

// Initialize and add the map
let map;
let marker;
let geocoder;
let tktAddress;

async function initMap(address) {
  // The location of Uluru
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 15,
    // center: position,
    mapId: "DEMO_MAP_ID",
  });

  marker = new google.maps.Marker({
    map,
  });

geocoder = new google.maps.Geocoder();
geocoder
.geocode({address: address})
.then((result) => {
  const { results } = result;

  map.setCenter(results[0].geometry.location);
  marker.setPosition(results[0].geometry.location);
  marker.setMap(map);
  return results;
})
.catch((e) => {
  alert("Geocode was not successful for the following reason: " + e);
});
}

document.addEventListener("DOMContentLoaded", async function(){  

    // 拿到前一個HTML檔傳來的值
    const storedData = sessionStorage.getItem("myData");
    const dataObject = JSON.parse(storedData);
    if (dataObject) {
        tktno = dataObject.buttonValue;
    } else {
        console.log("沒有存儲的數據可供檢索");
    }
    // console.log(tktno);
    
    // 回傳Tktno，取得該商品的詳細內容
    await fetch('tktDetail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },    
        body: JSON.stringify({
            tktno: tktno,            
        }),    
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
        tktDetial = data;
        tktAddress = tktDetial.city + tktDetial.districts + tktDetial.address;
        initMap(tktAddress);
    })
    .catch(function (error) {
        console.log(error);
    })
    // 回傳Tktno，取得該商品的方案&票種
    await fetch('addtktplanList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },    
        body: JSON.stringify({
            tktno: tktno,            
        }),    
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
        tktPlanTypes = data;
    })
    .catch(function (error) {
        console.log(error);
    })
    // 回傳Tktno，取得該商品的所有圖片
    await fetch('tktImgDetail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tktno: tktno,            
        }),          
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
        tktImgs = data;
    })
    .catch(function (error) {
        console.log(error);
    })

    // 橫幅圖片
    bannerImgListHTML();

    // 商品名稱
    $("#tktname").text(tktDetial.tktname);
    // 地點：縣市
    $("#city").html('<i class="bi bi-geo-alt me-1 text-primary"></i>台灣 ' + tktDetial.city);
    // 景點介紹
    proddescHTML();
    // 相關圖片
    imgListHTML(); 
    // 景點名稱
    $("#location").html('<i class="bi bi-house-fill fa-fw text-success me-2"></i>' + tktDetial.location);
    // 地址
    $("#address").html('<i class="bi bi-geo-alt fa-fw text-success me-2"></i>' + tktDetial.city + tktDetial.districts + tktDetial.address);

    // 方案&票種
    showPlanTypeList();

    // 如何抵達
    schowarrivalHTML();    
    // 開放時間
    scservicehrHTML(); 
   
    // 購買須知
    noticeHTML();    
    // 如何使用
    howuseHTML();


    // 展開/縮起方案(改按鈕名稱)
    $("button#collapse").on('click', function() {
        let isCollapsed = $(this).attr('aria-expanded');
        if (isCollapsed === 'false') {
            $(this).text('選擇');
        } else {
            $(this).text('取消選擇');
        }
    });

    //  選票種
    $("button#type").on("click", function () {
        // 數量回到初始值1
        let buttonValue = $(this).attr("value");
        let planNO = $(this).closest("ul").attr("value");
        let typeParentDiv = $(this).closest('div#PlanType' + planNO);
        typeParentDiv.find('label#tktQty').attr("value", 1);
        typeParentDiv.find('label#tktQty').text(1);
        let typePrice = $(this).closest("li").attr("value");
        // 改票價
        typeParentDiv.find('h5#price').text("TWD " + typePrice);
    });

    // 加數量
    $("button#addQty").on("click", function () {
        let qry = parseInt($(this).prev().text()) + 1;
        $(this).prev().attr("value", qry);
        $(this).prev().text(qry);
    });

    // 減數量
    $("button#redQty").on("click", function () {
        if ( $(this).next().text() <= 1 ) {
            $(this).next().attr("value", 1);
            $(this).next().text(1);
            
        } else {
            let qry = parseInt($(this).next().text()) - 1;
            $(this).next().attr("value", qry);
            $(this).next().text(qry);
        }
    });

    
});

// 橫幅圖片HTML程式碼
function bannerImgListHTML () {
    // let html = "";
    for (let i = 0; i < tktImgs.length; i++) {
        if( i < 4){
            $("img#img"+i).attr("src", "data:image/jpeg;base64," + tktImgs[i].imgBase64);
        }
    }    
}

// 景點介紹HTML程式碼
function proddescHTML () {
    html = `${tktDetial.proddesc}`;
    $("#proddesc").html(html);
}

// 相關圖片HTML程式碼
function imgListHTML () {
    let html = "";
    for (let i = 0; i < tktImgs.length; i++) {
        html += `
        <div class="col-md-4">
            <a class="w-100 h-100" href="data:image/jpeg;base64,${tktImgs[i].imgBase64}">
                <div class="card card-element-hover card-overlay-hover overflow-hidden">
                    <!-- Image -->
                    <img src="data:image/jpeg;base64,${tktImgs[i].imgBase64}" class="card-img" alt="">
                    <!-- Full screen button -->
                    <!-- <div class="hover-element w-100 h-100">
                        <i class="bi bi-fullscreen fs-6 text-white position-absolute top-50 start-50 translate-middle bg-dark rounded-1 p-2 lh-1"></i>
                    </div> -->
                </div>
            </a>
        </div>       
        `; 
    }    
    $("#imgList").html(html);
}

// 所有方案&票種
function showPlanTypeList () {
    let mark = -1;
    for (let i = 0; i < tktPlanTypes.length; i++) { 
        if(mark !== tktPlanTypes[i].tktplanno && tktPlanTypes[i].planstat === 1){
            PlanHTML(i);
            mark = tktPlanTypes[i].tktplanno;
        }
        typeHTML(i);        
    }    
}

// 方案HTML程式碼
function PlanHTML (i) {
    let html = "";
    html += `
    <!-- Card item Start-->
    <div class="card card-body border mb-4" id="PlanType${tktPlanTypes[i].tktplanno}">							
        <!-- Title and button -->							
        <div class="d-sm-flex justify-content-between">
            <div class="hstack gap-1">
                <h5 class="card-title mb-2" id="planname">${tktPlanTypes[i].planname}</h5>								
            </div>
            <div class="mt-2 mt-sm-0">
                <button class="btn btn-sm btn-success mb-0" style="width: 100px;" data-bs-toggle="collapse" data-bs-target="#collapseList${tktPlanTypes[i].tktplanno}" aria-expanded="false" aria-controls="collapseList${tktPlanTypes[i].tktplanno}" id="collapse">選擇</button>
            </div>	
        </div>
        
        <!-- Plan Content -->
        <div class="d-flex align-items-center flex-wrap">
            <span class="me-2">${tktPlanTypes[i].plancontent}</span>
        </div>

        <!-- 摺疊開始 -->
        <div class="collapse" id="collapseList${tktPlanTypes[i].tktplanno}">

            <hr>

            <!-- Type -->
            <div class="col-12">
                <span>選擇票種</span>
                <p></p>
                <ul class="nav nav-pills-shadow fw-normal mb-0" id="typeList${tktPlanTypes[i].tktplanno}" value="${tktPlanTypes[i].tktplanno}">
                    <!-- Add 票種 List -->
                </ul>									
            </div>

            <br>

            <!-- Quantity -->
            <div class="col-12">
                <span>選擇數量</span>
                <p></p>
                <label class="form-control type-position" type="text">
                    <span class="type-left-position">每人</span>
                    <div class="count-input ms-1 d-flex justify-content-end type-position type-right-position">						
                        <button class="btn btn-icon btn-light fs-xl form-control-centered btn-type-quantity" type="button" id="redQty" value="">-</button>
                        <label class="form-control-centered btn-type-quantity" name="tktQty" id="tktQty" value="1" readonly>1</label>
                        <button class="btn btn-icon btn-light fs-xl pt-1 form-control-centered btn-type-quantity" type="button" id="addQty" value="">+</button>
                    </div>
                </label>								
            </div>
            
            <!-- Price and button -->
            <div class="d-sm-flex justify-content-between mt-4">
                <div class="hstack gap-1">
                    <h5 class="mb-0" id="price">TWD -</h5>
                    <span class="mb-0 me-2">/ 人</span>								
                </div>
                <div class="mt-2 mt-sm-0">
                    <button class="btn btn-sm btn-primary mb-0" onclick="addShopCart(this, ${tktPlanTypes[i].tktplanno})"><i class="bi bi-plus-lg"></i> 加入購物車</button>
                </div>	
            </div>
        </div>
        <!-- 摺疊結束 -->
    </div>
    <!-- Card item End-->
    `;

    $("#PlanTypeList").append(html);
}

// 票種HTML程式碼
function typeHTML (i){
    html = "";
    html += `
    <li class="nav-item" value="${tktPlanTypes[i].price}"> 
        <button class="btn btn-sm btn-outline-success mb-0 btn-type" data-bs-toggle="tab" name="type" id="type" value="${tktPlanTypes[i].tkttypeno}">${tktPlanTypes[i].tkttype}</button> 
    </li>    
    `;

    $("#typeList" + tktPlanTypes[i].tktplanno).append(html);
}

// 加入購物車
function addShopCart(button, tktplanno){
    let tktTypeNo = null; // 票種流水號
    const parentDiv = button.closest("#PlanType"+tktplanno); // 找到按钮的父元素
    const listItems = parentDiv.querySelectorAll('li'); // 找到父元素下所有的 <li> 元素
    // 遍歷 <li> 元素(取得票種流水號)
    listItems.forEach(function (li) {
        const tabButton = li.querySelector('button');
        if (tabButton) {
            if (tabButton.classList.contains('active')) {
                tktTypeNo = tabButton.value;
            }
        }
    });
    // 如果沒有選擇任何票種，票種流水號為-1
    if (!tktTypeNo) {
        tktTypeNo = -1;
    }
    let tktQty = parentDiv.querySelector("#tktQty").getAttribute("value");
    const formdata = new FormData();
    formdata.append("action", "addItem");
    formdata.append("tktTypeNo", tktTypeNo);
    formdata.append("tktQty", tktQty);
    
    if(tktTypeNo === -1){
        Swal.fire('請選擇票種');
    } else {
        fetch(`/${contextPath}/tkt/shoppingCart`, {
            method: 'POST',    
            body: formdata
        })
        .then(response => {
            if (response.ok) {                
                return response.text();
            } else {
                const { status, statusText } = response;
                throw Error(`${status}: ${statusText}`);
            }
        })
        .then(function (html) {
            // console.log(html)
            // 根據回應的內容來判斷是否要進行跳轉
            if (html.includes("Flyday - 登入")) {
                // 如果回應包含"Flyday - 登入"，則進行跳轉

                Swal.fire({
                    title: '請先登入！',
                    confirmButtonText: '確認',
                    // cancelButtonText: '取消',
                    // showCancelButton: true,
                }).then(async function (result) {
                    // console.log(result)
                    if(result.isConfirmed){
                        const returnUrl = window.location.href; // 獲取當前頁面 URL
                        sessionStorage.setItem('originalURL', returnUrl); // 存儲在sessionStorage
                        window.location.href = `/${contextPath}/front_end/sign-in.html`; // 跳轉到登入頁面
                    }
                })

                // Swal.fire('請先登入！');
                // const returnUrl = window.location.href; // 獲取當前頁面 URL
                // sessionStorage.setItem('originalURL', returnUrl); // 存儲在sessionStorage
                // window.location.href = `/${contextPath}/front_end/sign-in.html`; // 跳轉到登入頁面
            } else {
                Swal.fire('成功加入購物車！');
                // console.log("不轉跳頁面");
            }
        })
        .catch(function(error) {
            console.error('Fetch錯誤：', error);
        });
    }
}

// 如何抵達HTML程式碼
function schowarrivalHTML () {
    html = `${tktDetial.schowarrival}`;
    $("#schowarrival").html(html);
}

// 開放時間HTML程式碼
function scservicehrHTML () {
    html = `${tktDetial.scservicehr}`;
    $("#scservicehr").html(html);
}

// 購買須知HTML程式碼
function noticeHTML () {
    html = `${tktDetial.notice}`;
    $("#notice").html(html);
}

// 如何使用HTML程式碼
function howuseHTML () {
    html = `${tktDetial.howuse}`;
    $("#howuse").html(html);
}
