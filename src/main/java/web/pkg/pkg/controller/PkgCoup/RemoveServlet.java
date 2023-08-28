package web.pkg.pkg.controller.PkgCoup;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

import java.sql.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import core.entity.Core;
import core.util.CommonUtil;
import web.pkg.pkg.entity.PkgCoup;
import web.pkg.pkg.service.PkgCoupService;

public class RemoveServlet extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private PkgCoupService service;

	public void init() throws ServletException{
		service=CommonUtil.getBean(getServletContext(), PkgCoupService.class);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) {
		final Integer id = json2Pojo(request, PkgCoup.class).getPkgCoupNo();
		final Core core = new Core();
		if (id == null) {
			core.setMessage("無id");
			core.setSuccessful(false);
		} else {
			core.setSuccessful(service.remove(id));
		}
		writePojo2Json(response, core);
		
		
		
//		if（service.remove(id)）{
//		    core.setMessage(刪除成功)
//		    core.setSuccessful(ture);
//		}else {
//		     core.setMessage(刪除失敗)
//		    core.setSuccessful(false);
//
//		}
	}
	}
	
	


