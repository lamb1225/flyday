package web.tkt.tktc.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import web.mem.meminfo.entity.Mem;
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
		Mem mem = (Mem) session.getAttribute("mem");
		Integer memNo = mem.getMemNo();
		
		//確認結帳
		if ("orderConfirm".equals(action)) {
			
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
//			System.out.println(tktOrdNow);
			
			session.setAttribute("memNo", memNo);
			session.setAttribute("tktOrdNo", tktOrdNo);
			session.setAttribute("tktOrd", tktOrdNow);
			String url = "/front_end/tktBookingConfirm.jsp";
			RequestDispatcher successView = req.getRequestDispatcher(url);
			successView.forward(req, res);
			
		}
		
		//查詢訂單
		if ("getMemOrd".equals(action)) {
			List<TktOrd> tktOrdList = tktOrdService.getAll(memNo);
//			System.out.println(tktOrdList);
			
			session.setAttribute("memNo", memNo);
			session.setAttribute("tktOrdList", tktOrdList);
			RequestDispatcher successView = req.getRequestDispatcher("/front_end/tktOrd.jsp");
			successView.forward(req, res);
		}
		
		//查詢訂單明細
		if("getOrdDetails".equals(action)) {
			Integer tktOrdNo = Integer.valueOf(req.getParameter("tktOrdNo"));
			List<TktOrdDetailsJoin> tktOrdDetailsJoinList = tktOrdDetailsService.selectByTktOrdNo(tktOrdNo);
			TktOrd tktOrd = tktOrdService.findByPrimaryKey(tktOrdNo);
			
			session.setAttribute("tktOrdNo", tktOrdNo);
			session.setAttribute("tktOrdDetailsJoinList", tktOrdDetailsJoinList);
			session.setAttribute("tktOrd", tktOrd);
			RequestDispatcher successView = req.getRequestDispatcher("/front_end/tktOrdDetails.jsp");
			successView.forward(req, res);
		}
		
	}
}
