package web.pkg.pkgmanage.controller.pkg;

import static core.util.CommonUtil.writePojo2Json;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import core.util.CommonUtil;
import web.pkg.pkgmanage.service.PkgService;

@WebServlet("/pkg/findall")
public class FindAllServlet extends HttpServlet{

	private static final long serialVersionUID = 1062017833925367218L;
	private PkgService service;
	
	@Override
	public void init() throws ServletException {
		service = CommonUtil.getBean(getServletContext(), PkgService.class);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) {
		writePojo2Json(response, service.findAll());
	}
}
