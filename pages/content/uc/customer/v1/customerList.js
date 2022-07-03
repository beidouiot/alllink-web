var customersPageData = "";
function showList() {
	var toolsHtml = '<div class="pull-left">';
    toolsHtml += '<div class="form-group form-inline">';
    toolsHtml += '<div class="btn-group">';
    toolsHtml += '<button type="button" class="btn btn-default" title="增加" onclick=addCustomer(""); data-toggle="modal" data-target="#customerAddWin"><i class="fa fa-file-o"></i> 新建</button> &nbsp;';
    toolsHtml += '<button type="button" class="btn btn-default" onclick="showList()" title="刷新"><i class="fa fa-refresh"></i> 刷新</button>';
    toolsHtml += '<input type="hidden" class="btn bg-olive btn-xs" id="customerId" value="" >';
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
	htmlSearch += '<input type="text" id="tname" class="form-control" placeholder="客户名"> &nbsp;';
	htmlSearch += '</div>';
	htmlSearch += '<div class="input-group  row margin">';
	htmlSearch += '<input type="text" id="email" class="form-control" placeholder="邮箱"> &nbsp;';
	htmlSearch += '</div>';
	htmlSearch += '<div class="input-group  row margin">';
	htmlSearch += '<input type="text" id="phone" class="form-control" placeholder="电话"> &nbsp;';
	htmlSearch += '</div>';
	htmlSearch += '</div>';
	htmlSearch += '</div>';

	htmlSearch += '<div class="form-group">';
	htmlSearch += '<button type="button" class="btn btn-block btn-success" title="查询" onclick="showCustomersList();"> 查询</button>';
	htmlSearch += '</div>';
	htmlSearch += toolsHtml;
	var htmlTable = '<table id="dataList" class="table table-bordered table-striped table-hover dataTable">';
	htmlTable += '<thead>';
	htmlTable += '<tr>';
	htmlTable += '<th class="text-center">客户名</th>';
	htmlTable += '<th class="text-center">邮箱</th>';
	htmlTable += '<th class="text-center">电话</th>';
	htmlTable += '<th class="text-center">操作</th>';
	htmlTable += '</tr>';
	htmlTable += '</thead>';
	htmlTable += '<tbody id="tbody">';

	htmlTable += '</tbody>';
	htmlTable += '</table>';
	htmlTable += '</div>';
	htmlTable += '</div>';

	var htmlfooter = "";
	 customersPageData = searchCustomerList(1);	
	htmlfooter += '<div class="box-footer" id="footer-box">';
    htmlfooter += '<div class="pull-left">';
    htmlfooter += '<div class="form-group form-inline">';
    htmlfooter += '总共'+customersPageData.totalPages+'页，共'+customersPageData.totalElements+'条数据。 每页';
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
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showCustomersList(1);" aria-label="Previous">首页</a>';
    htmlfooter += '</li>';
    var prevNum = 1;
    prevNum = customersPageData.pageNumber <= 2 ? 1 : (customersPageData.pageNumber - 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showCustomersList('+prevNum+');">上一页</a></li>';
    var j = customersPageData.pageNumber / 5.0;
    var k = j+1;
    if(customersPageData.pageNumber % 5 == 0) {
    	j--;
    }
    var tm = customersPageData.totalPages / 5.0;
    if(tm >= 1) {

    	for (var i = 5 * j + 1; i <= 5 * k; i++) {
    		htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showCustomersList('+i+');">'+i+'</a></li>';
    	}
    } else {
    	for (var i = 1; i <= customersPageData.totalPages; i++) {
    		htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showCustomersList('+i+');">'+i+'</a></li>';
    	}
    }
    
    var nextNUm = customersPageData.totalPages;
    nextNUm = customersPageData.pageNumber >= customersPageData.totalPages ? customersPageData.totalPages : (customersPageData.pageNumber + 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showCustomersList('+nextNUm+');">下一页</a></li>';
    htmlfooter += '<li>';
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showCustomersList('+customersPageData.totalPages+');" aria-label="Next">尾页</a>';
    htmlfooter += '</li>';
    htmlfooter += '</ul>';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
	$('#content').html(htmlSearch+htmlTable+htmlfooter);
	showCustomersReady(customersPageData);
	htmlCustomerModal();
}

function footerBox(customersPageData) {
	var htmlfooter = "";
    htmlfooter += '<div class="pull-left">';
    htmlfooter += '<div class="form-group form-inline">';
    htmlfooter += '总共'+customersPageData.totalPages+'页，共'+customersPageData.totalElements+'条数据。 每页';
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
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showCustomersList(1);" aria-label="Previous">首页</a>';
    htmlfooter += '</li>';
    var prevNum = 1;
    prevNum = customersPageData.pageNumber <= 2 ? 1 : (customersPageData.pageNumber - 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showCustomersList('+prevNum+');">上一页</a></li>';
    var j = customersPageData.pageNumber / 5.0;
    var k = j+1;
    if(customersPageData.pageNumber % 5 == 0) {
    	j--;
    }
    var tm = customersPageData.totalPages / 5.0;
    if(tm >= 1) {

    	for (var i = 5 * j + 1; i <= 5 * k; i++) {
    		htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showCustomersList('+i+');">'+i+'</a></li>';
    	}
    } else {
    	for (var i = 1; i <= customersPageData.totalPages; i++) {
    		htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showCustomersList('+i+');">'+i+'</a></li>';
    	}
    }
    
    var nextNUm = customersPageData.totalPages;
    nextNUm = customersPageData.pageNumber >= customersPageData.totalPages ? customersPageData.totalPages : (customersPageData.pageNumber + 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showCustomersList('+nextNUm+');">下一页</a></li>';
    htmlfooter += '<li>';
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showCustomersList('+customersPageData.totalPages+');" aria-label="Next">尾页</a>';
    htmlfooter += '</li>';
    htmlfooter += '</ul>';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
    return htmlfooter; 
}

function searchCustomerList(pageNumber) {
	var txtCustomername = $('#tname').val();
	var email = $('#email').val();
	var phone = $('#phone').val();

	var pageSize = $('#pageSize option selected').val();
	var storage = window.localStorage;
	var username = storage.getItem('username');
	var ctx = storage.getItem("ctx");
	var rData = "";

	if(username == "admin") {
		var searchData = {"name":txtCustomername,"email":email,"phone":phone,"pageSize":pageSize,"pageNumber":pageNumber};
		$.ajax({
	            type: "POST",
	            dataType: "json",
	            async: false,
	            beforeSend: function(XMLHttpRequest) {
	                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
	            },
	            contentType: "application/json;charset=utf-8",
	            url:ctx+'api/uc/customer/v1/findPage',
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
		var searchData = {"name":txtCustomername,"email":email,"phone":phone,"status":status,"pageSize":pageSize,"pageNumber":pageNumber};
		$.ajax({
	            type: "POST",
	            dataType: "json",
	            async: false,
	            beforeSend: function(XMLHttpRequest) {
	                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
	            },
	            contentType: "application/json;charset=utf-8",
	            url:ctx+'api/uc/customer/v1/findPage',
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

function showCustomersList(pageNumber) {
	customersPageData = searchCustomerList(pageNumber);
	var htmlData = "";
	if(customersPageData != "") {
		$.each(customersPageData.contents, function(i,item){
			htmlData += '<tr>';
			htmlData += '<td>'+item.name+'</td>';
			htmlData += '<td>'+item.email+'</td>';
			htmlData += '<td>'+item.phone+'</td>';
			htmlData += '<td class="text-center">'
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=editCustomer("'+item.strId+'"); data-toggle="modal" data-target="#customerAddWin">修改</button>&nbsp;';
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=delCustomer("'+item.strId+'"); >删除</button>';
			htmlData += '</td>';
			htmlData += '</tr>';
		});  
	}
	$('#tbody').html(htmlData);
	var footBox = footerBox(customersPageData);
	$('#footer-box').html(footBox);
}

function showCustomersReady(customersPageData) {
	var htmlData = "";
	if(customersPageData != "") {
		$.each(customersPageData.contents, function(i,item){
			htmlData += '<tr>';
			htmlData += '<td>'+item.name+'</td>';
			htmlData += '<td>'+item.email+'</td>';
			htmlData += '<td>'+item.phone+'</td>';
			htmlData += '<td class="text-center">'
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=editCustomer("'+item.strId+'"); data-toggle="modal" data-target="#customerAddWin">修改</button>&nbsp;';
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=delCustomer("'+item.strId+'"); >删除</button>';
			htmlData += '</td>';
			htmlData += '</tr>';
		});  
	}
	$('#tbody').html(htmlData);
}

function htmlCustomerModal() {
	var customerEdit = "";
	customerEdit += '<div id="customerAddWin" class="modal" role="dialog">';
	customerEdit += '<div class="modal-dialog modal-lg">';
	customerEdit += '<div class="modal-content">';
	customerEdit += '<div class="modal-header">';
	customerEdit += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
	customerEdit += '<h4 class="modal-title" id="ttl">增加客户</h4>';
	customerEdit += '</div>';
	customerEdit += '<div class="modal-body">';
	customerEdit += '<div class="box-body">';
	customerEdit += '<div class="form-horizontal">';
	customerEdit += '<div class="form-group">';
	customerEdit += '<div class="col-md-2 title">客户名</div>';
	customerEdit += '<div class="col-md-4 data">';
    customerEdit += '<input type="text" id="aname" class="form-control" placeholder="请输入租户名（必填）" value="">';
    customerEdit += '</div>';
    customerEdit += '</div>';
	customerEdit += '<div class="form-group">';
	customerEdit += '<div class="col-md-2 title">电话</div>';
	customerEdit += '<div class="col-md-4 data">';
    customerEdit += '<input type="text" id="aphone" class="form-control" placeholder="请输入电话" value="">';
    customerEdit += '</div>';
    customerEdit += '</div>';
	customerEdit += '<div class="form-group">';
	customerEdit += '<div class="col-md-2 title">EMail</div>';
	customerEdit += '<div class="col-md-4 data">';
    customerEdit += '<input type="text" id="aemail" class="form-control" placeholder="请输入邮箱" value="">';
    customerEdit += '</div>';
    customerEdit += '</div>';
    customerEdit += '</div>';
    customerEdit += '</div>';
    customerEdit += '</div>';
    customerEdit += '<div class="modal-footer">';
    customerEdit += '<button type="button" class="btn bg-default" data-dismiss="modal" >关闭</button>';
    customerEdit += '<button type="button" class="btn bg-default" data-dismiss="modal" onclick="saveCustomer()">保存</button>';
    customerEdit += '</div>';
    customerEdit += '</div>';
    customerEdit += '</div>';
    customerEdit += '</div>';
    $('#content').append(customerEdit);
}

function addCustomer(customerId) {
	$('#ttl').html("增加客户");
	$('#customerId').val(customerId);
	$('#doingType').val("add");
}

function editCustomer(customerId) {
	var customerData = searchCustomer(customerId);
	$('#ttl').html("修改客户");
	$('#customerId').val(customerData.strId);
	$('#aname').val(customerData.name);
	$('#aphone').val(customerData.phone);
	$('#aemail').val(customerData.email);
	$('#astatus').val(customerData.status);
	
	$('#doingType').val("modify");
}

function searchCustomer(customerId) {
	var customerData = "";
	var storage = window.localStorage;
	var ctx = storage.getItem("ctx");
	var dataJson = {"id": customerId};
	$.ajax({
	            type: "POST",
	            dataType: "json",
	            async: false,
	            beforeSend: function(XMLHttpRequest) {
	                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
	            },
	            contentType: "application/json;charset=utf-8",
	            url:ctx+'api/uc/customer/v1/findOne',
	            data:JSON.stringify(dataJson),
	            success: function(resData){
	            	if(resData.code == 0) {
	            		customerData = resData.data;
	            	} else {
	            		alert(resData.code+resData.msg);

	            	}
	                
	            },
	            error: function(XMLHttpRequest,status, error) {
	                console.log("xhr======"+JSON.stringify(XMLHttpRequest));
	            }
	        });
	return customerData;
}

function saveCustomer() {
	var customerId = $('#customerId').val();
	var aname = $('#aname').val();
	var aphone = $('#aphone').val();
	var aemail = $('#aemail').val();
	var doingType = $('#doingType').val();
	customerId = customerId == "" ? null : customerId;

	if(aname == null || aname == "") {
		alert("客户名不能为空！");
		return;
	}

	var tmpUrl = doingType == "add" ? "api/uc/customer/v1/add" : "api/uc/customer/v1/update";

	var dataJson = {"id": customerId,"name": aname,"phone":aphone,"email":aemail};
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

function delCustomer(id) {
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
        url:ctx+'api/uc/customer/v1/logicalDelete',
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