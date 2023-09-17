package web.pkg.pkg.controller.PkgOrdDetails;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import core.util.CommonUtil;
import web.pkg.pkg.entity.PkgOrdDetails;
import web.pkg.pkg.service.PkgOrdDetailsService;

@WebServlet("/pkg/PkgDetailsUpdate")
public class UpdateDetailsServlet extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private PkgOrdDetailsService service;

	@Override
	public void init() throws ServletException {
		service=CommonUtil.getBean(getServletContext(), PkgOrdDetailsService.class);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
		PkgOrdDetails pkgOrdDetails = json2Pojo(request, PkgOrdDetails.class);
		writePojo2Json(response, service.updateDetails(pkgOrdDetails));

	}
}
