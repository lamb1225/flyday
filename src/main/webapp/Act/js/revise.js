let acts
let show = document.querySelector("#show");
var id = sessionStorage.getItem("actno");
window.addEventListener("load", () => {
    getAct(id);
})
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
            acts = data;
            console.log(acts);
            showAct();//將其顯示到頁面中
        })
        .catch(function (error) {
            console.log(error);
        })
}
function showAct() {
    let html = '';
    console.log(acts.actno);
    if (acts.length === 0) {
        html = "<tr><td colspan='4' align='center'>尚無員工資料</td></tr>";
    } else {
        html += `
        <div>
        <label>揪團編號</label>
        <span>${acts.actno}</span>
    </div>
    <br>
    <div>
        <label>會員編號</label>
        <span>${acts.memno}</span>
    </div>
    <br>
    <div>
        <label>行程編號</label>
        <span>${acts.pkgno}</span>
    </div>
    <br>
    <label>揪團主題
        <br>
        <input class="act" type="text" name="title" id="title${acts.actno}" value="${acts.acttitle}">
    </label>
    <br>
    <label>揪團內容
        <br>
        <textarea class="act" type="text" name="content" id="content${acts.actno}">${acts.actcontent}</textarea>
    </label>
    <br>
    <button type="button" class="btn" onclick='onSaveClick(${acts.actno})'>確定修改</button>
            `;
    }
    return show.innerHTML = html;
}


function onSaveClick(id) {
    const acttitle = document.querySelector(`#title${id}`).value;
    const actcontent = document.querySelector(`#content${id}`).value;


    fetch('revise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            actno:id,
            acttitle: acttitle,
            actcontent: actcontent

        })
    })
        .then(resp => resp.json())
        .then(body => {
            const { successful, message } = body;
            if (successful) {
                alert('存檔成功!');
                location.href = `http://localhost:8080/flydaytest/selectAct.html`;
            } else {
                alert(message ?? '存檔失敗');
            }
        });
}