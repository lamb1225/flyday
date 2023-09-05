package web.mem.meminfo.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import redis.clients.jedis.Jedis;
import web.mem.meminfo.entity.Mem;
import web.mem.meminfo.service.MemService;

@WebServlet("/mem/activate")
public class ActivateAccountServlet extends HttpServlet{

	private static final long serialVersionUID = -4176800136876072745L;
	private MemService service;
	
	public void init() throws ServletException{
		ApplicationContext applicationContext = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
		service = applicationContext.getBean(MemService.class);	
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		Integer memNo = Integer.valueOf(req.getParameter("no"));
		String urlLink = req.getParameter("urlLink");
		
		Mem mem = new Mem();
		
		try(Jedis jedis = new Jedis();){
			if(urlLink.equals(jedis.get(memNo.toString()))) {
				service.activateAccStatus(memNo);
				mem.setMessage("會員啟用成功，請重新登入");
				mem.setSuccessful(true);
			}else {
				mem.setMessage("驗證信已失效，會員啟用失敗，請重新登入領取驗證信");
				mem.setSuccessful(false);
			}
		}
		req.setAttribute("mem", mem);
		RequestDispatcher dispatcher = req.getRequestDispatcher("/front_end/activateResult.jsp");
		dispatcher.forward(req, resp);
	}
	
}
