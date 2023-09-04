package web.mem.meminfo.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.google.gson.Gson;

import web.mem.meminfo.entity.Mem;
import web.mem.meminfo.service.MemService;


@WebServlet("/mem/login")
public class LoginServlet extends HttpServlet {
	
	private static final long serialVersionUID = -656723692630631861L;
	private MemService service;

	public void init() throws ServletException{
		ApplicationContext applicationContext = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
		service = applicationContext.getBean(MemService.class);	
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		if(request.getSession(false) != null) {
			request.getSession().invalidate(); 		//用來刪除在忘記密碼操作時存放的session memNo、memAcc資料
		}
		
		try(BufferedReader br = request.getReader();){
			Gson gson = new Gson();
			Mem mem = gson.fromJson(br, Mem.class);
			
			if(mem == null) {
				mem = new Mem();
				mem.setMessage("無會員資訊");
				mem.setSuccessful(false);
				response.setContentType("application/json");
				PrintWriter pw = response.getWriter();
				pw.print(gson.toJson(mem));	
				return;	
			}
			mem = service.login(mem);
			if(mem.isSuccessful()) {
				if(request.getSession(false) != null) {
					request.changeSessionId();
				}
				final HttpSession session = request.getSession();
				session.setAttribute("mem", mem);
			}
			response.setContentType("application/json");
			try(PrintWriter pw = response.getWriter();){
				pw.print(gson.toJson(mem));	
			}
		}	
	}
}
