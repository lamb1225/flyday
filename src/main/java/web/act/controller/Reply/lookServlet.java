package web.act.controller.Reply;

import core.util.CommonUtil;
import web.act.entity.Act_Reply;
import web.act.service.ReplyService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;
@WebServlet("/Act/look")
public class lookServlet extends HttpServlet {
    private ReplyService service;

    public void init() throws ServletException {
        service = CommonUtil.getBean(getServletContext(), ReplyService.class);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Integer reply = json2Pojo(req, Act_Reply.class).getActno();

        writePojo2Json(resp, service.selectActno(reply));
    }
}
