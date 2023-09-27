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
        if (title.value == '') {  //空字串判定
            span[0].textContent = '請輸入揪團主題';
        } else {
            span[0].textContent = '';
        }

    });
    content.addEventListener("blur", () => {
        if (content.value == '') {  //空字串判定
            span[1].textContent = '請輸入揪團內容';
        } else {
            span[1].textContent = '';
        }
    });
    max.addEventListener("blur", () => {
        if (max.value == '') {  //空字串判定
            span[2].textContent = '請填寫最多人數';
        } else {
            span[2].textContent = '';
        }

    });
    min.addEventListener("blur", () => {
        // console.log(max.value);
        // console.log(min.value);
        if (min.value == '' || parseInt(min.value) < 2 || parseInt(max.value) < parseInt(min.value)) {
            //判定人數限制
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
        if (from2 < date1) {//判定日期限制
            date.textContent = '開始時間不譨早於現在時間';
            return 0;
        }
        insert();
    });


})();

function insert() { // 新增一筆資料
    let memid = sessionStorage.getItem("memno");
    let pkgid = sessionStorage.getItem("pkgno");
    // let pkgid = 3;
    let price = sessionStorage.getItem("price");
    // let price = 5000;
    fetch('create', { // 此API在java controller的ActServlet @WebServlet("/Act/create")
        method: 'POST', // 指定請求方法為POST
        headers: {
            'Content-Type': 'application/json'  // 設定請求標頭，指定內容為JSON格式, 可省略
        },  
        body: JSON.stringify({ // 將資料轉換成JSON字串並作為請求內容
            memno: memid, // java entity屬性名稱: 變數
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
        .then(resp => resp.json()) // 把回傳的JSON字串取回放在promise物件中回傳
        .then(body => { //取得json資料
            const { successful } = body;
            if (successful) {  // 判定資料是否成功新增
                msg.className = 'info';
                msg.textContent = '創建成功';
                Swal.fire({
                    title: '新增成功',
                    icon: 'success'
                }).then(function () {
                        // 跳轉頁面到指定路徑
                    location.href = `${getContextPath()}/Act/hotel-grid.html`;
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
function getContextPath() {// 設定動態路徑，以防路徑更換無法使用
    return window.location.pathname.substring(0, window.location.pathname.indexOf('/', 2));
}

