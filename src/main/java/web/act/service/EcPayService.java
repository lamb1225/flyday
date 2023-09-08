package web.act.service;

import ecpay.payment.integration.domain.AioCheckOutALL;

public interface EcPayService {
    public String ecpayCheckout(AioCheckOutALL aioCheckOutALL,String returnURL);
}
