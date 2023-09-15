const toempList = document.getElementById("toempList");
const toempListroll = document.getElementById("toempListroll");
const mem1 = document.getElementById("mem1");
const factory1 = document.getElementById("factory1");
const factory3 = document.getElementById("factory3");
const buyroll = document.getElementById("buyroll");
const buy1 = document.getElementById("buy1");
const buy3 = document.getElementById("buy3");
const ticketroll = document.getElementById("ticketroll");
const grouproll = document.getElementById("grouproll");
const grouproll1 = document.getElementById("grouproll1");
const grouproll2 = document.getElementById("grouproll2");
const guestroll = document.getElementById("guestroll");


//陳炳翰新增-業務邏輯
var empStatus = '<%= session.getAttribute("empStatus") %>';


//員工管理系統=1
toempListroll.addEventListener("click", function () {
    if (sessionStorage.getItem("empStatus") == 1) {
        toempList.addEventListener("click", function () {
            location = "/flyday/back_end/empList.html";
        });
    } else {
        alert("無登入權限");
    }
});
//會員管理系統=all
mem1.addEventListener("click", function () {
    location = "/flyday/back_end/admin-list.html";
});

//廠商管理系統=all
factory1.addEventListener("click", function () {
    location = "/flyday/back_end/store-list.html";
});
factory3.addEventListener("click", function () {
    location = "/flyday/back_end/pkgreview.html";
});
//訂購管理系統=1/2
buyroll.addEventListener("click", function () {
    if (sessionStorage.getItem("empStatus") == 1 || sessionStorage.getItem("empStatus") == 2) {
    } else {
        alert("無登入權限");
    }
});
buy1.addEventListener("click", function () {
	if (sessionStorage.getItem("empStatus") == 1 || sessionStorage.getItem("empStatus") == 2) {
       	location = "empList.html";
    } else {
        alert("無登入權限");
    }
});
buy3.addEventListener("click", function () {
	if (sessionStorage.getItem("empStatus") == 1 || sessionStorage.getItem("empStatus") == 2) {
       	location = "empList.html";
    } else {
        alert("無登入權限");
    }
});
//票卷管理=1/2
ticketroll.addEventListener("click", function () {
    if (sessionStorage.getItem("empStatus") == 1 || sessionStorage.getItem("empStatus") == 2) {
        location = "/flyday/tktt/tkt-admin-list.html";
    } else {
        alert("無登入權限");
    }
});
//揪團檢舉管理=1/3
grouproll.addEventListener("click", function () {
    if (sessionStorage.getItem("empStatus") == 1 || sessionStorage.getItem("empStatus") == 3) {
 
    } else {
        alert("無登入權限");
    }
});

grouproll2.addEventListener("click", function () {
	if (sessionStorage.getItem("empStatus") == 1 || sessionStorage.getItem("empStatus") == 3) {
       	location = "/flyday/Act/back-Group.html";
    } else {
        alert("無登入權限");
    }
});
grouproll1.addEventListener("click", function () {
	if (sessionStorage.getItem("empStatus") == 1 || sessionStorage.getItem("empStatus") == 3) {
       	location = "/flyday/Act/back-Act.html";
    } else {
        alert("無登入權限");
    }
});
//客服訊息管理=all
guestroll.addEventListener("click", function () {
    location = "/flyday/message/chat.jsp";
});