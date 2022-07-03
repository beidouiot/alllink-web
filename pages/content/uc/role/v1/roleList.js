	var tenantList={};
	var customerList={};
	var rolesPageData = "";
function showList() {
	var toolsHtml = '<div class="pull-left">';
    toolsHtml += '<div class="form-group form-inline">';
    toolsHtml += '<div class="btn-group">';
    toolsHtml += '<button type="button" class="btn btn-default" title="增加" onclick=addRole(""); data-toggle="modal" data-target="#roleAddWin"><i class="fa fa-file-o"></i> 新建</button> &nbsp;';
    toolsHtml += '<button type="button" class="btn btn-default" onclick="showList()" title="刷新"><i class="fa fa-refresh"></i> 刷新</button>';
    toolsHtml += '<input type="hidden" class="btn bg-olive btn-xs" id="roleId" value="" >';
    toolsHtml += '<input type="hidden" class="btn bg-olive btn-xs" id="doingType" value="" >';
    toolsHtml += '</div>';
    toolsHtml += '</div>';
    toolsHtml += '</div>';
	var htmlSearch = "";
	htmlSearch += '<div class="box box-primary">';
	htmlSearch += '<div class="box-body">';


	htmlSearch += '<div class="table-box">';

	htmlSearch += '<div class="pull-left">';
	htmlSearch += '<div class="form-group form-inline">';
	htmlSearch += '<div class="input-group  row margin">';
	htmlSearch += '<input type="text" id="rname" class="form-control" placeholder="用户名"> &nbsp;';
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
	htmlSearch += '</div>';
	htmlSearch += '</div>';

	htmlSearch += '<div class="form-group">';
	htmlSearch += '<button type="button" class="btn btn-block btn-success" title="查询" onclick="showRolesList();"> 查询</button>';
	htmlSearch += '</div>';
	htmlSearch += toolsHtml;
	var htmlTable = '<table id="dataList" class="table table-bordered table-striped table-hover dataTable">';
	htmlTable += '<thead>';
	htmlTable += '<tr>';
	htmlTable += '<th class="text-center">角色名</th>';
	htmlTable += '<th class="text-center">角色编号</th>';
	htmlTable += '<th class="text-center">角色描述</th>';
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
	 rolesPageData = searchRoleList(1);	
	htmlfooter += '<div class="box-footer" id="footer-box">';
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
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showrolesList(1);" aria-label="Previous">首页</a>';
    htmlfooter += '</li>';
    var prevNum = 1;
    prevNum = rolesPageData.pageNumber <= 2 ? 1 : (rolesPageData.pageNumber - 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showrolesList('+prevNum+');">上一页</a></li>';
    var j = rolesPageData.pageNumber / 5.0;
    var k = j+1;
    if(rolesPageData.pageNumber % 5 == 0) {
    	j--;
    }
    var tm = rolesPageData.totalPages / 5.0;
    if(tm >= 1) {

    	for (var i = 5 * j + 1; i <= 5 * k; i++) {
    		htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showrolesList('+i+');">'+i+'</a></li>';
    	}
    } else {
    	for (var i = 1; i <= rolesPageData.totalPages; i++) {
    		htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showrolesList('+i+');">'+i+'</a></li>';
    	}
    }
    
    var nextNUm = rolesPageData.totalPages;
    nextNUm = rolesPageData.pageNumber >= rolesPageData.totalPages ? rolesPageData.totalPages : (rolesPageData.pageNumber + 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showrolesList('+nextNUm+');">下一页</a></li>';
    htmlfooter += '<li>';
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showrolesList('+rolesPageData.totalPages+');" aria-label="Next">尾页</a>';
    htmlfooter += '</li>';
    htmlfooter += '</ul>';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
	$('#content').html(htmlSearch+htmlTable+htmlfooter);
	showRolesReady(rolesPageData);
	htmlRoleModal();
}

function footerBox(rolesPageData) {
	var htmlfooter = "";
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
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showrolesList(1);" aria-label="Previous">首页</a>';
    htmlfooter += '</li>';
    var prevNum = 1;
    prevNum = rolesPageData.pageNumber <= 2 ? 1 : (rolesPageData.pageNumber - 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showrolesList('+prevNum+');">上一页</a></li>';
    var j = rolesPageData.pageNumber / 5.0;
    var k = j+1;
    if(rolesPageData.pageNumber % 5 == 0) {
    	j--;
    }
    var tm = rolesPageData.totalPages / 5.0;
    if(tm >= 1) {

    	for (var i = 5 * j + 1; i <= 5 * k; i++) {
    		htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showrolesList('+i+');">'+i+'</a></li>';
    	}
    } else {
    	for (var i = 1; i <= rolesPageData.totalPages; i++) {
    		htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showrolesList('+i+');">'+i+'</a></li>';
    	}
    }
    
    var nextNUm = rolesPageData.totalPages;
    nextNUm = rolesPageData.pageNumber >= rolesPageData.totalPages ? rolesPageData.totalPages : (rolesPageData.pageNumber + 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showrolesList('+nextNUm+');">下一页</a></li>';
    htmlfooter += '<li>';
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showrolesList('+rolesPageData.totalPages+');" aria-label="Next">尾页</a>';
    htmlfooter += '</li>';
    htmlfooter += '</ul>';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
    return htmlfooter; 
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

function searchRoleList(pageNumber) {
	var txtrname = $('#rname').val();
	var pageSize = $('#pageSize option selected').val();
	var storage = window.localStorage;
	var username = storage.getItem('username');
	var storage = window.localStorage;
	var ctx = storage.getItem("ctx");
	var rData = "";
	var tenantId = $('#tenantId option selected').val();
	if(tenantId == 0) {
		tenantId = null;
	}
	var customerId = $('#customerId option selected').val();
	if(customerId == 0) {
		customerId == null;
	}
	if(username == "admin") {
		var searchData = {"name":txtrname,"tenantId":tenantId,"customerId":customerId,"pageSize":pageSize,"pageNumber":pageNumber};
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
		var searchData = {"name":txtrname,"tenantId":tenantId,"customerId":customerId,"pageSize":pageSize,"pageNumber":pageNumber};
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

function showRolesList(pageNumber) {
	rolesPageData = searchRoleList(pageNumber);
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
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=editRole("'+item.strId+'"); data-toggle="modal" data-target="#roleAddWin">修改</button>&nbsp;';
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=delRole("'+item.strId+'"); >删除</button>';
			htmlData += '</td>';
			htmlData += '</tr>';
		});  
	}
	$('#tbody').html(htmlData);
	var footBox = footerBox(rolesPageData);
	$('#footer-box').html(footBox);
}

function showRolesReady(rolesPageData) {
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
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=editRole("'+item.strId+'"); data-toggle="modal" data-target="#roleAddWin">修改</button>&nbsp;';
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=delRole("'+item.strId+'"); >删除</button>';
			htmlData += '</td>';
			htmlData += '</tr>';
		});  
	}
	$('#tbody').html(htmlData);
}

function htmlRoleModal() {
	var roleEdit = "";
	roleEdit += '<div id="roleAddWin" class="modal" role="dialog">';
	roleEdit += '<div class="modal-dialog modal-lg">';
	roleEdit += '<div class="modal-content">';
	roleEdit += '<div class="modal-header">';
	roleEdit += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
	roleEdit += '<h4 class="modal-title" id="ttl">增加角色</h4>';
	roleEdit += '</div>';
	roleEdit += '<div class="modal-body">';
	roleEdit += '<div class="box-body">';
	roleEdit += '<div class="form-horizontal">';
	roleEdit += '<div class="form-group">';
	roleEdit += '<div class="col-md-2 title">角色名</div>';
	roleEdit += '<div class="col-md-4 data">';
    roleEdit += '<input type="text" id="arname" class="form-control" placeholder="请输入角色名（必填）" value="">';
    roleEdit += '</div>';
    roleEdit += '</div>';
	roleEdit += '<div class="form-group">';
	roleEdit += '<div class="col-md-2 title">描述</div>';
	roleEdit += '<div class="col-md-4 data">';
    roleEdit += '<textarea rows="3" id="adescr" class="form-control" placeholder="请输入描述" value=""></textarea>';
    roleEdit += '</div>';
    roleEdit += '</div>';
	
    roleEdit += '</div>';
    roleEdit += '</div>';
    roleEdit += '</div>';
    roleEdit += '<div class="modal-footer">';
    roleEdit += '<button type="button" class="btn bg-default" data-dismiss="modal" >关闭</button>';
    roleEdit += '<button type="button" class="btn bg-default" data-dismiss="modal" onclick="saveRole()">保存</button>';
    roleEdit += '</div>';
    roleEdit += '</div>';
    roleEdit += '</div>';
    roleEdit += '</div>';
    $('#content').append(roleEdit);
}

function addRole(roleId) {
	$('#ttl').html("增加角色");
	$('#roleId').val(roleId);
	$('#doingType').val("add");
}

function editRole(roleId) {
	var roleData = searchRole(roleId);
	$('#ttl').html("修改角色");
	$('#arname').val(roleData.name);
	$('#roleId').val(roleData.strId);
	$('#adescr').val(roleData.descr);
	$('#doingType').val("modify");
}

function searchRole(roleId) {
	var roleData = "";
	var storage = window.localStorage;
	var ctx = storage.getItem("ctx");
	var dataJson = {"id": roleId};
	$.ajax({
	            type: "POST",
	            dataType: "json",
	            async: false,
	            beforeSend: function(XMLHttpRequest) {
	                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
	            },
	            contentType: "application/json;charset=utf-8",
	            url:ctx+'api/uc/role/v1/findOne',
	            data:JSON.stringify(dataJson),
	            success: function(resData){
	            	if(resData.code == 0) {
	            		console.log("resData=="+JSON.stringify(resData));
	            		roleData = resData.data;
	            		console.log("roleData==55=="+JSON.stringify(roleData));
						// alert(resData.code+resData.msg);
	            	} else {
	            		alert(resData.code+resData.msg);

	            	}
	                
	            },
	            error: function(XMLHttpRequest,status, error) {
	                console.log("xhr======"+JSON.stringify(XMLHttpRequest));
	            }
	        });
	return roleData;
}

function saveRole() {
	var roleId = $('#roleId').val();
	var arname = $('#arname').val();
	var adescr = $('#adescr').val();
	var doingType = $('#doingType').val();
	roleId = roleId == "" ? null : roleId;

	if(arname == null || arname == "") {
		alert("角色名不能为空！");
		return;
	}

	var tmpUrl = doingType == "add" ? "api/uc/role/v1/add" : "api/uc/role/v1/update";

	var dataJson = {"id": roleId,"name": arname,"descr":adescr};
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

function delRole(id) {
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
        url:ctx+'api/uc/role/v1/logicalDelete',
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