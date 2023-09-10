document.addEventListener("DOMContentLoaded", function () {
    const storePics = document.getElementsByClassName("store-pic");
    function storename() {
        document.getElementById("storename1").textContent = sessionStorage.getItem("storeName");
        for (let storePic of storePics) {
            const picBase64Url = sessionStorage.getItem("storePicBase64");
            storePic.setAttribute("src", "data:image/jpeg;base64," + picBase64Url);
        }
    }
    storename();

    const bt = document.getElementById("sent");

    var planpic = [];

    const inpics = document.getElementById("pkgpics");
    fetch("/flyday/pkgpic/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            pkgNo: sessionStorage.getItem("pkgNo")
        })
    }).then(resp => resp.json())
        .then(datas => {
            datas.forEach(data => {
                inpics.innerHTML +=
                    `<div class="col-xl-2 col-md-4 col-sm-6 dz-processing dz-success dz-complete dz-image-preview">
        <div class="card p-2 mb-0 shadow-none border position-relative h-100">
            <!-- Image -->
            <img data-dz-thumbnail src="${data.pkgImg}" class="rounded bg-light" alt="">
                <!-- info -->
                <div class="mt-2">
                    <a href="javascript:void(0);" class="text-muted fw-bold"
                        data-dz-name></a>
                    <p class="mb-0 small" data-dz-size></p>
                </div>
                <!-- Close btn -->
                <div class="position-absolute top-0 start-100 translate-middle">
                    <a href="#!" class="btn btn-danger rounded-circle icon-sm p-0"
                        data-dz-remove onclick="removeParentDiv(this)">
                        <i class="fas fa-times"></i>
                    </a>
                </div>
        </div>
    </div>`
                planpic.push(data.pkgPicNo);
            });

        })
    

    bt.addEventListener("click", async function () {
        await Promise.all(
            planpic.map(async (planno) => {
                await fetch("/flyday/pkgpic/remove", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        pkgPicNo: planno
                    })
                });
            })
        );
        
        const onepic = inpics.querySelectorAll("img");
        const onepicarray = Array.from(onepic);
        const picarrry = [];
        for (let pic of onepicarray) {
            const srcValue = pic.getAttribute("src");
            picarrry.push(srcValue);
        };
        const uploadPromises = picarrry.map(async (element) => {
            const picResponse = await fetch("/flyday/pkgpic/add", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    pkgNo: sessionStorage.getItem("pkgNo"),
                    pkgImg: element
                })
            })
            if (!picResponse.ok) {
                throw new Error("上傳圖片時發生錯誤");
            }
        });
        await Promise.all(uploadPromises);
        window.location.href = "test-account-wishlist.html";
        



    })


})

// 定義 removeParentDiv 函數
function removeParentDiv(element) {
    // 獲取 <a> 標籤的父元素的父元素的父元素 (即 <div> 標籤)
    const parentDiv = element.parentNode.parentNode.parentNode;

    // 從父元素中刪除整個 <div> 標籤
    parentDiv.remove();
}