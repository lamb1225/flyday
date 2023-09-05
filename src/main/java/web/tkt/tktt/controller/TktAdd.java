package web.tkt.tktt.controller;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import core.util.CommonUtil;
import web.tkt.tktt.dao.TktDAO;
import web.tkt.tktt.dao.impl.TktDAOImpl;
import web.tkt.tktt.entity.Tkt;
import web.tkt.tktt.entity.TktCore;
import web.tkt.tktt.entity.TktPlan;
import web.tkt.tktt.entity.TktType;
import web.tkt.tktt.service.TktService;
import web.tkt.tktt.service.impl.TktServiceImpl;


@WebServlet("/tktt/addtkt")
public class TktAdd extends HttpServlet{
	
	public static final TktService service = new TktServiceImpl();
	int tktin = 0;
	int tktplanin = 0;
	int tkttypein = 0;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		
		String requestBody = request.getReader().lines().collect(Collectors.joining());
		
		// 商品(驗證+傳入TktServiceImpl)
		if(requestBody.contains("tktname")) {
			
			Map<String,String> errorMsgs = new LinkedHashMap<String,String>();
			Map<String,String> okMsgs = new LinkedHashMap<String,String>();
			
			Tkt tkt = json2Pojo(requestBody, Tkt.class);
			
			System.out.println("進入tkt");

			
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
			if(tktinstruction == null || tktinstruction.trim().length() == 0) {
				errorMsgs.put("tktinstructionMsgs", "商品簡介請勿空白");
			} else if (!tktinstruction.trim().matches(tktinstructionReg)) {
				errorMsgs.put("tktinstructionMsgs", "商品簡介需介於2~500個字之間");
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
				errorMsgs.put("proddescMsgs", "景點簡介請勿空白");
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
			
			System.out.println("errorMsgs="+errorMsgs);
	
			if(!errorMsgs.isEmpty()) {
				errorMsgs.put("msg", "尚有資料未完成");
				writePojo2Json(response, errorMsgs);
				System.out.println("tktin1="+tktin);
			} else if(tktin == 0) {
				tktin = 1;
				tkt = service.addtkt(tkt);
				okMsgs.put("msg", "tkt新增成功");
				writePojo2Json(response, okMsgs);
				System.out.println("tktin2="+tktin);
			} else {
				writePojo2Json(response, tkt);
				System.out.println("tktin3="+tktin);
			}		
			System.out.println("tkt="+tkt);
		} 
		
//		==================================================================================================
		
		// 方案(驗證+傳入TktServiceImpl)
		if (requestBody.contains("planname")) {

			Map<String,String> errorMsgs = new LinkedHashMap<String,String>();
			Map<String,String> okMsgs = new LinkedHashMap<String,String>();
			
			TktPlan tktplan = json2Pojo(requestBody, TktPlan.class);
			
			List<String> planname = tktplan.getPlanname();
			List<String> plancontent = tktplan.getPlancontent();
			
			System.out.println("進入plan");

			
			for (String plannamelist : planname) {
				int length = plannamelist.length();
				if(length == 0) {
					errorMsgs.put("plannameMsgs", "方案名稱請勿空白");
					System.out.println("errorMsgs="+errorMsgs);
				} else if (length < 2 || length > 40) {
					errorMsgs.put("plannameMsgs", "方案名稱需介於2~40個字之間");
				}
			}			
			
			for (String plancontentlist : plancontent) {
				int length = plancontentlist.length();
				if(length == 0) {
					errorMsgs.put("plancontentMsgs", "方案內容請勿空白");
					System.out.println("errorMsgs="+errorMsgs);
				} else if (length < 2 || length > 500) {
					errorMsgs.put("plancontentMsgs", "方案內容需介於2~500個字之間");
				}
			}
			System.out.println("errorMsgs="+errorMsgs);
			
			if(!errorMsgs.isEmpty()) {
				errorMsgs.put("msg", "尚有資料未完成");
				writePojo2Json(response, errorMsgs);
				System.out.println("tktplanin1="+tktplanin);
			} else if(tktplanin == 0 && tktin == 1) {
				tktplanin = 1;
				tktplan = service.addtktplan(tktplan);
				okMsgs.put("msg", "tktplan新增成功");
				writePojo2Json(response, okMsgs);
				System.out.println("tktplanin2="+tktplanin);
			} else {
				writePojo2Json(response, tktplan);
				System.out.println("tktplanin3="+tktplanin);
			}
			
			System.out.println("tktplan="+tktplan);
			
		}
		
//		==================================================================================================
		
		// 票種(驗證+傳入TktServiceImpl)
		if (requestBody.contains("tkttype")) {

			Map<String,String> errorMsgs = new LinkedHashMap<String,String>();
			Map<String,String> okMsgs = new LinkedHashMap<String,String>();
			
			TktType tkttype = json2Pojo(requestBody, TktType.class);
			
			List<String> tkttypeList = tkttype.getTkttype();
			List<String> priceList = tkttype.getPrice();
			
			System.out.println("進入type");

			
			for (String tkttypeString : tkttypeList) {
                String[] tkttypeArray = tkttypeString.split("\\|", -1);
                for (String tkttypeName : tkttypeArray) {
//                    System.out.println("Tkttype: " + tkttypeName);
                    int length = tkttypeName.length();           
					if(length == 0) {
						errorMsgs.put("tkttypeMsgs", "票種請勿空白");						
					} else if (length < 2 || length > 10) {
						errorMsgs.put("tkttypeMsgs", "票種長度需介於2~10個字之間");
					}
                }
			}

			for (String priceString : priceList) {
				String[] priceArray = priceString.split("\\|", -1);
                for (String priceName : priceArray) {
                    System.out.println("price: " + priceName);
                    int length = priceName.length();           
					if(length == 0) {
						errorMsgs.put("priceMsgs", "票價請勿空白");						
					}
                }
			}
			System.out.println("errorMsgs="+errorMsgs);
			
			
			if(!errorMsgs.isEmpty()) {
				errorMsgs.put("msg", "尚有資料未完成");
				writePojo2Json(response, errorMsgs);
				System.out.println("tkttypein1="+tkttypein);
			} else if(tkttypein == 0 && tktplanin == 1 && tktin == 1) {
				tkttypein = 1;
				tkttype = service.addtkttype(tkttype);
				okMsgs.put("msg", "tkttype新增成功");
				writePojo2Json(response, okMsgs);
				System.out.println("tkttypein2="+tkttypein);
			} else {
				writePojo2Json(response, tkttype);
				System.out.println("tkttypein3="+tkttypein);
			}

			System.out.println("tkttype="+tkttype);
		}
		
//		==================================================================================================

		if(tktin == 1 && tktplanin == 1 && tkttypein == 1) {
			tktin = 0;
			tktplanin = 0;
			tkttypein = 0;
		}
		
		System.out.println("有資料");

	}
	
	//自定義的json2Pojo方法，用於將JSON字符串轉換為Java對象
	private <T> T json2Pojo(String json, Class<T> clazz) {
	 Gson gson = new Gson();
	 return gson.fromJson(json, clazz);
	}

}


