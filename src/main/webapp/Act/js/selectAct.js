let mem = parseInt(sessionStorage.getItem("memno"));
let act1 = {};
let join;
let reportdata = '';
let Show = document.querySelector("#Show");
var pageid = document.querySelector("#pageid");
var htmlpic;
var img = document.querySelector(`imgpic`);
var date1 = new Date();
window.addEventListener("load", function () {

    fetch(`select`)
        .then(resp => resp.json())
        .then(data => {
            act1 = data;
            pagination(act1, 1);

        })
        .catch(error => {
            console.log(error);
        })

})
//pkgPicBase64
// html += `<img src="data:image/jpeg;base64,${data.pkgPicBase64}" class="rounded-2" alt="Card image">`;
async function pic1(pic) {
    html = '';
    let resp = await fetch('/flyday/pkg/selectpkgno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pkgNo: pic })
    })
    const data = await resp.json();
    // img.setAttribute("src", "data:image/jpeg;base64," + data.pkgPicBase64);
    // html += `<img src="data:image/jpeg;base64,${data.pkgPicBase64}" class="rounded-2" alt="Card image">`;


    return data.pkgPicBase64;
}
{/* <img src="assets/images/category/hotel/4by3/10.jpg" class="rounded-2" alt="Card image" id="imgpic"></img> */ }
async function showAct(act) {

    let html = '';
    if (act.length == 0) {
        html = "<tr><td colspan='4' align='center'>尚無揪團資料</td></tr>";
    } else {
        // $(act).each(async (i, acts) => {
        for (let acts of act) {
            const imgshow = await pic1(acts.pkgno)
            html += `
            <div class="col-md-6 col-xl-4">
            <div class="card shadow p-2 pb-0 h-100"id="img">
            <!-- Image -->
            <img src="data:image/jpeg;base64,${imgshow}" class="rounded-2" alt="Card image">
            <!-- Card body START -->
                <div class="card-body px-3 pb-0">
                    <!-- Rating and cart -->
                    <div class="d-flex justify-content-between mb-3">

                    </div>

                    <!-- Title -->
                    <h5 class="card-title"><a href="hotel-detail.html" onclick='onlook(${acts.actno})'>${acts.acttitle} </a></h5>
                    <ul class="nav nav-divider mb-2 mb-sm-3">`
            switch (acts.actstatus) {
                case 0:
                    html += `<li class="nav-item"> 揪團中</li>`
                    break;
                case 1:
                    html += `<li class="nav-item">已成團</li>`
                    break;
            }
            html += `</ul>`

            html += ` <!-- List -->
                    <div class="d-flex align-items-center">
                        <h5 class="fw-normal text-success mb-0 me-1">${acts.price}</h5>
                        <span class="mb-0 me-2">$</span>
                    </div>
                    <div class="mt-2 mt-sm-0 z-index-2">`
            if (mem !== acts.memno) {
                html += `<a id="memid${acts.memno}"onclick='JoinActClick(${acts.actno},${act.actmaxcount},${act.actcurrentcount})'  class="btn btn-sm btn-primary-soft mb-0 w-100"> 加入揪團 <i
            class="bi bi-arrow-right ms-2"></i></a>`
            }

            html += `</div>
            <a id="memid"onclick='report(${acts.actno})'  class="btn btn-sm btn-primary-soft mb-0 repo"> 檢舉揪團</a>
                </div>
            </div>
        </div>
                `;
            var date2 = new Date(acts.actjoinend);
            if (date2 < date1) {
                fetch('revise', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        actno: acts.actno,
                        actstatus: 1
                    })
                })
                    .then(resp => resp.json())
                    .then(body => {
                        const { successful, message } = body;
                        if (successful) {
                            console.log('更新成功!');
                        } else {
                            console.log(message ?? '存檔失敗');
                        }
                    });
            }

        };


    }
    Show.innerHTML = html;
    // onclick='JoinActClick(${acts.actno})'  放在a標籤裡面
}
// function onRemoveClick(id) {
//     if (!confirm('確定刪除?')) {
//         return;
//     }
//     fetch('removejoin', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ actno: id })
//     })
//         .then(resp => resp.json())
//         .then(body => {
//             if (body.successful) {
//                 location.reload();
//             }
//         });
// }
function onlook(actno) {
    sessionStorage.setItem('actno', actno);
    location.href = `${getContextPath()}/Act/hotel-detail.html`;
}
function getContextPath() {
    return window.location.pathname.substring(0, window.location.pathname.indexOf('/', 2));
}
let report = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        html: `<div class="col-md-6">
        <label class="form-label">Nationality<span class="text-danger">*</span></label>
        <select class="form-select js-choice" id="select1">
            <option selected value="0">活動內容與標題不符</option>
            <option value="1">言論違反善良風俗</option>
            <option value="2">騷擾行為</option>
            <option value="3">其他</option>
        </select>
    </div>
    <div class="col-12">
		<label class="form-label">檢舉內容</label>
		<textarea class="form-control" id="reportmsg" rows="3" spellcheck="false">2119 N Division Ave, New Hampshire, York, United States</textarea>
	</div>
    `,
        showCancelButton: true,
        confirmButtonText: '送出!',
        cancelButtonText: '取消',
        reverseButtons: true
    }).then((result) => {

        const select1 = document.querySelector(`#select1`).value;
        const reportmsg = document.querySelector(`#reportmsg`).value;

        if (result.isConfirmed) {
            fetch('report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    memno: mem,
                    actno: id,
                    rpgroupreason: select1,
                    rpgroupcontent: reportmsg
                })
            })
                .then(resp => resp.json())
                .then(body => {
                    const { successful } = body;
                    if (successful) {
                        Swal.fire({
                            title: '已送出',
                            icon: 'success'
                        }).then(function () {
                            location.reload();
                        })

                    } else {
                        Swal.fire({
                            title: '已取消',
                            icon: 'error'
                        })
                    }
                });

        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                '已取消',
            )
        }
    })
}
// function onReviseClick(id) {
//     sessionStorage.setItem("actno", id);
//     location.href = `${getContextPath()}/Act/reviseAct.html`;
// }
function JoinActClick(id, actmaxcount, actcurrentcount) {
    let differ = actmaxcount - actcurrentcount;
    let memid = mem;
    if (differ === 0) {
        Swal.fire({
            title: '揪團已滿',
            icon: 'error'
        })
        return;
    }
    if (!confirm('確定加入?')) {
        return;
    }
    fetch('Join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            actno: id,
            memno: memid
        })
    })
        .then(resp => resp.json())
        .then(body => {
            const { successful } = body;
            if (successful) {
                join1(id);
                Swal.fire({
                    title: '加入成功',
                    icon: 'success'
                }).then(function () {
                    sessionStorage.setItem('actno', id);
                    sessionStorage.setItem('memno', memid);
                    location.href = `${getContextPath()}/Act/hotel-detail.html`;
                })
            } else {

                Swal.fire({
                    title: '已加入過',
                    icon: 'error'
                })
            }
        });
}

async function join1(id) {
    fetch('joinid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actno: id })
    })
        .then(resp => resp.json())
        .then(body1 => {
            join = body1;
            fetch('revise', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    actno: id,
                    actcurrentcount: join.length

                })
            }).then(resp => resp.json())
                .then(body => {
                    const { successful, message } = body;
                    if (successful) {
                        console.log('更新成功!');
                    } else {
                        console.log(message ?? '存檔失敗');
                    }
                });
        })


}
function pagination(jsonData, nowPage) {
    console.log(nowPage);
    // 取得全部資料長度
    const dataTotal = jsonData.length;

    // 設定要顯示在畫面上的資料數量
    // 預設每一頁只顯示 5 筆資料。
    const perpage = 6;

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
    showAct(data);
    pageBtn(page);
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
    pagination(act1, page);
}
pageid.addEventListener('click', switchPage);