let title = document.querySelector("#title"); // p506
let content = document.querySelector("#content");// p613
let price1 = document.querySelector("#price");// p744
let main1 = document.querySelector("#main");// p513
var picimg = document.querySelector("#picimg");// p532
let act = '';

let mem = parseInt(sessionStorage.getItem('memno'));
let id = sessionStorage.getItem('actno');
let pop = '';
let differ;
$(() => {
    sessionStorage.setItem('actno', 1);
    

    getAct(id);
});

// console.log(selectmem(id, mem));

// console.log(selectmem(id, mem));
function getAct(id) {
    fetch('selectone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actno: id })
    })
        .then(function (resp) {

            return resp.json()
        })
        .then(function (data) {
            // console.log(data);
            act = data;
            showtitle(act);
            showcontent(act);
            showprice(act);
            mainbtn(act);
            console.log(act.pkgno);
            fetch('/flyday/pkgpic/select', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pkgNo: act.pkgno })
            })
                .then(resp => resp.json())
                .then(data => { pics(data) })

        })
        .catch(function (error) {
            console.log(error);
        })

}
var pics = (pic) => {
    var html = '';
    $(pic).each((i, datas) => {
        html += `<div class="col-md-6">
                        <a data-glightbox data-gallery="gallery" href="${datas.pkgImg}">
                            <div class="card card-grid-lg card-element-hover card-overlay-hover overflow-hidden" style="background-image:url(${datas.pkgImg}); background-position: center left; background-size: cover;">
                                <!-- Card hover element -->
                                <div class="hover-element position-absolute w-100 h-100">
                                    <i class="bi bi-fullscreen fs-6 text-white position-absolute top-50 start-50 translate-middle bg-dark rounded-1 p-2 lh-1"></i>
                                </div>
                            </div>
                        </a>
                    </div>`
    })
    return picimg.innerHTML = html;

}
let mainbtn = (main) => {
    let html = '';
    if (mem === main.memno) {

        html += `<a class="btn btn-lg " id="edit">編輯資料</a>`;
    }
    return main1.innerHTML = html;
}
let showtitle = (titles) => {
    let html = '';
    html += `<h1 class="fs-2">${titles.acttitle}</h1>
    <p class="fw-bold mb-0">報名時間${titles.actjoinbegin}到${titles.actjoinend}</p>`;
    return title.innerHTML = html;
}
let showcontent = (contents) => {
    let html = '';
    html +=
        `<h5 class="fw-light mb-4" >活動內容</h5>
    <p class="mb-3">${contents.actcontent}</b></p>`;
    return content.innerHTML = html;
}
$(document).on("click", `#edit`, () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        html: `<label class="form-label act">揪團主題</label>
        <input class="form-control" type="text" value='${act.acttitle}' id="title1">
        <label class="form-label act">揪團內容</label>
		<textarea class="form-control" rows="5" id="content1">${act.actcontent}</textarea>`,
        showCancelButton: true,
        confirmButtonText: '確定修改',
        cancelButtonText: '取消',
        reverseButtons: true
    }).then((result) => {
        const acttitle = document.querySelector(`#title1`).value;
        const actcontent = document.querySelector(`#content1`).value;
        if (result.isConfirmed) {
            fetch('revise', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    actno: id,
                    acttitle: acttitle,
                    actcontent: actcontent

                })
            })
                .then(resp => resp.json())
                .then(body => {
                    const { successful, message } = body;
                    if (successful) {
                        swalWithBootstrapButtons.fire(
                            '修改成功'
                        ).then(function () {
                            location.reload();
                        })
                    } else {
                        alert(message ?? '存檔失敗');
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
})
let showprice = (prices) => {
    let number = prices.actmaxcount - prices.actcurrentcount;
    let html = '';
    differ = menubar;
    html += `
    <!-- Title -->
    <div class="d-sm-flex justify-content-sm-between align-items-center mb-3">
        <div>
            <span>每人需付</span>
            <h4 class="card-title mb-0">$${prices.price}</h4>
        </div>
        
    </div>		

    <!-- Rating -->
    

    <p class="h6 fw-light mb-4"><i class="bi bi-arrow-right me-2"></i>提供免費早餐</p>
    <p class="h6 fw-light mb-4"><i class="bi bi-arrow-right me-2"></i>剩餘人數:${number}</p>

    <!-- Button -->
    <div class="d-grid" id="select">`
    if (mem !== parseInt(prices.memno)) {
        html += `<a class="btn btn-lg btn-primary-soft mb-0" id="join">加入揪團</a>`
    }
    html += `<a class="btn btn-lg btn-primary-soft mb-0" id="Pay">前往付款</a>
    </div>
</div>
`;

    return price1.innerHTML = html;
}
$(document).on('click', `#Pay`, () => {
    fetch('ECPay', {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
            TotalAmount: act.price,
            TradeDesc: "揪團付費",
            ItemName: act.acttitle,
            CustomField1: "actno"
        })
    }).then(resp => resp.json())
        .then(data => {
            console.log(data);
            window.open(data);
            // newWin.document.body.innerHTML = data;
        })
})
$(document).on('click', `#join`, () => {
    let memid = mem;
    let id = act.actno;
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
                    location.reload();
                })
            } else {
                Swal.fire({
                    title: '已加入過',
                    icon: 'error'
                })
            }
        });
})
function join1(id) {
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



function getContextPath() {
    return window.location.pathname.substring(0, window.location.pathname.indexOf('/', 2));
}