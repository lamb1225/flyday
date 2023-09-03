package web.pkg.pkgmanage.controller.pkgpic;

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
import web.pkg.pkgmanage.entity.PkgPic;
import web.pkg.pkgmanage.service.PkgPicService;

@WebServlet("/pkgpic/remove")
public class RemoveServlet extends HttpServlet{
	private static final long serialVersionUID = 1062017833925367218L;
	private PkgPicService service;
	
	@Override
	public void init() throws ServletException {
		service = CommonUtil.getBean(getServletContext(), PkgPicService.class);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException,IOException {
		final Integer pkgpicno = json2Pojo(request, PkgPic.class).getPkgPicNo();
		final Core core = new Core();
		
		core.setSuccessful(service.remove(pkgpicno));
		writePojo2Json(response, core);
	}
}
