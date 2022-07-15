	var tenantList={};
	var usersPageData = "";
function showList() {
	var toolsHtml = '<div class="pull-left">';
    toolsHtml += '<div class="form-group form-inline">';
    toolsHtml += '<div class="btn-group">';
    toolsHtml += '<button type="button" class="btn btn-default" title="增加" onclick=addUser(""); data-toggle="modal" data-target="#userAddWin"><i class="fa fa-file-o"></i> 新建</button> &nbsp;';
    toolsHtml += '<button type="button" class="btn btn-default" onclick="showList()" title="刷新"><i class="fa fa-refresh"></i> 刷新</button>';
    toolsHtml += '<input type="hidden" class="btn bg-olive btn-xs" id="userId" value="" >';
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
	htmlSearch += '<input type="text" id="uname" class="form-control" placeholder="用户名"> &nbsp;';
	htmlSearch += '</div>';
	htmlSearch += '<div class="input-group  row margin">';
	htmlSearch += '<input type="text" id="mobile" class="form-control" placeholder="手机号"> &nbsp;';
	htmlSearch += '</div>';
	htmlSearch += '<div class="input-group  row margin">';
	htmlSearch += '<input type="text" id="email" class="form-control" placeholder="邮箱"> &nbsp;';
	htmlSearch += '</div>';
	htmlSearch += '<div class="input-group  row margin">';
	htmlSearch += '<input type="text" id="cname" class="form-control" placeholder="姓名"> &nbsp;';
	htmlSearch += '</div>';
	htmlSearch += '</div>';

	htmlSearch += '<div class="form-group form-inline">';
	htmlSearch += '<div class="input-group  row margin">';
	htmlSearch += '<input type="text" id="nickname" class="form-control" placeholder="昵称"> &nbsp;';
	htmlSearch += '</div>';
	var storage = window.localStorage;
	var username = storage.getItem('username');
	if(username == "admin") {
		htmlSearch += '<div class="input-group row margin">';
		htmlSearch += '<select id="status" class="form-control">';
		htmlSearch += '<option value="0">全部</option>';
		htmlSearch += '<option value="0">启用</option>';
		htmlSearch += '<option value="1">禁用</option>';
		htmlSearch += '</select> &nbsp;';
		htmlSearch += '</div>';
		htmlSearch += '<div class="input-group row margin">';
		htmlSearch += '<select id="tenantId" class="form-control">';
		htmlSearch += '<option value="0">全部租户</option>';
		htmlSearch += searchTenantsData(tenantList);//后台租户数据
		htmlSearch += '</select> &nbsp;';
		htmlSearch += '</div>';

	}
	htmlSearch += '</div>';
	htmlSearch += '</div>';

	htmlSearch += '<div class="form-group">';
	htmlSearch += '<button type="button" class="btn btn-block btn-success" title="查询" onclick="showUsersList();"> 查询</button>';
	htmlSearch += '</div>';
	htmlSearch += toolsHtml;
	var htmlTable = '<table id="dataList" class="table table-bordered table-striped table-hover dataTable">';
	htmlTable += '<thead>';
	htmlTable += '<tr>';
	htmlTable += '<th class="text-center">用户名</th>';
	htmlTable += '<th class="text-center">手机号</th>';
	htmlTable += '<th class="text-center">邮箱</th>';
	htmlTable += '<th class="text-center">姓名</th>';
	htmlTable += '<th class="text-center">昵称</th>';
	htmlTable += '<th class="text-center">状态</th>';
	htmlTable += '<th class="text-center">所属租户</th>';
	htmlTable += '<th class="text-center">操作</th>';
	htmlTable += '</tr>';
	htmlTable += '</thead>';
	htmlTable += '<tbody id="tbody">';

	htmlTable += '</tbody>';
	htmlTable += '</table>';
	htmlTable += '</div>';
	htmlTable += '</div>';

	var htmlfooter = "";
	 usersPageData = searchUserList(1);	
	htmlfooter += '<div class="box-footer" id="footer-box">';
    htmlfooter += '<div class="pull-left">';
    htmlfooter += '<div class="form-group form-inline">';
    htmlfooter += '总共'+usersPageData.totalPages+'页，共'+usersPageData.totalElements+'条数据。 每页';
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
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showUsersList(1);" aria-label="Previous">首页</a>';
    htmlfooter += '</li>';
    var prevNum = 1;
    prevNum = usersPageData.pageNumber <= 2 ? 1 : (usersPageData.pageNumber - 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showUsersList('+prevNum+');">上一页</a></li>';
    var j = usersPageData.pageNumber / 5.0;
    var k = j+1;
    if(usersPageData.pageNumber % 5 == 0) {
    	j--;
    }
    var tm = usersPageData.totalPages / 5.0;
    if(tm >= 1) {

    	for (var i = 5 * j + 1; i <= 5 * k; i++) {
    		htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showUsersList('+i+');">'+i+'</a></li>';
    	}
    } else {
    	for (var i = 1; i <= usersPageData.totalPages; i++) {
    		htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showUsersList('+i+');">'+i+'</a></li>';
    	}
    }
    
    var nextNUm = usersPageData.totalPages;
    nextNUm = usersPageData.pageNumber >= usersPageData.totalPages ? usersPageData.totalPages : (usersPageData.pageNumber + 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showUsersList('+nextNUm+');">下一页</a></li>';
    htmlfooter += '<li>';
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showUsersList('+usersPageData.totalPages+');" aria-label="Next">尾页</a>';
    htmlfooter += '</li>';
    htmlfooter += '</ul>';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
	$('#content').html(htmlSearch+htmlTable+htmlfooter);
	showUsersReady(usersPageData);
	htmlUserModal();
}

function footerBox(usersPageData) {
	var htmlfooter = "";
    htmlfooter += '<div class="pull-left">';
    htmlfooter += '<div class="form-group form-inline">';
    htmlfooter += '总共'+usersPageData.totalPages+'页，共'+usersPageData.totalElements+'条数据。 每页';
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
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showUsersList(1);" aria-label="Previous">首页</a>';
    htmlfooter += '</li>';
    var prevNum = 1;
    prevNum = usersPageData.pageNumber <= 2 ? 1 : (usersPageData.pageNumber - 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showUsersList('+prevNum+');">上一页</a></li>';
    var j = usersPageData.pageNumber / 5.0;
    var k = j+1;
    if(usersPageData.pageNumber % 5 == 0) {
    	j--;
    }
    var tm = usersPageData.totalPages / 5.0;
    if(tm >= 1) {

    	for (var i = 5 * j + 1; i <= 5 * k; i++) {
    		htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showUsersList('+i+');">'+i+'</a></li>';
    	}
    } else {
    	for (var i = 1; i <= usersPageData.totalPages; i++) {
    		htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showUsersList('+i+');">'+i+'</a></li>';
    	}
    }
    
    var nextNUm = usersPageData.totalPages;
    nextNUm = usersPageData.pageNumber >= usersPageData.totalPages ? usersPageData.totalPages : (usersPageData.pageNumber + 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showUsersList('+nextNUm+');">下一页</a></li>';
    htmlfooter += '<li>';
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showUsersList('+usersPageData.totalPages+');" aria-label="Next">尾页</a>';
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

function searchUserList(pageNumber) {
	var txtUsername = $('#uname').val();
	var mobile = $('#mobile').val();
	var email = $('#email').val();
	var cname = $('#cname').val();
	var nickname = $('#nickname').val();

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

	var status = $('#status option selected').val();
	if(status == 0) {
		status == null;
	}
	if(username == "admin") {
		var searchData = {"username":txtUsername,"mobile":mobile,"email":email,"name":cname,"nickname":nickname,"status":status,"pageSize":pageSize,"pageNumber":pageNumber};
		$.ajax({
	            type: "POST",
	            dataType: "json",
	            async: false,
	            beforeSend: function(XMLHttpRequest) {
	                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
	            },
	            contentType: "application/json;charset=utf-8",
	            url:ctx+'api/uc/user/v1/findPage',
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
		var searchData = {"name":txtUsername,"mobile":mobile,"email":email,"name":cname,"nickname":nickname,"status":status,"pageSize":pageSize,"pageNumber":pageNumber,"tenantId":tenantId};
		$.ajax({
	            type: "POST",
	            dataType: "json",
	            async: false,
	            beforeSend: function(XMLHttpRequest) {
	                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
	            },
	            contentType: "application/json;charset=utf-8",
	            url:ctx+'api/uc/user/v1/findPage',
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

function showUsersList(pageNumber) {
	usersPageData = searchUserList(pageNumber);
	var htmlData = "";
	if(usersPageData != "") {
		$.each(usersPageData.contents, function(i,item){
			htmlData += '<tr>';
			htmlData += '<td>'+item.username+'</td>';
			htmlData += '<td>'+item.mobile+'</td>';
			htmlData += '<td>'+item.email+'</td>';
			htmlData += '<td>'+item.name+'</td>';
			htmlData += '<td>'+item.nickname+'</td>';
			htmlData += '<td>'+item.strStatus+'</td>';
			htmlData += '<td>'+item.strTenantId+'</td>';
			htmlData += '<td class="text-center">'
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=editUser("'+item.strId+'"); data-toggle="modal" data-target="#userAddWin">修改</button>&nbsp;';
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=delUser("'+item.strId+'"); >删除</button>';
			htmlData += '</td>';
			htmlData += '</tr>';
		});  
	}
	$('#tbody').html(htmlData);
	var footBox = footerBox(usersPageData);
	$('#footer-box').html(footBox);
}

function showUsersReady(usersPageData) {
	var htmlData = "";
	if(usersPageData != "") {
		$.each(usersPageData.contents, function(i,item){
			htmlData += '<tr>';
			htmlData += '<td>'+item.username+'</td>';
			htmlData += '<td>'+item.mobile+'</td>';
			htmlData += '<td>'+item.email+'</td>';
			htmlData += '<td>'+item.name+'</td>';
			htmlData += '<td>'+item.nickname+'</td>';
			htmlData += '<td>'+item.strStatus+'</td>';
			htmlData += '<td>'+item.strTenantId+'</td>';
			htmlData += '<td class="text-center">'
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=editUser("'+item.strId+'"); data-toggle="modal" data-target="#userAddWin">修改</button>&nbsp;';
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=delUser("'+item.strId+'"); >删除</button>';
			htmlData += '</td>';
			htmlData += '</tr>';
		});  
	}
	$('#tbody').html(htmlData);
}

function htmlUserModal() {
	var userEdit = "";
	userEdit += '<div id="userAddWin" class="modal" role="dialog">';
	userEdit += '<div class="modal-dialog modal-lg">';
	userEdit += '<div class="modal-content">';
	userEdit += '<div class="modal-header">';
	userEdit += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
	userEdit += '<h4 class="modal-title" id="ttl">增加用户</h4>';
	userEdit += '</div>';
	userEdit += '<div class="modal-body">';
	userEdit += '<div class="box-body">';
	userEdit += '<div class="form-horizontal">';
	userEdit += '<div class="form-group">';
	userEdit += '<div class="col-md-2 title">用户名</div>';
	userEdit += '<div class="col-md-4 data">';
    userEdit += '<input type="text" id="auname" class="form-control" placeholder="请输入用户名（必填）" value="">';
    userEdit += '</div>';
    userEdit += '</div>';
	userEdit += '<div class="form-group">';
	userEdit += '<div class="col-md-2 title">密码</div>';
	userEdit += '<div class="col-md-4 data">';
    userEdit += '<input type="password" id="apassword" class="form-control" placeholder="请输入密码（必填）" value="">';
    userEdit += '</div>';
    userEdit += '</div>';
	userEdit += '<div class="form-group">';
	userEdit += '<div class="col-md-2 title">确认密码</div>';
	userEdit += '<div class="col-md-4 data">';
    userEdit += '<input type="password" id="apassword1" class="form-control" placeholder="请再次输入密码（必填）" value="">';
    userEdit += '</div>';
    userEdit += '</div>';
	userEdit += '<div class="form-group">';
	userEdit += '<div class="col-md-2 title">手机号</div>';
	userEdit += '<div class="col-md-4 data">';
    userEdit += '<input type="text" id="amobile" class="form-control" placeholder="请输入手机（必填）" value="">';
    userEdit += '</div>';
    userEdit += '</div>';
	userEdit += '<div class="form-group">';
	userEdit += '<div class="col-md-2 title">EMail</div>';
	userEdit += '<div class="col-md-4 data">';
    userEdit += '<input type="email" id="aemail" class="form-control" placeholder="请输入邮箱（必填）" value="">';
    userEdit += '</div>';
    userEdit += '</div>';
	userEdit += '<div class="form-group">';
	userEdit += '<div class="col-md-2 title">姓名</div>';
	userEdit += '<div class="col-md-4 data">';
    userEdit += '<input type="text" id="acname" class="form-control" placeholder="请输入姓名（必填）" value="">';
    userEdit += '</div>';
    userEdit += '</div>';
	userEdit += '<div class="form-group">';
	userEdit += '<div class="col-md-2 title">昵称</div>';
	userEdit += '<div class="col-md-4 data">';
    userEdit += '<input type="text" id="anickname" class="form-control" placeholder="请输昵称" value="">';
    userEdit += '</div>';
    userEdit += '</div>';
	userEdit += '<div class="form-group">';
	userEdit += '<div class="col-md-2 title">微信</div>';
	userEdit += '<div class="col-md-4 data">';
    userEdit += '<input type="text" id="aweixin" class="form-control" placeholder="请输微信号" value="">';
    userEdit += '</div>';
    userEdit += '</div>';
	userEdit += '<div class="form-group">';
	userEdit += '<div class="col-md-2 title">QQ号</div>';
	userEdit += '<div class="col-md-4 data">';
    userEdit += '<input type="text" id="aqq" class="form-control" placeholder="请输QQ号" value="">';
    userEdit += '</div>';
    userEdit += '</div>';
	userEdit += '<div class="form-group">';
	userEdit += '<div class="col-md-2 title">性别</div>';
	userEdit += '<div class="col-md-4 data">';
    userEdit += ' <select id="asex" class="form-control">';
    userEdit += '<option value="0">男</option>';
    userEdit += '<option value="2">女</option>';
    userEdit += '<option value="3">保密</option>';
    userEdit += '</select>';
    userEdit += '</div>';
    userEdit += '</div>';
	userEdit += '<div class="form-group">';
	userEdit += '<div class="col-md-2 title">状态</div>';
	userEdit += '<div class="col-md-4 data">';
    userEdit += ' <select id="astatus" class="form-control">';
    userEdit += '<option value="false">启用</option>';
    userEdit += '<option value="true">禁用</option>';
    userEdit += '</select>';
    userEdit += '</div>';
    userEdit += '</div>';
	userEdit += '<div class="form-group">';
	userEdit += '<div class="col-md-2 title">用户类型</div>';
	userEdit += '<div class="col-md-4 data">';
    userEdit += ' <select id="auserType" class="form-control">';
    userEdit += '<option value="USER">普通用户</option>';
    userEdit += '<option value="PADMIN">平台管理员</option>';
    userEdit += '<option value="TADMIN">租户管理员</option>';
    userEdit += '</select>';
    userEdit += '</div>';
    userEdit += '</div>';
    userEdit += '</div>';
    userEdit += '</div>';
    userEdit += '</div>';
    userEdit += '<div class="modal-footer">';
    userEdit += '<button type="button" class="btn bg-default" data-dismiss="modal" >关闭</button>';
    userEdit += '<button type="button" class="btn bg-default" data-dismiss="modal" onclick="saveUser()">保存</button>';
    userEdit += '</div>';
    userEdit += '</div>';
    userEdit += '</div>';
    userEdit += '</div>';
    $('#content').append(userEdit);
}

function addUser(userId) {
	$('#ttl').html("增加用户");
	$('#userId').val(userId);
	$('#doingType').val("add");
}

function editUser(userId) {
	var userData = searchUser(userId);
	$('#ttl').html("修改用户");
	$('#userId').val(userData.strId);
	$('#auname').val(userData.username);
	$('#auname').attr("readonly","readonly");
	// $('#apassword').val(userData.password);
	// $('#apassword1').val(userData.password);
	$('#amobile').val(userData.mobile);
	$('#email').val(userData.email);
	$('#acname').val(userData.name);
	$('#anickname').val(userData.nickname);
	$('#aweixin').val(userData.weixin);
	$('#aqq').val(userData.qqNo);
	$('#asex').val(userData.sex);
	$('#astatus').val(userData.status);
	$('#auserType').val(userData.userType);
	$('#doingType').val("modify");
}

function searchUser(userId) {
	var userData = "";
	var storage = window.localStorage;
	var ctx = storage.getItem("ctx");
	var dataJson = {"id": userId};
	$.ajax({
	            type: "POST",
	            dataType: "json",
	            async: false,
	            beforeSend: function(XMLHttpRequest) {
	                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
	            },
	            contentType: "application/json;charset=utf-8",
	            url:ctx+'api/uc/user/v1/findOne',
	            data:JSON.stringify(dataJson),
	            success: function(resData){
	            	if(resData.code == 0) {
	            		userData = resData.data;
	            	} else {
	            		alert(resData.code+resData.msg);

	            	}
	                
	            },
	            error: function(XMLHttpRequest,status, error) {
	                console.log("xhr======"+JSON.stringify(XMLHttpRequest));
	            }
	        });
	return userData;
}

function saveUser() {
	var userId = $('#userId').val();
	var uname = $('#auname').val();
	var password = $('#apassword').val();
	var password1 = $('#apassword1').val();
	var mobile = $('#amobile').val();
	var email = $('#aemail').val();
	var cname = $('#acname').val();
	var nickname = $('#anickname').val();
	var weixin = $('#aweixin').val();
	var qq = $('#aqq').val();
	var sex = $('#asex option:selected').val();
	var status = $('#astatus option:selected').val();
	var userType = $('#auserType option:selected').val();
	var doingType = $('#doingType').val();
	userId = userId == "" ? null : userId;
	if(doingType == "add") {
		if(password == null || password == "") {
			alert("密码不能为空！");
			return;
		}
		if(password1 != password) {
			alert("2次输入不一致！");
			return;
		}
	} else {
		if(password != null || password != "" || password1 != null || password1 != "") {
			if(password1 != password) {
				alert("2次输入不一致！");
				return;
			}
		}
	}

	if(uname == null || uname == "") {
		alert("用户名不能为空！");
		return;
	}

	if(mobile == null || mobile == "") {
		alert("手机号不能为空！");
		return;
	}
	if(email == null || email == "") {
		alert("邮箱不能为空！");
		return;
	}
	if(cname == null || cname == "") {
		alert("姓名不能为空！");
		return;
	}

	var tmpUrl = doingType == "add" ? "api/uc/user/v1/add" : "api/uc/user/v1/update";

	var dataJson = {"id": userId,"username": uname,"password":password,"mobile":mobile,"email":email,"name":cname,"nickname":nickname,"weixin":weixin,"qqNo":qq,"sex":sex,"status":status,"userType":userType};
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

function delUser(id) {
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
        url:ctx+'api/uc/user/v1/logicalDelete',
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