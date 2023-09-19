<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
</head>
	<body>
		<div id="msg" style="display: none;">${mem.message}</div>

		<!-- 載入sweetalert-->
		<script src="/flyday/front_end/myassets/js/sweetalert2.all.min.js"></script> 
		
		<script>
			const msg = document.getElementById("msg");

			window.addEventListener("load", function(){
				const timer = setTimeout(function(){
					Swal.fire(
						msg.textContent,
						'',
						'warning'
					).then(function(){
						clearTimeout(timer);
						location = "<%=request.getContextPath()%>/front_end/sign-in.html";
					})
				},500);
			})

		</script>
	</body>
</html>