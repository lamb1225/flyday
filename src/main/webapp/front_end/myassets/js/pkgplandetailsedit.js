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

    const start = document.getElementById("start");
    const endtime = document.getElementById("endtime");
    const maxnum = document.getElementById("maxnum");
    const price = document.getElementById("price");


    fetch("/flyday/pkgplandetails/selectpkgplandetailsno", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pkgDetailsNo: sessionStorage.getItem("pkgDetailsNo") })
    }).then(resp => resp.json())
        .then(data => {
            start.value = data.pkgDayStart;
            endtime.value = data.pkgDayEnd;
            maxnum.value = data.pkgPeopleMax;
            price.value = data.pkgPrice;
        })

    const bt = document.getElementById("sent");



    bt.addEventListener("click", function () {
        fetch("/flyday/pkgplandetails/edit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                pkgDetailsNo: sessionStorage.getItem("pkgDetailsNo"),
                pkgPlanNo: sessionStorage.getItem("pkgPlanNo"),
                pkgDayStart: start.value,
                pkgDayEnd: endtime.value,
                pkgPeopleMax: maxnum.value,
                pkgPrice: price.value
            })
        })
        window.location.href = "plandetailslist.html";
    });
    

})
