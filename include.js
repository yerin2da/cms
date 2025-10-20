$(document).ready(function () {
    /*달력 선언*/
    $(".apply_date_Ym").datepicker({
        format: "yyyy-mm", // 원하는 포맷 (년-월)
        startView: 1,     // 월 뷰부터 시작
        minViewMode: 1,   // 최소 뷰를 월로 제한
        autoclose: true,   // 선택 후 자동 닫기
        language: "kr",
        orientation: "bottom auto" // 아래쪽으로 열리도록 설정
    });

    /* 달력 선언 년도 - 월별*/
    $(".apply_date_Y").datepicker({
        format: "yyyy",          // 연도만 표시
        minViewMode: 2,          // 'year' 모드로 제한 (0: day, 1: month, 2: year)
        viewMode: "years",       // 뷰 모드를 연도 기준으로 시작
        autoclose: true,
        language: "kr",
        orientation: "bottom auto"
    });

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
