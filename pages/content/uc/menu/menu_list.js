function showMenList(){

	var toolsHtml = '<div class="pull-left">';
    toolsHtml += '<div class="form-group form-inline">';
    toolsHtml += '<div class="btn-group">';
    toolsHtml += '<button type="button" class="btn btn-default" title="新建"><i class="fa fa-file-o"></i> 新建</button> &nbsp;';
    toolsHtml += '<button type="button" class="btn btn-default" title="删除"><i class="fa fa-trash-o"></i> 删除</button> &nbsp;';
    toolsHtml += '<button type="button" class="btn btn-default" title="刷新"><i class="fa fa-refresh"></i> 刷新</button>';
    toolsHtml += '</div>';
    toolsHtml += '</div>';
    toolsHtml += '</div>';
    
	var oneTitle = '<div class="tab-pane" >';
	var oneTableBox = "";
	oneTableBox += '<table  class="table table-bordered table-hover dataTable">';
	oneTableBox += '<thead><tr>';
	oneTableBox += '<th>名称</th>';
	oneTableBox += '<th>菜单类型</th>';
	oneTableBox += '<th>菜单排序号</th>';
	oneTableBox += '<th>图标</th>';
	oneTableBox += '<th>地址</th>';
	oneTableBox += '<th class="text-center">操作</th>';
	oneTableBox += '</tr></thead>';
	var trDatas = "";
	trDatas = findMenuListData();
	oneTableBox += trDatas;
	oneTableBox += '</table>';
	oneTableBox += '</div>';
	$('#content').html(toolsHtml+oneTitle+oneTableBox);
	$('#content').listview("refresh");
	console.log(toolsHtml+oneTitle+oneTableBox);
}




function findMenuListData() {
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
	            url:ctx+'api/uc/menu/v1/findUserAllTree',
	            success: function(resData){
	            	if(resData.code == 0) {
	            		var datas = showMenuListData(resData.data);
	            		htmlData = datas;
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

function showMenuListData(menuData) {
	var htmllet = "";
	htmllet = treeViewListHtml(menuData);
	return htmllet;
}

function treeViewListHtml(treeViewData) {
	var htmlData ="";
	$.each(treeViewData, function(i,item){
		if(item.type != "WEB") {
			return true;
		}
		if(!item.leafFlag) {

			if(item.pid == 0) {
				htmlData += '<tr data-tt-id="'+item.code+'">';
			} else {
				var n = item.code.lastIndexOf("-");
				var pcode = item.code.substring(0,n);
				htmlData += '<tr data-tt-id="'+item.code+'" data-tt-parent-id="' + pcode + '">';
			}
			htmlData += '<td>'+item.name+'</td>';
			htmlData += '<td>'+item.type+'</td>';
			htmlData += '<td>'+item.sortNo+'</td>';
			htmlData += '<td>';
			htmlData += '<i class="fa ' + item.icon + '"></i>';
			htmlData += item.icon+'</td>';
			htmlData += '<td>'+item.addr+'</td>';
			htmlData += '<td class="text-center">';
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=addMenu("'+item.id+'")>增加</button> &nbsp;';
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=modifyMenu("'+item.id+'")>修改</button> &nbsp;';
			htmlData +=  '<button type="button" class="btn bg-olive btn-xs" onclick=delMenu("'+item.id+'")>删除</button>';
			htmlData += '</td>';
			htmlData += '</tr>';
			htmlData += '<tbody>';

			htmlData += treeViewListHtml(item.children); 

			htmlData += '</tbody>';


		} else {
			htmlData = treeViewMenuListHtml(treeViewData);
		}
	});
	return htmlData;
}

function treeViewMenuListHtml(treeViewMenuData) {
	var htmlMenu = "";
	$.each(treeViewMenuData, function(j,item){
		if(item.type != "WEB") {
			return true;
		}
		if(!item.leafFlag) {
			htmlMenu = treeViewListHtml(item.children);
		} else {
			var n = item.code.lastIndexOf("-");
			var pcode = item.code.substring(0,n);
			htmlMenu += '<tr data-tt-id="' + item.code + '" data-tt-parent-id="'+pcode+'">';
			htmlMenu += '<td>'+item.name+'</td>';
			htmlMenu += '<td>'+item.type+'</td>';
			htmlMenu += '<td>'+item.sortNo+'</td>';
			htmlMenu += '<td>';
			htmlMenu += '<i class="fa ' + item.icon + '"></i>';
			htmlMenu += item.icon+'</td>';
			htmlMenu += '<td>'+item.addr+'</td>';
			htmlMenu += '<td class="text-center">';
			htmlMenu += '<button type="button" class="btn bg-olive btn-xs" onclick=addMenu("'+item.id+'") data-toggle="modal" data-target="#menuEditWin">增加</button> &nbsp;';
			htmlMenu += '<button type="button" class="btn bg-olive btn-xs" onclick=modifyMenu("'+item.id+'") data-toggle="modal" data-target="#menuEditWin">修改</button> &nbsp;';
			htmlMenu +=  '<button type="button" class="btn bg-olive btn-xs" onclick=delMenu("'+item.id+'")>删除</button>';
			htmlMenu += '</td>';
			htmlMenu += '</tr>';
		}
		
	});
	return htmlMenu;
}