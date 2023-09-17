package web.mem.pkg.controller;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import core.util.CommonUtil;
import web.mem.pkg.entity.MemPkgCoup;
import web.mem.pkg.service.MemPkgCoupService;

@WebServlet("/pkg/MemCoupRemove")
public class RemoveServlet extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private MemPkgCoupService service;
	
	@Override
	public void init() throws ServletException {
		service=CommonUtil.getBean(getServletContext(), MemPkgCoupService.class);
	}
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
		final Integer id = json2Pojo(request, MemPkgCoup.class).getMemPkgCoupNo();
		writePojo2Json(response, service.remove(id));

	}
}
