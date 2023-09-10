document.addEventListener("DOMContentLoaded",async function () {

    const storePics = document.getElementsByClassName("store-pic");
    function storename() {
        document.getElementById("storename1").textContent = sessionStorage.getItem("storeName");
        document.getElementById("storename2").textContent = sessionStorage.getItem("storeName");
        for (let storePic of storePics) {
            const picBase64Url = sessionStorage.getItem("storePicBase64");
            storePic.setAttribute("src", "data:image/jpeg;base64," + picBase64Url);
        }
    }

    storename();
    
    const img = document.getElementById("pkgimg");
    const pkgname = document.getElementById("pkgname");
    const pkgplace = document.getElementById("pkgPlace");
    
    await fetch("/flyday/pkg/selectpkgno", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pkgNo: sessionStorage.getItem("pkgNo") })
    }).then(function(response){
        return response.json();
    }).then(data => {
        img.setAttribute("src", "data:image/jpeg;base64," + data.pkgPicBase64);
        pkgname.textContent = data.pkgName;
        pkgplace.textContent = data.pkgAddress;
    });


    const pkgplan = document.getElementById("pkgplan");
    const pkgplandetailslist = document.getElementById("pkgplandetailslist");

    await fetch("/flyday/pkgplan/selectpkgplanno", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            pkgPlanNo: sessionStorage.getItem("pkgPlanNo")
        })
    }).then(resp => resp.json())
    .then(data =>{
        pkgplan.textContent = "方案:"+data.pkgPlanTitle;
    })

    await fetch("/flyday/pkgplandetails/selectpkgplanno",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            pkgPlanNo: sessionStorage.getItem("pkgPlanNo")
        })
    }).then(resp => resp.json())
    .then(data =>{
        data.forEach(datas => {
            pkgplandetailslist.innerHTML +=
            `<div class="card shadow p-2">
<div class="row g-0">
    <!-- Card body -->
    <div class="col-md-9">
        <div class="card-body d-flex flex-column h-100 py-md-2">
            <!-- Title -->
            <h5 class="card-title mb-1"><a>${datas.pkgDayStart}</a></h5>
            <small>截止日期:${datas.pkgDayEnd}</small>
            <div><small>人數上限:${datas.pkgPeopleMax}</small></div>
            <!-- Price and Button -->
            <div class="d-sm-flex justify-content-sm-between align-items-center mt-3 mt-md-auto">
                <!-- Price -->
                <div class="d-flex align-items-center">
                    <h5 class="fw-bold mb-0 me-1">$${datas.pkgPrice}</h5>

                </div>
                <div class="mt-3 mt-sm-0">
                    <a class="btn btn-sm btn-dark w-100 mb-0" onclick="edit(${datas.pkgDetailsNo})">修改</a>
                </div>
            </div>
        </div>
    </div>
</div>
</div>`
        });
        
    })
})
function edit(pkgDetailsNo){
    sessionStorage.setItem("pkgDetailsNo", pkgDetailsNo);
    location = "pkgplandetailsedit.html";
}
    
