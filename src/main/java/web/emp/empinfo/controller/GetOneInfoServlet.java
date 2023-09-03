package web.emp.empinfo.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import web.emp.empinfo.dao.EmpDao;
import web.emp.empinfo.entity.Emp;
import web.emp.empinfo.service.EmpService;

@WebServlet("/emp/getInfo")
public class GetOneInfoServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private EmpDao dao;
	private EmpService empService;

	public void init() throws ServletException {
		ApplicationContext applicationContext = WebApplicationContextUtils
				.getWebApplicationContext(getServletContext());
		dao = applicationContext.getBean(EmpDao.class);// 初始化EmpDao，我們的資料託管給Bean
		empService = applicationContext.getBean(EmpService.class); // 初始化EmpService，會使原功能變500(?)
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)// 複製自login，指示程式碼do when 接到Post請求
			throws ServletException, IOException {
		Map<String, String> errorMsgs = new LinkedHashMap<String, String>();

		request.setCharacterEncoding("UTF-8");
		String action = request.getParameter("action");
		// 目前"btn-delete".equals(action)似乎為false
		if ("btn-delete".equals(action)) {
		request.setAttribute("errorMsgs", errorMsgs);

		/*************************** 1.接收請求參數 ***************************************/
		Integer empNo = Integer.valueOf(request.getParameter("empNo"));
		try {
			/*************************** 2.開始刪除資料 ***************************************/
			empService.deleteEmp(empNo);
			/*************************** 3.刪除完成,準備轉交(Send the Success view) ***********/
			response.setContentType("application/json"); //以Json形式回傳資料
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write("{\"success\": true, \"message\": \"刪除成功\"}"); //回傳資訊
			return; // 這裡加上 return 確保不會繼續執行下面的程式碼

		} catch (Exception e) {
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write("{\"success\": false, \"message\": \"刪除時出錯: " + e.getMessage() + "\"}");
			return; // 這裡加上 return 確保不會繼續執行下面的程式碼
		}

		}
		// 因鎖定刪除功能的篩選機制失效，故先屏蔽單搜尋功能測試刪除功能
		try (BufferedReader br = request.getReader();) {
			Gson gson = new Gson();

			Type type = new TypeToken<Map<String, Object>>() {
			}.getType();
			Map<String, Object> requestBody = gson.fromJson(br, type);
			Integer empNo = Integer.parseInt(requestBody.get("EMP_NO").toString()); // 從 map 中獲取 empNo)
			Emp emp = dao.selectByEmpNo(empNo);// 使用 dao 查詢 emp
			if (emp == null) {
				emp = new Emp();
				emp.setMessage("請輸入會員編號");
				emp.setSuccessful(false);
				response.setContentType("application/json");
				try (PrintWriter pw = response.getWriter();) {
					pw.print(gson.toJson(emp));
				}
				return;
			}

			HttpSession session = request.getSession();
			session.setAttribute("emp", emp);

			response.setContentType("application/json");
			try (PrintWriter pw = response.getWriter();) {
				pw.print(gson.toJson(emp));
			}

		}
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)// 複製自login，指示程式碼do when 接到Post請求
			throws ServletException, IOException {

		Map<String, String> errorMsgs = new LinkedHashMap<String, String>();
		String action = request.getParameter("action");

		try {
			Gson gson = new Gson();
			List<Emp> empList = dao.selectAll(); // 獲取所有員工列表

			// 將員工列表轉換為JSON格式並返回給客戶端
			response.setContentType("application/json");
			try (PrintWriter pw = response.getWriter();) {
				pw.print(gson.toJson(empList));
			}

		} catch (Exception e) {
			e.printStackTrace();
			// 處理錯誤情況
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			response.getWriter().print("Error retrieving employee data.");
		}

		if (empService == null) {
			errorMsgs.put("serviceError", "Employee service is not initialized.");
			request.setAttribute("errorMsgs", errorMsgs);
			RequestDispatcher failureView = request.getRequestDispatcher("/errorPage.jsp");
			failureView.forward(request, response);
			return; // 終止後續的操作
		}

	}

}
