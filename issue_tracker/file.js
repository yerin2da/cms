var fileList = []; //파일 정보를 담아 둘 배열
init();
function init() {
    //드래그앤드랍
    $(".fileDrop").on("dragenter", function (e) {
        e.preventDefault();
        e.stopPropagation();
    }).on("dragover", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(".fileDrop_wrap").css("background", "#e1edff");
        $(this).css("border", "2px dashed #60a5fa");

    }).on("dragleave", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(".fileDrop_wrap").css("background", "#f2f8ff");
        $(this).css("border", "2px dashed transparent");



    }).on("drop", function (e) {
        e.preventDefault();
        const id = $(e.currentTarget).data('id');
        var files = e.originalEvent.dataTransfer.files;

        if (files.length > 1) {
            alert("1개의 파일만 등록 가능합니다.");
            $(".fileDrop_wrap").css("background", "#f2f8ff");
            $(this).css("border", "2px dashed transparent");

            return false;
        }

        // 총 등록 개수 제한 (최대 5개)
        const currentCount = $(".files_wrap .fileList").length;
        if (currentCount >= 5) {
            alert("최대 5개의 파일만 등록할 수 있습니다.");
            $(".fileDrop_wrap").css("background", "#f2f8ff");
            $(this).css("border", "2px dashed transparent");

            return false;
        }

        const newFile = files[0];
        const newFileName = newFile.name.trim();

        // 파일명 중복 체크
        let isDuplicate = false;
        $(".files_wrap .fileName").each(function () {
            const existingName = $(this).text().trim();
            if (existingName === newFileName) {
                isDuplicate = true;
                return false; // 중단
            }
        });

        if (isDuplicate) {
            alert("같은 이름의 파일이 이미 등록되어 있습니다.");
            $(".fileDrop_wrap").css("background", "#f2f8ff");
            $(this).css("border", "2px dashed transparent");
            return false;
        }

        $(".fileDrop_wrap").css("background", "#f2f8ff");
        $(this).css("border", "2px dashed transparent");


        if (files != null && files != undefined) {
            var tag = "";
            for (i = 0; i < files.length; i++) {
                var f = files[i];
                fileList.push(f);
                var fileName = f.name;
                var fileSize = f.size / 1024 / 1024;
                fileSize = fileSize < 1 ? fileSize.toFixed(3) : fileSize.toFixed(1);

            }
        }

        const urlParams = new URLSearchParams(window.location.search);
        const issue_idx = urlParams.get('issue_idx');
        // issue.file_attach(issue_idx, fileList);
        console.log("fileList", fileList); // 드롭 직후
        console.log("idx", issue_idx); // 드롭 직후



    });

} // init()


function removefile(obj)
{
    const id = obj.parent().parent().parent().find('.fileBox').attr("id");
    let filename = $(`#${id}`).find("input[name='upfile_name']").val();

    /*    $(`#${id}`).find("div.fileList").remove();
        $(`input[name='upfile[${id}]'`).val("");
        $(`#${id}`).find(".fileDrop").css("background-color", "#fff");*/

    att_pk = $(`input[name='ATT_PK[]'][data-idx='${id}']`).val();

    const strURL= be_url;
    let objPara= "mode=del_file&file_name=" + filename;
    objData = getAjaxJson(strURL, objPara, 'POST'); //임시파일 삭제


    $(`#${id}`).find("div.fileList").remove();
    $(`.file_list${id}`).find("td.file_update").html("");
    $(`input[name='upfile[${id}]'`).val("");
    $(`#${id}`).find(".fileDrop").css("background-color", "#fff");
    $(`tr.file_list${id}`).find("button.file_view").removeClass("view_blue");
    $(`tr.file_list${id}`).find("button.del_red").removeClass("del_red").addClass("del_gray");

    // const strURL= "./cstm_reg_db_ins.php";
    // const objPara = "mode=del_file&file_name="+filename;

    let file_txt = `<i class="bi bi-file-earmark-arrow-up"></i><span>&nbsp;이곳에 파일을 끌어 넣으세요</span>`;


    if ($(`#${id}`).find(".fileDrop").children().length === 0) {
        $(`#${id}`).find(".fileDrop").append(file_txt);
    }

}



