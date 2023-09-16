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
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/front_end/assets/vendor/apexcharts/css/apexcharts.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/front_end/assets/vendor/choices/css/choices.min.css">

	<!-- Theme CSS -->
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/front_end/assets/css/style.css">

</head>

<body>



<!-- **************** MAIN CONTENT START **************** -->
<main>
	
<!-- =======================
Content START -->
<section class="pt-0 mt-5">
	<div class="container vstack gap-4">
		<!-- Title START -->
		<div class="card bg-light overflow-hidden px-sm-5">
			<div class="row align-items-center g-4">

				<!-- Content -->
				<div class="col-sm-9">
					<div class="card-body">
						<!-- Breadcrumb -->
						<nav aria-label="breadcrumb">
							<ol class="breadcrumb breadcrumb-dots mb-0">
								<li class="breadcrumb-item"><a href="<%=request.getContextPath()%>/front_end/index.html"><i class="bi bi-house me-1"></i> Home</a></li>
							</ol>
						</nav>
						<!-- Title -->
						<!-- <h1 class="m-0 h2 card-title">Review your Booking</h1> -->
						<h1 class="fs-3 mt-1 mb-3"><i class="bi bi-journals fa-fw me-1"></i>訂單編號: BS-${tktOrd.tktOrdNo}</h1>
					</div>
				</div>	

				<!-- Image -->
				<div class="col-sm-3 text-end d-none d-sm-block">
					<img src="<%=request.getContextPath()%>/front_end/assets/images/element/desert.svg" class="mb-n4" alt="">
				</div>
			</div>
		</div>
		<!-- Title END -->

		<!-- Listing table START -->
		<div class="row mt-5">
			<div class="col-12 col-xl-4">
				
				<!-- Right sidebar START -->
				<aside class="col-xl-12">
					<!-- <div data-sticky > -->
					<div class="vstack gap-4">
						<!-- Price summary START -->
						<div class="card border">
							<!-- card header -->
							<div class="card-header border-bottom">
								<h5 class="card-title mb-0"><i class="bi bi-bag-check me-2"></i>訂單價格</h5>
							</div>
	
							<!-- Card body -->
							<div class="card-body">
								<ul class="list-group list-group-borderless">
									<li class="list-group-item d-flex justify-content-between align-items-center pt-0">
										<span class="h6 fw-light mb-0">總價</span>
										<span class="fs-5">$ ${tktOrd.orgPrice}</span>
									</li>
									<li class="list-group-item d-flex justify-content-between align-items-center">
										<span class="h6 fw-light mb-0">折抵金額</span>
										<span class="fs-5 text-success">-$ ${tktOrd.discPrice}</span>	
									</li>
								</ul>
								  <div class="form-control text-uppercase">未使用優惠券</div>
							</div>
	
							<!-- Card footer -->
							<div class="card-footer border-top">
								<div class="d-flex justify-content-between align-items-center">
									<span class="h5 mb-0">實付金額</span>
									<span class="h5 mb-0">$ ${tktOrd.payPrice}</span>
								</div>
							</div>
						</div>
						<!-- Price summary END -->
						<!-- Order information START -->
						<div class="card border">
							<!-- card header -->
							<div class="card-header border-bottom">
								<h5 class="card-title mb-0"><i class="bi bi-emoji-smile me-2"></i>訂購人資訊</h5>
							</div>
	
							<!-- Card body -->
							<div class="card-body">
								<ul class="list-group list-group-borderless">
									<li class="list-group-item d-flex justify-content-between align-items-center pt-0">
										<span class="h6 fw-light mb-0">姓名</span>
										<span class="fs-6">${tktOrd.conName}</span>
									</li>
									<li class="list-group-item d-flex justify-content-between align-items-center">
										<span class="h6 fw-light mb-0">手機號碼</span>
										<span class="fs-6">${tktOrd.conPhone}</span>	
									</li>
									<li class="list-group-item d-flex justify-content-between align-items-center">
										<span class="h6 fw-light mb-0">信箱</span>
										<span class="fs-6">${tktOrd.conEmail}</span>	
									</li>
									<li class="list-group-item d-flex justify-content-between align-items-center">
										<span class="h6 fw-light mb-0">成立日期</span>
										<span class="fs-6"><fmt:formatDate type="both" dateStyle="medium" timeStyle="medium" value="${tktOrd.ordDate}" /></span>	
									</li>
									<li class="list-group-item d-flex justify-content-between align-items-center">
										<span class="h6 fw-light mb-0">失效日期</span>
										<span class="fs-6"><fmt:formatDate type="date" value="${tktOrd.expDate}" /></span>	
									</li>
								</ul>
							</div>
						</div>
						<!-- Order information END -->
					</div> <!-- Row END -->				
				</aside>
				<!-- Right sidebar END -->
				
			</div>

			<div class="col-12 col-xl-8">

				<div class="card border">
					<!-- Card header -->
					<div class="card-header border-bottom">
						<h5 class="card-header-title">訂單明細</h5>
					</div>
					
					<c:forEach var="tktOrdDetailsJoin" items="${tktOrdDetailsJoinList}">
						<!-- Order list START -->
						<div class="card shadow rounded-2 overflow-hidden">
						<div class="row g-0">
							<!-- Image -->
							<div class="col-sm-6 col-md-4" style="display: flex;" >
								<div class="align-self-center ps-4"><img src="${tktOrdDetailsJoin.showPic}" alt=""></div>
							</div>

							<!-- Card Body START -->
							<div class="col-sm-6 col-md-8">
								<div class="card-body p-3">
									<!-- Title -->
									<div class="list-inline-item dropdown position-absolute top-0 end-0 me-3">
										<a class="btn btn-sm w-100 bg-warning-subtle mb-0 mt-3 me-2" style="cursor: auto;">未出發</a>    
									</div>
									<div class="d-flex justify-content-between mt-4 ms-3">
										<h5 class="card-title mb-1"><a href="#">${tktOrdDetailsJoin.tktName}</a></h5>
									</div>

									<div class="d-sm-flex flex-wrap ms-3 mt-2">
										<div class="text-dark fs-sm me-3">方案:<span class="text-dark fw-medium ms-2" >${tktOrdDetailsJoin.planName}</span></div>
									</div>

									<ul class="nav nav-divider small mb-0 mt-2 ms-3">
										<li class="nav-item mb-1"><i class="bi bi-people-fill me-2"></i>${tktOrdDetailsJoin.tktType} * ${tktOrdDetailsJoin.tktOrdQty}</li>
										<li class="nav-item mb-1"><i class="bi bi-people-fill me-2"></i>金額: $ ${tktOrdDetailsJoin.tktOrdQty * tktOrdDetailsJoin.unitPrice}</li>
									</ul>
						
								</div>
							</div>
							<!-- Card body END -->
						</div>
					</div>
					<!-- Order list END -->
					</c:forEach>
				</div>
				
			</div>
		</div>
		<!-- Listing table END -->

		<!-- Review START -->
<!-- 		<div class="row"> -->
<!-- 			<div class="col-12"> -->
<!-- 				<div class="card border rounded-3"> -->
					<!-- Card header START -->
<!-- 					<div class="card-header border-bottom"> -->
<!-- 						<h5 class="card-header-title">你的評論</h5> -->
<!-- 					</div> -->
					<!-- Card header END -->

					<!-- Card body START -->
<!-- 					<div class="card-body"> -->
<!-- 						<div class="bg-light rounded p-3"> -->
							<!-- Review item START -->
<!-- 							<div class="d-sm-flex justify-content-between"> -->
<!-- 								Avatar image -->
<!-- 								<div class="d-sm-flex align-items-center mb-3"> -->
<%-- 									<img class="avatar avatar-md rounded-circle float-start me-3" src="<%=request.getContextPath()%>/front_end/assets/images/avatar/01.jpg" alt="avatar"> --%>
<!-- 									Title -->
<!-- 									<div> -->
<!-- 										<h6 class="m-0">Frances Guerrero</h6> -->
<!-- 										<span class="me-3 small">2 days ago</span> -->
<!-- 									</div> -->
<!-- 								</div> -->
								<!-- Review star -->
<!-- 								<ul class="list-inline mb-2 mb-sm-0"> -->
<!-- 									<li class="list-inline-item me-0"><i class="fas fa-star text-warning"></i></li> -->
<!-- 									<li class="list-inline-item me-0"><i class="fas fa-star text-warning"></i></li> -->
<!-- 									<li class="list-inline-item me-0"><i class="fas fa-star text-warning"></i></li> -->
<!-- 									<li class="list-inline-item me-0"><i class="fas fa-star text-warning"></i></li> -->
<!-- 									<li class="list-inline-item me-0"><i class="far fa-star text-warning"></i></li> -->
<!-- 								</ul>	 -->
<!-- 							</div> -->

							<!-- Content -->
<!-- 							<h6 class="fw-normal"><span class="text-body">Review on:</span> Pride moon Village Resort & Spa</h6> -->
<!-- 							<p>Satisfied conveying a dependent contented he gentleman agreeable do be. Warrant private blushes removed an in equally totally if. Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do. </p> -->
							
							<!-- Image -->
<!-- 							<div class="row g-4"> -->
<!-- 								<div class="col-4 col-sm-3 col-lg-2"> -->
<%-- 									<a href="<%=request.getContextPath()%>/front_end/assets/images/category/hotel/4by3/07.jpg" data-glightbox data-gallery="gallery"> --%>
<%-- 										<img src="<%=request.getContextPath()%>/front_end/assets/images/category/hotel/4by3/07.jpg" class="rounded" alt=""> --%>
<!-- 									</a> -->
<!-- 								</div> -->
<!-- 								<div class="col-4 col-sm-3 col-lg-2"> -->
<%-- 									<a href="<%=request.getContextPath()%>/front_end/assets/images/category/hotel/4by3/08.jpg" data-glightbox data-gallery="gallery"> --%>
<%-- 										<img src="<%=request.getContextPath()%>/front_end/assets/images/category/hotel/4by3/08.jpg" class="rounded" alt=""> --%>
<!-- 									</a> -->
<!-- 								</div> -->
<!-- 							</div> -->
							
							<!-- Buttons and collapse -->
<!-- 							<div class="mt-3"> -->
<!-- 								Buttons -->
<!-- 								<div class="d-flex justify-content-between align-items-center"> -->
<!-- 									<a class="btn btn-sm btn-primary-soft mb-0" data-bs-toggle="collapse" href="#collapseComment" role="button" aria-expanded="true" aria-controls="collapseComment"> -->
<!-- 										<i class="bi bi-reply me-1"></i>Reply -->
<!-- 									</a> -->
<!-- 									<a href="#" class="text-primary-hover text-reset small mb-0"><i class="bi bi-info-circle me-1"></i>Report</a> -->
<!-- 								</div> -->
								<!-- collapse textarea -->
<!-- 								<div class="collapse show" id="collapseComment"> -->
<!-- 									<div class="d-flex mt-3"> -->
<!-- 										<textarea class="form-control mb-0" placeholder="Add a comment..." rows="2" spellcheck="false"></textarea> -->
<!-- 										<button class="btn btn-sm btn-primary-soft ms-2 px-4 mb-0 flex-shrink-0"><i class="fas fa-paper-plane fs-5"></i></button> -->
<!-- 									</div> -->
<!-- 								</div> -->
<!-- 							</div> -->
							<!-- Review item END -->
<!-- 						</div> -->
						
<!-- 						<hr> Divider -->

						<!-- Review item START -->
<!-- 						<div class="bg-light rounded p-3"> -->
							<!-- Review item START -->
<!-- 							<div class="d-sm-flex justify-content-between"> -->
								<!-- Avatar image -->
<!-- 								<div class="d-sm-flex align-items-center mb-3"> -->
<%-- 									<img class="avatar avatar-md rounded-circle float-start me-3" src="<%=request.getContextPath()%>/front_end/assets/images/avatar/07.jpg" alt="avatar"> --%>
<!-- 									Title -->
<!-- 									<div> -->
<!-- 										<h6 class="m-0">Louis Ferguson</h6> -->
<!-- 										<span class="me-3 small">Nov 18, 2022 at 11:55 am</span> -->
<!-- 									</div> -->
<!-- 								</div> -->
								<!-- Review star -->
<!-- 								<ul class="list-inline mb-2 mb-sm-0"> -->
<!-- 									<li class="list-inline-item me-0"><i class="fas fa-star text-warning"></i></li> -->
<!-- 									<li class="list-inline-item me-0"><i class="fas fa-star text-warning"></i></li> -->
<!-- 									<li class="list-inline-item me-0"><i class="fas fa-star text-warning"></i></li> -->
<!-- 									<li class="list-inline-item me-0"><i class="fas fa-star text-warning"></i></li> -->
<!-- 									<li class="list-inline-item me-0"><i class="far fa-star text-warning"></i></li> -->
<!-- 								</ul>	 -->
<!-- 							</div> -->

							<!-- Content -->
<!-- 							<h6 class="fw-normal"><span class="text-body">Review on:</span> Courtyard by Marriott New York</h6> -->
<!-- 							<p>Far advanced settling say finished raillery. Offered chiefly farther Satisfied conveying a dependent contented he gentleman agreeable do be. Warrant private blushes removed an in equally totally if. Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do.</p> -->
<!-- 							Buttons -->
<!-- 							<div class="d-flex justify-content-between align-items-center"> -->
<!-- 								<a class="btn btn-sm btn-primary-soft mb-0"> <i class="bi bi-reply me-1"></i>Reply </a> -->
<!-- 								<a href="#" class="text-primary-hover text-reset small mb-0"><i class="bi bi-info-circle me-1"></i>Report</a> -->
<!-- 							</div> -->
							<!-- Review item END -->
<!-- 						</div> -->
						<!-- Review item END -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 		</div> -->
</section>

<!-- =======================
Content END -->

</main>
<!-- **************** MAIN CONTENT END **************** -->



<!-- Back to top -->
<div class="back-top"></div>

<!-- Bootstrap JS -->
<script src="<%=request.getContextPath()%>/front_end/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>

<!-- Vendors -->
<script src="<%=request.getContextPath()%>/front_end/assets/vendor/apexcharts/js/apexcharts.min.js"></script>
<script src="<%=request.getContextPath()%>/front_end/assets/vendor/choices/js/choices.min.js"></script>

<!-- ThemeFunctions -->
<script src="<%=request.getContextPath()%>/front_end/assets/js/functions.js"></script>

</body>
</html>