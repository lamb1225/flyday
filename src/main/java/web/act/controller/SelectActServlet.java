package web.act.controller;

import core.util.CommonUtil;
import web.act.service.ActService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static core.util.CommonUtil.writePojo2Json;

@WebServlet("/Act/select")
public class SelectActServlet extends HttpServlet {
    private ActService service;

    public void init() throws ServletException {
        service = CommonUtil.getBean(getServletContext(), ActService.class);

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        List<Act> actList = service.selectAll();
//        req.setAttribute("actList", actList);
//        req.getRequestDispatcher("/Act/selectAct.jsp").forward(req, resp);
        writePojo2Json(resp,service.selectAll());

    }
}
