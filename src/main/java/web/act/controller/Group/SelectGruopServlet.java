package web.act.controller.Group;

import core.util.CommonUtil;
import web.act.service.GroupService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static core.util.CommonUtil.writePojo2Json;

@WebServlet("/Act/SelectGroup")
public class SelectGruopServlet extends HttpServlet {
    private GroupService service;

    public void init() throws ServletException {
        service = CommonUtil.getBean(getServletContext(), GroupService.class);

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        writePojo2Json(resp, service.fillAll());
    }
}
