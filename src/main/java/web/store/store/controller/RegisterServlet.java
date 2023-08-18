package web.store.store.controller;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import core.util.CommonUtil;
import web.store.store.entity.StoreMember;
import web.store.store.service.StoreMemberService;

@WebServlet("/store/register")
public class RegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1062017833925367218L;
	private StoreMemberService service;

	@Override
	public void init() throws ServletException {
		service = CommonUtil.getBean(getServletContext(), StoreMemberService.class);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response){

		StoreMember storeMember = json2Pojo(request, StoreMember.class);

		if (storeMember == null) {
			storeMember = new StoreMember();
			storeMember.setMessage("無會員資訊");
			storeMember.setSuccessful(false);
			writePojo2Json(response, storeMember);
			return;
		}

		storeMember = service.register(storeMember);
		writePojo2Json(response, storeMember);
		
	}
}
