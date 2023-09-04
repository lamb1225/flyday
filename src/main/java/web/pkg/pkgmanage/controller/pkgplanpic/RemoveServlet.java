package web.pkg.pkgmanage.controller.pkgplanpic;

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
import web.pkg.pkgmanage.entity.PkgPlanPic;
import web.pkg.pkgmanage.service.PkgPlanPicService;

@WebServlet("/pkgplanpic/remove")
public class RemoveServlet extends HttpServlet{
	private static final long serialVersionUID = 1062017833925367218L;
	private PkgPlanPicService service;
	
	@Override
	public void init() throws ServletException {
		service = CommonUtil.getBean(getServletContext(), PkgPlanPicService.class);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException,IOException {
		final Integer pkgplanpicno = json2Pojo(request, PkgPlanPic.class).getPkgPlanPicNo();
		final Core core = new Core();
		
		core.setSuccessful(service.remove(pkgplanpicno));
		writePojo2Json(response, core);
	}
}
