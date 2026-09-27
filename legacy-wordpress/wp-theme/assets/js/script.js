// オンマウス半透明処理
$(document).ready(
	function(){
		$("a, .faqList dt, input[type=submit], .topLink, .floatLink") .hover(function(){
			$(this).fadeTo("4000",0.5);
		},function(){
		$(this).fadeTo("4000",1.0);
	});
});
