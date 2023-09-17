let tkts;
let tktimgs;
let tktDetial;
let firstImages = {};
let startDatePicker;
let endDatePicker;
let distList;
let currentTabId;
const allStatBtn = document.getElementById("alltktList");
const onStatBtn = document.getElementById("ontktList");
const removeStatBtn = document.getElementById("removetktList");
const tktsortList = document.getElementById("tktsortList");

document.addEventListener("DOMContentLoaded", async function () {   

    // 所有 * 都變紅色
    document.querySelectorAll('label, h5').forEach(function(element) {
        element.innerHTML = element.innerHTML.replace(/\*/g, '<span style="color: red;">*</span>');
    });

    // 初始化開始日期設定
    startDatePicker = flatpickr("#tktstartdate", {
        dateFormat: "Y-m-d", // 日期格式
        onChange: function (selectedDates, dateStr) {
            // 當開始日期改變時，更新結束日期選擇器的最小日期
            endDatePicker.set("minDate", dateStr);
        },
    });  
    // 初始化結束日期設定
    endDatePicker = flatpickr("#tktenddate", {
        dateFormat: "Y-m-d", // 日期格式
        minDate: "today",    // 最小日期是今天
    });
    // 設定結束日期選擇器的最小日期為今天
    endDatePicker.set("minDate", "today");

    // 動態生成地區下拉式選單
    distList = {
        '臺北市': ['中正區', '大同區', '中山區', '萬華區', '信義區', '松山區', '大安區', '南港區', '北投區', '內湖區', '士林區', '文山區'],
        '新北市': ['板橋區', '新莊區', '泰山區', '林口區', '淡水區', '金山區', '八里區', '萬里區', '石門區', '三芝區', '瑞芳區', '汐止區', '平溪區', '貢寮區', '雙溪區', '深坑區', '石碇區', '新店區', '坪林區', '烏來區', '中和區', '永和區', '土城區', '三峽區', '樹林區', '鶯歌區', '三重區', '蘆洲區', '五股區'],
        '基隆市': ['仁愛區', '中正區', '信義區', '中山區', '安樂區', '暖暖區', '七堵區'],
        '桃園市': ['桃園區', '中壢區', '平鎮區', '八德區', '楊梅區', '蘆竹區', '龜山區', '龍潭區', '大溪區', '大園區', '觀音區', '新屋區', '復興區'],
        '新竹縣': ['竹北市', '竹東鎮', '新埔鎮', '關西鎮', '峨眉鄉', '寶山鄉', '北埔鄉', '橫山鄉', '芎林鄉', '湖口鄉', '新豐鄉', '尖石鄉', '五峰鄉'],
        '新竹市': ['東區', '北區', '香山區'],
        '苗栗縣': ['苗栗市', '通霄鎮', '苑裡鎮', '竹南鎮', '頭份鎮', '後龍鎮', '卓蘭鎮', '西湖鄉', '頭屋鄉', '公館鄉', '銅鑼鄉', '三義鄉', '造橋鄉', '三灣鄉', '南庄鄉', '大湖鄉', '獅潭鄉', '泰安鄉'],
        '臺中市': ['中區', '東區', '南區', '西區', '北區', '北屯區', '西屯區', '南屯區', '太平區', '大里區', '霧峰區', '烏日區', '豐原區', '后里區', '東勢區', '石岡區', '新社區', '和平區', '神岡區', '潭子區', '大雅區', '大肚區', '龍井區', '沙鹿區', '梧棲區', '清水區', '大甲區', '外埔區', '大安區'],
        '南投縣': ['南投市', '埔里鎮', '草屯鎮', '竹山鎮', '集集鎮', '名間鄉', '鹿谷鄉', '中寮鄉', '魚池鄉', '國姓鄉', '水里鄉', '信義鄉', '仁愛鄉'],
        '彰化縣': ['彰化市', '員林鎮', '和美鎮', '鹿港鎮', '溪湖鎮', '二林鎮', '田中鎮', '北斗鎮', '花壇鄉', '芬園鄉', '大村鄉', '永靖鄉', '伸港鄉', '線西鄉', '福興鄉', '秀水鄉', '埔心鄉', '埔鹽鄉', '大城鄉', '芳苑鄉', '竹塘鄉', '社頭鄉', '二水鄉', '田尾鄉', '埤頭鄉', '溪州鄉'],
        '雲林縣': ['斗六市', '斗南鎮', '虎尾鎮', '西螺鎮', '土庫鎮', '北港鎮', '莿桐鄉', '林內鄉', '古坑鄉', '大埤鄉', '崙背鄉', '二崙鄉', '麥寮鄉', '臺西鄉', '東勢鄉', '褒忠鄉', '四湖鄉', '口湖鄉', '水林鄉', '元長鄉'],
        '嘉義縣': ['太保市', '朴子市', '布袋鎮', '大林鎮', '民雄鄉', '溪口鄉', '新港鄉', '六腳鄉', '東石鄉', '義竹鄉', '鹿草鄉', '水上鄉', '中埔鄉', '竹崎鄉', '梅山鄉', '番路鄉', '大埔鄉', '阿里山鄉'],
        '嘉義市': ['東區', '西區'],
        '臺南市': ['中西區', '東區', '南區', '北區', '安平區', '安南區', '永康區', '歸仁區', '新化區', '左鎮區', '玉井區', '楠西區', '南化區', '仁德區', '關廟區', '龍崎區', '官田區', '麻豆區', '佳里區', '西港區', '七股區', '將軍區', '學甲區', '北門區', '新營區', '後壁區', '白河區', '東山區', '六甲區', '下營區', '柳營區', '鹽水區', '善化區', '大內區', '山上區', '新市區', '安定區'],
        '高雄市': ['楠梓區', '左營區', '鼓山區', '三民區', '鹽埕區', '前金區', '新興區', '苓雅區', '前鎮區', '小港區', '旗津區', '鳳山區', '大寮區', '鳥松區', '林園區', '仁武區', '大樹區', '大社區', '岡山區', '路竹區', '橋頭區', '梓官區', '彌陀區', '永安區', '燕巢區', '田寮區', '阿蓮區', '茄萣區', '湖內區', '旗山區', '美濃區', '內門區', '杉林區', '甲仙區', '六龜區', '茂林區', '桃源區', '那瑪夏區'],
        '屏東縣': ['屏東市', '潮州鎮', '東港鎮', '恆春鎮', '萬丹鄉', '長治鄉', '麟洛鄉', '九如鄉', '里港鄉', '鹽埔鄉', '高樹鄉', '萬巒鄉', '內埔鄉', '竹田鄉', '新埤鄉', '枋寮鄉', '新園鄉', '崁頂鄉', '林邊鄉', '南州鄉', '佳冬鄉', '琉球鄉', '車城鄉', '滿州鄉', '枋山鄉', '霧台鄉', '瑪家鄉', '泰武鄉', '來義鄉', '春日鄉', '獅子鄉', '牡丹鄉', '三地門鄉'],
        '宜蘭縣': ['宜蘭市', '羅東鎮', '蘇澳鎮', '頭城鎮', '礁溪鄉', '壯圍鄉', '員山鄉', '冬山鄉', '五結鄉', '三星鄉', '大同鄉', '南澳鄉'],
        '花蓮縣': ['花蓮市', '鳳林鎮', '玉里鎮', '新城鄉', '吉安鄉', '壽豐鄉', '秀林鄉', '光復鄉', '豐濱鄉', '瑞穗鄉', '萬榮鄉', '富里鄉', '卓溪鄉'],
        '臺東縣': ['臺東市', '成功鎮', '關山鎮', '長濱鄉', '海端鄉', '池上鄉', '東河鄉', '鹿野鄉', '延平鄉', '卑南鄉', '金峰鄉', '大武鄉', '達仁鄉', '綠島鄉', '蘭嶼鄉', '太麻里鄉'],
        '澎湖縣': ['馬公市', '湖西鄉', '白沙鄉', '西嶼鄉', '望安鄉', '七美鄉'],
        '金門縣': ['金城鎮', '金湖鎮', '金沙鎮', '金寧鄉', '烈嶼鄉', '烏坵鄉'],
        '連江縣': ['南竿鄉', '北竿鄉', '莒光鄉', '東引鄉'],
        '0': []
    }

    const city = document.getElementById("city");
    const districts = document.getElementById("districts");
    // 選擇縣市
    city.addEventListener("change", function(){    
        if(parseInt(city.value) === 0){
            city.classList.add("text-secondary");
        }else{
            city.classList.remove("text-secondary");
        }
        districts.classList.add("text-secondary");
        
        const distList1 = distList[city.value];
        districts.innerHTML= `<option value="0" class="text-secondary">選擇所在地區</option>`;
        for(let dist of distList1){
            districts.insertAdjacentHTML("beforeend", `<option value=${dist} class="text-secondary">${dist}</option>`);   
        }
            
        if(parseInt(districts.value) === 0){
            districts.classList.add("text-secondary");
        }
    });

    // 選擇地區
    districts.addEventListener("change", function(){
        if(parseInt(districts.value) === 0){
            districts.classList.add("text-secondary");
        }else{
            districts.classList.remove("text-secondary");
        }
    });
    
    await fetchData(); // Fetch圖片和票券資料
    showTktimglist();  // 圖片顯示到頁面中(初始顯示頁面)
    showTktlist();     // 票券資料顯示到頁面中(初始顯示頁面)
    
    // 找當前分頁ID
    currentTabId = '#tab-1'; // 初始值為第一個Tab的ID
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => tab.addEventListener("click", function () { 
        currentTabId = this.getAttribute('href'); // 更新當前Tab的ID
    }))
  
    // Modal關閉按鈕
    const closeModals = document.getElementsByClassName("closeModal");
    closeModals.forEach(btn=>btn.addEventListener("click", async function () {
        // 重載資料庫內容&重載畫面
        await fetchData();
        switch (currentTabId) {
            case "#tab-1":
                showTktlist();
                break;
            case "#tab-2":
                showOnTktList();
                break;
            case "#tab-3":
                showRemoveTktList();
                break;
        }
        // if(tktsortList.value != -1){
        //     showTktSortList(tktsortList.value);
        // }

    }))    


});

// Fetch圖片和票券資料
async function fetchData(){
    // 圖片
    await fetch('addtktimglist', {
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
        // console.log(data);
        tktimgs = data;
    })
    .catch(function (error) {
        console.log(error);
    })
    // 票券資料(文字)
    await fetch('addtktlist', {
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
        // console.log(data);
        tkts = data;
    })
    .catch(function (error) {
        console.log(error);
    })
}

// 依票券類型篩選(下拉式選單)
$("#tktsortList").on("change", function () {
    currentTabId = '#tab-1';
    onStatBtn.classList.remove('active');
    removeStatBtn.classList.remove('active');
    allStatBtn.classList.add('active');
    showTktSortList(tktsortList.value);
    
});
// 顯示所有已上架Function
function showTktSortList(tktsortListValue){
    let html = "";
    let count = 0;
    for (let i = 0; i < tkts.length; i++) {
        if(tktsortListValue == tkts[i].tktsort){
            html += htmlList(i);
            count++;
        } else if (tktsortListValue < 0){
            html += htmlList(i);
            count++;
        }                
    }       
    if(count === 0){
        html = `<p class="tkt-list-position">查無此資料</p>`;
    }  
    $("#addtktlist").next().html(html); 
}



// 篩選出每個商品的第一個圖片
function showTktimglist(){
    for (const image of tktimgs) {
        const tktno = image.tktno;    
        // 如果該tktno尚未在firstImages對像中存在，將其添加為第一個圖片
        if (!(tktno in firstImages)) {
            firstImages[tktno] = image.tktimgBase64;
        }
    }
}

// 顯示所有票券(初始顯示頁面)
function showTktlist(){
    let html = "";
    let mark;
    for (let i = 0; i < tkts.length; i++) {
        html += htmlList(i);  
    }    
    $("#addtktlist").next().html(html);
    // document.getElementById("t1").innerHTML = html;
}

// 所有票券按鈕
$("button#alltktList").on("click", function () {
    showTktlist();
});

// 已上架按鈕
$("button#ontktList").on("click", function () {
    showOnTktList();
});
// 顯示所有已上架Function
function showOnTktList(){
    let html = "";
    let count = 0;
    for (let i = 0; i < tkts.length; i++) {
        if(tkts[i].tktstat == 1){
            html += htmlList(i);
            count++; 
        }
    }        
    if(count === 0){
        html = `<p class="tkt-list-position">查無此資料</p>`;
    }  
    $("#addtktlist").next().html(html);
}

// 未上架按鈕
$("button#removetktList").on("click", function () {
    showRemoveTktList();
});
// 顯示所有未上架Function
function showRemoveTktList(){
    let html = "";
    let count = 0;
    for (let i = 0; i < tkts.length; i++) {
        if(tkts[i].tktstat == 0){
            html += htmlList(i);
            count++;                  
        }
    }
    if(count === 0){
        html = `<p class="tkt-list-position">查無此資料</p>`;
    }  
    $("#addtktlist").next().html(html);
}

// HTML程式碼
function htmlList(i){
    mark = tkts[i].tktno;
    let html ="";
    html += `
            <!-- Table data -->
            <div class="row row-cols-xl-7 align-items-lg-center border-bottom g-4 px-2 py-4" id="nextpoint" value="${tkts[i].tktno}">
                <!-- Data item -->
                <div class="col tkt-listname-position">
                    <small class="d-block d-lg-none">標題名稱</small>
                    <div class="d-flex align-items-center">
                        <!-- Image -->
                        <div class="w-80px flex-shrink-0">   
    `;
        if (firstImages[mark] !== undefined) {
            html += `<img class="rounded" src="data:image/jpeg;base64,${firstImages[mark]}" alt="avatar" name="tktimg${tkts[i].tktno}" id="tktimg${tkts[i].tktno}">`;
        } else {
            html += `<img class="rounded" src="../assets/images/DefaultPicture.jpg" alt="avatar" name="tktimg${tkts[i].tktno}" id="tktimg${tkts[i].tktno}">`;
        }
        html += `
                        </div>
                        <!-- Title -->
                        <h6 class="mb-0 ms-2 tkt-list-position" name="title${tkts[i].tktno}" id="title${tkts[i].tktno}">${tkts[i].tktname}</h6>                            
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
                html += `<button type="button" class="btn badge bg-danger bg-opacity-10 text-danger" id="tktstatBtn${tkts[i].tktno}"
                                     onclick="tktstatEdit(${tkts[i].tktno})" value="0">未上架</button>`;
            break;
            case 1:
                html += `<button type="button" class="btn badge bg-success bg-opacity-10 text-success" id="tktstatBtn${tkts[i].tktno}"
                                     onclick="tktstatEdit(${tkts[i].tktno})" value="1">已上架</button>`;
            break;
        }

        html += `
            </div>
            <!-- Data item -->
            <div class="col-1 tkt-list-position tkt-list"><button class="btn btn-sm btn-light mb-0" onclick="PlanType(${tkts[i].tktno})" name="tktplanList" id="tktplanList" value="${tkts[i].tktno}">方案</button></div>

            <!-- Data item -->
            <div class="col-1 tkt-list-position tkt-list">
                <button class="btn btn-sm btn-light mb-0" type="button" data-bs-toggle="modal" data-bs-target="#myModal" onclick="tktDetailsEdit(${tkts[i].tktno})"
                        name="listEdit${tkts[i].tktno}" id="listEdit${tkts[i].tktno}" data-value="${tkts[i].tktno}">修改</button>
            </div>
        </div>
        `;
        
    return html;
}

// 商品狀態按鈕(上/下架)
async function tktstatEdit(tktno){
    const button = document.getElementById("tktstatBtn" + tktno); // 找到按钮
    let tktstat = button.value;

    Swal.fire({
        icon: 'question',
        title: '確定要更改商品狀態?',
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        showCancelButton: true,
    }).then(async function (result) {
        // console.log(result)
        if(result.isConfirmed){
            Swal.fire({
                icon: 'success',
                title: '商品狀態已更改',
            })
            if (tktstat == 1) {
                tktstat = 0;
            } else {
                tktstat = 1;
            }
            // Fetch商品狀態回傳
            await fetch('editTktStat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tktno: tktno,
                    tktstat: tktstat,
                }),
            })
                .then(response => {
                    if (response.ok) {
                        return response.json(); 
                    } else {
                        Swal.fire('更改失敗！');
                        const { status, statusText } = response;
                        throw Error(`${status}: ${statusText}`);
                    }
                })                      
                .then(async function (data) {
                    // console.log(data)
                    // 重載資料庫內容&重載畫面
                    await fetchData();
                    switch (currentTabId) {
                        case "#tab-1":
                            showTktlist();
                            break;
                        case "#tab-2":
                            onStatBtn.classList.remove('active');
                            removeStatBtn.classList.add('active');
                            currentTabId = '#tab-3';
                            showRemoveTktList();
                            break;
                        case "#tab-3":
                            removeStatBtn.classList.remove('active');
                            onStatBtn.classList.add('active'); 
                            currentTabId = '#tab-2';                             
                            showOnTktList();
                            break;
                    }
                })
                .catch(function(error) {
                    console.error('Fetch錯誤：', error);
                    Swal.fire('更改失敗！');
                });
        }
    })
    // let r = confirm("確認更改商品狀態 ?");
    // if(r){
    //     if (tktstat == 1) {
    //         tktstat = 0;
    //     } else {
    //         tktstat = 1;
    //     }
    //     // Fetch商品狀態回傳
    //     await fetch('editTktStat', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             tktno: tktno,
    //             tktstat: tktstat,
    //         }),
    //     })
    //         .then(response => {
    //             if (response.ok) {
    //                 return response.json(); 
    //             } else {
    //                 alert("更改失敗！");
    //                 const { status, statusText } = response;
    //                 throw Error(`${status}: ${statusText}`);
    //             }
    //         })                      
    //         .then(async function (data) {
    //             // console.log(data)
    //             // 重載資料庫內容&重載畫面
    //             await fetchData();
    //             switch (currentTabId) {
    //                 case "#tab-1":
    //                     showTktlist();
    //                     break;
    //                 case "#tab-2":
    //                     onStatBtn.classList.remove('active');
    //                     removeStatBtn.classList.add('active');
    //                     currentTabId = '#tab-3';
    //                     showRemoveTktList();
    //                     break;
    //                 case "#tab-3":
    //                     removeStatBtn.classList.remove('active');
    //                     onStatBtn.classList.add('active'); 
    //                     currentTabId = '#tab-2';                             
    //                     showOnTktList();
    //                     break;
    //             }
    //         })
    //         .catch(function(error) {
    //             console.error('Fetch錯誤：', error);
    //             alert("更改失敗！");
    //         });
    // }
    
}

// Modal (回傳Tktno，取得該商品的詳細內容)
function tktDetailsEdit(tktno){    

    // 清空表單值
    document.getElementById('tktname').value = '';
    document.getElementById('tktsort').value = '-1';
    startDatePicker.clear();
    endDatePicker.clear();
    document.getElementById('tktinstruction').value = '';
    document.getElementById('location').value = '';
    document.getElementById('city').value = 0;
    document.getElementById('districts').innerHTML = '<option value="0">選擇所在地區</option>';
    document.getElementById('address').value = '';
    document.getElementById('schowarrival').value = '';
    document.getElementById('scservicehr').value = '';
    const proddescEditor = document.getElementById('proddesc');
    proddescEditor.querySelector('div').innerHTML = '';
    const noticeEditor = document.getElementById('notice');
    noticeEditor.querySelector('div').innerHTML = '';
    const howuseEditor = document.getElementById('howuse');
    howuseEditor.querySelector('div').innerHTML = '';

    // 回傳Tktno，取得該商品的詳細內容
    fetch('tktDetail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },    
        body: JSON.stringify({
            tktno: tktno,            
        }),    
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            const { status, statusText } = response;
            throw Error(`${status}: ${statusText}`);
        }
    })
    .then(function (tktDetial) {
        // console.log(tktDetial);
        
        // 票券編號
        document.getElementById('tktno').value = tktno;
        // 標題名稱
        document.getElementById('tktname').value = tktDetial.tktname;
        // 商品類型
        document.getElementById('tktsort').value = tktDetial.tktsort;
        // 設定開始日期的選定日期
        startDatePicker.setDate(tktDetial.tktstartdate);
        // 設定結束日期不可以早於開始日期(設置結束日期選擇器的minDate為開始日期)
        endDatePicker.set("minDate", tktDetial.tktstartdate);
        // 設定結束日期的選定日期
        endDatePicker.setDate(tktDetial.tktenddate);
        // 商品簡介 (去掉<br>標籤並設置值)
        let formattedText = tktDetial.tktinstruction.replace(/<br>/g, '\n').replace(/\n{2}/g, '\n');
        document.getElementById('tktinstruction').value = formattedText;
        // 景點名稱
        document.getElementById('location').value = tktDetial.location;
        // 縣市
        document.getElementById('city').value = tktDetial.city;
        // 鄉鎮市區
        const districts = document.getElementById("districts");
        const distList1 = distList[tktDetial.city];
        for(let dist of distList1){
            districts.insertAdjacentHTML("beforeend", `<option value=${dist} class="text-secondary">${dist}</option>`);   
        }
        districts.value = tktDetial.districts;
        // 地址
        document.getElementById('address').value = tktDetial.address;
        // 景點如何抵達 (去掉<br>標籤並設置值)
        formattedText = tktDetial.schowarrival.replace(/<br>/g, '\n').replace(/\n{2}/g, '\n');
        document.getElementById('schowarrival').value = formattedText;
        // 景點開放時間 (去掉<br>標籤並設置值)
        formattedText = tktDetial.scservicehr.replace(/<br>/g, '\n').replace(/\n{2}/g, '\n');
        document.getElementById('scservicehr').value = formattedText;
        // 景點介紹
        // const proddescEditor = document.getElementById('proddesc');
        proddescEditor.querySelector('div').innerHTML = tktDetial.proddesc;
        // 購買須知
        // const noticeEditor = document.getElementById('notice');
        noticeEditor.querySelector('div').innerHTML = tktDetial.notice;
        // 如何使用
        // const howuseEditor = document.getElementById('howuse');
        howuseEditor.querySelector('div').innerHTML = tktDetial.howuse;
    })
    .catch(function (error) {
        console.log(error);
    })

}

// 點擊方案，回傳值到另一個HTML檔
function PlanType(tktno){
    // 票券編號
    const buttonValue = tktno;
    // 圖片
    const imgElement = document.getElementById("tktimg"+tktno);
    const imgSrc = imgElement.getAttribute('src');
    // 標題名稱
    const titleElement = document.getElementById("title"+tktno);
    const titleText = titleElement.textContent;

    const dataToStore = {
        buttonValue: buttonValue,
        imgSrc: imgSrc,
        titleText: titleText,            
    };    
    sessionStorage.setItem("myData", JSON.stringify(dataToStore));
    window.location.href='tkt-admin-detail.html';
}


