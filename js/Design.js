$(document).ready(function(){
	// $("#itemHolder_Factory").click(function(){
	// 	$(this).stop().animate({width: "190px"}, 200);
	// 	$(this).css({boxShadow: "0 0 5px #778899"});
	// },
	// function(){
	// 	$(this).stop().animate({width: "150px"}, 100);
	// 	$(this).css({boxShadow: "none"});
	// });

	$("#leftHolder ul a").click(function(){
		//alert("test");
	});

	$(".deviceImgHolder .glyphicon-chevron-left").click(function(){
		var iTotalImgWidth = 0;
		$.each($(".imgInnerHolder img"), function() {
			iTotalImgWidth -= (parseInt($(this).width()) + 7);
		});
		if(!$(".imgInnerHolder")[0].style.left){
			$(".imgInnerHolder").css({left: "0px"});
		}
		if(parseInt($(".imgInnerHolder")[0].style.left) > iTotalImgWidth + 85)
		{
			$(".imgInnerHolder").animate({left: "-=85px"}, 200);
		}
	});

	$(".deviceImgHolder .glyphicon-chevron-right").click(function(){
		if(parseInt($(".imgInnerHolder")[0].style.left) <= -85)
		{
			console.debug(parseInt($(".imgInnerHolder")[0].style.left));
			$(".imgInnerHolder").animate({left: "+=85px"}, 200);
		}
	});
});

