package web.act.controller;

import ecpay.payment.integration.domain.AioCheckOutALL;
import web.act.service.EcPayService;
import web.act.service.impl.EcPayServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;



@WebServlet("/Act/ECPay")
public class ECPayServlet extends HttpServlet {
    public static final String SERVER_URL = " https://1e0f-1-171-172-15.ngrok.io";
    private static final long serialVersionUID = -3935509715372119008L;
    //    public static final ECPayCheckoutService SERVICE = new ECPayCheckoutService();
    public static final EcPayService SERVICE = new EcPayServiceImpl();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=utf-8");
        AioCheckOutALL obj = json2Pojo(req, AioCheckOutALL.class);
        String reurl = SERVER_URL + req.getContextPath() + "/Act/hotel-detail.html?actno=" + obj.getCustomField1();//Servlet路徑
        String form = SERVICE.ecpayCheckout(obj, reurl);
        System.out.println(form);
        req.getSession().setAttribute("ECPayForm", form);
//        req.getSession().setAttribute("actno", obj.getCustomField1());
        String url = "/Act/ECPayform.jsp";
//        writePojo2Json(resp,form);
        writePojo2Json(resp,
                req.getScheme() + "://" + req.getServerName() + ":" + req.getServerPort() + req.getContextPath() + url);


    }
}
