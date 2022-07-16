$(function(){
	var oneTitle = '<div class="box-header with-border"><i class="fa fa-cube"></i><h3 class="box-title">待处理订单</h3></div>';
	var oneTableBox = "";
	oneTableBox += '<div class="table-box">';
	oneTableBox += '<table id="dataList" class="table table-bordered table-striped table-hover dataTable">';
	oneTableBox += '<thead><tr>';
	oneTableBox += '<th class="">订单号</th>';
	oneTableBox += '<th class="">产品名称</th>';
	oneTableBox += '<th class="">会员</th>';
	oneTableBox += '<th class="">价格</th>';
	oneTableBox += '<th class="">状态</th>';
	oneTableBox += '<th class="text-center">操作</th>';
	oneTableBox += '</tr></thead>';
	oneTableBox += '<tbody>';
	var trDatas = "";
	// trDatas = findData();
	// oneTableBox += trDatas;
	oneTableBox += '</tbody>';
	oneTableBox += '</table>';
	oneTableBox += '</div></div></div>';
	// $('#doingOne').append(oneTitle+oneTableBox);
});


function findData() {
	var htmlData = "";
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
	            url:ctx+'api/uc/user/v1/findAll',
	            success: function(resData){
	            	if(resData.code == 0) {
	            		htmlData = showData(resData.data);
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
	return htmlData;
}

function showData(data) {
	var htmllet = "";
	$.each(data, function(i,item){
		var status = item.status == true ? "禁用":"启用";
		htmllet += '<tr>';
		htmllet += '<td>'+item.username+'</td>';
		htmllet += '<td>'+item.name+'</td>';
		htmllet += '<td>'+item.nickname+'</td>';
		htmllet += '<td>'+item.mobile+'</td>';
		htmllet += '<td>'+status +'</td>';
		htmllet += '<td class="text-center">';
		htmllet += '<button type="button" class="btn bg-olive btn-xs" onclick="">编辑</button>';
		htmllet += '</td>';
		htmllet += '</tr>';
	});
	return htmllet;
}