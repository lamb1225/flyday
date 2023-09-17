document.addEventListener("DOMContentLoaded", function(){

	const storePics = document.getElementsByClassName("store-pic");
    function storename() {
        document.getElementById("storename1").textContent = sessionStorage.getItem("storeName");
        for (let storePic of storePics) {
            const picBase64Url = sessionStorage.getItem("storePicBase64");
            storePic.setAttribute("src", "data:image/jpeg;base64," + picBase64Url);
        }
    }

    storename();
	
	const newplandetails = document.getElementById("newplandetails");
	const addbt = document.getElementById("add-details");

	const bt = document.getElementById("sent");

	addbt.addEventListener("click", function(){
		const uniqueId = Date.now();
		newplandetails.innerHTML += `<div class="card-body" id="a${uniqueId}">
		<div class="row g-4">
			<div class="col-12">
				<a class="btn btn-sm btn-primary-soft mb-0 deleteButton" data-id="${uniqueId}">刪除下方時間</a>
			</div>

			<!-- 集合地點 -->
			<div class="col-12">
				<label class="form-label">行程開始時間</label>
				<input id="start" type="text" class="form-control flatpickr" value="29 Aug 2023" placeholder="Enter date of birth" data-date-format="Y-m-d">
				
				<small>請填寫行程開始時間</small>
			</div>
			<!-- 行程地點 -->
			<div class="col-12">
				<label class="form-label">行程報名截止時間</label>
				<input id="endtime" type="text" class="form-control flatpickr" value="29 Aug 2023" placeholder="Enter date of birth" data-date-format="Y-m-d">
				<small>請填寫行程報名截止時間</small>
			</div>

			<!-- 行程地址 -->
			<div class="col-12">
				<label class="form-label">人數上限</label>
				<input class="form-control" type="text" id="maxnum">
				<small>請填寫人數上限</small>
			</div>

			<!-- 價格 -->
			<div class="col-12">
				<label class="form-label">價格</label>
				<input class="form-control" type="text" id="price">
				<small>請填寫價格</small>
			</div>

		
			
		</div>
		
		</div>`;
		flatpickr(".flatpickr", {});

		const deleteButtons = document.querySelectorAll(".deleteButton");
      	deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {
          const id = button.getAttribute("data-id");
          const elementToRemove = document.getElementById(`a${id}`);
          elementToRemove.remove();
        });
      });
	})

	bt.addEventListener("click", async function(){
		const starts = document.querySelectorAll("#start");
		const endtimes = document.querySelectorAll("#endtime");
		const maxnum = document.querySelectorAll("#maxnum");
		const prices = document.querySelectorAll("#price");
		const pkgPlanNo = sessionStorage.getItem("pkgPlanNo");
		const pkgArray = []; // 創建一個 JSON 數組來存儲行程對象

		for (let i=0;i< starts.length;i++) {
			const pkgDayStart = starts[i].value;
			const pkgDayEnd = endtimes[i].value;
			const pkgPeopleMax = maxnum[i].value;
			const pkgPrice = prices[i].value;
			const pkgPeople = 0;
			
			const pkgObject = {
				pkgPlanNo,
				pkgDayStart,
				pkgDayEnd,
				pkgPeopleMax,
				pkgPeople,
				pkgPrice,
			};

			pkgArray.push(pkgObject); // 將行程對象添加到數組中
		}

		console.log(pkgArray); // 打印包含行程對象的 JSON 數組

		const uploadPromises = pkgArray.map(async (element) => {
			const picResponse = await fetch("/flyday/pkgplandetails/add", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(element)
			})
		});
		await Promise.all(uploadPromises);
		window.location.href = "pkgplanlist.html";
		
	})
})