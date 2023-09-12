package web.mem.meminfo.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.google.gson.Gson;
import com.opencsv.CSVWriter;

import web.mem.meminfo.entity.Mem;
import web.mem.meminfo.service.MemService;

@WebServlet("/mem/memList")
@MultipartConfig
public class MemListServlet extends HttpServlet {

	private static final long serialVersionUID = -7505327311290260125L;
	private MemService service;
	
	public void init() throws ServletException{
		ApplicationContext applicationContext = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
		service = applicationContext.getBean(MemService.class);	
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Gson gson = new Gson();
		String action = req.getParameter("action");
		
		if("listAllMems".equals(action)) {
			List<Mem> memList = service.listAllMems();
			
			resp.setContentType("application/json");
			try(PrintWriter pw = resp.getWriter();){
				pw.print(gson.toJson(memList));
			}
		}
		
		if("listByAccStatus".equals(action)) {
			Integer accStatus = Integer.valueOf(req.getParameter("accStatus"));
			List<Mem> memList = service.listByAccStatus(accStatus);
			
			resp.setContentType("application/json");
			try(PrintWriter pw = resp.getWriter();){
				pw.print(gson.toJson(memList));
			}
		}
		
		if("searchMem".equals(action)) {
			String searchContent = req.getParameter("searchContent");
			List<Mem> memList = service.listBySearch(searchContent);
			
			resp.setContentType("application/json");
			try(PrintWriter pw = resp.getWriter();){
				pw.print(gson.toJson(memList));
			}
		}
		
		if("updateStatus".equals(action)) {
			Integer memAccStatus = Integer.valueOf(req.getParameter("memAccStatus"));
			Integer memActStatus = Integer.valueOf(req.getParameter("memActStatus"));
			Integer memNo = Integer.valueOf(req.getParameter("memNo"));
			
			Mem mem = new Mem();
			
			if(service.updateAllStatus(memAccStatus, memActStatus, memNo) > 0){
				mem.setMessage("資料變更成功！");
				mem.setSuccessful(true);
			}else {
				mem.setMessage("資料變更失敗！請重試或連繫系統管理員！");
				mem.setSuccessful(false);
			}
			
			resp.setContentType("application/json");
			try(PrintWriter pw = resp.getWriter();){
				pw.print(gson.toJson(mem));
			}
		}
		
		if("csvDownload".equals(action)) {
		
			String[] memNoArray = req.getParameter("memNoArray").split(",");
			String[] memLevelNameArray = req.getParameter("memLevelNameArray").split(",");
			String[] memAccArray = req.getParameter("memAccArray").split(",");
			String[] memNameArray = req.getParameter("memNameArray").split(",");
			String[] memGenderArray = req.getParameter("memGenderArray").split(",");
			String[] memBdayArray = req.getParameter("memBdayArray").split(",");
			String[] memEmailArray = req.getParameter("memEmailArray").split(",");
			String[] memMobileArray = req.getParameter("memMobileArray").split(",");
			String[] memCityArray = req.getParameter("memCityArray").split(",");
			String[] memDistArray = req.getParameter("memDistArray").split(",");
			String[] memAddrArray = req.getParameter("memAddrArray").split(",");
			String[] memAccStatusArray = req.getParameter("memAccStatusArray").split(",");
			String[] memActStatusArray = req.getParameter("memActStatusArray").split(",");
			//因為註冊時間原本用逗號相隔，日/月/年時間會被切開，要重組回來
			String[] memRegDateInnitialArray = req.getParameter("memRegDateArray").split(",");
			String[] memRegDateArray = new String[memNoArray.length];
			for(int i = 0; i < memRegDateArray.length; i++) {
				memRegDateArray[i] = memRegDateInnitialArray[i*3] + " /" + memRegDateInnitialArray[i*3+1] + " －" + memRegDateInnitialArray[i*3+2];
				System.out.println(memRegDateArray[i]);
			}

			resp.setContentType("text/csv; charset=UTF-8");
			resp.setHeader("Content-Disposition", "attachment; filename=\"selectedMemInfo.csv\"");
			
			byte[] bom = {(byte) 0xEF, (byte) 0xBB, (byte) 0xBF};	//用來在文字編碼前面加上UTF-8的BOM頭，這樣才能讓excel開啟的時候知道是UTF-8編碼，才不會跑出亂碼
			OutputStream os = resp.getOutputStream();
			os.write(bom);
			
			String[] headerArray = {"會員編號", "會員等級", "會員帳號", "會員姓名", "會員性別", "會員生日", "會員電子信箱",
										"會員手機號碼", "會員居住縣市", "會員居住地區", "會員住址", "會員註冊日期", "會員帳號狀態", "會員揪團狀態"};
			
			try(OutputStreamWriter out = new OutputStreamWriter(os, "UTF-8");){

				try(CSVWriter csvWriter = new CSVWriter(out, ',', CSVWriter.NO_QUOTE_CHARACTER, CSVWriter.NO_ESCAPE_CHARACTER, CSVWriter.DEFAULT_LINE_END);){
					csvWriter.writeNext(headerArray);
					for(int i = 0; i < memNoArray.length; i++) {
						String[] memAllValues = 
							{memNoArray[i], memLevelNameArray[i], memAccArray[i], memNameArray[i], 
									memGenderArray[i], memBdayArray[i], memEmailArray[i], memMobileArray[i],
									memCityArray[i], memDistArray[i], memAddrArray[i], memRegDateArray[i],
									memAccStatusArray[i], memActStatusArray[i]};
						
						csvWriter.writeNext(memAllValues);
					}
				}
			}
		}
	}
	
}
