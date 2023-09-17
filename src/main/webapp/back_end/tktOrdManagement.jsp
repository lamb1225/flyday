<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page import="java.util.*"%>
<%@page import="web.tkt.tktc.controller.*"%>
<%@page import="web.tkt.tktc.entity.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<title>Flyday - 後台管理系統</title>

	<!-- Meta Tags -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="author" content="Webestica.com">
	<meta name="description" content="Booking - Multipurpose Online Booking Theme">

	<!-- Dark mode -->
	<script>
		const storedTheme = localStorage.getItem('theme')
 
		const getPreferredTheme = () => {
			if (storedTheme) {
				return storedTheme
			}
			return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
		}

		const setTheme = function (theme) {
			if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				document.documentElement.setAttribute('data-bs-theme', 'dark')
			} else {
				document.documentElement.setAttribute('data-bs-theme', theme)
			}
		}

		setTheme(getPreferredTheme())

		window.addEventListener('DOMContentLoaded', () => {
		    var el = document.querySelector('.theme-icon-active');
			if(el != 'undefined' && el != null) {
				const showActiveTheme = theme => {
				const activeThemeIcon = document.querySelector('.theme-icon-active use')
				const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
				const svgOfActiveBtn = btnToActive.querySelector('.mode-switch use').getAttribute('href')

				document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
					element.classList.remove('active')
				})

				btnToActive.classList.add('active')
				activeThemeIcon.setAttribute('href', svgOfActiveBtn)
			}

			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
				if (storedTheme !== 'light' || storedTheme !== 'dark') {
					setTheme(getPreferredTheme())
				}
			})

			showActiveTheme(getPreferredTheme())

			document.querySelectorAll('[data-bs-theme-value]')
				.forEach(toggle => {
					toggle.addEventListener('click', () => {
						const theme = toggle.getAttribute('data-bs-theme-value')
						localStorage.setItem('theme', theme)
						setTheme(theme)
						showActiveTheme(theme)
					})
				})

			}
		})
		
	</script>

	<!-- Favicon -->
	<link rel="shortcut icon" href="/flyday/back_end/myassets/logo_noliteral.png">

	<!-- Google Font -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Poppins:wght@400;500;700&display=swap">

	<!-- Plugins CSS -->
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/front_end/assets/vendor/font-awesome/css/all.min.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/front_end/assets/vendor/bootstrap-icons/bootstrap-icons.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/front_end/assets/vendor/overlay-scrollbar/css/overlayscrollbars.min.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/front_end/assets/vendor/choices/css/choices.min.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/front_end/assets/vendor/glightbox/css/glightbox.css">

	<!-- Theme CSS -->
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/front_end/assets/css/style.css">

</head>

<body>

<!-- **************** MAIN CONTENT START **************** -->
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
							aria-expanded="true" aria-controls="collapseguest" id="buyroll">
								訂購管理系統 </a> <!-- Submenu -->
							<ul class="nav collapse flex-column show" id="collapseorder"
								data-bs-parent="#navbar-sidebar">
								<li class="nav-item active"><a class="nav-link" href="###" id="buy1">票券訂單管理</a></li>
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
						<li class="nav-item"><a class="nav-link" href="###"
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
	
		<!-- Top bar START -->
			<nav class="navbar top-bar navbar-light py-0 py-xl-3">
				<div class="container-fluid p-0">
					<div class="d-flex align-items-center w-100">

						<!-- Logo START -->
						<div class="d-flex align-items-center d-xl-none">
							<a class="navbar-brand" href="../front_end/index.html"> <img
								class="navbar-brand-item h-40px" src="myassets/logo.svg" alt="">
							</a>
						</div>
						<!-- Logo END -->

						<!-- Toggler for sidebar START -->
						<div class="navbar-expand-xl sidebar-offcanvas-menu">
							<button class="navbar-toggler me-auto p-2" type="button"
								data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar"
								aria-controls="offcanvasSidebar" aria-expanded="false"
								aria-label="Toggle navigation" data-bs-auto-close="outside">
								<i class="bi bi-list text-primary fa-fw"
									data-bs-target="#offcanvasMenu"></i>
							</button>
						</div>
						<!-- Toggler for sidebar END -->

						<!-- Top bar left -->
						<div class="navbar-expand-lg ms-auto ms-xl-0">
							<!-- Topbar menu START -->
							<div class="collapse navbar-collapse w-100 z-index-1"
								id="navbarTopContent"></div>
							<!-- Topbar menu END -->
						</div>
						<!-- Top bar left END -->

						<!-- Top bar right START -->
						<ul
							class="nav flex-row align-items-center list-unstyled ms-xl-auto">
							<!-- Dark mode options START -->
							<li class="nav-item dropdown ms-3">
								<button class="nav-notification lh-0 btn btn-light p-0 mb-0"
									id="bd-theme" type="button" aria-expanded="false"
									data-bs-toggle="dropdown" data-bs-display="static">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
										fill="currentColor"
										class="bi bi-circle-half fa-fw theme-icon-active"
										viewBox="0 0 16 16">
									<path
											d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
									<use href="#"></use>
								</svg>
								</button>

								<ul class="dropdown-menu min-w-auto dropdown-menu-end"
									aria-labelledby="bd-theme">
									<li class="mb-1">
										<button type="button"
											class="dropdown-item d-flex align-items-center"
											data-bs-theme-value="light">
											<svg width="16" height="16" fill="currentColor"
												class="bi bi-brightness-high-fill fa-fw mode-switch me-1"
												viewBox="0 0 16 16">
											<path
													d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
											<use href="#"></use>
										</svg>
											Light
										</button>
									</li>
									<li class="mb-1">
										<button type="button"
											class="dropdown-item d-flex align-items-center"
											data-bs-theme-value="dark">
											<svg xmlns="http://www.w3.org/2000/svg" width="16"
												height="16" fill="currentColor"
												class="bi bi-moon-stars-fill fa-fw mode-switch me-1"
												viewBox="0 0 16 16">
											<path
													d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
											<path
													d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
											<use href="#"></use>
										</svg>
											Dark
										</button>
									</li>
									<li>
										<button type="button"
											class="dropdown-item d-flex align-items-center active"
											data-bs-theme-value="auto">
											<svg xmlns="http://www.w3.org/2000/svg" width="16"
												height="16" fill="currentColor"
												class="bi bi-circle-half fa-fw mode-switch"
												viewBox="0 0 16 16">
											<path
													d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
											<use href="#"></use>
										</svg>
											Auto
										</button>
									</li>
								</ul>
							</li>
							<!-- Dark mode options END-->

						</ul>
						<!-- Top bar right END -->
					</div>
				</div>
			</nav>
			<!-- Top bar END -->
	
		<!-- Page main content START -->
		<div class="page-content-wrapper p-xxl-4">

			<!-- Booking table START -->
			<div class="card shadow mt-3">
				<!-- Card header START -->
				<div class="card-header border-bottom">
					<h5 class="card-header-title">票券訂單管理</h5>
				</div>
				<!-- Card header END -->

				<!-- Card body START -->
				<div class="card-body">
					<!-- Search and select START -->
					<div class="row g-3 align-items-center justify-content-between mb-3">
						<!-- Search -->
						<div class="col-md-8">
							<form class="rounded position-relative">
								<input class="form-control pe-5" type="search" placeholder="請輸入訂單編號，例:BS-1" aria-label="Search" id="searchOrdNo">
								<button class="btn border-0 px-3 py-0 position-absolute top-50 end-0 translate-middle-y" type="button" id="searchAll"><i class="fas fa-search fs-6"></i></button>
							</form>
						</div>

						<!-- Select option -->
						<div class="col-md-3">
							<!-- Short by filter -->
<%-- 							<FORM id="orderBy" METHOD="post" ACTION="<%=request.getContextPath()%>/tkt/Order"> --%>
<!-- 							<input type="hidden" name="action" value="getBackAllOrd"> -->
								<select class="form-select js-choice" aria-label=".form-select-sm" id="orderByAll">
									<option value="">Sort by</option>
									<option value="1">最新</option>
									<option value="2">最舊</option>
								</select>
<!-- 							</FORM> -->
						</div>
					</div>
					<!-- Search and select END -->

					<!-- Table head -->
					<div class="bg-light rounded p-3 d-none d-lg-block">
						<div class="row row-cols-7 g-4">
							<div class="col"><h6 class="mb-0">訂購會員</h6></div>
							<div class="col"><h6 class="mb-0">會員編號</h6></div>
							<div class="col"><h6 class="mb-0">訂單編號</h6></div>
							<div class="col"><h6 class="mb-0">下訂日期</h6></div>
							<div class="col"><h6 class="mb-0">實付金額</h6></div>
							<div class="col"><h6 class="mb-0">訂單狀態</h6></div>
							<div class="col"><h6 class="mb-0">訂單明細</h6></div>
						</div>
					</div>
					<div style="display: none;">
					<%=j = 0%>
					</div>
					<form id="myForm">
					<c:forEach var="tktOrd" items="${tktOrdList}">
					<%!int j = 0; %>
					<!-- Table data -->
					<div class="row row-cols-xl-7 align-items-lg-center border-bottom g-4 px-2 py-4 ordItem" id="itemStart<%=j%>" value="<%=j%>">
						<!-- Data item -->
						<div class="col">
							<small class="d-block d-lg-none">訂購會員</small>
							<div class="d-flex align-items-center">
								<!-- Avatar -->
								<div class="avatar avatar-xs flex-shrink-0">
									<img class="avatar-img rounded-circle memPic" src="${tktOrd.showPic}" alt="">
								</div>
								<!-- Info -->
								<div class="ms-2">
									<h6 class="mb-0 fw-light">${tktOrd.memName}</h6>
								</div>
							</div>
						</div>	

						<!-- Data item -->
						<div class="col">
							<small class="d-block d-lg-none">會員編號</small>
							<h6 class="mb-0 fw-normal ms-4" name="memNo<%=j%>">${tktOrd.memNo}</h6>
						</div>

						<!-- Data item -->
						<div class="col">
							<small class="d-block d-lg-none">訂單編號</small>
							<h6 class="mb-0 fw-normal ms-2 ordNo" name="ordNo<%=j%>">BS-${tktOrd.tktOrdNo}</h6>
							<input type="hidden" name="tktOrdNo<%=j%>" value="${tktOrd.tktOrdNo}">
						</div>

						<!-- Data item -->
						<div class="col">
							<small class="d-block d-lg-none">下訂日期</small>
							<h6 class="mb-0 fw-normal"><fmt:formatDate pattern="yyyy-MM-dd" value="${tktOrd.ordDate}" /></h6>
						</div>

						<!-- Data item -->
						<div class="col">
							<small class="d-block d-lg-none">實付金額</small>
							<h6 class="text-success mb-0 ms-2">$ ${tktOrd.payPrice}</h6>
						</div>
						
						<!-- Data item -->
						<div class="col">
							<small class="d-block d-lg-none">訂單狀態</small>
							<c:choose>
					            <c:when test="${tktOrd.ordStat eq 0}">
					            <div class="badge bg-success bg-opacity-10 text-success ms-1">
					                已付款
					            </div>
					            </c:when>
					            <c:when test="${tktOrd.ordStat eq 1}">
					            <div class="badge bg-warning bg-opacity-10 text-warning ms-1">
					                處理中
					            </div>
					            </c:when>
					            <c:when test="${tktOrd.ordStat eq 2}">
					            <div class="badge bg-danger bg-opacity-10 text-danger ms-1">
					                已退款
					            </div>
					            </c:when>
					        </c:choose>
					        
					        <div class="itemInfo">
								<input class="ordStat" type="hidden" id="ordStat<%=j%>"
									name="ordStat<%=j%>" value="${tktOrd.ordStat}">
							</div>
					        <input type="hidden" name="action" value="cancelOrd">
					        <div class="col">
							    <select class="badge bg-primary bg-opacity-10 text-secondary ms-1 editStat" aria-label=".form-select-sm" id="editStat<%=j++%>">
							    	<option>更改狀態</option>
							        <option value="0" class="bg-success bg-opacity-10 text-success">已付款</option>
							        <option value="1" class="bg-warning bg-opacity-10 text-warning">處理中</option>
							        <option value="2" class="bg-danger bg-opacity-10 text-danger">已退款</option>
							    </select>
							</div>
						</div>

						<!-- Data item -->
						<div class="col">
						<a href="<%=request.getContextPath()%>/tkt/Order?action=getBackOrdDetails&tktOrdNo=${tktOrd.tktOrdNo}" class="btn btn-sm btn-light mb-0 ms-1">
						View</a>
						</div>
					</div>
					</c:forEach>
					<input type="hidden" id="totalItem" name="itemAmount" value="<%=j%>">
					</form>
				</div>
				<!-- Card body END -->

				<!-- Card footer START -->
				<div class="card-footer pt-0">
					<!-- Pagination and content -->
					<div class="d-sm-flex justify-content-sm-between align-items-sm-center">
						<!-- Content -->
						<p class="mb-sm-0 text-center text-sm-start">Showing 1 to 8 of 20 entries</p>
						<!-- Pagination -->
						<nav class="mb-sm-0 d-flex justify-content-center" aria-label="navigation">
							<ul class="pagination pagination-sm pagination-primary-soft mb-0">
								<li class="page-item disabled">
									<a class="page-link" href="#" tabindex="-1">Prev</a>
								</li>
								<li class="page-item"><a class="page-link" href="#">1</a></li>
								<li class="page-item active"><a class="page-link" href="#">2</a></li>
								<li class="page-item disabled"><a class="page-link" href="#">..</a></li>
								<li class="page-item"><a class="page-link" href="#">15</a></li>
								<li class="page-item">
									<a class="page-link" href="#">Next</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>
				<!-- Card footer END -->
			</div>
			<!-- Booking table END -->

		</div>
		<!-- Page main content END -->
	</div>
	<!-- Page content END -->
	
	</main>
<!-- **************** MAIN CONTENT END **************** -->

<!-- Bootstrap JS -->
<script src="<%=request.getContextPath()%>/front_end/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>

<!-- Vendor -->
<script src="<%=request.getContextPath()%>/front_end/assets/vendor/overlay-scrollbar/js/overlayscrollbars.min.js"></script>
<script src="<%=request.getContextPath()%>/front_end/assets/vendor/choices/js/choices.min.js"></script>
<script src="<%=request.getContextPath()%>/front_end/assets/vendor/glightbox/js/glightbox.js"></script>

<!-- ThemeFunctions -->
<script src="<%=request.getContextPath()%>/front_end/assets/js/functions.js"></script>

<!--Sweetalert2 -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>

    <script src="../back_end/myassets/js/empcheck.js"></script>

<script>

	//查詢
	const searchOrdNo = document.getElementById("searchOrdNo");
	const ordNoList = document.getElementsByClassName("ordNo");
	const searchAll = document.getElementById("searchAll");
	const ordItem = document.getElementsByClassName("ordItem");
	
	searchAll.addEventListener("click", function(){
		
		for(let j = 0; j < ordNoList.length; j++){
			ordItem[j].style="display:flex;";
			if(ordNoList[j].textContent !== searchOrdNo.value.trim() && searchOrdNo.value.trim() !== ""){
				ordItem[j].style="display:none;";
			}
		}
	});
	
	//排序
	const orderByAll = document.getElementById("orderByAll");
	const itemStart = document.getElementsByClassName("ordItem");
	
	document.addEventListener("DOMContentLoaded", function () {

	    orderByAll.addEventListener("change", function () {
	        const selectedOrder = this.value;
	        const ordItems = Array.from(document.querySelectorAll(".ordItem"));

		if (selectedOrder === "1") {
            // 最新排序
            Array.from(itemStart).sort(function (a, b) {
                const ordNoA = a.querySelector(".ordNo").textContent.split("-")[1];
                const ordNoB = b.querySelector(".ordNo").textContent.split("-")[1];
                return ordNoB - ordNoA;
            }).forEach(function (element) {
                // 把一個一個排序放回去
                element.parentNode.appendChild(element);
            });
        } else if (selectedOrder === "2") {
            // 最舊排序
            Array.from(itemStart).sort(function (a, b) {
                const ordNoA = a.querySelector(".ordNo").textContent.split("-")[1];
                const ordNoB = b.querySelector(".ordNo").textContent.split("-")[1];
                return ordNoA - ordNoB;
            }).forEach(function (element) {
                element.parentNode.appendChild(element);
            });
            
          //最就排序的更改狀態
        	const editStat = document.getElementsByClassName("editStat");
        	const ordStat = document.getElementsByClassName("ordStat");
        	const form = document.getElementById("myForm");
        	
        	for (let i = 0; i < editStat.length; i++) {
        		editStat[i].addEventListener("change", function(){
        			
        			if(editStat[i].value >= 0){
        			Swal.fire({
        	    		  title: '確定要更改嗎?',
        	    		  icon: 'warning',
        	    		  showCancelButton: true,
        	    		  confirmButtonColor: '#3085d6',
        	    		  cancelButtonColor: '#d33',
        	    		  confirmButtonText: 'confirm'
        	    		}).then((result) => {
        	    		  if (result.isConfirmed) {
        	    		    Swal.fire(
        	    		      '修改成功!',
        	    		      'success'
        	    		    )
        	    		    
        	    		    const selectedValue = editStat[i].value;
        	    		    ordStat[i].setAttribute("value", selectedValue);
        	    		    
        	    		    const formData = new FormData(form);
        			        formData.append(ordStat[i], ordStat[i].value);
        			        
        			        fetch("<%=request.getContextPath()%>/tkt/Order",{
        						method: "POST",
        						body: formData
        					}).then(() => {
        			            location.reload();
        			        });
        	    		  }
        				})
        			}
        		});
        	}
        }
	    });
	});

	
	//更改狀態
	const editStat = document.getElementsByClassName("editStat");
	const ordStat = document.getElementsByClassName("ordStat");
	const form = document.getElementById("myForm");
	
	for (let i = 0; i < editStat.length; i++) {
		editStat[i].addEventListener("change", function(){
			
			if(editStat[i].value >= 0){
			Swal.fire({
	    		  title: '確定要更改嗎?',
	    		  icon: 'warning',
	    		  showCancelButton: true,
	    		  confirmButtonColor: '#3085d6',
	    		  cancelButtonColor: '#d33',
	    		  confirmButtonText: 'confirm'
	    		}).then((result) => {
	    		  if (result.isConfirmed) {
	    		    Swal.fire(
	    		      '修改成功!',
	    		      'success'
	    		    )
	    		    
	    		    const selectedValue = editStat[i].value;
	    		    ordStat[i].setAttribute("value", selectedValue);
	    		    
	    		    const formData = new FormData(form);
			        formData.append(ordStat[i], ordStat[i].value);
			        
			        fetch("<%=request.getContextPath()%>/tkt/Order",{
						method: "POST",
						body: formData
					}).then(() => {
			            location.reload();
			        });
	    		  }
				})
			}
		});
	}
	
	const memPics = document.querySelectorAll('.memPic');

	memPics.forEach((memPic) => {
		const srcValue = memPic.getAttribute('src');
		//如果會員圖片是空的話，要顯示背景圖
	    if (!srcValue || srcValue.trim() === '') {
	        memPic.src = '/flyday/front_end/myassets/logo_noliteral.png';
	    }
	});
	
</script>

</body>
</html>