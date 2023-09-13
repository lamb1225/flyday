(() => {

    const btn = document.querySelector('#btn1');
    const title = document.querySelector('#title');
    const content = document.querySelector('#content');
    const max = document.querySelector('#max');
    const min = document.querySelector('#min');
    const from1 = document.querySelector('#from1');
    const to1 = document.querySelector('#to1');
    const msg = document.querySelector('#msg');
    let span = document.querySelectorAll("span.pop1");
    const date = document.querySelector("#date");
    title.addEventListener("blur", () => {
        if (title.value == '') {
            span[0].textContent = '請輸入揪團主題';
        } else {
            span[0].textContent = '';
        }

    });
    content.addEventListener("blur", () => {
        if (content.value == '') {
            span[1].textContent = '請輸入揪團內容';
        } else {
            span[1].textContent = '';
        }
    });
    max.addEventListener("blur", () => {
        if (max.value == '') {
            span[2].textContent = '請填寫最多人數';
        } else {
            span[2].textContent = '';
        }

    });
    min.addEventListener("blur", () => {
        // console.log(max.value);
        // console.log(min.value);
        if (min.value == '' || parseInt(min.value) < 2 || parseInt(max.value) < parseInt(min.value)) {
            console.log(max.value < min.value);
            span[3].textContent = '請填寫最少人數並且不得小於2和大於最多人數';
        } else {
            span[3].textContent = '';
        }

    });


    btn.addEventListener("click", () => {
        if (title.value == '') {
            span[0].textContent = '請輸入揪團主題';
            return;
        } else {
            span[0].textContent = '';
        }
        if (content.value == '') {
            span[1].textContent = '請輸入揪團內容';
            return;
        } else {
            span[1].textContent = '';
        }
        if (max.value == '') {
            span[2].textContent = '請填寫最多人數';
        } else {
            span[2].textContent = '';
        }
        if (min.value == '' || parseInt(min.value) < 2 || parseInt(max.value) < parseInt(min.value)) {

            span[3].textContent = '請填寫最少人數並且不得小於2和大於最多人數';
            return 0;
        }
        if (from1.value == '' || to1.value == '') {
            date.textContent = '日期不得為空值';
            return 0;
        }
        let from2 = new Date(from1.value);
        let date1 = new Date();
        if (from2 < date1) {
            date.textContent = '開始時間不譨早於現在時間';
            return 0;
        }
        insert();
    });


})();

function insert() {
    let memid = sessionStorage.getItem("memno");
    let pkgid = sessionStorage.getItem("pkgno");
    let price = sessionStorage.getItem("price");
    fetch('create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            memno: memid,
            pkgno: pkgid,
            acttitle: title.value,
            actcontent: content.value,
            actmaxcount: max.value,
            actmincount: min.value,
            actjoinbegin: new Date(from1.value),
            actjoinend: new Date(to1.value),
            price: price
        }),
    })
        .then(resp => resp.json())
        .then(body => {
            const { successful } = body;
            if (successful) {
                msg.className = 'info';
                msg.textContent = '創建成功';
                Swal.fire({
                    title: '新增成功',
                    icon: 'success'
                }).then(function () {
                    location.href = `${getContextPath()}/Act/hotel-detail.html`;
                })

            } else {
                msg.className = 'error';
                msg.textContent = '創建失敗';
                Swal.fire({
                    title: '新增失敗',
                    icon: 'error'
                })
            }
        });
}
function getContextPath() {
    return window.location.pathname.substring(0, window.location.pathname.indexOf('/', 2));
}

