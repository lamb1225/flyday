package web.act.controller.Group;

import core.entity.Core;
import core.util.CommonUtil;
import web.act.entity.Act;
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

@WebServlet("/Act/proces")
public class ProcessingGroupServlet extends HttpServlet {
    private GroupService service;

    public void init() throws ServletException {
        service = CommonUtil.getBean(getServletContext(), GroupService.class);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        final Rp_Group group = json2Pojo(req, Rp_Group.class);
        final Core core = new Core();
        if (group == null) {
            core.setMessage("無更新資訊");
            core.setSuccessful(false);
        }else {
            core.setSuccessful(service.Processing(group));
        }
        writePojo2Json(resp,core);
    }
}
