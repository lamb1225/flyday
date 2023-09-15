package web.tkt.tktt.controller;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import web.tkt.tktt.entity.PlanType;
import web.tkt.tktt.entity.Tkt;
import web.tkt.tktt.service.TktService;
import web.tkt.tktt.service.impl.TktServiceImpl;

@WebServlet("/tktt/editTktPlan")
public class TktPlanEdit extends HttpServlet{
	
	public static final TktService service = new TktServiceImpl();
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Map<String,String> errorMsgs = new LinkedHashMap<String,String>();
		Map<String,String> okMsgs = new LinkedHashMap<String,String>();
		
		PlanType PlanType = json2Pojo(request, PlanType.class);

		System.out.println("有進入修改plan");
		
		String planname = PlanType.getPlanname().trim();
		String plannameReg = "^.{2,40}$";
		if(planname == null || planname.trim().length() == 0) {
			errorMsgs.put("plannameMsgs", "方案名稱請勿空白");
		} else if (!planname.trim().matches(plannameReg)) {
			errorMsgs.put("plannameMsgs", "方案名稱需介於2~40個字之間");
		}
		
		String plancontent = PlanType.getPlancontent().trim();
		String plancontentReg = "^.{2,500}$";
		if(plancontent == null || plancontent.trim().length() == 0) {
			errorMsgs.put("plancontentMsgs", "方案內容請勿空白");
		} else if (!plancontent.trim().matches(plancontentReg)) {
			errorMsgs.put("plancontentMsgs", "方案內容需介於2~500個字之間");
		}
		
//		System.out.println("errorMsgs="+errorMsgs);
		
		if(!errorMsgs.isEmpty()) {
			errorMsgs.put("msg", "尚有資料未完成");
			writePojo2Json(response, errorMsgs);
		} else {
			PlanType = service.editTktPlan(PlanType);
			okMsgs.put("msg", "方案更新成功");
			writePojo2Json(response, PlanType);
		}
		
		System.out.println("PlanType="+PlanType);

	}

}
