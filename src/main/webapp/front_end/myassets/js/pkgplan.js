

document.addEventListener("DOMContentLoaded", function () {
    //顯示所有方案
    fetch('/flyday/pkgplan/selectpkgno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pkgNo: sessionStorage.getItem("pkgNo") })
    }).then(function (resp) {
        return resp.json()
        console.log("ddd");
    }).then(function (data) {
        console.log("vfvd");
        console.log(data.length);
       

        let html = '';
        for (let i = 0; i < data.length; i++) {
        console.log("hihi");
        
            html += `
        <tr>
        <td>${data[i].pkgPlanNo}</td>
        <td>${data[i].pkgPlanTitle}</td>
        <td>${data[i].pkgPlanContent}</td>
        <td>${data[i].pkgPlanNum}</td>
        <td>${data[i].pkgGroupMoney}</td>
        <td>${data[i].pkgPlanReview}</td>
  
`;
        }
        pkgplans.innerHtml = html;
    })
});