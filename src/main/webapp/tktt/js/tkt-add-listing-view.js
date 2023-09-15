document.addEventListener("DOMContentLoaded", function () {
    // 所有 * 都變紅色
    document.querySelectorAll('label, h5').forEach(function(element) {
        element.innerHTML = element.innerHTML.replace(/\*/g, '<span style="color: red;">*</span>');
    });

    // 初始化開始日期設定
    flatpickr("#tktstartdate", {
        dateFormat: "Y-m-d", // 日期格式
        minDate: "today",    // 最小日期是今天
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

    // 動態生成地區下拉式選單
    const distList = {
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

    // 新增方案
    $("button#btn_add_plan").on("click", function () {
        // console.log("aaa");
        // console.log(parseInt($("#add_planlist_point").prev().attr("value")));
        let plan_number = parseInt($("#add_planlist_point").prev().attr("value")) + 1;
        // console.log(plan_number);

        let plan_list =`
            <!-- Ticket Plans START -->
            <div class="card shadow" name="planpoint" id="plan${plan_number}" value="${plan_number}">
                <!-- Card body START -->
                <div class="card-body">
                    <div class="row g-4">

                        <!-- Plan Title and Remove-->
                        <div class="d-flex justify-content-between align-items-center mt-md-3">
                            <div class="d-flex align-items-center">
                                <h6 class="fw-bold mb-0 me-1">方案 ${plan_number}</h6>
                            </div>
                            <div class="mt-3 mt-sm-0">
                                <button type="button" class="btn btn-sm btn-primary-soft mb-0 w-100" id="btn_del_plan${plan_number}" value="${plan_number}"><i class="bi bi-trash fa-fw"></i>刪除方案</button>
                            </div>
                        </div>

                        <!-- Plan name -->
                        <div class="col-md-5 tkt-add-label-width">
                            <label class="form-label">方案名稱 *</label>&ensp;<small class="tkt-error-color" name="plannameMsgs" id="plannameMsgs"></small>
                            <input type="text" class="form-control" name="planname" id="planname" placeholder="輸入名稱">
                        </div>										

                        <!-- Plan Status -->
                        <div class="col-md-5 tkt-add-label-width">
                            <label class="form-label">方案狀態 *</label>
                            <div class="d-flex">
                                <!-- Radio -->
                                <div class="form-check radio-bg-light me-4">
                                    <input class="form-check-input" type="radio" name="planstat${plan_number}" id="planstatRadio" value="1" checked>
                                    <label class="form-check-label" for="planstatRadio0">
                                        上架
                                    </label>
                                </div>
                                <!-- Radio -->
                                <div class="form-check radio-bg-light me-4">
                                    <input class="form-check-input" type="radio" name="planstat${plan_number}" id="planstatRadio" value="0">
                                    <label class="form-check-label" for="planstatRadio1">
                                        保留但不上架
                                    </label>
                                </div>												
                            </div>
                        </div>                                                          

                        <!-- Plan Content -->												
                        <div class="col-12">
                            <label class="form-label">方案內容 *</label>&ensp;<small class="tkt-error-color" name="plancontentMsgs" id="plancontentMsgs"></small>
                            <textarea class="form-control" rows="2" name="plancontent" id="plancontent" placeholder="描述方案內容"></textarea>
                        </div>
                        
                        <div class="border-bottom"></div>										
                        
                        <!-- Ticket Type -->
                        <div class="col-md-5 tkt-add-label-width">
                            <label class="form-label">票種 *</label>&ensp;<small class="tkt-error-color" name="tkttypeMsgs" id="tkttypeMsgs"></small>
                            <input type="text" class="form-control" name="tkttype" id="tkttype" placeholder="例：每人、成人票、學生票...">
                        </div>

                        <!-- Room Price -->
                        <div class="col-md-5 tkt-add-label-width" value="1">
                            <label class="form-label">票價 ( 台幣 ) *</label>&ensp;<small class="tkt-error-color" name="priceMsgs" id="priceMsgs"></small>																										
                            <input type="text" class="form-control" name="price" id="price" placeholder="輸入價格">													
                        </div>

                        
                        <!-- Add Type Button -->
                        <div class="col-12">
							<button type="button" class="btn btn-sm btn-primary-soft mb-0" id="btn_add_type${plan_number}" value="${plan_number}"><i class="bi bi-plus-circle me-2"></i>新增票種</button>													
						</div>
                    </div>
                </div>
                <!-- Card body END -->
            </div>	
            <!-- Ticket Plans END -->
        `
        $("div#add_planlist_point").before(plan_list);

        // 所有 * 都變紅色
        document.querySelectorAll('label').forEach(function(element) {
            element.innerHTML = element.innerHTML.replace(/\*/g, '<span style="color: red;">*</span>');
        });
        
    });


    // 新增票種
    $("div#unite_point").on("click", "button[class='btn btn-sm btn-primary-soft mb-0']", function () {
        // console.log($(this).attr("value"));
        // console.log($(this).attr("id").substr(12));
        // console.log($(this).attr("id"));
        // console.log(parseInt($(this).parent().prev().attr("value")));

        let type_number = parseInt($(this).parent().prev().attr("value")) + 1;

        if($(this).attr("value") == $(this).attr("id").substr(12)){
            let type_list =`
                <!-- Ticket Type -->
                <div class="col-md-5 tkt-add-label-width">
                    <label class="form-label">票種 *</label>&ensp;<small class="tkt-error-color" name="tkttypeMsgs" id="tkttypeMsgs"></small>
                    <input type="text" class="form-control" name="tkttype" id="tkttype" placeholder="例：每人、成人票、學生票...">
                </div>

                <!-- Room Price -->
                <div class="col-md-5 tkt-add-label-width">
                    <label class="form-label">票價 ( 台幣 ) *</label>&ensp;<small class="tkt-error-color" name="priceMsgs" id="priceMsgs"></small>																										
                    <input type="text" class="form-control" name="price" id="price" placeholder="輸入價格">													
                </div>

                <!-- Delete Button -->
                <div class="tkt-add-div-width" value="${type_number}">
                    <button type="button" class="btn btn-sm btn-primary-soft mb-0 w-100 tkt-add-btn-right" id="btn_del_type${type_number}" value="${type_number}"><i class="bi bi-trash fa-fw"></i>刪除</button>
                </div>            
        `
            $("button#" + $(this).attr("id")).parent().before(type_list);

            // 所有 * 都變紅色
            document.querySelectorAll('label').forEach(function(element) {
                element.innerHTML = element.innerHTML.replace(/\*/g, '<span style="color: red;">*</span>');
            });

        } 
    });


    // 刪除方案
    $("div#unite_point").on("click", "button[class='btn btn-sm btn-primary-soft mb-0 w-100']", function () {
        // console.log("aaa");
        // console.log($(this).attr("value"));
        // console.log($(this).attr("id").substr(12));

        if($(this).attr("value") == $(this).attr("id").substr(12)){
            // console.log("bbb");
            // console.log($(this).parents("div").find("div#plan"+$(this).attr("value")).attr("id"));
            let r = confirm("確認刪除此 方案"+$(this).attr("value")+" ?");
            if (r) {
                $(this).parents("div").find("div#plan"+$(this).attr("value")).animate({
                    "opacity": 0
                }, 250, "swing", function () {
                    // console.log(this);
                    $(this).remove();
                });
            }
        }
    });


     // 刪除票種
     $("div#unite_point").on("click", "button[class='btn btn-sm btn-primary-soft mb-0 w-100 tkt-add-btn-right']", function () {
        // console.log("aaa");
        // console.log($(this).attr("value"));
        // console.log($(this).attr("id").substr(12));

        if($(this).attr("value") == $(this).attr("id").substr(12)){
            // console.log("kkk");
            // console.log($(this).closest("div").prev().attr("class"));
            let r = confirm("確認刪除此行 票種 和 價格 ?");
            if (r) {
                $(this).closest("div").prev().prev().animate({
                    "opacity": 0
                }, 250, "swing", function () {
                    // console.log(this);
                    $(this).remove();
                });
                $(this).closest("div").prev().animate({
                    "opacity": 0
                }, 250, "swing", function () {
                    // console.log(this);
                    $(this).remove();
                });
                $(this).closest("div").animate({
                    "opacity": 0
                }, 250, "swing", function () {
                    // console.log(this);
                    $(this).remove();
                });                
            }
        }
    });

});