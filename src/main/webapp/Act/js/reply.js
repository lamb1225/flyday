$(function () {
    $("input.task_name").on("focus", function () {
        // console.log("aaa");
        $(this).closest("div.task_add_block").addClass("-on");
    });
    $("input.task_name").on("blur", function () {
        // console.log("bbb");
        $(this).closest("div.task_add_block").removeClass("-on");
    });

    $("input.task_name").on("keyup", function (e) {
        //Entet鍵為13，到退鍵為8。
        if (e.which == 13) {
            $("button.task_add").click();
        }
    });
    $("button.task_add").on("click", function () {
        let task_text = ($("input.task_name").val()).trim();
        if (task_text !== "") {
            let list_html = `<li>
        <div class="item_flex">
          <div class="left_block">
            <div class="btn_flex">
              <label type="button" class="btn_up"><h1>username</h1></label>
            </div>
          </div>
          <div class="middle_block">
            <p class="para">${task_text}</p>
            <input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${task_text}">
          </div>
          <div class="right_block">
            <div class="btn_flex">
              <button type="button" class="btn_update">更新</button>
              <button type="button" class="btn_delete">移除</button>
            </div>
          </div>
        </div>
      </li>`;
            $("ul.task_list").prepend(list_html);
            $("input.task_name").val("");
        }
    });
    $(document).on("click", "button.btn_delete", function () {
        let r = confirm("確認移除?");
        if (r) {
            $(this).closest("li").animate({
                "opacity": 0
            }, 1000, "swing", function () {

                $(this).remove();
            });
        }


    });
    $("button.btn_empty").on("click", function () {

        let r = confirm("確認清空?");
        if (r) {
            $("ul.task_list").children("li").animate({
                "opacity": 0
            }, 1000, "swing", function () {

                $(this).remove();
            });
        }
    });
    //更新代辦事項==============================================================================
    $(document).on("click", "button.btn_update", function () {
        if ($(this).attr("adta-edit") == undefined) {
            $(this).attr("adta-edit", true);
            $(this).closest("li").find("p.para").toggleClass("-none");
            $(this).closest("li").find("input.task_name_update").toggleClass("-none");
        } else {
            let update_task = ($(this).closest("li").find("input.task_name_update").val()).trim();
            if (update_task == "") {
                alert("請輸入代辦事項");
            } else {
                $(this).closest("li").find("p.para").html(update_task).toggleClass("-none");
                $(this).closest("li").find("input.task_name_update").val(update_task).toggleClass("-none");
                $(this).removeAttr("data-edit");
            }
        }
        // $(this).closest("li").find("input.task_name_update").toggleClass("-none");
        // $(this).closest("li").find("input.para").toggleClass("-none");
        // let input_p = $(this).closest("li").find("input.para");
        // let input_up = $(this).closest("li").find("input.task_name_update")
        // if (input_up !== "") {
        //     input_up.hasClass("-none");
        //     input_p.hasClass("nonne");
        //     input_p.text(input_up.val);
        // } else {
        //     input_up.val(input_p.text());
        // }

    });

    $("ul.task_list").on("click", "button.btn_up , button.btn_down", function () {
        let li_el = $(this).closest("li").clone();
        if ($(this).hasClass("btn_up") && !$(this).closest("li").is(':first-child')) {
            let li_el = $(this).closest("li").clone();
            $(this).closest("li").prev().before(li_el);
            $(this).closest("li").remove();
        }
        if ($(this).hasClass("btn_down") && !$(this).closest("li").is(':last-child')) {
            let li_el = $(this).closest("li").clone();
            $(this).closest("li").next().after(li_el);
            $(this).closest("li").remove();
        }
    });

    // $("button.btn_up").on("click", function () {

    //     let li_el = $(this).closest("li").clone();
    //     $(this).closest("li").prev().before(li_el);
    //     $(this).closest("li").remove();

    // });
    // $("button.btn_down").on("click", function () {
    //     let li_el = $(this).closest("li").clone();
    //     $(this).closest("li").next().after(li_el);
    //     $(this).closest("li").remove();


    // });

    $("ul.task_list").on("click", "span.star", function (e) {
        let current_str = parseInt($(this).attr("data-star"));
        $(this).closest("div.star_block").find("span.star").each(function (i, item) {
            if (parseInt($(this).attr("data-star")) <= current_str) {
                $(this).addClass("-on");
            } else {
                $(this).removeClass("-on");
            }
        });

    });
});
