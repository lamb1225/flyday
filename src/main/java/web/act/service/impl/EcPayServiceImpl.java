package web.act.service.impl;

import ecpay.payment.integration.AllInOne;
import ecpay.payment.integration.domain.AioCheckOutALL;
import web.act.service.EcPayService;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;


public class EcPayServiceImpl implements EcPayService {
    public String ecpayCheckout(AioCheckOutALL aioCheckOutALL, String reurl) {
        Date tradeDate = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        String tracdeDatestr = sdf.format(tradeDate);

        String uuid = UUID.randomUUID().toString().replace("-", "").substring(0, 20);
        AllInOne all = new AllInOne("");
        aioCheckOutALL.setMerchantTradeNo(uuid);
        aioCheckOutALL.setMerchantTradeDate(tracdeDatestr);
        aioCheckOutALL.setReturnURL(reurl);
        aioCheckOutALL.setNeedExtraPaidInfo("N");
//        aioCheckOutALL.getCustomField1();
        String form = all.aioCheckOut(aioCheckOutALL, null);
        return form;
    }
}
