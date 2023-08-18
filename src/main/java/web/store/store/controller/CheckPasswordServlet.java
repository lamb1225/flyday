package web.store.store.controller;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

import java.util.Objects;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import core.entity.Core;
import web.store.store.entity.StoreMember;

@WebServlet("/store/checkpassword")
public class CheckPasswordServlet extends HttpServlet {
	private static final long serialVersionUID = 1062017833925367218L;
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) {
		final String password = json2Pojo(request, StoreMember.class).getStorePwd();
		final StoreMember storeMember = (StoreMember) request.getSession().getAttribute("storeMember");
		final Core core = new Core();
		if (storeMember == null) {
			core.setMessage("無會員資訊");
			core.setSuccessful(false);
		} else {
			final String currentPassword = storeMember.getStorePwd();
			if (Objects.equals(password, currentPassword)) {
				core.setSuccessful(true);
			} else {
				core.setMessage("舊密碼錯誤");
				core.setSuccessful(false);
			}
		}
		writePojo2Json(response, core);
	}
}
