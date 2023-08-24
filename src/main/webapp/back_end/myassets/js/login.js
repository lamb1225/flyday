  // const acc = document.querySelector("acc-input");
  // const pwd = document.querySelector("pwd-input");
  // const errMsg = document.querySelector("errMsg");
  // const signIn = document.getElementById("sign-in");

  // signIn.addEventListener("click", function(){
  //   fetch("/flyday/emp/login", {
  //     method: "POST",
  //     headers:  { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       empAcc: acc.value,
  //       empPwd: pwd.value
  //     })
  //   }).then(function(response){
  //     return response.json();
  //   }).then(function(jsonObject){
  //     const{successful, message} = jsonObject;
  //     if(successful){
  //       const{empAcc} = jsonObject;
  //       sessionStorage.setItem("empAcc", empAcc);
  //       location = "admin-guest-list.html";
  //     }else{
  //       errMsg.textContent = message;
  //     }
  //   })
  // });

const acc = document.querySelector("#acc-input"); // 假設它是ID
const pwd = document.querySelector("#pwd-input"); // 假設它是ID
const errMsg = document.querySelector("#errMsg"); // 假設它是ID
const signIn = document.getElementById("sign-in");

signIn.addEventListener("click", async function(){
  if (!acc || !pwd || !errMsg) {
    console.error("Some elements could not be found.");
    return;
  }

  try {
    const response = await fetch("/flyday/emp/login", {
      method: "POST",
      headers:  { "Content-Type": "application/json" },
      body: JSON.stringify({
        empAcc: acc.value,
        empPwd: pwd.value
      })
    });
    
    const jsonObject = await response.json();

    const { successful, message, empAcc } = jsonObject;
    
    if (successful) {
      sessionStorage.setItem("empAcc", empAcc);
      location = "admin-guest-list.html";
    } else {
      errMsg.textContent = message;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    errMsg.textContent = "An error occurred while processing your request.";
  }
});
