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
                    html += `<button type="button" class="btn badge bg-danger bg-opacity-10 text-danger" id="planstatBtn${tktPlanTypes[i].tktplanno}"
                                     onclick="planstatEdit(${tktPlanTypes[i].tktplanno})" value="0">未上架</button>`;
                break;
                case 1:
                    html += `<button type="button" class="btn badge bg-success bg-opacity-10 text-success" id="planstatBtn${tktPlanTypes[i].tktplanno}"
                                     onclick="planstatEdit(${tktPlanTypes[i].tktplanno})" value="1">已上架</button>`;
                break;
            }
    html += `
            </div>

            <!-- Data item -->
            <div class="col-1 tkt-list-position tkt-list-1">
                <button class="btn btn-sm btn-primary-soft mb-0" type="button" data-bs-toggle="modal" data-bs-target="#myModal" onclick="planDetailsEdit(${tktPlanTypes[i].tktplanno})"
                        name="planEdit${tktPlanTypes[i].tktplanno}" id="planEdit${tktPlanTypes[i].tktplanno}" data-value="${tktPlanTypes[i].tktplanno}">修改</button>
            </div>

            <!-- Data item -->
            <div class="col-1 tkt-list-position tkt-list-2"></div>
            <div class="col-1 tkt-list-position tkt-list-2"></div>					
        </div>

    </div>
    <!-- Plan End --> 
    `;

    $("#point").append(html);    
}

// 方案狀態按鈕(上/下架)
async function planstatEdit(tktplanno){
    const button = document.getElementById("planstatBtn" + tktplanno); // 找到按钮
    let planstat = button.value;

    Swal.fire({
        icon: 'question',
        title: '確定要更改商品狀態?',
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        showCancelButton: true,
    }).then(async function (result) {
        // console.log(result)
        if(result.isConfirmed){
            Swal.fire({
                icon: 'success',
                title: '商品狀態已更改',
            })
            if (planstat == 1) {
                planstat = 0;
            } else {
                planstat = 1;
            }
            // Fetch方案狀態回傳
            await fetch('editPlanStat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tktplanno: tktplanno,
                    planstat: planstat,
                }),
            })
                .then(response => {
                    if (response.ok) {
                        return response.json(); 
                    } else {
                        Swal.fire('更改失敗！');
                        const { status, statusText } = response;
                        throw Error(`${status}: ${statusText}`);
                    }
                })                      
                .then(data => {
                    // console.log(data)
                })
                .catch(function(error) {
                    console.error('Fetch錯誤：', error);
                    Swal.fire('更改失敗！');
                });
        }

            // 重載資料庫內容&重載畫面
            titleHTML();
            await fetchData();
            showPlanTypeList();
    })

    // let r = confirm("確認更改方案狀態 ?");
    // if(r){
    //     if (planstat == 1) {
    //         planstat = 0;
    //     } else {
    //         planstat = 1;
    //     }
    //     // Fetch方案狀態回傳
    //     await fetch('editPlanStat', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             tktplanno: tktplanno,
    //             planstat: planstat,
    //         }),
    //     })
    //         .then(response => {
    //             if (response.ok) {
    //                 return response.json(); 
    //             } else {
    //                 alert("更改失敗！");
    //                 const { status, statusText } = response;
    //                 throw Error(`${status}: ${statusText}`);
    //             }
    //         })                      
    //         .then(data => {
    //             // console.log(data)
    //         })
    //         .catch(function(error) {
    //             console.error('Fetch錯誤：', error);
    //             alert("更改失敗！");
    //         });
    // }

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
    <div class="row py-2 tkt-list-position" id="type${tktPlanTypes[i].tkttypeno}">						
        <!-- Type item -->
        <div class="col tkt-list-position">
            <!-- <small class="d-block d-lg-none">票種</small> -->
            <h6 class="mb-0 fw-normal">${tktPlanTypes[i].tkttype}</h6>
            <input type="text" class="form-control tkttype -none" id="tkttype" placeholder="例：每人、成人票、學生票..." value="${tktPlanTypes[i].tkttype}">
        </div>

        <!-- Price item -->
        <div class="col tkt-list-position">
            <!-- <small class="d-block d-lg-none">價格</small> -->
            <h6 class="mb-0 fw-normal">TWD ${tktPlanTypes[i].price}</h6>
            <input type="text" class="form-control price -none" id="price" placeholder="請輸入價格" value="${tktPlanTypes[i].price}">
        </div>

        <div class="col-1 tkt-list-position tkt-list"></div>
        
        <!-- Data item -->
        <div class="col-1 tkt-list-position tkt-list-1">
            <button type="button" class="btn btn-sm btn-light mb-0" onclick="typeDetailsEdit(${tktPlanTypes[i].tkttypeno})"
                    id="typeEdit${tktPlanTypes[i].tkttypeno}">修改
            </button>
        </div>

        <!-- Data item -->
        <div class="col-1 tkt-list-position tkt-list-2">
            <!-- <button type="button" class="btn btn-sm btn-light mb-0">刪除</button> -->
        </div>
        <div class="col-1 tkt-list-position tkt-list-2"></div>
    </div>    
    `;

    $("#point").append(html);
}

// 票種&票價修改按鈕
async function typeDetailsEdit(tkttypeno){
    const button = document.getElementById("typeEdit" + tkttypeno); // 找到按钮
    const parentDiv = button.closest("#type" + tkttypeno); // 找到按钮的父元素
    const h6List = parentDiv.querySelectorAll('h6'); // 找到父元素下所有的 <h6> 元素
    const inputList = parentDiv.querySelectorAll('input'); // 找到父元素下所有的 <h6> 元素

    const tkttype = parentDiv.querySelector('.tkttype');
    const price = parentDiv.querySelector('.price');
    let updateValue = [];

    if (!button.getAttribute("data-edit")) {
        // 改按鈕文字
        button.setAttribute("data-edit", "true");
        button.textContent = "保存修改";

        h6List.forEach(function (h6) {
            h6.classList.add("-none"); // 给每个<h6>添加-none屬性
        });    
        inputList.forEach(function (input) {
            input.classList.remove("-none"); // 移除每个<input>的-none屬性
        });
    } else {
        // 票種&票價(驗證)
        const tkttypeTrim = tkttype.value.trim();
        const tkttypeLength = tkttypeTrim.length;
        const priceTrim = price.value.trim();
        if (tkttypeTrim === '') {
            Swal.fire('票種名稱請勿空白');
        } else if (tkttypeLength < 2 || tkttypeLength > 50){
            Swal.fire('票種名稱需介於2~50個字之間');
        } else if (priceTrim === ''){
            Swal.fire('票價請勿空白');
        } else if (isNaN(priceTrim)){
            Swal.fire('票價只能輸入數字');
        } else {

            // 取得最新票種&票價
            for (let i = 0; i < inputList.length; i++) {
                updateValue[i] = inputList[i].value.trim();
            }
            tkttype.value = updateValue[0];
            price.value = updateValue[1];

            // Fetch票種&票價回傳
            await fetch('editTktType', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tkttypeno: tkttypeno,
                    tkttype: tkttype.value,
                    price: price.value,
                }),
            })
                .then(response => {
                    if (response.ok) {
                        Swal.fire('保存成功！'); 
                        return response.json(); 
                    } else {
                        Swal.fire('保存失敗！');
                        const { status, statusText } = response;
                        throw Error(`${status}: ${statusText}`);
                    }
                })                      
                .then(data => {
                    // console.log(data)
                })
                .catch(function(error) {
                    console.error('Fetch錯誤：', error);
                    Swal.fire('保存失敗！');
                });

            // 改按鈕文字
            button.removeAttribute("data-edit");
            button.textContent = "修改";

            inputList.forEach(function (input) {
                input.classList.add("-none"); // 移除每个<input>的-none屬性
            });
            h6List.forEach(function (h6) {
                h6.classList.remove("-none"); // 给每个<h6>添加-none屬性
            });  

            titleHTML();
            await fetchData();
            showPlanTypeList();
        }
    }
}



