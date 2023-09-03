package web.store.store.controller;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import core.util.CommonUtil;
import web.store.store.entity.Store;
import web.store.store.service.StoreMemberService;

@WebServlet("/store/login")
public class LoginServlet extends HttpServlet{
	private static final long serialVersionUID = 1062017833925367218L;
	private StoreMemberService service;
	
	@Override
	public void init() throws ServletException{
		service = CommonUtil.getBean(getServletContext(), StoreMemberService.class);
	}
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response){
		Store store = json2Pojo(request, Store.class);
			
		if (store == null) {
			store = new Store();
			store.setMessage("無會員資料");
			store.setSuccessful(false);
			response.setContentType("application/json");
			writePojo2Json(response, store);
			return;
		}
		store = service.login(store);
		if (store.isSuccessful()) {
			if (request.getSession(false) != null) {
				request.changeSessionId();
			}
			final HttpSession session = request.getSession();
			session.setAttribute("loggedin", true);
			session.setAttribute("store", store);
		}
		
		
		writePojo2Json(response, store);
		 
	}
}
