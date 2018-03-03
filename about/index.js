
$(function(){

	$(".h_logo").click(function(){
		return false;
	});

	$(".h_center").click(function(){
		return false;
	});

	$(".m_index").children().on("mouseover",function(){
		$(this).css("color","#252628");
	});
	$(".m_index").children().on("mouseout",function(){
		$(this).css("color","#fff");
	});
})