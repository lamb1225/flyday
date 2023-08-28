package web.emp.empinfo.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.util.Map;

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

@WebServlet("/emp/getOneInfo")
public class GetOneInfoServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private EmpDao dao;

	public void init() throws ServletException {
		ApplicationContext applicationContext = WebApplicationContextUtils
				.getWebApplicationContext(getServletContext());
		dao = applicationContext.getBean(EmpDao.class);// 初始化EmpDao，我們的資料託管給Bean
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)// 複製自login，指示程式碼do when 接到Post請求
			throws ServletException, IOException {

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

}
