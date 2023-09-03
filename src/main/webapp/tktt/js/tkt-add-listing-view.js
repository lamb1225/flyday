$(function () {

    // 新增方案
    $("button#btn_add_plan").on("click", function () {
        // console.log("aaa");
        // console.log(parseInt($("#add_planlist_point").prev().attr("value")));
        let plan_number = parseInt($("#add_planlist_point").prev().attr("value")) + 1;
        // console.log(plan_number);

        let plan_list =`
            <!-- Ticket Plans START -->
            <div class="card shadow" id="plan${plan_number}" value="${plan_number}">
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
                        <div class="col-md-6">
                            <label class="form-label">方案名稱 *</label>&ensp;<small class="tkt-error-color" name="plannameMsgs" id="plannameMsgs"></small>
                            <input type="text" class="form-control" name="planname" id="planname" placeholder="輸入名稱">
                        </div>										

                        <!-- Plan Status -->
                        <div class="col-md-6">
                            <label class="form-label">方案狀態 *</label>
                            <div class="d-flex">
                                <!-- Radio -->
                                <div class="form-check radio-bg-light me-4">
                                    <input class="form-check-input" type="radio" name="planstat${plan_number}" id="planstatRadio0" value="0" checked>
                                    <label class="form-check-label" for="planstatRadio0">
                                        上架
                                    </label>
                                </div>
                                <!-- Radio -->
                                <div class="form-check radio-bg-light me-4">
                                    <input class="form-check-input" type="radio" name="planstat${plan_number}" id="planstatRadio1" value="1">
                                    <label class="form-check-label" for="planstatRadio1">
                                        保留但不上架
                                    </label>
                                </div>												
                            </div>
                        </div>                                                          

                        <!-- Plan Content -->												
                        <div class="col-12">
                            <label class="form-label">方案內容 *</label>&ensp;<small name="plancontentMsgs" id="plancontentMsgs"></small>
                            <textarea class="form-control" rows="2" name="plancontent" id="plancontent" placeholder="描述方案內容"></textarea>
                        </div>
                        
                        <div class="border-bottom"></div>										
                        
                        <!-- Ticket Type -->
                        <div class="col-md-5 tkt-add-label-width">
                            <label class="form-label">票種 *</label>
                            <input type="text" class="form-control" placeholder="輸入票種 例：每人、成人票、學生票...">
                        </div>

                        <!-- Room Price -->
                        <div class="col-md-5 tkt-add-label-width" value="1">
                            <label class="form-label">票種價格 ( 台幣 ) *</label>																										
                            <input type="text" class="form-control" placeholder="輸入價格">													
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
                    <label class="form-label">票種 *</label>
                    <input type="text" class="form-control" placeholder="輸入票種 例：每人、成人票、學生票...">
                </div>

                <!-- Room Price -->
                <div class="col-md-5 tkt-add-label-width">
                    <label class="form-label">票種價格 ( 台幣 ) *</label>																										
                    <input type="text" class="form-control" placeholder="輸入價格">													
                </div>

                <!-- Delete Button -->
                <div class="tkt-add-div-width" value="${type_number}">
                    <button type="button" class="btn btn-sm btn-primary-soft mb-0 w-100 tkt-add-btn-right" id="btn_del_type${type_number}" value="${type_number}"><i class="bi bi-trash fa-fw"></i>刪除</button>
                </div>            
        `
        $("button#" + $(this).attr("id")).parent().before(type_list);
        // console.log("aaa");
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