//載入畫面就讀取會員資料
const memListArea = document.getElementById("mem-list-area");
const contextPath = window.location.pathname.split('/')[1];
const pageUl = document.getElementById("page-ul");
let jsonData = {};  //宣告物件變數讓所有函式可以使用

//宣告上方頁籤
const allMemBtn = document.getElementById("all-mem");
const accStatusBtn0 = document.getElementById("accStatus0");  
const accStatusBtn1 = document.getElementById("accStatus1");  
const accStatusBtn2 = document.getElementById("accStatus2");  
const searchMem = document.getElementById("search-mem");
const csvDownloadBtn = document.getElementById("csv-download-btn");


document.addEventListener("DOMContentLoaded", function(){
    const formData = new FormData();
    formData.append("action", "listAllMems");

    fetch(`/${contextPath}/mem/memList`,{
        method: "POST",
        body: formData
    }).then(function(response){
        return response.json();
    }).then(function(memList){
        jsonData = memList;
        pagination(jsonData, 1);     //呼叫分頁函式
    })
});

allMemBtn.addEventListener("click", function(){     //按下所有會員按鈕
    const formData = new FormData();
    formData.append("action", "listAllMems");
    
    //初始化會員清單顯示區塊、頁面區塊
    searchMem.value = "";
    pageUl.innerHTML = "";
    memListArea.innerHTML = `
    <!-- Table head -->
    <div class="bg-light rounded p-3 d-none d-lg-block">
        <div class="row row-cols-7 g-4">
            <div class="col-2"><h6 class="mb-0">會員帳號</h6></div>
            <div class="col-2"><h6 class="mb-0">會員Email</h6></div>
            <div class="col-2"><h6 class="mb-0">會員手機</h6></div>
            <div class="col-2"><h6 class="mb-0">會員等級</h6></div>
            <div class="col-2"><h6 class="mb-0">帳號/揪團狀態</h6></div>
            <div class="col-2"><h6 class="mb-0">操作</h6></div>
        </div>
    </div>
    `;
    fetch(`/${contextPath}/mem/memList`,{
        method: "POST",
        body: formData
    }).then(function(response){
        return response.json();
    }).then(function(memList){
        jsonData = memList;
        pagination(jsonData, 1);     //呼叫分頁函式
    })
});

accStatusBtn0.addEventListener("click", function(){     //按下"尚未啟用帳號"按鈕
    const formData = new FormData();
    formData.append("action", "listByAccStatus");
    formData.append("accStatus", "0");
    
    //初始化會員清單顯示區塊、頁面區塊
    searchMem.value = "";
    pageUl.innerHTML = "";
    memListArea.innerHTML = `
    <!-- Table head -->
    <div class="bg-light rounded p-3 d-none d-lg-block">
        <div class="row row-cols-7 g-4">
            <div class="col-2"><h6 class="mb-0">會員帳號</h6></div>
            <div class="col-2"><h6 class="mb-0">會員Email</h6></div>
            <div class="col-2"><h6 class="mb-0">會員手機</h6></div>
            <div class="col-2"><h6 class="mb-0">會員等級</h6></div>
            <div class="col-2"><h6 class="mb-0">帳號/揪團狀態</h6></div>
            <div class="col-2"><h6 class="mb-0">操作</h6></div>
        </div>
    </div>
    `;
    fetch(`/${contextPath}/mem/memList`,{
        method: "POST",
        body: formData
    }).then(function(response){
        return response.json();
    }).then(function(memList){
        jsonData = memList;
        pagination(jsonData, 1);     //呼叫分頁函式
    })
});

accStatusBtn1.addEventListener("click", function(){     //按下"正常啟用帳號"按鈕
    const formData = new FormData();
    formData.append("action", "listByAccStatus");
    formData.append("accStatus", "1");
    
    //初始化會員清單顯示區塊、頁面區塊
    searchMem.value = "";
    pageUl.innerHTML = "";
    memListArea.innerHTML = `
    <!-- Table head -->
    <div class="bg-light rounded p-3 d-none d-lg-block">
        <div class="row row-cols-7 g-4">
            <div class="col-2"><h6 class="mb-0">會員帳號</h6></div>
            <div class="col-2"><h6 class="mb-0">會員Email</h6></div>
            <div class="col-2"><h6 class="mb-0">會員手機</h6></div>
            <div class="col-2"><h6 class="mb-0">會員等級</h6></div>
            <div class="col-2"><h6 class="mb-0">帳號/揪團狀態</h6></div>
            <div class="col-2"><h6 class="mb-0">操作</h6></div>
        </div>
    </div>
    `;
    fetch(`/${contextPath}/mem/memList`,{
        method: "POST",
        body: formData
    }).then(function(response){
        return response.json();
    }).then(function(memList){
        jsonData = memList;
        pagination(jsonData, 1);     //呼叫分頁函式
    })
});

accStatusBtn2.addEventListener("click", function(){     //按下"已停權帳號"按鈕
    const formData = new FormData();        
    formData.append("action", "listByAccStatus");
    formData.append("accStatus", "2");
    
    //初始化會員清單顯示區塊、頁面區塊
    searchMem.value = "";
    pageUl.innerHTML = "";
    memListArea.innerHTML = `
    <!-- Table head -->
    <div class="bg-light rounded p-3 d-none d-lg-block">
        <div class="row row-cols-7 g-4">
            <div class="col-2"><h6 class="mb-0">會員帳號</h6></div>
            <div class="col-2"><h6 class="mb-0">會員Email</h6></div>
            <div class="col-2"><h6 class="mb-0">會員手機</h6></div>
            <div class="col-2"><h6 class="mb-0">會員等級</h6></div>
            <div class="col-2"><h6 class="mb-0">帳號/揪團狀態</h6></div>
            <div class="col-2"><h6 class="mb-0">操作</h6></div>
        </div>
    </div>
    `;
    fetch(`/${contextPath}/mem/memList`,{
        method: "POST",
        body: formData
    }).then(function(response){
        return response.json();
    }).then(function(memList){
        jsonData = memList;
        pagination(jsonData, 1);     //呼叫分頁函式
    })
});

csvDownloadBtn.addEventListener("click", function(){
    const formData = new FormData();        
    formData.append("action", "csvDownload");
    
    //宣告formData物件內的各屬性陣列，將物件內所有的相同屬性存在同一個陣列
    const memNoArray = [];     
    const memLevelNameArray = [];
    const memAccArray = [];
    const memNameArray = [];
    const memGenderArray = [];
    const memBdayArray = [];
    const memEmailArray = [];
    const memMobileArray = [];
    const memCityArray = [];
    const memDistArray = [];
    const memAddrArray = [];
    const memRegDateArray = [];
    const memAccStatusArray = [];
    const memActStatusArray = [];

    jsonData.forEach(function(element){
        memNoArray.push(element.memNo);
        memLevelNameArray.push(element.memLevel.memLevelName);
        memAccArray.push(element.memAcc);
        (typeof element.memName !== "undefined") ? memNameArray.push(element.memName) : memNameArray.push("未填寫");
        memGenderArray.push(genderInfo(element.memGender));
        memBdayArray.push((typeof element.memBday !== "undefined") ? element.memBday : "未填寫");
        memEmailArray.push(element.memEmail);
        memMobileArray.push(element.memMobile);
        memCityArray.push((typeof element.memCity !== "undefined") ? element.memCity : "未填寫");
        memDistArray.push((typeof element.memDist !== "undefined") ? element.memDist : "未填寫");
        memAddrArray.push((typeof element.memAddr !== "undefined") ? element.memAddr : "未填寫");
        memRegDateArray.push(element.memRegDate);
        memAccStatusArray.push(accStatustext(element.memAccStatus));
        memActStatusArray.push((element.memActStatus === 0 ? "揪團功能正常" : "揪團功能停權"));
    })
    
    //將陣列存進formData
    formData.append("memNoArray", memNoArray);      
    formData.append("memLevelNameArray", memLevelNameArray);
    formData.append("memAccArray", memAccArray);
    formData.append("memNameArray", memNameArray);
    formData.append("memGenderArray", memGenderArray);
    formData.append("memBdayArray", memBdayArray);
    formData.append("memEmailArray", memEmailArray);
    formData.append("memMobileArray", memMobileArray);
    formData.append("memCityArray", memCityArray);
    formData.append("memDistArray", memDistArray);
    formData.append("memAddrArray", memAddrArray);
    formData.append("memRegDateArray", memRegDateArray);
    formData.append("memAccStatusArray", memAccStatusArray);
    formData.append("memActStatusArray", memActStatusArray);

    //透過formData發送請求到後端
    fetch(`/${contextPath}/mem/memList`,{
        method: "POST",
        body: formData
    }).then(function(response){
        return response.blob();
    }).then(function(blob){
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "selectedMemInfo.csv";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
})

let timer = null;   //用來宣告計時器

searchMem.addEventListener("input", function(){      //搜尋框改變就模糊搜尋資料庫資料
    clearTimeout(timer);    //重置定時器
    timer = setTimeout(() => {  //設定定時器，避免過多次發送請求
    
    const formData = new FormData();        
    formData.append("action", "searchMem");
    formData.append("searchContent", searchMem.value);
    //初始化會員清單顯示區塊、頁面區塊
    pageUl.innerHTML = "";
    memListArea.innerHTML = `
    <!-- Table head -->
    <div class="bg-light rounded p-3 d-none d-lg-block">
        <div class="row row-cols-7 g-4">
            <div class="col-2"><h6 class="mb-0">會員帳號</h6></div>
            <div class="col-2"><h6 class="mb-0">會員電子信箱</h6></div>
            <div class="col-2"><h6 class="mb-0">會員手機</h6></div>
            <div class="col-2"><h6 class="mb-0">會員等級</h6></div>
            <div class="col-2"><h6 class="mb-0">帳號/揪團狀態</h6></div>
            <div class="col-2"><h6 class="mb-0">操作</h6></div>
        </div>
    </div>
    `;
    fetch(`/${contextPath}/mem/memList`,{
        method: "POST",
        body: formData
    }).then(function(response){
        return response.json();
    }).then(function(memList){
        jsonData = memList;
        pagination(jsonData, 1);     //呼叫分頁函式
    })}, 400);
});

//分頁資料函式設定
function pagination(jsonData, nowPage){
            
    //分頁資料設定
    const memListLength = jsonData.length;   //資料長度
    const pageLength = 10;  //定義每頁顯示筆數
    const pageNumber = Math.ceil(memListLength/pageLength);   //總頁數

    let currentPage = nowPage;

    if(currentPage > pageNumber){   
        currentPage = pageNumber;   //當前頁面比總頁數大，當前頁面等於總頁數
    }

    function minDataCommpute(){         //當前頁面的第一筆資料是總資料的第幾筆
        if(currentPage === 1)return 1;
        else if(currentPage === 0)return 0;
        else return (currentPage * pageLength) - pageLength + 1;
    };
    const minData = minDataCommpute();  
    const maxData = currentPage * pageLength;    //當前頁面的最後一筆資料是總資料的第幾筆
    
    const datas = [];    //準備一個陣列放準備顯示的資料

    jsonData.forEach(function(element,index){
        const num = index + 1;  //num表示是第幾筆mem資料
        if(num >= minData && num <= maxData){
            datas.push(element);     //當資料屬於頁面內的範圍時，就推進陣列內準備顯示
        }
    })
    
    //--資料顯示
    let i = 1;   //計次 

    for(let data of datas){
        const {memNo, memLevelNo, memAcc, memName, memGender, memBday, memEmail, memMobile, memCity, memDist, memAddr, memLevel, memPicBase64, memAccStatus, memActStatus, memRegDate} = data;
        const {memLevelName, memLevelDisc} = memLevel;  //上面回傳的東西只有memLevel是物件，針對其再解構


        //定義會員清單內動態生成的html
        let memListAreaHtml = `
        <!-- Table data -->
        <div class="row row-cols-xl-7 align-items-lg-center border-bottom g-4 px-2 py-4">
            
            <!-- Data item -->
            <div class="col-6 col-lg-2">
                <small class="d-block d-lg-none">會員帳號：</small>
                <div class="d-flex align-items-center">
                    <!-- Avatar -->
                    <div class="avatar avatar-xs flex-shrink-0">
                        <img class="avatar-img rounded-circle" src=${showMemImg(memPicBase64)} alt="myassets/graybackground.png">
                    </div>
                    <!-- Info -->
                    <div class="ms-2">
                        <h6 class="mb-0 fw-light">${memAcc}</h6>
                    </div>
                </div>
            </div>	

            <!-- Data item -->
            <div class="col-6 col-lg-2">
                <small class="d-block d-lg-none">會員Email：</small>
                <h6 class="mb-0 fw-normal">${memEmail}</h6>
            </div>

            <!-- Data item -->
            <div class="col-6 col-lg-2">
                <small class="d-block d-lg-none">會員手機</small>
                <h6 class="mb-0 fw-normal">${memMobile}</h6>
            </div>
            
            <!-- Data item -->
            <div class="col-6 col-lg-2">
                <small class="d-block d-lg-none">會員等級:</small>
                <h6 class="mb-0 fw-normal">${memLevelName}</h6>
            </div>

            <!-- Data item -->
            <div class="col-6 col-lg-2">
                <small class="d-block d-lg-none">帳號/揪團狀態</small>
                <div class="badge bg-opacity-10 ${accStatusclass(memAccStatus)}">${accStatustext(memAccStatus)}</div> /
                <div class="badge bg-opacity-10 ${(memActStatus === 0 ? "bg-success text-success" : "bg-danger text-danger")}">${(memActStatus === 0 ? "揪團功能正常" : "揪團功能停權")}</div>
            </div>


            <!-- Data item 按鈕 -->
            <div class="col-6 col-lg-2 dropdown">
                <a class="btn btn-secondary dropdown-toggle btn-sm" href="#" role="button" id="dropdownMenuLink${i}" data-bs-toggle="dropdown" aria-expanded="false">
                  查看/修改
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink${i}">
                      <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#memInformation${i}">查看會員資訊</a></li>
                      <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#updateStatus${i}">修改會員權限</a></li>
                </ul>
            </div>

            <!-- Modal 1 -->
            <div class="modal fade" id="memInformation${i}" data-bs-keyboard="false" tabindex="-1" aria-labelledby="memInformationLabel${i}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="memInformationLabel${i}">會員完整資訊</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>會員編號：${memNo}</p>
                            <p>會員等級：${memLevelName}</p>
                            <p>會員帳號：${memAcc}</p>
                            <p>會員姓名：${(typeof memName !== "undefined") ? memName : "未填寫"}</p>
                            <p>會員性別：${genderInfo(memGender)}</p>
                            <p>會員生日：${(typeof memBday !== "undefined") ? memBday : "未填寫"}</p>
                            <p>會員電子信箱：${memEmail}</p>
                            <p>會員手機號碼：${memMobile}</p>
                            <p>會員居住縣市：${(typeof memCity !== "undefined") ? memCity : "未填寫"}</p>
                            <p>會員居住地區：${(typeof memDist !== "undefined") ? memDist : "未填寫"}</p>
                            <p>會員住址：${(typeof memAddr !== "undefined") ? memAddr : "未填寫"}</p>
                            <p>會員註冊時間：${memRegDate}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal 2 -->
            <div class="modal fade" id="updateStatus${i}" data-bs-keyboard="false" tabindex="-1" aria-labelledby="updateStatusLabel${i}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="updateStatusLabel${i}">修改會員權限</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="container">
                                <div class="row">
                                    <div class="col-6">
                                        <label class="form-label">帳號狀態</label>
                                        <select class="form-select text-secondary" id="accStatus-select${i}">
                                            <option value="0" ${(memAccStatus === 0) ? "selected" : ""}>帳號未啟用</option>
                                            <option value="1" ${(memAccStatus === 1) ? "selected" : ""}>帳號已啟用</option>
                                            <option value="2" ${(memAccStatus === 2) ? "selected" : ""}>帳號停權</option>
                                        </select>
                                    </div>
                                    <div class="col-6">
                                        <label class="form-label">揪團功能狀態</label>
                                        <select class="form-select text-secondary" id="actStatus-select${i}">
                                            <option value="0" ${(memActStatus === 0) ? "selected" : ""}>功能正常</option>
                                            <option value="1" ${(memActStatus === 1) ? "selected" : ""}>揪團功能停權</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                            <button type="button" class="btn btn-primary" id="update-btn${i}" disabled>完成修改</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        //動態生成會員清單
        memListArea.insertAdjacentHTML("beforeend", memListAreaHtml);

        //揪團狀態有變動，才能按完成修改按鈕
        const accStatusSelect = document.getElementById("accStatus-select" + i);
        const actStatusSelect = document.getElementById("actStatus-select" + i);
        const actStatusOptions = document.querySelectorAll("#actStatus-select" + i + "> option");
        const updateBtn = document.getElementById("update-btn" + i);

        accStatusSelect.addEventListener("change", function(){
            updateBtn.removeAttribute("disabled");
            if(accStatusSelect.value === "2"){
                for(let actStatusOption of actStatusOptions){
                    actStatusOption.removeAttribute("selected");
                }
                actStatusOptions[1].setAttribute("selected", true);
            }
        });

        actStatusSelect.addEventListener("change", function(){
            updateBtn.removeAttribute("disabled");
        });

        //--修改會員狀態
        updateBtn.addEventListener("click", function(){
            const formDataUpdateStatus = new FormData();
            formDataUpdateStatus.append("action", "updateStatus");
            formDataUpdateStatus.append("memAccStatus", accStatusSelect.value);
            formDataUpdateStatus.append("memActStatus", actStatusSelect.value);
            formDataUpdateStatus.append("memNo", memNo);
            
            fetch(`/${contextPath}/mem/memList`,{
                method: "POST",
                body: formDataUpdateStatus
            }).then(function(response){
                return response.json();
            }).then(function(memObject){
                const {successful, message} = memObject;
                if(successful){
                    alert(message);
                    location.reload();
                }else{
                    alert(message);
                }
            })
        });
        i++;    
    }
    const listLength = document.getElementById("list-length");
    listLength.textContent = `當前顯示第 ${minData} 至第 ${(maxData > memListLength) ? memListLength : maxData} 筆資料，共 ${memListLength} 筆資料`;
    
    //分頁頁籤設定
    let pageHtml = "";

    if(currentPage > 1){
        pageHtml += `<li class="page-item "><a class="page-link" href="#" data-page="${Number(currentPage) - 1}">Prev</a></li>`
    }else{
        pageHtml += `<li class="page-item disabled"><a class="page-link" href="#" tabindex="-1">Prev</a></li>`
    }

    for(let i = 1; i <= pageNumber; i++){
        if(Number(currentPage) === i) {
            pageHtml +=`<li class="page-item active"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        } else {
            pageHtml +=`<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        }
    };

    if(currentPage < pageNumber) {
        pageHtml += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(currentPage) + 1}">Next</a></li>`;
    } else {
        pageHtml += `<li class="page-item disabled"><a class="page-link">Next</a></li>`;
    }

    pageUl.insertAdjacentHTML("beforeend", pageHtml);

    //--點擊切換頁籤
    const pageLinks = document.querySelectorAll(".page-link");
    
    for(let pageLink of pageLinks){
        pageLink.addEventListener("click", function(e){
            e.preventDefault();
            pageUl.innerHTML = "";
            memListArea.innerHTML = `
                <!-- Table head -->
                <div class="bg-light rounded p-3 d-none d-lg-block">
                    <div class="row row-cols-7 g-4">
                        <div class="col-2"><h6 class="mb-0">會員帳號</h6></div>
                        <div class="col-2"><h6 class="mb-0">會員Email</h6></div>
                        <div class="col-2"><h6 class="mb-0">會員手機</h6></div>
                        <div class="col-2"><h6 class="mb-0">會員等級</h6></div>
                        <div class="col-2"><h6 class="mb-0">帳號/揪團狀態</h6></div>
                        <div class="col-2"><h6 class="mb-0">操作</h6></div>
                    </div>
                </div>
            `;
            const page = e.target.dataset.page;
            pagination(jsonData, page);
        })
    }
}


//定義會員狀態樣式
function accStatusclass(memAccStatus){
    switch(memAccStatus){
        case 0:
            return "bg-warning text-warning";
        case 1:
            return "bg-success text-success";
        case 2:
            return "bg-danger text-danger";
    }
}

//定義會員狀態文字顯示
function accStatustext(memAccStatus){
    switch(memAccStatus){
        case 0:
            return "帳號未啟用";
        case 1:
            return "帳號已啟用";
        case 2:
            return "帳號停權";
    }
}

//判斷是否有照片，無照片放預設圖，有照片放照片
function showMemImg(memPicBase64){
    if(typeof memPicBase64 !== "undefined"){
        return "data:image/jpeg;base64," + memPicBase64;
    }else{
        return "myassets/logo_noliteral.png";
    }
}

//定義性別狀態顯示
function genderInfo(memGender){
    if(typeof memGender !== "undefined"){
        switch(memGender){
            case 0:
                return "不便透漏";
            case 1:
                return "男";
            case 2:
                return "女";
        }
    }else{
        return "未填寫";
    }    
}