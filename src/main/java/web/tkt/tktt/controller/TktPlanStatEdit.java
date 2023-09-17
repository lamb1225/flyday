package web.tkt.tktt.controller;

import static core.util.CommonUtil.json2Pojo;
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

@WebServlet("/tktt/editPlanStat")
public class TktPlanStatEdit extends HttpServlet{
	
	public static final TktService service = new TktServiceImpl();

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		PlanType PlanType = json2Pojo(request, PlanType.class);
		
		PlanType = service.editTktPlanStat(PlanType);
		
		writePojo2Json(response, PlanType);
	}
}
