package web.pkg.pkg.controller.PkgOrd;

import java.io.IOException;
import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import core.util.CommonUtil;
import web.pkg.pkg.entity.PkgOrd;
import web.pkg.pkg.service.PkgOrdService;


@WebServlet("/pkg/PkgOrdAdd")
public class AddOrdServlet extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private PkgOrdService service;
	
	@Override
	public void init() throws ServletException {
		service=CommonUtil.getBean(getServletContext(), PkgOrdService.class);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
		PkgOrd pkgOrd = json2Pojo(request, PkgOrd.class);
		writePojo2Json(response, service.addPkgOrd(pkgOrd));

	}
}
