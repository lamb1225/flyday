package web.act.controller;

import com.google.gson.JsonObject;
import redis.clients.jedis.Jedis;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import static core.util.Constants.GSON;

@ServerEndpoint("/MessageWS/{userName}/{roomId}")
public class MessageWS {
    private static final Set<Session> connectedSessions = Collections.synchronizedSet(new HashSet<>());
    Jedis jedis = new Jedis("localhost", 6379);

    /*
     * 如果想取得HttpSession與ServletContext必須實作
     * ServerEndpointConfig.Configurator.modifyHandshake()，
     * 參考https://stackoverflow.com/questions/21888425/accessing-servletcontext-and-httpsession-in-onmessage-of-a-jsr-356-serverendpoint
     */
    @OnOpen
    public void onOpen(@PathParam("userName") String memName, @PathParam("roomId") Integer roomId, Session memSession) throws IOException {
        connectedSessions.add(memSession);
        String text = String.format("Session ID = %s, connected; memName = %s", memSession.getId(), memName);
        System.out.println(text);

        // 測試剛進入競標頁面的使用者也可以看到先前的出價紀錄
        Set<String> allRecords = jedis.smembers(String.valueOf(roomId));
        for (String record : allRecords) {
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("message", record);
            memSession.getBasicRemote().sendText(jsonObject.toString());
        }
    }

    @OnMessage
    public void onMessage(Session memSession, String message, @PathParam("roomId") Integer roomId) {
        for (Session session : connectedSessions) {
            if (session.isOpen())
                session.getAsyncRemote().sendText(message);
        }
        JsonObject jsonObject = GSON.fromJson(message, JsonObject.class);
        String username = jsonObject.get("userName").getAsString();
        String content = jsonObject.get("message").getAsString();
//        System.out.println("Message received:" + message);
        jedis.sadd("1", username + ":" + content); // key值不能寫死
        System.out.println("Message received: " + message);
    }

    @OnClose
    public void onClose(Session userSession, CloseReason reason) {
        connectedSessions.remove(userSession);
        String text = String.format("session ID = %s, disconnected; close code = %d; reason phrase = %s",
                userSession.getId(), reason.getCloseCode().getCode(), reason.getReasonPhrase());

        System.out.println(text);
    }

    @OnError
    public void onError(Session userSession, Throwable e) {
        System.out.println("Error: " + e.toString());
    }

}
