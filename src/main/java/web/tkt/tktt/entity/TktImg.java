package web.tkt.tktt.entity;

import java.util.Arrays;
import java.util.List;

public class TktImg extends ImageUtil{
	private Integer tktimgno;
    private Integer tktno;
    private byte[] tktimg;
    private String imgBase64;
    private List<String> tktimgBase64;

    
	@Override
	public String toString() {
		return "TktImg [tktimgno=" + tktimgno + ", tktno=" + tktno + ", tktimg=" + Arrays.toString(tktimg)
				+ ", imgBase64=" + imgBase64 + ", tktimgBase64=" + tktimgBase64 + "]";
	}
	
	public TktImg(Integer tktimgno, Integer tktno, byte[] tktimg, String imgBase64, List<String> tktimgBase64) {
		super();
		this.tktimgno = tktimgno;
		this.tktno = tktno;
		this.tktimg = tktimg;
		this.imgBase64 = imgBase64;
		this.tktimgBase64 = tktimgBase64;
	}


	public TktImg(){
		super();
	}

	public Integer getTktimgno() {
		return tktimgno;
	}

	public void setTktimgno(Integer tktimgno) {
		this.tktimgno = tktimgno;
	}

	public Integer getTktno() {
		return tktno;
	}

	public void setTktno(Integer tktno) {
		this.tktno = tktno;
	}

	public byte[] getTktimg() {
		return tktimg;
	}

	public void setTktimg(byte[] tktimg) {
		this.tktimg = tktimg;
	}

	
	public String getImgBase64() {
		return imgBase64;
	}

	public void setImgBase64(String imgBase64) {
		this.imgBase64 = imgBase64;
	}

	public List<String> getTktimgBase64() {
		return tktimgBase64;
	}

	public void setTktimgBase64(List<String> tktimgBase64) {
		this.tktimgBase64 = tktimgBase64;
	}
	
}
