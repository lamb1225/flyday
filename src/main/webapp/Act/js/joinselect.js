
let acts = '';
let join = '';
let showjoin1 = document.querySelector("#showjoin");
let showm = document.querySelector("#showm");
let id = parseInt(sessionStorage.getItem('actno'));
let memid = parseInt(sessionStorage.getItem('memno'));
window.addEventListener("load", () => {
    console.log(memid);
    getAct(id);

})
async function getAct(id) {
    let put1 = await fetch('selectone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actno: id })
    });
    acts = await put1.json()
    // console.log(data);
    // showmem();//將其顯示到頁面中

    let put2 = await fetch('joinid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actno: id })
    });
    join = await put2.json();
    // console.log(data);
    showjoin();

}

async function showmem() {
    let html = '';

    if (acts.length == 0) {
        html = "<tr><td colspan='4' align='center'>尚無員工資料</td></tr>";
    } else {
        html += `
            <tr>
            <td>${acts.actno}(團主)</td>
            <td >${acts.memno}</td>
            </tr> `;

    }
    console.log("act" + acts.memno);
    return showjoin1.innerHTML = html;
}
async function showjoin() { // 顯示成員

    let html = '';
    if (join.length == 0) {
        html = "<tr><td colspan='4' align='center'>尚無會員資料</td></tr>";

    } else {
        join.forEach(joins => {


            html += `
            <div class="card">
            <!-- Card header -->
            <div class="card-header d-flex justify-content-between align-items-center p-0">
                <!-- Avatar -->
                <div class="d-flex align-items-center">
                <div class="avatar avatar-sm">
			    <img class="avatar-img rounded-circle" src="assets/images/avatar/01.jpg"
				alt="avatar">
				</div>
                    <!-- Avatar -->
                    <!-- Info -->
                    <div class="ms-2">
                        <h6 class="mb-0">會員編號:${joins.memno}</h6>
                    </div>
                </div>

                <!-- Button -->`
            if (memid === acts.memno || memid === joins.memno) {
                html += ` <a href="#" class="btn btn-sm btn-link p-0 mb-0"onclick='onRemoveClick(${joins.actno},${joins.memno})'>退出揪團</a>`;
            }
            html += `</div>

            <!-- card body -->
            <form class="card-body p-0 pt-3">
                <!-- Name -->
                <div class="mb-3">
                    <div class="input-group">
                        <label class="form-label">報名狀態: </label>`
            switch (joins.joinstatus) {
                case 0:
                    html += `<span>待審核</span>`;
                    break;
                case 1:
                    html += `<span>審核通過</span>`;
                    break;
                case 2:
                    html += `<span>審核不通過</span>`;
                    break;
                case 3:
                    html += `<span>取消</span>`;
                    break;
            }

            html += ` </div>
            <label class="form-label">付款狀態: </label>`
            switch (joins.Payment) {
                case 0:
                    html += `<span>未付款</span>`;
                    break;
                case 1:
                    html += `<span>已付款</span>`;
                    break;
            }
            html += `</div>

                <!-- Birth day -->
                <div>
                    <label class="form-label">報名時間: </label>
                    <span>${joins.jointime}</span>
                </div>`;
            if (memid === acts.memno) {
                switch (joins.joinstatus) {
                    case 0:
                        html += `<a class="btn btn-primary mb-0" style="background-color: green;"  id="pass${joins.memno}" onclick='pass(${joins.actno},${joins.memno})'>通過</a>
                        <a class="btn btn-primary mb-0" style="background-color: red;" id="notpass${joins.memno}" onclick='onnotpass(${joins.actno},${joins.memno})'>未通過</a>`;
                        break;
                    case 1:
                        html += `<a class="btn btn-primary mb-0" style="background-color: green; visibility: hidden;"  id="pass${joins.memno}" onclick='pass(${joins.actno},${joins.memno})'>通過</a>
                        <a class="btn btn-primary mb-0" style="background-color: red; visibility:hidden;" id="notpass${joins.memno}" onclick='onnotpass(${joins.actno},${joins.memno})'>未通過</a>`;
                        break;
                }
            }
            if (memid === joins.memno && joins.joinstatus === 1 && joins.Payment === 0) {
                html += `<a class="btn btn-lg btn-primary-soft mb-0" id="Pay">前往付款</a>`
            }
            html += ` </form>
                        </div>`;

        });
        if (memid === acts.memno) {
            html += `<div class="text-end">
            <a class="btn btn-primary mb-0"
            id="remove" >
                <i class="bi"></i> 移除揪團
            </a>
        </div>`;
        }



    }
    return showm.innerHTML = html;
}
$(document).on('click', `#Pay`, () => { //點擊後前往付款頁面
    fetch('JoinPay', {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
            TotalAmount: acts.price,
            TradeDesc: "揪團付費",
            ItemName: acts.acttitle,
            CustomField1: acts.actno,
            CustomField2: memid,
            CustomField3: 1,
        })
    }).then(resp => resp.json())
        .then(data => {
            var newWindow = window.open();
            newWindow.document.write(data); // 插入表單 HTML 內容
            newWindow.document.close();
        })
})
function onRemoveClick(actid, memid) { // 刪除揪團及揪團成員
 
    fetch('removejoin', { // 此API在java controller的JoinRemoveServlet @WebServlet("/Act/removejoin")
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            actno: actid,
            memno: memid
        })
    })
        .then(resp => resp.json())
        .then(body => {
            if (body.successful) {
                fetch('revise', {// 此API在java controller的reviseAct @WebServlet("/Act/revise")
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
                location.reload();
            }
        });
}
function onnotpass(actid, memid) { //審核未通過
    let pass1 = document.querySelector(`#pass${memid}`);
    let notpass1 = document.querySelector(`#notpass${memid}`);
    fetch('removejoin', { // 此API在java controller的JoinRemoveServlet @WebServlet("/Act/removejoin")
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            actno: actid,
            memno: memid
        })
    })
        .then(resp => resp.json())
        .then(body => {
            if (body.successful) { 
                fetch('revise', {  // 此API在java controller的reviseAct @WebServlet("/Act/revise")
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
                            location.reload();
                            pass1.style.display = 'none';
                            notpass1.style.display = 'none';
                        } else {
                            console.log(message ?? '存檔失敗');
                        }
                    });
            }
        });
}

function pass(actid, memid) { // 通過後更新狀態
    let status = 1;
    fetch('pass', {  // 此API在java controller的joinstatus @WebServlet("/Act/pass")
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            actno: actid,
            memno: memid,
            joinstatus: status
        })
    })
        .then(resp => resp.json())
        .then(body => {
            const { successful, message } = body;
            if (successful) {
                $(`#notpass${memid}`).css("display", "none");
                $(`#pass${memid}`).css("display", "none");
                location.reload();
            } else {
                console.log(message ?? '存檔失敗');
            }
        })

}
$(document).on('click', `#remove`, () => { // 移除全部
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: '你確定要刪除嗎?',
        text: "解散揪團後有問題，請洽詢客服人員",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '確定!',
        cancelButtonText: '算了~',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            let act;
            fetch('joinid', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ actno: acts.actno })
            })
                .then(resp => resp.json())
                .then(body => {
                    if (body.length > 0) {
                        $(body).each((index, acts) => {
                            act = acts.actno;
                            fetch('removejoin', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    actno: acts.actno,
                                    memno: acts.memno
                                })
                            }).then(resp => resp.json())
                                .then(body => {
                                    if (body.successful) {
                                        fetch('remove', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ actno: act })
                                        })
                                            .then(resp => resp.json())
                                            .then(body => {
                                                if (body.successful) {
                                                    swalWithBootstrapButtons.fire(
                                                        '已刪除!',
                                                        '若有想要一起出遊請建立揪團ㄅ',
                                                        'success'
                                                    )
                                                    location.href = `${getContextPath()}/Act/account-bookings.html`;

                                                }
                                            });
                                    }
                                })


                        })
                    } else {
                        fetch('remove', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ actno: row.actno })
                        })
                            .then(resp => resp.json())
                            .then(body => {
                                if (body.successful) {

                                    swalWithBootstrapButtons.fire(
                                        '已刪除!'

                                    ).then(() => {

                                        location.reload();
                                    })
                                }
                            });
                    }
                })

        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                '已取消',
                '繼續與大家快樂的出遊ㄅ:)',
                'error'
            )
        }
    })


})
function getContextPath() {
    return window.location.pathname.substring(0, window.location.pathname.indexOf('/', 2));
}
