let tkts;

window.addEventListener("load", function() {      

    fetch('addtktlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },        
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                const { status, statusText } = response;
                throw Error(`${status}: ${statusText}`);
            }
        })
        .then(function (data) {
            tkts = data;
            showTktlist(); //將其顯示到頁面中
        })
        .then(obj => console.log(obj))
        .catch(function (error) {
            console.log(error);
        })


        
})
function showTktlist(){
    let html = "";
    for (let i = 0; i < tkts.length; i++) {
        html += `
            <!-- Table data -->
            <div class="row row-cols-xl-7 align-items-lg-center border-bottom g-4 px-2 py-4">
                <!-- Data item -->
                <div class="col tkt-listname-position">
                    <small class="d-block d-lg-none">標題名稱</small>
                    <div class="d-flex align-items-center">
                        <!-- Image -->
                        <div class="w-80px flex-shrink-0">
                            <img class="rounded" src="../assets/images/category/hotel/4by3/01.jpg" alt="avatar">									
                        </div>
                        <!-- Title -->
                        <h6 class="mb-0 ms-2 tkt-list-position">${tkts[i].tktname}</h6>                            
                    </div>
                </div>					

                <!-- Data item -->
                <div class="col-1 tkt-list-1">
                    <small class="d-block d-lg-none">開始日期</small>
                    <h6 class="mb-0 fw-normal tkt-listdate-position">${tkts[i].tktstartdate}</h6>
                </div>

                <!-- Data item -->
                <div class="col-1 tkt-list-1 tkt-list-position">
                    <small class="d-block d-lg-none">結束日期</small>
                    <h6 class="mb-0 fw-normal tkt-listdate-position">${tkts[i].tktenddate}</h6>
                </div>
                <!-- Data item -->
                <div class="col-1 tkt-list-position tkt-list">
                    <small class="d-block d-lg-none">類型</small>
        `;
        switch(tkts[i].tktsort){
            case 0:
                html += `<h6 class="mb-0 fw-normal">主題樂園</h6>`;
            break;
            case 1:
                html += `<h6 class="mb-0 fw-normal">景點門票</h6>`;
            break;
            case 2:
                html += `<h6 class="mb-0 fw-normal">水族館</h6>`;
            break;
            case 3:
                html += `<h6 class="mb-0 fw-normal">動物園</h6>`;
            break;
            case 4:
                html += `<h6 class="mb-0 fw-normal">博物館</h6>`;
            break;
            case 5:
                html += `<h6 class="mb-0 fw-normal">美術館</h6>`;
            break;
            case 6:
                html += `<h6 class="mb-0 fw-normal">展覽</h6>`;
            break;
            case 7:
                html += `<h6 class="mb-0 fw-normal">其他</h6>`;
            break;
        }

        html += `
                </div>
                <!-- Data item -->
                <div class="col-1 tkt-list-position tkt-list">
                    <small class="d-block d-lg-none">狀態</small>
        `;

        switch(tkts[i].tktstat){
            case 0:
                html += `<div class="badge bg-danger bg-opacity-10 text-danger">未上架</div>`;
            break;
            case 1:
                html += `<div class="badge bg-success bg-opacity-10 text-success">已上架</div>`;
            break;
        }

        html += `
            </div>
            <!-- Data item -->
            <div class="col-1 tkt-list-position tkt-list"><a href="tkt-admin-detail.html" class="btn btn-sm btn-light mb-0">方案</a></div>

            <!-- Data item -->
            <div class="col-1 tkt-list-position tkt-list"><a href="tkt-add-listing.html" class="btn btn-sm btn-light mb-0">修改</a></div>
        </div>
        `;           

    }
    
    $("#addtktlist").next().html(html);
    // document.getElementById("t1").innerHTML = html;


}


