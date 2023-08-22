package web.mem.meminfo.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import web.mem.meminfo.entity.Mem;




@WebServlet("/mem/getOneInfo")
public class GetOneInfoServlet extends HttpServlet {

	private static final long serialVersionUID = 5307039260388838781L;
	
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Mem mem = (Mem) req.getSession().getAttribute("mem");
		Gson gson = new Gson();	
		
		try(PrintWriter pw = resp.getWriter();){
			pw.print(gson.toJson(mem));			
		}
	}
	

}
