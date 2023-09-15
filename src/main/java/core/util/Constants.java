package core.util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Constants {
	public static final Gson GSON = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
	public static final String JSON_MIME_TYPE = "application/json";
	public static final String SERVER_URL = "https://flyday.ddns.net/";
}
