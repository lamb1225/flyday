package web.pkg.pkgmanage.controller.pkg;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import core.util.CommonUtil;
import web.pkg.pkgmanage.entity.Pkg;
import web.pkg.pkgmanage.service.PkgService;

@WebServlet("/pkg/edit")
public class EditServlet extends HttpServlet{
	private static final long serialVersionUID = 1062017833925367218L;
	private PkgService service;
	
	@Override
	public void init() throws ServletException {
		service = CommonUtil.getBean(getServletContext(), PkgService.class);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response){
		final HttpSession session = request.getSession();
		final Integer storeno = ((Pkg)session.getAttribute("pkg")).getStoreNo();
		final Integer pkgno = ((Pkg)session.getAttribute("pkg")).getPkgNo();
		
		Pkg pkg = json2Pojo(request, Pkg.class);
		pkg.setPkgNo(pkgno);
		pkg.setStoreNo(storeno);
		writePojo2Json(response, service.edit(pkg));
	}
}
