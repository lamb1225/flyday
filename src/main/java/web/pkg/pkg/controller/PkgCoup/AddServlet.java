package web.pkg.pkg.controller.PkgCoup;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import core.util.CommonUtil;
import web.mem.meminfo.entity.Mem;
import web.pkg.pkg.entity.PkgCoup;
import web.pkg.pkg.service.PkgCoupService;

@WebServlet("/pkg/PkgCoup")
public class AddServlet extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private PkgCoupService service;
	
	@Override
	public void init() throws ServletException {
		service=CommonUtil.getBean(getServletContext(), PkgCoupService.class);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
//		final HttpSession session=request.getSession();//把request 請求的存取時間用session存起來 讓存活時間比較久一點
//		final String pkgCoupName=((PkgCoup)session.getAttribute("PkgCoup")).getPkgCoupName();
//		final Integer pkgCoupDiscount=((PkgCoup)session.getAttribute("PkgCoup")).getPkgCoupDiscount();
//		final Date pkgCoupStartDate=((PkgCoup)session.getAttribute("PkgCoup")).getPkgCoupStartDate();
//		final Date pkgCoupEndDate=((PkgCoup)session.getAttribute("PkgCoup")).getPkgCoupEndDate();
//		final Integer pkgCoupMiniCharge=((PkgCoup)session.getAttribute("PkgCoup")).getPkgCoupMinicharge();
//		final Integer pkgCoupState=((PkgCoup)session.getAttribute("PkgCoup")).getPkgCoupState();
		
		PkgCoup pkgCoup = json2Pojo(request, PkgCoup.class);
//		pkgCoup.setPkgCoupName(pkgCoupName);
		writePojo2Json(response, service.add(pkgCoup));
	
		//透過BufferedReader 搭配fromJson將請求的json字串內容反列化放到PkgCoup裡
//		try(BufferedReader br = request.getReader();){
//			Gson gson = new Gson();
//			PkgCoup pkgCoupon = gson.fromJson(br, PkgCoup.class);
		
			 //執行service註冊邏輯
//			pkgCoup= service.add(pkgCoup);
		
		  // 設定reponse回應前端的格式設定json 並透過PrintWriter 及toJson序列化
//			response.setContentType("application/json");
//			try(PrintWriter pw = response.getWriter();){
//				pw.print(gson.toJson(pkgCoupon));	
//			}
		}
		
	}

