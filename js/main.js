$(document).ready(function(){
	loadData();
	
    $(document).on("click", ".table tbody tr td", function(e) {
		$("table tbody tr td").removeClass("success");
		var dataType = $(this).attr("data-type");
		var dataFactoryId = $(this).attr("data-factory-id");
		var dataFactoryName = $(this).attr("data-factory-name");
		if(dataType == "factory") {
			$(".btn-add-workstation").removeClass("btn-disable").addClass("btn-success");
			$(".btn-add-device").removeClass("btn-success").addClass("btn-disable");
			$(".btn-add-workstation").click(function(){
				$("#createWorkStation input").val("");
				$("#createWorkStation span.factory-name").html(dataFactoryName);
				$("#createWorkStation input.factory-name").val(dataFactoryId);
				$("#createWorkStation").modal("show");
			});
		}else if(dataType == "workstation") {
			var dataWorkstationId = $(this).attr("data-workstation-id");
			var dataWorkstationName = $(this).attr("data-workstation-name");
			var dataFactoryId = $(this).attr("data-factory-id");
			var dataFactoryName = $(this).attr("data-factory-name");
			$(".btn-add-workstation").removeClass("btn-success").addClass("btn-disable");
			$(".btn-add-device").removeClass("btn-disable").addClass("btn-success");
			$(".btn-add-device").click(function(){
				$("#addDevice .device-workStation-name").html(dataWorkstationName);
				$("#addDevice .device-workStation-id").val(dataWorkstationId);
				$("#addDevice .device-factory-name").html(dataFactoryName);
				$("#addDevice .device-factory-id").val(dataFactoryId);
				$("#createDevice").modal("show");
			});
		}else{
			var dataWorkstationId = $(this).attr("data-workstation-id");
			var dataWorkstationName = $(this).attr("data-workstation-name");
			var dataDeviceId = $(this).attr("data-device-id");
			var dataDeviceName = $(this).attr("data-device-name");
			$(".btn-add-workstation").removeClass("btn-success").addClass("btn-disable");
			$(".btn-add-device").removeClass("btn-success").addClass("btn-disable");
		}
		$(this).addClass("success");
	});
	
	$("table tbody tr td").blur(function(){
		$(this).addClass("success");
	});
	
	$('#createFactory').on('hidden.bs.modal', function (e) {
	  	$('#createFactory input').val("");
	})
	
	$("#createFactory .btn-save").click(function(){
		Common.Service("PUT", "https://sheltered-fjord-6548.herokuapp.com/AMS/RESTAPI/factory/", "addFactory",function(){
			loadData();
		});
		$("#createFactory").modal("hide");
	});
	
	
	$("#viewFactory .btn-edit").click(function(){
		$("#viewFactory .view-mode").hide();
		$("#viewFactory .btn-edit").hide();
		$("#viewFactory .btn-save").show();
   		$("#viewFactory .edit-mode").show();
	});

	$("#viewFactory .btn-save").click(function(){
		Common.Service("POST", "https://sheltered-fjord-6548.herokuapp.com/AMS/RESTAPI/factory/"+$(this).attr("factory-id"), "viewFactoryForm",function(){
			loadData();
		});
		$("#viewFactory").modal("hide");
		loadData();
	});
	
	$("#createWorkStation .btn-save").click(function(){
		Common.Service("PUT", "https://sheltered-fjord-6548.herokuapp.com/AMS/RESTAPI/workstation/", "addWorkstation",function(){
			loadData();
		});
		$("#createWorkStation").modal("hide");
		loadData();
	});
	
	$("#viewWorkStation .btn-edit").click(function(){
		$("#viewWorkStation .view-mode").hide();
		$("#viewWorkStation .btn-edit").hide();
		$("#viewWorkStation .btn-save").show();
   		$("#viewWorkStation .edit-mode").show();
	});
	
	$("#viewWorkStation .btn-save").click(function(){
		Common.Service("POST", "https://sheltered-fjord-6548.herokuapp.com/AMS/RESTAPI/workstation/"+$(this).attr("workstation-id"), "viewWorkStationForm",function(){
			loadData();
		});
		$("#viewWorkStation").modal("hide");
	});
	
	$("#createDevice .btn-save").click(function(){
		Common.Service("PUT", "https://sheltered-fjord-6548.herokuapp.com/AMS/RESTAPI/device/", "addDevice",function(){
			loadData();
		});
		$("#createDevice").modal("hide");
	});
	
	$("#viewDevice .btn-edit").click(function(){
		$("#viewDevice .view-mode").hide();
		$("#viewDevice .btn-edit").hide();
		$("#viewDevice .btn-save").show();
   		$("#viewDevice .edit-mode").show();
	});

	$("#viewDevice .btn-save").click(function(){
		Common.Service("POST", "https://sheltered-fjord-6548.herokuapp.com/AMS/RESTAPI/device/" + $("#editDevice .device-id").html(), "editDevice",function(){
			loadData();
		});
		$("#viewDevice").modal("hide");
	});
	
	 $(document).on("dblclick", ".table tbody tr td", function(e) {
		var dataType = $(this).attr("data-type");
		var dataFactoryId = $(this).attr("data-factory-id");
		var dataFactoryName = $(this).attr("data-factory-name");
		
		if(dataType == "factory") {
			
			$.getJSON("https://sheltered-fjord-6548.herokuapp.com/AMS/RESTAPI/factory/" + dataFactoryId,
			   function(data) {
			   	var  factory = data.aoRows[0];
			   	$("#viewFactory .view-mode").show();
			   	$("#viewFactory .edit-mode").hide();
			   	$("#viewFactory span.factory-name").html(factory.Name);
			   	$("#viewFactory input.factory-name").val($("#viewFactory span.factory-name").html());
			   	$("#viewFactory .factory-serial-number").html(factory.SerialNumber);
                $("#viewFactory span.factory-location").html(factory.Location);
                $("#viewFactory span.factory-contact").html(factory.Contact);
                $("#viewFactory span.factory-phone").html(factory.Phone);
			   	$("#viewFactory input.factory-location").val($("#viewFactory span.factory-location").html());
			   	$("#viewFactory input.factory-contact").val($("#viewFactory span.factory-contact").html());
			   	$("#viewFactory input.factory-phone").val($("#viewFactory span.factory-phone").html());
			   	$("#viewFactory .factory-image").attr("src","/AMS/static/images/assets/Valeo.png");
			   	$("#viewFactory input.factory-serial-number").val($("#viewFactory .factory-serial-number").html());
			   	$("#viewFactory .btn-edit").show();
			   	$("#viewFactory .btn-save").hide();
			   	$("#viewFactory .btn-save").attr("factory-id",dataFactoryId);
			   	$("#viewFactory").modal("show");
			  });
			
		}else if(dataType == "workstation") {
			var dataWorkstationId = $(this).attr("data-workstation-id");
			var dataWorkstationName = $(this).attr("data-workstation-name");
			$.getJSON("https://sheltered-fjord-6548.herokuapp.com/AMS/RESTAPI/workstation/"+dataWorkstationId,
			   function(data) {
			    	var  workstation = data.aoRows[0];
			    	$("#viewWorkStation .view-mode").show();
			  	 	$("#viewWorkStation .edit-mode").hide();
			    	$("#viewWorkStation .workstation-id").html(workstation.id);
			    	$("#viewWorkStation div.workstation-name").html(workstation.Name);
			   		$("#viewWorkStation div.workstation-serial-number").html(workstation.SerialNumber);
			   		$("#viewWorkStation div.workstation-factory-name").html(dataFactoryName);
			   		$("#viewWorkStation input.workstation-name").val(workstation.Name);
			   		$("#viewWorkStation input.workstation-serial-number").val(workstation.SerialNumber);
			   		$("#viewWorkStation input.workstation-factory-name").val(dataFactoryName);
			   		$("#viewWorkStation input.workstation-factory-id").val(dataFactoryId);
			   		$("#viewWorkStation .workstation-image").attr("src","/AMS/static/images/assets/f" + dataWorkstationId%6 + ".jpg");
			   		
			   		$("#viewWorkStation .btn-edit").show();
			   		$("#viewWorkStation .btn-save").hide();
			   		$("#viewWorkStation .btn-save").attr("workstation-id",dataWorkstationId);
			   		
			   		
			   		
				   	$('#qrcode').empty().qrcode({
					    "width": 60,
					    "height": 60,
					    "color": "#3a3",
					    "text": workstation.QRCode
					});
					$("#viewWorkStation").modal("show");
			  });
			
		}else if(dataType == "device") {
			var dataFactoryId = $(this).attr("data-factory-id");
			var dataFactoryName = $(this).attr("data-factory-name");
			var dataWorkstationName = $(this).attr("data-workstation-name");
			var dataWorkstationId = $(this).attr("data-workstation-id");
			var dataDeviceId = $(this).attr("data-device-id");
			$.getJSON("https://sheltered-fjord-6548.herokuapp.com/AMS/RESTAPI/device/" + dataDeviceId,
			   function(data) {
			   var  device = data.aoRows[0];
			   $("#viewDevice .view-mode").show();
			   $("#viewDevice .edit-mode").hide();
			   $("#viewDevice .btn-edit").show();
			   $("#viewDevice .btn-save").hide();

			   $(".device-workStation-name").html(dataWorkstationName);
			   $(".device-workStation-id").val(dataWorkstationId);
			   $(".device-factory-name").html(dataFactoryName);
			   $(".device-factory-id").val(dataFactoryId);

			   $(".device-name").html(device.Name);
			   $(".device-id").html(device.id);
			   $(".device-asset-number").html(device.AssetNumber);
			   $(".device-type").html(device.Type);
			   $(".device-category").html(device.Category);
			   $(".device-standard").html(device.Standard);
			   $(".device-nation").html(device.Nation);
			   $(".device-custom").html(device.Custom);
			   $(".device-exFactory-date").html(device.ExFactoryDate);
			   $(".device-exFactory-number").html(device.ExFactoryNumber);
			   $(".device-original-value").html(device.OriginalValue);
			   $(".device-added-value").html(device.AddedValue);
			   $(".device-department").html(device.Department);
			   $(".device-move-in").html(device.MoveIn);
			   $(".device-move-out").html(device.MoveOut);
			   $(".device-depreciation").html(device.Depreciation);
			   $(".device-net-value").html(device.NetValue);
			   $(".device-note").html(device.Notes);
			   $(".device-manufactory").html(device.Manufacturer);
			   $(".device-exFactory-date").html(device.ExFactoryDate);
			   $(".device-exFactory-number").html(device.ExFactoryNumber);
			   $(".device-original-value").html(device.OriginalValue);
			   $(".device-added-value").html(device.AddedValue);
			   $(".device-department").html(device.Department);
			   $(".device-move-in").html(device.MoveIn);
			   $(".device-move-out").html(device.MoveOut);
			   $(".device-depreciation").html(device.Depreciation);
			   $(".device-net-value").html(device.NetValue);
			   $(".device-note").html(device.Notes);
			   $(".device-last-check-date").html(device.LastCheckDate);
			   $(".device-check-status").val(device.CheckStatus);
			   $(".device-syn-status").val(device.SyncStatus);
			   $(".device-serial-number").html(device.SerialNumber);

			   $(".device-name").val(device.Name);
			   $(".device-id").val(device.id);
			   $(".device-asset-number").val(device.AssetNumber);
			   $(".device-type").val(device.Type);
			   $(".device-category").val(device.Category);
			   $(".device-standard").val(device.Standard);
			   $(".device-nation").val(device.Nation);
			   $(".device-custom").val(device.Custom);
			   $(".device-exFactory-date").val(device.ExFactoryDate);
			   $(".device-exFactory-number").val(device.ExFactoryNumber);
			   $(".device-original-value").val(device.OriginalValue);
			   $(".device-added-value").val(device.AddedValue);
			   $(".device-department").val(device.Department);
			   $(".device-move-in").val(device.MoveIn);
			   $(".device-move-out").val(device.MoveOut);
			   $(".device-depreciation").val(device.Depreciation);
			   $(".device-net-value").val(device.NetValue);
			   $(".device-note").val(device.Notes);
			   $(".device-manufactory").val(device.Manufacturer);
			   $(".device-exFactory-date").val(device.ExFactoryDate);
			   $(".device-exFactory-number").val(device.ExFactoryNumber);
			   $(".device-original-value").val(device.OriginalValue);
			   $(".device-added-value").val(device.AddedValue);
			   $(".device-department").val(device.Department);
			   $(".device-move-in").val(device.MoveIn);
			   $(".device-move-out").val(device.MoveOut);
			   $(".device-depreciation").val(device.Depreciation);
			   $(".device-net-value").val(device.NetValue);
			   $(".device-note").val(device.Notes);
			   $(".device-last-check-date").val(device.LastCheckDate);
			   $(".device-serial-number").val(device.SerialNumber);
			   
			   $("#viewDevice .device-image").attr("src","/AMS/static/images/assets/f" + dataDeviceId%6 + ".jpg");
			   
			   $("#viewDevice").modal("show");
			  });
			
		}
	});

	
});
function loadData(){
		var  factoryId,workstationId,deviceId;
		$.getJSON("https://sheltered-fjord-6548.herokuapp.com/AMS/RESTAPI/init",
		   function(data) {
		   	var $tbody = $(".rightPanal table tbody");
		   	$tbody.empty();
		    var list = data.aoRows;
		    for(var index=0;index < list.length; index++){
	    		var row = list[index];
	    		var str = '<tr row-index="'+ index+'">'
						   +'<td data-type="factory" data-factory-id="'+row.FactoryId+'" data-factory-name="'+row.FactoryName+'">' + row.FactoryName+ '</td>'
						   +'<td data-type="workstation" data-factory-id="'+row.FactoryId+'"  data-factory-name="'+row.FactoryName+'" data-workstation-id="'+row.WorkstationId+'"  data-workstation-name="'+row.WorkstationName+'">'+row.WorkstationName+'</td>'
						     +'<td data-type="device" data-factory-id="'+row.FactoryId+'"  data-factory-name="'+row.FactoryName+'" data-workstation-name="'+row.WorkstationName+'" data-workstation-id="'+row.WorkstationId+'" data-device-id="'+row.DeviceId+'" data-device-name="'+row.DeviceName+'">'+row.DeviceName+'</td>'
						+'</tr>';
					$tbody.append(str);	
		    }  
		    $(".main").css("height",$(".rightPanal").height() + $(".header").height() + 40); 
		});
	}

Common = {
		// data format
		SerialDataToJson: function(data) 
		{
			console.debug(data);
			data = decodeURIComponent(data, true);
	    	data = data.replace(/&/g,"\",\"");
	       	data = data.replace(/=/g,"\":\"");
	       	data = data.replace(/\+/g, " ");
	       	data = "{\""+data+"\"}";
	       	data = $.parseJSON(data);
	       	console.debug(data);
	       	return data;
	    },
		Service: function(method, serviceUrl, formId, fnSuccess, fnFailed){
			$.ajax({
	            type: method,
	            //contentType: "application/json",
	            url: serviceUrl,
	            data: Common.SerialDataToJson($("#" + formId).serialize()),
	            error: function(XMLHttpRequest, textStatus, errorThrown) {

	            }
	        }).done(function(resp, status, xhr) {
	        	console.debug(resp);
	        	console.debug(status);
	        	console.debug(xhr);
	            if (status === "success" && $.type(resp) === "object") {
	                if ($.type(resp.bIsSuccess) === "boolean" && resp.bIsSuccess) {
	                    // Common success handler
	                    fnSuccess && fnSuccess.call(resp);
	                } else {
	                    // Do some common failed operations
	                    fnFailed && fnFailed.call(resp, status, xhr);
	                }
	            }
	        });
		}
	};
