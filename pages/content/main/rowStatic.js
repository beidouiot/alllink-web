$(function(){
	var rowStatic = "";
	var firstBox = "";
	var secondBox = "";
	var thirdBox = "";
	var fourthBox = "";
	firstBox = '<div class="col-lg-3 col-xs-6"><div class="small-box bg-aqua"><div class="inner">';
	firstBox += '<h3 id="oneNum">'+searchAllDevice()+'</h3><p id="oneText">设备总数</p></div>';
	firstBox += '<div class="icon"><i class="ion ion-bag"></i></div>';
	firstBox += '<a href="#" class="small-box-footer">详细 <i class="fa fa-arrow-circle-right"></i></a>';
	firstBox += '</div></div>';

	secondBox = '<div class="col-lg-3 col-xs-6"><div class="small-box bg-green">';
	secondBox += '<div class="inner"><h3 id="twoNum">'+searchAllActivationDevice()+'</h3>';
	secondBox += '<p id="twoText">激活设备数</p></div>';
	secondBox += '<div class="icon"><i class="ion ion-stats-bars"></i></div>';
	secondBox += '<a href="#" class="small-box-footer">详细 <i class="fa fa-arrow-circle-right"></i></a>';
	secondBox += '</div></div>';

	thirdBox = '<div class="col-lg-3 col-xs-6"><div class="small-box bg-yellow">';
	thirdBox += '<div class="inner"><h3 id="threeNum">'+searchAllOnlineDevice()+'</h3><p id="threeText">在线设备数</p></div>';
	thirdBox += '<div class="icon"><i class="ion ion-person-add"></i></div>';
	thirdBox += '<a href="#" class="small-box-footer">详细 <i class="fa fa-arrow-circle-right"></i></a>';
	thirdBox += '</div></div>';

	fourthBox = '<div class="col-lg-3 col-xs-6"><div class="small-box bg-red">';
	fourthBox += '<div class="inner"><h3 id="fourNum">'+searchAllProduct()+'</h3><p id="fourText">产品数</p></div>';
	fourthBox += '<div class="icon"><i class="ion ion-pie-graph"></i></div>';
	fourthBox += '<a href="all-ad-statistics-list.html" class="small-box-footer">详细 <i class="fa fa-arrow-circle-right"></i></a>';
	fourthBox += '</div></div>';

	rowStatic = firstBox + secondBox + thirdBox + fourthBox;
	$('#row-static').append(rowStatic);

});

function searchAllDevice() {
	var storage = window.localStorage;
	var ctx = storage.getItem("ctx");
	var dataJson = {"pageSize":1,"pageNumber":1};
	var countDevices = "";
	$.ajax({
	            type: "POST",
	            dataType: "json",
	            async: false,
	            beforeSend: function(XMLHttpRequest) {
	                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
	            },
	            contentType: "application/json;charset=utf-8",
	            url:ctx+'api/ds/deviceInfo/v1/findPage',
	            data:JSON.stringify(dataJson),
	            success: function(resData){
	            	if(resData.code == 0) {
	            		// console.log("resData=="+JSON.stringify(resData));
	            		countDevices = resData.data.totalElements;
	            		// console.log("roleData==55=="+JSON.stringify(roleData));
						// alert(resData.code+resData.msg);
	            	} else {
	            		alert(resData.code+resData.msg);
	            	}
	                
	            },
	            error: function(XMLHttpRequest,status, error) {
	                console.log("xhr======"+JSON.stringify(XMLHttpRequest));
	            }
	        });
	return countDevices;
}

function searchAllActivationDevice() {
	var storage = window.localStorage;
	var ctx = storage.getItem("ctx");
	var dataJson = {"pageSize":1,"pageNumber":1,"onlineStatus":3};
	var countDevices = "";
	$.ajax({
	            type: "POST",
	            dataType: "json",
	            async: false,
	            beforeSend: function(XMLHttpRequest) {
	                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
	            },
	            contentType: "application/json;charset=utf-8",
	            url:ctx+'api/ds/deviceInfo/v1/findPage',
	            data:JSON.stringify(dataJson),
	            success: function(resData){
	            	if(resData.code == 0) {
	            		// console.log("resData=="+JSON.stringify(resData));
	            		countDevices = resData.data.totalElements;
	            		// console.log("roleData==55=="+JSON.stringify(roleData));
						// alert(resData.code+resData.msg);
	            	} else {
	            		alert(resData.code+resData.msg);

	            	}
	                
	            },
	            error: function(XMLHttpRequest,status, error) {
	                console.log("xhr======"+JSON.stringify(XMLHttpRequest));
	            }
	        });
	return countDevices;
}

function searchAllOnlineDevice() {
	var storage = window.localStorage;
	var ctx = storage.getItem("ctx");
	var dataJson = {"pageSize":1,"pageNumber":1,"onlineStatus":1};
	var countDevices = "";
	$.ajax({
	            type: "POST",
	            dataType: "json",
	            async: false,
	            beforeSend: function(XMLHttpRequest) {
	                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
	            },
	            contentType: "application/json;charset=utf-8",
	            url:ctx+'api/ds/deviceInfo/v1/findPage',
	            data:JSON.stringify(dataJson),
	            success: function(resData){
	            	if(resData.code == 0) {
	            		// console.log("resData=="+JSON.stringify(resData));
	            		countDevices = resData.data.totalElements;
	            		// console.log("roleData==55=="+JSON.stringify(roleData));
						// alert(resData.code+resData.msg);
	            	} else {
	            		alert(resData.code+resData.msg);

	            	}
	                
	            },
	            error: function(XMLHttpRequest,status, error) {
	                console.log("xhr======"+JSON.stringify(XMLHttpRequest));
	            }
	        });
	return countDevices;
}

function searchAllProduct() {
	var storage = window.localStorage;
	var ctx = storage.getItem("ctx");
	var dataJson = {"pageSize":1,"pageNumber":1};
	var countProductes = "";
	$.ajax({
	            type: "POST",
	            dataType: "json",
	            async: false,
	            beforeSend: function(XMLHttpRequest) {
	                XMLHttpRequest.setRequestHeader("Authorization","Bearer "+storage.getItem("token"));
	            },
	            contentType: "application/json;charset=utf-8",
	            url:ctx+'api/pc/product/v1/findPage',
	            data:JSON.stringify(dataJson),
	            success: function(resData){
	            	if(resData.code == 0) {
	            		// console.log("resData=="+JSON.stringify(resData));
	            		countProductes = resData.data.totalElements;
	            		// console.log("roleData==55=="+JSON.stringify(roleData));
						// alert(resData.code+resData.msg);
	            	} else {
	            		alert(resData.code+resData.msg);

	            	}
	                
	            },
	            error: function(XMLHttpRequest,status, error) {
	                console.log("xhr======"+JSON.stringify(XMLHttpRequest));
	            }
	        });
	return countProductes;
}
