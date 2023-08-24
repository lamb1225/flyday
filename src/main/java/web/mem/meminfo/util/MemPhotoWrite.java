package web.mem.meminfo.util;

import java.sql.*;
import java.io.*;

class MemPhotoWrite {

	public static void main(String argv[]) {
		Connection con = null;
		PreparedStatement pstmt = null;
		InputStream fin = null;
		String url = "jdbc:mysql://localhost:3306/flyday?serverTimezone=Asia/Taipei";
		String userid = "root";
		String passwd = "123456";
		String photos = "src/main/webapp/images/mem"; //測試用圖片需置於【專案路徑】底下的指定目錄內
		String update = "update MEM set MEM_PIC =? where MEM_NO =?";

		int count = 1;
		try {
			con = DriverManager.getConnection(url, userid, passwd);
			File[] photoFiles = new File(photos).listFiles();
			for (File f : photoFiles) {
				fin = new FileInputStream(f);
				pstmt = con.prepareStatement(update);
				pstmt.setInt(2, count);
				pstmt.setBinaryStream(1, fin);
				pstmt.executeUpdate();
				count++;
				System.out.print(" update the database...");
				System.out.println(f.toString());
			}

			fin.close();
			pstmt.close();
			System.out.println("加入圖片-更新成功.........");
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}
