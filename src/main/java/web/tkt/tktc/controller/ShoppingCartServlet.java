package web.tkt.tktc.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
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
import web.tkt.tktc.entity.TktShopCart;
import web.tkt.tktc.service.TktShopCartService;

@WebServlet("/tkt/shoppingCart")
@MultipartConfig
public class ShoppingCartServlet extends HttpServlet {
	TktShopCartService tktShopCartService = new TktShopCartService();

	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		doPost(req, res);
	}

	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		
		HttpSession session = req.getSession();
		req.setCharacterEncoding("UTF-8");
		String action = req.getParameter("action");

		List<TktShopCart> tktShopCartList = (ArrayList<TktShopCart>) session.getAttribute("tktShopCartList");
		List<TktJoin> tktJoinList = (ArrayList<TktJoin>) session.getAttribute("tktJoin");
		
		// 取得所有購物車清單
		if ("getAll".equals(action)) {
			
			// 沒有登入的話，要先登入，導向登入頁面
			Mem mem = (Mem) session.getAttribute("mem");
			if(mem == null) {
				System.out.println("no login info");
				String loginURL ="/front_end/sign-in.html";
				RequestDispatcher login = req.getRequestDispatcher(loginURL); 
				login.forward(req, res);
				return;
			}
			Integer memNo = mem.getMemNo();

			tktJoinList = tktShopCartService.selectByMemNo(memNo);
			
			for(TktJoin tktJoin : tktJoinList) {
				if(tktJoin.getTktImg() != null) {
					tktJoin.setShowPic("data:image/png;base64," + Base64.getEncoder().encodeToString(tktJoin.getTktImg()));
				}
			}
			
			session.setAttribute("tktJoinList", tktJoinList);
			session.setAttribute("memNo", memNo);
			String url = "/front_end/tktShopCart.jsp";
			RequestDispatcher successView = req.getRequestDispatcher(url); // 成功轉交給購物車頁面
			successView.forward(req, res);
		}

		// 新增票券進購物車
		if ("addItem".equals(action)) {
			
			// 沒有登入的話，要先登入，導向登入頁面
			Mem mem = (Mem) session.getAttribute("mem");
			if(mem == null) {
				System.out.println("no login info");
				String loginURL ="/front_end/sign-in.html";
				RequestDispatcher login = req.getRequestDispatcher(loginURL); 
				login.forward(req, res);
				return;
			}
			Integer memNo = mem.getMemNo();

			//測試用
//			Integer testTktTypeNo = Integer.valueOf(req.getParameter("testTktTypeNo"));
//			Integer testTktQty = Integer.valueOf(req.getParameter("testTktQty"));
//			Integer tktTypeNo = testTktTypeNo;
//			Integer tktQty = testTktQty;

			Integer tktTypeNo = Integer.valueOf(req.getParameter("tktTypeNo"));
			Integer tktQty = Integer.valueOf(req.getParameter("tktQty"));
//			
			TktShopCart tktShopCart = tktShopCartService.addTktShopCart(memNo, tktTypeNo, tktQty);

			session.setAttribute("memNo", memNo);
			session.setAttribute("tktShopCart", tktShopCart);
			String url = "/front_end/tktShopCart.jsp";
			RequestDispatcher successView = req.getRequestDispatcher(url);
			successView.forward(req, res);
		}

		// 修改數量 (前端判斷了，目前用不到)
//		if("changeQty".equals(action)) {
//			Integer memNo = (Integer) session.getAttribute("memNo");
//			Integer tktTypeNo = Integer.valueOf(req.getParameter("tktTypeNo"));
//			Integer tktQty = Integer.valueOf(req.getParameter("tktQty"));
//			
//			TktShopCart tktShopCart = new TktShopCart(memNo, tktTypeNo, tktQty);
//			if(tktQty == 0) {
//				tktShopCartService.delete(memNo, tktTypeNo);
//				tktJoinList.removeIf(delCart -> delCart.getTktTypeNo() == tktTypeNo && delCart.getMemNo() == memNo);
//			}else {
//				tktShopCart = tktShopCartService.update(memNo, tktTypeNo, tktQty);
//				
//				for(int i = 0; i < tktJoinList.size(); i++) {
//					TktJoin existTkt = tktJoinList.get(i);
//					if(tktShopCart.getTktTypeNo() == existTkt.getTktTypeNo()
//							&& tktShopCart.getMemNo() == existTkt.getMemNo()) {
//						existTkt.setTktQty(tktQty);
//						break;
//					}
//				}
//			}
//			
//			int totalPrice = tktShopCartService.getTotalPrice(tktJoinList);
//			session.setAttribute("totalPrice", totalPrice);
//			session.setAttribute("tktJoinListList", tktJoinList);
//		}

		// 修改票券
		if ("updateAll".equals(action)) {
			Integer memNo = (Integer) session.getAttribute("memNo");
			Integer j = Integer.valueOf(req.getParameter("itemAmount"));
			
			for(int i = 0; i < j; i++) {
				Integer tktTypeNo = Integer.valueOf(req.getParameter("tktTypeNo" + i));
				Integer tktQty = Integer.valueOf(req.getParameter("tktQty" + i));
				tktShopCartService.update(memNo, tktTypeNo, tktQty);
			};
			
			session.setAttribute("tktShopCartList", tktShopCartList);
		}
		
		//刪除票券(目前沒用到)
		if ("delete".equals(action)) {
			Integer memNo = (Integer) session.getAttribute("memNo");
	        Integer tktTypeNo = Integer.valueOf(req.getParameter("tktTypeNo"));

	        tktShopCartService.delete(memNo, tktTypeNo);

	        String url = "/front_end/tktShopCart.jsp";
			RequestDispatcher successView = req.getRequestDispatcher(url);
			successView.forward(req, res);
		}
		

	}
}
