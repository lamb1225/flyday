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

@WebServlet("/pkgplanpic/select")
public class SelectPkgPlanNoServlet extends HttpServlet{
	private static final long serialVersionUID = 1062017833925367218L;
	private PkgPlanPicService service;
	
	@Override
	public void init() throws ServletException {
		service = CommonUtil.getBean(getServletContext(), PkgPlanPicService.class);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response){
		final Integer pkgplanno = json2Pojo(request, PkgPlanPic.class).getPkgPlanNo();
		writePojo2Json(response, service.findall(pkgplanno));
	}
}
