package web.pkg.pkg.controller.PkgShop;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import core.util.CommonUtil;
import web.pkg.pkg.entity.PkgShopCart;
import web.pkg.pkg.service.PkgShopCartService;

@WebServlet("/pkg/PkgShopFindOne")
public class findByPkgDetailsNoServlet extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private PkgShopCartService service;

	@Override
	public void init() throws ServletException {
		service=CommonUtil.getBean(getServletContext(), PkgShopCartService.class);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) {
		final Integer memNo = json2Pojo(request, PkgShopCart.class).getPkgShopCartid().getMemNo();
		final Integer pkgPlanNo= json2Pojo(request, PkgShopCart.class).getPkgShopCartid().getPkgPlanNo();
		writePojo2Json(response, service.findByPkgPlanNo(memNo, pkgPlanNo));
	}
}
