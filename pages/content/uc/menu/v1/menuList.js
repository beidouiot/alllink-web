function showList(){
	var toolsHtml = '<div class="pull-left">';
    toolsHtml += '<div class="form-group form-inline">';
    toolsHtml += '<div class="btn-group">';
    toolsHtml += '<button type="button" class="btn btn-default" title="新建" onclick=addMenu(0) data-toggle="modal" data-target="#menuEditWin"><i class="fa fa-file-o"></i> 新建</button> &nbsp;';
    toolsHtml += '<button type="button" class="btn btn-default" onclick="showList()" title="刷新"><i class="fa fa-refresh"></i> 刷新</button>';
    toolsHtml += '<input type="hidden" class="btn bg-olive btn-xs" id="menuId" value="" >';
    toolsHtml += '<input type="hidden" class="btn bg-olive btn-xs" id="menuPid" value="" >';
    toolsHtml += '<input type="hidden" class="btn bg-olive btn-xs" id="doingType" value="" >';
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
	htmlMenuModal();
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
		if(item.type != "MENU") {
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
			var addr = "";
			addr = item.addr == null || item.addr == "null" ? "" : item.addr;
			htmlData += '<td>'+item.name+'</td>';
			htmlData += '<td>'+item.type+'</td>';
			htmlData += '<td>'+item.sortNo+'</td>';
			htmlData += '<td>';
			htmlData += '<i class="fa ' + item.icon + '"></i>';
			htmlData += item.icon+'</td>';
			htmlData += '<td>'+addr+'</td>';
			htmlData += '<td class="text-center">';
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=addMenu("'+item.id+'") data-toggle="modal" data-target="#menuEditWin">增加</button> &nbsp;';
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=editMenu(\''+JSON.stringify(item)+'\') data-toggle="modal" data-target="#menuEditWin">修改</button> &nbsp;';
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=delMenu("'+item.id+'")>删除</button>';
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
		if(item.type != "MENU") {
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
			htmlMenu += '<button type="button" class="btn bg-olive btn-xs" onclick=editMenu(\''+ JSON.stringify(item) +'\') data-toggle="modal" data-target="#menuEditWin">修改</button> &nbsp;';
			htmlMenu += '<button type="button" class="btn bg-olive btn-xs" onclick=delMenu("'+item.id+'")>删除</button>';
			htmlMenu += '</td>';
			htmlMenu += '</tr>';
		}
		
	});
	return htmlMenu;
}

function htmlMenuModal() {
	var menuEdit = "";
	menuEdit += '<div id="menuEditWin" class="modal" role="dialog">';
	menuEdit += '<div class="modal-dialog modal-lg">';
	menuEdit += '<div class="modal-content">';
	menuEdit += '<div class="modal-header">';
	menuEdit += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
	menuEdit += '<h4 class="modal-title">添加菜单</h4>';
	menuEdit += '</div>';
	menuEdit += '<div class="modal-body">';
	menuEdit += '<div class="box-body">';
	menuEdit += '<div class="form-horizontal">';
	menuEdit += '<div class="form-group">';
	menuEdit += '<div class="col-md-2 title">名称</div>';
	menuEdit += '<div class="col-md-4 data">';
    menuEdit += '<input type="text" id="menuName" class="form-control" placeholder="请输入名称（必填）" value="">';
    menuEdit += '</div>';
    menuEdit += '</div>';
	menuEdit += '<div class="form-group">';
	menuEdit += '<div class="col-md-2 title">地址</div>';
	menuEdit += '<div class="col-md-4 data">';
    menuEdit += '<input type="text" id="menuAddr" class="form-control" placeholder="请输入URL地址" value="">';
    menuEdit += '</div>';
    menuEdit += '</div>';
	menuEdit += '<div class="form-group">';
	menuEdit += '<div class="col-md-2 title">图标</div>';
	menuEdit += '<div class="col-md-4 data">';
    menuEdit += '<input type="text" id="menuIcon" class="form-control" placeholder="请输入图标信息（必填）" value="">';
    menuEdit += '</div>';
    menuEdit += '</div>';
	menuEdit += '<div class="form-group">';
	menuEdit += '<div class="col-md-2 title">排序号</div>';
	menuEdit += '<div class="col-md-4 data">';
    menuEdit += '<input type="text" id="menuSortNo" class="form-control" placeholder="请输排序号（必填）" value="">';
    menuEdit += '</div>';
    menuEdit += '</div>';
	menuEdit += '<div class="form-group">';
	menuEdit += '<div class="col-md-2 title">类型</div>';
	menuEdit += '<div class="col-md-4 data">';
    menuEdit += ' <select id="menuType" class="form-control">';
    menuEdit += '<option value="MENU">WEB左侧菜单</option>';
    menuEdit += '<option value="TAB">TAB选项卡</option>';
    menuEdit += '<option value="BUTTON">WEB页面按钮</option>';
    menuEdit += '<option value="APP">APP菜单</option>';
    menuEdit += '</select>';
    menuEdit += '</div>';
    menuEdit += '</div>';
    menuEdit += '</div>';
    menuEdit += '</div>';
    menuEdit += '</div>';
    menuEdit += '<div class="modal-footer">';
    menuEdit += '<button type="button" class="btn bg-default" data-dismiss="modal" >关闭</button>';
    menuEdit += '<button type="button" class="btn bg-default" data-dismiss="modal" onclick="saveMenu()">保存</button>';
    menuEdit += '</div>';
    menuEdit += '</div>';
    menuEdit += '</div>';
    menuEdit += '</div>';
    $('#content').append(menuEdit);
}

function addMenu(menuId) {
	$('#menuPid').val(menuId);
	$('#doingType').val("add");
}


function editMenu(menu) {
	// alert(menu);
	menu = $.parseJSON(menu);

	$('#menuId').val(menu.id);
	$('#doingType').val("modify");
	$('#menuName').val(menu.name);
	$('#menuAddr').val(menu.addr);
	$('#menuIcon').val(menu.icon);
	$('#menuSortNo').val(menu.sortNo);
	$('#menuType').val(menu.type);
}

function saveMenu() {
	var menuName = $('#menuName').val();
	var menuAddr = $('#menuAddr').val();
	var menuIcon = $('#menuIcon').val();
	var menuSortNo = $('#menuSortNo').val();
	var menuType = $('#menuType option:selected').val();
	var menuId = $('#menuId').val();
	var menuPid = $('#menuPid').val();
	var doingType = $('#doingType').val();
	var tmpUrl = doingType == "add" ? "api/uc/menu/v1/add" : "api/uc/menu/v1/update";

	menuPid = menuPid == "" || menuPid == null ? 0 : menuPid;

	var dataJson = {"id": menuId,"name": menuName,"addr":menuAddr,"icon":menuIcon,"sortNo":menuSortNo,"type":menuType,"pid":menuPid};
	var storage = window.localStorage;
	var ctx = storage.getItem("ctx");
	$.ajax({
	            type: "POST",
	            dataType: "json",
	            // async: false,
	            beforeSend: function(XMLHttpRequest) {
	                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
	            },
	            contentType: "application/json;charset=utf-8",
	            url:ctx+tmpUrl,
	            data:JSON.stringify(dataJson),
	            success: function(resData){
	            	if(resData.code == 0) {
						// alert(resData.code+resData.msg);
	            	} else {
	            		alert(resData.code+resData.msg);

	            	}
	                
	            },
	            error: function(XMLHttpRequest,status, error) {
	                console.log("xhr======"+JSON.stringify(XMLHttpRequest));
	            }
	        });
}

function delMenu(id) {
	var storage = window.localStorage;
	var ctx = storage.getItem("ctx");
	var dataJson = {"id": id};
	$.ajax({
        type: "DELETE",
        dataType: "json",
        // async: false,
        beforeSend: function(XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
        },
        contentType: "application/json;charset=utf-8",
        url:ctx+'api/uc/menu/v1/logicalDelete',
        data:JSON.stringify(dataJson),
        success: function(resData){
        	if(resData.code == 0) {
				alert(resData.code+resData.msg);
        	} else {
        		alert(resData.code+resData.msg);

        	}
            
        },
        error: function(XMLHttpRequest,status, error) {
            console.log("xhr======"+JSON.stringify(XMLHttpRequest));
        }
    });
}
