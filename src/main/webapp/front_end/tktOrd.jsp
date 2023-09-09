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
			if (el != 'undefined' && el != null) {
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
	<link rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Poppins:wght@400;500;700&display=swap">

	<!-- Plugins CSS -->
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/front_end/assets/vendor/font-awesome/css/all.min.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/front_end/assets/vendor/bootstrap-icons/bootstrap-icons.css">

	<!-- Theme CSS -->
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/front_end/assets/css/style.css">

</head>

<body class="dashboard">

	<!-- Header START -->
	<header class="navbar-light header-sticky">
		<!-- Logo Nav START -->
		<nav class="navbar navbar-expand-xl">
			<div class="container">
				<!-- Logo START -->
				<a class="navbar-brand" href="<%=request.getContextPath()%>/front_end/index.html">
					<img class="light-mode-item navbar-brand-item" src="<%=request.getContextPath()%>/front_end/assets/images/logo.svg" alt="logo">
					<img class="dark-mode-item navbar-brand-item" src="<%=request.getContextPath()%>/front_end/assets/images/logo-light.svg" alt="logo">
				</a>
				<!-- Logo END -->

				<!-- Responsive navbar toggler -->
				<button class="navbar-toggler ms-auto mx-3 me-md-0 p-0 p-sm-2" type="button" data-bs-toggle="collapse"
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

						<!-- Nav item Listing -->
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="listingMenu" data-bs-toggle="dropdown"
								aria-haspopup="true" aria-expanded="false">Listings</a>
							<ul class="dropdown-menu" aria-labelledby="listingMenu">
								<!-- Dropdown submenu -->
								<li class="dropdown-submenu dropend">
									<a class="dropdown-item dropdown-toggle" href="#">Hotel</a>
									<ul class="dropdown-menu" data-bs-popper="none">
										<li> <a class="dropdown-item" href="<%=request.getContextPath()%>/front_end/index.html">Hotel Home</a></li>
										<li> <a class="dropdown-item" href="index-hotel-chain.html">Hotel Chain</a></li>
										<li> <a class="dropdown-item" href="index-resort.html">Hotel Resort</a></li>
										<li> <a class="dropdown-item" href="hotel-grid.html">Hotel Grid</a></li>
										<li> <a class="dropdown-item" href="hotel-list.html">Hotel List</a></li>
										<li> <a class="dropdown-item" href="hotel-detail.html">Hotel Detail</a></li>
										<li> <a class="dropdown-item" href="room-detail.html">Room Detail</a></li>
										<li> <a class="dropdown-item" href="hotel-booking.html">Hotel Booking</a></li>
									</ul>
								</li>

								<!-- Dropdown submenu -->
								<li class="dropdown-submenu dropend">
									<a class="dropdown-item dropdown-toggle" href="#">Flight</a>
									<ul class="dropdown-menu" data-bs-popper="none">
										<li> <a class="dropdown-item" href="index-flight.html">Flight Home</a></li>
										<li> <a class="dropdown-item" href="flight-list.html">Flight List</a></li>
										<li> <a class="dropdown-item" href="flight-detail.html">Flight Detail</a></li>
										<li> <a class="dropdown-item" href="flight-booking.html">Flight Booking</a></li>
									</ul>
								</li>

								<!-- Dropdown submenu -->
								<li class="dropdown-submenu dropend">
									<a class="dropdown-item dropdown-toggle" href="#">Tour</a>
									<ul class="dropdown-menu" data-bs-popper="none">
										<li> <a class="dropdown-item" href="index-tour.html">Tour Home</a></li>
										<li> <a class="dropdown-item" href="tour-grid.html">Tour Grid</a></li>
										<li> <a class="dropdown-item" href="tour-detail.html">Tour Detail</a></li>
										<li> <a class="dropdown-item" href="tour-booking.html">Tour Booking</a></li>
									</ul>
								</li>

								<!-- Dropdown submenu -->
								<li class="dropdown-submenu dropend">
									<a class="dropdown-item dropdown-toggle" href="#">Cab</a>
									<ul class="dropdown-menu" data-bs-popper="none">
										<li> <a class="dropdown-item" href="index-cab.html">Cab Home</a></li>
										<li> <a class="dropdown-item" href="cab-list.html">Cab List</a></li>
										<li> <a class="dropdown-item" href="cab-detail.html">Cab Detail</a></li>
										<li> <a class="dropdown-item" href="cab-booking.html">Cab Booking</a></li>
									</ul>
								</li>

								<!-- Dropdown submenu -->
								<li class="dropdown-submenu dropend">
									<a class="dropdown-item dropdown-toggle" href="#">Directory</a>
									<ul class="dropdown-menu" data-bs-popper="none">
										<li> <a class="dropdown-item" href="index-directory.html">Directory Home</a>
										</li>
										<li> <a class="dropdown-item" href="directory-detail.html">Directory Detail</a>
										</li>
									</ul>
								</li>

								<!-- Dropdown submenu -->
								<li class="dropdown-submenu dropend">
									<a class="dropdown-item dropdown-toggle" href="#">Add Listing</a>
									<ul class="dropdown-menu" data-bs-popper="none">
										<li> <a class="dropdown-item" href="join-us.html">Join us</a></li>
										<li> <a class="dropdown-item" href="add-listing.html">Add Listing</a></li>
										<li> <a class="dropdown-item" href="add-listing-minimal.html">Add Listing
												Minimal</a></li>
										<li> <a class="dropdown-item" href="listing-added.html">Listing Added</a></li>
									</ul>
								</li>

								<!-- Dropdown submenu -->
								<li class="dropdown-submenu dropend">
									<a class="dropdown-item dropdown-toggle" href="#">Hero</a>
									<ul class="dropdown-menu" data-bs-popper="none">
										<li> <a class="dropdown-item" href="hero-inline-form.html">Hero Inline Form</a>
										</li>
										<li> <a class="dropdown-item" href="hero-multiple-search.html">Hero Multiple
												Search</a></li>
										<li> <a class="dropdown-item" href="hero-image-gallery.html">Hero Image
												Gallery</a></li>
										<li> <a class="dropdown-item" href="hero-split.html">Hero Split</a></li>
									</ul>
								</li>

								<li> <a class="dropdown-item" href="booking-confirm.html">Booking Confirmed</a></li>
								<li> <a class="dropdown-item" href="compare-listing.html">Compare Listing</a></li>
								<li> <a class="dropdown-item" href="offer-detail.html">Offer Detail</a></li>
							</ul>
						</li>

						<!-- Nav item Pages -->
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="pagesMenu" data-bs-toggle="dropdown"
								aria-haspopup="true" aria-expanded="false">Pages</a>
							<ul class="dropdown-menu" aria-labelledby="pagesMenu">

								<li> <a class="dropdown-item" href="about.html">About</a></li>
								<li> <a class="dropdown-item" href="contact.html">Contact</a></li>
								<li> <a class="dropdown-item" href="contact-2.html">Contact 2</a></li>
								<li> <a class="dropdown-item" href="team.html">Our Team</a></li>

								<!-- Dropdown submenu -->
								<li class="dropdown-submenu dropend">
									<a class="dropdown-item dropdown-toggle" href="#">Authentication</a>
									<ul class="dropdown-menu" data-bs-popper="none">
										<li> <a class="dropdown-item" href="<%=request.getContextPath()%>/front_end/sign-in.html">Sign In</a></li>
										<li> <a class="dropdown-item" href="<%=request.getContextPath()%>/front_end/sign-up.html">Sign Up</a></li>
										<li> <a class="dropdown-item" href="forgot-password.html">Forgot Password</a>
										</li>
										<li> <a class="dropdown-item" href="two-factor-auth.html">Two factor
												authentication</a></li>
									</ul>
								</li>

								<!-- Dropdown submenu -->
								<li class="dropdown-submenu dropend">
									<a class="dropdown-item dropdown-toggle" href="#">Blog</a>
									<ul class="dropdown-menu" data-bs-popper="none">
										<li> <a class="dropdown-item" href="blog.html">Blog</a></li>
										<li> <a class="dropdown-item" href="blog-detail.html">Blog Detail</a></li>
									</ul>
								</li>

								<!-- Dropdown submenu -->
								<li class="dropdown-submenu dropend">
									<a class="dropdown-item dropdown-toggle" href="#">Help</a>
									<ul class="dropdown-menu" data-bs-popper="none">
										<li> <a class="dropdown-item" href="help-center.html">Help Center</a></li>
										<li> <a class="dropdown-item" href="help-detail.html">Help Detail</a></li>
										<li> <a class="dropdown-item" href="privacy-policy.html">Privacy Policy</a></li>
										<li> <a class="dropdown-item" href="terms-of-service.html">Terms of Service</a>
										</li>
									</ul>
								</li>

								<li> <a class="dropdown-item" href="pricing.html">Pricing</a></li>
								<li> <a class="dropdown-item" href="faq.html">FAQs</a></li>
								<li> <a class="dropdown-item" href="error.html">Error 404</a></li>
								<li> <a class="dropdown-item" href="coming-soon.html">Coming Soon</a></li>
							</ul>
						</li>

						<!-- Nav item Account -->
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="accounntMenu" data-bs-toggle="dropdown"
								aria-haspopup="true" aria-expanded="false">Accounts</a>
							<ul class="dropdown-menu" aria-labelledby="accounntMenu">
								<!-- Dropdown submenu -->
								<li class="dropdown-submenu dropend">
									<a class="dropdown-item dropdown-toggle" href="#">User Profile</a>
									<ul class="dropdown-menu" data-bs-popper="none">
										<li> <a class="dropdown-item" href="<%=request.getContextPath()%>/front_end/account-profile.html">My Profile</a> </li>
										<li> <a class="dropdown-item" href="<%=request.getContextPath()%>/tkt/Order?action=getMemOrd">My Bookings</a> </li>
										<li> <a class="dropdown-item" href="account-travelers.html">Travelers</a> </li>
										<li> <a class="dropdown-item" href="account-payment-details.html">Payment
												Details</a> </li>
										<li> <a class="dropdown-item" href="account-wishlist.html">Wishlist</a> </li>
										<li> <a class="dropdown-item" href="account-settings.html">Settings</a> </li>
										<li> <a class="dropdown-item" href="account-delete.html">Delete Profile</a>
										</li>
									</ul>
								</li>

								<!-- Dropdown submenu -->
								<li class="dropdown-submenu dropend">
									<a class="dropdown-item dropdown-toggle" href="#">Agent Dashboard</a>
									<ul class="dropdown-menu" data-bs-popper="none">
										<li> <a class="dropdown-item" href="agent-dashboard.html">Dashboard</a> </li>
										<li> <a class="dropdown-item" href="agent-listings.html">Listings</a> </li>
										<li> <a class="dropdown-item" href="agent-bookings.html">Bookings</a> </li>
										<li> <a class="dropdown-item" href="agent-activities.html">Activities</a> </li>
										<li> <a class="dropdown-item" href="agent-earnings.html">Earnings</a> </li>
										<li> <a class="dropdown-item" href="agent-reviews.html">Reviews</a> </li>
										<li> <a class="dropdown-item" href="agent-settings.html">Settings</a> </li>
									</ul>
								</li>

								<li> <a class="dropdown-item" href="admin-dashboard.html">Master Admin</a> </li>
							</ul>
						</li>

						<!-- Nav item Contact -->
						<li class="nav-item"> <a class="nav-link" href="contact.html">Contact Us</a> </li>
					</ul>
				</div>
				<!-- Main navbar END -->

				<!-- Profile and Notification START -->
				<ul class="nav flex-row align-items-center list-unstyled ms-xl-auto">

					<!-- Notification dropdown START -->
					<li class="nav-item ms-0 ms-md-3 dropdown">
						<!-- Notification button -->
						<a class="nav-link p-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"
							data-bs-auto-close="outside">
							<i class="bi bi-bell fa-fw fs-5"></i>
						</a>
						<!-- Notification dote -->
						<span class="notif-badge animation-blink"></span>

						<!-- Notification dropdown menu START -->
						<div
							class="dropdown-menu dropdown-animation dropdown-menu-end dropdown-menu-size-md p-0 shadow-lg">
							<div class="card bg-transparent">
								<!-- Card header -->
								<div
									class="card-header bg-transparent d-flex justify-content-between align-items-center border-bottom">
									<h6 class="m-0">Notifications <span
											class="badge bg-danger bg-opacity-10 text-danger ms-2">4 new</span></h6>
									<a class="small" href="#">Clear all</a>
								</div>

								<!-- Card body START -->
								<div class="card-body p-0">
									<ul class="list-group list-group-flush list-unstyled p-2">
										<!-- Notification item -->
										<li>
											<a href="#"
												class="list-group-item list-group-item-action rounded notif-unread border-0 mb-1 p-3">
												<h6 class="mb-2">New! Booking flights from New York ✈️</h6>
												<p class="mb-0 small">Find the flexible ticket on flights around the
													world. Start searching today</p>
												<span>Wednesday</span>
											</a>
										</li>
										<!-- Notification item -->
										<li>
											<a href="#"
												class="list-group-item list-group-item-action rounded border-0 mb-1 p-3">
												<h6 class="mb-2">Sunshine saving are here 🌞 save 30% or more on a stay
												</h6>
												<span>15 Nov 2022</span>
											</a>
										</li>
									</ul>
								</div>
								<!-- Card body END -->

								<!-- Card footer -->
								<div class="card-footer bg-transparent text-center border-top">
									<a href="#" class="btn btn-sm btn-link mb-0 p-0">See all incoming activity</a>
								</div>
							</div>
						</div>
						<!-- Notification dropdown menu END -->
					</li>
					<!-- Notification dropdown END -->

					<!-- Profile dropdown START -->
					<li class="nav-item ms-3 dropdown">
						<!-- Avatar -->
						<a class="avatar avatar-xs p-0" href="#" id="profileDropdown" role="button"
							data-bs-auto-close="outside" data-bs-display="static" data-bs-toggle="dropdown"
							aria-expanded="false">
							<img class="avatar-img rounded-circle" src="<%=request.getContextPath()%>/front_end/assets/images/avatar/01.jpg" alt="avatar">
						</a>

						<!-- Profile dropdown START -->
						<ul class="dropdown-menu dropdown-animation dropdown-menu-end shadow pt-3"
							aria-labelledby="profileDropdown">
							<!-- Profile info -->
							<li class="px-3 mb-3">
								<div class="d-flex align-items-center">
									<!-- Avatar -->
									<div class="avatar me-3">
										<img class="avatar-img rounded-circle shadow" src="<%=request.getContextPath()%>/front_end/assets/images/avatar/01.jpg"
											alt="avatar">
									</div>
									<div>
										<a class="h6 mt-2 mt-sm-0" href="#">Lori Ferguson</a>
										<p class="small m-0">example@gmail.com</p>
									</div>
								</div>
							</li>

							<!-- Links -->
							<li>
								<hr class="dropdown-divider">
							</li>
							<li><a class="dropdown-item" href="#"><i class="bi bi-bookmark-check fa-fw me-2"></i>My
									Bookings</a></li>
							<li><a class="dropdown-item" href="#"><i class="bi bi-heart fa-fw me-2"></i>My Wishlist</a>
							</li>
							<li><a class="dropdown-item" href="#"><i class="bi bi-gear fa-fw me-2"></i>Settings</a></li>
							<li><a class="dropdown-item" href="#"><i class="bi bi-info-circle fa-fw me-2"></i>Help
									Center</a></li>
							<li><a class="dropdown-item bg-danger-soft-hover" href="#"><i
										class="bi bi-power fa-fw me-2"></i>Sign Out</a></li>
							<li>
								<hr class="dropdown-divider">
							</li>

							<!-- Dark mode options START -->
							<li>
								<div
									class="nav-pills-primary-soft theme-icon-active d-flex justify-content-between align-items-center p-2 pb-0">
									<span>Mode:</span>
									<button type="button" class="btn btn-link nav-link text-primary-hover mb-0 p-0"
										data-bs-theme-value="light" data-bs-toggle="tooltip" data-bs-placement="top"
										data-bs-title="Light">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
											fill="currentColor" class="bi bi-sun fa-fw mode-switch" viewBox="0 0 16 16">
											<path
												d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
											<use href="#"></use>
										</svg>
									</button>
									<button type="button" class="btn btn-link nav-link text-primary-hover mb-0 p-0"
										data-bs-theme-value="dark" data-bs-toggle="tooltip" data-bs-placement="top"
										data-bs-title="Dark">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
											fill="currentColor" class="bi bi-moon-stars fa-fw mode-switch"
											viewBox="0 0 16 16">
											<path
												d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
											<path
												d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
											<use href="#"></use>
										</svg>
									</button>
									<button type="button"
										class="btn btn-link nav-link text-primary-hover mb-0 p-0 active"
										data-bs-theme-value="auto" data-bs-toggle="tooltip" data-bs-placement="top"
										data-bs-title="Auto">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
											fill="currentColor" class="bi bi-circle-half fa-fw mode-switch"
											viewBox="0 0 16 16">
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

					<!-- Button -->
					<li class="nav-item ms-3 d-none d-sm-block">
						<a class="btn btn-sm btn-primary-soft mb-0" href="#"><i class="bi bi-lightning-charge"></i>
							Upgrade now</a>
					</li>
				</ul>
				<!-- Profile and Notification START -->

			</div>
		</nav>
		<!-- Logo Nav END -->
	</header>
	<!-- Header END -->

	<!-- **************** MAIN CONTENT START **************** -->
	<main>

		<!-- =======================
Content START -->
		<section class="pt-3">
			<div class="container">
				<div class="row g-2 g-lg-4">

					<!-- Sidebar START -->
					<div class="col-lg-4 col-xl-3">
						<!-- Responsive offcanvas body START -->
						<div class="offcanvas-lg offcanvas-end" tabindex="-1" id="offcanvasSidebar">
							<!-- Offcanvas header -->
							<div class="offcanvas-header justify-content-end pb-2">
								<button type="button" class="btn-close" data-bs-dismiss="offcanvas"
									data-bs-target="#offcanvasSidebar" aria-label="Close"></button>
							</div>

							<!-- Offcanvas body -->
							<div class="offcanvas-body p-3 p-lg-0">
								<div class="card bg-light w-100">

									<!-- Edit profile button -->
									<div class="position-absolute top-0 end-0 p-3">
										<a href="#" class="text-primary-hover" data-bs-toggle="tooltip"
											data-bs-title="Edit profile">
											<i class="bi bi-pencil-square"></i>
										</a>
									</div>

									<!-- Card body START -->
									<div class="card-body p-3">
										<!-- Avatar and content -->
										<div class="text-center mb-3">
											<!-- Avatar -->
											<div class="avatar avatar-xl mb-2">
												<img class="avatar-img rounded-circle border border-2 border-white"
													src="<%=request.getContextPath()%>/front_end/assets/images/avatar/01.jpg" alt="">
											</div>
											<h6 class="mb-0">Jacqueline Miller</h6>
											<a href="#" class="text-reset text-primary-hover small">hello@gmail.com</a>
											<hr>
										</div>

										<!-- Sidebar menu item START -->
										<ul class="nav nav-pills-primary-soft flex-column">
											<li class="nav-item">
												<a class="nav-link" href="<%=request.getContextPath()%>/front_end/account-profile.html"><i
														class="bi bi-person fa-fw me-2"></i>My Profile</a>
											</li>
											<li class="nav-item">
												<a class="nav-link active" href="<%=request.getContextPath()%>/tkt/Order?action=getMemOrd"><i
														class="bi bi-ticket-perforated fa-fw me-2"></i>My Bookings</a>
											</li>
											<li class="nav-item">
												<a class="nav-link" href="account-travelers.html"><i
														class="bi bi-people fa-fw me-2"></i>Travelers</a>
											</li>
											<li class="nav-item">
												<a class="nav-link" href="account-payment-details.html"><i
														class="bi bi-wallet fa-fw me-2"></i>Payment Details</a>
											</li>
											<li class="nav-item">
												<a class="nav-link" href="account-wishlist.html"><i
														class="bi bi-heart fa-fw me-2"></i>Wishlist</a>
											</li>
											<li class="nav-item">
												<a class="nav-link" href="account-settings.html"><i
														class="bi bi-gear fa-fw me-2"></i>Settings</a>
											</li>
											<li class="nav-item">
												<a class="nav-link" href="account-delete.html"><i
														class="bi bi-trash fa-fw me-2"></i>Delete Profile</a>
											</li>
											<li class="nav-item">
												<a class="nav-link text-danger bg-danger-soft-hover" href="#"><i
														class="fas fa-sign-out-alt fa-fw me-2"></i>Sign Out</a>
											</li>
										</ul>
										<!-- Sidebar menu item END -->
									</div>
									<!-- Card body END -->
								</div>
							</div>
						</div>
						<!-- Responsive offcanvas body END -->
					</div>
					<!-- Sidebar END -->

					<!-- Main content START -->
					<div class="col-lg-8 col-xl-9 ps-xl-5">

						<!-- Offcanvas menu button -->
						<div class="d-grid mb-0 d-lg-none w-100">
							<button class="btn btn-primary mb-4" type="button" data-bs-toggle="offcanvas"
								data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
								<i class="fas fa-sliders-h"></i> Menu
							</button>
						</div>

						<div class="card border bg-transparent">
							<!-- Card header -->
							<div class="card-header bg-transparent border-bottom">
								<h4 class="card-header-title">訂單管理</h4>
							</div>

							<!-- Card body START -->
							<div class="card-body p-0">

								<!-- Tabs -->
								<ul class="nav nav-tabs nav-bottom-line nav-responsive nav-justified">
									<li class="nav-item">
										<a class="nav-link mb-0 active" data-bs-toggle="tab" href="#tab-1"><i
												class="bi bi-briefcase-fill fa-fw me-1"></i>我的訂單</a>
									</li>
									<li class="nav-item">
										<a class="nav-link mb-0" data-bs-toggle="tab" href="#tab-2"><i
												class="bi bi-x-octagon fa-fw me-1"></i>已取消</a>
									</li>
									<!-- <li class="nav-item"> 
								<a class="nav-link mb-0" data-bs-toggle="tab" href="#tab-3"><i class="bi bi-patch-check fa-fw me-1"></i>已完成</a> 
							</li> -->
								</ul>

								<!-- Tabs content START -->
								<div class="tab-content p-2 p-sm-4" id="nav-tabContent">

									<!-- Tab content item START -->
									<div class="tab-pane fade show active" id="tab-1">
										<h6>總筆數 (2)</h6>
										<!-- Card item START -->
<%-- 										<c:when test="${not empty tktOrdList}"> --%>
											<c:forEach var="tktOrd" items="${tktOrdList}">
											<a href="<%=request.getContextPath()%>/tkt/Order?action=getOrdDetails&tktOrdNo=${tktOrd.tktOrdNo}" class="card-link">
												<div class="card border mb-4">
													<!-- Card header -->
													<div
														class="card-header border-bottom d-md-flex justify-content-md-between align-items-center">
														<!-- Icon and Title -->
														<div class="d-flex align-items-center">
															<div class="icon-lg bg-light rounded-circle flex-shrink-0"><i
																	class="bi bi-bag-check"></i></div>
															<!-- Title -->
															<div class="ms-2">
																<h6 class="card-title mb-0">訂單編號: BS-${tktOrd.tktOrdNo}</h6>
																<ul class="nav nav-divider small">
<!-- 																	<li class="nav-item">票券: 六福村、Xpark</li> -->
																	<!-- <li class="nav-item">Business class</li> -->
																</ul>
															</div>
														</div>
	
														<!-- Button -->
														<div class="mt-2 mt-md-0">
															<a href="#" class="btn btn-primary-soft mb-0">取消訂單</a>
														</div>
													</div>
	
													<!-- Card body -->
													<div class="card-body">
														<div class="row g-3">
															<div class="col-sm-6 col-md-4">
																<span>成立時間</span>
																<h6 class="mb-0">
																<fmt:formatDate type="both" dateStyle="medium" timeStyle="medium" value="${tktOrd.ordDate}" />
																</h6>
															</div>
															<%--
															TktOrd tktOrd = (TktOrd) session.getAttribute("tktOrd");
															Date tktOrdDate = tktOrd.getOrdDate();
															Calendar calendar = Calendar.getInstance();
															calendar.setTime(tktOrdDate);
															calendar.add(Calendar.DAY_OF_MONTH, 30);
															Date newDate = calendar.getTime();
															--%>
															<div class="col-sm-6 col-md-4">
																<span>失效日期</span>
																<h6 class="mb-0"><fmt:formatDate type="date" value="${tktOrd.ordDate}" /></h6>
															</div>
	
															<div class="col-md-4">
																<span>實付總金額</span>
																<h6 class="mb-0">$ ${tktOrd.payPrice}</h6>
															</div>
														</div>
													</div>
												</div>
												</a>
												</c:forEach>
<%-- 										</c:when> --%>
										<!-- Card item END -->

										<!-- Card item START -->
<!-- 										<a href="#" class="card-link"> -->
<!-- 											<div class="card border mb-4"> -->
<!-- 												Card header -->
<!-- 												<div -->
<!-- 													class="card-header border-bottom d-md-flex justify-content-md-between align-items-center"> -->
<!-- 													Icon and Title -->
<!-- 													<div class="d-flex align-items-center"> -->
<!-- 														<div class="icon-lg bg-light rounded-circle flex-shrink-0"><i -->
<!-- 																class="bi bi-bag-check"></i></div> -->
<!-- 														Title -->
<!-- 														<div class="ms-2"> -->
<!-- 															<h6 class="card-title mb-0">訂單編號: CGDSUAHA12550</h6> -->
<!-- 															<ul class="nav nav-divider small"> -->
<!-- 																<li class="nav-item">票券: 兒童新樂園</li> -->
<!-- 																<li class="nav-item">Business class</li> -->
<!-- 															</ul> -->
<!-- 														</div> -->
<!-- 													</div> -->

<!-- 													Button -->
<!-- 													<div class="mt-2 mt-md-0"> -->
<!-- 														<a href="#" class="btn btn-primary-soft mb-0">取消訂單</a> -->
<!-- 													</div> -->
<!-- 												</div> -->

<!-- 												Card body -->
<!-- 												<div class="card-body"> -->
<!-- 													<div class="row g-3"> -->
<!-- 														<div class="col-sm-6 col-md-4"> -->
<!-- 															<span>成立時間</span> -->
<!-- 															<h6 class="mb-0">2023-08-01 12:00 AM</h6> -->
<!-- 														</div> -->

<!-- 														<div class="col-sm-6 col-md-4"> -->
<!-- 															<span>失效日期</span> -->
<!-- 															<h6 class="mb-0">2023-08-30 12:00 AM</h6> -->
<!-- 														</div> -->

<!-- 														<div class="col-md-4"> -->
<!-- 															<span>實付總金額</span> -->
<!-- 															<h6 class="mb-0">$200</h6> -->
<!-- 														</div> -->
<!-- 													</div> -->
<!-- 												</div> -->
<!-- 											</div> -->
<!-- 										</a> -->
										<!-- Card item END -->
									</div>
									<!-- Tabs content item END -->

									<!-- Tab content item START -->
										<div class="tab-pane fade" id="tab-2">
											<h6>總筆數 (1)</h6>

											<!-- Card item START -->
											<a href="#" class="card-link">
											<div class="card border">
												<!-- Card header -->
												<div
													class="card-header border-bottom d-md-flex justify-content-md-between align-items-center">
													<!-- Icon and Title -->
													<div class="d-flex align-items-center">
														<div class="icon-lg bg-light rounded-circle flex-shrink-0"><i
																class="bi bi-x-circle-fill"></i></div>
														<!-- Title -->
														<div class="ms-2">
															<h6 class="card-title mb-0">訂單編號: CGDSUAHA12548</h6>
															<ul class="nav nav-divider small">
																<li class="nav-item">票券: 劍湖山</li>
																<!-- <li class="nav-item">AC</li> -->
															</ul>
														</div>
													</div>

													<!-- Button -->
													<div class="mt-2 mt-md-0">
														<!-- <a href="#" class="btn btn-primary-soft mb-0">Manage Booking</a> -->
														<p class="text-danger text-md-end mb-0">訂單已取消</p>
													</div>
												</div>

												<!-- Card body -->
												<div class="card-body">
													<div class="row g-3">
														<div class="col-sm-6 col-md-4">
															<span>成立時間</span>
															<h6 class="mb-0">2023-06-20 10:32 AM</h6>
														</div>

														<div class="col-sm-6 col-md-4">
															<span>取消時間</span>
															<h6 class="mb-0">2023-06-24 4:00 PM</h6>
														</div>

														<div class="col-md-4">
															<span>實付總金額</span>
															<h6 class="mb-0">$800</h6>
														</div>
													</div>
												</div>
											</div>
										</a>
											<!-- Card item END -->
										</div>
									<!-- Tabs content item END -->

									<!-- Tab content item START -->
									<div class="tab-pane fade" id="tab-3">
										<div class="bg-mode shadow p-4 rounded overflow-hidden">
											<div class="row g-4 align-items-center">
												<!-- Content -->
												<div class="col-md-9">
													<h6>Looks like you have never booked with BOOKING</h6>
													<h4 class="mb-2">When you book your trip will be shown here.</h4>
													<a href="hotel-list.html" class="btn btn-primary-soft mb-0">Start
														booking now</a>
												</div>
												<!-- Image -->
												<div class="col-md-3 text-end">
													<img src="<%=request.getContextPath()%>/front_end/assets/images/element/17.svg" class="mb-n5" alt="">
												</div>
											</div>
										</div>

									</div>
									<!-- Tabs content item END -->
								</div>

							</div>
							<!-- Card body END -->
						</div>

					</div>
					<!-- Main content END -->
				</div>
			</div>
		</section>
		<!-- =======================
Content END -->

	</main>
	<!-- **************** MAIN CONTENT END **************** -->

	<!-- =======================
Footer START -->
	<footer class="bg-dark p-3">
		<div class="container">
			<div class="row align-items-center">

				<!-- Widget -->
				<div class="col-md-4">
					<div class="text-center text-md-start mb-3 mb-md-0">
						<a href="<%=request.getContextPath()%>/front_end/index.html"> <img class="h-30px" src="<%=request.getContextPath()%>/front_end/assets/images/logo-light.svg" alt="logo"> </a>
					</div>
				</div>

				<!-- Widget -->
				<div class="col-md-4">
					<div class="text-muted text-primary-hover"> Copyrights ©2023 Booking. Build by <a
							href="https://www.webestica.com/" class="text-muted">Webestica</a>. </div>
				</div>

				<!-- Widget -->
				<div class="col-md-4">
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
	</footer>
	<!-- =======================
Footer END -->

	<!-- Back to top -->
	<div class="back-top"></div>

	<!-- Bootstrap JS -->
	<script src="<%=request.getContextPath()%>/front_end/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>

	<!-- ThemeFunctions -->
	<script src="<%=request.getContextPath()%>/front_end/assets/js/functions.js"></script>

</body>

</html>