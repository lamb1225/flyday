package web.mem.meminfo.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Base64;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.google.gson.Gson;

import web.mem.meminfo.entity.Mem;
import web.mem.meminfo.service.MemService;

@WebServlet("/mem/updateImage")
@MultipartConfig
public class UpdateImageServlet extends HttpServlet {
	private static final long serialVersionUID = -5064890387897126009L;
	private MemService service;
	
	public void init() throws ServletException{
		ApplicationContext applicationContext = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
		service = applicationContext.getBean(MemService.class);	
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		Part part = req.getPart("image");
		String memNoString = req.getParameter("memNo");
		
		Mem mem ;
		
		if(part == null || memNoString == null) {
			mem = new Mem();
			mem.setMessage("無圖片資料");
			mem.setSuccessful(false);
		}else {
			try(InputStream in = part.getInputStream();){
				byte[] memPic = in.readAllBytes();
				Integer memNo = Integer.parseInt(memNoString);
				mem = service.changePersonalImage(memPic, memNo);
				
				String memPicBase64 = Base64.getEncoder().encodeToString(memPic); 
				mem.setMemPicBase64(memPicBase64);
			}	
		}
		
		Gson gson = new Gson();	
		resp.setContentType("application/json");
		try(PrintWriter pw = resp.getWriter();){
			pw.print(gson.toJson(mem));	
		}
		
	}	
	
}
