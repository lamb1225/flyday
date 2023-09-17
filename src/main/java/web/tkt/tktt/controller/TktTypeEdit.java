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
import web.tkt.tktt.service.TktService;
import web.tkt.tktt.service.impl.TktServiceImpl;

@WebServlet("/tktt/editTktType")
public class TktTypeEdit extends HttpServlet{
	
	public static final TktService service = new TktServiceImpl();
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Map<String,String> errorMsgs = new LinkedHashMap<String,String>();
		Map<String,String> okMsgs = new LinkedHashMap<String,String>();
		
		PlanType PlanType = json2Pojo(request, PlanType.class);

		
		String tkttype = PlanType.getTkttype().trim();
		String tkttypeReg = "^.{2,50}$";
		if(tkttype == null || tkttype.trim().length() == 0) {
			errorMsgs.put("tkttypeMsgs", "票種請勿空白");
		} else if (!tkttype.trim().matches(tkttypeReg)) {
			errorMsgs.put("tkttypeMsgs", "票種需介於2~50個字之間");
		}
		
		Integer price = PlanType.getPrice();
		if(price == null || price.toString().isEmpty()) {
			errorMsgs.put("priceMsgs", "票價請勿空白");
		}
		
//		System.out.println("errorMsgs="+errorMsgs);
		
		if(!errorMsgs.isEmpty()) {
			errorMsgs.put("msg", "尚有資料未完成");
			writePojo2Json(response, errorMsgs);
		} else {
			PlanType = service.editTktType(PlanType);
			okMsgs.put("msg", "票價更新成功");
			writePojo2Json(response, PlanType);
		}
		
//		System.out.println("PlanType="+PlanType);
		
		
		
		
	}

}
