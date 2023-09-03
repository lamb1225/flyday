package web.pkg.pkgmanage.controller.pkgplan;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import core.util.CommonUtil;
import web.pkg.pkgmanage.entity.PkgPlan;
import web.pkg.pkgmanage.service.PkgPlanService;

@WebServlet("/pkgplan/selectpkgplanno")
public class SelectPkgPlanNoServlet extends HttpServlet{
	private static final long serialVersionUID = 1062017833925367218L;
	private PkgPlanService service;
	
	@Override
	public void init() throws ServletException {
		service = CommonUtil.getBean(getServletContext(), PkgPlanService.class);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response){
		final Integer pkgPlanno = json2Pojo(request, PkgPlan.class).getPkgPlanNo();
		
		writePojo2Json(response, service.select(pkgPlanno));
	}
}
