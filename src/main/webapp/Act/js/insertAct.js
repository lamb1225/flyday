(() => {
    const btn = document.querySelector('#btn');
    const title = document.querySelector('#title');
    const content = document.querySelector('#content');
    const max = document.querySelector('#max');
    const min = document.querySelector('#min');
    const from1 = document.querySelector('#from1');
    const to1 = document.querySelector('#to1');
    const msg = document.querySelector('#msg');
    const inputs = document.querySelectorAll("input.act");
    let span = document.querySelectorAll("span");
    const date = document.querySelector("#date");
    inputs[0].addEventListener("blur", () => {
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
    inputs[1].addEventListener("blur", () => {
        if (max.value == '') {
            span[2].textContent = '請填寫最多人數';
        } else {
            span[2].textContent = '';
        }

    });
    inputs[2].addEventListener("blur", () => {
        console.log(max.value);
        console.log(min.value);
        if (min.value == '' || min.value < 2 || max.value < min.value) {
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
        if (min.value == '' || min.value < 2 || max.value < min.value) {
            span[3].textContent = '請填寫最少人數並且不得小於2和大於最多人數';
            return 0;
        }
        if (from1.value == '' || to1.value == '') {
            date.textContent = '日期不得為空值';
            return 0;
        }

        insert();
    });


})();

function insert() {
    fetch('create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            acttitle: title.value,
            actcontent: content.value,
            actmaxcount: max.value,
            actmincount: min.value,
            actjoinbegin: new Date(from1.value),
            actjoinend: new Date(to1.value),
        }),
    })
        .then(resp => resp.json())
        .then(body => {
            const { successful } = body;
            if (successful) {
                msg.className = 'info';
                msg.textContent = '創建成功';
                setTimeout("location.href='http://localhost:8080/flydaytest/selectAct.html'", 1000);
            } else {
                msg.className = 'error';
                msg.textContent = '創建失敗';
            }
        });
}