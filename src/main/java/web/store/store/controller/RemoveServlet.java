package web.store.store.controller;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import core.entity.Core;
import core.util.CommonUtil;
import web.store.store.entity.StoreMember;
import web.store.store.service.StoreMemberService;

@WebServlet("/store/remove")
public class RemoveServlet extends HttpServlet {
	private static final long serialVersionUID = 1062017833925367218L;
	private StoreMemberService service;
	
	@Override
	public void init() throws ServletException{
		service = CommonUtil.getBean(getServletContext(), StoreMemberService.class);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException,IOException {
		final Integer storeno = json2Pojo(request, StoreMember.class).getStoreNo();
		final Core core = new Core();
		if (storeno == null) {
			core.setMessage("無id");
			core.setSuccessful(false);
		} else {
			core.setSuccessful(service.remove(storeno));
		}
		writePojo2Json(response, core);
		
	}
}
