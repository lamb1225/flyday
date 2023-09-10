package web.tkt.tktt.controller;

import static core.util.CommonUtil.writePojo2Json;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import web.tkt.tktt.entity.PlanType;
import web.tkt.tktt.service.TktService;
import web.tkt.tktt.service.impl.TktServiceImpl;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

@WebServlet("/tktt/addtktplanList")
public class TktplanListAdd extends HttpServlet{
	
	public static final TktService service = new TktServiceImpl();
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		PlanType planType = json2Pojo(request, PlanType.class);
		
		System.out.println(planType);
		int tktno = planType.getTktno();
		System.out.println(tktno);
		
		writePojo2Json(response, service.findAllPlayType(tktno));
	}


}
