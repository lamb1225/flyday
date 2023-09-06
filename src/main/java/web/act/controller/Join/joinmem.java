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

@WebServlet("/Act/joinonemem")
public class joinmem extends HttpServlet {
    private JoinActService service;

    public void init() throws ServletException {
        service = CommonUtil.getBean(getServletContext(), JoinActService.class);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Act_Join join = json2Pojo(req,Act_Join.class);
        if(join == null){
            join = new Act_Join();
            join.setMessage("無加入資訊");
            join.setSuccessful(false);
            writePojo2Json(resp,join);
            return;
        }
        join = service.selectone(join.getActno(),join.getMemno());
        writePojo2Json(resp,join);
    }
}
