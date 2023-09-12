

$.ajax({
    url: 'select', //請求動態網址
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
                { data: 'actno' },               // targets[0]
                { data: 'memno' },            // targets[1]
                { data: 'acttitle' },            // targets[2]
                { data: 'actcurrentcount' },      // targets[3]
                { data: 'actstatus' },  // targets[4]
                { data: null }                  // targets[5] 操作欄位
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
                    targets: [4],
                    render: function (data) {

                        switch (data) {
                            case 0:
                                return '揪團中'
                            case 1:
                                return '已成團'
                            case 2:
                                return '已取消'
                        }

                    }
                }, {
                    targets: [5],
                    render: (data, type, row) => {
                        $(document).on("click", `.dels${row.actno}`, () => {
                            const swalWithBootstrapButtons = Swal.mixin({
                                customClass: {
                                    confirmButton: 'btn btn-success',
                                    cancelButton: 'btn btn-danger'
                                },
                                buttonsStyling: false
                            })

                            swalWithBootstrapButtons.fire({
                                title: '你確定要刪除嗎?',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonText: '確定!',
                                cancelButtonText: '取消',
                                reverseButtons: true
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    let act;
                                    fetch('joinid', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ actno: row.actno })
                                    })
                                        .then(resp => resp.json())
                                        .then(body => {
                                            if (body.length > 0) {
                                                $(body).each((index, acts) => {
                                                    act = acts.actno;
                                                    fetch('removejoin', {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({
                                                            actno: acts.actno,
                                                            memno: acts.memno
                                                        })
                                                    }).then(resp => resp.json())
                                                        .then(body => {
                                                            if (body.successful) {
                                                                fetch('remove', {
                                                                    method: 'POST',
                                                                    headers: { 'Content-Type': 'application/json' },
                                                                    body: JSON.stringify({ actno: act })
                                                                })
                                                                    .then(resp => resp.json())
                                                                    .then(body => {
                                                                        if (body.successful) {
                                                                            swalWithBootstrapButtons.fire(
                                                                                '已刪除!'

                                                                            ).then(() => {

                                                                                location.reload();
                                                                            })

                                                                        }
                                                                    });
                                                            }
                                                        })


                                                })
                                            }else{
                                                fetch('remove', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ actno: row.actno })
                                                })
                                                    .then(resp => resp.json())
                                                    .then(body => {
                                                        if (body.successful) {
            
                                                            swalWithBootstrapButtons.fire(
                                                                '已刪除!'
            
                                                            ).then(() => {
            
                                                                location.reload();
                                                            })
                                                        }
                                                    });
                                            }
                                        })
                                } else if (
                                    /* Read more about handling dismissals below */
                                    result.dismiss === Swal.DismissReason.cancel
                                ) {
                                    swalWithBootstrapButtons.fire(
                                        '已取消'

                                    )
                                }
                            })

                        })
                       

                        return `<button type="button" class="btn btn-danger btn-sm dels${row.actno}">刪除揪團</button>` +
                            `<button type="button" class="btn btn-danger btn-sm del${row.actno}">刪除無成員揪團</button>`
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
