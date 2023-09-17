const pkgno = document.querySelector('#pkgno');
const pkgname = document.querySelector('#pkgname')
const gatherloc = document.querySelector('#gatherloc')
const pkgloc = document.querySelector('#pkgloc')
const address = document.querySelector('#address')
const pkgtype = document.querySelector('#pkgtype')
const pkgcontent = document.querySelector('#pkgcontent')
const pkgnotice = document.querySelector('#pkgnotice')
const refpolicy = document.querySelector('#refpolicy')
const pkgimgs = document.querySelector('#pkgimgs')
const pkgplans = document.querySelector('#pkgplans')

document.addEventListener("DOMContentLoaded", async function () {
    //顯示單筆行程
    await fetch('/flyday/pkg/selectpkgno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pkgNo: sessionStorage.getItem("pkgNo") })
    })
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            headpichtml = '';
            grouphtml = '';

            pkgname.textContent = data.pkgName;
            gatherloc.textContent = data.pkgGather;
            pkgloc.textContent = data.pkgPlace;
            address.textContent = data.pkgAddress;
            pkgcontent.textContent = data.pkgContent;
            pkgnotice.textContent = data.pkgNotice;
            refpolicy.textContent = data.pkgRefpolicy;

            headpichtml += `
                
                <div class="img image-container">
             <img src="data:image/jpeg;base64,${data.pkgPicBase64}" style="width:660px; height:370px; border-radius: 14px;">
            <div class="desc">
        </div>
    </div>
                        `;
            headpic.innerHTML = headpichtml;

            if (data.pkgGroup === 1) {
                grouphtml += `
                                <div class="d-grid">
                                <a href="/flyday/Act/add-listing-minimal.html" class="btn btn-lg btn-orange-soft mb-0">熱門揪團中</a>
								</div>
                                `;
                group.innerHTML = grouphtml;

            }

        })

    //顯示所有方案

    await fetch('/flyday/pkgplan/selectpkgno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pkgNo: sessionStorage.getItem("pkgNo") })
    }).then(function (resp) {
        return resp.json()
        console.log("ddd");
    }).then(function (data) {
        console.log(data.length);

        let html = '';
        for (let i = 0; i < data.length; i++) {

            html += `
            <div class="card shadow p-3">
        <div class="row g-4">
        <div class="col-md-4 position-relative">

            <div id="carouselExampleControls${data[i].pkgPlanNo}" class="carousel slide"
                data-bs-ride="carousel" style="width: 75%">
                <div class="carousel-inner rounded">

                    <div id="showpic"></div>

                </div>
                <button class="carousel-control-prev" type="button"
                    data-bs-target="#carouselExampleControls${data[i].pkgPlanNo}"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button"
                    data-bs-target="#carouselExampleControls${data[i].pkgPlanNo}"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

        </div>

        <div class="col-md-8">
            <div class="card-body d-flex flex-column h-100 p-0">

                <h5 class="card-title">
                    ${data[i].pkgPlanTitle}
                </h5>

                <p class="text-success mb-0">可容納人數 : ${data[i].pkgPlanNum}</p>

                <div
                    class="d-sm-flex justify-content-sm-between align-items-center mt-auto">
                    <div class="d-flex align-items-center">
                        <h5 class="fw-bold mb-0 me-1">&#36;${data[i].pkgGroupMoney}</h5>
                        <span class="mb-0 me-2">/day</span>
                    </div>
                    <div class="mt-3 mt-sm-0">
                        <button class="btn btn-sm btn-primary mb-0"
															id="mydate"
															data-bs-toggle="collapse"
															data-bs-target="#choosepkg${data[i].pkgPlanNo}" aria-expanded="false"
															aria-controls="choosepkgbtn">選擇
                        
                    </div>
                </div>
            </div>
        </div>
           </div>
        </div>
        <br>

          <div class="collapse collapse-horizontal" id="choosepkg${data[i].pkgPlanNo}">
          
          <section class="ftco-section">

                  <div class="row">
       
                                      <div class="form-fs-md">
										<label class="form-label">選擇日期</label> 
										<input type="text" class="form-control form-control-lg flatpickr"
										id="date${data[i].pkgPlanNo}" data-mode="range" placeholder="Select date">
									</div>
									
                                    <div class="form-fs-md">
                                                                 
                                  <label class="form-label" id="valueFromMyButton" for="count">數量選擇</label>
                                  <input class="form-control" id="amount${data[i].pkgPlanNo}" onblur="calculateTotal(this, ${data[i].pkgPlanNo}, ${data[i].pkgGroupMoney})" type="number" form-control-lg" value="1" min="0" max="1000000" maxlength="7">
                                  
                                  
                                  <label class="form-label" id="valueFromMyButton" for="name"">總金額</label>
                                  <input class="form-control form-control-lg" type="text" id="total${data[i].pkgPlanNo}" value="${data[i].pkgGroupMoney}" maxlength="36" value="" readonly>
									
								
									</div>
									<div>
									</div>
									<div class="mt-3 mt-sm-0" align="right">
                        <button class="btn btn-sm btn-primary mb-0" onclick="addcart(${data[i].pkgPlanNo}, amount${data[i].pkgPlanNo}.value)"
															id="mydate"
															data-bs-toggle="modal"
															data-bs-target="#cartsuc${data[i].pkgPlanNo}" aria-expanded="false"
															aria-controls="choosepkgbtn">加入購物車</button>


                    </div>

                         		

                              
                      </div>
          </section>
      </div>

      <div class="modal fade" id="cartsuc${data[i].pkgPlanNo}" tabindex="-1"
                                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="exampleModalLabel">已加入行程購物車</h5>
                                                            <button type="button" class="btn-close"
                                                                data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
`;
		sessionStorage.setItem("price",`${data[i].pkgGroupMoney}`);

        }
        pkgplans.innerHTML = html;

        flatpickr(".flatpickr", {});

    })


    //顯示行程圖片
    await fetch('/flyday/pkgpic/select', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pkgNo: sessionStorage.getItem("pkgNo") })
    })
        .then(function (resp) {
            return resp.json()
        })
        .then(function (pic) {
            const planpicall = document.querySelectorAll("#showpic");
            html = '';

            for (i = 0; i < pic.length; i++) {

                if (i === 0) {
                    html += `
 
                    <div class="carousel-item active">
                    <img src="${pic[i].pkgImg}" style="width: 200px; height: 150px;">
                    </div>
                    `;

                } else {
                    html += `

                    <div class="carousel-item">
                    <img src="${pic[i].pkgImg}" style="width: 200px; height: 150px;">
                    </div>
                    `;
                }

            }

            for (let j = 0; j < planpicall.length; j++) {
                planpicall[j].innerHTML = html;
            }

        })
})


function calculateTotal(element, pkgPlanNo, pkgGroupMoney) {
    // 获取输入框的值（数量）
    //   const amountValue2 = parseInt(inputElement.value);
    const amountValue = parseInt(element.value);

    // 计算总金额
    const totalAmount = amountValue * pkgGroupMoney;

    // 在这里你可以执行任何你需要的操作，比如更新显示总金额的元素等等
    // 例如，假设你有一个显示总金额的<span>元素：
    const totalElement = document.getElementById(`total${pkgPlanNo}`);
    totalElement.value = totalAmount;

    // 如果需要，你也可以将总金额存储在一个变量中，以便将其用于其他用途
    // 例如，将总金额存储在一个名为totalAmount的全局变量中
    // totalAmount = totalAmount;

    // 在这里你可以执行任何其他你需要的操作
}

// const amountValue = parseInt(document.getElementById(`amount${data[i].pkgPlanNo}`).value);
// amountValue.addEventListener('blur', function (){
// // 获取输入框和相关数据
// const inputElement = document.getElementById(`total${data[i].pkgPlanNo}`);

// const pkgPlanContentValue = parseInt(data[i].pkgPlanContent);

// // 计算总金额
// const totalAmount = amountValue * pkgPlanContentValue;

// // 将计算结果设置为输入框的值
// inputElement.value = totalAmount;
// });
const cartno = document.querySelector('#cartno');


function addcart(pkgPlanNo, amount) {
    const amountValue = document.getElementById(`amount${pkgPlanNo}`).value;
    const dateValue = document.getElementById(`date${pkgPlanNo}`).value;
    sessionStorage.setItem("number", pkgPlanNo);
    sessionStorage.setItem("cartPkgPlanNo" + pkgPlanNo, pkgPlanNo);
    sessionStorage.setItem("cartAmount" + pkgPlanNo, amountValue); // 将输入框的值存储在会话存储中
    sessionStorage.setItem("cartDate" + pkgPlanNo, dateValue);
	console.log(amountValue);
	console.log(pkgPlanNo);

    //存購物車進資料庫
    fetch('/flyday/pkg/PkgShopAdd', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
             pkgShopCartid:{
            memNo: 1,
            pkgPlanNo: pkgPlanNo},
            pkgQty: amountValue
        })
    }).then(function (response) {
        return response.json();
    }).then(body => {
        const { successful, message } = body;
        if (successful) {
            console.log("success");
        } else {
            console.log("fail");
        }
    });
}

function redirectCart() {
    location = "package-shopcart.html";
}



