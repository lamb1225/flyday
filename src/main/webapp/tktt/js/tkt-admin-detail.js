let tktno;
let imgSrc;
let title; 
let tktPlanTypes;
let html = "";

document.addEventListener("DOMContentLoaded", async function () {

    // 拿到前一個HTML檔傳來的值
    const storedData = sessionStorage.getItem("myData");
    const dataObject = JSON.parse(storedData);
    if (dataObject) {
        tktno = dataObject.buttonValue;
        imgSrc = dataObject.imgSrc;
        title = dataObject.titleText;
    } else {
        console.log("沒有存儲的數據可供檢索");
    }
    // console.log(tktno);

    // 所有 * 都變紅色
    document.querySelectorAll('label, h5').forEach(function(element) {
        element.innerHTML = element.innerHTML.replace(/\*/g, '<span style="color: red;">*</span>');
    });

    // 商品Title
    titleHTML();

    await fetchData();  // Fetch方案&票種   
    showPlanTypeList(); // 方案和票種顯示到頁面中(初始顯示頁面)
    
    // Modal關閉按鈕
    const closeModals = document.getElementsByClassName("closeModal");
    Array.from(closeModals).forEach( btn => btn.addEventListener("click", async function () {
        titleHTML();
        await fetchData();
        showPlanTypeList();
    }))

})

// Fetch該商品的方案&票種
async function fetchData(){
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
}

// 商品TitleHTML程式碼
function titleHTML () {
    let html = "";
    html = `
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
            <div class="col-1 tkt-list-position tkt-list">
                <button class="btn btn-sm btn-primary-soft mb-0" type="button" data-bs-toggle="modal" data-bs-target="#myModal" onclick="planDetailsEdit(${tktPlanTypes[i].tktplanno})"
                        name="planEdit${tktPlanTypes[i].tktplanno}" id="planEdit${tktPlanTypes[i].tktplanno}" data-value="${tktPlanTypes[i].tktplanno}">修改</button>
            </div>

            <!-- Data item -->
            <div class="col-1 tkt-list-position tkt-list-1"></div>
            <div class="col-1 tkt-list-position tkt-list-2"></div>					
        </div>

    </div>
    <!-- Plan End --> 
    `;

    $("#point").append(html);    
}

// Modal (回傳tktplann，取得該方案的詳細內容)
function planDetailsEdit(tktplanno){

    // console.log("function",tktplanno);

    // 清空表單值
    document.getElementById('planname').value = '';
    document.getElementById('plancontent').value = '';

    // 回傳Tktplanno，取得該方案的詳細內容
    fetch('planDetail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },    
        body: JSON.stringify({
            tktplanno: tktplanno,            
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
    .then(function (planDetial) {
        // console.log(planDetial);
        // 方案編號
        document.getElementById('tktplanno').value = tktplanno;
        // 方案名稱
        document.getElementById('planname').value = planDetial.planname;
        // 方案內容 (去掉<br>標籤並設置值)
        let formattedText = planDetial.plancontent.replace(/<br>/g, '\n').replace(/\n{2}/g, '\n');
        document.getElementById('plancontent').value = formattedText;        
    })
    .catch(function (error) {
        console.log(error);
    })
}

// 票種HTML程式碼
function typeHTML(i){
    // console.log("票種編號",tktPlanTypes[i].tkttypeno);
    html = "";
    html = `
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

    $("#point").append(html);
}


