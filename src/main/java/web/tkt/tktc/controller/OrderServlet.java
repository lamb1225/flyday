package web.tkt.tktc.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import web.mem.meminfo.entity.Mem;
import web.mem.meminfo.service.MemService;
import web.tkt.tktc.entity.TktJoin;
import web.tkt.tktc.entity.TktOrd;
import web.tkt.tktc.entity.TktOrdDetailsJoin;
import web.tkt.tktc.service.TktOrdDetailsService;
import web.tkt.tktc.service.TktOrdService;
import web.tkt.tktc.service.TktShopCartService;

@WebServlet("/tkt/Order")
@MultipartConfig
public class OrderServlet extends HttpServlet {
	TktShopCartService tktShopCartService = new TktShopCartService();
	TktOrdService tktOrdService = new TktOrdService();
	TktOrdDetailsService tktOrdDetailsService = new TktOrdDetailsService();
	MemService memService;
	
	public void init() throws ServletException {
		ApplicationContext applicationContext = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
		memService = applicationContext.getBean(MemService.class);	
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		doPost(req, res);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
	
		HttpSession session = req.getSession();
		req.setCharacterEncoding("UTF-8");
		String action = req.getParameter("action");
		
		List<TktJoin> tktJoinList = (ArrayList<TktJoin>) session.getAttribute("tktJoin");
		
		
		//確認結帳
		if ("orderConfirm".equals(action)) {
			Mem mem = (Mem) session.getAttribute("mem");
			Integer memNo = mem.getMemNo();			
			tktJoinList = tktShopCartService.selectByMemNo(memNo);
			
			Integer memTktCoupNo = Integer.valueOf(req.getParameter("memTktCoupNo"));
			Integer orgPrice = tktShopCartService.getTotalPrice(tktJoinList);
			Integer discPrice = Integer.valueOf(req.getParameter("discPrice"));
			Integer payPrice = (orgPrice - discPrice);
			String conTitle = (String) req.getParameter("conTitle");
			String conName = (String) req.getParameter("conName");
			String conPhone = (String) req.getParameter("conPhone");
			String conEmail = (String) req.getParameter("conEmail");
			
			//還要寫優惠券
			
			
			TktOrd tktOrd = new TktOrd(memNo, memTktCoupNo, orgPrice, discPrice, payPrice,
					conTitle, conName, conPhone, conEmail, null, null, null);
			Integer tktOrdNo = tktOrdService.insert(tktOrd, tktJoinList);
			
			//確定新增訂單後，清空購物車
			tktShopCartService.delete(memNo);
			TktOrd tktOrdNow = tktOrdService.findByPrimaryKey(tktOrdNo);
			
			//失效日期為訂購日期加上60天
			Date tktOrdDate = tktOrdNow.getOrdDate();
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(tktOrdDate);
			calendar.add(Calendar.DAY_OF_MONTH, 60);
			java.sql.Date expDate = new java.sql.Date(calendar.getTime().getTime());
			tktOrdNow.setExpDate(expDate);
	
			session.setAttribute("tktOrdNo", tktOrdNo);
			session.setAttribute("tktOrd", tktOrdNow);
			String url = "/front_end/tktBookingConfirm.jsp";
			RequestDispatcher successView = req.getRequestDispatcher(url);
			successView.forward(req, res);
		}
		
		//查詢訂單
		if ("getMemOrd".equals(action)) {
			Mem mem = (Mem) session.getAttribute("mem");
			Integer memNo = mem.getMemNo();
			List<TktOrd> tktOrdList = tktOrdService.getAll(memNo);
			List<TktOrd> tktOrdListPaid = new ArrayList<>();
			List<TktOrd> tktOrdListCancel = new ArrayList<>();
			
			for(TktOrd tktOrd : tktOrdList) {
				Date tktOrdDate = tktOrd.getOrdDate();
				Calendar calendar = Calendar.getInstance();
				calendar.setTime(tktOrdDate);
				calendar.add(Calendar.DAY_OF_MONTH, 60);
				java.sql.Date expDate = new java.sql.Date(calendar.getTime().getTime());
				tktOrd.setExpDate(expDate);
				
				Integer tktOrdStat = tktOrd.getOrdStat();
				if(tktOrdStat == 0) {
					tktOrdListPaid.add(tktOrd);
				}else if(tktOrdStat > 0) {
					tktOrdListCancel.add(tktOrd);
				}
			}
			
			session.setAttribute("memNo", memNo);
			session.setAttribute("tktOrdList", tktOrdList);
			session.setAttribute("tktOrdListPaid", tktOrdListPaid);
			session.setAttribute("tktOrdListCancel", tktOrdListCancel);
			RequestDispatcher successView = req.getRequestDispatcher("/front_end/tktOrd.jsp");
			successView.forward(req, res);
		}
		
		//查詢訂單明細
		if("getOrdDetails".equals(action)) {
			Integer tktOrdNo = Integer.valueOf(req.getParameter("tktOrdNo"));
			List<TktOrdDetailsJoin> tktOrdDetailsJoinList = tktOrdDetailsService.selectByTktOrdNo(tktOrdNo);
			TktOrd tktOrd = tktOrdService.findByPrimaryKey(tktOrdNo);
			
			for(TktOrdDetailsJoin tktOrdDetailsJoin : tktOrdDetailsJoinList) {
				if(tktOrdDetailsJoin.getTktImg() != null) {
					tktOrdDetailsJoin.setShowPic("data:image/png;base64," + Base64.getEncoder().encodeToString(tktOrdDetailsJoin.getTktImg()));
				}
			}
			
			Date tktOrdDate = tktOrd.getOrdDate();
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(tktOrdDate);
			calendar.add(Calendar.DAY_OF_MONTH, 60);
			java.sql.Date expDate = new java.sql.Date(calendar.getTime().getTime());
			tktOrd.setExpDate(expDate);
			
			session.setAttribute("tktOrdDetailsJoinList", tktOrdDetailsJoinList);
			session.setAttribute("tktOrd", tktOrd);
			RequestDispatcher successView = req.getRequestDispatcher("/front_end/tktOrdDetails.jsp");
			successView.forward(req, res);
		}
		
		//後台查詢所有訂單(最新排序)
		if("getBackAllOrd".equals(action)) {
			List<TktOrd> tktOrdList = tktOrdService.getAll();

			for(TktOrd tktOrd : tktOrdList) {
				String memName = memService.checkMemInfoByMemNo(tktOrd.getMemNo()).getMemName();
				byte[] memPic = memService.checkMemInfoByMemNo(tktOrd.getMemNo()).getMemPic();
				tktOrd.setMemName(memName);
				if(memPic != null) {
					tktOrd.setShowPic("data:image/png;base64," + Base64.getEncoder().encodeToString(memPic));
				}
			}
			
			session.setAttribute("tktOrdList", tktOrdList);
			RequestDispatcher successView = req.getRequestDispatcher("/back_end/tktOrdManagement.jsp");
			successView.forward(req, res);
		}
		
		//後台查詢訂單明細
		if("getBackOrdDetails".equals(action)) {
			Integer tktOrdNo = Integer.valueOf(req.getParameter("tktOrdNo"));
			List<TktOrdDetailsJoin> tktOrdDetailsJoinList = tktOrdDetailsService.selectByTktOrdNo(tktOrdNo);
			TktOrd tktOrd = tktOrdService.findByPrimaryKey(tktOrdNo);
			
			for(TktOrdDetailsJoin tktOrdDetailsJoin : tktOrdDetailsJoinList) {
				if(tktOrdDetailsJoin.getTktImg() != null) {
					tktOrdDetailsJoin.setShowPic("data:image/png;base64," + Base64.getEncoder().encodeToString(tktOrdDetailsJoin.getTktImg()));
				}
			}
			
			Date tktOrdDate = tktOrd.getOrdDate();
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(tktOrdDate);
			calendar.add(Calendar.DAY_OF_MONTH, 60);
			java.sql.Date expDate = new java.sql.Date(calendar.getTime().getTime());
			tktOrd.setExpDate(expDate);
					
			session.setAttribute("tktOrdDetailsJoinList", tktOrdDetailsJoinList);
			session.setAttribute("tktOrd", tktOrd);
			RequestDispatcher successView = req.getRequestDispatcher("/back_end/tktOrdManagementDetails.jsp");
			successView.forward(req, res);
		}
		
		//取消訂單
		if("cancelOrd".equals(action)) {
			Integer j = Integer.valueOf(req.getParameter("itemAmount"));
			
			for(int i = 0; i < j; i++) {
				Integer tktOrdNo = Integer.valueOf(req.getParameter("tktOrdNo" + i));
				Integer ordStat = Integer.valueOf(req.getParameter("ordStat" + i));
				if(ordStat != null) {
					tktOrdService.update(ordStat, tktOrdNo);
				}
			}
		}
	}
}
