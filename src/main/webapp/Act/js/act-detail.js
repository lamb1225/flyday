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


    getAct(id);
});

// console.log(selectmem(id, mem));

// console.log(selectmem(id, mem));
function getAct(id) { // 查詢一筆資料
    fetch('selectone', { // 此API在java controller的SelectoneAct @WebServlet("/Act/selectone")
        method: 'POST', // 指定請求方法為POST
        headers: { 'Content-Type': 'application/json' }, // 設定請求標頭，指定內容為JSON格式
        body: JSON.stringify({actno: id}) // 將資料轉換成JSON字串並作為請求內容
    })          // java entity屬性名稱: 變數
        .then(resp => resp.json())// 把回傳的JSON字串取回放在promise物件中回傳
        .then(data => { // 取得json資料
            // console.log(data);
            act = data;
            showtitle(act); // 將資料存入function
            showcontent(act);
            showprice(act);
            mainbtn(act);
            fetch('/flyday/pkgpic/select', { // 此API在java controller的SelectPkgNoServlet @WebServlet("/pkgpic/select")
                method: 'POST',// 指定請求方法為POST
                headers: { 'Content-Type': 'application/json' },// 設定請求標頭，指定內容為JSON格式
                body: JSON.stringify({ pkgNo: act.pkgno }) // java entity屬性名稱: 變數
            })
                .then(resp => resp.json())// 把回傳的JSON字串取回放在promise物件中回傳
                .then(data => {pics(data)})//取得json資料，將圖片取出

        })
        .catch(function (error) { // 錯誤處理
            console.log(error);
        })

}
var pics = (pic) => { // 載入圖片
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
let mainbtn = (main) => { // 建立編輯資料按鈕
    let html = '';
    if (mem === main.memno) {// 判定是否為團主

        html += `<a class="btn btn-lg " id="edit">編輯資料</a>`;
    }
    return main1.innerHTML = html;
}
let showtitle = (titles) => { // 載入揪團資料
    let html = '';
    html += `<h1 class="fs-2">${titles.acttitle}</h1>
    <p class="fw-bold mb-0">報名時間${titles.actjoinbegin}到${titles.actjoinend}</p>`;
    return title.innerHTML = html;
}
let showcontent = (contents) => { // 載入揪團資料
    let html = '';
    html +=
        `<h5 class="fw-light mb-4" >活動內容</h5>
    <p class="mb-3">${contents.actcontent}</b></p>`;
    return content.innerHTML = html;
}
$(document).on("click", `#edit`, () => { //判定點擊跳出sweetalert2燈箱效果
    const swalWithBootstrapButtons = Swal.mixin({ // sweetalert2按鈕顯示
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({ //sweetalert2畫面展示
        title: '編輯揪團內容',
        html: `<label class="form-label act">揪團主題</label>
        <input class="form-control" type="text" value='${act.acttitle}' id="title1">
        <label class="form-label act">揪團內容</label>
		<textarea class="form-control" rows="5" id="content1">${act.actcontent}</textarea>`,
        showCancelButton: true,
        confirmButtonText: '確定修改',
        cancelButtonText: '取消',
        reverseButtons: true
    }).then((result) => { // 點擊確定修改執行以下
        const acttitle = document.querySelector(`#title1`).value;
        const actcontent = document.querySelector(`#content1`).value;
        if (result.isConfirmed) {
            fetch('revise', { // 此API在java controller的removeAct @WebServlet("/Act/remove")
                method: 'POST',// 指定請求方法為POST
                headers: { 'Content-Type': 'application/json' },// 設定請求標頭，指定內容為JSON格式
                body: JSON.stringify({// 將資料轉換成JSON字串並作為請求內容
                    // java entity屬性名稱: 變數
                    actno: id,
                    acttitle: acttitle,
                    actcontent: actcontent

                })
            })
                .then(resp => resp.json())// 把回傳的JSON字串取回放在promise物件中回傳
                .then(body => {//取得json資料
                    const { successful, message } = body;
                    if (successful) {
                        swalWithBootstrapButtons.fire(
                            '修改成功'
                        ).then(function () {
                            location.reload(); // 畫面重新刷新
                        })
                    } else {
                        alert(message ?? '存檔失敗');//例外判定
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
let showprice = (prices) => { // 載入金額資料
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
    if (mem !== parseInt(prices.memno)) { // 判定是否為非團主所建立的
        html += `<a class="btn btn-lg btn-primary-soft mb-0" id="join">加入揪團</a>`
    }
    html += `</div>
</div>
`;

    return price1.innerHTML = html;
}

$(document).on('click', `#join`, () => { // 點擊加入揪團
    let memid = mem;
    let id = act.actno;
    if (differ === 0) { // 判定是否已滿
        Swal.fire({
            title: '揪團已滿',
            icon: 'error'
        })
        return;
    }
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: '確定要加入嗎?',
        showCancelButton: true,
        confirmButtonText: '送出!',
        cancelButtonText: '取消',
        reverseButtons: true
    }).then((result) => { //新增團員

        if (result.isConfirmed) {
            fetch('Join', { // 此API在java controller的JoinAct @WebServlet("/Act/Join")
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
function join1(id) {
    fetch('joinid', {// 此API在java controller的JoinSelect @WebServlet("/Act/joinid")
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actno: id })
    })
        .then(resp => resp.json())
        .then(body1 => {
            
            fetch('revise', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    actno: id,
                    actcurrentcount: body1.length

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