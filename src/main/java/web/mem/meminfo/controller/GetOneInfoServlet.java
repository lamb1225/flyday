package web.mem.meminfo.controller;

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

@WebServlet("/mem/getOneInfo")
public class GetOneInfoServlet extends HttpServlet {

	private static final long serialVersionUID = 5307039260388838781L;
	private MemService service;
	
	public void init() throws ServletException{
		ApplicationContext applicationContext = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
		service = applicationContext.getBean(MemService.class);	
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Mem oldMem = (Mem) req.getSession().getAttribute("mem");	//先拿存在session的舊有資料
		
		//每次load都要去資料庫確認拿到的資料是否為正確，要拿新資料回來
		Mem mem = service.checkMemInfoByMemNo(oldMem.getMemNo());
		
		Gson gson = new Gson();	
		
		//取消快取
		resp.setHeader("Cache-Control", "no-store");
		resp.setHeader("Pragma", "no-cache");
		resp.setDateHeader("Expires", 0);
		
		try(PrintWriter pw = resp.getWriter();){
			pw.print(gson.toJson(mem));			
		}
	}
}
