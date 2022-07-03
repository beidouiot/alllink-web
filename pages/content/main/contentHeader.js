$(function(){
	var contentHeader = "";
	contentHeader = '<h1>历史导航<small id="his-nav">首页</small></h1>';
	contentHeader += '<ol class="breadcrumb">';
	contentHeader += '<li>';
	contentHeader += '<a href="index.html">';
	contentHeader += '<i class="fa fa-dashboard"></i> 首页</a></li></ol>';
	$('#content-header').append(contentHeader);
});
