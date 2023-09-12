package web.act.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Tuple;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

import static core.util.Constants.GSON;

@ServerEndpoint("/MessageWS/{userName}/{roomId}")
public class MessageWS {

    Gson gson = new Gson();
    private static final Set<Session> connectedSessions = Collections.synchronizedSet(new HashSet<>());
    Jedis jedis = new Jedis("localhost", 6379);

    /*
     * 如果想取得HttpSession與ServletContext必須實作
     * ServerEndpointConfig.Configurator.modifyHandshake()，
     * 參考https://stackoverflow.com/questions/21888425/accessing-servletcontext-and-httpsession-in-onmessage-of-a-jsr-356-serverendpoint
     */
    @OnOpen
    public void onOpen(@PathParam("userName") String userName, @PathParam("roomId") Integer roomId, Session userSession) throws IOException {
        connectedSessions.add(userSession);
        String text = String.format("Session ID = %s, connected; userName = %s", userSession.getId(), userName);
        System.out.println(text);

        List<String> messages = jedis.lrange(String.valueOf(roomId), 1, -1);
        List<JsonObject> jsonObjects = new ArrayList<>();
        for (String message : messages) {

            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("message", message);

            jsonObjects.add(jsonObject);
        }

    }

    @OnMessage
    public void onMessage(Session userSession, String message) {
        for (Session session : connectedSessions) {
            if (session.isOpen())
                session.getAsyncRemote().sendText(message);
        }
        JsonObject jsonObject = GSON.fromJson(message, JsonObject.class);
        String username = jsonObject.get("userName").getAsString();
        String messages = jsonObject.get("message").getAsString();
//        System.out.println("Message received:" + message);
        jedis.lpush("1", username + ":" + messages); // key值不能寫死
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
