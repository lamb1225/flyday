let coups;

function $id(id) {
    return document.getElementById(id);
}

//畫面載入顯示全部及單筆優惠券
window.addEventListener("load", function () {
    fetch('/flyday/pkg/PkgCoupFindall', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            coups = data;
            showCoup(); //將其顯示在頁面中
            ﻿
		flatpickr(".flatpickr", {}); //初始化flatpickr
        })
        .catch(function (error) {
            console.log(error);
        })
})

// 顯示全部及單筆優惠券
function showCoup() {
    let html = '';
    for (let i = 0; i < coups.length; i++) {
        html += `
<div class="row row-cols-xl-9 align-items-lg-center border-bottom g-4 px-2 py-4">
    <div class="col" style="flex: 0.6;">
        <div class="ms-2">
            <h6 class="mb-0 fw-light">${coups[i].pkgCoupNo}</h6>
        </div>
    </div>

    <div class="col" style="flex: 1;">
        <h6 class="mb-0 fw-normal">${coups[i].pkgCoupName}</h6>
    </div>

    <div class="col" style="flex: 1.1;">
        <h6 class="mb-0 fw-normal">${coups[i].pkgCoupIntroduce}</h6>
    </div>

    <div class="col" style="flex: 0.6;">
        <h6 class="mb-0 fw-normal">${coups[i].pkgCoupDiscount}</h6>
    </div>

    <div class="col" style="flex: 0.9;">
        <h6 class="mb-0 fw-normal">${coups[i].pkgCoupStartDate}</h6>
    </div>
	`;

        switch (coups[i].pkgCoupState) {
            case 0:
                html += `
            <div class="col" style="flex: 0.6;" >
                <div class="badge bg-orange bg-opacity-10 text-orange">未上架
                </div> 
            </div>
            `;
                break;
            case 1:
                html += `
            <div class="col" style = "flex: 0.6;" >
                <div class="badge bg-success bg-opacity-10 text-success">已上架
                </div> 
            </div>
            `;
                break;
        }
        html += `

    <div class="col" style="flex: 0.5;">
        <button class="btn btn-sm btn-light mb-0" type="button" data-bs-toggle="collapse"
            data-bs-target="#view${coups[i].pkgCoupNo}" aria-expanded="false" aria-controls="view${coups[i].pkgCoupNo}">
            </a>
            <i class="fa-solid fa-eye"></i>
    </div>
     <div class="col" style="flex: 0.5;">
        <button class="btn btn-sm btn-light mb-0" type="button" data-bs-toggle="collapse"
            data-bs-target="#editcoupon${coups[i].pkgCoupNo}" aria-expanded="false" aria-controls="editcoupon${coups[i].pkgCoupNo}">

            <i class="fa-solid fa-pen-to-square"></i>
    </div>

    <div class="col" style="flex: 0.55;">
        <button class="btn btn-sm btn-light mb-0" type="button" data-bs-toggle="modal"
            data-bs-target="#removecoupon${coups[i].pkgCoupNo}" aria-expanded="false" aria-controls="removecoupon${coups[i].pkgCoupNo}" onclick="onRemoveClick(${coups[i].pkgCoupNo})">
            <i class="fa-solid fa-trash-can"></i>

    </div>

</div>

        `;

        // 刪除彈跳窗
        html += `
                            <div class="modal fade" id="removecoupon${coups[i].pkgCoupNo}" tabindex="-1"
                                aria-labelledby="removecoupon${coups[i].pkgCoupNo}" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                            <h5 class="modal-title" id="removemsg${coups[i].pkgCoupNo}"></h5>
                                            <button type="button" class="btn-close"
                                                data-bs-dismiss="modal" aria-label="Close"></button>

                                        </div>

                                    </div>
                                </div>

        `;

        //    查看 START
        html += `
        <div class="btn" style="min-height: 1px; min-width: 5px;">
            <div class="collapse collapse-horizontal" id="view${coups[i].pkgCoupNo}">
                <div class="card" style="width: 850px;height:280px">

                    <table class="form-text" style="width: 320px; margin-left: 250px;">
                        <br>

                            <tr>
                                <th>優惠券編號 : </th>
                                <td>${coups[i].pkgCoupNo}</td>
                            </tr>
                            <tr>
                                <th>優惠券名稱 : </th>
                                <td><span>${coups[i].pkgCoupName}</span></td>
                            </tr>
                            <tr>
                                <th>優惠券介紹 : </th>
                                <td><span>${coups[i].pkgCoupIntroduce}</span></td>
                            </tr>
                            <tr>
                                <th>折扣金額 : </th>
                                <td><span>${coups[i].pkgCoupDiscount}</span></td>
                            </tr>
                            <tr>
                                <th>最低消費金額 : </th>
                                <td><span>${coups[i].pkgCoupMinicharge}</span></td>
                            </tr>
                            <tr>
                                <th>發放起始日 : </th>
                                <td><span>${coups[i].pkgCoupStartDate}</span></td>
                            </tr>
                            <tr>
                                <th>發放結束日 : </th>
                                <td><span>${coups[i].pkgCoupEndDate}</span></td>
                            </tr>
                            <tr>
                                <th>使用起始日 : </th>
                                <td><span>${coups[i].pkgCoupUseStartDate}</span></td>
                            </tr>
                            <tr>
                                <th>使用結束日 : </th>
                                <td><span>${coups[i].pkgCoupUseEndDate}</span></td>
                            </tr>
                            </table> 
                        `;
                        switch (coups[i].pkgCoupState) {
                            case 0:
                                html += `
                                <table class="form-text" style="width: 320px; margin-left: 244px;">
                                <tr>
                                <th>優惠券狀態 : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未上架</th>
                                <td><span id="nstate"></span></td>
                                </tr>
                                </table>
                            `;
                                break;
                            case 1:
                                html += `
                                <table class="form-text" style="width: 320px; margin-left: 247px;">
                                <tr>
                                <th>優惠券狀態 : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已上架</th>
                                <td><span id="nstate"></span></td>
                                </tr>
                                </table>
                            `;
                                break;
                        }

                        html += `      

                </div>
            </div>
        </div>
                `;
                
                        // 修改  START
        html += `
        <div style="min-height: 1px; min-width: 5px;">
            <div class="collapse collapse-horizontal" id="editcoupon${coups[i].pkgCoupNo}">
                <div class="card" style="width: 800px;height:500px">

                    <div class="card-2-body-2 p-0">
                        <form class="row g4-2">


                            <div class="col-md-12">
                                <label class="form-label">*優惠券名稱</label>
                                <input type="text"
                                    class="form-control2" id="ncoupname${coups[i].pkgCoupNo}" value="${coups[i].pkgCoupName}">
                            </div>



                            <div class="col-12-2">
                                <label class="form-label">*優惠券介紹</label>
                                <textarea class="form-control2" rows="2" id="nintroduction${coups[i].pkgCoupNo}">${coups[i].pkgCoupIntroduce}</textarea>
                            </div>

                            <div class="col-4">
                                <label class="form-label">*優惠券折扣金額</label>
                                <input type="text"
                                    class="form-control2" id="ndiscount${coups[i].pkgCoupNo}" value="${coups[i].pkgCoupDiscount}">
                            </div>

                            <div class="col-4">
                                <label class="form-label">*能使用的最低消費金額</label>
                                <input type="text"
                                    class="form-control2" id="nminicharge${coups[i].pkgCoupNo}" value="${coups[i].pkgCoupMinicharge}">
                            </div>

                            `;
                            
                            switch (coups[i].pkgCoupState) {
                                case 0:
                                    html += `
                                    <div class="col-4">
                                    <label class="form-label">*優惠券狀態</label>
                                     <form>
                            <select class="form-select form-control2 js-choice" id="nstate${coups[i].pkgCoupNo}" aria-label=".form-select-sm">
                                <option value="0" selected>未上架</option>
                                <option value="1">已上架</option>
                            </select>
                        </form>
                                    
                                </div>
                                `;
                                    break;
                                case 1:
                                    html += `
                                    <div class="col-4">
                                    <label class="form-label">*優惠券狀態</label>
                                   <form>
                            <select class="form-select form-control2 js-choice" id="nstate${coups[i].pkgCoupNo}" aria-label=".form-select-sm">
                                <option value="0" >未上架</option>
                                <option value="1" selected>已上架</option>
                            </select>
                        </form>
                                    
                                </div>
                                `;
                                    break;
                            }

                            html += `
                            <div class="row">
                            
                            <div class="col-3">
                                <label class="form-label">*發放起始日 (上架)</label>
                                <input type="date"
                                    class="form-control2 flatpickr flatpickr-input" value="${coups[i].pkgCoupStartDate}"
                                    data-date-format="Y-m-d" id="nstartdate${coups[i].pkgCoupNo}" readonly="readonly">
                                
                            </div>

                            <div class="col-3">
                                <label class="form-label">*發放結束日 (下架)</label>
                                <input type="date"
                                    class="form-control2 flatpickr flatpickr-input" value="${coups[i].pkgCoupEndDate}"
                                    data-date-format="Y-m-d" id="nenddate${coups[i].pkgCoupNo}" readonly="readonly">
                                
                            </div>

                            <div class="col-3">
                                <label class="form-label">*使用起始日</label> <input type="date"
                                    class="form-control2 flatpickr flatpickr-input" value="${coups[i].pkgCoupUseStartDate}"
                                    data-date-format="Y-m-d"
                                    id="nusestartdate${coups[i].pkgCoupNo}" readonly="readonly">
                                
                            </div>
                  

                            <div class="col-3">
                                <label class="form-label">*使用結束日</label> <input type="date"
                                    class="form-control2 flatpickr flatpickr-input" value="${coups[i].pkgCoupUseEndDate}"
                                    data-date-format="Y-m-d"
                                    id="nuseenddate${coups[i].pkgCoupNo}" readonly="readonly">
                             
                            </div>

                            </div>

                            <div class="col-12-2">
                                <button class="btn btn-dark mb-0 float-end" type="button"
                                    data-bs-toggle="modal" data-bs-target="#editcoup${coups[i].pkgCoupNo}" onclick="onEditClick(${coups[i].pkgCoupNo})">
                                    送出修改
                                </button>
                            </div>


                            <div class="modal fade" id="editcoup${coups[i].pkgCoupNo}" tabindex="-1"
                                aria-labelledby="editcoup${coups[i].pkgCoupNo}Label" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="editcoup${coups[i].pkgCoupNo}Label">修改成功</h5>
                                            <button type="button" class="btn-close"
                                                data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body" id="msg${coups[i].pkgCoupNo}">

                                        </div>

                                    </div>
                                </div>
                            </div>



                        </form>
                    </div>
                </div>
            </div>
        </div>
        `;
             
    }

                $id("showCoup").innerHTML = html;

};



// 修改優惠券
function onEditClick(id) {
    const ncoupname = document.querySelector('#'+'ncoupname'+id);
 	const nintroduction = document.querySelector('#'+'nintroduction'+id);
    const ndiscount = document.querySelector('#'+'ndiscount'+id);
    const nstartdate = document.querySelector('#'+'nstartdate'+id);
    const nenddate = document.querySelector('#'+'nenddate'+id);
    const nusestartdate = document.querySelector('#'+'nusestartdate'+id);
    const nuseenddate = document.querySelector('#'+'nuseenddate'+id);
    const nminicharge = document.querySelector('#'+'nminicharge'+id);
    const nstate = document.querySelector('#'+'nstate'+id);
    const msg = document.querySelector('#'+'msg'+id);
   

        fetch('/flyday/pkg/PkgCoupEdit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                pkgCoupNo: id,
                pkgCoupName: ncoupname.value,
                pkgCoupIntroduce: nintroduction.value,
                pkgCoupDiscount: ndiscount.value,
                pkgCoupStartDate: nstartdate.value,
                pkgCoupEndDate: nenddate.value,
                pkgCoupUseStartDate: nusestartdate.value,
                pkgCoupUseEndDate: nuseenddate.value,
                pkgCoupMinicharge: nminicharge.value,
                pkgCoupState: nstate.value
            })
        }).then(function(response){
        	return response.json(); // 拿json字串
        }).then(data =>{
        	const { successful, message} = data;
        	if (successful) {
        	    msg.textContent = '';
        		console.log("ya");
        		console.log(data.pkgCoupName);
				ncoupname.value=data.pkgCoupName;
				nintroduction.value=data.pkgCoupIntroduce; //因為轉成json格式 可以直接.變數名，不用寫get
				ndiscount.value=data.pkgCoupDiscount;
				nstartdate.value=data.pkgCoupStartDate;
				nenddate.value=data.pkgCoupEndDate;
				nusestartdate.value=data.pkgCoupUseStartDate;
				nuseenddate.value=data.pkgCoupUseEndDate;
				nminicharge.value=data.pkgCoupMinicharge;
				nstate.value=data.pkgCoupState;
                msg.textContent = message;
			//將從 JSON 中獲取的數據分別設置到不同的表單輸入框的 .value 屬性中，這些值被設置到對應的表單輸入框中，並且直接顯示在畫面上，因為使用 .value 屬性來設置這些表單元素的值。
        	    location.reload(); 
        	
        	} else {
        		console.log("no");
        		msg.textContent = message;
        	}
        	
        });
          
}


//刪除優惠券
function onRemoveClick(id) {
	console.log("ooo");
    const msg = document.querySelector('#removemsg'+id);
        

    if (!confirm('確定刪除?')) {
        return;
    }
        console.log("xxx");

        fetch('/flyday/pkg/PkgCoupRemove', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pkgCoupNo: id})
        }).then(function (response) {
            return response.json();
        }).then(data => {
            console.log("lalala");
            console.log(data);
            const { successful, message} = data;
            msg.textContent='';
        	if (successful) {
        	    msg.textContent='刪除成功';
                console.log("yeAhhh");
                location.reload(); 
        	} else {
        	    console.log("no");
        		msg.textContent='刪除失敗';
        		console.log(message);
        	}

        });
    
}

// ==========未上架===============================

const show0coupbtn = document.querySelector('#show0coupbtn');

show0coupbtn.addEventListener('click', function () {
    console.log("hi");

    show0Coup(); //將其顯示在頁面中
    console.log("ahahahah");

})


// 顯示未上架全部及單筆優惠券
function show0Coup() {
    let html = '';
    console.log("coups[i]");
    console.log("coups[i].pkgcoupstate");
    for (let i = 0; i < coups.length; i++) {
	
        if (coups[i].pkgCoupState === 0) {
            html += `
            <div class="row row-cols-xl-9 align-items-lg-center border-bottom g-4 px-2 py-4">
                <div class="col" style="flex: 0.6;">
                    <div class="ms-2">
                        <h6 class="mb-0 fw-light">${coups[i].pkgCoupNo}</h6>
                    </div>
                </div>
            
                <div class="col" style="flex: 1;">
                    <h6 class="mb-0 fw-normal">${coups[i].pkgCoupName}</h6>
                </div>
            
                <div class="col" style="flex: 1.1;">
                    <h6 class="mb-0 fw-normal">${coups[i].pkgCoupIntroduce}</h6>
                </div>
            
                <div class="col" style="flex: 0.6;">
                    <h6 class="mb-0 fw-normal">${coups[i].pkgCoupDiscount}</h6>
                </div>
            
                <div class="col" style="flex: 0.9;">
                    <h6 class="mb-0 fw-normal">${coups[i].pkgCoupStartDate}</h6>
                </div>
                `;
            
                    switch (coups[i].pkgCoupState) {
                        case 0:
                            html += `
                        <div class="col" style="flex: 0.6;" >
                            <div class="badge bg-orange bg-opacity-10 text-orange">未上架
                            </div> 
                        </div>
                        `;
                            break;
                        case 1:
                            html += `
                        <div class="col" style = "flex: 0.6;" >
                            <div class="badge bg-success bg-opacity-10 text-success">已上架
                            </div> 
                        </div>
                        `;
                            break;
                    }
                    html += `
            
                <div class="col" style="flex: 0.5;">
                    <button class="btn btn-sm btn-light mb-0" type="button" data-bs-toggle="collapse"
                        data-bs-target="#view${coups[i].pkgCoupNo}" aria-expanded="false" aria-controls="view${coups[i].pkgCoupNo}">
                        </a>
                        <i class="fa-solid fa-eye"></i>
                </div>
                 <div class="col" style="flex: 0.5;">
                    <button class="btn btn-sm btn-light mb-0" type="button" data-bs-toggle="collapse"
                        data-bs-target="#editcoupon${coups[i].pkgCoupNo}" aria-expanded="false" aria-controls="editcoupon${coups[i].pkgCoupNo}">
            
                        <i class="fa-solid fa-pen-to-square"></i>
                </div>
            
                <div class="col" style="flex: 0.55;">
                    <button class="btn btn-sm btn-light mb-0" type="button" data-bs-toggle="modal"
                        data-bs-target="#removecoupon${coups[i].pkgCoupNo}" aria-expanded="false" aria-controls="removecoupon${coups[i].pkgCoupNo}" onclick="onRemoveClick(${coups[i].pkgCoupNo})">
                        <i class="fa-solid fa-trash-can"></i>
            
                </div>
            
            </div>
            
                    `;
            
                    // 刪除彈跳窗
                    html += `
                                        <div class="modal fade" id="removecoupon${coups[i].pkgCoupNo}" tabindex="-1"
                                            aria-labelledby="removecoupon${coups[i].pkgCoupNo}" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                        <h5 class="modal-title" id="removemsg${coups[i].pkgCoupNo}"></h5>
                                                        <button type="button" class="btn-close"
                                                            data-bs-dismiss="modal" aria-label="Close"></button>
            
                                                    </div>
            
                                                </div>
                                            </div>
            
                    `;
            
                    //    查看 START
                    html += `
                    <div class="btn" style="min-height: 1px; min-width: 5px;">
                        <div class="collapse collapse-horizontal" id="view${coups[i].pkgCoupNo}">
                            <div class="card" style="width: 850px;height:280px">
            
                                <table class="form-text" style="width: 320px; margin-left: 250px;">
                                    <br>
            
                                        <tr>
                                            <th>優惠券編號 : </th>
                                            <td>${coups[i].pkgCoupNo}</td>
                                        </tr>
                                        <tr>
                                            <th>優惠券名稱 : </th>
                                            <td><span>${coups[i].pkgCoupName}</span></td>
                                        </tr>
                                        <tr>
                                            <th>優惠券介紹 : </th>
                                            <td><span>${coups[i].pkgCoupIntroduce}</span></td>
                                        </tr>
                                        <tr>
                                            <th>折扣金額 : </th>
                                            <td><span>${coups[i].pkgCoupDiscount}</span></td>
                                        </tr>
                                        <tr>
                                            <th>最低消費金額 : </th>
                                            <td><span>${coups[i].pkgCoupMinicharge}</span></td>
                                        </tr>
                                        <tr>
                                            <th>發放起始日 : </th>
                                            <td><span>${coups[i].pkgCoupStartDate}</span></td>
                                        </tr>
                                        <tr>
                                            <th>發放結束日 : </th>
                                            <td><span>${coups[i].pkgCoupEndDate}</span></td>
                                        </tr>
                                        <tr>
                                            <th>使用起始日 : </th>
                                            <td><span>${coups[i].pkgCoupUseStartDate}</span></td>
                                        </tr>
                                        <tr>
                                            <th>使用結束日 : </th>
                                            <td><span>${coups[i].pkgCoupUseEndDate}</span></td>
                                        </tr>
                                        </table> 
                                    `;
                                    switch (coups[i].pkgCoupState) {
                                        case 0:
                                            html += `
                                            <table class="form-text" style="width: 320px; margin-left: 244px;">
                                            <tr>
                                            <th>優惠券狀態 : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未上架</th>
                                            <td><span id="nstate"></span></td>
                                            </tr>
                                            </table>
                                        `;
                                            break;
                                        case 1:
                                            html += `
                                            <table class="form-text" style="width: 320px; margin-left: 247px;">
                                            <tr>
                                            <th>優惠券狀態 : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已上架</th>
                                            <td><span id="nstate"></span></td>
                                            </tr>
                                            </table>
                                        `;
                                            break;
                                    }
            
                                    html += `      
            
                            </div>
                        </div>
                    </div>
                            `;
                            
                                    // 修改  START
                    html += `
                    <div style="min-height: 1px; min-width: 5px;">
                        <div class="collapse collapse-horizontal" id="editcoupon${coups[i].pkgCoupNo}">
                            <div class="card" style="width: 800px;height:500px">
            
                                <div class="card-2-body-2 p-0">
                                    <form class="row g4-2">
            
            
                                        <div class="col-md-12">
                                            <label class="form-label">*優惠券名稱</label>
                                            <input type="text"
                                                class="form-control2" id="ncoupname${coups[i].pkgCoupNo}" value="${coups[i].pkgCoupName}">
                                            </input>
                                        </div>
            
            
            
                                        <div class="col-12-2">
                                            <label class="form-label">*優惠券介紹</label>
                                            <textarea class="form-control2" rows="2" id="nintroduction${coups[i].pkgCoupNo}">${coups[i].pkgCoupIntroduce}</textarea>
                                        </div>
            
                                        <div class="col-4">
                                            <label class="form-label">*優惠券折扣金額</label>
                                            <input type="text"
                                                class="form-control2" id="ndiscount${coups[i].pkgCoupNo}" value="${coups[i].pkgCoupDiscount}">
                                            </input>
                                        </div>
            
                                        <div class="col-4">
                                            <label class="form-label">*能使用的最低消費金額</label>
                                            <input type="text"
                                                class="form-control2" id="nminicharge${coups[i].pkgCoupNo}" value="${coups[i].pkgCoupMinicharge}">
                                            </input>
                                        </div>
            
                                        `;
                                        
                                        switch (coups[i].pkgCoupState) {
                                            case 0:
                                                html += `
                                                <div class="col-4">
                                                <label class="form-label">*優惠券狀態</label>
                                                  <form>
                            <select class="form-select form-control2 js-choice" id="nstate${coups[i].pkgCoupNo}" aria-label=".form-select-sm">
                                <option value="0" selected>未上架</option>
                                <option value="1" >已上架</option>
                            </select>
                        </form>
                                            </div>
                                            `;
                                                break;
                                            case 1:
                                                html += `
                                                <div class="col-4">
                                                <label class="form-label">*優惠券狀態</label>
                                                  <form>
                            <select class="form-select form-control2 js-choice" id="nstate${coups[i].pkgCoupNo}" aria-label=".form-select-sm">
                                <option value="0" >未上架</option>
                                <option value="1" selected>已上架</option>
                            </select>
                        </form>
                                            </div>
                                            `;
                                                break;
                                        }
            
                                        html += `
                                        <div class="row">
                                        
                                        <div class="col-3">
                                            <label class="form-label">*發放起始日 (上架)</label>
                                            <input type="date"
                                                class="form-control2 flatpickr" value="${coups[i].pkgCoupStartDate}"
                                                data-date-format="Y-m-d" id="nstartdate${coups[i].pkgCoupNo}">
                                            </input>
                                        </div>
            
                                        <div class="col-3">
                                            <label class="form-label">*發放結束日 (下架)</label>
                                            <input type="date"
                                                class="form-control2 flatpickr" value="${coups[i].pkgCoupEndDate}"
                                                data-date-format="Y-m-d" id="nenddate${coups[i].pkgCoupNo}">
                                            </input>
                                        </div>
            
                                        <div class="col-3">
                                            <label class="form-label">*使用起始日</label> <input type="date"
                                                class="form-control2 flatpickr" value="${coups[i].pkgCoupUseStartDate}"
                                                data-date-format="Y-m-d"
                                                id="nusestartdate${coups[i].pkgCoupNo}">
                                            
                                        </div>
                              
            
                                        <div class="col-3">
                                            <label class="form-label">*使用結束日</label> <input type="date"
                                                class="form-control2 flatpickr" value="${coups[i].pkgCoupUseEndDate}"
                                                data-date-format="Y-m-d"
                                                id="nuseenddate${coups[i].pkgCoupNo}">
                                            </input>
                                        </div>
            
            
            </div>
                                        <div class="col-12-2">
                                            <button class="btn btn-dark mb-0 float-end" type="button"
                                                data-bs-toggle="modal" data-bs-target="#editcoup${coups[i].pkgCoupNo}" onclick="onEditClick(${coups[i].pkgCoupNo})">
                                                送出修改
                                            </button>
                                        </div>
            
            
                                        <div class="modal fade" id="editcoup${coups[i].pkgCoupNo}" tabindex="-1"
                                            aria-labelledby="editcoup${coups[i].pkgCoupNo}Label" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="editcoup${coups[i].pkgCoupNo}Label">修改成功</h5>
                                                        <button type="button" class="btn-close"
                                                            data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body" id="msg${coups[i].pkgCoupNo}">
            
                                                    </div>
            
                                                </div>
                                            </div>
                                        </div>
            
            
            
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
        }
    }

    $id("showCoup").innerHTML = html;

};


// ==========已上架====================

const show1coupbtn = document.querySelector('#show1coupbtn');

show1coupbtn.addEventListener('click', function () {
    show1Coup(); //將其顯示在頁面中

})

// 顯示已上架全部及單筆優惠券
function show1Coup() {
    let html = '';
    
    for (let i = 0; i < coups.length; i++) {

        if (coups[i].pkgCoupState === 1) {
            html += `
            <div class="row row-cols-xl-9 align-items-lg-center border-bottom g-4 px-2 py-4">
                <div class="col" style="flex: 0.6;">
                    <div class="ms-2">
                        <h6 class="mb-0 fw-light">${coups[i].pkgCoupNo}</h6>
                    </div>
                </div>
            
                <div class="col" style="flex: 1;">
                    <h6 class="mb-0 fw-normal">${coups[i].pkgCoupName}</h6>
                </div>
            
                <div class="col" style="flex: 1.1;">
                    <h6 class="mb-0 fw-normal">${coups[i].pkgCoupIntroduce}</h6>
                </div>
            
                <div class="col" style="flex: 0.6;">
                    <h6 class="mb-0 fw-normal">${coups[i].pkgCoupDiscount}</h6>
                </div>
            
                <div class="col" style="flex: 0.9;">
                    <h6 class="mb-0 fw-normal">${coups[i].pkgCoupStartDate}</h6>
                </div>
                `;
            
                    switch (coups[i].pkgCoupState) {
                        case 0:
                            html += `
                        <div class="col" style="flex: 0.6;" >
                            <div class="badge bg-orange bg-opacity-10 text-orange">未上架
                            </div> 
                        </div>
                        `;
                            break;
                        case 1:
                            html += `
                        <div class="col" style = "flex: 0.6;" >
                            <div class="badge bg-success bg-opacity-10 text-success">已上架
                            </div> 
                        </div>
                        `;
                            break;
                    }
                    html += `
            
                <div class="col" style="flex: 0.5;">
                    <button class="btn btn-sm btn-light mb-0" type="button" data-bs-toggle="collapse"
                        data-bs-target="#view${coups[i].pkgCoupNo}" aria-expanded="false" aria-controls="view${coups[i].pkgCoupNo}">
                        </a>
                        <i class="fa-solid fa-eye"></i>
                </div>
                 <div class="col" style="flex: 0.5;">
                    <button class="btn btn-sm btn-light mb-0" type="button" data-bs-toggle="collapse"
                        data-bs-target="#editcoupon${coups[i].pkgCoupNo}" aria-expanded="false" aria-controls="editcoupon${coups[i].pkgCoupNo}">
            
                        <i class="fa-solid fa-pen-to-square"></i>
                </div>
            
                <div class="col" style="flex: 0.55;">
                    <button class="btn btn-sm btn-light mb-0" type="button" data-bs-toggle="modal"
                        data-bs-target="#removecoupon${coups[i].pkgCoupNo}" aria-expanded="false" aria-controls="removecoupon${coups[i].pkgCoupNo}" onclick="onRemoveClick(${coups[i].pkgCoupNo})">
                        <i class="fa-solid fa-trash-can"></i>
            
                </div>
            
            </div>
            
                    `;
            
                    // 刪除彈跳窗
                    html += `
                                        <div class="modal fade" id="removecoupon${coups[i].pkgCoupNo}" tabindex="-1"
                                            aria-labelledby="removecoupon${coups[i].pkgCoupNo}" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                        <h5 class="modal-title" id="removemsg${coups[i].pkgCoupNo}"></h5>
                                                        <button type="button" class="btn-close"
                                                            data-bs-dismiss="modal" aria-label="Close"></button>
            
                                                    </div>
            
                                                </div>
                                            </div>
            
                    `;
            
                    //    查看 START
                    html += `
                    <div class="btn" style="min-height: 1px; min-width: 5px;">
                        <div class="collapse collapse-horizontal" id="view${coups[i].pkgCoupNo}">
                            <div class="card" style="width: 850px;height:280px">
            
                                <table class="form-text" style="width: 320px; margin-left: 250px;">
                                    <br>
            
                                        <tr>
                                            <th>優惠券編號 : </th>
                                            <td>${coups[i].pkgCoupNo}</td>
                                        </tr>
                                        <tr>
                                            <th>優惠券名稱 : </th>
                                            <td><span>${coups[i].pkgCoupName}</span></td>
                                        </tr>
                                        <tr>
                                            <th>優惠券介紹 : </th>
                                            <td><span>${coups[i].pkgCoupIntroduce}</span></td>
                                        </tr>
                                        <tr>
                                            <th>折扣金額 : </th>
                                            <td><span>${coups[i].pkgCoupDiscount}</span></td>
                                        </tr>
                                        <tr>
                                            <th>最低消費金額 : </th>
                                            <td><span>${coups[i].pkgCoupMinicharge}</span></td>
                                        </tr>
                                        <tr>
                                            <th>發放起始日 : </th>
                                            <td><span>${coups[i].pkgCoupStartDate}</span></td>
                                        </tr>
                                        <tr>
                                            <th>發放結束日 : </th>
                                            <td><span>${coups[i].pkgCoupEndDate}</span></td>
                                        </tr>
                                        <tr>
                                            <th>使用起始日 : </th>
                                            <td><span>${coups[i].pkgCoupUseStartDate}</span></td>
                                        </tr>
                                        <tr>
                                            <th>使用結束日 : </th>
                                            <td><span>${coups[i].pkgCoupUseEndDate}</span></td>
                                        </tr>
                                        </table> 
                                    `;
                                    switch (coups[i].pkgCoupState) {
                                        case 0:
                                            html += `
                                            <table class="form-text" style="width: 320px; margin-left: 244px;">
                                            <tr>
                                            <th>優惠券狀態 : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未上架</th>
                                            <td><span id="nstate"></span></td>
                                            </tr>
                                            </table>
                                        `;
                                            break;
                                        case 1:
                                            html += `
                                            <table class="form-text" style="width: 320px; margin-left: 247px;">
                                            <tr>
                                            <th>優惠券狀態 : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已上架</th>
                                            <td><span id="nstate"></span></td>
                                            </tr>
                                            </table>
                                        `;
                                            break;
                                    }
            
                                    html += `      
            
                            </div>
                        </div>
                    </div>
                            `;
                            
                                    // 修改  START
                    html += `
                    <div style="min-height: 1px; min-width: 5px;">
                        <div class="collapse collapse-horizontal" id="editcoupon${coups[i].pkgCoupNo}">
                            <div class="card" style="width: 800px;height:500px">
            
                                <div class="card-2-body-2 p-0">
                                    <form class="row g4-2">
            
            
                                        <div class="col-md-12">
                                            <label class="form-label">*優惠券名稱</label>
                                            <input type="text"
                                                class="form-control2" id="ncoupname${coups[i].pkgCoupNo}" value="${coups[i].pkgCoupName}">
                                            </input>
                                        </div>
            
            
            
                                        <div class="col-12-2">
                                            <label class="form-label">*優惠券介紹</label>
                                            <textarea class="form-control2" rows="2" id="nintroduction${coups[i].pkgCoupNo}">${coups[i].pkgCoupIntroduce}</textarea>
                                        </div>
            
                                        <div class="col-4">
                                            <label class="form-label">*優惠券折扣金額</label>
                                            <input type="text"
                                                class="form-control2" id="ndiscount${coups[i].pkgCoupNo}" value="${coups[i].pkgCoupDiscount}">
                                            </input>
                                        </div>
            
                                        <div class="col-4">
                                            <label class="form-label">*能使用的最低消費金額</label>
                                            <input type="text"
                                                class="form-control2" id="nminicharge${coups[i].pkgCoupNo}" value="${coups[i].pkgCoupMinicharge}">
                                            </input>
                                        </div>
            
                                        `;
                                        
                                        switch (coups[i].pkgCoupState) {
                                            case 0:
                                                html += `
                                                <div class="col-4">
                                                <label class="form-label">*優惠券狀態</label>
                                                <form>
                            <select class="form-select form-control2 js-choice" id="nstate${coups[i].pkgCoupNo}" aria-label=".form-select-sm">
                                <option value="0" selected>未上架</option>
                                <option value="1">已上架</option>
                            </select>
                        </form>
                                            </div>
                                            `;
                                                break;
                                            case 1:
                                                html += `
                                                <div class="col-4">
                                                <label class="form-label">*優惠券狀態</label>
                                                <form>
                            <select class="form-select form-control2 js-choice" id="nstate${coups[i].pkgCoupNo}" aria-label=".form-select-sm">
                                <option value="0" >未上架</option>
                                <option value="1" selected>已上架</option>
                            </select>
                        </form>
                                            </div>
                                            `;
                                                break;
                                        }
            
                                        html += `
                                        <div class="row">
                                        <div class="col-3">
                                            <label class="form-label">*發放起始日 (上架)</label>
                                            <input type="date"
                                                class="form-control2 flatpickr" value="${coups[i].pkgCoupStartDate}"
                                                data-date-format="Y-m-d" id="nstartdate${coups[i].pkgCoupNo}">
                                            </input>
                                        </div>
            
                                        <div class="col-3">
                                            <label class="form-label">*發放結束日 (下架)</label>
                                            <input type="date"
                                                class="form-control2 flatpickr" value="${coups[i].pkgCoupEndDate}"
                                                data-date-format="Y-m-d" id="nenddate${coups[i].pkgCoupNo}">
                                            </input>
                                        </div>
            
                                        <div class="col-3">
                                            <label class="form-label">*使用起始日</label> <input type="date"
                                                class="form-control2 flatpickr" value="${coups[i].pkgCoupUseStartDate}"
                                                data-date-format="Y-m-d"
                                                id="nusestartdate${coups[i].pkgCoupNo}">
                                            
                                        </div>
                              
            
                                        <div class="col-3">
                                            <label class="form-label">*使用結束日</label> <input type="date"
                                                class="form-control2 flatpickr" value="${coups[i].pkgCoupUseEndDate}"
                                                data-date-format="Y-m-d"
                                                id="nuseenddate${coups[i].pkgCoupNo}">
                                            </input>
                                        </div>
                                                    </div>
            
            
            
                                        <div class="col-12-2">
                                            <button class="btn btn-dark mb-0 float-end" type="button"
                                                data-bs-toggle="modal" data-bs-target="#editcoup${coups[i].pkgCoupNo}" onclick="onEditClick(${coups[i].pkgCoupNo})">
                                                送出修改
                                            </button>
                                        </div>
            
            
                                        <div class="modal fade" id="editcoup${coups[i].pkgCoupNo}" tabindex="-1"
                                            aria-labelledby="editcoup${coups[i].pkgCoupNo}Label" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="editcoup${coups[i].pkgCoupNo}Label">修改成功</h5>
                                                        <button type="button" class="btn-close"
                                                            data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body" id="msg${coups[i].pkgCoupNo}">
            
                                                    </div>
            
                                                </div>
                                            </div>
                                        </div>
            
            
            
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
        }
    }

    $id("showCoup").innerHTML = html;

};



// ==========所有優惠券====================

const showallcoupbtn = document.querySelector('#showallcoupbtn');

showallcoupbtn.addEventListener('click', function () {
    showCoup(); //將其顯示在頁面中

})