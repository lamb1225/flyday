const tab = document.querySelector("#tabsw");
const pageid = document.querySelector("#pageid");
let acts = {};
let id = parseInt(sessionStorage.getItem("memno"));
var title;
window.addEventListener("load", () => {
    getAct(id);

})
function getAct(id) {
    fetch('memAct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memno: id })
    })
        .then(function (resp) {

            return resp.json()
        })
        .then(function (data) {
            // console.log(data);

            acts = data;
            pagination(acts, 1);//將其顯示到頁面中
        })
        .catch(function (error) {
            console.log(error);
        })
}
function pagination(jsonData, nowPage) {
    console.log(nowPage);
    // 取得全部資料長度
    const dataTotal = jsonData.length;

    // 設定要顯示在畫面上的資料數量
    // 預設每一頁只顯示 5 筆資料。
    const perpage = 5;

    // page 按鈕總數量公式 總資料數量 / 每一頁要顯示的資料
    // 這邊要注意，因為有可能會出現餘數，所以要無條件進位。
    const pageTotal = Math.ceil(dataTotal / perpage);

    // 當前頁數，對應現在當前頁數
    let currentPage = nowPage;

    // 因為要避免當前頁數筆總頁數還要多，假設今天總頁數是 3 筆，就不可能是 4 或 5
    // 所以要在寫入一個判斷避免這種狀況。
    // 當"當前頁數"比"總頁數"大的時候，"當前頁數"就等於"總頁數"
    // 注意這一行在最前面並不是透過 nowPage 傳入賦予與 currentPage，所以才會寫這一個判斷式，但主要是預防一些無法預期的狀況，例如：nowPage 突然發神經？！
    if (currentPage > pageTotal) {
        currentPage = pageTotal;
    }

    // 由前面可知 最小數字為 6 ，所以用答案來回推公式。
    const minData = (currentPage * perpage) - perpage + 1;
    const maxData = (currentPage * perpage);

    // 先建立新陣列
    const data = [];
    // 這邊將會使用 ES6 forEach 做資料處理
    // 首先必須使用索引來判斷資料位子，所以要使用 index
    jsonData.forEach((item, index) => {
        // 獲取陣列索引，但因為索引是從 0 開始所以要 +1。
        const num = index + 1;
        // 這邊判斷式會稍微複雜一點
        // 當 num 比 minData 大且又小於 maxData 就push進去新陣列。
        if (num >= minData && num <= maxData) {
            data.push(item);
        }
    })
    // 用物件方式來傳遞資料
    const page = {
        pageTotal,
        currentPage,
        hasPage: currentPage > 1,
        hasNext: currentPage < pageTotal,
    }
    showmem(data);
    pageBtn(page);
}

function showmem(data) {
    let html = '';

    if (data.length == 0) {
        html = "<tr><td colspan='4' align='center'>尚無揪團資料</td></tr>";
    } else {
        // for (let i = 0; i < acts.length; i++) {}

        data.forEach(act => {

            html += `
									<!-- Card header -->
									<div class="card-header border-bottom d-md-flex justify-content-md-between align-items-center">
										<!-- Icon and Title -->
										<div class="d-flex align-items-center">
											<div class="icon-lg bg-light rounded-circle flex-shrink-0"><i class="fa-solid fa-plane"></i></div>	
											<!-- Title -->
											<div class="ms-2">
												<h6 class="card-title mb-0">${act.acttitle}</h6>
												<ul class="nav nav-divider small">
												</ul>
											</div>
										</div>
	
										<!-- Button -->
										<div class="mt-2 mt-md-0">`
            if (act.payment === 0) {
                html += `<a class="btn btn-lg btn-primary-soft mb-0" id="Pay" onclick='PayAct(${act.actno},${act.price},"${act.acttitle}")'>前往付款</a>`
            }
            html += `	<a href="#" class="btn btn-primary-soft mb-0"onclick='Check(${act.actno})'>查看內容</a>
										</div>
									</div>
	
									<!-- Card body -->
									<div class="card-body">
										<div class="row g-3">
											<div class="col-sm-6 col-md-4">
												<span>開始時間</span>
												<h6 class="mb-0">${act.actjoinbegin}</h6>
											</div>
	
											<div class="col-sm-6 col-md-4">
												<span>結束時間</span>
												<h6 class="mb-0">${act.actjoinend}</h6>
											</div>
	
											<div class="col-md-4">
												<span>報名人數</span>
												<h6 class="mb-0">${act.actcurrentcount}</h6>
											</div>
                                            <div class="col-md-4">
												<span>團長付款狀態</span>`
            switch (act.payment) {
                case 0:
                    html += `<h6 class="mb-0">未付款</h6>`
                    break;
                case 1:
                    html += `<h6 class="mb-0">已付款</h6>`
                    break;
            }

            html += `</div>
										</div>
									</div>
								
            `;
        });


    }
    return tab.innerHTML = html;
}
function PayAct(actno, price, title) {
    fetch('ActECPay', {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
            TotalAmount: price,
            TradeDesc: "揪團付費",
            ItemName: title,
            CustomField1: actno,
            CustomField2: 1,

        })
    }).then(resp => resp.json())
        .then(data => {
            var newWindow = window.open();
            newWindow.document.write(data); // 插入表單 HTML 內容
            newWindow.document.close();
        })
}
function pageBtn(page) {
    let str = '';
    const total = page.pageTotal;

    if (page.hasPage) {
        str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) - 1}">Previous</a></li>`;
    } else {
        str += `<li class="page-item disabled"><span class="page-link">Previous</span></li>`;
    }


    for (let i = 1; i <= total; i++) {
        if (Number(page.currentPage) === i) {
            str += `<li class="page-item active"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        } else {
            str += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        }
    };

    if (page.hasNext) {
        str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) + 1}">Next</a></li>`;
    } else {
        str += `<li class="page-item disabled"><span class="page-link">Next</span></li>`;
    }

    pageid.innerHTML = str;
}

function switchPage(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'A') return;
    const page = e.target.dataset.page;
    pagination(acts, page);
}
pageid.addEventListener('click', switchPage);
function Check(actno) {
    sessionStorage.setItem('actno', actno);
    
    location.href = `${getContextPath()}/Act/account-travelers.html`;
}
function getContextPath() {
    return window.location.pathname.substring(0, window.location.pathname.indexOf('/', 2));
}
