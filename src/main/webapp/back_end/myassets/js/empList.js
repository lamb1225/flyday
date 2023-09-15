const empSearch_input = document.getElementById('empsearch_input');
	const empSearchForm = document.getElementById('empsearch');
	const container = document.querySelector('.row');
	const allEmployeesTable = document.getElementById('allEmployeesTable');
	const ela = document.getElementById('empListAll');
	const addEmp = document.getElementById('addemp');
	const currentData = {};
	

	//跳轉至新增員工頁面
	addEmp.addEventListener("click", function () {
		location = "empsign-up.html";
	});


	// 單一員工查詢
empSearchForm.addEventListener("submit", async function (event) {
		event.preventDefault();  // 阻止表單的預設提交行為
		//在發送 fetch 請求之前清空 allEmployeesTable 的內容
		allEmployeesTable.innerHTML = '';
		const empNo = empSearch_input.value;
		console.log("empNo type" + empNo);
		if(empNo === ''){
			alert("請輸入查詢資料");
		}

		sessionStorage.setItem('empSearch_input', empNo); // 儲存empNo而不是DOM元素
		fetch("/flyday/emp/controller", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				EMP_NO: empNo,
				action: "btn-search"
			})
		})
			.then(response => {
				// 檢查回應是否成功。
				if (!response.ok) {
					throw new Error('網路連線異常，請確認網路通暢');
				}
				return response.json();  // 解析回應內容為JSON
			})
			.then(data => {
				// 在這裡新增查詢的員工資料到allEmployeesTable
                if(data === null){alert("沒有該編號員工");}
                else{
				const empRow = document.createElement('div');
				empRow.classList.add('row', 'row-cols-7', 'g-4', 'employee-row');

				empRow.innerHTML = `
	            <div class="col-2 empNo">${data.empNo}</div>
	            <div class="col-2">${data.empName}</div>
	            <div class="col-2">${data.empAcc}</div>
	            <div class="col-2">${data.empPwd}</div>
	            <div class="col-2">${data.empStatus}</div>
	            <div class="col-2">
	            	<a href="#" class="btn btn-sm btn-light mb-0" name="action" value="btn-edit">修改</a>
	            	<a href="#" class="btn btn-sm btn-light mb-0" name="action" value="btn-delete">刪除</a>
	            </div>
	        `;
				allEmployeesTable.appendChild(empRow);}
			})
			.catch(error => {
				// 這裡處理任何在上述代碼中發生的錯誤
				console.error('There was a problem with the fetch operation:', error.message);
			});
	});
	// 員工清單查詢
	ela.addEventListener("click", async function (event) {
		// 在發送 fetch 請求之前清空 allEmployeesTable 的內容
		allEmployeesTable.innerHTML = '';
		fetch("/flyday/emp/controller")
			.then(response => {
				if (!response.ok) {
					throw new Error('網路連線異常，請確認網路通暢');
				}
				return response.json();  // 解析回應內容為JSON
			})
			.then(data => {
				// data 是一個包含所有員工的陣列
				data.forEach(emp => {
					const empRow = document.createElement('div');
					empRow.classList.add('row', 'row-cols-7', 'g-4', 'employee-row'); // 可以自行增減class來適應你的CSS需求

					empRow.innerHTML = `
	                <div class="col-2 empNo">${emp.empNo}</div>
	                <div class="col-2">${emp.empName}</div>
	                <div class="col-2">${emp.empAcc}</div>
	                <div class="col-2">${emp.empPwd}</div>
	                <div class="col-2">${emp.empStatus}</div>
	                <div class="col-2">
	                    <a href="#" class="btn btn-sm btn-light mb-0" name="action" value="btn-edit">修改</a>
	                    <a href="#" class="btn btn-sm btn-light mb-0" name="action" value="btn-delete">刪除</a>
	                </div>
	            `;

					allEmployeesTable.appendChild(empRow);
				});
			})
			.catch(error => {
				console.error('There was a problem with the fetch operation:', error.message);
			});
	});

	//刪除員工
	//使用事件代理來捕獲 btn-delete 的點擊事件
allEmployeesTable.addEventListener("click", function (event) {
	//記得標註辨識btn-delete的類別value
	if (event.target.getAttribute('value') === "btn-delete") {
		event.preventDefault();
		const empNo = event.target.closest('.employee-row').querySelector('.empNo').textContent;
		if (confirm('確定要刪除該員工嗎？')) {
			const formData = new FormData()
			formData.append("empNo", empNo)
			formData.append("action", 'btn-delete')
			//此段為關鍵，對應的位置與關鍵詞需再三確認
			fetch("/flyday/emp/controller", {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					empNo: empNo,
					action: "btn-delete"
				})
			})
				.then(response => {
					if (!response.ok) {
						throw new Error("刪除操作出現異常");
					}
					return response.json();
				})
				.then(data => {
					if (data.success) {
						alert('員工已刪除！');
						// 刪除員工行
						event.target.closest('.employee-row').remove();
					} else {
						alert('刪除失敗！');
					}
				})
				.catch(error => console.error('刪除錯誤:', error));
		}
	}
	//修改員工資料
	if (event.target.getAttribute('value') === "btn-edit") {
		event.preventDefault();

		const empRow = event.target.closest('.employee-row');
		const empNo = empRow.querySelector('.empNo').textContent;

		// 保存當前的數據，以便取消修改時可以恢復
		currentData.empNo = empNo;
		currentData.empName = empRow.children[1].textContent;
		currentData.empAcc = empRow.children[2].textContent;
		currentData.empPwd = empRow.children[3].textContent;
		currentData.empStatus = empRow.children[4].textContent;

		

		// 將文本轉為輸入框
		empRow.children[1].innerHTML = `<input type="text" value="${currentData.empName}" class="edit-empName">`;
		empRow.children[2].innerHTML = `<input type="text" value="${currentData.empAcc}" class="edit-empAcc">`;
		empRow.children[3].innerHTML = `<input type="text" value="${currentData.empPwd}" class="edit-empPwd">`;
		empRow.children[4].innerHTML = `<input type="text" value="${currentData.empStatus}" class="edit-empStatus">`;
		// 替換 "修改"、"刪除"按鈕為 "儲存" 和 "取消" 按鈕
		empRow.children[5].innerHTML = `
<a href="#" class="btn btn-sm btn-light mb-0" name="action" value="btn-save">儲存</a>
<a href="#" class="btn btn-sm btn-light mb-0" name="action" value="btn-cancel">取消</a>
`;
	} else if (event.target.getAttribute('value') === "btn-save") {
		// 儲存修改的資料發送到後端保存
		event.preventDefault();
		const empRow = event.target.closest('.employee-row');
		const empNo = empRow.querySelector('.empNo').textContent;
		const empName = empRow.children[1].querySelector('input').value;
		const empAcc = empRow.children[2].querySelector('input').value;
		const empPwd = empRow.children[3].querySelector('input').value;
		const empStatus = empRow.children[4].querySelector('input').value;

		// 使用fetch發送請求更新數據
		fetch("/flyday/emp/controller", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				
				empNo: empNo,
				empName: empName,
				empAcc: empAcc,
				empPwd: empPwd,
				empStatus: empStatus,
				action: "btn-save"
			})
		})
		
			.then(response => {
				if (!response.ok) {
					throw new Error('網路連線異常，請確認網路通暢');
				}
				return response.json();
			})
			.then(data => {
				if (data.success) {
					alert('員工資料已更新！');

// 					從輸入框中獲取新的資料
						const updatedData = {
							empNo: empRow.querySelector('.empNo').textContent,
							empName: empRow.querySelector('.edit-empName').value,
							empAcc: empRow.querySelector('.edit-empAcc').value,
							empPwd: empRow.querySelector('.edit-empPwd').value,
							empStatus: empRow.querySelector('.edit-empStatus').value,

						};

// 					更新界面上的數據
					empRow.children[1].textContent = updatedData.empName;
					empRow.children[2].textContent = updatedData.empAcc;
					empRow.children[3].textContent = updatedData.empPwd;
					empRow.children[4].textContent = updatedData.empStatus;

					// 將 "儲存" 和 "取消" 按鈕替換回 "修改"、"刪除" 和 "員工權限" 按鈕
					empRow.children[5].innerHTML = `
		<a href="#" class="btn btn-sm btn-light mb-0" name="action" value="btn-edit">修改</a>
		<a href="#" class="btn btn-sm btn-light mb-0" name="action" value="btn-delete">刪除</a>
	`;
				} else {
					alert('資料更新失敗:\n姓名限制10字以內\n密碼應設置5-8位\n帳號需符合email格式');
				}
			})
			.catch(error => {
				console.error('There was a problem with the fetch operation:', error.message);
			});
	} else if (event.target.getAttribute('value') === "btn-cancel") {
		// 取消修改，恢復原始數據
		event.preventDefault();
		const empRow = event.target.closest('.employee-row');
		
		empRow.children[1].textContent = currentData.empName;
		empRow.children[2].textContent = currentData.empAcc;
		empRow.children[3].textContent = currentData.empPwd;
		empRow.children[4].textContent = currentData.empStatus;
		
		// 將 "儲存" 和 "取消" 按鈕替換回 "修改"、"刪除" 和 "員工權限" 按鈕
		empRow.children[5].innerHTML = `
	  <a href="#" class="btn btn-sm btn-light mb-0" name="action" value="btn-edit">修改</a>
	  <a href="#" class="btn btn-sm btn-light mb-0" name="action" value="btn-delete">刪除</a>
		`;
	}


});