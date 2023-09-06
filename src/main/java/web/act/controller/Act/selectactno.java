package web.act.controller.Act;

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
@WebServlet("/Act/ByActno")
public class selectactno extends HttpServlet {
    private JoinActService service;

    public void init() throws ServletException {
        service = CommonUtil.getBean(getServletContext(), JoinActService.class);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        final Integer id = json2Pojo(req, Act_Join.class).getActno();

        final Core core = new Core();
        if (id == null) {
            core.setMessage("查無此id");
            core.setSuccessful(false);
        }
        writePojo2Json(resp, service.selectJoin(id));
    }
}
