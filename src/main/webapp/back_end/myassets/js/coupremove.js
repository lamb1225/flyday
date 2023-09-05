(() => {
    const selectbtn = document.querySelector('#removebtn');
    const rcoupno = document.querySelector('#rcoupno');
    const msg = document.querySelector('#msg');


    removebtn.addEventListener('click', function () {
        console.log("xxx");

        fetch('/flyday/pkg/PkgCoupRemove', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pkgCoupNo: rcoupno.value })
        }).then(function (response) {
            return response.json();
        }).then(data => {
            console.log("lalala");
            console.log(data);
            const { successful, message} = data;
            msg.textContent='';
        	if (successful) {
        	    msg.textContent='刪除成功';
                console.log("yeAhhh");
        	} else {
        	    console.log("no");
        		msg.textContent='刪除失敗';
        		console.log(message);
        	}


        });


    });

})();