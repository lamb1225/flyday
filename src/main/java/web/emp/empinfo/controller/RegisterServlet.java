package web.emp.empinfo.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.google.gson.Gson;

import web.emp.empinfo.entity.Emp;
import web.emp.empinfo.service.EmpService;

@WebServlet("/emp/register")

public class RegisterServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;
	private EmpService service;
	
	public void init() throws ServletException{
		ApplicationContext applicationContext = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
		service = applicationContext.getBean(EmpService.class);	
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		try(BufferedReader br = req.getReader();){
			Gson gson = new Gson();
			Emp emp = gson.fromJson(br, Emp.class);
			
			emp = service.register(emp);
			resp.setContentType("application/json");
			try(PrintWriter pw = resp.getWriter();){
				pw.print(gson.toJson(emp));	
			}
		}
	}

}
