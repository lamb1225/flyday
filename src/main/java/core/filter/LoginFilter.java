package core.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import web.mem.meminfo.entity.Mem;

public class LoginFilter extends HttpFilter{

	private static final long serialVersionUID = 3370162046491516083L;

	@Override
	protected void doFilter(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		
		System.out.println("LoginFilter啟動...");
		
		HttpSession session = req.getSession();
		Mem mem = (Mem) session.getAttribute("mem");
		
		if(mem == null) {
//			session.setAttribute("location", req.getRequestURI());
//			res.sendRedirect(req.getContextPath() + "/front_end/sign-in.html");
			res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return;
		}else {
			chain.doFilter(req, res);
		}
		
	}
	
}
