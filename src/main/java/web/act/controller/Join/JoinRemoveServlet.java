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

@WebServlet("/Act/removejoin")
public class JoinRemoveServlet extends HttpServlet {
    private JoinActService service;

    public void init() throws ServletException {
        service = CommonUtil.getBean(getServletContext(), JoinActService.class);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        final Act_Join Join = json2Pojo(req, Act_Join.class);
        final Core core = new Core();
        if (Join.getActno() == null || Join.getMemno() == null) {
            Act_Join actJoin = new Act_Join();
            actJoin.setMessage("查無此id");
            actJoin.setSuccessful(false);
        } else {
            core.setSuccessful(service.exit(Join.getActno(), Join.getMemno()));
            writePojo2Json(resp, core);
        }
    }
}
