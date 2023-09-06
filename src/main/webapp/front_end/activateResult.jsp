<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div id="msg" style="display: none;">${mem.message}</div>
<script>
	const msg = document.getElementById("msg");
	window.addEventListener("load", function(){
		const timer = setInterval(function(){
			alert(msg.textContent);
			clearInterval(timer);
			location = "<%=request.getContextPath()%>/front_end/sign-in.html";
		},500);
	})

</script>
</body>
</html>