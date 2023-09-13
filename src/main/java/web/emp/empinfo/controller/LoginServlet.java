package web.emp.empinfo.controller;

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

import web.emp.empinfo.entity.Emp;
import web.emp.empinfo.service.EmpService;


@WebServlet("/emp/login")
public class LoginServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	private EmpService service;
//	private EmpStatus service;

	public void init() throws ServletException{
		ApplicationContext applicationContext = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
		service = applicationContext.getBean(EmpService.class);	
		
	}
	//增加區分區塊邏輯
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try(BufferedReader br = request.getReader();){
			Gson gson = new Gson();
			Emp emp = gson.fromJson(br, Emp.class);
			
			if(emp == null) {
				emp = new Emp();
				emp.setMessage("無會員資訊");
				emp.setSuccessful(false);
				response.setContentType("application/json");
				PrintWriter pw = response.getWriter();
				pw.print(gson.toJson(emp));	
				return;	
			}
			
			emp = service.login(emp);
			if(emp.isSuccessful()) {
				if(request.getSession(false) != null) {
					request.changeSessionId();
				}
				final HttpSession session = request.getSession();
				session.setAttribute("loggedin", true);
				session.setAttribute("emp", emp);
			}
			//將emp存入json,存入什麼依html設定
			response.setContentType("application/json");
			try(PrintWriter pw = response.getWriter();){
				pw.print(gson.toJson(emp));	
			}
		}	
	}
	

	public class GetEmpStatusServlet extends HttpServlet {
		private static final long serialVersionUID = 1L;
		protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	        String empStatus = (String) request.getSession().getAttribute("empStatus");
	        response.getWriter().write(empStatus);
	    }
	}

}
