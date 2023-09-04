<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:if test="${empty mem}">
	<c:redirect url="sign-in.html"></c:redirect>
</c:if>

<!DOCTYPE html>
<html lang="en">
<head>
	<title>Booking - Multipurpose Online Booking Theme</title>

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
	<link rel="shortcut icon" href="<%=request.getContextPath()%>/front_end/assets/images/favicon.ico">

	<!-- Google Font -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Poppins:wght@400;500;700&display=swap">

	<!-- Plugins CSS -->
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/front_end/assets/vendor/font-awesome/css/all.min.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/front_end/assets/vendor/bootstrap-icons/bootstrap-icons.css">

	<!-- Theme CSS -->
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/front_end/assets/css/style.css">

</head>

<body>

<!-- **************** MAIN CONTENT START **************** -->
<main>
	
<!-- =======================
Main Content START -->
<section class="vh-xxl-100">
	<div class="container h-100 d-flex px-0 px-sm-4">
		<div class="row justify-content-center align-items-center m-auto">
			<div class="col-12">
				<div class="bg-mode shadow rounded-3 overflow-hidden">
					<div class="row g-0">
						<!-- Vector Image -->
						<div class="col-lg-6 d-md-flex align-items-center order-2 order-lg-1">
							<div class="p-3 p-lg-5">
								<img src="<%=request.getContextPath()%>/front_end/assets/images/element/join-us.svg" alt="">
							</div>
							<!-- Divider -->
							<div class="vr opacity-1 d-none d-lg-block"></div>
						</div>
		
						<!-- Information -->
						<div class="col-lg-6 order-1">
							<div class="p-4 p-sm-7">
								<!-- Logo -->
								<a href="index.html">
									<img class="mb-4 h-50px" src="<%=request.getContextPath()%>/front_end/myassets/logo_noliteral.png" alt="logo">
								</a>
								<!-- Title -->
								<h1 class="mb-2 h3">輸入新密碼</h1>
		
								<!-- Form START -->
								<form method="post" action="<%=request.getContextPath()%>/mem/updatePassword" class="mt-sm-4 text-start">
									<!-- 帳號 -->
									<div class="mb-3">
										<label class="form-label">帳號</label>
										<input type="text" readonly class="form-control" value="${mem.memAcc}">
									</div>

									<!-- Password -->
									<div class="mb-3 position-relative">
										<label class="form-label">輸入密碼</label>
										<input class="form-control fakepassword" type="password" name="newMemPwd" id="psw-input">
										<span class="position-absolute top-50 end-0 translate-middle-y p-0 mt-3">
											<i class="fakepasswordicon fas fa-eye-slash cursor-pointer p-2"></i>
										</span>
									</div>

									<!-- Confirm Password -->
									<div class="mb-3">
										<label class="form-label">確認密碼</label>
										<input type="password" class="form-control" id="psw-input-confirm">
									</div>

									<div class="mb-3 d-sm-flex">
										<div id="errMsg" class="error text-danger text-end"> 
										${errMsg}
										</div>
									</div>
									
									<!-- 紀錄成功訊息，不顯示在頁面上，用JS抓資料顯示在alert -->
									<div id="successMsg" style="display:none;"> ${successMsg} </div>
									
									<!-- 存入會員編號一同傳送-->
									<input type="hidden" name="memNo" value="${mem.memNo}"> 

									<!-- Button -->
									<div class="d-grid"><button type="button" class="btn btn-primary" id="submit-btn" >修改新密碼</button></div>
		
									<!-- Copyright -->
									<div class="text-primary-hover mt-3 text-center"> 登入即表示您同意Flyday服務條款與隱私權政策</div>
								</form>
								<!-- Form END -->
							</div>		
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<!-- =======================
Main Content END -->

</main>

<!-- **************** MAIN CONTENT END **************** -->

<!-- Back to top -->
<div class="back-top"></div>

<!-- Bootstrap JS -->
<script src="<%=request.getContextPath()%>/front_end/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>

<!-- ThemeFunctions -->
<script src="<%=request.getContextPath()%>/front_end/assets/js/functions.js"></script>

<script src="<%=request.getContextPath()%>/front_end/myassets/js/new-password-signed.js"></script>

</body>
</html>