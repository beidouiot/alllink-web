var productsPageData = "";
function showList() {
    var toolsHtml = '<div class="pull-left">';
    toolsHtml += '<div class="form-group form-inline">';
    toolsHtml += '<div class="btn-group">';
    toolsHtml += '<button type="button" class="btn btn-default" title="增加" onclick=addProduct(); data-toggle="modal" data-target="#productAddWin"><i class="fa fa-file-o"></i> 新建</button> &nbsp;';
    toolsHtml += '<button type="button" class="btn btn-default" onclick="showList()" title="刷新"><i class="fa fa-refresh"></i> 刷新</button>';
    toolsHtml += '<input type="hidden" class="btn bg-olive btn-xs" id="productId" value="" >';
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
    htmlSearch += '<input type="text" id="sChineseName" class="form-control" placeholder="产品中文名称"> &nbsp;';
    htmlSearch += '</div>';
    htmlSearch += '<div class="input-group  row margin">';
    htmlSearch += '<input type="text" id="sname" class="form-control" placeholder="产品名称"> &nbsp;';
    htmlSearch += '</div>';
    htmlSearch += '<div class="input-group  row margin">';
    htmlSearch += '<input type="text" id="sdescr" class="form-control" placeholder="描述"> &nbsp;';
    htmlSearch += '</div>';
    htmlSearch += '</div>';
    htmlSearch += '</div>';

    htmlSearch += '<div class="form-group">';
    htmlSearch += '<button type="button" class="btn btn-block btn-success" title="查询" onclick="showProductsList();"> 查询</button>';
    htmlSearch += '</div>';
    htmlSearch += toolsHtml;
    var htmlTable = '<table id="dataList" class="table table-bordered table-striped table-hover dataTable">';
    htmlTable += '<thead>';
    htmlTable += '<tr>';
    htmlTable += '<th class="text-center">产品中文名称</th>';
    htmlTable += '<th class="text-center">产品名称</th>';
    htmlTable += '<th class="text-center">产品设备类型</th>';
    htmlTable += '<th class="text-center">产品组网方式</th>';
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
     productsPageData = searchProductList(1);   
    htmlfooter += '<div class="box-footer" id="footer-box">';
    htmlfooter += '<div class="pull-left">';
    htmlfooter += '<div class="form-group form-inline">';
    htmlfooter += '总共'+productsPageData.totalPages+'页，共'+productsPageData.totalElements+'条数据。 每页';
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
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showProductsList(1);" aria-label="Previous">首页</a>';
    htmlfooter += '</li>';
    var prevNum = 1;
    prevNum = productsPageData.pageNumber <= 2 ? 1 : (productsPageData.pageNumber - 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showProductsList('+prevNum+');">上一页</a></li>';
    var j = productsPageData.pageNumber / 5.0;
    var k = j+1;
    if(productsPageData.pageNumber % 5 == 0) {
        j--;
    }
    var tm = productsPageData.totalPages / 5.0;
    if(tm >= 1) {

        for (var i = 5 * j + 1; i <= 5 * k; i++) {
            htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showProductsList('+i+');">'+i+'</a></li>';
        }
    } else {
        for (var i = 1; i <= productsPageData.totalPages; i++) {
            htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showProductsList('+i+');">'+i+'</a></li>';
        }
    }
    
    var nextNUm = productsPageData.totalPages;
    nextNUm = productsPageData.pageNumber >= productsPageData.totalPages ? productsPageData.totalPages : (productsPageData.pageNumber + 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showProductsList('+nextNUm+');">下一页</a></li>';
    htmlfooter += '<li>';
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showProductsList('+productsPageData.totalPages+');" aria-label="Next">尾页</a>';
    htmlfooter += '</li>';
    htmlfooter += '</ul>';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
    var tmp = '<div style="display:none;overflow:hidden;padding:3px" id="div1"><iframe src="./content/pc/product/productModel.html" frameborder="no" border="0" marginwidth="0" marginheight="0" id="prodcutDetailSrc"  scrolling="no"  width="100%" height="100%"></iframe></div>';
    $('#content').html(htmlSearch+htmlTable+htmlfooter+tmp);
    showProductsReady(productsPageData);
    htmlProductModal();
}

function footerBox(productsPageData) {
    var htmlfooter = "";
    htmlfooter += '<div class="pull-left">';
    htmlfooter += '<div class="form-group form-inline">';
    htmlfooter += '总共'+productsPageData.totalPages+'页，共'+productsPageData.totalElements+'条数据。 每页';
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
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showProductsList(1);" aria-label="Previous">首页</a>';
    htmlfooter += '</li>';
    var prevNum = 1;
    prevNum = productsPageData.pageNumber <= 2 ? 1 : (productsPageData.pageNumber - 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showProductsList('+prevNum+');">上一页</a></li>';
    var j = productsPageData.pageNumber / 5.0;
    var k = j+1;
    if(productsPageData.pageNumber % 5 == 0) {
        j--;
    }
    var tm = productsPageData.totalPages / 5.0;
    if(tm >= 1) {

        for (var i = 5 * j + 1; i <= 5 * k; i++) {
            htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showProductsList('+i+');">'+i+'</a></li>';
        }
    } else {
        for (var i = 1; i <= productsPageData.totalPages; i++) {
            htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showProductsList('+i+');">'+i+'</a></li>';
        }
    }
    
    var nextNUm = productsPageData.totalPages;
    nextNUm = productsPageData.pageNumber >= productsPageData.totalPages ? productsPageData.totalPages : (productsPageData.pageNumber + 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showProductsList('+nextNUm+');">下一页</a></li>';
    htmlfooter += '<li>';
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showProductsList('+productsPageData.totalPages+');" aria-label="Next">尾页</a>';
    htmlfooter += '</li>';
    htmlfooter += '</ul>';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
    return htmlfooter; 
}

function searchProductList(pageNumber) {
    var sname = $('#sname').val();
    var sChineseName = $('#sChineseName').val();
    var sdescr = $('#sdescr').val();

    var pageSize = $('#pageSize option selected').val();
    var storage = window.localStorage;
    var username = storage.getItem('username');
    var ctx = storage.getItem("ctx");
    var rData = "";

    var searchData = {"name":sname,"chineseName":sChineseName,"descr":sdescr,"pageSize":pageSize,"pageNumber":pageNumber};
    $.ajax({
            type: "POST",
            dataType: "json",
            async: false,
            beforeSend: function(XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
            },
            contentType: "application/json;charset=utf-8",
            url:ctx+'api/pc/product/v1/findPage',
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

function showProductsList(pageNumber) {
    productsPageData = searchProductList(pageNumber);
    var htmlData = "";
    if(productsPageData != "") {
        $.each(productsPageData.contents, function(i,item){
            htmlData += '<tr>';
            htmlData += '<td>'+item.chineseName+'</td>';
            htmlData += '<td>'+item.name+'</td>';
            htmlData += '<td>'+item.strProductDeviceType+'</td>';
            htmlData += '<td>'+item.networkingProtocol+'</td>';
            htmlData += '<td>'+item.descr+'</td>';
            htmlData += '<td class="text-center">'
            htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=editProduct("'+item.strId+'"); data-toggle="modal" data-target="#productAddWin">修改</button>&nbsp;';
            htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=delProduct("'+item.strId+'"); >删除</button>&nbsp;';
            htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=productModel("'+item.strId+'"); >产品物模型</button>';
            htmlData += '</td>';
            htmlData += '</tr>';
        });  
    }
    $('#tbody').html(htmlData);
    var footBox = footerBox(productsPageData);
    $('#footer-box').html(footBox);
}

function showProductsReady(productsPageData) {
    var htmlData = "";
    if(productsPageData != "") {
        $.each(productsPageData.contents, function(i,item){
            htmlData += '<tr>';
            htmlData += '<td>'+item.chineseName+'</td>';
            htmlData += '<td>'+item.name+'</td>';
            htmlData += '<td>'+item.strProductDeviceType+'</td>';
            htmlData += '<td>'+item.networkingProtocol+'</td>';
            htmlData += '<td>'+item.descr+'</td>';
            htmlData += '<td class="text-center">'
            htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=editProduct("'+item.strId+'"); data-toggle="modal" data-target="#productAddWin">修改</button>&nbsp;';
            htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=delProduct("'+item.strId+'"); >删除</button>&nbsp;';
            htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=productModel("'+item.strId+'"); >产品物模型</button>';
            htmlData += '</td>';
            htmlData += '</tr>';
        });  
    }
    $('#tbody').html(htmlData);
}

function htmlProductModal() {

    var productEdit = "";
    productEdit += '<div id="productAddWin" class="modal" role="dialog">';
    productEdit += '<div class="modal-dialog modal-lg">';
    productEdit += '<div class="modal-content">';
    productEdit += '<div class="modal-header">';
    productEdit += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    productEdit += '<h4 class="modal-title" id="ttl">增加产品</h4>';
    productEdit += '</div>';
    productEdit += '<div class="modal-body">';
    productEdit += '<div class="box-body">';
    productEdit += '<div class="form-horizontal">';
    productEdit += '<div class="form-group">';
    productEdit += '<div class="col-md-2 title">产品名称</div>';
    productEdit += '<div class="col-md-4 data">';
    productEdit += '<input type="text" id="aname" class="form-control" placeholder="请输入产品名称（必填）" value="">';
    productEdit += '</div>';
    productEdit += '</div>';
    productEdit += '<div class="form-group">';
    productEdit += '<div class="col-md-2 title">产品中文名称</div>';
    productEdit += '<div class="col-md-4 data">';
    productEdit += '<input type="text" id="achineseName" class="form-control" placeholder="请输入中文名称" value="">';
    productEdit += '</div>';
    productEdit += '</div>';
    productEdit += '<div class="col-md-2 title">产品设备类型</div>';
    productEdit += '<div class="col-md-10 data">';
    productEdit += '<div class="form-group form-inline">';
    productEdit += '<div class="radio"><label><input type="radio" id="productDeviceType" name="productDeviceType" value="11" checked>网关设备</label></div>';
    productEdit += '<div class="radio"><label><input type="radio" id="productDeviceType"  name="productDeviceType" value="2">网关子设备</label></div>';
    productEdit += '<div class="radio"><label><input type="radio" id="productDeviceType"  name="productDeviceType" value="3">独立设备</label></div>';
    productEdit += '</div>';
    productEdit += '</div>';
    productEdit += '<div class="col-md-2 title">产品通讯协议</div>';
    productEdit += '<div class="col-md-10 data">';
    productEdit += '<div class="form-group form-inline">';
    productEdit += '<div class="radio"><label><input type="radio" id="communicationProtocol" name="communicationProtocol" value="MQTT" checked>MQTT</label></div>';
    productEdit += '<div class="radio"><label><input type="radio" id="communicationProtocol"  name="communicationProtocol" value="HTTP">HTTP</label></div>';
    productEdit += '<div class="radio"><label><input type="radio" id="communicationProtocol"  name="communicationProtocol" value="CoAP">CoAP</label></div>';
    productEdit += '<div class="radio"><label><input type="radio" id="communicationProtocol"  name="communicationProtocol" value="TCP">TCP</label></div>';
    productEdit += '</div>';
    productEdit += '</div>';
    productEdit += '<div class="col-md-2 title">产品组网方式</div>';
    productEdit += '<div class="col-md-10 data">';
    productEdit += '<div class="form-group form-inline">';
    productEdit += '<div class="radio"><label><input type="radio" id="networkingProtocol" name="networkingProtocol" value="NB-IoT" checked>NB-IoT</label></div>';
    productEdit += '<div class="radio"><label><input type="radio" id="networkingProtocol"  name="networkingProtocol" value="LoRa">LoRa</label></div>';
    productEdit += '<div class="radio"><label><input type="radio" id="networkingProtocol"  name="networkingProtocol" value="433">433</label></div>';
    productEdit += '<div class="radio"><label><input type="radio" id="networkingProtocol"  name="networkingProtocol" value="Wi-Fi">Wi-Fi</label></div>';
    productEdit += '<div class="radio"><label><input type="radio" id="networkingProtocol"  name="networkingProtocol" value="BLE">BLE</label></div>';
    productEdit += '<div class="radio"><label><input type="radio" id="networkingProtocol"  name="networkingProtocol" value="ZigBee">ZigBee</label></div>';
    productEdit += '<div class="radio"><label><input type="radio" id="networkingProtocol"  name="networkingProtocol" value="Z-Wave">Z-Wave</label></div>';
    productEdit += '<div class="radio"><label><input type="radio" id="networkingProtocol"  name="networkingProtocol" value="485">485</label></div>';
    productEdit += '<div class="radio"><label><input type="radio" id="networkingProtocol"  name="networkingProtocol" value=" Ethernet">以太网</label></div>';
    productEdit += '<div class="radio"><label><input type="radio" id="networkingProtocol"  name="networkingProtocol" value="IR">红外</label></div>';
    productEdit += '<div class="radio"><label><input type="radio" id="networkingProtocol"  name="networkingProtocol" value="RFID">RFID</label></div>';
    productEdit += '</div>';
    productEdit += '</div>';
    productEdit += '<div class="col-md-2 title">复制标准物模型</div>';
    productEdit += '<div class="col-md-10 data">';
    productEdit += '<div class="form-group form-inline">';
    productEdit += '<div class="radio"><label><input type="radio" id="copyFlag" name="copyFlag" value="true" checked>是</label></div>';
    productEdit += '<div class="radio"><label><input type="radio" id="copyFlag"  name="copyFlag" value="false">否</label></div>';
    productEdit += '</div>';
    productEdit += '</div>';
    productEdit += '<div class="form-group">';
    productEdit += '<div class="col-md-2 title">产品类别</div>';
    productEdit += '<div class="col-md-4 data">';
    productEdit += '<select id="aproductTypeId" name="aproductTypeId" class="form-control" >';
    productEdit += '<option value="0">请选择产品类别</option>';
    var productTypes = getProductTypes();
        $.each(productTypes, function(i,item){
                productEdit += '<option value="'+item.strId+'">'+item.name+'</option>';
          });
   
    productEdit += '</select>';
    productEdit += '</div>';
    productEdit += '</div>';
    productEdit += '<div class="form-group">';
    productEdit += '<div class="col-md-2 title">描述</div>';
    productEdit += '<div class="col-md-4 data">';
    productEdit += '<textarea id="adescr" rows="3" class="form-control" placeholder="请输入描述" value=""></textarea>';
    productEdit += '</div>';
    productEdit += '</div>';
    productEdit += '</div>';
    productEdit += '</div>';
    productEdit += '</div>';
    productEdit += '<div class="modal-footer">';
    productEdit += '<button type="button" class="btn bg-default" data-dismiss="modal" >关闭</button>';
    productEdit += '<button type="button" class="btn bg-default" data-dismiss="modal" onclick="saveProduct()">保存</button>';
    productEdit += '</div>';
    productEdit += '</div>';
    productEdit += '</div>';
    productEdit += '</div>';
    $('#content').append(productEdit);
}

function getProductTypes() {
    var productTypeData = "";
    var storage = window.localStorage;
    var ctx = storage.getItem("ctx");
    var dataJson = {"id": productId};
    $.ajax({
                type: "GET",
                dataType: "json",
                async: false,
                beforeSend: function(XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
                },
                contentType: "application/json;charset=utf-8",
                url:ctx+'api/pc/productType/v1/findAll',
                // data:JSON.stringify(dataJson),
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

function addProduct() {
    $('#ttl').html("增加产品类别");
    $('#doingType').val("add");
}

function editProduct(productId) {
    alert("productId="+productId);
    var productData = searchProduct(productId);
    $('#ttl').html("修改产品类别");
    $('#aname').val(productData.name);
    $('#achineseName').val(productData.chineseName);
    $('#adescr').val(productData.descr);
    $('#productId').val(productId);
    $('productDeviceType')
    if(productData.productDeviceType == 1) {
        $("input:radio[name='productDeviceType']").eq(0).attr('checked','true');
    }
    if(productData.productDeviceType == 2) {
        $("input:radio[name='productDeviceType']").eq(1).attr('checked','true');
    }
    if(productData.productDeviceType == 3) {
        $("input:radio[name='productDeviceType']").eq(2).attr('checked','true');
    }
    if(productData.communicationProtocol == "MQTT") {
        $("input:radio[name='communicationProtocol']").eq(0).attr('checked','true');
    }
    if(productData.communicationProtocol == "HTTP") {
        $("input:radio[name='communicationProtocol']").eq(1).attr('checked','true');
    }
    if(productData.communicationProtocol == "CoAP") {
        $("input:radio[name='communicationProtocol']").eq(2).attr('checked','true');
    }
    if(productData.communicationProtocol == "TCP") {
        $("input:radio[name='communicationProtocol']").eq(3).attr('checked','true');
    }
    if(productData.networkingProtocol == "NB-IoT") {
        $("input:radio[name='networkingProtocol']").eq(0).attr('checked','true');
    }
    if(productData.networkingProtocol == "LoRa") {
        $("input:radio[name='networkingProtocol']").eq(1).attr('checked','true');
    }
    if(productData.networkingProtocol == "433") {
        $("input:radio[name='networkingProtocol']").eq(2).attr('checked','true');
    }
    if(productData.networkingProtocol == "Wi-Fi") {
        $("input:radio[name='networkingProtocol']").eq(3).attr('checked','true');
    }
    if(productData.networkingProtocol == "BLE") {
        $("input:radio[name='networkingProtocol']").eq(4).attr('checked','true');
    }
    if(productData.networkingProtocol == "ZigBee") {
        $("input:radio[name='networkingProtocol']").eq(5).attr('checked','true');
    }
    if(productData.networkingProtocol == "Z-Wave") {
        $("input:radio[name='networkingProtocol']").eq(6).attr('checked','true');
    }
    if(productData.networkingProtocol == "485") {
        $("input:radio[name='networkingProtocol']").eq(7).attr('checked','true');
    }
    if(productData.networkingProtocol == "Ethernet") {
        $("input:radio[name='networkingProtocol']").eq(8).attr('checked','true');
    }
    if(productData.networkingProtocol == "IR") {
        $("input:radio[name='networkingProtocol']").eq(9).attr('checked','true');
    }
    if(productData.networkingProtocol == "RFID") {
        $("input:radio[name='networkingProtocol']").eq(10).attr('checked','true');
    }
    if(productData.networkingProtocol == true) {
        $("input:radio[name='networkingProtocol']").eq(0).attr('checked','true');
    }
    if(productData.networkingProtocol == false) {
        $("input:radio[name='networkingProtocol']").eq(1).attr('checked','true');
    }
    $('#aproductTypeId').val(productData.strProductTypeId);


    $('#doingType').val("modify");
}

function searchProduct(productId) {
    var productData = "";
    var storage = window.localStorage;
    var ctx = storage.getItem("ctx");
    var dataJson = {"id": productId};
    $.ajax({
                type: "POST",
                dataType: "json",
                async: false,
                beforeSend: function(XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
                },
                contentType: "application/json;charset=utf-8",
                url:ctx+'api/pc/product/v1/findOne',
                data:JSON.stringify(dataJson),
                success: function(resData){
                    if(resData.code == 0) {
                        productData = resData.data;
                    } else {
                        alert(resData.code+resData.msg);

                    }
                    
                },
                error: function(XMLHttpRequest,status, error) {
                    console.log("xhr======"+JSON.stringify(XMLHttpRequest));
                }
            });
    return productData;
}

function saveProduct() {
    var productId = $('#productId').val();
    var aname = $('#aname').val();
    var achineseName = $('#achineseName').val();
    var adescr = $('#adescr').val();
    var doingType = $('#doingType').val();
    var productDeviceType = $('input[id="productDeviceType"]:checked').val();
    var communicationProtocol = $('input[id="communicationProtocol"]:checked').val();
    var networkingProtocol = $('input[id="networkingProtocol"]:checked').val();
    var copyFlag = $('input[id="copyFlag"]:checked').val();
    var productTypeId = $('#aproductTypeId option:selected').val();
    alert("productTypeId==="+productTypeId);
    productId = productId == "" ? null : productId;

    if(aname == null || aname == "") {
        alert("产品名称不能为空！");
        return;
    }



    var tmpUrl = doingType == "add" ? "api/pc/product/v1/add" : "api/pc/product/v1/update";

    var dataJson = {"id":productId,"name":aname,"chineseName":achineseName,"descr":adescr,"productDeviceType":productDeviceType,"communicationProtocol":communicationProtocol,"networkingProtocol":networkingProtocol,"copyFlag":copyFlag,"productTypeId":productTypeId};
    console.log("dataJson===11="+JSON.stringify(dataJson));
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

function delProduct(id) {
    alert("id="+id);
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
        url:ctx+'api/pc/product/v1/logicalDelete',
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

function productModel(productId) {
    var title = "产品物模型";
    var width = 800;
    var height = 600;
    var url = './content/pc/product/productModel.html?productId='+productId;

    window.open(
    url
    );

}
