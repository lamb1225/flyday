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
import javax.servlet.http.HttpSession;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.google.gson.Gson;

import core.util.EmailSender;
import redis.clients.jedis.Jedis;
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
			
			//把寄驗證信移到流程最末，因為完成寄驗證信需要時間，避免影響使用者體驗
			if(mem.getMemAccStatus() == 0) {
				
				EmailSender emailSender = new EmailSender();
				
				String randomString = Base64.getEncoder().encodeToString((mem.getMemAcc() + System.currentTimeMillis()).getBytes());
				String urlLink = randomString.substring(0,30);
				
				try(Jedis jedis = new Jedis();){
					jedis.set(mem.getMemNo().toString(), urlLink);
					jedis.expire(mem.getMemNo().toString(), 259200);
				}
				
				String to = mem.getMemEmail();
				String subject = "【Flyday】會員功能啟用信";
				String messageText = "親愛的Flyday會員您好：" + "\n" 
										+ "請點選以下連結完成會員功能啟用：\n\n" 
										+ "http://localhost:8081/flyday/mem/activate?no=" + mem.getMemNo()
										+ "&urlLink=" + urlLink + "\n\n此連結將於3天內失效";
				
				emailSender.sendMail(to, subject, messageText);
			}
			
			
		}	
	}
}
