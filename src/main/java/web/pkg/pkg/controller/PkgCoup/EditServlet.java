package web.pkg.pkg.controller.PkgCoup;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

import java.sql.Date;

import core.util.CommonUtil;
import web.pkg.pkg.entity.PkgCoup;
import web.pkg.pkg.service.PkgCoupService;

public class EditServlet extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private PkgCoupService service;
	
	@Override
	public void init() throws ServletException {
		service=CommonUtil.getBean(getServletContext(), PkgCoupService.class);
	}
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) {
		final HttpSession session= request.getSession();
		final String pkgCoupName=((PkgCoup)session.getAttribute("PkgCoup")).getPkgCoupName();
		final Integer pkgCoupDiscount=((PkgCoup)session.getAttribute("PkgCoupDiscount")).getPkgCoupDiscount();
		final Date pkgCoupStartDate=((PkgCoup)session.getAttribute("PkgCoupStartDate")).getPkgCoupStartDate();
		final Date pkgCoupEndDate=((PkgCoup)session.getAttribute("PkgCoupEndDate")).getPkgCoupEndDate();
		final Integer pkgCoupMiniCharge=((PkgCoup)session.getAttribute("PkgCoupMiniCharge")).getPkgCoupMinicharge();
		final Integer pkgCoupState=((PkgCoup)session.getAttribute("PkgCoupState")).getPkgCoupState();

		PkgCoup pkgCoup = json2Pojo(request, PkgCoup.class); //從HTTP 請求中讀取 JSON 數據，然後將其轉換為 PkgCoup 類型的 Java 物件。 處理前端傳來的json
		pkgCoup.setPkgCoupName(pkgCoupName);
		writePojo2Json(response, service.edit(pkgCoup));
	}
	
}
