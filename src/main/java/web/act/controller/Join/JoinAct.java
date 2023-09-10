package web.act.controller.Join;

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

@WebServlet("/Act/Join")
public class JoinAct extends HttpServlet {
    private JoinActService service;

    public void init() throws ServletException {
        service = CommonUtil.getBean(getServletContext(), JoinActService.class);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Act_Join actjoin = json2Pojo(req, Act_Join.class);


        if (actjoin == null) {
            actjoin = new Act_Join();
            actjoin.setMessage("無加入資訊");
            actjoin.setSuccessful(false);
            writePojo2Json(resp, actjoin);
            return;
        }
        actjoin = service.JoinAct(actjoin);

        writePojo2Json(resp, actjoin);
    }
}
