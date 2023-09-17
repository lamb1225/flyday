const tab = document.querySelector("#tabsw");
const pageid = document.querySelector("#pageid");
let acts = '';
let join = '';
let id = sessionStorage.getItem("memno");
window.addEventListener("load", () => {

    getAct(id);

})
async function getAct(id) {
    let datajoin = await fetch('joinmem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memno: id })
    })
    join = await datajoin.json();
    showmem(join);
    // join.forEach(async joins=>{
    //     let dataact = await fetch('selectone', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ actno: joins.actno })
    //     })
    //     acts = await dataact.json();
    console.log(join);
    // })



}


function showmem(data) {
    let html = '';

    if (data.length == 0) {
        html = "<tr><td colspan='4' align='center'>尚無揪團資訊</td></tr>";
    } else {
        // for (let i = 0; i < acts.length; i++) {}
        data.forEach(acts => {
            html += `
                <!-- Card header -->
                <div class="card-header border-bottom d-md-flex justify-content-md-between align-items-center">
                    <!-- Icon and Title -->
                    <div class="d-flex align-items-center">
                        <div class="icon-lg bg-light rounded-circle flex-shrink-0"><i class="fa-solid fa-plane"></i></div>	
                        <!-- Title -->
                        <div class="ms-2">
                            <h6 class="card-title mb-0">${acts.act.acttitle}</h6>
                            <ul class="nav nav-divider small">
                            </ul>
                        </div>
                    </div>

                    <!-- Button -->
                    <div class="mt-2 mt-md-0">
                        <a href="#" class="btn btn-primary-soft mb-0"onclick='Check(${acts.act.actno})'>查看內容</a>
                    </div>
                </div>

                <!-- Card body -->
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-sm-6 col-md-4">
                            <span>加入時間</span>
                            <h6 class="mb-0">${acts.jointime}</h6>
                        </div>


                        <div class="col-md-4">
                            <span>審核狀態</span>`
            switch (acts.joinstatus) {
                case 0:
                    html += `<h6 class="mb-0">待審核</h6>`;
                    break;
                case 1:
                    html += `<h6 class="mb-0">審核通過</h6 >`;
                    break;
                case 2:
                    html += `<h6 class="mb-0">審核不通過</h6 >`;
                    break;
                case 3:
                    html += `<h6 class="mb-0">取消</h6 >`;
                    break;
            }

            

            html += ` </div>
                    </div>
                </div>
            `;
        })


    }
    return tab.innerHTML = html;
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
