package web.mem.meminfo.controller;


import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import web.mem.meminfo.entity.Mem;
import web.mem.meminfo.service.MemService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/mem/checkEmailVerification")
public class CheckEmailVerificationServlet extends HttpServlet {

	private static final long serialVersionUID = 5044098255689450019L;
	private MemService service;
	
	public void init() throws ServletException {
		ApplicationContext applicationContext = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
		service = applicationContext.getBean(MemService.class);	
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		String verificationInput = "";
		String myNewEmail = "";
		
		try(BufferedReader br = req.getReader();){		//取得非entity的Json物件內容
			JsonObject jsonObject = JsonParser.parseReader(br).getAsJsonObject();
			verificationInput = jsonObject.get("verificationInput").getAsString();
			myNewEmail = jsonObject.get("myNewEmail").getAsString();
		}
		
		HttpSession session = req.getSession();
		Mem loggedMem = (Mem)session.getAttribute("mem");
		Integer memNo = loggedMem.getMemNo();
		
		Mem mem = service.renewEmail(verificationInput, myNewEmail, memNo);
		
		if(mem.isSuccessful()) {
			loggedMem.setMemEmail(myNewEmail);
			session.setAttribute("mem", loggedMem);
		}
		
		Gson gson = new Gson();
		try(PrintWriter pw = resp.getWriter();){
			pw.print(gson.toJson(mem));			
		}
	}
}
