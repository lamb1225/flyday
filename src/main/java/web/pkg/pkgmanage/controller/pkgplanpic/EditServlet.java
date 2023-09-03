package web.pkg.pkgmanage.controller.pkgplanpic;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import core.util.CommonUtil;
import web.pkg.pkgmanage.entity.PkgPlanPic;
import web.pkg.pkgmanage.service.PkgPlanPicService;

@WebServlet("/pkgplanpic/edit")
public class EditServlet extends HttpServlet{
	private static final long serialVersionUID = 1062017833925367218L;
	private PkgPlanPicService service;
	
	@Override
	public void init() throws ServletException {
		service = CommonUtil.getBean(getServletContext(), PkgPlanPicService.class);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response){
		PkgPlanPic pkgPlanPic = json2Pojo(request, PkgPlanPic.class);
		writePojo2Json(response, service.edit(pkgPlanPic));
	}
}
