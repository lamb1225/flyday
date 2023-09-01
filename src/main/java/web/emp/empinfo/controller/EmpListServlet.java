package web.emp.empinfo.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.google.gson.Gson;

import web.emp.empinfo.dao.EmpDao;
import web.emp.empinfo.entity.Emp;

@WebServlet("/emp/getAllInfo")
public class EmpListServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private EmpDao dao;

	public void init() throws ServletException {
		ApplicationContext applicationContext = WebApplicationContextUtils
				.getWebApplicationContext(getServletContext());
		dao = applicationContext.getBean(EmpDao.class);// 初始化EmpDao，我們的資料託管給Bean
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)// 複製自login，指示程式碼do when 接到Post請求
			throws ServletException, IOException {

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
	}
}
