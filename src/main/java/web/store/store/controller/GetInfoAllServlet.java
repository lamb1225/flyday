package web.store.store.controller;

import static core.util.CommonUtil.writePojo2Json;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import core.util.CommonUtil;
import web.store.store.service.StoreMemberService;

@WebServlet("/store/getinfoall")
public class GetInfoAllServlet extends HttpServlet {
	private static final long serialVersionUID = 1062017833925367218L;
	private StoreMemberService service;
	
	@Override
	public void init() throws ServletException {
		service = CommonUtil.getBean(getServletContext(), StoreMemberService.class);
	}
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) {
		writePojo2Json(response, service.findAll());
	}
}
