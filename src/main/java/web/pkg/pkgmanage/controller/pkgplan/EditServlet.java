package web.pkg.pkgmanage.controller.pkgplan;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import core.util.CommonUtil;
import web.pkg.pkgmanage.entity.PkgPlan;
import web.pkg.pkgmanage.service.PkgPlanService;

@WebServlet("/pkgplan/edit")
public class EditServlet extends HttpServlet{
	private static final long serialVersionUID = 1062017833925367218L;
	private PkgPlanService service;
	
	@Override
	public void init() throws ServletException {
		service = CommonUtil.getBean(getServletContext(), PkgPlanService.class);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response){
		final HttpSession session = request.getSession();
		final Integer pkgno = ((PkgPlan)session.getAttribute("pkgPlan")).getPkgNo();
		PkgPlan pkgPlan = json2Pojo(request, PkgPlan.class);
		pkgPlan.setPkgNo(pkgno);
		writePojo2Json(response, service.edit(pkgPlan));
	}
}
