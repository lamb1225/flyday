const acc = document.querySelector("#acc-input"); 
const pwd = document.querySelector("#pwd-input"); 
const errMsg = document.querySelector("#errMsg"); 
const signIn = document.getElementById("sign-in");

signIn.addEventListener("click", async function(){
  if (!acc || !pwd || !errMsg) {
    console.error("acc/pwd/errMsg參數遺失");
    return;
  }

  try {
    const response = await fetch("/flyday/emp/login", {
      method: "POST",
      headers:  { "Content-Type": "application/json" },
      body: JSON.stringify({
        empAcc: acc.value,
        empPwd: pwd.value,
      })
    });
    
    const jsonObject = await response.json();

    const { successful, message, empAcc, empStatus } = jsonObject; //加入empStatus
    
    //這裡設定將emp的empAcc及empStatus存入
    if (successful) {
      sessionStorage.setItem("empAcc", empAcc);
      sessionStorage.setItem("empStatus", empStatus.toString());//轉成字串存入session
      location = "admin-list.html";

    } else {
      errMsg.textContent = message;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});