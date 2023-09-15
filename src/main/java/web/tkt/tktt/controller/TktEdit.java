package web.tkt.tktt.controller;

import static core.util.CommonUtil.writePojo2Json;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import web.tkt.tktt.entity.Tkt;
import web.tkt.tktt.service.TktService;
import web.tkt.tktt.service.impl.TktServiceImpl;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

@WebServlet("/tktt/editTkt")
public class TktEdit extends HttpServlet{
	
	public static final TktService service = new TktServiceImpl();
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Map<String,String> errorMsgs = new LinkedHashMap<String,String>();
		Map<String,String> okMsgs = new LinkedHashMap<String,String>();
		
		Tkt tkt = json2Pojo(request, Tkt.class);
		
		
		String tktname = tkt.getTktname().trim();
		String tktnameReg = "^.{2,40}$";
		if(tktname == null || tktname.trim().length() == 0) {
			errorMsgs.put("tktnameMsgs", "標題名稱請勿空白");
		} else if (!tktname.trim().matches(tktnameReg)) {
			errorMsgs.put("tktnameMsgs", "標題名稱需介於2~40個字之間");
		}
		
		String tktstartdate = tkt.getTktstartdate().trim();
		if(tktstartdate == null || tktstartdate.trim().length() == 0) {
			errorMsgs.put("tktstartdateMsgs", "未選擇商品開始日期");
		}
		
		String tktenddate = tkt.getTktenddate().trim();
		if(tktenddate == null || tktenddate.trim().length() == 0) {
			errorMsgs.put("tktenddateMsgs", "未選擇商品結束日期");
		}
				
		String tktinstruction = tkt.getTktinstruction().trim();
		String tktinstructionReg = "^.{2,500}$";
//		tktinstruction.trim().length() == 0 || 
		if(tktinstruction == null || tktinstruction.trim().equals("<br>")) {
			errorMsgs.put("tktinstructionMsgs", "商品簡介請勿空白");
		} else if (!tktinstruction.trim().matches(tktinstructionReg)) {
			errorMsgs.put("tktinstructionMsgs", "商品簡介需介於2~500個字之間,"+tktinstruction.trim());
		}
		
		String location = tkt.getLocation().trim();
		String locationReg = "^.{2,40}$";
		if(location == null || location.trim().length() == 0) {
			errorMsgs.put("locationMsgs", "景點名稱請勿空白");
		} else if (!location.trim().matches(locationReg)) {
			errorMsgs.put("locationMsgs", "景點名稱需介於2~40個字之間");
		}
		
		String city = tkt.getCity().trim();
		if(city == null || "0".equals(city)) {
			errorMsgs.put("cityMsgs", "縣市未選擇");
		}
		
		String districts = tkt.getDistricts().trim();
		if(districts == null || "0".equals(districts)) {
			errorMsgs.put("districtsMsgs", "地區未選擇");
		}
		
		String address = tkt.getAddress().trim();
		String addressReg = "^.{3,40}$";
		if(address == null || address.trim().length() == 0) {
			errorMsgs.put("addressMsgs", "地址請勿空白");
		} else if (!address.trim().matches(addressReg)) {
			errorMsgs.put("addressMsgs", "地址需介於3~40個字之間");
		}
		
		String proddesc = tkt.getProddesc().trim();
		if(proddesc == null || proddesc.trim().equals("<p><br></p>")) {
			errorMsgs.put("proddescMsgs", "景點介紹請勿空白");
		}
		
		String notice = tkt.getNotice().trim();
		if(notice == null || notice.trim().equals("<p><br></p>")) {
			errorMsgs.put("noticeMsgs", "購買須知請勿空白");
		}
		
		String howuse = tkt.getHowuse().trim();
		if(howuse == null || howuse.trim().equals("<p><br></p>")) {
			errorMsgs.put("howuseMsgs", "如何使用的介紹請勿空白");
		}
		
		Integer tktsort = tkt.getTktsort();
		if(tktsort == null || tktsort < 0) {
			errorMsgs.put("tktsortMsgs", "票券類型未選擇");
		}
		
//		System.out.println("errorMsgs="+errorMsgs);

		if(!errorMsgs.isEmpty()) {
			errorMsgs.put("msg", "尚有資料未完成");
			writePojo2Json(response, errorMsgs);
		} else {
			tkt = service.editTkt(tkt);
			okMsgs.put("msg", "商品更新成功");
			writePojo2Json(response, tkt);
		}
//		System.out.println("tkt="+tkt);
	}

}
