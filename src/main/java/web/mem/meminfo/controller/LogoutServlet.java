package web.mem.meminfo.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/mem/logout")
public class LogoutServlet extends HttpServlet {

	private static final long serialVersionUID = 5909812599328748946L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.getSession().invalidate();
//		resp.sendRedirect(req.getContextPath() + "/front_end/index.html");	//直接用網址對此servlet發送請求，可以直接跳轉首頁
	}
	
}
