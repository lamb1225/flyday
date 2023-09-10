let tkts;
let tktimgs;
let firstImages = {};

$(async function () {      
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
    await fetch('addtktlist', {
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
        tkts = data;
        showTktlist(); //將其顯示到頁面中(初始顯示頁面)
    })
    .then(obj => console.log(obj))
    .catch(function (error) {
        console.log(error);
    })

    // 點擊方案，回傳值到另一個HTML檔
    $("button[name='tktplanList']").on("click", function () {
        const buttonValue = $(this).val();
        const imgSrc = $(this).closest("#nextpoint").find("#tktimg"+buttonValue).attr("src");
        const titleText = $(this).closest("#nextpoint").find("#title"+buttonValue).text();

        const dataToStore = {
            buttonValue: buttonValue,
            imgSrc: imgSrc,
            titleText: titleText,            
        };
        
        sessionStorage.setItem("myData", JSON.stringify(dataToStore));
        window.location.href='tkt-admin-detail.html';
    });
        
});

// 依票券類型篩選(下拉式選單)
$("#tktsortList").on("change", function () {
    let html = "";
    let count = 0;
    for (let i = 0; i < tkts.length; i++) {
        if(parseInt($(this).val()) === tkts[i].tktsort){
            html += htmlList(i);
            count++;
        } else if (parseInt($(this).val()) < 0){
            html += htmlList(i);
            count++;
        }                
    }       
    if(count === 0){
        html = `<p class="tkt-list-position">查無此資料</p>`;
    }  
    $("#addtktlist").next().html(html);    
});

// 顯示所有票券(初始顯示頁面)
function showTktimglist(){
    for (const image of tktimgs) {
        const tktno = image.tktno;
    
        // 如果該tktno尚未在firstImages對像中存在，將其添加為第一個圖像
        if (!(tktno in firstImages)) {
            firstImages[tktno] = image.tktimgBase64;
        }
    }
}

// 顯示所有票券(初始顯示頁面)
function showTktlist(){
    let html = "";
    let mark;
    for (let i = 0; i < tkts.length; i++) {
        html += htmlList(i);  
    }    
    $("#addtktlist").next().html(html);
    // document.getElementById("t1").innerHTML = html;
}

// 顯示所有票券
$("button#alltktList").on("click", function () {
    showTktlist();
});

// 顯示所有已上架
$("button#ontktList").on("click", function () {
    let html = "";
    let count = 0;
    for (let i = 0; i < tkts.length; i++) {
        if(tkts[i].tktstat == 1){
            html += htmlList(i);
            count++; 
        }
    }        
    if(count === 0){
        html = `<p class="tkt-list-position">查無此資料</p>`;
    }  
    $("#addtktlist").next().html(html);
});

// 顯示所有未上架
$("button#removetktList").on("click", function () {
    let html = "";
    let count = 0;
    for (let i = 0; i < tkts.length; i++) {
        if(tkts[i].tktstat == 0){
            html += htmlList(i);
            count++;                  
        }
    }
    if(count === 0){
        html = `<p class="tkt-list-position">查無此資料</p>`;
    }  
    $("#addtktlist").next().html(html);
});

// html程式碼
function htmlList(i){
    mark = tkts[i].tktno;
    let html ="";
    html += `
            <!-- Table data -->
            <div class="row row-cols-xl-7 align-items-lg-center border-bottom g-4 px-2 py-4" id="nextpoint" value="${tkts[i].tktno}">
                <!-- Data item -->
                <div class="col tkt-listname-position">
                    <small class="d-block d-lg-none">標題名稱</small>
                    <div class="d-flex align-items-center">
                        <!-- Image -->
                        <div class="w-80px flex-shrink-0">   
    `;
        if (firstImages[mark] !== undefined) {
            html += `<img class="rounded" src="data:image/jpeg;base64,${firstImages[mark]}" alt="avatar" name="tktimg${tkts[i].tktno}" id="tktimg${tkts[i].tktno}">`;
        }
        html += `
                        </div>
                        <!-- Title -->
                        <h6 class="mb-0 ms-2 tkt-list-position" name="title${tkts[i].tktno}" id="title${tkts[i].tktno}">${tkts[i].tktname}</h6>                            
                    </div>
                </div>					

                <!-- Data item -->
                <div class="col-1 tkt-list-1">
                    <small class="d-block d-lg-none">開始日期</small>
                    <h6 class="mb-0 fw-normal tkt-listdate-position">${tkts[i].tktstartdate}</h6>
                </div>

                <!-- Data item -->
                <div class="col-1 tkt-list-1 tkt-list-position">
                    <small class="d-block d-lg-none">結束日期</small>
                    <h6 class="mb-0 fw-normal tkt-listdate-position">${tkts[i].tktenddate}</h6>
                </div>
                <!-- Data item -->
                <div class="col-1 tkt-list-position tkt-list">
                    <small class="d-block d-lg-none">類型</small>
        
        `;
        switch(tkts[i].tktsort){
            case 0:
                html += `<h6 class="mb-0 fw-normal">主題樂園</h6>`;
            break;
            case 1:
                html += `<h6 class="mb-0 fw-normal">景點門票</h6>`;
            break;
            case 2:
                html += `<h6 class="mb-0 fw-normal">水族館</h6>`;
            break;
            case 3:
                html += `<h6 class="mb-0 fw-normal">動物園</h6>`;
            break;
            case 4:
                html += `<h6 class="mb-0 fw-normal">博物館</h6>`;
            break;
            case 5:
                html += `<h6 class="mb-0 fw-normal">美術館</h6>`;
            break;
            case 6:
                html += `<h6 class="mb-0 fw-normal">展覽</h6>`;
            break;
            case 7:
                html += `<h6 class="mb-0 fw-normal">其他</h6>`;
            break;
        }

        html += `
                </div>
                <!-- Data item -->
                <div class="col-1 tkt-list-position tkt-list">
                    <small class="d-block d-lg-none">狀態</small>
        `;

        switch(tkts[i].tktstat){
            case 0:
                html += `<div class="badge bg-danger bg-opacity-10 text-danger">未上架</div>`;
            break;
            case 1:
                html += `<div class="badge bg-success bg-opacity-10 text-success">已上架</div>`;
            break;
        }

        html += `
            </div>
            <!-- Data item -->
            <div class="col-1 tkt-list-position tkt-list"><button class="btn btn-sm btn-light mb-0" name="tktplanList" id="tktplanList" value="${tkts[i].tktno}">方案</button></div>

            <!-- Data item -->
            <div class="col-1 tkt-list-position tkt-list"><a href="tkt-add-listing.html" name="listRevise${tkts[i].tktno}" id="listRevise${tkts[i].tktno}" class="btn btn-sm btn-light mb-0">修改</a></div>
        </div>
        `;
        
    return html;
}



