

$.ajax({
    url: 'SelectGroup', //請求動態網址
    contentType: 'application/json; charset=UTF-8',
    data: {}, //請求獲取全部無參數
    dataType: "json",
    success: function (data) {
        // 綁定tableId，使用 jQuery Table 來動態生成表格
        $('#tableAjax').DataTable({
            //抓取請求的資料
            data: data,
            //搜尋欄位是否開啟及設定
            searchDelay: 500,
            //資料欄位區塊(columns)
            columns: [
                { data: 'rpgroupno' },               // targets[0]
                { data: 'memno' },            // targets[1]
                { data: 'actno' },            // targets[2]
                { data: 'rpgroupreason' },      // targets[3]
                { data: 'rpgroupcontent' },  // targets[4]
                { data: 'rpgrouptimestamp' },  // targets[5]
                { data: 'rpgroupstatus' },  // targets[6]
                { data: 'empno' },  // targets[7]
                { data: 'rpgroupdonetime' },  // targets[8]
                { data: 'rpgroupnote' },  // targets[9]
                { data: null }                  // targets[10] 操作欄位
            ],
            // 欄位元素定義區塊(columnDefs)，依需求決定內容可加可不加。
            columnDefs: [
                {
                    //調整th:qaId欄位的寬度
                    targets: [0],
                    width: "50px"
                }, {
                    targets: [1],

                }, {
                    targets: [2],

                }, {
                    targets: [3],
                    render: function (data) {

                        switch (data) {
                            case 0:
                                return '活動內容與標題不符'
                            case 1:
                                return '言論違反善良風俗'
                            case 2:
                                return '騷擾行為'
                            case 3:
                                return '其他'
                        }

                    }
                }, {
                    targets: [6],
                    render: function (data) {

                        switch (data) {
                            case 0:
                                return '未處理'
                            case 1:
                                return '通過'
                            case 2:
                                return '不通過'
                        }

                    }
                }, {
                    targets: [10],
                    render: (data, type, row) => {
                        $(document).on('click', `.proces${row.rpgroupno}`, () => {

                            const swalWithBootstrapButtons = Swal.mixin({
                                customClass: {
                                    confirmButton: 'btn btn-success',
                                    cancelButton: 'btn btn-danger'
                                },
                                buttonsStyling: false
                            })

                            swalWithBootstrapButtons.fire({
                                title: 'Are you sure?',
                                html: `<label class="form-label act">員工編號</label>
                                <input class="form-control" type="text"id="empno" placeholder="請填寫員工編號">
                                <label class="form-label act">處理狀態</label>
                                <select class="form-select js-choice" id="select1">
                                <option value="0" disabled="disabled" >未處理</option>
                                <option value="1">通過</option>
                                <option value="2">不通過</option>
                                </select>
                                <label class="form-label act">註記</label>
                                <textarea class="form-control" rows="5" id="note">${row.rpgroupnote}</textarea>`,
                                showCancelButton: true,
                                confirmButtonText: '確定',
                                cancelButtonText: '取消',
                                reverseButtons: true
                            }).then((result) => {
                                const empno = document.querySelector(`#empno`).value;
                                const select1 = document.querySelector(`#select1`).value;
                                const note = document.querySelector(`#note`).value;
                                if (result.isConfirmed) {
                                    fetch('proces', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            rpgroupno: row.rpgroupno,
                                            empno: empno,
                                            rpgroupstatus: select1,
                                            rpgroupnote: note,
                                            rpgroupdonetime: new Date()

                                        })
                                    })
                                        .then(resp => resp.json())
                                        .then(body => {
                                            const { successful, message } = body;
                                            if (successful) {
                                                swalWithBootstrapButtons.fire(
                                                    '修改成功'
                                                ).then(function () {
                                                    location.reload();
                                                })
                                            } else {
                                                alert(message ?? '存檔失敗');
                                            }
                                        });

                                } else if (
                                    /* Read more about handling dismissals below */
                                    result.dismiss === Swal.DismissReason.cancel
                                ) {
                                    swalWithBootstrapButtons.fire(
                                        '已取消',
                                    )
                                }
                            })
                        })

                        return `<button type="button" class="btn btn-danger btn-sm proces${row.rpgroupno}">處理</button>`
                    }

                }, {
                    //將全部欄位的字置中。
                    targets: '_all',
                    className: 'text-center'
                }
            ],
            //語言區塊:將預設英文配置改成中文顯示。
            language: {
                url: "https://cdn.datatables.net/plug-ins/1.11.3/i18n/zh_Hant.json"
            }
        });
    },
    error: function () {
        alert('Failed to fetch data from server.');
    }
});
