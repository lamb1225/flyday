var Textarea1 = document.querySelector("#Textarea1")
var actno1 = parseInt(sessionStorage.getItem("actno"));
let memid1 = parseInt(sessionStorage.getItem('memno'));
var msg = document.querySelector("#msg");
$("#message").on('click', () => {
    if (Textarea1.value.trim() !== '') {
        fetch('Enter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                actno: actno1,
                memno: memid1,
                replycontent: Textarea1.value.trim()
            })
        }).then(resp => resp.json())
            .then(body => {
                
            location.reload();
                
            })
    }

})
$(function () {
    fetch('look', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actno: actno1 })
    }).then(resp => resp.json())
        .then(data => {
            var html = '';
            // data.forEach(reply => {
                for(var reply of data){
                html+=`<hr>
                <div class="d-md-flex my-4">
                <!-- Avatar -->
                <div class="avatar avatar-lg me-3 flex-shrink-0">
                    <img class="avatar-img rounded-circle" src="assets/images/avatar/08.jpg" alt="avatar">
                </div>
                <!-- Text -->
                <div>
                    <div class="d-flex justify-content-between mt-1 mt-md-0">
                        <div>
                            <h6 class="me-3 mb-0">${reply.memno}</h6>
                            <!-- Info -->
                            <ul class="nav nav-divider small mb-2">
                                <li class="nav-item">${reply.actreplytime}</li>
                            </ul>
                        </div>
                        <!-- Review star -->
                    </div>
                    
                    <p class="mb-0">${reply.replycontent}</p>
                </div>
            </div>
            <hr>`

            }
           return msg.innerHTML = html;

        })
});

