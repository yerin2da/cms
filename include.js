$(document).ready(function () {

    // ======= 퍼블리싱을 위해 임시로 적용 =========//
    //th 정렬
    $(".sort-icon").on("click", function () {
        if ($(this).hasClass("up")) { // up → down
            $(this).removeClass("up")
                .addClass("down");
            $(this).parents('th').css('color','#3D70F6');

        } else if ($(this).hasClass("down")) {// down → 기본
            $(this).removeClass("down");
            $(this).parents('th').css('color','#4a4743');

        } else {// 기본 → up
            $(this).addClass("up");
            $(this).parents('th').css('color','#DB655F');
        }
    });
});


// include html
function includeHTML(selector, file) {
    fetch(file)
        .then(res => {
            if (!res.ok) throw new Error(`파일 로드 실패: ${file}`);
            return res.text();
        })
        .then(data => {
            document.querySelector(selector).innerHTML = data;
        })
        .catch(err => console.error(err));
}
