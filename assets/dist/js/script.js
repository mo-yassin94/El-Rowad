$(function () {
    //Initialize Select2 Elements
    $(".select2").select2();

    //Datemask dd/mm/yyyy
    $("#datemask").inputmask("dd/mm/yyyy", {"placeholder": "dd/mm/yyyy"});
    //Datemask2 mm/dd/yyyy
    $("#datemask2").inputmask("mm/dd/yyyy", {"placeholder": "mm/dd/yyyy"});
    //Money Euro
    $("[data-mask]").inputmask();

    //Date range picker
    $('#reservation').daterangepicker();
    //Date range picker with time picker
    $('#reservationtime').daterangepicker({timePicker: true, timePickerIncrement: 30, format: 'MM/DD/YYYY h:mm A'});
    //Date range as a button
    $('#daterange-btn').daterangepicker(
        {
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            startDate: moment().subtract(29, 'days'),
            endDate: moment()
        },
        function (start, end) {
            $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        }
    );

    //iCheck for checkbox and radio inputs
    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue'
    });
    //Red color scheme for iCheck
    $('input[type="checkbox"].minimal-red, input[type="radio"].minimal-red').iCheck({
        checkboxClass: 'icheckbox_minimal-red',
        radioClass: 'iradio_minimal-red'
    });
    //Flat red color scheme for iCheck
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
        checkboxClass: 'icheckbox_flat-green',
        radioClass: 'iradio_flat-green'
    });

    //Colorpicker
    $(".my-colorpicker1").colorpicker();
    //color picker with addon
    $(".my-colorpicker2").colorpicker();

    //Timepicker
    $(".timepicker").timepicker({
        showInputs: false
    });
});

$( document ).ready(function() {
    $('#title').on('change', function() {

        $("#slug").val( $("#title").val().replace(/ /g,'-').toLocaleLowerCase());

    });

    $('#title').on('change', function() {
        //ajax request
        $.ajax({
            type:"GET",
            url: baseURL+"/admin/api/slug",
            data:  "slug=" + $("#slug").val()+"&section="+ $("#section").val(),
            dataType: 'json',
            success: function(data) {
				if(data == true) {
				    console.log('yes');
					$('#slug').css('border', '1px #090 solid');
					$('#insert').removeAttr( "disabled" );
					$('#slug_status').text("Slug Correct");
				}
				else {
                    console.log('no');
					$('#slug').css('border', '1px #C33 solid');
					$('#slug_status').text("* Error , Edit Slug");
					$('#insert').attr('disabled','disabled');
				}
            },
            error:function (data) {
                console.log(baseURL+"admin/api/slug");
            }
        });
    });
});

$(document).ready(function() {
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
});


$( document ).ready(function() {
    $("#btnupload").hide();

    $("#fileupload").on("change",function(e) {

        $("#btnupload").show();
        $("#divleft").html("");
    });

    $("#btnupload").on("click",function(e){
        e.preventDefault();

        var formData = new FormData($(this).parents('form')[0]);

        $.ajax({
            type:'POST',
            url: baseURL+'/admin/api/upload_multi_images',
            data:formData,
            xhr: function() {
                $("#divleft").html('<img width="250" height="100" class="margin" src="'+baseURL+'/assets/img/loading.gif"> ');
                var myXhr = $.ajaxSettings.xhr();
                if(myXhr.upload){
                    myXhr.upload.addEventListener('progress',progress, false);


                }
                return myXhr;
            },
            cache:false,
            contentType: false,
            processData: false,

            success:function(data){

              var img=JSON.parse(data);
                $("#hidden_multi_photo").val('');
                $("#divleft").html('');
                for (i=0;i<=(img['length'])-1;i++){

                    $("#divleft").append('<img width="150" height="100" class="margin" src="'+baseURL+'/uploads/thumbs/images/'+img[i]+'"> ');
                    $("#hidden_multi_photo").val(function() {
                        if ((img['length'])-1 != i){
                            return $(this).val() + img[i] + ',';
                        }else{
                            return $(this).val() + img[i];
                        }

                    });
                }


            },

            error: function(data){
                console.warn(data.responseText);
                $("#divleft").append('<img width="150" height="100" class="margin" src="'+baseURL+'/assets/img/Error_Message_Icon.png"> ');
            }


        });




    });





});

$("#upload_project_photo").on("change",function() {
    var formData = new FormData($(this).parents('form')[0]);
    $.ajax({
        type:'POST',
        url: baseURL +'/admin/api/upload_project_photo',
        data:formData,
        xhr: function() {
            var myXhr = $.ajaxSettings.xhr();
            return myXhr;
        },
        cache:false,
        contentType: false,
        processData: false,

        success:function(data){
            console.log(data);
            $("#project_photo").html("");
            $("#project_photo").append('<img width="150" height="100" class="margin" src="'+baseURL+'/uploads/thumbs/images/'+data+'"> ');
            $("#project_photo_src").val(data);

  

        },

        error: function(data){
            console.log(data);
            $("#project_photo").append('<img width="150" height="100" class="margin" src="'+baseURL+'/assets/img/Error_Message_Icon.png"> ');
        }


    });
});

function progress(e){

    if(e.lengthComputable){
        var max = Math.ceil(e.total/1024/1024).toPrecision();
        var current = Math.ceil(e.loaded/1024/1024);

        var Percentage = (current * 100)/max;


        $("#divleft").html("<div>"+current +" MB <b>OF "+ max +" MB</b></div><br>");
        $("#btnupload").hide( "slow" );
        $("#fileupload").val('');
        $("#uploader_status").css("width",Percentage+"px");
        $("#uploader_status").attr("aria-valuenow",Percentage);
        if(Percentage <= 100)
        {
            //$("#uploader_status").css("width",Percentage+"px");
            $("#uploader_status").attr("aria-valuenow",Percentage);
            // process completed
        }
        if(Percentage >= 100){
            $("#uploader_status").css("width","100%");
            $("#uploader_status").addClass(' progress-bar-green');
            $("#uploader_status").attr("aria-valuenow",100);
        }
    }
}
