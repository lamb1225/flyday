package web.mem.meminfo.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.google.gson.Gson;

import core.util.EmailSender;
import redis.clients.jedis.Jedis;
import web.mem.meminfo.entity.Mem;
import web.mem.meminfo.service.MemService;

@WebServlet("/mem/forgetPassword")
@MultipartConfig
public class ForgetPasswordServlet extends HttpServlet{

	private static final long serialVersionUID = -6842681618431248472L;
	private MemService service;
	
	public void init() throws ServletException{
		ApplicationContext applicationContext = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
		service = applicationContext.getBean(MemService.class);	
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		String action = req.getParameter("action");
		
		if("sendEmail".equals(action)) {
			String memEmail = req.getParameter("memEmail");
			
			Mem mem = service.checkEmailExists(memEmail);
			
			if(mem == null) {
				mem = new Mem();
				mem.setMessage("此電子信箱不存在");
				mem.setSuccessful(false);
			}else {
				mem.setMessage("驗證信已發送");
				mem.setSuccessful(true);
				
				Gson gson = new Gson();
				resp.setContentType("application/json");
				try(PrintWriter pw = resp.getWriter();){
					pw.print(gson.toJson(mem));	
				}
				
				try(Jedis jedis = new Jedis("localhost", 6379);){
					
					req.getSession().setAttribute("memAcc", mem.getMemAcc());
					req.getSession().setAttribute("memNo", mem.getMemNo());
					
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
					String subject = "【Flyday】忘記密碼驗證信";
					String messageText = "親愛的Flyday會員您好：" + "\n" 
											+ "請使用以下驗證碼完成會員驗證：" + "\n\n" + verifiedNumber + "\n\n"
												+ "驗證碼將於10分鐘內失效，" + "\n" +"若您未發送忘記密碼請求，可忽略此封電子郵件。";
					
					emailSender.sendMail(to, subject, messageText);
					
				}
			}
		}
		
		if("resetPassword".equals(action)) {
			String memEmail = req.getParameter("memEmail");
			String verificationInput = req.getParameter("verificationInput");
			
			Mem mem = new Mem();
			try(Jedis jedis = new Jedis();){
				if(!verificationInput.equals(jedis.get(memEmail))) {
					mem.setMessage("驗證碼輸入錯誤或驗證碼已失效");
					mem.setSuccessful(false);					
				}else {
					mem.setMessage("驗證成功，請輸入新密碼");
					mem.setSuccessful(true);
				}
			}
			
			Gson gson = new Gson();
			resp.setContentType("application/json");
			try(PrintWriter pw = resp.getWriter();){
				pw.print(gson.toJson(mem));	
			}
			
		}
		
		if("accLoaded".equals(action)) {
			String memAcc =(String)req.getSession().getAttribute("memAcc");
			PrintWriter pw = resp.getWriter();
			pw.print(memAcc);
		}
		
		
		if("updatePassword".equals(action)) {
			String newMemPwd = DigestUtils.sha256Hex((String) req.getParameter("newMemPwd"));
			Integer memNo = (Integer)req.getSession().getAttribute("memNo");
			
			Mem mem = new Mem();
			
			if(newMemPwd.equals(service.checkMemInfoByMemNo(memNo).getMemPwd())) {
				mem.setMessage("輸入的密碼為舊密碼，請輸入新密碼");
				mem.setSuccessful(false);
			}else if(service.renewPwd(newMemPwd, memNo) < 1) {
				mem.setMessage("密碼更新失敗，請聯絡管理員");
				mem.setSuccessful(false);
			}else {
				mem.setMessage("密碼更新成功！請重新登入");
				mem.setSuccessful(true);
			}
			
			Gson gson = new Gson();
			resp.setContentType("application/json");
			try(PrintWriter pw = resp.getWriter();){
				pw.print(gson.toJson(mem));	
			}
			
		}
		
	}
	
}
