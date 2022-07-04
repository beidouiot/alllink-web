	var tenantList={};
	var customerList={};
	var rolesPageData = "";
	var menuIds ="";
	var userIds ="";
function showList() {
	var htmlSearch = "";
	htmlSearch += '<div class="box box-primary">';
	htmlSearch += '<div class="box-body">';
	htmlSearch += '<div class="table-box">';
	htmlSearch += '<div class="pull-left">';

	htmlSearch += '<div class="form-group form-inline">';
	htmlSearch += '<div class="input-group  row margin">';
	htmlSearch += '<input type="text" id="roleName" class="form-control" placeholder="角色名称"> &nbsp;';
	htmlSearch += '</div>';
	var storage = window.localStorage;
	var username = storage.getItem('username');

	if(username == "admin") {
		htmlSearch += '<div class="input-group row margin">';
		htmlSearch += '<select id="tenantId" class="form-control">';
		htmlSearch += '<option value="0">全部租户</option>';
		htmlSearch += searchTenantsData(tenantList);//后台租户数据
		htmlSearch += '</select> &nbsp;';
		htmlSearch += '</div>';
		htmlSearch += '<div class="input-group row margin">';
		htmlSearch += '<select id="customerId" class="form-control">';
		htmlSearch += '<option value="0">全部客户</option>';
		htmlSearch += searchCustomersData(customerList);//后台租户数据
		htmlSearch += '</select> &nbsp;';
		htmlSearch += '</div>';
	}

	// htmlSearch += '<button type="button" class="btn btn-block btn-success" title="查询" onclick="searchRoleForAuthority(1);"> 查询</button>';

	htmlSearch += '</div>';
	htmlSearch += '</div>';
	// htmlSearch += '<div class="row margin">';
	htmlSearch += '<div class="form-group">';
	htmlSearch += '<button type="button" class="btn btn-block btn-success" title="查询" onclick="showRoleForAuthority(1);"> 查询</button>';
	htmlSearch += '</div>';
	// htmlSearch += '</div>';

	var htmlTable = '<table id="dataList" class="table table-bordered table-striped table-hover dataTable">';
	htmlTable += '<thead>';
	htmlTable += '<tr>';
	htmlTable += '<th class="text-center">名称</th>';
	htmlTable += '<th class="text-center">编号</th>';
	htmlTable += '<th class="text-center">描述</th>';
	htmlTable += '<th class="text-center">所属租户</th>';
	htmlTable += '<th class="text-center">所属客户</th>';
	htmlTable += '<th class="text-center">操作</th>';
	htmlTable += '</tr>';
	htmlTable += '</thead>';
	htmlTable += '<tbody id="tbody">';

	htmlTable += '</tbody>';
	htmlTable += '</table>';
	htmlTable += '</div>';
	htmlTable += '</div>';
	var htmlfooter = "";
	 rolesPageData = searchRoleForAuthority(1);	
	htmlfooter += '<div class="box-footer">';
    htmlfooter += '<div class="pull-left">';
    htmlfooter += '<div class="form-group form-inline">';
    htmlfooter += '总共'+rolesPageData.totalPages+'页，共'+rolesPageData.totalElements+'条数据。 每页';
    htmlfooter += '<select class="form-control">';
    htmlfooter += '<option value="10">10</option>';
    htmlfooter += '<option value="20">20</option>';
    htmlfooter += '<option value="30">30</option>';
    htmlfooter += '<option value="50">50</option>';
    htmlfooter += '<option value="100">100</option>';
    htmlfooter += '<option value="500">500</option>';
    htmlfooter += '</select> 条';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
    htmlfooter += '<div class="box-tools pull-right">';
    htmlfooter += '<ul class="pagination">';
    htmlfooter += '<li>';
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showRoleForAuthority(1);" aria-label="Previous">首页</a>';
    htmlfooter += '</li>';
    var prevNum = 1;
    prevNum = rolesPageData.pageNumber <= 2 ? 1 : (rolesPageData.pageNumber - 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showRoleForAuthority('+prevNum+');">上一页</a></li>';
    var j = rolesPageData.pageNumber / 5.0;
    var k = j+1;
    if(rolesPageData.pageNumber % 5 == 0) {
    	j--;
    }
    var tm = rolesPageData.totalPages / 5.0;
    if(tm >= 1) {

    	for (var i = 5 * j + 1; i <= 5 * k; i++) {
    		htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showRoleForAuthority('+i+');">'+i+'</a></li>';
    	}
    } else {
    	for (var i = 1; i <= rolesPageData.totalPages; i++) {
    		htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showRoleForAuthority('+i+');">'+i+'</a></li>';
    	}
    }
    
    var nextNUm = rolesPageData.totalPages;
    nextNUm = rolesPageData.pageNumber >= rolesPageData.totalPages ? rolesPageData.totalPages : (rolesPageData.pageNumber + 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showRoleForAuthority('+nextNUm+');">下一页</a></li>';
    htmlfooter += '<li>';
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showRoleForAuthority('+rolesPageData.totalPages+');" aria-label="Next">尾页</a>';
    htmlfooter += '</li>';
    htmlfooter += '</ul>';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
	$('#content').html(htmlSearch+htmlTable+htmlfooter);
	showRoleForAuthorityReady(rolesPageData);
}

function searchTenantsData(tenantList) {
	var tenantDataList = "";
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
	            url:ctx+'api/uc/tenant/v1/findAll',
	            success: function(resData){
	            	if(resData.code == 0) {
	            		tenantList = resData.data;
	            		$.each(resData.data, function(i,item){
	            			tenantDataList += '<option value="'+item.strId+'">'+item.name+'</option>';
	            		});
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
	return tenantDataList;
}

function searchCustomersData(customerList) {
	var customerDataList = "";
	var storage = window.localStorage;
	var ctx = storage.getItem("ctx");
	var urlAddr = "";
	var tenantId = $('#tenantId option:selected').val();
	if(tenantId == 0) {
		urlAddr = 'api/uc/customer/v1/findAll';
		$.ajax({
            type: "GET",
            dataType: "json",
            async: false,
            beforeSend: function(XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
            },
            contentType: "application/json;charset=utf-8",
            url:ctx+'api/uc/customer/v1/findAll',
            success: function(resData){
            	if(resData.code == 0) {
            		customerList = resData.data;
            		$.each(resData.data, function(i,item){
            			customerDataList += '<option value="'+item.strId+'">'+item.name+'</option>';
            		});
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
	} else {
		var jsonData = {"pageSize":100,"tenantId":tenantId};
		$.ajax({
	            type: "POST",
	            dataType: "json",
	            async: false,
	            beforeSend: function(XMLHttpRequest) {
	                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
	            },
	            contentType: "application/json;charset=utf-8",
	            url:ctx+'api/uc/customer/v1/findPage',
	            data:JSON.stringify(jsonData),
	            success: function(resData){
	            	if(resData.code == 0) {
	            		$.each(resData.data.contents, function(i,item){
	            			customerDataList += '<option value="'+item.strId+'">'+item.name+'</option>';
	            		});
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
	}

	return customerDataList;
}

function showRoleForAuthority(pageNumber) {
	rolesPageData = searchRoleForAuthority(pageNumber);
	var htmlData = "";
	if(rolesPageData != "") {
		$.each(rolesPageData.contents, function(i,item){
			htmlData += '<tr>';
			htmlData += '<td>'+item.name+'</td>';
			htmlData += '<td>'+item.code+'</td>';
			htmlData += '<td>'+item.descr+'</td>';
			htmlData += '<td>'+item.strTenantId+'</td>';
			htmlData += '<td>'+item.strCustomerId+'</td>';
			htmlData += '<td class="text-center">'
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=htmlUserAuthorityModal("'+item.strId+'"); data-toggle="modal" data-target="#userAuthorityEditWin">配置用户</button>&nbsp;';
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=htmlMenuAuthorityModal("'+item.strId+'"); data-toggle="modal" data-target="#menuAuthorityEditWin">配置功能</button>';
			htmlData += '</td>';
			htmlData += '</tr>';
		});  
	}
	$('#tbody').html(htmlData);
}

function showRoleForAuthorityReady(rolesPageData) {
	// rolesPageData = searchRoleForAuthority(pageNumber);
	var htmlData = "";
	if(rolesPageData != "") {
		$.each(rolesPageData.contents, function(i,item){
			htmlData += '<tr>';
			htmlData += '<td>'+item.name+'</td>';
			htmlData += '<td>'+item.code+'</td>';
			htmlData += '<td>'+item.descr+'</td>';
			htmlData += '<td>'+item.strTenantId+'</td>';
			htmlData += '<td>'+item.strCustomerId+'</td>';
			htmlData += '<td class="text-center">'
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=htmlUserAuthorityModal("'+item.strId+'"); data-toggle="modal" data-target="#userAuthorityEditWin">配置用户</button>&nbsp;';
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=htmlMenuAuthorityModal("'+item.strId+'"); data-toggle="modal" data-target="#menuAuthorityEditWin">配置功能</button>';
			htmlData += '</td>';
			htmlData += '</tr>';
		});  
	}
	$('#tbody').html(htmlData);
}

function searchRoleForAuthority(pageNumber) {
	var roleName = $('#roleName').val();
	var pageSize = $('#pageSize option selected').val();
	var storage = window.localStorage;
	var username = storage.getItem('username');
	var storage = window.localStorage;
	var ctx = storage.getItem("ctx");
	var rData = "";
	if(username == "admin") {
		var tenantId = $('#tenantId option selected').val();
		if(tenantId == 0) {
			tenantId = null;
		}
		var customerId = $('#customerId option selected').val();
		if(customerId == 0) {
			customerId == null;
		}
		var searchData = {"name":roleName,"pageSize":pageSize,"pageNumber":pageNumber};
		$.ajax({
	            type: "POST",
	            dataType: "json",
	            async: false,
	            beforeSend: function(XMLHttpRequest) {
	                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
	            },
	            contentType: "application/json;charset=utf-8",
	            url:ctx+'api/uc/role/v1/findPage',
	            data:JSON.stringify(searchData),
	            success: function(resData){
	            	if(resData.code == 0) {
	            		rData = resData.data;
          				
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
	} else {
		var searchData = {"name":roleName,"pageSize":pageSize,"pageNumber":pageNumber,"tenantId":tenantId,"customerId":customerId};
		$.ajax({
	            type: "POST",
	            dataType: "json",
	            async: false,
	            beforeSend: function(XMLHttpRequest) {
	                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
	            },
	            contentType: "application/json;charset=utf-8",
	            url:ctx+'api/uc/role/v1/findPage',
	            data:JSON.stringify(searchData),
	            success: function(resData){
	            	if(resData.code == 0) {
	            		rData = resData.data;          	
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
	}
	return rData;
}

function htmlMenuAuthorityModal(roleId) {
	var menuEdit = "";
	menuEdit += '<div id="menuAuthorityEditWin" class="modal" role="dialog">';
	menuEdit += '<div class="modal-dialog modal-lg">';
	menuEdit += '<div class="modal-content">';
	menuEdit += '<div class="modal-header">';
	menuEdit += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
	menuEdit += '<h4 class="modal-title">配置功能</h4>';
	menuEdit += '</div>';
	menuEdit += '<div class="modal-body">';
	menuEdit += '<div class="box-body">';
	menuEdit += '<div class="table-box">';
	menuEdit += '<table id="dataList" class="table table-bordered table-striped table-hover dataTable">';
	menuEdit += '<thead>';
	menuEdit += '<tr>';
	menuEdit += '<th class="" style="padding-right:0px;">';
	menuEdit += '<input id="selall" type="checkbox" class="icheckbox_square-blue">';
	menuEdit += '</th>';
	menuEdit += '<th class="text-center">名称</th>';
	menuEdit += '<th class="text-center">类型</th>';
	menuEdit += '<th class="text-center">地址</th>';
	menuEdit += '</tr>';
	menuEdit += '</thead>';
	var trDatas = "";
	trDatas = findMenuListDataForAuth(roleId);
	menuEdit += trDatas;
	menuEdit += '</table>';
    menuEdit += '<div class="modal-footer">';
    menuEdit += '<button type="button" class="btn bg-default" data-dismiss="modal" >关闭</button>';
    menuEdit += '<button type="button" class="btn bg-default" data-dismiss="modal" onclick="saveConfFunc(\''+roleId+'\')">保存</button>';
    menuEdit += '</div>';
    menuEdit += '</div>';
    menuEdit += '</div>';
    menuEdit += '</div>';
    menuEdit += '</div>';
    menuEdit += '</div>';
    $('#content').append(menuEdit);
    console.log("trDatas="+trDatas);

    // 列表按钮 
    $("#dataList td input[type='checkbox']").iCheck({
        checkboxClass: 'icheckbox_square-blue',
        increaseArea: '20%'
    });
    // 全选操作 
    $("#selall").click(function() {
        var clicks = $(this).is(':checked');
        if (!clicks) {
            $("#dataList td input[type='checkbox']").iCheck("uncheck");
        } else {
            $("#dataList td input[type='checkbox']").iCheck("check");
        }
        $(this).data("clicks", !clicks);
    });
}

function findMenuListDataForAuth(roleId) {
	var htmlData = "";
	var storage = window.localStorage;
	var ctx = storage.getItem("ctx");
	var username = storage.getItem("username");
	var urlTmp = "";
	if(username == "admin") {
		urlTmp = "api/uc/menu/v1/findAllTree";
	} else {
		urlTmp = "api/uc/menu/v1/findUserAllTree";
	}
	$.ajax({
	            type: "GET",
	            dataType: "json",
	            async: false,
	            beforeSend: function(XMLHttpRequest) {
	                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
	            },
	            contentType: "application/json;charset=utf-8",
	            url:ctx+urlTmp,
	            success: function(resData){
	            	if(resData.code == 0) {
	            		searchMenuIdsByRoleId(roleId);
	            		 console.log("menuData = "+JSON.stringify(resData.data));
	            		var datas = showMenuListDataForAuth(resData.data);
	            		
	            		htmlData += datas;
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

function searchMenuIdsByRoleId(roleId) {
	var jsonData = {"id":roleId};
	var storage = window.localStorage;
	var ctx = storage.getItem("ctx");
	$.ajax({
            type: "POST",
            dataType: "json",
            async: false,
            beforeSend: function(XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
            },
            contentType: "application/json;charset=utf-8",
            url:ctx+'api/uc/role/v1/findMenuIds',
            data:JSON.stringify(jsonData),
            success: function(resData){
            	if(resData.code == 0) {
            		var datas = resData.data;
            		if(datas == null || datas == "") {
            			menuIds = "";
            		} else {
            			menuIds = datas.strMenuIds;
            		}
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
}

function showMenuListDataForAuth(menuData) {
	var htmllet = "";
	htmllet = treeViewListHtmlForAuth(menuData);
	return htmllet;
}

function treeViewListHtmlForAuth(treeViewData) {
	var htmlData ="";
	// console.log("treeViewData=="+JSON.stringify(treeViewData));
	$.each(treeViewData, function(i,item){
		// if(item.type != "WEB") {
		// 	return true;
		// }
		
		if(!item.leafFlag) {
			if(item.pid == 0) {
				// console.log("item 0 =="+JSON.stringify(treeViewData));
				htmlData += '<tr data-tt-id="'+item.code+'">';
			} else {
				// console.log("item other=="+JSON.stringify(treeViewData));
				var n = item.code.lastIndexOf("-");
				var pcode = item.code.substring(0,n);
				htmlData += '<tr data-tt-id="'+item.code+'" data-tt-parent-id="' + pcode + '">';
			}
			var addr = "";
			addr = item.addr == null || item.addr == "null" ? "" : item.addr;
			if(menuIds != "") {
				var hasMenuId = false;
				$.each(menuIds, function(j,idItem){
					if(idItem == item.id) {
						htmlData += '<td><input name="ids" id="ids" type="checkbox" checked="checked" value="'+item.id+'"></td>';
						hasMenuId = true;
						return false;
					}
				});
				if(!hasMenuId) {
					htmlData += '<td><input name="ids" id="ids" type="checkbox" value="'+item.id+'"></td>';
				}
			} else {
				htmlData += '<td><input name="ids" id="ids" type="checkbox" value="'+item.id+'"></td>';
			}

			htmlData += '<td>'+item.name+'</td>';
			htmlData += '<td>'+item.type+'</td>';
			htmlData += '<td>'+addr+'</td>';
			htmlData += '</tr>';
			htmlData += '<tbody>';
			htmlData += treeViewListHtmlForAuth(item.children); ;

			htmlData += '</tbody>';
			// console.log("htmlData="+htmlData);

		} else {
			if(item.hasButton) {
				var n = item.code.lastIndexOf("-");
				var pcode = item.code.substring(0,n);
				htmlData += '<tr data-tt-id="'+item.code+'" data-tt-parent-id="' + pcode + '">';
				var addr = "";
				addr = item.addr == null || item.addr == "null" ? "" : item.addr;
				if(menuIds != "") {
					var hasMenuId = false;
					$.each(menuIds, function(j,idItem){
						if(idItem == item.id) {
							htmlData += '<td><input name="ids" id="ids" type="checkbox" checked="checked" value="'+item.id+'"></td>';
							hasMenuId = true;
							return false;
						}
					});
					if(!hasMenuId) {
						htmlData += '<td><input name="ids" id="ids" type="checkbox" value="'+item.id+'"></td>';
					}
				} else {
					htmlData += '<td><input name="ids" id="ids" type="checkbox" value="'+item.id+'"></td>';
				}
				htmlData += '<td>'+item.name+'</td>';
				htmlData += '<td>'+item.type+'</td>';
				htmlData += '<td>'+addr+'</td>';
				htmlData += '</tr>';
				htmlData += '<tbody>';
				htmlData += treeViewMenuListHtmlForAuth(item.children); 
			} else {
				htmlData += treeViewMenuListHtmlForAuth(treeViewData);;
				// console.log("htmlData====="+htmlData);
			}
		}
	});
	return htmlData;
}

function treeViewMenuListHtmlForAuth(treeViewMenuData) {
	var htmlMenu = "";
	$.each(treeViewMenuData, function(j,item){
		if(!item.leafFlag) {
			htmlMenu += treeViewListHtmlForAuth(item.children);
		} else {
			var n = item.code.lastIndexOf("-");
			var pcode = item.code.substring(0,n);
			htmlMenu += '<tr data-tt-id="' + item.code + '" data-tt-parent-id="'+pcode+'">';
			if(menuIds != "") {
				var hasMenuId = false;
				$.each(menuIds, function(j,idItem){					 
					if(idItem == item.id) {
						htmlMenu += '<td><input name="ids" id="ids" type="checkbox" checked="checked" value="'+item.id+'"></td>';
						hasMenuId = true;
						return false;
					}
				});	
				if(!hasMenuId) {
					htmlMenu += '<td><input name="ids" id="ids" type="checkbox" value="'+item.id+'"></td>';
				}
			} else {
				htmlMenu += '<td><input name="ids" id="ids" type="checkbox" value="'+item.id+'"></td>';
			}
			htmlMenu += '<td>'+item.name+'</td>';
			htmlMenu += '<td>'+item.type+'</td>';
			htmlMenu += '<td>'+item.addr+'</td>';
			htmlMenu += '</tr>';
		}
		
	});
	// console.log("htmlMenu==="+htmlMenu);
	return htmlMenu;
}

function saveConfFunc(roleId) {
	var chkValue=[];
	$('input[name="ids"]:checked').each(function(){
		chkValue.push($(this).val());
	});
	var jsonData = {"roleId":roleId,"menuIds":chkValue};
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
            url:ctx+'api/uc/role/v1/configureMenu',
            data:JSON.stringify(jsonData),
            success: function(resData){
            	if(resData.code == 0) {
            		console.log(JSON.stringify(resData));
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
}

function htmlUserAuthorityModal(roleId) {
	var menuEdit = "";
	menuEdit += '<div id="userAuthorityEditWin" class="modal" role="dialog">';
	menuEdit += '<div class="modal-dialog modal-lg">';
	menuEdit += '<div class="modal-content">';
	menuEdit += '<div class="modal-header">';
	menuEdit += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
	menuEdit += '<h4 class="modal-title">配置用户</h4>';
	menuEdit += '</div>';
	menuEdit += '<div class="modal-body">';
	menuEdit += '<div class="box-body">';
	menuEdit += '<div class="table-box">';
	menuEdit += '<table id="dataListUser" class="table table-bordered table-striped table-hover dataTable">';
	menuEdit += '<thead>';
	menuEdit += '<tr>';
	menuEdit += '<th class="" style="padding-right:0px;">';
	menuEdit += '<input id="selallUser" type="checkbox" class="icheckbox_square-blue">';
	menuEdit += '</th>';
	menuEdit += '<th class="text-center">用户名</th>';
	menuEdit += '<th class="text-center">手机号</th>';
	menuEdit += '<th class="text-center">用户姓名</th>';
	menuEdit += '<th class="text-center">用户昵称</th>';
	menuEdit += '<th class="text-center">状态</th>';
	menuEdit += '<th class="text-center">所属租户</th>';
	menuEdit += '<th class="text-center">所属客户</th>';
	menuEdit += '</tr>';
	menuEdit += '</thead>';
	var trDatas = "";
	trDatas = findUserListDataForAuth(roleId);//findMenuListDataForAuth(roleId);
	menuEdit += trDatas;
	menuEdit += '</table>';
    menuEdit += '<div class="modal-footer">';
    menuEdit += '<button type="button" class="btn bg-default" data-dismiss="modal" >关闭</button>';
    menuEdit += '<button type="button" class="btn bg-default" data-dismiss="modal" onclick="saveConfUser(\''+roleId+'\')">保存</button>';
    menuEdit += '</div>';
    menuEdit += '</div>';
    menuEdit += '</div>';
    menuEdit += '</div>';
    menuEdit += '</div>';
    menuEdit += '</div>';
    $('#content').append(menuEdit);
    console.log("trDatas="+trDatas);

    // 列表按钮 
    $("#dataListUser td input[type='checkbox']").iCheck({
        checkboxClass: 'icheckbox_square-blue',
        increaseArea: '20%'
    });
    // 全选操作 
    $("#selallUser").click(function() {
        var clicks = $(this).is(':checked');
        if (!clicks) {
            $("#dataListUser td input[type='checkbox']").iCheck("uncheck");
        } else {
            $("#dataListUser td input[type='checkbox']").iCheck("check");
        }
        $(this).data("clicks", !clicks);
    });
}

function findUserListDataForAuth(roleId) {
	var htmlData = "";
	var storage = window.localStorage;
	var ctx = storage.getItem("ctx");
	var username = storage.getItem("username");
	var urlTmp = "";
	if(username == "admin") {
		urlTmp = "api/uc/user/v1/findAll";
	} else {
		urlTmp = "api/uc/user/v1/findAll";
	}
	$.ajax({
	            type: "GET",
	            dataType: "json",
	            async: false,
	            beforeSend: function(XMLHttpRequest) {
	                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
	            },
	            contentType: "application/json;charset=utf-8",
	            url:ctx+urlTmp,
	            success: function(resData){
	            	if(resData.code == 0) {
	            		searchUserIdsByRoleId(roleId);
	            		 console.log("userData = "+JSON.stringify(resData.data));
	            		var datas = showUserListDataForAuth(resData.data);
	            		
	            		htmlData += datas;
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

function searchUserIdsByRoleId(roleId) {
	var jsonData = {"id":roleId};
	var storage = window.localStorage;
	var ctx = storage.getItem("ctx");
	$.ajax({
            type: "POST",
            dataType: "json",
            async: false,
            beforeSend: function(XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
            },
            contentType: "application/json;charset=utf-8",
            url:ctx+'api/uc/role/v1/findUserIds',
            data:JSON.stringify(jsonData),
            success: function(resData){
            	if(resData.code == 0) {
            		var datas = resData.data;
            		if(datas == null || datas == "") {
            			userIds = "";
            		} else {
            			userIds = datas.strUserIds;
            		}
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
}

function showUserListDataForAuth(userData) {
	var htmlData ="";
	$.each(userData, function(i,item){
		htmlData += '<tr>';
		if(userIds != "") {
			var hasUserId = false;
			$.each(userIds, function(j,idItem){
				if(idItem == item.strId) {
					htmlData += '<td><input name="uids" id="uids" type="checkbox" checked="checked" value="'+item.strId+'"></td>';
					hasUserId = true;
					return false;
				}
			});
			if(!hasUserId) {
				htmlData += '<td><input name="uids" id="uids" type="checkbox" value="'+item.strId+'"></td>';
			}
		} else {
			htmlData += '<td><input name="uids" id="uids" type="checkbox" value="'+item.strId+'"></td>';
		}
		// htmlData += '<td><input name="uids" id="uids" type="checkbox" checked="checked" value="'+item.strId+'"></td>';
		htmlData += '<td>'+item.username+'</td>';
		htmlData += '<td>'+item.mobile+'</td>';
		htmlData += '<td>'+item.name+'</td>';
		htmlData += '<td>'+item.nickname+'</td>';
		htmlData += '<td>'+item.strStatus+'</td>';
		htmlData += '<td>'+item.tenantId+'</td>';
		htmlData += '<td>'+item.customerId+'</td>';
		htmlData += '</tr>';
	});

	return htmlData;
}

function saveConfUser(roleId) {
	var chkValue=[];
	$('input[name="uids"]:checked').each(function(){
		chkValue.push($(this).val());
	});
	var jsonData = {"roleId":roleId,"userIds":chkValue};
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
            url:ctx+'api/uc/role/v1/configureUser',
            data:JSON.stringify(jsonData),
            success: function(resData){
            	if(resData.code == 0) {
            		console.log(JSON.stringify(resData));
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
}