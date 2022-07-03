var historyUrlAddr = "";
$(function(){
	var sidebarMenuHtml = "";
	sidebarMenuHtml += '<li class="header">菜单</li>';
	sidebarMenuHtml += '<li id="admin-index">';
	sidebarMenuHtml += '<a href="index.html">';
	sidebarMenuHtml += '<i class="fa fa-dashboard"></i>';
	sidebarMenuHtml += '<span id="admin-index-menu-name">首页</span>';
	sidebarMenuHtml += '</a></li>';
	sidebarMenuHtml += findMenuData();
	$('#sidebar-menu').append(sidebarMenuHtml);

});


function findMenuData() {
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
	            		var datas = showMenuData(resData.data);
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

function showMenuData(menuData) {
	var htmllet = "";
	htmllet = treeViewHtml(menuData);
	return htmllet;
}

function treeViewHtml(treeViewData) {
	var htmlData ="";
	$.each(treeViewData, function(i,item){
		if(item.type != "MENU") {
			return true;
		}
		if(!item.leafFlag) {
			htmlData += '<li class="treeview">';
			htmlData += '<a href="#">';
			htmlData += '<i class="fa ' + item.icon + '"></i>';
			htmlData += '<span>' + item.name + '</span>';
			htmlData += '<span class="pull-right-container">';
			htmlData += '<i class="fa fa-angle-left pull-right"></i>';
			htmlData += '</span></a>';
			htmlData += '<ul class="treeview-menu">';
			htmlData += treeViewHtml(item.children);
			htmlData += '</ul></li>';


		} else {
			htmlData = treeViewMenuHtml(treeViewData);
		}
	});
	return htmlData;
}

function treeViewMenuHtml(treeViewMenuData) {
	var htmlMenu = "";
	$.each(treeViewMenuData, function(j,item){
		if(item.type != "MENU") {
			return true;
		}
		if(!item.leafFlag) {
			htmlMenu = treeViewHtml(item.children);
		} else {
			htmlMenu += '<li id="'+item.code+'">';
			var menuUrl = item.addr;
			menuUrl = menuUrl == null || menuUrl == "" ? "#" : menuUrl;
			htmlMenu += '<a href=javascript:void(menuClick("'+ menuUrl +'"))>';
			htmlMenu += '<i class="fa ' + item.icon + '"></i>';
			htmlMenu += '<span>'+item.name+'</span>';
			htmlMenu += '</a></li>';
		}
		
	});
	return htmlMenu;
}

function menuClick(menuUrl) {
	var urlAddr = "./content/"+menuUrl+".js";
	if(historyUrlAddr != "") {
		$('script[src="'+urlAddr+'"]').remove();
	}
	historyUrlAddr = urlAddr;
	$.getScript(urlAddr, function() {
	  showList();
	});
}