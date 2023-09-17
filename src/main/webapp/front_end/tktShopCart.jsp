<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page import="java.util.*"%>
<%@page import="web.tkt.tktc.controller.*"%>
<%@page import="web.tkt.tktc.entity.*"%>

<!DOCTYPE html>
<html lang="zh-hant">
<head>
<title>Flyday - 票券購物車</title>

<!-- Meta Tags -->
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="author" content="Webestica.com">
<meta name="description"
	content="Flyday - 票券購物車">

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
<link rel="shortcut icon" href="<%=request.getContextPath()%>/front_end/myassets/logo_noliteral.png">

<!-- Google Font -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Poppins:wght@400;500;700&display=swap">

<!-- Plugins CSS -->
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/front_end/assets/vendor/font-awesome/css/all.min.css">
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/front_end/assets/vendor/bootstrap-icons/bootstrap-icons.css">
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/front_end/assets/vendor/choices/css/choices.min.css">
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/front_end/assets/vendor/flatpickr/css/flatpickr.min.css">
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/front_end/assets/vendor/stepper/css/bs-stepper.min.css">

<!-- Theme CSS -->
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/front_end/assets/css/style.css">

<style>
.form-control-centered {
	width: 15%;
	text-align: center;
	display: flex;
}

</style>

<style>
.transparent-button {
	background-color: transparent;
	border: none;
}
</style>

<!-- navbar 自訂CSS-->
<style>
	.my-cart-number{
	padding: .0625rem .185rem;
	}

	.my-card-image{
	width: 100%;
	height: 100%;
	}
</style>

</head>

<body>

	<!-- Header START -->
<header class="navbar-light header-sticky">
	<!-- Logo Nav START -->
	<nav class="navbar navbar-expand-xl">
		<div class="container">
		<!-- Logo START -->
		<a class="navbar-brand" href="/flyday/front_end/index.html">
			<img class="light-mode-item navbar-brand-item" src="/flyday/front_end/myassets/logo.svg" alt="logo">
			<img class="dark-mode-item navbar-brand-item" src="/flyday/front_end/myassets/logo.svg" alt="logo">
		</a>
		<!-- Logo END -->
	
		<!-- Responsive navbar toggler -->
		<button class="navbar-toggler ms-auto mx-3 me-0 p-0 p-sm-2" type="button" data-bs-toggle="collapse"
			data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
			aria-label="Toggle navigation">
			<span class="navbar-toggler-animation">
			<span></span>
			<span></span>
			<span></span>
			</span>
		</button>
	
		<!-- Main navbar START -->
		<div class="navbar-collapse collapse" id="navbarCollapse">
			<ul class="navbar-nav navbar-nav-scroll">
	
			<!-- Nav item 行程 -->
			<li class="nav-item dropdown">
				<a class="nav-link" href="/flyday/front_end/package-list4.html" aria-haspopup="true" aria-expanded="false">觀光行程</a>
			</li>

			<!-- Nav item 票券 -->
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="#" id="pagesMenu" data-bs-toggle="dropdown" aria-haspopup="true"
				aria-expanded="false">景點門票</a>
				<ul class="dropdown-menu" aria-labelledby="pagesMenu">
  
				<!-- Dropdown submenu -->
				<li class="dropdown-submenu dropend">
				  <a class="dropdown-item" href="/flyday/tktt/tkt-list.html">門票搜尋</a>
				</li>
  
				<!-- Dropdown submenu -->
				<li class="dropdown-submenu dropend">
				  <a class="dropdown-item" href="/flyday/tktt/tkt-list.html#tktSort0">主題樂園</a>
				</li>
  
				<!-- Dropdown submenu -->
				<li class="dropdown-submenu dropend">
				  <a class="dropdown-item" href="/flyday/tktt/tkt-list.html#tktSort1">景點門票</a>
				</li>
  
				<!-- Dropdown submenu -->
				<li class="dropdown-submenu dropend">
				  <a class="dropdown-item" href="/flyday/tktt/tkt-list.html#tktSort2">水族館</a>
				</li>
  
				<!-- Dropdown submenu -->
				<li class="dropdown-submenu dropend">
				  <a class="dropdown-item" href="/flyday/tktt/tkt-list.html#tktSort3">動物園</a>
				</li>
  
				<!-- Dropdown submenu -->
				<li class="dropdown-submenu dropend">
				  <a class="dropdown-item" href="/flyday/tktt/tkt-list.html#tktSort4">博物館</a>
				</li>
  
				<!-- Dropdown submenu -->
				<li class="dropdown-submenu dropend">
				  <a class="dropdown-item" href="/flyday/tktt/tkt-list.html#tktSort5">美術館</a>
				</li>
  
				<!-- Dropdown submenu -->
				<li class="dropdown-submenu dropend">
				  <a class="dropdown-item" href="/flyday/tktt/tkt-list.html#tktSort6">展覽</a>
				</li>
  
				<!-- Dropdown submenu -->
				<li class="dropdown-submenu dropend">
				  <a class="dropdown-item" href="/flyday/tktt/tkt-list.html#tktSort7">其他票券</a>
				</li>
  
				</ul>
			</li>
	
			<!-- Nav item 揪團 -->
			<li class="nav-item dropdown">
				<a class="nav-link" href="/flyday/Act/hotel-grid.html" id="accounntMenu" aria-haspopup="true" aria-expanded="false">揪團活動</a>
			</li>
	
			<!-- Nav item Contact -->
			<li class="nav-item"> <a class="nav-link" href="/flyday/front_end/Frequent-QA.html">常見問題</a></li>
			</ul>
		</div>
		<!-- Main navbar END -->
	
		<!-- Profile and Notification START +購物車 -->
		<ul class="nav flex-row align-items-center list-unstyled ms-xl-auto">
	
			<!-- 購物車 dropdown START -->
			<li class="nav-item ms-0 ms-3 dropdown hidable">
			<!-- 購物車 button -->
			<a class="nav-link p-0" href="#cartOffcanvas" data-bs-toggle="offcanvas" role="button" aria-expanded="false"
				data-bs-auto-close="outside">
				<!-- 購物車數量 -->
				<span class="badge bg-primary fs-xs position-absolute end-0 top-0 me-n1 my-cart-number">3</span>
				<i class="bi bi-cart fa-fw fs-5"></i>
			</a>
			</li>
	
	
			<!-- Notification dropdown START -->
			<!-- <li class="nav-item ms-0 ms-3 dropdown hidable"> -->
				<!-- Notification button -->
				<!-- <a class="nav-link p-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"
					data-bs-auto-close="outside">
					<i class="bi bi-bell fa-fw fs-5"></i>
				</a> -->
				<!-- Notification dote -->
				<!-- <span class="notif-badge animation-blink"></span> -->
	
				<!-- Notification dropdown menu START -->
				<!-- <div class="dropdown-menu dropdown-animation dropdown-menu-end dropdown-menu-size-md p-0 shadow-lg">
					<div class="card bg-transparent"> -->
					<!-- Card header -->
					<!-- <div class="card-header bg-transparent d-flex justify-content-between align-items-center border-bottom">
						<h6 class="m-0">通知<span class="badge bg-danger bg-opacity-10 text-danger ms-2">?筆新通知</span></h6>
						<a class="small" href="#">清除全部</a>
					</div> -->
	
					<!-- Card body START -->
					<!-- <div class="card-body p-0">
						<ul class="list-group list-group-flush list-unstyled p-2"> -->
						<!-- Notification item -->
						<!-- <li>
							<a href="#" class="list-group-item list-group-item-action rounded notif-unread border-0 mb-1 p-3">
							<h6 class="mb-2">排程器送來的通知</h6>
							<p class="mb-0 small">Find the flexible ticket on flights around the
								world. Start searching today</p>
							<span>Wednesday</span>
							</a>
						</li> -->
						<!-- Notification item -->
						<!-- <li>
							<a href="#" class="list-group-item list-group-item-action rounded border-0 mb-1 p-3">
							<h6 class="mb-2">Sunshine saving are here 🌞 save 30% or more on a stay
							</h6>
							<span>15 Nov 2022</span>
							</a>
						</li>
						</ul>
					</div> -->
					<!-- Card body END -->
	
					<!-- Card footer -->
					<!-- <div class="card-footer bg-transparent text-center border-top">
						<a href="#" class="btn btn-sm btn-link mb-0 p-0">查看所有通知</a>
					</div>
					</div>
				</div> -->
				<!-- Notification dropdown menu END -->
			<!-- </li> -->
			<!-- Notification dropdown END -->
	
			<!-- Profile dropdown START -->
			<li class="nav-item ms-3 dropdown hidable">
				<!-- Avatar -->
				<a class="avatar avatar-xs p-0" href="#" id="profileDropdown" role="button" data-bs-auto-close="outside"
					data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false">
					<img class="avatar-img rounded-circle mem-pic-nav" src="/flyday/front_end/myassets/logo_noliteral.png" alt="avatar">
				</a>
	
				<!-- Profile dropdown START -->
				<ul class="dropdown-menu dropdown-animation dropdown-menu-end shadow pt-3"
					aria-labelledby="profileDropdown">
					<!-- Profile info -->
					<li class="px-3 mb-3">
					<div class="d-flex align-items-center">
						<!-- Avatar -->
						<div class="avatar me-3">
						<img class="avatar-img rounded-circle shadow mem-pic-nav" src="/flyday/front_end/myassets/logo_noliteral.png" alt="avatar">
						</div>
						<div>
						<a class="h6 mt-2 mt-sm-0" href="#" id="acc-nav">testacc01</a>
						<p class="small m-0" id="mem-level-nav">普通會員</p>
						</div>
					</div>
					</li>
	
					<!-- Links -->
					<li>
					<hr class="dropdown-divider">
					</li>
					<li><a class="dropdown-item" href="/flyday/front_end/account-profile.html"><i class="bi bi-person fa-fw me-2"></i>基本資料設定</a></li>
					<li><a class="dropdown-item" href="/flyday/front_end/account-pkgorder.html"><i class="bi bi-card-list fa-fw me-2"></i>我的訂單</a></li>
					<li><a class="dropdown-item" href="/flyday/Act/account-bookings.html"><i class="fa-solid fa-people-group fa-fw me-2"></i>我的揪團</a></li>
					<li><a class="dropdown-item" href="/flyday/chat.do"><i class="bi bi-chat-left-text fa-fw me-2"></i>聯繫客服</a></li>
					<li><a class="dropdown-item bg-danger-soft-hover" id="logoutNav" href="#"><i class="bi bi-power fa-fw me-2"></i>登出</a></li>
					<li>
					<hr class="dropdown-divider">
					</li>
	
					<!-- Dark mode options START -->
					<li>
					<div
						class="nav-pills-primary-soft theme-icon-active d-flex justify-content-between align-items-center p-2 pb-0">
						<span>Mode:</span>
						<button type="button" class="btn btn-link nav-link text-primary-hover mb-0 p-0"
						data-bs-theme-value="light" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Light">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
							class="bi bi-sun fa-fw mode-switch" viewBox="0 0 16 16">
							<path
							d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
							<use href="#"></use>
						</svg>
						</button>
						<button type="button" class="btn btn-link nav-link text-primary-hover mb-0 p-0"
						data-bs-theme-value="dark" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Dark">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
							class="bi bi-moon-stars fa-fw mode-switch" viewBox="0 0 16 16">
							<path
							d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
							<path
							d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
							<use href="#"></use>
						</svg>
						</button>
						<button type="button" class="btn btn-link nav-link text-primary-hover mb-0 p-0 active"
						data-bs-theme-value="auto" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Auto">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
							class="bi bi-circle-half fa-fw mode-switch" viewBox="0 0 16 16">
							<path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
							<use href="#"></use>
						</svg>
						</button>
					</div>
					</li>
					<!-- Dark mode options END-->
				</ul>
				<!-- Profile dropdown END -->
			</li>
			<!-- Profile dropdown END -->
	
			<!-- 未登入時的註冊按鈕 -->
			<li class="ms-3">
				<a class="btn btn-sm btn-outline-secondary" id="login-btn-nav" href="/flyday/front_end/sign-in.html" style="display: none;">登入/註冊</a>
			</li>
	
		</ul>
		<!-- Profile and Notification End -->
	
		</div>
	</nav>
	<!-- Logo Nav END -->
	<!-- Cart offcanvas-->
	<div class="offcanvas offcanvas-end py-2 p-sm-4 p-md-5" id="cartOffcanvas" style="width: 680px;">
		<!-- Title -->
		<div class="px-2 pt-3">
		<div class="d-flex justify-content-between align-items-center border-bottom">
			<h4 class="offcanvas-title d-flex align-items-center mb-2">你的購物車
			<span class="fs-base fw-normal text-muted ms-3">(3 items)</span>
			</h4>
			<button class="btn-close mb-1 me-n1" type="button" data-bs-dismiss="offcanvas"
			data-bs-target="#cartOffcanvas"></button>
		</div>
		</div>
	
		<ul class="nav nav-tabs nav-justified mb-3">
		<li class="nav-item"> <a class="nav-link active" data-bs-toggle="tab" href="#tab-pkg" id="my_pkg_cart">行程購物車</a>
		</li>
		<li class="nav-item"> <a class="nav-link" data-bs-toggle="tab" href="#tab-tkt" id="my_tkt_cart">票券購物車 </a> </li>
		</ul>
		<!--購物車清單範圍-->
		<div class="offcanvas-body">
		<div class="tab-content">
			<div class="tab-pane show active" id="tab-pkg">
			<!-- items -->
			<div class="card mb-3" style="max-width: 540px;">
				<div class="row g-0">
				<!-- <div class="col-md-1 d-flex">
					<div class="form-check align-self-center">
					<input class="form-check-input pkg-cart-check" type="checkbox" value="" name="pkg-check" id="pkg-check1">
					</div>
				</div> -->
				<div class="col-md-5">
					<img src="https://picsum.photos/500/400?random=4" class="img-fluid rounded-start my-card-image">
				</div>
				<div class="col-md-7">
					<div class="card-body">
					<h5 class="card-title">行程標題1</h5>
					<p class="card-text">行程方案行程方案行程方案行程方案行程方案行程方案行程方案</p>
					<div class="d-flex justify-content-end">
						<p class="m-0 align-self-center me-auto text-primary">$22</p>
					</div>
					</div>
				</div>
				</div>
			</div>
			<!-- items -->
			<div class="card mb-3" style="max-width: 540px;">
				<div class="row g-0">
				<!-- <div class="col-md-1 d-flex">
					<div class="form-check align-self-center">
					<input class="form-check-input pkg-cart-check" type="checkbox" value="" name="pkg-check" id="pkg-check2">
					</div>
				</div> -->
				<div class="col-md-5">
					<img src="https://picsum.photos/500/400?random=5" class="img-fluid rounded-start my-card-image">
				</div>
				<div class="col-md-7">
					<div class="card-body">
					<h5 class="card-title">行程標題2</h5>
					<p class="card-text">行程方案行程方案行程方案行程方案行程方案行程方案行程方案</p>
					<div class="d-flex justify-content-end">
						<p class="m-0 align-self-center me-auto text-primary">$22</p>
					</div>
					</div>
				</div>
				</div>
			</div>
			
			<!-- items end-->
			</div>
			<div class="tab-pane" id="tab-tkt">
			<!-- items -->
			<div class="card mb-3" style="max-width: 540px;">
				<div class="row g-0">
				<!-- <div class="col-md-1 d-flex">
					<div class="form-check align-self-center">
					<input class="form-check-input tkt-cart-check" type="checkbox" value="" name="tkt-check" id="tkt-check1">
					</div>
				</div> -->
				<div class="col-md-5">
					<img src="https://picsum.photos/500/400?random=3" class="img-fluid rounded-start my-card-image">
				</div>
				<div class="col-md-7">
					<div class="card-body">
					<h5 class="card-title">票券標題1</h5>
					<p class="card-text">方案名稱1</p>
					<div class="d-flex justify-content-end">
						<p class="m-0 align-self-center me-auto text-primary">$22</p>
						<button class="btn btn-icon fs-xl my-minus-btn" type="button" data-decrement>-</button>
						<input class="form-control w-25 my-cart-quantity"type="number" value="1" readonly>
						<button class="btn btn-icon fs-xl my-plus-btn" type="button" data-increment>+</button>
					</div>
					</div>
				</div>
				</div>
			</div>
			<!-- items -->
			<div class="card mb-3" style="max-width: 540px;">
				<div class="row g-0">
				<!-- <div class="col-md-1 d-flex">
					<div class="form-check align-self-center">
					<input class="form-check-input tkt-cart-check" type="checkbox" value="" name="tkt-check" id="tkt-check2">
					</div>
				</div> -->
				<div class="col-md-5">
					<img src="https://picsum.photos/500/400?random=1" class="img-fluid rounded-start my-card-image">
				</div>
				<div class="col-md-7">
					<div class="card-body">
					<h5 class="card-title">票券標題2</h5>
					<p class="card-text">方案名稱2</p>
					<div class="d-flex justify-content-end">
						<p class="m-0 align-self-center me-auto text-primary">$22</p>
						<button class="btn btn-icon fs-xl my-minus-btn" type="button" data-decrement>-</button>
						<input class="form-control w-25 my-cart-quantity"type="number" value="1" readonly>
						<button class="btn btn-icon fs-xl my-plus-btn" type="button" data-increment>+</button>
					</div>
					</div>
				</div>
				</div>
			</div>
			
			<!-- items end-->
			</div>
		</div>
		</div>
		<!-- Action buttons-->
		<div class="container px-4">
		<div class="row g-0 mt-3 justify-content-between">
			<!-- <div class="col-3 d-flex ps-1"> -->
				<!-- <div class="form-check align-self-center ps-4"> -->
					<!-- <input class="form-check-input pkg-cart-check" type="checkbox" id="check-all"> -->
					<!-- <label class="form-check-label" for="check-all" id="check-all-content">全選行程</label> -->
				<!-- </div> -->
			<!-- </div> -->
			<div class="col-3 align-self-center ps-3 pb-3">
				<div class="fs-xl me-3">總金額:</div>
				<div class="h4 mb-0 text-primary">$92.00</div>
			</div>
			<div class="col-3 pb-3 mt-3 d-flex flex-row-reverse">
				<a class="btn btn-lg btn-primary" href="#" id="btn_cart">行程結帳<i class="ai-chevron-right ms-2 me-n1"></i></a>
			</div>
		</div>
	</div>        
</header>
<!-- Header END -->
	

	<!-- **************** MAIN CONTENT START **************** -->
	<main>

		<!-- =======================
Page Banner START -->
		<section class="py-0">
			<div class="container">
				<div class="row mt-4 align-items-center">
					<div class="col-12">
						<!-- Card START -->
						<div class="card bg-light overflow-hidden px-sm-5">
							<div class="row align-items-center g-4">

								<!-- Content -->
								<div class="col-sm-9">
									<div class="card-body">
										<!-- Breadcrumb -->
										<nav aria-label="breadcrumb">
											<ol class="breadcrumb breadcrumb-dots mb-0">
												<li class="breadcrumb-item"><a href="<%=request.getContextPath()%>/front_end/index.html"><i
														class="bi bi-house me-1"></i> Home</a></li>
											</ol>
										</nav>
										<!-- Title -->
										<h1 class="m-0 h2 card-title">Review your Booking</h1>
									</div>
								</div>

								<!-- Image -->
								<div class="col-sm-3 text-end d-none d-sm-block">
									<img src="<%=request.getContextPath()%>/front_end/assets/images/element/17.svg" class="mb-n4" alt="">
								</div>
							</div>
						</div>
						<!-- Card END -->
					</div>
				</div>
			</div>
		</section>
		<!-- =======================
Page Banner END -->

		<!-- =======================
Steps START -->
		<section>
			<div class="container">
				<div id="stepper" class="bs-stepper stepper-outline">
					<!-- Step Buttons START -->
					<div class="bs-stepper-header" role="tablist">
						<!-- Step 1 -->
						<div class="step" data-target="#step-1">
							<div class="text-center">
								<button type="button" class="btn btn-link step-trigger mb-0"
									role="tab" id="steppertrigger1" aria-controls="step-1">
									<span class="bs-stepper-circle">1</span>
								</button>
								<h6 class="bs-stepper-label d-none d-md-block">購物車</h6>
							</div>
						</div>
						<div class="line"></div>

						<!-- Step 2 -->

						<div class="step" data-target="#step-2">
							<div class="text-center">
								<button type="button" class="btn btn-link step-trigger mb-0"
									role="tab" id="steppertrigger2" aria-controls="step-2">
									<span class="bs-stepper-circle">2</span>
								</button>
								<h6 class="bs-stepper-label d-none d-md-block">填寫資料</h6>
							</div>
						</div>
						<div class="line"></div>

						<!-- Step 3 -->
						<div class="step" data-target="#step-3">
							<div class="text-center">
								<button type="button" class="btn btn-link step-trigger mb-0"
									role="tab" id="steppertrigger3" aria-controls="step-3">
									<span class="bs-stepper-circle">3</span>
								</button>
								<h6 class="bs-stepper-label d-none d-md-block">付款</h6>
							</div>
						</div>
					</div>
					<!-- Step Buttons END -->

					<!-- Step content START -->
					<div class="bs-stepper-content p-0 pt-4">
						<div class="row g-4">

							<!-- Main content START -->
							<div class="col-xl-8">
								<form onsubmit="return false" id="myForm">

									<!-- Step 1 content START -->
									<div id="step-1" role="tabpanel" class="content fade"
										aria-labelledby="steppertrigger1">
										<div class="vstack gap-4">
											<!-- Title -->
											<h4 class="mb-0">購物車</h4>
											<hr class="my-0">

											<!--先隱藏購物車空空的畫面-->
											<div class="container" id="nothing" style="display: none">
												<div class="row align-items-center">
													<div class="col-md-10 text-center mx-auto">
														<!-- Image -->
														<img src="<%=request.getContextPath()%>/front_end/assets/images/element/error.svg"
															class="h-lg-500px mb-4" alt="">
														<!-- Subtitle -->
														<h1>Nothing in here</h1>
														<!-- Button -->
														<!--要再放票券網址進來 -->
														<a href="/flyday/tktt/tkt-list.html" class="btn btn-light mb-0 mt-3"><i
															class="bi bi-shop-window"></i> go shopping</a>
													</div>
												</div>
											</div>

											<c:choose>
												<c:when test="${not empty tktJoinList}">
													<!-- Tour list START -->
													<div style="display: none;">
														<%=j = 0%>
													</div>
													<c:forEach var="tktJoin" items="${tktJoinList}">
														<%!int j = 0;%>
														<div class="card shadow rounded-2 overflow-hidden"
															id="itemStart<%=j%>" value="<%=j%>">
															<div class="row g-0">
																<!-- Image -->
																<div class="col-sm-6 col-md-4" style="display: flex;">
																	<div class="align-self-center ps-4">
<%-- 																		<%!int i = 0;%> --%>
<!-- 																		<img -->
<%-- 																			src="https://picsum.photos/500/400?random=<%=i++%>" --%>
<!-- 																			alt=""> -->
																		<img
																			src="${tktJoin.showPic}"
																			alt="">
																	</div>
																</div>

																<!-- Card Body START -->
																<div class="col-sm-6 col-md-8">
																	<div class="card-body p-3">
																		<!-- Title -->
																		<div class="d-flex justify-content-between mt-4 ms-3">
																			<h5 class="card-title mb-1">
																				<a href="#">${tktJoin.tktName}</a>
																			</h5>
																			<div class="fs-5 mb-2 me-3 itemPrice"
																				id="itemPrice<%=j%>">$ ${tktJoin.price * tktJoin.tktQty}</div>
																		</div>

																		<div class="d-sm-flex flex-wrap ms-3">
																			<div class="text-dark fs-sm me-3">
																				方案:<span class="text-dark fw-medium ms-2">${tktJoin.planName}</span>
																			</div>
																			<!-- <div class="text-muted fs-sm me-3">Weight: <span class='text-dark fw-medium'>140g</span></div> -->
																		</div>
																		<!-- Rating star -->
																		<ul class="list-inline mb-0 mt-2 ms-3">
																			<li class="list-inline-item me-0 small"><i
																				class="fa-solid fa-star text-warning"></i></li>
																			<li class="list-inline-item me-0 small"><i
																				class="fa-solid fa-star text-warning"></i></li>
																			<li class="list-inline-item me-0 small"><i
																				class="fa-solid fa-star text-warning"></i></li>
																			<li class="list-inline-item me-0 small"><i
																				class="fa-solid fa-star text-warning"></i></li>
																			<li class="list-inline-item me-0 small"><i
																				class="fa-solid fa-star-half-alt text-warning"></i></li>
																		</ul>

																		<!-- List -->
																		<ul class="nav nav-divider small mb-0 mt-2 ms-3">
																			<li class="nav-item mb-1"><i
																				class="bi bi-people-fill me-2"></i>${tktJoin.tktType}</li>
																			<li class="nav-item mb-1"><i
																				class="bi bi-geo-alt-fill me-2"></i>${tktJoin.location}</li>
																		</ul>
																		<div
																			class="count-input ms-1 d-flex justify-content-end">
																			<button class="transparent-button me-auto ms-1"
																				id="trash<%=j%>" value="<%=j%>">
																				<i class="bi bi-trash-fill" style="color: gray;"></i>
																			</button>
																			<button class="btn btn-icon fs-xl" type="button"
																				id="redQty<%=j%>" value="<%=j%>">-</button>
																			<input class="form-control form-control-centered"
																				type="number" name="tktQty<%=j%>" id="tktQty<%=j%>"
																				value="${tktJoin.tktQty}" readonly>
																			<button class="btn btn-icon fs-xl pt-1" type="button"
																				id="addQty<%=j%>" value="<%=j%>">+</button>
																		</div>

																		<div class="itemInfo">
																			<input class="tktTypeNo" type="hidden"
																				name="tktTypeNo<%=j%>" value="${tktJoin.tktTypeNo}">
																				<input class="tktNo" type="hidden"
																				name="tktNo<%=j%>" value="${tktJoin.tktNo}">
																			<input class="memNo" type="hidden" name="memNo"
																				value="${tktJoin.memNo}"> <input
																				class="price" type="hidden" name="price<%=j%>"
																				id="price<%=j++%>" value="${tktJoin.price}">
																		</div>


																	</div>

																</div>
																<!-- Card body END -->
															</div>
														</div>
													</c:forEach>
													<input type="hidden" name="itemAmount" value="<%=j%>">
													<!-- Tour list END -->

													<!-- Cancellation & Date change START -->
													<div class="card border" id="calPolicy">
														<!-- Card header -->
														<div class="card-header border-bottom">
															<!-- Title -->
															<h5 class="mb-0">取消政策 & 日期更換</h5>
														</div>

														<!-- Card body START -->
														<div class="card-body">
															<ul class="list-group list-group-borderless">
																<li class="list-group-item"><span
																	class="h6 fw-normal me-1 mb-0"><i
																		class="bi bi-dot"></i>10 天內:</span> <span>收取100%</span></li>
																<li class="list-group-item"><span
																	class="h6 fw-normal me-1 mb-0"><i
																		class="bi bi-dot"></i>10 to 15 天:</span> <span>收取75%</span></li>
																<li class="list-group-item"><span
																	class="h6 fw-normal me-1 mb-0"><i
																		class="bi bi-dot"></i>15 to 30 天:</span> <span>收取30%</span></li>
																<li class="list-group-item"><span
																	class="h6 fw-normal me-1 mb-0"><i
																		class="bi bi-dot"></i>票券期限:</span> <span>購買後60天內需使用完畢</span></li>
															</ul>
															<p class="mt-4">注意： 供應商需 2-5
																個工作天進行取消流程，依照您購買的商品取消政策收取手續費，並於取消流程完成後14 個工作天內退款。</p>
														</div>
														<!-- Card body END -->
													</div>
													<!-- Cancellation & Date change END -->

													<!-- Step 1 button -->
													<div class="text-end">
														<input type="hidden" name="action" value="updateAll">
														<button class="btn btn-primary next-btn mb-0"
															id="next-step" >下一步</button>
													</div>
												</c:when>

												<c:otherwise>
													<section>
														<div class="container" id="nothing">
															<div class="row align-items-center">
																<div class="col-md-10 text-center mx-auto">
																	<!-- Image -->
																	<img src="<%=request.getContextPath()%>/front_end/assets/images/element/error.svg"
																		class="h-lg-500px mb-4" alt="">
																	<!-- Subtitle -->
																	<h1>Nothing in here</h1>
																	<!-- Button -->
																	<!--要再放票券網址進來 -->
																	<a href="/flyday/tktt/tkt-list.html" class="btn btn-light mb-0 mt-3"><i
																		class="bi bi-shop-window"></i> go shopping</a>
																</div>
															</div>
														</div>
													</section>
												</c:otherwise>

											</c:choose>
										</div>
									</div>
									<!-- Step 1 content END -->
								</form>
								<FORM METHOD="post" ACTION="<%=request.getContextPath()%>/tkt/Order">
<%-- 								<FORM METHOD="post" ACTION="<%=request.getContextPath()%>/tkt/ECPay"> --%>
									<!-- Step 2 content START -->
									<div id="step-2" role="tabpanel" class="content fade"
										aria-labelledby="steppertrigger2">
										<div class="vstack gap-4">
											<!-- Title -->
											<h4 class="mb-0">旅客資料</h4>

											<hr class="my-0">
											<!-- Divider -->

											<!-- Alert box START -->
											<div class="alert alert-warning d-flex" role="alert">
												<span class="alert-heading h5 mb-0 me-2"><i
													class="bi bi-exclamation-octagon-fill"></i></span> 請填寫可聯繫的資料
											</div>
											<!-- Alert box END -->

											<!-- Traveler 1 form START -->
											<div class="card border">
												<!-- Card header -->
												<div class="card-header border-bottom">
													<h5 class="mb-0">訂購人</h5>
												</div>

												<!-- Card body START -->
												<div class="card-body">
													<div class="row g-4">
														<!-- Title -->
														<div class="col-md-2">
															<label class="form-label">Title</label>
															<div class="form-control-bg-light">
																<select
																	class="form-select form-select-sm js-choice border-0"
																	name="conTitle">
																	<option value="先生">先生</option>
																	<option value="女士">女士</option>
																</select>
															</div>
														</div>

														<!-- First Name -->
														<div class="col-md-5">
															<div class="form-control-bg-light">
																<label class="form-label">Name</label><label
																	class="ms-2 text-danger" id="errorName"></label> <input
																	type="text" class="form-control" id="memName"
																	name="conName" value="${mem.memName}">
															</div>
														</div>

													</div>
												</div>
												<!-- Card body END -->
											</div>
											<!-- Traveler 1 form END -->

											<!-- Booking detail START -->
											<div class="card border">
												<!-- Card header -->
												<div class="card-header border-bottom">
													<h5 class="mb-0">訂購人資料</h5>
												</div>

												<!-- Card body START -->
												<div class="card-body">
													<div class="row g-4">
														<!-- Mobile number -->
														<div class="col-md-6">
															<div class="form-control-bg-light">
																<label class="form-label">手機號碼</label> <label
																	class="ms-2 text-danger" id="errorMobile"></label> <input
																	type="text" class="form-control" id="memMobile"
																	name="conPhone" value="${mem.memMobile}">
															</div>
														</div>

														<!-- Email id -->
														<div class="col-md-6">
															<div class="form-control-bg-light">
																<label class="form-label">Email</label> <label
																	class="ms-2 text-danger" id="errorEmail"></label> <input
																	type="email" class="form-control" id="memEmail"
																	name="conEmail" value="${mem.memEmail}"> 
																	<!-- 優惠券資訊 -->
																	<input class="memTktCoupNo" 
																	type="hidden" name="memTktCoupNo" value="1"> 
																	<input class="discPrice"
																	type="hidden" name="discPrice" value="0">
															</div>
														</div>
													</div>
												</div>
												<!-- Card body END -->
											</div>
											<!-- Booking detail END -->

											<!-- Step 2 button -->
											<div class="hstack gap-2 flex-wrap justify-content-between">
												<button class="btn btn-secondary prev-btn mb-0" onclick="return false">上一步</button>
												<button class="btn btn-primary next-btn mb-0" id="gotoPay" onclick="return false">前往付款</button>
											</div>
										</div>
									</div>
									<!-- Step 2 content END -->

									<!-- Step 3 content START -->
									<div id="step-3" role="tabpanel" class="content fade"
										aria-labelledby="steppertrigger3">
										<div class="vstack gap-4">
											<!-- Title -->
											<h4 class="mb-0">付款</h4>

											<hr class="my-0">
											<!-- Divider -->

											<!-- Ecpay START -->
											<div class="card border">
												<!-- Card header -->
												<div
													class="card-header border-bottom d-sm-flex justify-content-between align-items-center">
													<h5 class="mb-2 mb-sm-0">Pay with ECPay</h5>
													<ul class="list-inline my-0">
														<li class="list-inline-item"><img
																src="<%=request.getContextPath()%>/front_end/assets/images/element/visa.svg" class="h-30px"
																alt=""></li>
														<li class="list-inline-item"><img
																src="<%=request.getContextPath()%>/front_end/assets/images/element/mastercard.svg"
																class="h-30px" alt=""></li>
														<li class="list-inline-item"><img
																src="<%=request.getContextPath()%>/front_end/assets/images/element/expresscard.svg"
																class="h-30px" alt=""></li>
													</ul>
												</div>

												<!-- Card body -->
												<div class="card-body text-center mt-5 mb-4">
													<!-- Image -->
													<img src="<%=request.getContextPath()%>/front_end/myassets/ecpay_logo.svg"
														class="h-70px mb-3" alt="">
													<p class="mb-3">
														<strong>Tips:</strong> Simply click on the payment button
														below to proceed to the ECPay payment page.
													</p>

													<!-- Button -->
													<button class="btn btn-sm btn-outline-primary mb-0" type="submit" id="confirmPay">Pay
														with ECPay</button>
													<input type="hidden" name="action" value="orderConfirm">
												</div>
											</div>
											<!-- Paypal END -->

											<!-- Step 3 button -->
											<div class="d-flex justify-content-between">
												<button class="btn btn-secondary prev-btn mb-0" onclick="return false">上一步</button>
<!-- 												<button class="btn btn-success next-btn mb-0" type="submit" id="confirmPay">確認付款</button> -->
<!-- 												<input type="hidden" name="action" value="orderConfirm"> -->
											</div>
										</div>
									</div>
									<!-- Step 3 content END -->
								</FORM>

							</div>
							<!-- Main content END -->

							<!-- Right sidebar START -->
							<aside class="col-xl-4">
								<!-- <div data-sticky > -->
								<div class="vstack gap-4">
									<!-- Price summary START -->
									<div class="card border">
										<!-- card header -->
										<div class="card-header border-bottom">
											<h5 class="card-title mb-0">訂單價格</h5>
										</div>

										<!-- Card body -->
										<div class="card-body">
											<ul class="list-group list-group-borderless">
												<li
													class="list-group-item d-flex justify-content-between align-items-center pt-0">
													<span class="h6 fw-light mb-0">總價</span> <span class="fs-5"
													id="totalPrice"></span>
												</li>
												<li
													class="list-group-item d-flex justify-content-between align-items-center">
													<span class="h6 fw-light mb-0">折抵金額</span> <span
													class="fs-5 text-success discount">-$0</span>
												</li>
												<!-- <li class="list-group-item d-flex justify-content-between align-items-center pb-0">
												<span class="h6 fw-light mb-0">Taxes % Fees</span>
												<span class="fs-5">$350</span>
											</li> -->
											</ul>
											<div class="border-top pt-4 mb-3">
												<div class="" style="max-width: 310px;">
													<select class="form-select js-choice" aria-label=".form-select-sm" id="chooseCoup">
														<option value="">選擇優惠券</option>
														<option value="1">無優惠券</option>
													</select>
												</div>
											</div>
											<div class="text-uppercase" id="coupContent">優惠券內容</div>
										</div>

										<!-- Card footer -->
										<div class="card-footer border-top">
											<div
												class="d-flex justify-content-between align-items-center">
												<span class="h5 mb-0">實付金額</span> <span
													class="h5 mb-0 paidPrice" id="paidPrice">$22,500</span>
											</div>
										</div>
									</div>
									<!-- Price summary END -->
								</div>
								<!-- Row END -->
								<!-- </div> -->
							</aside>
							<!-- Right sidebar END -->

						</div>
					</div>
					<!-- Step content END -->
				</div>
			</div>
		</section>
		<!-- =======================
Steps END -->

	</main>
	<!-- **************** MAIN CONTENT END **************** -->

	<!-- =======================
Footer START -->
<footer class="bg-dark pt-5">
	<div class="container">
		<!-- Row START -->
		<div class="row g-4">

			<!-- Widget 1 START -->
			<div class="col-lg-6">
				<!-- logo -->
				<a href="index.html">
					<img class="h-40px" src="/flyday/front_end/myassets/logo.svg" alt="logo">
				</a>
				<p class="my-3 text-muted">緯育tibame CHA102 Group1 專題作品</p>
				<p class="mb-2"><a href="#" class="text-muted text-primary-hover"><i class="bi bi-telephone me-2"></i>+886 919319702 </a> </p>
				<p class="mb-0"><a href="#" class="text-muted text-primary-hover"><i class="bi bi-envelope me-2"></i>cha102group1@gmail.com</a></p>
			</div>
			<!-- Widget 1 END -->

			<!-- Widget 2 START -->
			<div class="col-lg-6 ms-auto">
				<h6 class="text-white my-3">行程供應商專區</h6>
				<ul class="nav flex-column text-primary-hover">
					<li class="nav-item"><a class="nav-link text-muted" href="/flyday/front_end/store-sign-up.html">供應商註冊</a></li>
					<li class="nav-item"><a class="nav-link text-muted" href="/flyday/front_end/store-sign-in.html">供應商登入</a></li>
				</ul>	
			</div>
			<!-- Widget 2 END -->

		</div><!-- Row END -->
		
		<!-- Divider -->
		<hr class="mt-4 mb-0">

		<!-- Bottom footer -->
		<div class="row">
			<div class="container">
				<div class="d-lg-flex justify-content-between align-items-center py-3 text-center text-lg-start">
					<!-- copyright text -->
					<div class="text-muted text-primary-hover">Graduation Project for Tibame.CHA102.Group1</div>
					
					<!-- copyright links-->
					<div class="nav mt-2 mt-lg-0">
						<ul class="list-inline mb-0 text-center text-md-end">
							<li class="list-inline-item ms-2"><a href="#"><i class="text-white fab fa-facebook"></i></a>
							</li>
							<li class="list-inline-item ms-2"><a href="#"><i class="text-white fab fa-instagram"></i></a>
							</li>
							<li class="list-inline-item ms-2"><a href="#"><i class="text-white fab fa-linkedin-in"></i></a>
							</li>
							<li class="list-inline-item ms-2"><a href="#"><i class="text-white fab fa-twitter"></i></a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>
<!-- =======================
Footer END -->

	<!-- Back to top -->
	<div class="back-top"></div>

	<!-- Bootstrap JS -->
	<script src="<%=request.getContextPath()%>/front_end/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>

	<!-- Vendors -->
	<script src="<%=request.getContextPath()%>/front_end/assets/vendor/choices/js/choices.min.js"></script>
	<script src="<%=request.getContextPath()%>/front_end/assets/vendor/flatpickr/js/flatpickr.min.js"></script>
	<script src="<%=request.getContextPath()%>/front_end/assets/vendor/stepper/js/bs-stepper.min.js"></script>

	<!-- 	jQuery -->
	<script src="<%=request.getContextPath()%>/front_end/myassets/jQuery/jquery-3.4.1.min.js"></script>

	<!-- Vendor scripts: js libraries and plugins-->

	<script src="<%=request.getContextPath()%>/front_end/myassets/js/smooth-scroll.polyfills.min.js"></script>
	<script src="<%=request.getContextPath()%>/front_end/myassets/js/cleave.min.js"></script>

	<!-- ThemeFunctions -->
	<script src="<%=request.getContextPath()%>/front_end/assets/js/functions.js"></script>

	<!--Sweetalert2 -->
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>

	<!--導覽列js-->
	<script src="/flyday/front_end/myassets/js/nav.js"></script>

	<script>
	
		// 加數量
	    $("button[class='btn btn-icon fs-xl pt-1']").on("click", function () {

	        if($(this).attr("value") == $(this).attr("id").substr(6)){
	            
	            let qty = parseInt($(this).prev().attr("value")) + 1; //數量的值 = ${tktJoin.tktQty} + 1
	            let price = parseInt($("#price"+$(this).attr("value")).attr("value"));
	            let itemPrice = qty * price;
	            $(this).prev().attr("value", qty);
 	            $("#itemPrice"+$(this).attr("value")).text("$ "+itemPrice); //會回傳itemprice

 	          	finalTotalPrice();
 	          	finalPaidPrice();
	        }
	    });
	    
	 	// 減數量
	    $("button[class='btn btn-icon fs-xl']").on("click", function () {

		    if($(this).attr("value") == $(this).attr("id").substr(6)){
		            
		        let qty = parseInt($(this).next().attr("value")) - 1;
		        let price = parseInt($("#price"+$(this).attr("value")).attr("value"));
		        let itemPrice = qty * price;
	
				// 判斷數量是否為0，如為0的話要刪除
				if(qty != 0){
					$(this).next().attr("value", qty);
		 	        $("#itemPrice"+$(this).attr("value")).text("$ "+itemPrice);
	
		 	      	finalTotalPrice();
		 	     	finalPaidPrice();
				}else{
					
						Swal.fire({
						  title: '確定刪除此票券嗎?',
						  icon: 'warning',
						  showCancelButton: true,
						  confirmButtonColor: '#3085d6',
						  cancelButtonColor: '#d33',
						  confirmButtonText: 'confirm'
						}).then((result) => {
						  if (result.isConfirmed) {
						    Swal.fire(
						      '成功刪除!',
						      'Your file has been deleted.',
						      'success'
						    )
						    $(this).next().attr("value", 0);
						    $("#itemPrice"+$(this).attr("value")).text("$ "+0);
						    // 如果確定刪除，要刪掉整個票券的區塊
						    $(this).parents("div").find("div#itemStart"+$(this).attr("value")).animate({
			                    "opacity": 0
			                }, 250, "swing", function () {
			                    $(this).hide();
			                    
			                    finalTotalPrice();
			                    finalPaidPrice();
			                    
			                    // 如果購物車沒東西，要顯示購物車空空的畫面
			                    if (!($("div[class='card shadow rounded-2 overflow-hidden']").is(":visible"))){
			                    	$("#nothing").attr("style", "display:block");
			                    	$("#calPolicy").remove();
			                    	$("#confirmPay").prop("disabled", true);
			                    	
			                    }else{
			                    	$("#confirmPay").removeAttr("disabled");
			            	    }
			                });
						  }
						})
			            
				}
		            
		      }
		  });
	    
	    $("button[class='transparent-button me-auto ms-1']").on("click", function () {
	    	
	    		Swal.fire({
					  title: '確定刪除此票券嗎?',
//					  text: "你將無法復原此刪除",
					  icon: 'warning',
					  showCancelButton: true,
					  confirmButtonColor: '#3085d6',
					  cancelButtonColor: '#d33',
					  confirmButtonText: 'confirm',
					}).then((result) => {
					  if (result.isConfirmed) {
					    Swal.fire(
					      '成功刪除!',
					      'Your file has been deleted.',
					      'success'
					    )
					    $(this).next().next().attr("value", 0);
					    $("#itemPrice"+$(this).attr("value")).text("$ "+0);
					    // 如果確定刪除，要刪掉整個票券的區塊
					    $(this).parents("div").find("div#itemStart"+$(this).attr("value")).animate({
		                    "opacity": 0
		                }, 250, "swing", function () {
		                    $(this).hide();
		                    
		                    finalTotalPrice();
		                    finalPaidPrice();
		                    
		                    // 如果購物車沒東西，要顯示購物車空空的畫面
		                    if (!($("div[class='card shadow rounded-2 overflow-hidden']").is(":visible"))){
		                    	$("#nothing").attr("style", "display:block");
		                    	$("#calPolicy").remove();
		                    	$("#confirmPay").prop("disabled", true);
		                    	
		                    }else{
		                    	$("#confirmPay").removeAttr("disabled");
		            	    }
		                });
					  }
					})
	    });
	    
		const memName = document.getElementById("memName");
		const errorName = document.getElementById("errorName");
		const gotoPay = document.getElementById("gotoPay");
		const finalStep = document.getElementById("steppertrigger3");
		memName.addEventListener("change", function(){
			if(memName.value.trim() === "" || memName == null){
				errorName.textContent = "請勿空白";
				gotoPay.setAttribute("disabled", true);
				finalStep.setAttribute("disabled", true);
			}else{
				errorName.textContent = "";
				gotoPay.removeAttribute("disabled");
				finalStep.removeAttribute("disabled");
			}
		});

		const memMobile = document.getElementById("memMobile");
		const errorMobile = document.getElementById("errorMobile");
		const mobileRegex = /^09[0-9]{8}$/
		memMobile.addEventListener("change", function(){	
			if((! mobileRegex.test(memMobile.value)) || memMobile.value.trim() === "" || memMobile == null){
				errorMobile.textContent = "請輸入正確的號碼";
				gotoPay.setAttribute("disabled", true);
				finalStep.setAttribute("disabled", true);
			}else{
				errorMobile.textContent = "";
				gotoPay.removeAttribute("disabled");
				finalStep.removeAttribute("disabled");
			}
		});

		const memEmail = document.getElementById("memEmail");
		const errorEmail = document.getElementById("errorEmail");
		const emailRegex =/^\w+((-\w+)|(\.\w+))*\@\w+((\.|-)\w+)*\.[A-Za-z]+$/;
	    memEmail.addEventListener("change", function(){
			if((! emailRegex.test(memEmail.value)) || memEmail.value.trim() === "" || memEmail == null){
				errorEmail.textContent = "請輸入正確的信箱";
				gotoPay.setAttribute("disabled", true);
				finalStep.setAttribute("disabled", true);
			}else{
				errorEmail.textContent = "";
				gotoPay.removeAttribute("disabled");
				finalStep.removeAttribute("disabled");
			}
		});
	    
	    const confirmPay =  document.getElementById("confirmPay");
	    if(!($("div[class='card shadow rounded-2 overflow-hidden']").is(":visible"))){
	    	$("#confirmPay").prop("disabled", true);
        }else{
        	$("#confirmPay").removeAttr("disabled");
	    }
	    
	    // 一開始的總價
	    document.addEventListener("DOMContentLoaded", function(){

	    	finalTotalPrice();
	    	finalPaidPrice();

      });
	    
	    // 計算總價的方法
	    function finalTotalPrice(){
	    	const totalPrice = document.getElementById("totalPrice");
	    	const itemPrices = document.getElementsByClassName("itemPrice");
	          let sum = 0;

	          for(let itemPrice of itemPrices){
	            const itemOfPrice =parseInt(itemPrice.textContent.split(" ")[1]);
	            sum += itemOfPrice;
	          };

	          
	          totalPrice.textContent = "$ " + sum ;
	    }
	    
	    function finalPaidPrice(){
	    	const discount = document.querySelector(".discount");
	    	const paidPrice = document.getElementById("paidPrice");
	    	
	    	const discountPrice = (parseInt(discount.textContent.substring(2)));
	    	const finalPrice = parseInt(totalPrice.textContent.substring(1));
	    	paidPrice.textContent = "$ " + (finalPrice - discountPrice);
	    	
	    }

	    
		//利用form表單發送fetch
		const form = document.getElementById("myForm");
		const nextStep = document.getElementById("next-step");
// 		const nothingItem = document.querySelectorAll("div[class='card shadow rounded-2 overflow-hidden']");

		if(form !== null && nextStep !== null && typeof form !== "undefined"){
			 nextStep.addEventListener("click", function(){
				 const formData = new FormData(form);
	
				fetch("<%=request.getContextPath()%>/tkt/shoppingCart",{
					method: "POST",
					body: formData
				})
			 });
		}
		 
		 const steppertrigger2 = document.getElementById("steppertrigger2");
		 
		 if(form !== null && nextStep !== null && typeof form !== "undefined"){
			 steppertrigger2.addEventListener("click", function(){
				 const formData = new FormData(form);
	
					fetch("<%=request.getContextPath()%>/tkt/shoppingCart",{
						method: "POST",
						body: formData
					})
				 });
		 }
		 
		 const steppertrigger3 = document.getElementById("steppertrigger3");
	      
		 if(form !== null && nextStep !== null && typeof form !== "undefined"){
			 steppertrigger3.addEventListener("click", function(){
				 const formData = new FormData(form);
	
					fetch("<%=request.getContextPath()%>/tkt/shoppingCart",{
						method: "POST",
						body: formData
					})
			
				 });
		 }
		 
		 const chooseCoup = document.getElementById("chooseCoup");
		 const coupContent = document.getElementById("coupContent");
		 
		 chooseCoup.addEventListener("change", function(){
			 console.log("xxx");
			 if(chooseCoup.value === "1"){
				 coupContent.textContent = "未使用優惠券";
			 }
		 });
		 
// 		 const form1 = document.getElementById("conInfo");
// 		 const confirmPay = document.getElementById("confirmPay");
// 		 const memTktCoupNo = document.getElementById("memTktCoupNo");
// 		 const discPrice = document.getElementById("discPrice");
		 
// 		 confirmPay.addEventListener("click", function(){
// 			 const formData = new FormData(form1);
			 
// 			 formData.append("memTktCoupNo", memTktCoupNo.value);
// 			 formData.append("discPrice", discPrice.value);
			 
<%-- 			 fetch("<%=request.getContextPath()%>/tkt/Order",{ --%>
// 				 method: "POST",
// 				 body: formData
// 			 })
			 
// 		 });

// 		const memTktCoupNo = document.getElementByName("memTktCoupNo");
// 		localStorage.setMemTktCoupNo("memTktCoupNo", memTktCoupNo.value);
		
// 		const discPrice = document.getElementByName("discPrice");
// 		localStorage.setDiscPrice("discPrice", discPrice.value);
		
// 		const conTitle = document.getElementByName("conTitle");
// 		localStorage.setConTitle("conTitle", conTitle.value);
		
// 		const conName = document.getElementByName("conName");
// 		localStorage.setConName("conName", conName.value);
		
// 		const conPhone = document.getElementByName("conPhone");
// 		localStorage.setConPhone("conPhone", conPhone.value);
		
// 		const conEmail = document.getElementByName("conEmail");
// 		localStorage.setConEmail("conEmail", conEmail.value);

	</script>

<!-- 	<FORM METHOD="post" -->
<%-- 		ACTION="<%=request.getContextPath()%>/tkt/shoppingCart"> --%>
<!-- 		<input type="submit" value="查詢購物車"> <input type="hidden" -->
<!-- 			name="action" value="getAll"> -->
<!-- 	</FORM> -->

<!-- 	<FORM METHOD="post" -->
<%-- 		ACTION="<%=request.getContextPath()%>/tkt/shoppingCart"> --%>
<!-- 		<input type="submit" value="加入1號票券 海生館 每人 2張"> <input -->
<!-- 			type="hidden" name="action" value="addItem"> <input -->
<!-- 			type="hidden" name="testTktTypeNo" value="1"> <input -->
<!-- 			type="hidden" name="testTktQty" value="2"> -->
<!-- 	</FORM> -->

<!-- 	<FORM METHOD="post" -->
<%-- 		ACTION="<%=request.getContextPath()%>/tkt/shoppingCart"> --%>
<!-- 		<input type="submit" value="加入3號票券 常設展 成人 2張"> <input -->
<!-- 			type="hidden" name="action" value="addItem"> <input -->
<!-- 			type="hidden" name="testTktTypeNo" value="3"> <input -->
<!-- 			type="hidden" name="testTktQty" value="2"> -->
<!-- 	</FORM> -->

</body>
</html>