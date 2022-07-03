var productTypesPageData = "";
function showList() {
	var toolsHtml = '<div class="pull-left">';
    toolsHtml += '<div class="form-group form-inline">';
    toolsHtml += '<div class="btn-group">';
    toolsHtml += '<button type="button" class="btn btn-default" title="增加" onclick=addProductType(); data-toggle="modal" data-target="#productTypeAddWin"><i class="fa fa-file-o"></i> 新建</button> &nbsp;';
    toolsHtml += '<button type="button" class="btn btn-default" onclick="showList()" title="刷新"><i class="fa fa-refresh"></i> 刷新</button>';
    toolsHtml += '<input type="hidden" class="btn bg-olive btn-xs" id="productTypeId" value="" >';
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
	htmlSearch += '<input type="text" id="sname" class="form-control" placeholder="产品类别名称"> &nbsp;';
	htmlSearch += '</div>';
	htmlSearch += '<div class="input-group  row margin">';
	htmlSearch += '<input type="text" id="scode" class="form-control" placeholder="产品类别编号"> &nbsp;';
	htmlSearch += '</div>';
	htmlSearch += '<div class="input-group  row margin">';
	htmlSearch += '<input type="text" id="sdescr" class="form-control" placeholder="描述"> &nbsp;';
	htmlSearch += '</div>';
	htmlSearch += '</div>';
	htmlSearch += '</div>';

	htmlSearch += '<div class="form-group">';
	htmlSearch += '<button type="button" class="btn btn-block btn-success" title="查询" onclick="showProductTypesList();"> 查询</button>';
	htmlSearch += '</div>';
	htmlSearch += toolsHtml;
	var htmlTable = '<table id="dataList" class="table table-bordered table-striped table-hover dataTable">';
	htmlTable += '<thead>';
	htmlTable += '<tr>';
	htmlTable += '<th class="text-center">名称</th>';
	htmlTable += '<th class="text-center">编号</th>';
	htmlTable += '<th class="text-center">描述</th>';
	htmlTable += '<th class="text-center">操作</th>';
	htmlTable += '</tr>';
	htmlTable += '</thead>';
	htmlTable += '<tbody id="tbody">';

	htmlTable += '</tbody>';
	htmlTable += '</table>';
	htmlTable += '</div>';
	htmlTable += '</div>';

	var htmlfooter = "";
	 productTypesPageData = searchProductTypeList(1);	
	htmlfooter += '<div class="box-footer" id="footer-box">';
    htmlfooter += '<div class="pull-left">';
    htmlfooter += '<div class="form-group form-inline">';
    htmlfooter += '总共'+productTypesPageData.totalPages+'页，共'+productTypesPageData.totalElements+'条数据。 每页';
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
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showProductTypesList(1);" aria-label="Previous">首页</a>';
    htmlfooter += '</li>';
    var prevNum = 1;
    prevNum = productTypesPageData.pageNumber <= 2 ? 1 : (productTypesPageData.pageNumber - 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showProductTypesList('+prevNum+');">上一页</a></li>';
    var j = productTypesPageData.pageNumber / 5.0;
    var k = j+1;
    if(productTypesPageData.pageNumber % 5 == 0) {
    	j--;
    }
    var tm = productTypesPageData.totalPages / 5.0;
    if(tm >= 1) {

    	for (var i = 5 * j + 1; i <= 5 * k; i++) {
    		htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showProductTypesList('+i+');">'+i+'</a></li>';
    	}
    } else {
    	for (var i = 1; i <= productTypesPageData.totalPages; i++) {
    		htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showProductTypesList('+i+');">'+i+'</a></li>';
    	}
    }
    
    var nextNUm = productTypesPageData.totalPages;
    nextNUm = productTypesPageData.pageNumber >= productTypesPageData.totalPages ? productTypesPageData.totalPages : (productTypesPageData.pageNumber + 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showProductTypesList('+nextNUm+');">下一页</a></li>';
    htmlfooter += '<li>';
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showProductTypesList('+productTypesPageData.totalPages+');" aria-label="Next">尾页</a>';
    htmlfooter += '</li>';
    htmlfooter += '</ul>';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
    var tmp = '<div style="display:none;overflow:hidden;padding:3px" id="div1"><iframe src="./content/pc/standardModel/standardModel.html" frameborder="no" border="0" marginwidth="0" marginheight="0" id="prodcutDetailSrc"  scrolling="no"  width="100%" height="100%"></iframe></div>';
	$('#content').html(htmlSearch+htmlTable+htmlfooter+tmp);
	showProductTypesReady(productTypesPageData);
	htmlProductTypeModal();
}

function footerBox(productTypesPageData) {
	var htmlfooter = "";
    htmlfooter += '<div class="pull-left">';
    htmlfooter += '<div class="form-group form-inline">';
    htmlfooter += '总共'+productTypesPageData.totalPages+'页，共'+productTypesPageData.totalElements+'条数据。 每页';
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
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showProductTypesList(1);" aria-label="Previous">首页</a>';
    htmlfooter += '</li>';
    var prevNum = 1;
    prevNum = productTypesPageData.pageNumber <= 2 ? 1 : (productTypesPageData.pageNumber - 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showProductTypesList('+prevNum+');">上一页</a></li>';
    var j = productTypesPageData.pageNumber / 5.0;
    var k = j+1;
    if(productTypesPageData.pageNumber % 5 == 0) {
    	j--;
    }
    var tm = productTypesPageData.totalPages / 5.0;
    if(tm >= 1) {

    	for (var i = 5 * j + 1; i <= 5 * k; i++) {
    		htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showProductTypesList('+i+');">'+i+'</a></li>';
    	}
    } else {
    	for (var i = 1; i <= productTypesPageData.totalPages; i++) {
    		htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showProductTypesList('+i+');">'+i+'</a></li>';
    	}
    }
    
    var nextNUm = productTypesPageData.totalPages;
    nextNUm = productTypesPageData.pageNumber >= productTypesPageData.totalPages ? productTypesPageData.totalPages : (productTypesPageData.pageNumber + 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showProductTypesList('+nextNUm+');">下一页</a></li>';
    htmlfooter += '<li>';
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showProductTypesList('+productTypesPageData.totalPages+');" aria-label="Next">尾页</a>';
    htmlfooter += '</li>';
    htmlfooter += '</ul>';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
    return htmlfooter; 
}

function searchProductTypeList(pageNumber) {
	var sname = $('#sname').val();
	var scode = $('#scode').val();
	var sdescr = $('#sdescr').val();

	var pageSize = $('#pageSize option selected').val();
	var storage = window.localStorage;
	var username = storage.getItem('username');
	var ctx = storage.getItem("ctx");
	var rData = "";

	var searchData = {"name":sname,"code":scode,"descr":sdescr,"pageSize":pageSize,"pageNumber":pageNumber};
	$.ajax({
            type: "POST",
            dataType: "json",
            async: false,
            beforeSend: function(XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
            },
            contentType: "application/json;charset=utf-8",
            url:ctx+'api/pc/productType/v1/findPage',
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

	return rData;
}

function showProductTypesList(pageNumber) {
	productTypesPageData = searchProductTypeList(pageNumber);
	var htmlData = "";
	if(productTypesPageData != "") {
		$.each(productTypesPageData.contents, function(i,item){
			htmlData += '<tr>';
			htmlData += '<td>'+item.name+'</td>';
			htmlData += '<td>'+item.code+'</td>';
			htmlData += '<td>'+item.descr+'</td>';
			htmlData += '<td class="text-center">'
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=editProductType("'+item.strId+'"); data-toggle="modal" data-target="#productTypeAddWin">修改</button>&nbsp;';
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=delProductType("'+item.strId+'"); >删除</button>&nbsp;';
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=standardModel("'+item.strId+'"); >标准物模型</button>';
			htmlData += '</td>';
			htmlData += '</tr>';
		});  
	}
	$('#tbody').html(htmlData);
	var footBox = footerBox(productTypesPageData);
	$('#footer-box').html(footBox);
}

function showProductTypesReady(productTypesPageData) {
	var htmlData = "";
	if(productTypesPageData != "") {
		$.each(productTypesPageData.contents, function(i,item){
			htmlData += '<tr>';
			htmlData += '<td>'+item.name+'</td>';
			htmlData += '<td>'+item.code+'</td>';
			htmlData += '<td>'+item.descr+'</td>';
			htmlData += '<td class="text-center">'
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=editProductType("'+item.strId+'"); data-toggle="modal" data-target="#productTypeAddWin">修改</button>&nbsp;';
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=delProductType("'+item.strId+'"); >删除</button>&nbsp;';
			htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=standardModel("'+item.strId+'"); >标准物模型</button>';
			htmlData += '</td>';
			htmlData += '</tr>';
		});  
	}
	$('#tbody').html(htmlData);
}

function htmlProductTypeModal() {
	var productTypeEdit = "";
	productTypeEdit += '<div id="productTypeAddWin" class="modal" role="dialog">';
	productTypeEdit += '<div class="modal-dialog modal-lg">';
	productTypeEdit += '<div class="modal-content">';
	productTypeEdit += '<div class="modal-header">';
	productTypeEdit += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
	productTypeEdit += '<h4 class="modal-title" id="ttl">增加产品类别</h4>';
	productTypeEdit += '</div>';
	productTypeEdit += '<div class="modal-body">';
	productTypeEdit += '<div class="box-body">';
	productTypeEdit += '<div class="form-horizontal">';
	productTypeEdit += '<div class="form-group">';
	productTypeEdit += '<div class="col-md-2 title">产品类别名称</div>';
	productTypeEdit += '<div class="col-md-4 data">';
    productTypeEdit += '<input type="text" id="aname" class="form-control" placeholder="请输入产品类别名称（必填）" value="">';
    productTypeEdit += '</div>';
    productTypeEdit += '</div>';
	productTypeEdit += '<div class="form-group">';
	productTypeEdit += '<div class="col-md-2 title">编号</div>';
	productTypeEdit += '<div class="col-md-4 data">';
    productTypeEdit += '<input type="text" id="acode" class="form-control" placeholder="请输入编号（必填）" value="">';
    productTypeEdit += '</div>';
    productTypeEdit += '</div>';
	productTypeEdit += '<div class="form-group">';
	productTypeEdit += '<div class="col-md-2 title">描述</div>';
	productTypeEdit += '<div class="col-md-4 data">';
    productTypeEdit += '<textarea id="adescr" rows="3" class="form-control" placeholder="请输入描述" value=""></textarea>';
    productTypeEdit += '</div>';
    productTypeEdit += '</div>';

    productTypeEdit += '</div>';
    productTypeEdit += '</div>';
    productTypeEdit += '</div>';
    productTypeEdit += '<div class="modal-footer">';
    productTypeEdit += '<button type="button" class="btn bg-default" data-dismiss="modal" >关闭</button>';
    productTypeEdit += '<button type="button" class="btn bg-default" data-dismiss="modal" onclick="saveProductType()">保存</button>';
    productTypeEdit += '</div>';
    productTypeEdit += '</div>';
    productTypeEdit += '</div>';
    productTypeEdit += '</div>';
    $('#content').append(productTypeEdit);
}

function addProductType() {
	$('#ttl').html("增加产品类别");
	$('#doingType').val("add");
}

function editProductType(productTypeId) {
	var productTypeData = searchProductType(productTypeId);
	$('#ttl').html("修改产品类别");
	$('#aname').val(productTypeData.name);
	$('#acode').val(productTypeData.code);
	$('#adescr').val(productTypeData.descr);
	$('#productTypeId').val(productTypeId);
	$('#doingType').val("modify");
}

function searchProductType(productTypeId) {
	var productTypeData = "";
	var storage = window.localStorage;
	var ctx = storage.getItem("ctx");
	var dataJson = {"id": productTypeId};
	$.ajax({
	            type: "POST",
	            dataType: "json",
	            async: false,
	            beforeSend: function(XMLHttpRequest) {
	                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
	            },
	            contentType: "application/json;charset=utf-8",
	            url:ctx+'api/pc/productType/v1/findOne',
	            data:JSON.stringify(dataJson),
	            success: function(resData){
	            	if(resData.code == 0) {
	            		productTypeData = resData.data;
	            	} else {
	            		alert(resData.code+resData.msg);

	            	}
	                
	            },
	            error: function(XMLHttpRequest,status, error) {
	                console.log("xhr======"+JSON.stringify(XMLHttpRequest));
	            }
	        });
	return productTypeData;
}

function saveProductType() {
	var productTypeId = $('#productTypeId').val();
	var aname = $('#aname').val();
	var acode = $('#acode').val();
	var adescr = $('#adescr').val();
	var doingType = $('#doingType').val();
	productTypeId = productTypeId == "" ? null : productTypeId;

	if(aname == null || aname == "") {
		alert("产品类别名称不能为空！");
		return;
	}

	if(acode == null || acode == "") {
		alert("编号不能为空！");
		return;
	}

	var tmpUrl = doingType == "add" ? "api/pc/productType/v1/add" : "api/pc/productType/v1/update";

	var dataJson = {"id": productTypeId,"name": aname,"code":acode,"descr":adescr};
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

function delProductType(id) {
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
        url:ctx+'api/pc/productType/v1/logicalDelete',
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

function standardModel(productTypeId) {
	var title = "标准物模型";
	var width = 800;
	var height = 600;
	var url = './content/pc/standardModel/standardModel.html?productTypeId='+productTypeId;

	window.open(
	url
	);

}
