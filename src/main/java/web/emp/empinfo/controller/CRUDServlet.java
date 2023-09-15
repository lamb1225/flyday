package web.emp.empinfo.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
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

import web.emp.empinfo.dao.EmpDao;
import web.emp.empinfo.entity.Emp;
import web.emp.empinfo.service.EmpService;

@WebServlet("/emp/controller")
public class CRUDServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private EmpDao dao;
	private EmpService empService;

	public void init() throws ServletException {
		ApplicationContext applicationContext = WebApplicationContextUtils
				.getWebApplicationContext(getServletContext());
		dao = applicationContext.getBean(EmpDao.class);// 初始化EmpDao，資料託管給Bean
		empService = applicationContext.getBean(EmpService.class); // 初始化EmpService，會使原功能變500(?)
		// 檢查碼
		if (dao == null) {
			System.out.println("dao is null during Servlet initialization!");
		}

		if (empService == null) {
			System.out.println("empService is null during Servlet initialization!");
		}
		// 檢查碼end
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)// 複製自login，指示程式碼do when 接到Post請求
			throws ServletException, IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		try {
			Map<String, String> errorMsgs = new LinkedHashMap<String, String>();
			request.setCharacterEncoding("UTF-8");
			Gson gson = new Gson();
//		String action = request.getParameter("action");  //request.getParameter用於從HttpServletRequest取得資料
			BufferedReader reader = request.getReader();
			Map<String, Object> requestData = gson.fromJson(reader, Map.class); // 將JSON內容解析為Map(黃標:安全疑慮)
			String action = (String) requestData.get("action"); // requestData用於解析JSON資料
			String signUp = (String) requestData.get("signUp"); // 從Map中獲取signUp參數

			// 引導刪除功能進入此方法
			if ("btn-delete".equals(action)) {
				request.setAttribute("errorMsgs", errorMsgs);

				/*************************** 1.接收請求參數 ***************************************/
				Integer empNo = Integer.valueOf((String) requestData.get("empNo"));
				try {
					/*************************** 2.開始刪除資料 ***************************************/
					empService.deleteEmp(empNo);
					/*************************** 3.刪除完成,準備轉交(Send the Success view) ***********/
					response.setContentType("application/json"); // 以Json形式回傳資料
					response.setCharacterEncoding("UTF-8");
					response.getWriter().write("{\"success\": true, \"message\": \"刪除成功\"}"); // 回傳資訊
					return; // 這裡加上 return 確保不會繼續執行下面的程式碼

				} catch (Exception e) {
					response.setContentType("application/json");
					response.setCharacterEncoding("UTF-8");
					response.getWriter().write("{\"success\": false, \"message\": \"刪除時出錯: " + e.getMessage() + "\"}");
					return; // 這裡加上 return 確保不會繼續執行下面的程式碼
				}

			}

			// 新增員工功能
			if ("btn-signUp".equals(signUp)) {
				try {
					// 測試從HttpServletRequest中讀取JSON：
					StringBuilder buffer = new StringBuilder();
					String line;
					while ((line = reader.readLine()) != null) {
						buffer.append(line);
					}
					String jsonContent = buffer.toString();
					System.out.println("Received JSON: " + jsonContent);
					// 測試end,成功新建資料
					Emp emp = gson.fromJson(gson.toJson(requestData), Emp.class);
					if (emp == null) {
						System.out.println("Parsed Emp object is null");
						return;
					}
					emp = empService.register(emp);
					if (emp == null) {
						System.out.println("Emp object after register is null");
						return;
					}
					response.setContentType("application/json");
					try (PrintWriter pw = response.getWriter();) {
						pw.print(gson.toJson(emp));
					}
				} catch (Exception e) {
					e.printStackTrace();
					return;
				}
			}

			// 修改功能
			if ("btn-save".equals(action)) {
				// 檢查碼，確認action value
//			System.out.println("Action value: " + action);
				// 檢查碼end
				request.setAttribute("errorMsgs", errorMsgs);

				/*************************** 1.接收請求參數 - 輸入格式的錯誤處理 **********************/
				Integer empNo = null;//先將empNo設為null
				if (requestData.containsKey("empNo")) {
					empNo = Integer.valueOf((String) requestData.get("empNo"));
					//此令empNo轉為String
				}
				String empAcc = requestData.containsKey("empAcc") ? (String) requestData.get("empAcc") : null;
				String empPwd = requestData.containsKey("empPwd") ? (String) requestData.get("empPwd") : null;
				String empName = requestData.containsKey("empName") ? (String) requestData.get("empName") : null;
				Integer empStatus = requestData.containsKey("empStatus")
						? Integer.parseInt((String) requestData.get("empStatus"))
						: null;
				//由前端得到修改數據
				Emp update = new Emp();
				update.setEmpNo(empNo);
				update.setEmpAcc(empAcc);
				update.setEmpPwd(empPwd);
				update.setEmpName(empName);
				update.setEmpStatus(empStatus);
				String empAccReg = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";// 判定email
				String empPwdReg = "^[(\u4e00-\u9fa5)(a-zA-Z0-9)]{5,8}$";// 判定5-8碼
				// (\u4e00-\u9fa5):任一Unicode 範圍 4E00 到 9FA5 之間的字符，大致對應到常用的中文字。
				// (a-zA-Z0-9)任一小寫、大寫字母，0-9;{5,8}前述字符出現5-8次
				// 修改信箱、密碼、姓名、在職碼
				if (empAcc == null || empAcc.trim().length() == 0) {
					errorMsgs.put("empAcc", "未輸入員工帳號");
				} else if (!empAcc.trim().matches(empAccReg)) {
					errorMsgs.put("empAcc", "員工帳號:限定聯絡email");
				}
				// =============================================
				if (empPwd == null || empPwd.trim().length() == 0) {
					errorMsgs.put("empPwd", "未輸入密碼");
				} else if (!empPwd.trim().matches(empPwdReg)) {
					errorMsgs.put("empPwd", "密碼:請設置5到8位數密碼");
				}
				// ==============================================
				if (empName == null || empName.trim().length() == 0) {
					errorMsgs.put("empName", "未輸入姓名");
				}

				// Send the use back to the form, if there were errors by json
				if (!errorMsgs.isEmpty()) {
					String jsonErrorMsgs = new Gson().toJson(errorMsgs);
					out.print("{\"success\":false, \"errors\":" + jsonErrorMsgs + "}");
					return; // 程式中斷
				}
				/*************************** 2.開始修改資料 *****************************************/
				if (empService == null) {
					out.print("{\"success\":false, \"message\":\"伺服器錯誤\"}");
					return; // this will exit the doPost method
				}
				Emp emp = empService.update(update);
				//偵錯檢查碼
//				if(emp.getEmpNo() == null) {
//				    System.out.println("EmpNo is null after update operation.");
//				} else {
//				    System.out.println("Updating emp with empNo: " + emp.getEmpNo());
//				    out.print("{\"success\":true, \"message\":\"修改成功\"}");
//				}
				//偵錯檢查碼end
			}

			// 單一員工查詢功能
			if ("btn-search".equals(action)) {
				try (BufferedReader br = request.getReader();) {
					Integer empNo = Integer.parseInt(requestData.get("EMP_NO").toString()); // 從 map 中獲取 empNo)
					// 檢查碼
//					Map<String, Object> requestBody = gson.fromJson(br, type);
					//
//					Object empNoObj = requestBody.get("EMP_NO");
//					if (empNoObj == null) {
//					    // 處理這個情況，例如返回一個錯誤信息給前端
//					    response.setContentType("application/json");
//					    response.setCharacterEncoding("UTF-8");
//					    response.getWriter().write("{\"success\": false, \"message\": \"EMP_NO not provided in request.\"}");
//					    return;
//					}
//					Integer empNo = Integer.parseInt(empNoObj.toString());
					// 檢查碼end
					Emp emp = dao.selectByEmpNo(empNo);// 使用 dao 查詢 emp

					HttpSession session = request.getSession();
					session.setAttribute("emp", emp);

					response.setContentType("application/json");
					try (PrintWriter pw = response.getWriter();) {
						pw.print(gson.toJson(emp));
					}

				}
			}else{System.out.println("Action value: " + action);};

		} catch (Exception e) {
			out.print("{\"success\":false, \"message\":\"伺服器內部錯誤2\"}");
		}
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)// 複製自login，指示程式碼do when 接到Post請求
			throws ServletException, IOException {

		Map<String, String> errorMsgs = new LinkedHashMap<String, String>();

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
