let tktno;
let imgSrc;
let title; 
let tktPlanTypes;
let html = "";

$(function () {  
    
    const storedData = sessionStorage.getItem("myData");
    const dataObject = JSON.parse(storedData);
    if (dataObject) {
        tktno = dataObject.buttonValue;
        imgSrc = dataObject.imgSrc;
        title = dataObject.titleText;
    } else {
        console.log("沒有存儲的數據可供檢索");
    }

    // 商品Title
    titleHTML (html);
    
    // 回傳Tktno，取得該商品的方案&票種
    fetch('addtktplanList', {
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
        console.log(data);
        tktPlanTypes = data;
        showPlanTypeList(); //將其顯示到頁面中
    })
    .catch(function (error) {
        console.log(error);
    })
    

});

// 商品TitleHTML程式碼
function titleHTML (html) {
    html += `
    <!-- Card header -->
    <div class="card-header border-bottom d-sm-flex justify-content-between align-items-center">
        <!-- Image and Title -->
        <div class="d-flex align-items-center flex-shrink-0">
            <!-- Image -->
            <div class="avatar avatar-lg">
                <img class="avatar-img rounded-circle" src="${imgSrc}" alt="avatar">
            </div>
            <!-- Title -->
            <div class="ms-3">
                <h5 class="mb-0">${title}</h5>
            </div>		
            
        </div>
        <!-- Previous Page Button -->
        <div class="d-grid tkt-list-title-right"><a href="tkt-admin-list.html" class="btn btn-primary-soft mb-0">返回前頁</a></div>	
    </div>
    <!-- Card body -->
    <div class="card-body" id="point">
    </div>
    `;

    $("#addtktplanList").html(html);
}

// 顯示所有該商品的方案&票種
function showPlanTypeList (){
    let mark = -1;
    for (let i = 0; i < tktPlanTypes.length; i++) { 
        if(mark !== tktPlanTypes[i].tktplanno){
            planHTML(i);
            mark = tktPlanTypes[i].tktplanno;
        }
        typeHTML(i);        
    }    
}

// 方案HTML程式碼
function planHTML (i) {
    let html = "";
    html += `
    <!-- Plan Star -->
    <div>							
        <div class="tkt-bg-color rounded row py-2 tkt-list-position" id="typePoint${tktPlanTypes[i].tktplanno}">					
            <div class="col tkt-list-position">						
                <h5 class="mb-0">${tktPlanTypes[i].planname}</h5>
            </div>

            <!-- Data item -->
            <div class="col-1 tkt-list-position tkt-list">		
    `;
            switch(tktPlanTypes[i].planstat){
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
            <div class="col-1 tkt-list-position tkt-list"><a href="#" class="btn btn-sm btn-primary-soft mb-0">修改</a></div>

            <!-- Data item -->
            <div class="col-1 tkt-list-position tkt-list-1"><a href="#" class="btn btn-sm btn-primary-soft mb-0">刪除方案</a></div>
            <div class="col-1 tkt-list-position tkt-list-2"></div>					
        </div>

    </div>
    <!-- Plan End --> 
    `;

    $("#point").append(html);    
}

// 票種HTML程式碼
function typeHTML (i){
    html = "";
    html += `
    <!-- Table data -->
    <div class="row py-2 tkt-list-position">						
        <!-- Data item -->
        <div class="col tkt-list-position">
            <!-- <small class="d-block d-lg-none">票種</small> -->
            <h6 class="mb-0 fw-normal">${tktPlanTypes[i].tkttype}</h6>
        </div>

        <!-- Data item -->
        <div class="col tkt-list-position">
            <!-- <small class="d-block d-lg-none">價格</small> -->
            <h6 class="mb-0 fw-normal">TWD ${tktPlanTypes[i].price}</h6>
        </div>

        <div class="col-1 tkt-list-position tkt-list"></div>
        
        <!-- Data item -->
        <div class="col-1 tkt-list-position tkt-list"><a href="#" class="btn btn-sm btn-light mb-0">修改</a></div>

        <!-- Data item -->
        <div class="col-1 tkt-list-position tkt-list-1"><a href="#" class="btn btn-sm btn-light mb-0">刪除</a></div>
        <div class="col-1 tkt-list-position tkt-list-2"></div>
    </div>    
    `;

    $("#typePoint" + tktPlanTypes[i].tktplanno).after(html);
}

