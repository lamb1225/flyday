package web.pkg.pkgmanage.controller.pkgplandetails;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import core.util.CommonUtil;
import web.pkg.pkgmanage.entity.PkgPlanDetails;
import web.pkg.pkgmanage.service.PkgPlanDetailsService;

@WebServlet("/pkgplandetails/selectpkgplandetailsno")
public class SelectPkgPlanDetailsServlet extends HttpServlet{
	private static final long serialVersionUID = 1062017833925367218L;
	private PkgPlanDetailsService service;
	
	@Override
	public void init() throws ServletException {
		service = CommonUtil.getBean(getServletContext(), PkgPlanDetailsService.class);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response){
		final Integer pkgPlanDetailsno = json2Pojo(request, PkgPlanDetails.class).getPkgDetailsNo();
		writePojo2Json(response, service.select(pkgPlanDetailsno));
	}
}
