package web.mem.meminfo.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import web.mem.meminfo.service.MemService;

@WebServlet("/mem/updatePassword")
public class UpdatePasswordServlet extends HttpServlet {
	
	private static final long serialVersionUID = -6631721955377861455L;
	private MemService service;

	public void init() throws ServletException{
		ApplicationContext applicationContext = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
		service = applicationContext.getBean(MemService.class);	
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		String memPwd = DigestUtils.sha256Hex(req.getParameter("newMemPwd"));
		Integer memNo = Integer.valueOf(req.getParameter("memNo"));
		
		String errMsg = "";
		String successMsg = "";
		
		if(memPwd.equals(service.checkMemInfoByMemNo(memNo).getMemPwd())) {
			errMsg = "輸入的密碼為舊密碼，請輸入新密碼";
		}

		if(service.renewPwd(memPwd, memNo)< 1) {
			errMsg = "密碼更新失敗，請聯絡管理員";
		}
		
		if(errMsg.length() != 0) {
			req.setAttribute("errMsg", errMsg);
			RequestDispatcher dispatcher = req.getRequestDispatcher("/front_end/new-password-signed.jsp");
			dispatcher.forward(req, resp);
			return;
		}
		
		successMsg = "密碼成功變更！即將跳轉頁面！";
		req.setAttribute("successMsg", successMsg);
		RequestDispatcher dispatcher = req.getRequestDispatcher("/front_end/new-password-signed.jsp");
		dispatcher.forward(req, resp);
		
	}

	
	
}
