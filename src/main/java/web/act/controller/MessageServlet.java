package web.act.controller;

import web.act.jedis.Message;
import web.act.jedis.ReplyMessage;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import static core.util.CommonUtil.json2Pojo;
import static core.util.CommonUtil.writePojo2Json;
@WebServlet("/Act/message")
public class MessageServlet extends HttpServlet {
    private ReplyMessage replyMessage = new ReplyMessage();


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Message message = json2Pojo(request, Message.class);
        replyMessage.addMessage(message);

        List<Message> messages = replyMessage.getAllMessages();

        writePojo2Json(response,messages);
//        response.sendRedirect(request.getContextPath() + "/message");
    }
}

