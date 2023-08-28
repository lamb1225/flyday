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
import static core.util.CommonUtil.writePojo2Json;

public class FindByPkgCoupNoServlet extends HttpServlet{
	private static final long serialVersionUID = 1L;
	private PkgCoupService service;
	
	@Override
	public void init() throws ServletException {
		service=CommonUtil.getBean(getServletContext(), PkgCoupService.class);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) {
		final Integer id = json2Pojo(request, PkgCoup.class).getPkgCoupNo();
		writePojo2Json(response, service.findByPkgCoupNo(id));
	}
	
}
