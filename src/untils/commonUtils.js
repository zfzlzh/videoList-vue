export default {
	videoTimeTransfer(time){
		if(!time){
			return "00:00:00"
		}
		let totalTime = time / 1000
		let h = parseInt(totalTime / 3600),
		    m = parseInt(totalTime % 3600 / 60),
		    s = parseInt(totalTime % 60);
		h = h < 10 ? "0" + h : h;
		m = m < 10 ? "0" + m : m;
		s = s < 10 ? "0" + s : s;
		return h + ":" + m + ":" + s;
	}
}