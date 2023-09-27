package web.act.controller.Act;

import core.util.CommonUtil;
import web.act.entity.Act;
import web.act.service.ActService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;

@WebServlet("/Act/memAct")
public class memActselect extends HttpServlet {
    private ActService service;

    public void init() throws ServletException {
        service = CommonUtil.getBean(getServletContext(), ActService.class);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        final Integer id = json2Pojo(req, Act.class).getMemno();
//        final Core core = new Core();
//        if (id == null) {
//            core.setMessage("查無此id");
//            core.setSuccessful(false);
//        }
//        writePojo2Json(resp, service.memAct(id));
        writePojo2Json(resp,service.memAct(id));
    }
}
