var deviceInfosPageData = "";
function showList() {
    var toolsHtml = '<div class="pull-left">';
    toolsHtml += '<div class="form-group form-inline">';
    toolsHtml += '<div class="btn-group">';
    toolsHtml += '<button type="button" class="btn btn-default" title="增加" onclick=addDeviceInfo(""); data-toggle="modal" data-target="#deviceInfoAddWin"><i class="fa fa-file-o"></i> 新建</button> &nbsp;';
    toolsHtml += '<button type="button" class="btn btn-default" onclick="showList()" title="刷新"><i class="fa fa-refresh"></i> 刷新</button>';
    toolsHtml += '<input type="hidden" class="btn bg-olive btn-xs" id="deviceInfoId" value="" >';
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
    htmlSearch += '<input type="text" id="sname" class="form-control" placeholder="设备名称"> &nbsp;';
    htmlSearch += '</div>';
    htmlSearch += '<div class="input-group  row margin">';
    htmlSearch += '<input type="text" id="snickname" class="form-control" placeholder="设备昵称"> &nbsp;';
    htmlSearch += '</div>';
    htmlSearch += '<div class="input-group  row margin">';
    htmlSearch += '<input type="text" id="sdeviceSn" class="form-control" placeholder="设备序列号"> &nbsp;';
    htmlSearch += '</div>';
    htmlSearch += '</div>';
    htmlSearch += '</div>';

    htmlSearch += '<div class="form-group">';
    htmlSearch += '<button type="button" class="btn btn-block btn-success" title="查询" onclick="showDeviceInfosList();"> 查询</button>';
    htmlSearch += '</div>';
    htmlSearch += toolsHtml;
    var htmlTable = '<table id="dataList" class="table table-bordered table-striped table-hover dataTable">';
    htmlTable += '<thead>';
    htmlTable += '<tr>';
    htmlTable += '<th class="text-center">设备名称</th>';
    htmlTable += '<th class="text-center">设备昵称</th>';
    htmlTable += '<th class="text-center">设备序列号</th>';
    htmlTable += '<th class="text-center">设备组网协议</th>';
    htmlTable += '<th class="text-center">设备种类</th>';
    htmlTable += '<th class="text-center">在线状态</th>';
    htmlTable += '<th class="text-center">启用状态</th>';
    htmlTable += '<th class="text-center">操作</th>';
    htmlTable += '</tr>';
    htmlTable += '</thead>';
    htmlTable += '<tbody id="tbody">';

    htmlTable += '</tbody>';
    htmlTable += '</table>';
    htmlTable += '</div>';
    htmlTable += '</div>';

    var htmlfooter = "";
     deviceInfosPageData = searchDeviceInfoList(1); 
    htmlfooter += '<div class="box-footer" id="footer-box">';
    htmlfooter += '<div class="pull-left">';
    htmlfooter += '<div class="form-group form-inline">';
    htmlfooter += '总共'+deviceInfosPageData.totalPages+'页，共'+deviceInfosPageData.totalElements+'条数据。 每页';
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
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showDeviceInfosList(1);" aria-label="Previous">首页</a>';
    htmlfooter += '</li>';
    var prevNum = 1;
    prevNum = deviceInfosPageData.pageNumber <= 2 ? 1 : (deviceInfosPageData.pageNumber - 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showDeviceInfosList('+prevNum+');">上一页</a></li>';
    var j = deviceInfosPageData.pageNumber / 5.0;
    var k = j+1;
    if(deviceInfosPageData.pageNumber % 5 == 0) {
        j--;
    }
    var tm = deviceInfosPageData.totalPages / 5.0;
    if(tm >= 1) {

        for (var i = 5 * j + 1; i <= 5 * k; i++) {
            htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showDeviceInfosList('+i+');">'+i+'</a></li>';
        }
    } else {
        for (var i = 1; i <= deviceInfosPageData.totalPages; i++) {
            htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showDeviceInfosList('+i+');">'+i+'</a></li>';
        }
    }
    
    var nextNUm = deviceInfosPageData.totalPages;
    nextNUm = deviceInfosPageData.pageNumber >= deviceInfosPageData.totalPages ? deviceInfosPageData.totalPages : (deviceInfosPageData.pageNumber + 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showDeviceInfosList('+nextNUm+');">下一页</a></li>';
    htmlfooter += '<li>';
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showDeviceInfosList('+deviceInfosPageData.totalPages+');" aria-label="Next">尾页</a>';
    htmlfooter += '</li>';
    htmlfooter += '</ul>';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
    $('#content').html(htmlSearch+htmlTable+htmlfooter);
    showDeviceInfosReady(deviceInfosPageData);
    htmlDeviceInfoModal();
}

function footerBox(deviceInfosPageData) {
    var htmlfooter = "";
    htmlfooter += '<div class="pull-left">';
    htmlfooter += '<div class="form-group form-inline">';
    htmlfooter += '总共'+deviceInfosPageData.totalPages+'页，共'+deviceInfosPageData.totalElements+'条数据。 每页';
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
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showDeviceInfosList(1);" aria-label="Previous">首页</a>';
    htmlfooter += '</li>';
    var prevNum = 1;
    prevNum = deviceInfosPageData.pageNumber <= 2 ? 1 : (deviceInfosPageData.pageNumber - 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showDeviceInfosList('+prevNum+');">上一页</a></li>';
    var j = deviceInfosPageData.pageNumber / 5.0;
    var k = j+1;
    if(deviceInfosPageData.pageNumber % 5 == 0) {
        j--;
    }
    var tm = deviceInfosPageData.totalPages / 5.0;
    if(tm >= 1) {

        for (var i = 5 * j + 1; i <= 5 * k; i++) {
            htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showDeviceInfosList('+i+');">'+i+'</a></li>';
        }
    } else {
        for (var i = 1; i <= deviceInfosPageData.totalPages; i++) {
            htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showDeviceInfosList('+i+');">'+i+'</a></li>';
        }
    }
    
    var nextNUm = deviceInfosPageData.totalPages;
    nextNUm = deviceInfosPageData.pageNumber >= deviceInfosPageData.totalPages ? deviceInfosPageData.totalPages : (deviceInfosPageData.pageNumber + 1);
    htmlfooter += '<li><a href="JavaScript:void(0);" onclick="showDeviceInfosList('+nextNUm+');">下一页</a></li>';
    htmlfooter += '<li>';
    htmlfooter += '<a href="JavaScript:void(0);" onclick="showDeviceInfosList('+deviceInfosPageData.totalPages+');" aria-label="Next">尾页</a>';
    htmlfooter += '</li>';
    htmlfooter += '</ul>';
    htmlfooter += '</div>';
    htmlfooter += '</div>';
    return htmlfooter; 
}

function searchDeviceInfoList(pageNumber) {
    var txtDeviceInfoname = $('#sname').val();
    var snickname = $('#snickname').val();
    var sdeviceSN = $('#sdeviceSN').val();

    var pageSize = $('#pageSize option selected').val();
    var storage = window.localStorage;
    var username = storage.getItem('username');
    var ctx = storage.getItem("ctx");
    var rData = "";

    if(username == "admin") {
        var searchData = {"name":txtDeviceInfoname,"deviceS":sdeviceSN,"nickname":snickname,"pageSize":pageSize,"pageNumber":pageNumber};
        $.ajax({
                type: "POST",
                dataType: "json",
                async: false,
                beforeSend: function(XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
                },
                contentType: "application/json;charset=utf-8",
                url:ctx+'api/ds/deviceInfo/v1/findPage',
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
        var searchData = {"name":txtDeviceInfoname,"email":email,"phone":phone,"status":status,"pageSize":pageSize,"pageNumber":pageNumber};
        $.ajax({
                type: "POST",
                dataType: "json",
                async: false,
                beforeSend: function(XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
                },
                contentType: "application/json;charset=utf-8",
                url:ctx+'api/ds/deviceInfo/v1/findPage',
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

function showDeviceInfosList(pageNumber) {
    deviceInfosPageData = searchDeviceInfoList(pageNumber);
    var htmlData = "";
    if(deviceInfosPageData != "") {
        $.each(deviceInfosPageData.contents, function(i,item){
            htmlData += '<tr>';
            htmlData += '<td>'+item.name+'</td>';
            htmlData += '<td>'+item.nickname+'</td>';
            htmlData += '<td>'+item.deviceSn+'</td>';
            htmlData += '<td>'+item.networkingProtocol+'</td>';
            htmlData += '<td>'+item.strGatewayFlag+'</td>';
            htmlData += '<td>'+item.strOnlineStatus+'</td>';
            htmlData += '<td>'+item.strEnableFlag+'</td>';
            htmlData += '<td class="text-center">'
            htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=editDeviceInfo("'+item.strId+'"); data-toggle="modal" data-target="#deviceInfoAddWin">修改</button>&nbsp;';
            htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=delDeviceInfo("'+item.strId+'"); >删除</button>&nbsp;';
            htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=showDeviceData("'+item.strId+'"); >设备影子</button>';
            htmlData += '</td>';
            htmlData += '</tr>';
        });  
    }
    $('#tbody').html(htmlData);
    var footBox = footerBox(deviceInfosPageData);
    $('#footer-box').html(footBox);
}

function showDeviceInfosReady(deviceInfosPageData) {
    var htmlData = "";
    if(deviceInfosPageData != "") {
        $.each(deviceInfosPageData.contents, function(i,item){
            htmlData += '<tr>';
            htmlData += '<td>'+item.name+'</td>';
            htmlData += '<td>'+item.nickname+'</td>';
            htmlData += '<td>'+item.deviceSn+'</td>';
            htmlData += '<td>'+item.networkingProtocol+'</td>';
            htmlData += '<td>'+item.strGatewayFlag+'</td>';
            htmlData += '<td>'+item.strOnlineStatus+'</td>';
            htmlData += '<td>'+item.strEnableFlag+'</td>';
            htmlData += '<td class="text-center">'
            htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=editDeviceInfo("'+item.strId+'"); data-toggle="modal" data-target="#deviceInfoAddWin">修改</button>&nbsp;';
            htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=delDeviceInfo("'+item.strId+'"); >删除</button>&nbsp;';
            htmlData += '<button type="button" class="btn bg-olive btn-xs" onclick=showDeviceData("'+item.strId+'"); >设备影子</button>';
            htmlData += '</td>';
            htmlData += '</tr>';
        });  
    }
    $('#tbody').html(htmlData);
}

function htmlDeviceInfoModal() {
    var deviceInfoEdit = "";
    deviceInfoEdit += '<div id="deviceInfoAddWin" class="modal" role="dialog">';
    deviceInfoEdit += '<div class="modal-dialog modal-lg">';
    deviceInfoEdit += '<div class="modal-content">';
    deviceInfoEdit += '<div class="modal-header">';
    deviceInfoEdit += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    deviceInfoEdit += '<h4 class="modal-title" id="ttl">增加设备</h4>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '<div class="modal-body">';
    deviceInfoEdit += '<div class="box-body">';
    deviceInfoEdit += '<div class="form-horizontal">';
    deviceInfoEdit += '<div class="form-group">';
    deviceInfoEdit += '<div class="col-md-2 title">设备名称</div>';
    deviceInfoEdit += '<div class="col-md-4 data">';
    deviceInfoEdit += '<input type="text" id="aname" class="form-control" placeholder="请输入设备名称（必填）" value="">';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '<div class="form-group">';
    deviceInfoEdit += '<div class="col-md-2 title">设备昵称</div>';
    deviceInfoEdit += '<div class="col-md-4 data">';
    deviceInfoEdit += '<input type="text" id="anickname" class="form-control" placeholder="请输入昵称" value="">';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '<div class="form-group">';
    deviceInfoEdit += '<div class="col-md-2 title">设备SN号</div>';
    deviceInfoEdit += '<div class="col-md-4 data">';
    deviceInfoEdit += '<input type="text" id="adeviceSN" class="form-control" placeholder="请输入设备SN号" value="">';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '<div class="form-group">';
    deviceInfoEdit += '<div class="col-md-2 title">设备型号</div>';
    deviceInfoEdit += '<div class="col-md-4 data">';
    deviceInfoEdit += '<input type="text" id="aequipmentModel" class="form-control" placeholder="请输入设备型号" value="">';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '<div class="col-md-2 title">设备网方式</div>';
    deviceInfoEdit += '<div class="col-md-10 data">';
    deviceInfoEdit += '<div class="form-group form-inline">';
    deviceInfoEdit += '<div class="radio"><label><input type="radio" id="anetworkingProtocol" name="anetworkingProtocol" value="NB-IoT" checked>NB-IoT</label></div>';
    deviceInfoEdit += '<div class="radio"><label><input type="radio" id="anetworkingProtocol"  name="anetworkingProtocol" value="LoRa">LoRa</label></div>';
    deviceInfoEdit += '<div class="radio"><label><input type="radio" id="anetworkingProtocol"  name="anetworkingProtocol" value="433">433</label></div>';
    deviceInfoEdit += '<div class="radio"><label><input type="radio" id="anetworkingProtocol"  name="anetworkingProtocol" value="Wi-Fi">Wi-Fi</label></div>';
    deviceInfoEdit += '<div class="radio"><label><input type="radio" id="anetworkingProtocol"  name="anetworkingProtocol" value="BLE">BLE</label></div>';
    deviceInfoEdit += '<div class="radio"><label><input type="radio" id="anetworkingProtocol"  name="anetworkingProtocol" value="ZigBee">ZigBee</label></div>';
    deviceInfoEdit += '<div class="radio"><label><input type="radio" id="anetworkingProtocol"  name="anetworkingProtocol" value="Z-Wave">Z-Wave</label></div>';
    deviceInfoEdit += '<div class="radio"><label><input type="radio" id="anetworkingProtocol"  name="anetworkingProtocol" value="485">485</label></div>';
    deviceInfoEdit += '<div class="radio"><label><input type="radio" id="anetworkingProtocol"  name="anetworkingProtocol" value=" Ethernet">以太网</label></div>';
    deviceInfoEdit += '<div class="radio"><label><input type="radio" id="anetworkingProtocol"  name="anetworkingProtocol" value="IR">红外</label></div>';
    deviceInfoEdit += '<div class="radio"><label><input type="radio" id="anetworkingProtocol"  name="anetworkingProtocol" value="RFID">RFID</label></div>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '<div class="form-group">';
    deviceInfoEdit += '<div class="col-md-2 title">固件名称</div>';
    deviceInfoEdit += '<div class="col-md-4 data">';
    deviceInfoEdit += '<input type="text" id="afirmwareName" class="form-control" placeholder="请输入固件名称" value="">';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '<div class="form-group">';
    deviceInfoEdit += '<div class="col-md-2 title">固件版本</div>';
    deviceInfoEdit += '<div class="col-md-4 data">';
    deviceInfoEdit += '<input type="text" id="afirmwareVersion" class="form-control" placeholder="请输入固件版本" value="">';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '<div class="form-group">';
    deviceInfoEdit += '<div class="col-md-2 title">硬件版本</div>';
    deviceInfoEdit += '<div class="col-md-4 data">';
    deviceInfoEdit += '<input type="text" id="ahardwareVersion" class="form-control" placeholder="请输入硬件版本" value="">';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '<div class="col-md-2 title">是否网关设备</div>';
    deviceInfoEdit += '<div class="col-md-10 data">';
    deviceInfoEdit += '<div class="form-group form-inline">';
    deviceInfoEdit += '<div class="radio"><label><input type="radio" id="agatewayFlag" name="agatewayFlag" value="true">是</label></div>';
    deviceInfoEdit += '<div class="radio"><label><input type="radio" id="agatewayFlag"  name="agatewayFlag" value="false" checked>否</label></div>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '<div class="col-md-2 title">设备启用状态</div>';
    deviceInfoEdit += '<div class="col-md-10 data">';
    deviceInfoEdit += '<div class="form-group form-inline">';
    deviceInfoEdit += '<div class="radio"><label><input type="radio" id="aenableFlag" name="aenableFlag" value="true" checked>启用</label></div>';
    deviceInfoEdit += '<div class="radio"><label><input type="radio" id="aenableFlag"  name="aenableFlag" value="false">禁用</label></div>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '<div class="col-md-2 title">设备接入类型</div>';
    deviceInfoEdit += '<div class="col-md-10 data">';
    deviceInfoEdit += '<div class="form-group form-inline">';
    deviceInfoEdit += '<div class="radio"><label><input type="radio" id="adeviceAccessType" name="adeviceAccessType" value="1" checked>直接接入</label></div>';
    deviceInfoEdit += '<div class="radio"><label><input type="radio" id="adeviceAccessType"  name="adeviceAccessType" value="2">第三方平台接入</label></div>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '<div class="form-group">';
    deviceInfoEdit += '<div class="col-md-2 title">网关</div>';
    deviceInfoEdit += '<div class="col-md-4 data">';
    deviceInfoEdit += '<select id="agatewayDeviceId" class="form-control">';
    deviceInfoEdit += '<option value="">请选择网关</option>';
    deviceInfoEdit += searchGatewaysData();
    deviceInfoEdit += '</select>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '<div class="form-group">';
    deviceInfoEdit += '<div class="col-md-2 title">所属产品</div>';
    deviceInfoEdit += '<div class="col-md-4 data">';
    deviceInfoEdit += '<select id="aproductId" class="form-control">';
    deviceInfoEdit += '<option value="">请选择产品</option>';
    deviceInfoEdit += searchProductsData();
    deviceInfoEdit += '</select>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '<div class="modal-footer">';
    deviceInfoEdit += '<button type="button" class="btn bg-default" data-dismiss="modal" >关闭</button>';
    deviceInfoEdit += '<button type="button" class="btn bg-default" data-dismiss="modal" onclick="saveDeviceInfo()">保存</button>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '</div>';
    deviceInfoEdit += '</div>';
    $('#content').append(deviceInfoEdit);
}

function addDeviceInfo(deviceInfoId) {
    $('#ttl').html("增加设备");
    $('#deviceInfoId').val(deviceInfoId);
    $('#doingType').val("add");
}

function editDeviceInfo(deviceInfoId) {
    var deviceInfoData = searchDeviceInfo(deviceInfoId);
    $('#ttl').html("修改设备");
    $('#deviceInfoId').val(deviceInfoData.strId);
    $('#aname').val(deviceInfoData.name);
    $('#anickname').val(deviceInfoData.nickname);
    $('#adeviceSN').val(deviceInfoData.deviceSn);
    $('#aequipmentModel').val(deviceInfoData.equipmentModel);
    if(deviceInfoData.networkingProtocol == "NB-IoT") {
        $("input:radio[name='anetworkingProtocol']").eq(0).attr('checked','true');
    }
    if(deviceInfoData.networkingProtocol == "LoRa") {
        $("input:radio[name='anetworkingProtocol']").eq(1).attr('checked','true');
    }
    if(deviceInfoData.networkingProtocol == "433") {
        $("input:radio[name='anetworkingProtocol']").eq(2).attr('checked','true');
    }
    if(deviceInfoData.networkingProtocol == "Wi-Fi") {
        $("input:radio[name='anetworkingProtocol']").eq(3).attr('checked','true');
    }
    if(deviceInfoData.networkingProtocol == "BLE") {
        $("input:radio[name='anetworkingProtocol']").eq(4).attr('checked','true');
    }
    if(deviceInfoData.networkingProtocol == "ZigBee") {
        $("input:radio[name='anetworkingProtocol']").eq(5).attr('checked','true');
    }
    if(deviceInfoData.networkingProtocol == "Z-Wave") {
        $("input:radio[name='anetworkingProtocol']").eq(6).attr('checked','true');
    }
    if(deviceInfoData.networkingProtocol == "485") {
        $("input:radio[name='anetworkingProtocol']").eq(7).attr('checked','true');
    }
    if(deviceInfoData.networkingProtocol == "Ethernet") {
        $("input:radio[name='anetworkingProtocol']").eq(8).attr('checked','true');
    }
    if(deviceInfoData.networkingProtocol == "IR") {
        $("input:radio[name='anetworkingProtocol']").eq(9).attr('checked','true');
    }
    if(deviceInfoData.networkingProtocol == "RFID") {
        $("input:radio[name='anetworkingProtocol']").eq(10).attr('checked','true');
    }
    $('#afirmwareName').val(deviceInfoData.firmwareName);
    $('#afirmwareVersion').val(deviceInfoData.firmwareVersion);
    $('#ahardwareVersion').val(deviceInfoData.hardwareVersion);
    
    if(deviceInfoData.gatewayFlag == true || deviceInfoData.gatewayFlag == "true") {
        $("input:radio[name='agatewayFlag']").eq(0).attr('checked','true');
    }
    if(deviceInfoData.gatewayFlag == false || deviceInfoData.gatewayFlag == "false") {
        $("input:radio[name='agatewayFlag']").eq(1).attr('checked','true');
    }
    if(deviceInfoData.enableFlag == true || deviceInfoData.enableFlag == "true") {
        $("input:radio[name='aenableFlag']").eq(0).attr('checked','true');
    }
    if(deviceInfoData.enableFlag == false || deviceInfoData.enableFlag == "false") {
        $("input:radio[name='aenableFlag']").eq(1).attr('checked','true');
    }
    if(deviceInfoData.deviceAccessType == "1") {
        $("input:radio[name='adeviceAccessType']").eq(0).attr('checked','true');
    }
    if(deviceInfoData.deviceAccessType == "2") {
        $("input:radio[name='adeviceAccessType']").eq(1).attr('checked','true');
    }
    $('#agatewayDeviceId').val(deviceInfoData.strGatewayDeviceId);
    $('#aproductId').val(deviceInfoData.strProductId);

    $('#doingType').val("modify");
}

function searchDeviceInfo(deviceInfoId) {
    var deviceInfoData = "";
    var storage = window.localStorage;
    var ctx = storage.getItem("ctx");
    var dataJson = {"id": deviceInfoId};
    $.ajax({
            type: "POST",
            dataType: "json",
            async: false,
            beforeSend: function(XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
            },
            contentType: "application/json;charset=utf-8",
            url:ctx+'api/ds/deviceInfo/v1/findOne',
            data:JSON.stringify(dataJson),
            success: function(resData){
                if(resData.code == 0) {
                    deviceInfoData = resData.data;
                } else {
                    alert(resData.code+resData.msg);

                }
                
            },
            error: function(XMLHttpRequest,status, error) {
                console.log("xhr======"+JSON.stringify(XMLHttpRequest));
            }
        });
    return deviceInfoData;
}

function saveDeviceInfo() {
    var deviceInfoId = $('#deviceInfoId').val();
    var aname = $('#aname').val();
    var anickname = $('#anickname').val();
    var adeviceSN = $('#adeviceSN').val();
    var aequipmentModel = $('#aequipmentModel').val();
    var anetworkingProtocol = $('input[id="anetworkingProtocol"]:checked').val();
    var afirmwareName = $('#afirmwareName').val();
    var afirmwareVersion = $('#afirmwareVersion').val();
    var ahardwareVersion = $('#ahardwareVersion').val();
    var agatewayFlag = $('input[id="agatewayFlag"]:checked').val();
    var aenableFlag = $('input[id="aenableFlag"]:checked').val();
    var adeviceAccessType = $('input[id="adeviceAccessType"]:checked').val();
    var agatewayDeviceId = $('#agatewayDeviceId option:selected').val();
    var aproductId = $('#aproductId option:selected').val();
    var doingType = $('#doingType').val();
    deviceInfoId = deviceInfoId == "" ? null : deviceInfoId;

    if(aname == null || aname == "") {
        alert("设备名称不能为空！");
        return;
    }

    var tmpUrl = doingType == "add" ? "api/ds/deviceInfo/v1/add" : "api/ds/deviceInfo/v1/update";

    var dataJson = {"id": deviceInfoId,"name": aname,"nickname":anickname,"deviceSn":adeviceSN,
    "equipmentModel":aequipmentModel,"networkingProtocol":anetworkingProtocol,"firmwareName":afirmwareName,
    "firmwareVersion":afirmwareVersion,"hardwareVersion":ahardwareVersion,
    "gatewayFlag":agatewayFlag,"enableFlag":aenableFlag,"deviceAccessType":adeviceAccessType,
    "gatewayDeviceId":agatewayDeviceId,"productId":aproductId};
    console.log("dataJson==="+JSON.stringify(dataJson));
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

function delDeviceInfo(id) {
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
        url:ctx+'api/ds/deviceInfo/v1/logicalDelete',
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

function searchGatewaysData() {
    var storage = window.localStorage;
    var ctx = storage.getItem("ctx");
    var gatewayDataList = "";
    $.ajax({
        type: "GET",
        dataType: "json",
        async: false,
        beforeSend: function(XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
        },
        contentType: "application/json;charset=utf-8",
        url:ctx+'api/ds/deviceInfo/v1/findAllGateway',
        success: function(resData){
            if(resData.code == 0) {
                // alert(resData.code+resData.msg);
                $.each(resData.data, function(i,item){
                    gatewayDataList += '<option value="'+item.strId+'">'+item.name+'</option>';
                }); 
            } else {
                alert(resData.code+resData.msg);

            }
            
        },
        error: function(XMLHttpRequest,status, error) {
            console.log("xhr======"+JSON.stringify(XMLHttpRequest));
        }
    });
    return gatewayDataList;
}

function searchProductsData() {
    var storage = window.localStorage;
    var ctx = storage.getItem("ctx");
    var productDataList = "";
    $.ajax({
        type: "GET",
        dataType: "json",
        async: false,
        beforeSend: function(XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
        },
        contentType: "application/json;charset=utf-8",
        url:ctx+'api/pc/product/v1/findAll',
        success: function(resData){
            if(resData.code == 0) {
                // alert(resData.code+resData.msg);
                $.each(resData.data, function(i,item){
                    productDataList += '<option value="'+item.strId+'">'+item.chineseName+'</option>';
                }); 
            } else {
                alert(resData.code+resData.msg);

            }
            
        },
        error: function(XMLHttpRequest,status, error) {
            console.log("xhr======"+JSON.stringify(XMLHttpRequest));
        }
    });
    return productDataList;
}

function showDeviceData(deviceId) {
    var title = "设备采集数据";
    var width = 800;
    var height = 600;
    var url = './content/ds/deviceNewData/v1/deviceNewDataList.html?deviceId='+deviceId;

    window.open(
    url
    );

}

