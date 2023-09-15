package web.mem.meminfo.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Base64;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.google.gson.Gson;

import core.util.EmailSender;
import redis.clients.jedis.Jedis;
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
		
		Gson gson = new Gson();
		Mem mem;
		
		try(BufferedReader br = req.getReader();){
			mem = gson.fromJson(br, Mem.class);
		}

		mem = service.register(mem);
		
		if(mem.isSuccessful()) {
		
			EmailSender emailSender = new EmailSender();
			String randomString = Base64.getEncoder().encodeToString((mem.getMemAcc() + System.currentTimeMillis()).getBytes());
			
			//存放到redis
			try(Jedis jedis = new Jedis();){
				jedis.set(mem.getMemNo().toString(), randomString);
				jedis.expire(mem.getMemNo().toString(), 259200);
			}
			
			//回送資料回前端
			resp.setContentType("application/json");
			try(PrintWriter pw = resp.getWriter();){
				pw.print(gson.toJson(mem));	
				System.out.println("XXX");
			}
			System.out.println("XXX");
			//寄驗證信移到最後，因為完成寄驗證信需要時間，避免影響使用者體驗
			String to = mem.getMemEmail();
			String subject = "【Flyday】會員功能啟用信";
			String messageText = "親愛的Flyday會員您好：" + "\n" 
									+ "請點選以下連結完成會員功能啟用：\n\n" 	
									+ req.getScheme() + "://" + req.getServerName() + ":" 
									+ req.getServerPort() + req.getContextPath() + "/mem/activate"
									+ "?no=" + mem.getMemNo()
									+ "&urlLink=" + randomString + "\n\n此連結將於3天內失效";
			
			emailSender.sendMail(to, subject, messageText);
		}else {
			
			//回送資料回前端
			resp.setContentType("application/json");
			try(PrintWriter pw = resp.getWriter();){
				pw.print(gson.toJson(mem));	
				System.out.println("XXX");
			}
		}
		
	}

}
