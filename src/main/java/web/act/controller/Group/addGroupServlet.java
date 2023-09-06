package web.act.controller.Group;

import core.util.CommonUtil;
import web.act.entity.Rp_Group;
import web.act.service.GroupService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;
@WebServlet("/Act/report")
public class addGroupServlet extends HttpServlet {
    private GroupService service;

    public void init() throws ServletException {
        service = CommonUtil.getBean(getServletContext(), GroupService.class);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Rp_Group group = json2Pojo(req, Rp_Group.class);

        if (group == null) {
            group = new Rp_Group();
            group.setMessage("無檢舉資訊");
            group.setSuccessful(false);
            writePojo2Json(resp, group);
            return;
        }
        group = service.addGroup(group);

        writePojo2Json(resp,group);
    }
}
