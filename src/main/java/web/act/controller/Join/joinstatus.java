package web.act.controller.Join;

import core.entity.Core;
import core.util.CommonUtil;
import web.act.entity.Act_Join;
import web.act.service.JoinActService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;
@WebServlet("/Act/pass")
public class joinstatus extends HttpServlet {
    private JoinActService service;

    public void init() throws ServletException {
        service = CommonUtil.getBean(getServletContext(), JoinActService.class);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        final Act_Join actJoin = json2Pojo(req, Act_Join.class);
        final Core core = new Core();
        if (actJoin == null) {
            core.setMessage("無狀態資訊");
            core.setSuccessful(false);
        }else {
            core.setSuccessful(service.updatestatus(actJoin));
        }
        writePojo2Json(resp,core);
    }
}
