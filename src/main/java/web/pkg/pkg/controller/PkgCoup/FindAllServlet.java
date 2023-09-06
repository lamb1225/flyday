package web.pkg.pkg.controller.PkgCoup;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import core.util.CommonUtil;
import web.pkg.pkg.service.PkgCoupService;
import static core.util.CommonUtil.writePojo2Json;
@WebServlet("/pkg/PkgCoupFindall")
public class FindAllServlet extends HttpServlet{
	private static final long serialVersionUID = 1L;
	private PkgCoupService service;
	
	@Override
	public void init() throws ServletException {
		service=CommonUtil.getBean(getServletContext(), PkgCoupService.class);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) {
		writePojo2Json(response, service.findAll());
	}
	
}
