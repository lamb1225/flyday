package web.pkg.pkgmanage.controller.pkg;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Base64;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import com.google.gson.Gson;

import core.util.CommonUtil;
import web.pkg.pkgmanage.entity.Pkg;
import web.pkg.pkgmanage.service.PkgService;

@WebServlet("/pkg/add")
@MultipartConfig
public class AddServlet extends HttpServlet{
	private static final long serialVersionUID = 1062017833925367218L;
	private PkgService service;
	
	@Override
	public void init() throws ServletException {
		service = CommonUtil.getBean(getServletContext(), PkgService.class);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException{
		Part part = request.getPart("image");
		String storeNoString = request.getParameter("storeNo");
		String pkgName = request.getParameter("pkgName");
		String pkgGroupString = request.getParameter("pkgGroup");
		String pkgGather = request.getParameter("pkgGather");
		String pkgPlace = request.getParameter("pkgPlace");
		String pkgAddress = request.getParameter("pkgAddress");
		String pkgLatitudeString = request.getParameter("pkgLatitude");
		String pkgLongitudeString = request.getParameter("pkgLongitude");
		String pkgSortString = request.getParameter("pkgSort");
		String pkgContent = request.getParameter("pkgContent");
		String pkgNotice = request.getParameter("pkgNotice");
		String pkgRefpolicy = request.getParameter("pkgRefpolicy");
		
		Pkg pkg = new Pkg();
		
		try (InputStream in = part.getInputStream()){
			byte[] pkgOnePic = in.readAllBytes();
			Integer storeNo = Integer.parseInt(storeNoString);
			Integer pkgGroup = Integer.parseInt(pkgGroupString);
			double pkgLatitude = Double.parseDouble(pkgLatitudeString);
			double pkgLongitude = Double.parseDouble(pkgLongitudeString);
			Integer pkgSort = Integer.parseInt(pkgSortString);
			pkg.setStoreNo(storeNo);
			pkg.setPkgName(pkgName);
			pkg.setPkgGroup(pkgGroup);
			pkg.setPkgGather(pkgGather);
			pkg.setPkgPlace(pkgPlace);
			pkg.setPkgAddress(pkgAddress);
			pkg.setPkgLatitude(pkgLatitude);
			pkg.setPkgLongitude(pkgLongitude);
			pkg.setPkgSort(pkgSort);
			pkg.setPkgContent(pkgContent);
			pkg.setPkgNotice(pkgNotice);
			pkg.setPkgRefpolicy(pkgRefpolicy);
			pkg.setPkgReview(0);
			pkg.setPkgOnePic(pkgOnePic);
			
			pkg = service.register(pkg);
			
			String pkgPicBase64 =Base64.getEncoder().encodeToString(pkgOnePic);
			pkg.setPkgPicBase64(pkgPicBase64);
		}
		
		Gson gson = new Gson();
		response.setContentType("application/json");
		try (PrintWriter pw = response.getWriter();){
			pw.print(gson.toJson(pkg));
		}
	}
}
