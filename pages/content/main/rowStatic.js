$(function(){
	var rowStatic = "";
	var firstBox = "";
	var secondBox = "";
	var thirdBox = "";
	var fourthBox = "";
	firstBox = '<div class="col-lg-3 col-xs-6"><div class="small-box bg-aqua"><div class="inner">';
	firstBox += '<h3 id="oneNum">150</h3><p id="oneText">新订单</p></div>';
	firstBox += '<div class="icon"><i class="ion ion-bag"></i></div>';
	firstBox += '<a href="all-order-manage-list.html" class="small-box-footer">详细 <i class="fa fa-arrow-circle-right"></i></a>';
	firstBox += '</div></div>';

	secondBox = '<div class="col-lg-3 col-xs-6"><div class="small-box bg-green">';
	secondBox += '<div class="inner"><h3 id="twoNum">53<sup style="font-size: 20px">%</sup></h3>';
	secondBox += '<p id="twoText">转化率</p></div>';
	secondBox += '<div class="icon"><i class="ion ion-stats-bars"></i></div>';
	secondBox += '<a href="all-ad-statistics-list.html" class="small-box-footer">详细 <i class="fa fa-arrow-circle-right"></i></a>';
	secondBox += '</div></div>';

	thirdBox = '<div class="col-lg-3 col-xs-6"><div class="small-box bg-yellow">';
	thirdBox += '<div class="inner"><h3 id="threeNum">44</h3><p id="threeText">新注册用户</p></div>';
	thirdBox += '<div class="icon"><i class="ion ion-person-add"></i></div>';
	thirdBox += '<a href="all-member-manage-list.html" class="small-box-footer">详细 <i class="fa fa-arrow-circle-right"></i></a>';
	thirdBox += '</div></div>';

	fourthBox = '<div class="col-lg-3 col-xs-6"><div class="small-box bg-red">';
	fourthBox += '<div class="inner"><h3 id="fourNum">65</h3><p id="fourText">日PV</p></div>';
	fourthBox += '<div class="icon"><i class="ion ion-pie-graph"></i></div>';
	fourthBox += '<a href="all-ad-statistics-list.html" class="small-box-footer">详细 <i class="fa fa-arrow-circle-right"></i></a>';
	fourthBox += '</div></div>';

	rowStatic = firstBox + secondBox + thirdBox + fourthBox;
	$('#row-static').append(rowStatic);


});
