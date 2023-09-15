package web.tkt.tktt.controller;

import static core.util.CommonUtil.writePojo2Json;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import web.tkt.tktt.service.TktService;
import web.tkt.tktt.service.impl.TktServiceImpl;

@WebServlet("/tktt/addtktimglist")
public class TktImgViewAll extends HttpServlet{
	
	public static final TktService service = new TktServiceImpl();

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		writePojo2Json(response, service.findAllImg());
		
	}
}
