const empSearch_input = document.getElementById('empsearch_input');
const empSearchForm = document.getElementById('empsearch'); // 假設empsearch是form的ID
const container = document.querySelector('.row');

empSearchForm.addEventListener("click", async function (event) {
  event.preventDefault();  // 阻止表單的預設提交行為

  const empNo = empSearch_input.value;

  sessionStorage.setItem('empSearch_input', empNo); // 儲存empNo而不是DOM元素

  fetch("/flyday/emp/getOneInfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      EMP_NO: empNo
    })
  })
    .then(response => {
      // 檢查回應是否成功。如果statusCode在200-299之間，表示成功。
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();  // 解析回應內容為JSON
    })
    .then(data => {
      // 這裡，'data'是從伺服器返回的JSON數據
      // 你可以根據你的需求來處理這些數據，例如顯示在頁面上
      console.log(data);  // 打印返回的數據
      // 如果你想更新頁面的某些部分，你可以在這裡添加代碼
    })
    .catch(error => {
      // 這裡處理任何在上述代碼中發生的錯誤
      console.error('There was a problem with the fetch operation:', error.message);
    });
});
