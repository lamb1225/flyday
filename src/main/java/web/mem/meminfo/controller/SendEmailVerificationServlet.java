package web.mem.meminfo.controller;


import com.google.gson.Gson;
import core.util.EmailSender;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import redis.clients.jedis.Jedis;
import web.mem.meminfo.entity.Mem;
import web.mem.meminfo.service.MemService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/mem/sendEmailVerification")
public class SendEmailVerificationServlet extends HttpServlet {

	private static final long serialVersionUID = 5238230742500972878L;
	private MemService service;
	
	public void init() throws ServletException {
		ApplicationContext applicationContext = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
		service = applicationContext.getBean(MemService.class);	
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		try(BufferedReader br = req.getReader();){
			Gson gson = new Gson();
			Mem mem = gson.fromJson(br, Mem.class);
			
			mem = service.checkEmail(mem);
			
			try(Jedis jedis = new Jedis("localhost", 6379);){
				if(mem.isSuccessful()) {
					String verifiedNumber = String.valueOf((int)(Math.random()*1000000)+1);
					switch (verifiedNumber.length()) {
					case 1:
						verifiedNumber = "00000" + verifiedNumber;
						break;
					case 2:
						verifiedNumber = "0000" + verifiedNumber;
						break;
					case 3:
						verifiedNumber = "000" + verifiedNumber;
						break;
					case 4:
						verifiedNumber = "00" + verifiedNumber;
						break;
					case 5:
						verifiedNumber = "0" + verifiedNumber;
						break;
					}	
					
					jedis.set(mem.getMemEmail(),verifiedNumber);
					jedis.expire(mem.getMemEmail(), 600);
					
					EmailSender emailSender = new EmailSender();
					String to = mem.getMemEmail();
					String subject = "【Flyday】變更信箱驗證碼";
					String messageText = "親愛的Flyday會員您好：" + "\n" 
											+ "請使用以下驗證碼完成信箱修改：" + "\n\n" + verifiedNumber + "\n\n"
												+ "驗證碼將於10分鐘內失效，" + "\n" +"若您未要求變更信箱，可忽略此封電子郵件。";
					
					emailSender.sendMail(to, subject, messageText);
				}
			}
			
			resp.setContentType("application/json");
			try(PrintWriter pw = resp.getWriter();){
				pw.print(gson.toJson(mem));	
			}
		}
		
	}
	
	
}
