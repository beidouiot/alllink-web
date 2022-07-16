$(function(){
	var twoTitle = '<div class="box-header with-border">';
	twoTitle += '<i class="fa fa-book"></i>';
	twoTitle += '<h3 class="box-title">待处理游记</h3>';
	twoTitle += '</div>';
	var twoTableBox = "";
	twoTableBox += '<div class="box-body">';
	twoTableBox += '<div class="table-box">';
	twoTableBox += '<table id="dataList" class="table table-bordered table-striped table-hover dataTable">';
	twoTableBox += '<thead>';
	twoTableBox += '<tr>';
	twoTableBox += '<th class="">会员昵称</th>';
	twoTableBox += '<th class="">游记标题</th>';
	twoTableBox += '<th class="">发布时间</th>';
	twoTableBox += '<th class="">状态</th>';
	twoTableBox += '<th class="text-center">操作</th>';
	twoTableBox += '</tr>';
	twoTableBox += '</thead>';
	twoTableBox += '<tbody>';
	var trDatas = "";
	// trTwoDatas = findTwoData();
	// twoTableBox += trTwoDatas;
	twoTableBox += '</tbody>';
	twoTableBox += '</table>';
	twoTableBox += '</div></div>';
	// $('#doingTwo').append(twoTitle+twoTableBox);
});


function findTwoData() {
	var htmlTwoData = "";
	var storage = window.localStorage;
	var ctx = storage.getItem("ctx");
	$.ajax({
	            type: "GET",
	            dataType: "json",
	            async: false,
	            beforeSend: function(XMLHttpRequest) {
	                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
	            },
	            contentType: "application/json;charset=utf-8",
	            url:ctx+'api/uc/menu/v1/findAll',
	            success: function(resData){
	            	if(resData.code == 0) {
	            		htmlTwoData = showTwoData(resData.data);
	            	} else {
	            		alert(resData.code+resData.msg);
	            		if(resData.code == 401) {
	            			window.location.href=storage.getItem("loginUrl");
	            		}
	            	}
	                
	            },
	            error: function(XMLHttpRequest,status, error) {
	                console.log("xhr======"+JSON.stringify(XMLHttpRequest));
	            }
	        });
	return htmlTwoData;
}

function showTwoData(data) {
	var htmllet = "";
	$.each(data, function(i,item){
		var status = item.status == true ? "禁用":"启用";
		htmllet += '<tr>';
		htmllet += '<td>'+item.code+'</td>';
		htmllet += '<td>'+item.name+'</td>';
		htmllet += '<td>'+item.addr+'</td>';
		htmllet += '<td>'+item.type+'</td>';
		htmllet += '<td class="text-center">';
		htmllet += '<button type="button" class="btn bg-olive btn-xs" onclick="">编辑</button>';
		htmllet += '</td>';
		htmllet += '</tr>';
	});
	return htmllet;
}