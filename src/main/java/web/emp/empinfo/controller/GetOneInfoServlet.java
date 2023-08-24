package web.emp.empinfo.controller;


import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import web.emp.empinfo.entity.Emp;

@WebServlet("/emp/getOneInfo")
public class GetOneInfoServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Emp emp = (Emp) req.getSession().getAttribute("emp");
		Gson gson = new Gson();	
		
		try(PrintWriter pw = resp.getWriter();){
			pw.print(gson.toJson(emp));			
		}
	}
}
