var tenantsPageData = "";
function showList() {
	var toolsHtml = '<div class="pull-left">';
    toolsHtml += '<div class="form-group form-inline">';
    toolsHtml += '<div class="btn-group">';
    toolsHtml += '<button type="button" class="btn btn-default" title="增加" onclick=addTenant(""); data-toggle="modal" data-target="#tenantAddWin"><i class="fa fa-file-o"></i> 新建</button> &nbsp;';
    toolsHtml += '<button type="button" class="btn btn-default" onclick="showList()" title="刷新"><i class="fa fa-refresh"></i> 刷新</button>';
    toolsHtml += '<input type="hidden" class="btn bg-olive btn-xs" id="tenantId" value="" >';
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
	htmlSearch += '<input type="text" id="tname" class="form-control" placeholder="租户名"> &nbsp;';
	htmlSearch += '</div>';
	htmlSearch += '<div class="input-group  row margin">';
	htmlSearch += '<input type="text" id="linkman" class="form-control" placeholder="联系人"> &nbsp;';
	htmlSearch += '</div>';
	htmlSearch += '<div class="input-group  row margin">';
	htmlSearch += '<input type="text" id="email" class="form-control" placeholder="邮箱"> &nbsp;';
	htmlSearch += '</div>';
	htmlSearch += '<div class="input-group  row margin">';
	htmlSearch += '<input type="text" id="phone" class="form-control" placeholder="电话"> &nbsp;';
	htmlSearch += '</div>';
	htmlSearch += '<div class="input-group row margin">';
	htmlSearch += '<select id="status" class="form-control">';
	htmlSearch += '<option value="0">请选择状态</option>';
	htmlSearch += '<option value="0">启用</option>';
	htmlSearch += '<option value="1">禁用</option>';
	htmlSearch += '</select> &nbsp;';
	htmlSearch += '</div>';
	htmlSearch += '</div>';
	htmlSearch += '</div>';

	htmlSearch += '<div class="form-group">';
	htmlSearch += '<button type="button" class="btn btn-block btn-success" title="查询" onclick="showTenantsList();"> 查询</button>';
	htmlSearch += '</div>';
	htmlSearch += toolsHtml;
	var htmlTable = '<table id="dataList" class="table table-bordered table-striped table-hover dataTable">';
	htmlTable += '<thead>';
	htmlTable += '<tr>';
	htmlTable += '<th class="text-center">租户名</th>';
	htmlTable += '<th class="text-center">联系人</th>';
	htmlTable += '<th class="text-center">邮箱</th>';
	htmlTable += '<th class="text-center">电话</th>';
	htmlTable += '<th class="text-center">状态</th>';
	htmlTable += '<th class="text-center">操作</th>';
	htmlTable += '</tr>';
	htmlTable += '</thead>';
	htmlTable += '<tbody id="tbody">';

	htmlTable += '</tbody>';
	htmlTable += '</table>';
	htmlTable += '</div>';
	htmlTable += '</div>';

	var htmlfooter = "";
	 tenantsPageData = searchTenantList(1);	
	htmlfooter += '<div class="box-footer" id="footer-box">';
    htmlfooter += '<div class="pull-left">';
    htmlfooter += '<div class="form-group form-inline">';
    htmlfooter += '总共'+tenantsPageData.totalPages+'页，共'+tenantsPageData.totalElements+'条数据。 每页';
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
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showTenantsList(1);" aria-label="Previous">首页</a>';
    htmlfooter += '</li>';
    var prevNum = 1;
    prevNum = tenantsPageData.pageNumber <= 2 ? 1 : (tenantsPageData.pageNumber - 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showTenantsList('+prevNum+');">上一页</a></li>';
    var j = tenantsPageData.pageNumber / 5.0;
    var k = j+1;
    if(tenantsPageData.pageNumber % 5 == 0) {
    	j--;
    }
    var tm = tenantsPageData.totalPages / 5.0;
    if(tm >= 1) {

    	for (var i = 5 * j + 1; i <= 5 * k; i++) {
    		htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showTenantsList('+i+');">'+i+'</a></li>';
    	}
    } else {
    	for (var i = 1; i <= tenantsPageData.totalPages; i++) {
    		htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showTenantsList('+i+');">'+i+'</a></li>';
    	}
    }
    
    var nextNUm = tenantsPageData.totalPages;
    nextNUm = tenantsPageData.pageNumber >= tenantsPageData.totalPages ? tenantsPageData.totalPages : (tenantsPageData.pageNumber + 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showTenantsList('+nextNUm+');">下一页</a></li>';
    htmlfooter += '<li>';
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showTenantsList('+tenantsPageData.totalPages+');" aria-label="Next">尾页</a>';
    htmlfooter += '</li>';
    htmlfooter += '</ul>';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
	$('#content').html(htmlSearch+htmlTable+htmlfooter);
	showTenantsReady(tenantsPageData);
	htmlTenantModal();
}

function footerBox(tenantsPageData) {
	var htmlfooter = "";
    htmlfooter += '<div class="pull-left">';
    htmlfooter += '<div class="form-group form-inline">';
    htmlfooter += '总共'+tenantsPageData.totalPages+'页，共'+tenantsPageData.totalElements+'条数据。 每页';
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
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showTenantsList(1);" aria-label="Previous">首页</a>';
    htmlfooter += '</li>';
    var prevNum = 1;
    prevNum = tenantsPageData.pageNumber <= 2 ? 1 : (tenantsPageData.pageNumber - 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showTenantsList('+prevNum+');">上一页</a></li>';
    var j = tenantsPageData.pageNumber / 5.0;
    var k = j+1;
    if(tenantsPageData.pageNumber % 5 == 0) {
    	j--;
    }
    var tm = tenantsPageData.totalPages / 5.0;
    if(tm >= 1) {

    	for (var i = 5 * j + 1; i <= 5 * k; i++) {
    		htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showTenantsList('+i+');">'+i+'</a></li>';
    	}
    } else {
    	for (var i = 1; i <= tenantsPageData.totalPages; i++) {
    		htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showTenantsList('+i+');">'+i+'</a></li>';
    	}
    }
    
    var nextNUm = tenantsPageData.totalPages;
    nextNUm = tenantsPageData.pageNumber >= tenantsPageData.totalPages ? tenantsPageData.totalPages : (tenantsPageData.pageNumber + 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showTenantsList('+nextNUm+');">下一页</a></li>';
    htmlfooter += '<li>';
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showTenantsList('+tenantsPageData.totalPages+');" aria-label="Next">尾页</a>';
    htmlfooter += '</li>';
    htmlfooter += '</ul>';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
    return htmlfooter; 
}

function searchTenantList(pageNumber) {
	var txtTenantname = $('#tname').val();
	var linkman = $('#linkman').val();
	var email = $('#email').val();
	var phone = $('#phone').val();

	var pageSize = $('#pageSize option selected').val();
	var storage = window.localStorage;
	var username = storage.getItem('username');
	var ctx = storage.getItem("ctx");
	var rData = "";

	var status = $('#status option selected').val();
	if(status == 0) {
		status == null;
	}
	if(username == "admin") {
		var searchData = {"name":txtTenantname,"email":email,"linkman":linkman,"phone":phone,"status":status,"pageSize":pageSize,"pageNumber":pageNumber};
		$.ajax({
	            type: "POST",
	            dataType: "json",
	            async: false,
	            beforeSend: function(XMLHttpRequest) {
	                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
	            },
	            contentType: "application/json;charset=utf-8",
	            url:ctx+'api/uc/tenant/v1/findPage',
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
		var searchData = {"name":txtTenantname,"email":email,"phone":phone,"linkman":linkman,"status":status,"pageSize":pageSize,"pageNumber":pageNumber};
		$.ajax({
	            type: "POST",
	            dataType: "json",
	            async: false,
	            beforeSend: function(XMLHttpRequest) {
	                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
	            },
	            contentType: "application/json;charset=utf-8",
	            url:ctx+'api/uc/tenant/v1/findPage',
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

function showTenantsList(pageNumber) {
	tenantsPageData = searchTenantList(pageNumber);
	var htmlData = "";
	if(tenantsPageData != "") {
		$.each(tenantsPageData.contents, function(i,item){
			htmlData += '<tr>';
			htmlData += '<td>'+item.name+'</td>';
			htmlData += '<td>'+item.linkman+'</td>';
			htmlData += '<td>'+item.email+'</td>';
			htmlData += '<td>'+item.phone+'</td>';
			htmlData += '<td>'+item.status+'</td>';
			htmlData += '<td class="text-center">'
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=editTenant("'+item.strId+'"); data-toggle="modal" data-target="#tenantAddWin">修改</button>&nbsp;';
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=delTenant("'+item.strId+'"); >删除</button>';
			htmlData += '</td>';
			htmlData += '</tr>';
		});  
	}
	$('#tbody').html(htmlData);
	var footBox = footerBox(tenantsPageData);
	$('#footer-box').html(footBox);
}

function showTenantsReady(tenantsPageData) {
	var htmlData = "";
	if(tenantsPageData != "") {
		$.each(tenantsPageData.contents, function(i,item){
			htmlData += '<tr>';
			htmlData += '<td>'+item.name+'</td>';
			htmlData += '<td>'+item.linkman+'</td>';
			htmlData += '<td>'+item.email+'</td>';
			htmlData += '<td>'+item.phone+'</td>';
			htmlData += '<td>'+item.status+'</td>';
			htmlData += '<td class="text-center">'
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=editTenant("'+item.strId+'"); data-toggle="modal" data-target="#tenantAddWin">修改</button>&nbsp;';
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=delTenant("'+item.strId+'"); >删除</button>';
			htmlData += '</td>';
			htmlData += '</tr>';
		});  
	}
	$('#tbody').html(htmlData);
}

function htmlTenantModal() {
	var tenantEdit = "";
	tenantEdit += '<div id="tenantAddWin" class="modal" role="dialog">';
	tenantEdit += '<div class="modal-dialog modal-lg">';
	tenantEdit += '<div class="modal-content">';
	tenantEdit += '<div class="modal-header">';
	tenantEdit += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
	tenantEdit += '<h4 class="modal-title" id="ttl">增加租户</h4>';
	tenantEdit += '</div>';
	tenantEdit += '<div class="modal-body">';
	tenantEdit += '<div class="box-body">';
	tenantEdit += '<div class="form-horizontal">';
	tenantEdit += '<div class="form-group">';
	tenantEdit += '<div class="col-md-2 title">租户名</div>';
	tenantEdit += '<div class="col-md-4 data">';
    tenantEdit += '<input type="text" id="aname" class="form-control" placeholder="请输入租户名（必填）" value="">';
    tenantEdit += '</div>';
    tenantEdit += '</div>';
	tenantEdit += '<div class="form-group">';
	tenantEdit += '<div class="col-md-2 title">联系人</div>';
	tenantEdit += '<div class="col-md-4 data">';
    tenantEdit += '<input type="text" id="alinkman" class="form-control" placeholder="请输入联系人" value="">';
    tenantEdit += '</div>';
    tenantEdit += '</div>';
	tenantEdit += '<div class="form-group">';
	tenantEdit += '<div class="col-md-2 title">电话</div>';
	tenantEdit += '<div class="col-md-4 data">';
    tenantEdit += '<input type="text" id="aphone" class="form-control" placeholder="请输入电话" value="">';
    tenantEdit += '</div>';
    tenantEdit += '</div>';
	tenantEdit += '<div class="form-group">';
	tenantEdit += '<div class="col-md-2 title">EMail</div>';
	tenantEdit += '<div class="col-md-4 data">';
    tenantEdit += '<input type="text" id="aemail" class="form-control" placeholder="请输入邮箱" value="">';
    tenantEdit += '</div>';
    tenantEdit += '</div>';
	tenantEdit += '<div class="form-group">';
	tenantEdit += '<div class="col-md-2 title">状态</div>';
	tenantEdit += '<div class="col-md-4 data">';
    tenantEdit += ' <select id="astatus" class="form-control">';
    tenantEdit += '<option value="false">启用</option>';
    tenantEdit += '<option value="true">禁用</option>';
    tenantEdit += '</select>';
    tenantEdit += '</div>';
    tenantEdit += '</div>';
    tenantEdit += '</div>';
    tenantEdit += '</div>';
    tenantEdit += '</div>';
    tenantEdit += '<div class="modal-footer">';
    tenantEdit += '<button type="button" class="btn bg-default" data-dismiss="modal" >关闭</button>';
    tenantEdit += '<button type="button" class="btn bg-default" data-dismiss="modal" onclick="saveTenant()">保存</button>';
    tenantEdit += '</div>';
    tenantEdit += '</div>';
    tenantEdit += '</div>';
    tenantEdit += '</div>';
    $('#content').append(tenantEdit);
}

function addTenant(tenantId) {
	$('#ttl').html("增加租户");
	$('#tenantId').val(tenantId);
	$('#doingType').val("add");
}

function editTenant(tenantId) {
	var tenantData = searchTenant(tenantId);
	$('#ttl').html("修改租户");
	$('#tenantId').val(tenantData.strId);
	$('#aname').val(tenantData.name);
	$('#aphone').val(tenantData.phone);
	$('#aemail').val(tenantData.email);
	$('#alinkman').val(tenantData.linkman);
	$('#astatus').val(tenantData.status);
	
	$('#doingType').val("modify");
}

function searchTenant(tenantId) {
	var tenantData = "";
	var storage = window.localStorage;
	var ctx = storage.getItem("ctx");
	var dataJson = {"id": tenantId};
	$.ajax({
	            type: "POST",
	            dataType: "json",
	            async: false,
	            beforeSend: function(XMLHttpRequest) {
	                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
	            },
	            contentType: "application/json;charset=utf-8",
	            url:ctx+'api/uc/tenant/v1/findOne',
	            data:JSON.stringify(dataJson),
	            success: function(resData){
	            	if(resData.code == 0) {
	            		tenantData = resData.data;
	            	} else {
	            		alert(resData.code+resData.msg);

	            	}
	                
	            },
	            error: function(XMLHttpRequest,status, error) {
	                console.log("xhr======"+JSON.stringify(XMLHttpRequest));
	            }
	        });
	return tenantData;
}

function saveTenant() {
	var tenantId = $('#tenantId').val();
	var aname = $('#aname').val();
	var aphone = $('#aphone').val();
	var aemail = $('#aemail').val();
	var alinkman = $('#alinkman').val();
	var astatus = $('#astatus option:selected').val();
	var doingType = $('#doingType').val();
	tenantId = tenantId == "" ? null : tenantId;

	if(aname == null || aname == "") {
		alert("租户名不能为空！");
		return;
	}

	var tmpUrl = doingType == "add" ? "api/uc/tenant/v1/add" : "api/uc/tenant/v1/update";

	var dataJson = {"id": tenantId,"name": aname,"phone":aphone,"email":aemail,"linkman":alinkman,"status":astatus};
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

function delTenant(id) {
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
        url:ctx+'api/uc/tenant/v1/logicalDelete',
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