package web.act.controller;

import core.entity.Core;
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
@WebServlet("/revise")
public class reviseAct extends HttpServlet {

    private ActService service;

    public void init() throws ServletException {
        service = CommonUtil.getBean(getServletContext(), ActService.class);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        final Act act = json2Pojo(req, Act.class);
        final Core core = new Core();
        if (act == null) {
            core.setMessage("無揪團資訊");
            core.setSuccessful(false);
        }else {
            core.setSuccessful(service.revise(act));
        }
        writePojo2Json(resp,core);
    }
}
