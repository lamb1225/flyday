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

@WebServlet("/Act/create")
public class ActServlet extends HttpServlet {
    private static final long serialVersionUID = 8457165354645958854L;
    private ActService service;
//    private  Object
    public void init() throws ServletException {
        service = CommonUtil.getBean(getServletContext(), ActService.class);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Act act = json2Pojo(req, Act.class);

        if (act == null) {
            act = new Act();
            act.setMessage("無揪團資訊");
            act.setSuccessful(false);
            writePojo2Json(resp, act);
            return;
        }
        act = service.createAct(act);

        writePojo2Json(resp,act);
    }
}
