let mem = 4;
let acts;
let join;
function $id(id) {
    return document.getElementById(id);
}
window.addEventListener("load", function () {

    fetch(`select`)
        .then(function (resp) {

            return resp.json()
        })
        .then(function (data) {
            acts = data;
            showAct();//將其顯示到頁面中
        })
        .catch(function (error) {
            console.log(error);
        })

})
function showAct() {
    let html = '';
    if (acts.length == 0) {
        html = "<tr><td colspan='4' align='center'>尚無員工資料</td></tr>";
    } else {
        for (let i = 0; i < acts.length; i++) {
            html += `
                <tr>
                <td>${acts[i].actno}</td>
                <td>${acts[i].memno}</td>
                <td>${acts[i].acttitle}</td>
                <td>${acts[i].actcontent}</td>
                <td>${acts[i].actmaxcount}</td>
                <td>${acts[i].actmincount}</td>
                <td>${acts[i].actcurrentcount}</td>
                <td>${acts[i].actjoinbegin}</td>
                <td>${acts[i].actjoinend}</td>
                `;
            if (acts[i].actstatus === 0) {
                html += `<td>揪團中</td>`;
            } else if (acts[i].actstatus === 1) {
                html += `<td>已成團</td>`;
            } else if (acts[i].actstatus === 2) {
                html += `<td>已取消</td>`;
            }
            if (mem === acts[i].memno) {
                html += `
                <td>
                <button type="button" disabled="disabled" class="btn" onclick='JoinActClick(${acts[i].actno})'>加入揪團</button>
                </td>`;
            } else {
                html += `
                <td>
                <button type="button" class="btn" onclick='JoinActClick(${acts[i].actno})'>加入揪團</button>
                </td>`;
            }

            html += `
                <td>
                <button type="button" class="btn" onclick='onRemoveClick(${acts[i].actno})'>移除</button>
                </td>`;
            html += `
                <td>
                <button type="button" class="btn" onclick='onReviseClick(${acts[i].actno})'>修改</button>
                </td>`;
            html += `</tr>`;

        }
    }
    $id("showPanel").innerHTML = html;
    //將emps資料放入頁面中
}
function onRemoveClick(id) {
    if (!confirm('確定刪除?')) {
        return;
    }
    fetch('removejoin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actno: id })
    })
        .then(resp => resp.json())
        .then(body => {
            if (body.successful) {
                location.reload();
            }
        });
}
function onReviseClick(id) {
    sessionStorage.setItem("actno", id);
    location.href = `http://localhost:8080/flydaytest/Act/reviseAct.html`;
}
function JoinActClick(id) {
    let memid = mem;
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
                alert('加入成功');

                // setTimeout("location.href='http://localhost:8080/flydaytest/Act/selectAct.html'", 1000);
            } else {

                alert('加入失敗');
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
