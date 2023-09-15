<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<link rel="stylesheet" href="css/friendchat.css" type="text/css" />
<link rel="shortcut icon" href="/flyday/back_end/myassets/logo_noliteral.png">
<!-- Plugins CSS -->
<link rel="stylesheet" type="text/css"
	href="/flyday/back_end/assets/vendor/font-awesome/css/all.min.css">
<link rel="stylesheet" type="text/css"
	href="/flyday/back_end/assets/vendor/bootstrap-icons/bootstrap-icons.css">
<link rel="stylesheet" type="text/css"
	href="/flyday/back_end/assets/vendor/overlay-scrollbar/css/overlayscrollbars.min.css">
<link rel="stylesheet" type="text/css"
	href="/flyday/back_end/assets/vendor/choices/css/choices.min.css">

<!-- Theme CSS -->
<link rel="stylesheet" type="text/css" href="/flyday/back_end/assets/css/style.css">

<style type="text/css">

</style>
<title>FlyDay線上客服系統</title>
</head>
<body onload="connect();" onunload="disconnect();">
	    <main>

        <!-- Sidebar START -->
		<nav class="navbar sidebar navbar-expand-xl navbar-light">
			<!-- Navbar brand for xl START -->
			<div class="d-flex align-items-center">
				<a class="navbar-brand" href="../front_end/index.html"> <img
					class="light-mode-item navbar-brand-item" src="/flyday/back_end/myassets/logo.svg"
					alt="logo"> <img class="dark-mode-item navbar-brand-item"
					src="/flyday/back_end/myassets/logo.svg" alt="logo">
				</a>
			</div>
			<!-- Navbar brand for xl END -->

			<div
				class="offcanvas offcanvas-start flex-row custom-scrollbar h-100"
				data-bs-backdrop="true" tabindex="-1" id="offcanvasSidebar">
				<div class="offcanvas-body sidebar-content d-flex flex-column pt-4">

					<!-- Sidebar menu START -->
					<ul class="navbar-nav flex-column" id="navbar-sidebar">

						<!-- Menu item -->
						<!-- 					陳炳翰:將帳號跟權限管理整合 -->
						<li class="nav-item"><a class="nav-link"
							data-bs-toggle="collapse" href="#collapsebackend"
							id="toempListroll" role="button" aria-expanded="false"
							aria-controls="collapsebooking"> 員工管理系統 </a> 
							<!-- Submenu -->
							<ul class="nav collapse flex-column" id="collapsebackend"
								data-bs-parent="#navbar-sidebar">
								<li class="nav-item"><a class="nav-link" href="###"
									id="toempList">後台帳號權限管理</a></li>     <!-- 	陳炳翰:註解下行，新增id="toempList" -->
								<!-- 							<li class="nav-item"> <a class="nav-link" href="###">後台帳號管理</a></li> -->
							</ul></li>
						<!-- 陳炳翰:將以下各功能加入id並設定權限 -->

						<!-- Menu item -->
						<li class="nav-item"><a class="nav-link"
							data-bs-toggle="collapse" href="#collapsemember" role="button"
							aria-expanded="false" aria-controls="collapsebooking" id="memroll">
								會員管理系統 </a> <!-- Submenu -->
							<ul class="nav collapse flex-column" id="collapsemember"
								data-bs-parent="#navbar-sidebar">
								<li class="nav-item"><a class="nav-link" href="###" id="mem1">會員資料查詢</a></li>
							</ul></li>

						<!-- Menu item -->
						<li class="nav-item"><a class="nav-link"
							data-bs-toggle="collapse" href="#collapsestore" role="button"
							aria-expanded="false" aria-controls="collapsebooking"
							id="factoryroll"> 廠商管理系統 </a> <!-- Submenu -->
							<ul class="nav collapse flex-column" id="collapsestore"
								data-bs-parent="#navbar-sidebar">
								<li class="nav-item"><a class="nav-link" href="###" id="factory1">廠商註冊審核</a></li>
								<li class="nav-item"><a class="nav-link" href="###" id="factory3">行程審核管理</a></li>
							</ul></li>

						<!-- Menu item -->
						<li class="nav-item"><a class="nav-link"
							data-bs-toggle="collapse" href="#collapseorder" role="button"
							aria-expanded="false" aria-controls="collapsebooking" id="buyroll">
								訂購管理系統 </a> <!-- Submenu -->
							<ul class="nav collapse flex-column" id="collapseorder"
								data-bs-parent="#navbar-sidebar">
								<li class="nav-item"><a class="nav-link" href="###" id="buy1">票券訂單管理</a></li>
								<li class="nav-item"><a class="nav-link" href="###" id="buy3">行程優惠券管理</a></li>
							</ul></li>

						<!-- Menu item -->
						<li class="nav-item"><a class="nav-link"
							data-bs-toggle="collapse" href="#collapsegroup" role="button"
							aria-expanded="false" aria-controls="collapsebooking" id="grouproll">
								揪團管理系統 </a> <!-- Submenu -->
							<ul class="nav collapse flex-column" id="collapsegroup"
								data-bs-parent="#navbar-sidebar">
								<li class="nav-item"><a class="nav-link" href="###" id="grouproll1">揪團管理</a></li>
								<li class="nav-item"><a class="nav-link" href="###" id="grouproll2">揪團檢舉管理</a></li>
							</ul></li>

						<!-- Menu item -->
						<li class="nav-item"><a class="nav-link" href="###"
							id="ticketroll">票券管理</a></li>

						<!-- Menu item -->
						<li class="nav-item active"><a class="nav-link" href="###"
							id="guestroll">客服訊息管理</a></li>

						
					</ul>
					<!-- Sidebar menu end -->
<!-- 陳炳翰:功能加入id end -->
					<!-- Sidebar footer START -->
					<div
						class="d-flex align-items-center justify-content-between text-primary-hover mt-auto p-3">
						<a class="h6 fw-light mb-0 text-body"
							href="../front_end/index.html" data-bs-toggle="tooltip"
							data-bs-placement="top" aria-label="Sign out"> <i
							class="fa-solid fa-arrow-right-from-bracket"></i> 登出
						</a>
					</div>
					<!-- Sidebar footer END -->

				</div>
			</div>
		</nav>
		<!-- Sidebar END -->

        <!-- Page content START -->
        <div class="page-content">

            

            <!-- Page main content START -->
            <div class="page-content-wrapper p-xxl-4 container">
	            <div class="row">
	            	<div class="col-4">
						<h5 id="row"></h5>
	            	
	            	</div>
	            	<div class="col-8">
						<h5 id="statusOutput" class="statusOutput"></h5>
						
						<div id="messagesArea" class="panel message-area" ></div>
						<div class="panel input-area">
							<input id="message" class="text-field" type="text" placeholder="Message" onkeydown="if (event.keyCode == 13) sendMessage();" /> 
							<input type="submit" id="sendMessage" class="button" value="Send" onclick="sendMessage();" /> 
							<input type="button" id="connect" class="button" value="Connect" onclick="connect();" /> 
							<input type="button" id="disconnect" class="button" value="Disconnect" onclick="disconnect();" />
						</div>
	
	            	</div>
	            </div>


            </div>




            <!-- VIEW COUPON END -->
    </main>
	
	<!-- Bootstrap JS -->
	<script src="/flyday/back_end/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>

	<!-- Vendor -->
	<script
		src="/flyday/back_end/assets/vendor/overlay-scrollbar/js/overlayscrollbars.min.js"></script>
	<script src="/flyday/back_end/assets/vendor/choices/js/choices.min.js"></script>

	<!-- ThemeFunctions -->
	<script src="/flyday/back_end/assets/js/functions.js"></script>
	<script src="/flyday/back_end/myassets/js/empcheck.js"></script>
	
</body>
<script>
	var MyPoint = "/FriendWS/cs";
	var host = window.location.host;
	var path = window.location.pathname;
	var webCtx = path.substring(0, path.indexOf('/', 1));
	var endPointURL = "ws://" + window.location.host + webCtx + MyPoint;

	var statusOutput = document.getElementById("statusOutput");
	var messagesArea = document.getElementById("messagesArea");
	var self = 'cs';
	var webSocket;

	function connect() {
		// create a websocket
		webSocket = new WebSocket(endPointURL);

		webSocket.onopen = function(event) {
			console.log("Connect Success!");
			document.getElementById('sendMessage').disabled = false;
			document.getElementById('connect').disabled = true;
			document.getElementById('disconnect').disabled = false;
		};

		webSocket.onmessage = function(event) {
			var jsonObj = JSON.parse(event.data);
			if ("open" === jsonObj.type) {
// 				refreshFriendList(jsonObj);
			} else if ("history" === jsonObj.type) {
				messagesArea.innerHTML = '';
				var ul = document.createElement('ul');
				ul.id = "area";
				messagesArea.appendChild(ul);
				// 這行的jsonObj.message是從redis撈出跟好友的歷史訊息，再parse成JSON格式處理
				var messages = JSON.parse(jsonObj.message);
				for (var i = 0; i < messages.length; i++) {
					var historyData = JSON.parse(messages[i]);
					var showMsg = historyData.message;
					var li = document.createElement('li');
					// 根據發送者是自己還是對方來給予不同的class名, 以達到訊息左右區分
					historyData.sender === self ? li.className += 'me' : li.className += 'friend';
					li.innerHTML = showMsg;
					ul.appendChild(li);
				}
				messagesArea.scrollTop = messagesArea.scrollHeight;
			} else if ("chat" === jsonObj.type) {
				var li = document.createElement('li');
				jsonObj.sender === self ? li.className += 'me' : li.className += 'friend';
				
				refreshFriendList(jsonObj);
				
				li.innerHTML = jsonObj.message;
				console.log(li);
				document.getElementById("area").appendChild(li);
				messagesArea.scrollTop = messagesArea.scrollHeight;
			} else if ("close" === jsonObj.type) {
// 				refreshFriendList(jsonObj);
			}
			
		};

		webSocket.onclose = function(event) {
			console.log("Disconnected!");
		};
	}
	
	function sendMessage() {
		var inputMessage = document.getElementById("message");
		var friend = statusOutput.textContent;
		var message = inputMessage.value.trim();

		if (message === "") {
			alert("Input a message");
			inputMessage.focus();
		} else if (friend === "") {
			alert("Choose a friend");
		} else {
			var jsonObj = {
				"type" : "chat",
				"sender" : self,
				"receiver" : friend,
				"message" : message
			};
			webSocket.send(JSON.stringify(jsonObj));
			inputMessage.value = "";
			inputMessage.focus();
		}
	}
	
	// 有好友上線或離線就更新列表
	function refreshFriendList(jsonObj) {
		var userArray = JSON.parse(window.sessionStorage.getItem("items"));
		if (userArray === null) {
			userArray = new Array();
		}
		if (userArray.includes(jsonObj.sender)) {
			// 有先前聊天過
// 			var ghead = document.getElementsByTagName('h2');
// 			for (i = 0; i < ghead.length; i++) {
// 			    var gh = ghead[i];
// 			    var name = gh.innerHTML;
// 				if (name === jsonObj.sender) {
// 					gh.this.style.color = 'red';
// 				}
// 			}
		} else {
			userArray.push(jsonObj.sender);
			window.sessionStorage.setItem("items", JSON.stringify(userArray));
			var row = document.getElementById("row");
			row.innerHTML = '';
			for (var i = 0; i < userArray.length; i++) {
				if (userArray[i] === self) { continue; }
				row.innerHTML +='<div id=' + i + ' class="column" name="friendName" value=' + userArray[i] + ' ><h4>' + userArray[i] + '</h4></div>';
			}
		}
		addListener();
	}
	// 註冊列表點擊事件並抓取好友名字以取得歷史訊息
	function addListener() {
		var container = document.getElementById("row");
		container.addEventListener("click", function(e) {
			var friend = e.srcElement.textContent;
			updateFriendName(friend);
			var jsonObj = {
					"type" : "history",
					"sender" : self,
					"receiver" : friend,
					"message" : ""
				};
			webSocket.send(JSON.stringify(jsonObj));
		});
	}
	
	function disconnect() {
		webSocket.close();
		document.getElementById('sendMessage').disabled = true;
		document.getElementById('connect').disabled = false;
		document.getElementById('disconnect').disabled = true;
	}
	
	function updateFriendName(name) {
		statusOutput.innerHTML = name;
	}
	window.addEventListener('beforeunload', function (event) {
	    // 移除特定的 sessionStorage
	    sessionStorage.removeItem('items'); // 用你的鍵名替換 'yourKey'
	});
</script>
</html>