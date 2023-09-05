(() => {
    const selectbtn = document.querySelector('#selectbtn');
    const msg = document.querySelector('#msg');
   

    selectbtn.addEventListener('click', function () {
        console.log("sss");

        fetch('/flyday/pkg/PkgCoupFindall', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }).then(function (response) {
            return response.json();
        }).then(data => {
            console.log("ya");
            console.log(data.pkgCoupName);
          	msg.textContent='';

            let html = '';
            for (let i = 0; i < data.length; i++) {
                html += `
            <tr>
            <td>${data[i].pkgCoupNo}</td>
            <td>${data[i].pkgCoupName}</td>
            <td>${data[i].pkgCoupIntroduce}</td>
            <td>${data[i].pkgCoupDiscount}</td>
            <td>${data[i].pkgCoupStartDate}</td>
            <td>${data[i].pkgCoupEndDate}</td>
            <td>${data[i].pkgCoupUseStartDate}</td>
            <td>${data[i].pkgCoupUseEndDate}</td>
            <td>${data[i].pkgCoupMinicharge}</td>
    `;
                switch (data[i].pkgCoupState) {
                    case 0:
                        html += `<td>未上架</td>`;
                        break;
                    case 1:
                        html += `<td>已上架</td>`;
                        break;
                }
                html += `
          
            </tr>`;

            }

            return coup.innerHTML = html;

        });


    });

})();