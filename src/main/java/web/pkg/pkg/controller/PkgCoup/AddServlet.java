package web.pkg.pkg.controller.PkgCoup;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

import java.sql.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import core.util.CommonUtil;
import web.pkg.pkg.entity.PkgCoup;
import web.pkg.pkg.service.PkgCoupService;

public class AddServlet extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private PkgCoupService service;
	
	@Override
	public void init() throws ServletException {
		service=CommonUtil.getBean(getServletContext(), PkgCoupService.class);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) {
		final HttpSession session=request.getSession();//把request 請求的存取時間用session存起來 讓存活時間比較久一點
		final String pkgCoupName=((PkgCoup)session.getAttribute("PkgCoup")).getPkgCoupName();
		final Integer pkgCoupDiscount=((PkgCoup)session.getAttribute("PkgCoupDiscount")).getPkgCoupDiscount();
		final Date pkgCoupStartDate=((PkgCoup)session.getAttribute("PkgCoupStartDate")).getPkgCoupStartDate();
		final Date pkgCoupEndDate=((PkgCoup)session.getAttribute("PkgCoupEndDate")).getPkgCoupEndDate();
		final Integer pkgCoupMiniCharge=((PkgCoup)session.getAttribute("PkgCoupMiniCharge")).getPkgCoupMinicharge();
		final Integer pkgCoupState=((PkgCoup)session.getAttribute("PkgCoupState")).getPkgCoupState();
		
		PkgCoup pkgCoup = json2Pojo(request, PkgCoup.class);
		pkgCoup.setPkgCoupName(pkgCoupName);
		writePojo2Json(response, service.add(pkgCoup));
	}
}
