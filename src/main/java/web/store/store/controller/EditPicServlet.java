package web.store.store.controller;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Base64;

import core.util.CommonUtil;
import web.store.store.entity.Store;
import web.store.store.service.StoreMemberService;

@WebServlet("/store/editpic")
@MultipartConfig
public class EditPicServlet extends HttpServlet{
	private static final long serialVersionUID = 1062017833925367218L;
	private StoreMemberService service;
	
	@Override
	public void init() throws ServletException{
		service = CommonUtil.getBean(getServletContext(), StoreMemberService.class);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
		
		Part part = request.getPart("image");
		String storeNoString = request.getParameter("storeNo");
		
		Store store = new Store();
		
		if (part == null || storeNoString == null) {
			store.setMessage("無圖片資料");
			store.setSuccessful(false);
		}else {
			try (InputStream in = part.getInputStream();){
				byte[] storePic = in.readAllBytes();
				Integer storeNo = Integer.parseInt(storeNoString);
				store = service.editpic(storePic, storeNo);
				
				String storePicBase64 = Base64.getEncoder().encodeToString(storePic);
				store.setStorePicBase64(storePicBase64);
				
			}
		}
		
		Gson gson = new Gson();
		response.setContentType("application/json");
		try (PrintWriter pw = response.getWriter();){
			pw.print(gson.toJson(store));
		}
	}
}
