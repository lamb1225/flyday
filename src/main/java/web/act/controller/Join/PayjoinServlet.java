package web.act.controller.Join;

import core.entity.Core;
import core.util.CommonUtil;
import ecpay.payment.integration.domain.AioCheckOutALL;
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

@WebServlet("/Act/Pay")
public class PayjoinServlet extends HttpServlet {
    private JoinActService service;

    public void init() throws ServletException {
        service = CommonUtil.getBean(getServletContext(), JoinActService.class);

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        final Act_Join actJoin = json2Pojo(req, Act_Join.class);
        fixHeaders(resp);
        Integer actno = new Integer(req.getParameter("actno"));
        Integer memno = new Integer(req.getParameter("memno"));
        Integer Payment = new Integer(req.getParameter("Payment"));
        final Act_Join actJoin = new Act_Join();
        actJoin.setActno(actno);
        actJoin.setMemno(memno);
        actJoin.setPayment(Payment);
        final Core core = new Core();
        if (actJoin == null) {
            core.setMessage("無狀態資訊");
            core.setSuccessful(false);
        } else {
            core.setSuccessful(service.updatestatus(actJoin));
        }
        writePojo2Json(resp, core);
    }
    private void fixHeaders(HttpServletResponse resp) {
        // 允許跨域請求的域名，可以是多個域名，用逗號分隔
        resp.setHeader("Access-Control-Allow-Origin", "https://payment-stage.ecpay.com.tw");
        // 允許的HTTP方法
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST");
        // 允許的自定義請求頭
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        // 預檢請求的緩存時間，單位為秒
        resp.setHeader("Access-Control-Max-Age", "3600");
    }
}
