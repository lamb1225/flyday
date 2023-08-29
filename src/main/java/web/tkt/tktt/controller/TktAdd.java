package web.tkt.tktt.controller;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import core.util.CommonUtil;
import web.tkt.tktt.dao.TktDAO;
import web.tkt.tktt.dao.impl.TktDAOImpl;
import web.tkt.tktt.entity.Tkt;
import web.tkt.tktt.service.TktService;
import web.tkt.tktt.service.impl.TktServiceImpl;

@WebServlet("/tktt/addtkt")
public class TktAdd extends HttpServlet{
	
	public static final TktService service = new TktServiceImpl();
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		Tkt tkt = json2Pojo(request, Tkt.class);
		
		System.out.println(tkt);
		
		if(tkt == null) {
			tkt = new Tkt();
			tkt.setMessage("沒資料");
			tkt.setSuccessful(false);
			writePojo2Json(response, tkt);
			return;
		}
		
		tkt = service.addtkt(tkt);			
		writePojo2Json(response, tkt);
//		writePojo2Json(response,service.findAll());
		
		System.out.println("有資料");
		
	}

}
