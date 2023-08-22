package web.mem.meminfo.controller;

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

import web.mem.meminfo.entity.Mem;
import web.mem.meminfo.service.MemService;

@WebServlet("/mem/register")

public class RegisterServlet extends HttpServlet{

	private static final long serialVersionUID = -3762986789619729887L;
	private MemService service;
	
	public void init() throws ServletException{
		ApplicationContext applicationContext = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
		service = applicationContext.getBean(MemService.class);	
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		try(BufferedReader br = req.getReader();){
			Gson gson = new Gson();
			Mem mem = gson.fromJson(br, Mem.class);
			
			mem = service.register(mem);
			resp.setContentType("application/json");
			try(PrintWriter pw = resp.getWriter();){
				pw.print(gson.toJson(mem));	
			}
		}
	}

}
