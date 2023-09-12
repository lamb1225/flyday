//動態生成地區下拉式選單
const dists = {
  '臺北市': ['中正區', '大同區', '中山區', '萬華區', '信義區', '松山區', '大安區', '南港區', '北投區', '內湖區', '士林區', '文山區'],
  '新北市': ['板橋區', '新莊區', '泰山區', '林口區', '淡水區', '金山區', '八里區', '萬里區', '石門區', '三芝區', '瑞芳區', '汐止區', '平溪區', '貢寮區', '雙溪區', '深坑區', '石碇區', '新店區', '坪林區', '烏來區', '中和區', '永和區', '土城區', '三峽區', '樹林區', '鶯歌區', '三重區', '蘆洲區', '五股區'],
  '基隆市': ['仁愛區', '中正區', '信義區', '中山區', '安樂區', '暖暖區', '七堵區'],
  '桃園市': ['桃園區', '中壢區', '平鎮區', '八德區', '楊梅區', '蘆竹區', '龜山區', '龍潭區', '大溪區', '大園區', '觀音區', '新屋區', '復興區'],
  '新竹縣': ['竹北市', '竹東鎮', '新埔鎮', '關西鎮', '峨眉鄉', '寶山鄉', '北埔鄉', '橫山鄉', '芎林鄉', '湖口鄉', '新豐鄉', '尖石鄉', '五峰鄉'],
  '新竹市': ['東區', '北區', '香山區'],
  '苗栗縣': ['苗栗市', '通霄鎮', '苑裡鎮', '竹南鎮', '頭份鎮', '後龍鎮', '卓蘭鎮', '西湖鄉', '頭屋鄉', '公館鄉', '銅鑼鄉', '三義鄉', '造橋鄉', '三灣鄉', '南庄鄉', '大湖鄉', '獅潭鄉', '泰安鄉'],
  '臺中市': ['中區', '東區', '南區', '西區', '北區', '北屯區', '西屯區', '南屯區', '太平區', '大里區', '霧峰區', '烏日區', '豐原區', '后里區', '東勢區', '石岡區', '新社區', '和平區', '神岡區', '潭子區', '大雅區', '大肚區', '龍井區', '沙鹿區', '梧棲區', '清水區', '大甲區', '外埔區', '大安區'],
  '南投縣': ['南投市', '埔里鎮', '草屯鎮', '竹山鎮', '集集鎮', '名間鄉', '鹿谷鄉', '中寮鄉', '魚池鄉', '國姓鄉', '水里鄉', '信義鄉', '仁愛鄉'],
  '彰化縣': ['彰化市', '員林鎮', '和美鎮', '鹿港鎮', '溪湖鎮', '二林鎮', '田中鎮', '北斗鎮', '花壇鄉', '芬園鄉', '大村鄉', '永靖鄉', '伸港鄉', '線西鄉', '福興鄉', '秀水鄉', '埔心鄉', '埔鹽鄉', '大城鄉', '芳苑鄉', '竹塘鄉', '社頭鄉', '二水鄉', '田尾鄉', '埤頭鄉', '溪州鄉'],
  '雲林縣': ['斗六市', '斗南鎮', '虎尾鎮', '西螺鎮', '土庫鎮', '北港鎮', '莿桐鄉', '林內鄉', '古坑鄉', '大埤鄉', '崙背鄉', '二崙鄉', '麥寮鄉', '臺西鄉', '東勢鄉', '褒忠鄉', '四湖鄉', '口湖鄉', '水林鄉', '元長鄉'],
  '嘉義縣': ['太保市', '朴子市', '布袋鎮', '大林鎮', '民雄鄉', '溪口鄉', '新港鄉', '六腳鄉', '東石鄉', '義竹鄉', '鹿草鄉', '水上鄉', '中埔鄉', '竹崎鄉', '梅山鄉', '番路鄉', '大埔鄉', '阿里山鄉'],
  '嘉義市': ['東區', '西區'],
  '臺南市': ['中西區', '東區', '南區', '北區', '安平區', '安南區', '永康區', '歸仁區', '新化區', '左鎮區', '玉井區', '楠西區', '南化區', '仁德區', '關廟區', '龍崎區', '官田區', '麻豆區', '佳里區', '西港區', '七股區', '將軍區', '學甲區', '北門區', '新營區', '後壁區', '白河區', '東山區', '六甲區', '下營區', '柳營區', '鹽水區', '善化區', '大內區', '山上區', '新市區', '安定區'],
  '高雄市': ['楠梓區', '左營區', '鼓山區', '三民區', '鹽埕區', '前金區', '新興區', '苓雅區', '前鎮區', '小港區', '旗津區', '鳳山區', '大寮區', '鳥松區', '林園區', '仁武區', '大樹區', '大社區', '岡山區', '路竹區', '橋頭區', '梓官區', '彌陀區', '永安區', '燕巢區', '田寮區', '阿蓮區', '茄萣區', '湖內區', '旗山區', '美濃區', '內門區', '杉林區', '甲仙區', '六龜區', '茂林區', '桃源區', '那瑪夏區'],
  '屏東縣': ['屏東市', '潮州鎮', '東港鎮', '恆春鎮', '萬丹鄉', '長治鄉', '麟洛鄉', '九如鄉', '里港鄉', '鹽埔鄉', '高樹鄉', '萬巒鄉', '內埔鄉', '竹田鄉', '新埤鄉', '枋寮鄉', '新園鄉', '崁頂鄉', '林邊鄉', '南州鄉', '佳冬鄉', '琉球鄉', '車城鄉', '滿州鄉', '枋山鄉', '霧台鄉', '瑪家鄉', '泰武鄉', '來義鄉', '春日鄉', '獅子鄉', '牡丹鄉', '三地門鄉'],
  '宜蘭縣': ['宜蘭市', '羅東鎮', '蘇澳鎮', '頭城鎮', '礁溪鄉', '壯圍鄉', '員山鄉', '冬山鄉', '五結鄉', '三星鄉', '大同鄉', '南澳鄉'],
  '花蓮縣': ['花蓮市', '鳳林鎮', '玉里鎮', '新城鄉', '吉安鄉', '壽豐鄉', '秀林鄉', '光復鄉', '豐濱鄉', '瑞穗鄉', '萬榮鄉', '富里鄉', '卓溪鄉'],
  '臺東縣': ['臺東市', '成功鎮', '關山鎮', '長濱鄉', '海端鄉', '池上鄉', '東河鄉', '鹿野鄉', '延平鄉', '卑南鄉', '金峰鄉', '大武鄉', '達仁鄉', '綠島鄉', '蘭嶼鄉', '太麻里鄉'],
  '澎湖縣': ['馬公市', '湖西鄉', '白沙鄉', '西嶼鄉', '望安鄉', '七美鄉'],
  '金門縣': ['金城鎮', '金湖鎮', '金沙鎮', '金寧鄉', '烈嶼鄉', '烏坵鄉'],
  '連江縣': ['南竿鄉', '北竿鄉', '莒光鄉', '東引鄉'],
  '0': []
}

const myMemCity = document.getElementById("my-mem-city");
const myMemDist = document.getElementById("my-mem-dist");

myMemCity.addEventListener("change", function(){
  
  if(parseInt(myMemCity.value) === 0){
    myMemCity.classList.add("text-secondary");
  }else{
    myMemCity.classList.remove("text-secondary");
  }

  myMemDist.classList.add("text-secondary");
  
  const distList1 = dists[myMemCity.value];

  myMemDist.innerHTML= `<option value="0" class="text-secondary">選擇您的居住地區</option>`;

  for(let dist of distList1){
    myMemDist.insertAdjacentHTML("beforeend", `<option value=${dist} class="text-secondary">${dist}</option>`);   
  }
    
  if(parseInt(myMemDist.value) === 0){
    myMemDist.classList.add("text-secondary");
  }

});

myMemDist.addEventListener("change", function(){

  if(parseInt(myMemDist.value) === 0){
    myMemDist.classList.add("text-secondary");
  }else{
    myMemDist.classList.remove("text-secondary");
  }

});


//滑鼠移動到頭像更換照片
const changeImgBtn = document.getElementsByClassName("change-img-btn")[0];
const changeImg = document.getElementsByClassName("change-img")[0];
const changeImgDiv = document.getElementsByClassName("change-img-div")[0];

changeImgDiv.addEventListener("mouseenter", function(){
  changeImg.setAttribute("style","filter:grayscale(20%);");
  changeImgBtn.style.display = "block";
});

changeImgDiv.addEventListener("mouseleave", function(){
  changeImg.removeAttribute("style");
  changeImgBtn.style.display = "none";
});


//更改欄位資料才可以按送出按鈕
const showView = document.getElementById("show-view");  //調整修改成功框

const personalInfo = document.getElementById("personal-info");
const saveChanges = document.getElementById("save-changes");

personalInfo.addEventListener("change", function(){
  saveChanges.removeAttribute("disabled");
  showView.setAttribute("style", "display: none;");
});

const sendEmail = document.getElementById("send-email");
const sendEmailBtn = document.getElementById("send-email-btn");
const confirmEmail = document.getElementById("confirm-email");
const confirmEmailBtn = document.getElementById("confirm-email-btn");

sendEmail.addEventListener("change", function(){
  sendEmailBtn.removeAttribute("disabled");
});

confirmEmail.addEventListener("change", function(){
  confirmEmailBtn.removeAttribute("disabled"); 
});

//登入成功後抓存在session裡的會員資料顯示在頁面需要呈現的地方

const myAccs = document.getElementsByClassName("my-acc");
const myEmails = document.getElementsByClassName("my-email");

const myNameInput = document.getElementById("my-name-input");
const myMobileInput = document.getElementById("my-mobile-input");
const myAddrInput = document.getElementById("my-addr-input");
const myBdayInput = document.getElementById("my-bday-input");
const myGenders = document.getElementsByName("my-gender");

const myCityOptions = document.querySelectorAll("#my-mem-city > option");

const myMemLevels = document.getElementsByClassName("my-mem-level");

const myMemPics = document.getElementsByClassName("my-mem-pic");

const contextPath = window.location.pathname.split('/')[1];

//用一個陣列來存載入網頁時從後端拿來需要重複使用的資料
let getOneInfoObj = [];

document.addEventListener("DOMContentLoaded",function(){
  fetch(`/${contextPath}/mem/getOneInfo`,{
    method: "POST"
  }).then(function(response){
    if(response.status === 401){
      sessionStorage.setItem("originalURL", window.location.href);
      location = "sign-in.html";
    }else if(response.ok){
      return response.json();
    }else{
      alert("發生未知錯誤，請洽管理員");
      location = "index.html";
    }
  }).then(function(jsonObject){
    const {memNo, memLevelNo, memAcc, memName, memGender, memBday, memEmail, memMobile, memCity, memDist, memAddr, memLevel, memPicBase64} = jsonObject;
    const {memLevelName, memLevelDisc} = memLevel;  //上面回傳的東西只有memLevel是物件，針對其再解構
    
    //填入帳號
    for(let myAcc of myAccs){
      myAcc.textContent = memAcc;
    }
    
    //填入Email
    for(let myEmail of myEmails){
      myEmail.textContent = memEmail;
    }
    
    //填入姓名、手機、地址、生日
    if(typeof memName !== "undefined"){  
      myNameInput.value = memName;
    }  
    
    myMobileInput.value = memMobile;
    
    if(typeof memName !== "undefined"){  
      myAddrInput.value = memAddr;
    }
    
    if(typeof memName !== "undefined"){  
      myBdayInput.value = memBday;
    }
    
    //填入性別
    if(typeof memName !== "undefined"){  
      for(let myGender of myGenders){
        if(parseInt(myGender.value) === parseInt(memGender)){
          myGender.setAttribute("checked", true);
        }
      }
    }

    //填入會員等級
    for(let myMemLevel of myMemLevels){
      myMemLevel.textContent = memLevelName;
    }
    
    //填入居住縣市
    if(typeof memName !== "undefined"){  
      for(let myCityOption of myCityOptions){
        if(myCityOption.value === memCity){
          myCityOption.setAttribute("selected", true);
        }else{
          myCityOption.removeAttribute("selected");
        }
      }
    } 

    //如果頁面載入有取得縣市，則動態生成地區的選單
    if(typeof memName !== "undefined"){  
      if(memCity !== null){
        const distList2 = dists[myMemCity.value];
        myMemDist.innerHTML= `<option value="0" class="text-secondary">選擇居住地區</option>`;
        for(let dist of distList2){
          myMemDist.insertAdjacentHTML("beforeend", `<option value=${dist} class="text-secondary">${dist}</option>`);   
        }

        //填入居住地區
        const myDistOptions = document.querySelectorAll("#my-mem-dist > option");

        for(let myDistOption of myDistOptions){
          if(myDistOption.value === memDist){
            myDistOption.setAttribute("selected", true);
          }else{
            myDistOption.removeAttribute("selected");
          }
        }
        //如果居住縣市與地區皆已填入，取消灰階的顯示
        myMemCity.classList.remove("text-secondary");
        myMemDist.classList.remove("text-secondary");
      }
    }

    //顯示從資料庫顯示圖片
    if(typeof memPicBase64 !== "undefined"){  
      for(let myMemPic of myMemPics){
        const picBase64Url = memPicBase64;
        myMemPic.setAttribute("src", "data:image/jpeg;base64," + picBase64Url); 
      }
    }
    //把會員編號存到陣列中
    getOneInfoObj = [memNo];

  })
});


//個人資料變更   
const errMsgInfo = document.getElementById("err-msg-info");

const mobileRegex = /^09[0-9]{8}$/

saveChanges.addEventListener("click", function(){
  
  errMsgInfo.textContent = "";
  
  let selectedValue = "";
  for(const myGender of myGenders){
    if(myGender.checked){
      selectedValue = myGender.value;
      break;
    }
  };
  
  if(myMobileInput.value === null || myMobileInput.value.trim().length === 0){
    errMsgInfo.textContent = "手機號碼為必填";
  }else if(! mobileRegex.test(myMobileInput.value)){
    errMsgInfo.textContent = "手機號碼輸入格式不符"
  }else{
    fetch(`/${contextPath}/mem/updateMemInfo`,{
      method: "POST",
      headers:  { "Content-Type": "application/json" },
      body: JSON.stringify({
        memName: myNameInput.value,
        memGender: selectedValue,
        memBday: myBdayInput.value,
        memMobile: myMobileInput.value,
        memCity: myMemCity.value,
        memDist: myMemDist.value,
        memAddr: myAddrInput.value,
        memNo: getOneInfoObj[0],
      })
    }).then(function(response){
      return response.json();
    }).then(function(jsonObject){
      const{successful, message} = jsonObject;
      if(successful){
        showView.removeAttribute("style");
        saveChanges.setAttribute("disabled", true);
      }else{
        errMsgInfo.textContent = message;
      }
    });
  }
});

// 上傳照片
const uploadImage = document.getElementById("upload-image");
//--設置最大上傳容量
const fileMaxSize = 1024*1024*1   //1M

uploadImage.addEventListener("change", function(){

  if(uploadImage.files[0].size > fileMaxSize){
    alert("上傳容量限制為1MB！");
  }else{
    console.log("YYY");
    const formData = new FormData();
    formData.append("image", uploadImage.files[0]);
    formData.append("memNo", getOneInfoObj[0]);

    fetch(`/${contextPath}/mem/updateImage`,{
        method: "POST",
        body: formData
    }).then(function(response){
      return response.json();
    }).then(function(jsonObject){
      const{successful, message, memPicBase64} = jsonObject;
      if(successful){
        for(let myMemPic of myMemPics){
          const picBase64Url = memPicBase64;
          myMemPic.setAttribute("src", "data:image/jpeg;base64," + picBase64Url); 
        }
      }
    });
  }
});

//更新Email
const errMsgEmail = document.getElementById("err-msg-email");
const myNewEmail = document.getElementById("my-new-email");
const myVerification = document.getElementById("my-verification");

const emailRegex =/^\w+((-\w+)|(\.\w+))*\@\w+((\.|-)\w+)*\.[A-Za-z]+$/;

let countdown = 60;

//--設定發送驗證信
sendEmailBtn.addEventListener("click", function(){
  errMsgEmail.textContent="";
  if(myNewEmail.value === null || myNewEmail.value.trim().length === 0){
    errMsgEmail.textContent = "未輸入Email";
  }else if(! emailRegex.test(myNewEmail.value)){
    errMsgEmail.textContent = "email輸入格式不符"
  }else{
    fetch(`/${contextPath}/mem/sendEmailVerification`,{
        method: "POST",
        headers:  { "Content-Type": "application/json" },
        body: JSON.stringify({
          memNo: getOneInfoObj[0],
          memEmail: myNewEmail.value 
        })
    }).then(function(response){
      return response.json();
    }).then(function(jsonObject){
      const{successful, message} = jsonObject;
      if(successful){
        myNewEmail.setAttribute("disabled", true);  //按下發送驗證信後，就不讓使用者更改電子信箱，避免錯誤
        errMsgEmail.textContent = "驗證信發送成功！";
        //設計每過60秒才能再次發送驗證信
        sendEmailBtn.setAttribute("disabled", true);
        sendEmailBtn.textContent = `再次發送(${countdown}s)`;

        const timer = setInterval(function(){
          countdown--;
          sendEmailBtn.textContent = `再次發送(${countdown}s)`;

          if(countdown <= 0){
            clearInterval(timer);
            sendEmailBtn.textContent = "發送驗證信" ;
            sendEmailBtn.removeAttribute("disabled");
            countdown = 60;
          }
        },1000);
      }else{
        errMsgEmail.textContent = message;
      }
    });
  }
  //--點擊輸入驗證碼時，錯誤訊息會刪除
  myVerification.addEventListener("focus", function(){
    errMsgEmail.textContent = "";
  });
  //--完成變更前確認驗證碼是否正確
  const verificationRegex = /^[0-9]{6}$/;
  
  confirmEmailBtn.addEventListener("click", function(){
    errMsgEmail.textContent = "";
    if(myVerification.value === null || myVerification.value.trim().length === 0){
      errMsgEmail.textContent = "未輸入驗證碼";
    }else if(! verificationRegex.test(myVerification.value)){
      errMsgEmail.textContent = "驗證碼輸入格式不符"
    }else{
      fetch(`/${contextPath}/mem/checkEmailVerification`,{
          method: "POST",
          headers:  { "Content-Type": "application/json" },
          body: JSON.stringify({
            myNewEmail: myNewEmail.value,
            verificationInput: myVerification.value
          })
      }).then(function(response){
        return response.json();
      }).then(function(jsonObject){
        const{successful, message} = jsonObject;
        if(successful){
          alert("電子信箱變更成功");
          location.reload();
        }else{
          errMsgEmail.textContent = message;
        }
      });
    }  
  });

});

//nav bar 購物車icon功能

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

//登出按鈕
const logoutSide = document.getElementById("logoutSide");

logoutSide.addEventListener("click", function(){
  sessionStorage.removeItem("memNo");
  fetch(`/${contextPath}/mem/logout`);
  location = `/${contextPath}/front_end/index.html`;
});

const logoutNav = document.getElementById("logoutNav");

logoutNav.addEventListener("click", function(){
  sessionStorage.removeItem("memNo");
  fetch(`/${contextPath}/mem/logout`);
  location = `/${contextPath}/front_end/index.html`;
});