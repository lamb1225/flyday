package web.pkg.pkgmanage.controller.pkgpic;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import core.util.CommonUtil;
import web.pkg.pkgmanage.entity.PkgPic;
import web.pkg.pkgmanage.service.PkgPicService;

@WebServlet("/pkgpic/edit")
public class EditServlet extends HttpServlet{
	private static final long serialVersionUID = 1062017833925367218L;
	private PkgPicService service;
	
	@Override
	public void init() throws ServletException {
		service = CommonUtil.getBean(getServletContext(), PkgPicService.class);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response){
		PkgPic pkgPic = json2Pojo(request, PkgPic.class);
		writePojo2Json(response, service.edit(pkgPic));
	}
}
