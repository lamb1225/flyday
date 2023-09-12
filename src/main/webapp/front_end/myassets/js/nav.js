//購物車icon功能

//--切換購物車種類，改變按鈕形式
const pkgCart = document.getElementById("my_pkg_cart");
const tktCart = document.getElementById("my_tkt_cart");
const btnCart = document.getElementById("btn_cart");
const checkAllContent = document.getElementById("check-all-content");

const checkAll = document.getElementById("check-all");
const pkgChecks = document.getElementsByName("pkg-check");
const tktChecks = document.getElementsByName("tkt-check");


pkgCart.addEventListener("click", function(){
  btnCart.textContent = "行程結帳";
  btnCart.setAttribute("href", "#");
  checkAllContent.textContent = "全選行程";
  checkAll.checked = false;
  for(let tktCheck of tktChecks){
    tktCheck.checked = false;
  }
});

tktCart.addEventListener("click", function(){
  btnCart.textContent = "票券結帳";
  btnCart.setAttribute("href", "##");
  checkAllContent.textContent = "全選票券";
  checkAll.checked = false;
  for(let pkgCheck of pkgChecks){
    pkgCheck.checked = false;
  }
});

//--切換購物車數量
const minusBtns = document.getElementsByClassName("my-minus-btn");
const plusBtns = document.getElementsByClassName("my-plus-btn");
const cartQuantity = document.getElementsByClassName("my-cart-quantity");

for(let i = 0; i < plusBtns.length; i++){
  minusBtns[i].addEventListener("click", function(){
    if(parseInt(cartQuantity[i].value) > 0 ){
      cartQuantity[i].value = parseInt(cartQuantity[i].value) -1 ;
    }  
  });
  plusBtns[i].addEventListener("click", function(){
    cartQuantity[i].value = parseInt(cartQuantity[i].value) +1 ;
  });
};

//--設計全選
checkAll.addEventListener("click",function(){
  if(checkAllContent.textContent === "全選行程"){
    for(let pkgCheck of pkgChecks){
      pkgCheck.checked = checkAll.checked;
    }
  }else if(checkAllContent.textContent === "全選票券"){
    for(let tktCheck of tktChecks){
      tktCheck.checked = checkAll.checked;
    }
  }
});

for(let pkgCheck of pkgChecks){
  pkgCheck.addEventListener("click", function(){
    if(!this.checked){
      checkAll.checked = false;
    }else{
      let isAllChecked = true;
      for(let pkgCheck of pkgChecks){
        if(!pkgCheck.checked){
          isAllChecked = false;
          break;
        }
      }
      checkAll.checked = isAllChecked;
    }
  });
}

for(let tktCheck of tktChecks){
  tktCheck.addEventListener("click", function(){
    if(!this.checked){
      checkAll.checked = false;
    }else{
      let isAllChecked = true;
      for(let tktCheck of tktChecks){
        if(!tktCheck.checked){
          isAllChecked = false;
          break;
        }
      }
      checkAll.checked = isAllChecked;
    }
  });
}

const accNav = document.getElementById("acc-nav");
const memLevelNav = document.getElementById("mem-level-nav");
const memPicNavList = document.getElementsByClassName("mem-pic-nav");

const hidableList = document.getElementsByClassName("hidable");
const loginBtnNav = document.getElementById("login-btn-nav");

const contextPath = window.location.pathname.split('/')[1];

//用一個陣列來存載入網頁時從後端拿來需要重複使用的資料
let getOneInfoObj = [];

document.addEventListener("DOMContentLoaded",function(){
  fetch(`/${contextPath}/mem/getOneInfo`,{
    method: "POST"
  }).then(function(response){
    if(response.ok){
      return response.json();
    }else if(response.status === 401){
      
      //未登入時隱藏會員的購物車、通知、會員區塊
      for(let hidable of hidableList){
        hidable.style = "display: none;";
      }

      //未登入時顯示註冊按鈕
      loginBtnNav.style = "display: block;";

      console.log("XX");

    }
  }).then(function(jsonObject){
    const {memNo, memLevelNo, memAcc, memName, memGender, memBday, memEmail, memMobile, memCity, memDist, memAddr, memLevel, memPicBase64} = jsonObject;
    const {memLevelName, memLevelDisc} = memLevel;  //上面回傳的東西只有memLevel是物件，針對其再解構

    //填入帳號
    accNav.textContent = memAcc;

    //填入會員等級
    memLevelNav.textContent = memLevelName;

    //顯示從資料庫顯示圖片
    if(typeof memPicBase64 !== "undefined"){  
      for(let memPicNav of memPicNavList){
        const picBase64Url = memPicBase64;
        memPicNav.setAttribute("src", "data:image/jpeg;base64," + picBase64Url); 
      }
    }

  }).catch(function(){
    
  })
})  


//登出按鈕
const logoutNav = document.getElementById("logoutNav");

logoutNav.addEventListener("click", function(){
  fetch(`/${contextPath}/mem/logout`);
  location = `/${contextPath}/front_end/index.html`;
});