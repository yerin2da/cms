
class Issue{

//     #host;
//     #token;
//     #url;
//     #issue_data ="";
//     #param =[];
//     #issue_cache = {}; // 카드 진행상태 저장
//     #last_response;//change 애니메이션 용
//
//
//     constructor(host, token="") {
//         this.#host = host;
//         this.#token = token;
//         this.#url="/issue_tracker/board.php";
//
//         if(token !=""){
//             this.#save_storage()
//         }else{
//             this.#load_storage();
//         }
//     }
//
//
//     get_param()
//     {
//        // console.log(`token:${this.token} , host : ${this.host}`);
//     }
//     //리스트 보기
//     list(type)
//     {
//         this.#param=[];//초기화
//
//         this.#param.push("mode=list");
//         this.#param.push("type="+type);
//
//         if(this.#call_api() ) {
//             this.#make_card(); //list
//         }
//         return false;
//     }
//     //이슈추가
//     add()
//     {
//         this.#param=[];//초기화
//
//         this.#param.push("mode=add");
//
//         if (this.#call_api()) {
//             this.#issue_data[0]._animate = 'animate__zoomIn';
//             this.#make_card(); //add
//         }
//     }
//     //이슈카드 조회 -상세
//     get(issue_idx=0)
//     {
//         if(issue_idx==0) return false;
//         this.#param=[];//초기화
//
//         this.#param.push("mode=detail");
//         this.#param.push(`issue_idx=${issue_idx}`);
//
//
//         if (this.#call_api()) {
//             if (typeof render_detail === "function") {
//                 render_detail(this.#issue_data);
//             }
//         }
//     }
//     //상태변경
//     change(issue_idx=0,status="")
//     {
//         if(issue_idx==0) return false;
//         if(status==""){ alert("변경할 상태값이 없습니다.");
//             return false;
//         }
//         //issue_idx 현재 상태값 불러오기
//         this.#param=[];//초기화
//
//         this.#param.push("mode=status");
//         this.#param.push(`issue_idx=${issue_idx}`);
//         this.#param.push(`status=${status}`);
//
//
//
//         if (this.#call_api()) {
//             console.log(this.#last_response);
//
//             if(this.#last_response.SUCCESS === "TRUE"){
//                 this.#issue_data[0]._animate = 'animate__flipInX'; // 성공 시 애니메이션
//
//             }else{
//                 this.#issue_data[0]._animate = 'animate__jello';   // 실패 시 애니메이션
//
//             }
//
//         }
//         this.#make_card(); // change
//
//
//
//     }
//
//     //이슈 수정
//     modify({
//                issue_idx,
//                title,
//                content,
//                status,
//                del_attach_idx,
//                attach_idx,
//                manager_id
//            })
//     {
//         this.#param=[];//초기화
//         this.#param.push("mode=modify");
//         //수정할 데이터 세팅
//
//         this.#param.push(`issue_idx=${issue_idx}`);
//         this.#param.push(`title=${title}`);
//         this.#param.push(`content=${content}`);
//         this.#param.push(`status=${status}`);
//
//         // this.#param.push(`del_attach_idx=${del_attach_idx}`);
//
//         del_attach_idx.forEach(idx => {
//             this.#param.push(`del_attach_idx[]=${idx}`);
//         });
//         console.log("del_attach_idx type:", typeof del_attach_idx); // 배열인지 문자열인지
//         console.log("del_attach_idx content:", del_attach_idx);     // 실제 값
//
//         this.#param.push(`attach_idx[]=${attach_idx}`);
//
//         manager_id.forEach(id => {
//             this.#param.push(`manager_id[]=${id}`);
//         });
//
//         if (this.#call_api()) {
//             alert('저장되었습니다');
//         }
//     }
//
//     file_attach(issue_idx, fileList)
//     {
//         const strURL = this.#host + this.#url;
//         const formData = new FormData();
//
//         formData.append("mode", "file_attach");
//         formData.append("issue_idx", issue_idx);
//         formData.append("token", this.#token);
//
//
//         fileList.forEach((file) => {
//             formData.append("fileList", file);
//         });
//
//         $.ajax({
//             url: strURL,
//             type: "POST",
//             data: formData,
//             processData: false,
//             contentType: false,
//             dataType: "json",
//             success: (res) => {
//                 if (res.SUCCESS === "TRUE") {
//                     console.log("📁 파일 업로드 성공:", res.RECORD);
//                     if (typeof render_file === "function") {
//                         render_file(res.RECORD);
//                     }
//                 } else {
//                     alert(res.MSG ?? "파일 업로드 실패");
//                 }
//             },
//             error: (xhr) => {
//                 alert("업로드 중 오류 발생: " + xhr.statusText);
//             }
//         });
//
//
//         // this.#param=[];//초기화
//         //
//         // this.#param.push("mode=file_attach");
//         // this.#param.push(`issue_idx=${issue_idx}`);
//         // this.#param.push(`fileList=${fileList}`);
//         //
//         // if (this.#call_api()) {
//         //     if (typeof render_file === "function") {
//         //         render_file(this.#issue_data);
//         //     }
//         // }
//     }
//
//     //댓글 추가
//     add_reply(issue_idx=0,memo)
//     {
//        /* if(issue_idx==0){
//             alert("이슈코드는 필수항목입니다.");
//             return false;
//         }*/
//         this.#param=[];//초기화
//         this.#param.push("mode=reply_add");
//         this.#param.push(`issue_idx=${issue_idx}`);
//         this.#param.push(`memo=${memo}`);
//
//         if(this.#call_api()) {
//             if (typeof make_memo === "function") {
//                 make_memo(this.#issue_data);
//             }
//         }
//     }
//
//     //댓글 리스트
//     reply_list(issue_idx=0)
//     {
//        /* if(issue_idx==0){
//             alert("이슈코드는 필수항목입니다.");
//             return false;
//         }*/
//         this.#param=[];//초기화
//         this.#param.push("mode=reply_list");
//         this.#param.push(`issue_idx=${issue_idx}`);
//
//         if(this.#call_api()) {
//             if (typeof render_reply_list === "function") {
//                 render_reply_list(this.#issue_data);
//             }
//         }
//     }
//
//     //아래부터는 내부 함수 - 외부에서 접근 못함.
//     //토큰 저장
//     #save_storage()
//     {
//         sessionStorage.setItem("token", this.#token);
//         console.log("save_storage");
//     }
//     #load_storage()
//     {
//         const token = sessionStorage.getItem("token");
//         this.#token = token;
//         console.log("load_storage");
//
//     }
//     //통합된 api통신 함수
//     #call_api()
//     {
//         const strURL= this.#host+this.#url;
//
//         /*통신 파라미터 만들기*/
//        this.#param.push(`token=${this.#token}`);
//        this.#param.push(`debug=1`);
// //        param.push(`mode=${this.#mode}`);
//   //      if(this.#type != "" ) param.push(`type=${this.#type}`);
// //        if(this.#issue_idx >0 ){//이슈코드 세팅
//   //          param.push(`issue_idx=${this.#issue_idx}`);
//     //    }
//         //param.push(`mode=${mode}`);
//
//
//         const objPara = this.#param.join("&"); //"issue_idx="+issue_idx+"&mode="+mode+"&type="+type;
//
//         console.log(`url : ${strURL}`);
//         console.log(`param : ${objPara}`);
//
//         let objData =  getAjaxJson(strURL,objPara,"POST");
//         this.#last_response = objData;
//         if(objData.SUCCESS == "TRUE"){
//             this.#issue_data =objData.RECORD;
//             const token = this.#issue_data.token;
//             if(token != this.#token && token != "") { //리턴받은 토큰이 존재하고, 현재 토큰과 값이 다를때 새롭게 저장.
//                 this.#token = token;
//                 this.#save_storage()
//             }
//             return true;
//         }else {
//             this.#issue_data =objData.RECORD;
//             let msg = objData.MSG==""? "실패하였습니다." :objData.MSG;
//             alert(msg);
//             return (objData.RECORD == undefined)?  false : true;
//
//         }
//
//     }
//
//     #make_card()
//     {
//         let issue_card = this.#issue_data;
//         console.log(issue_card);
//         //console.log(issue_card.token);
//
//         const current_ids = new Set();
//
//         for(let i in issue_card) {
//             const card = issue_card[i];
//
//             if (typeof card === "object" && card !== null) {
//
//                 // 갱신시 상태변경된 카드에 애니메이션 추가
//                 const prev_status = this.#issue_cache[card.issue_idx];
//                 const changed = prev_status && prev_status !== card.status;
//
//                 //card._animate = card._animate || (changed ? 'animate__flipInX' : '');
//                 card._animate = 'animate__flipInX';
//                 // 렌더링 호출
//                 this.#render_card(card);
//
//                 // 상태 캐시 갱신
//                 this.#issue_cache[card.issue_idx] = card.status;
//                 current_ids.add(card.issue_idx);
//             }
//         }
//
//         // 캐시 정리: 응답에 포함되지 않은 오래된 카드 제거
//         for (let id in this.#issue_cache) {
//             if (!current_ids.has(Number(id))) {
//                 delete this.#issue_cache[id];
//             }
//         }
//
//     }
//
//     #render_card(card) {
//         let animateClass = '';
//         let obj_exist = false;
//
//         obj_exist = $(`.kanban-item[data-id='${card.issue_idx}']`).length > 0 ? true : false;
//
//
//         // 애니메이션 분기
//         if (card._animate) {
//             animateClass = `animate__animated ${card._animate}`;
//         }
//         let div_card = `<div class="group kanban-item add-item cursor-pointer bg-white rounded-xl p-4 !pb-[20px] transition ${animateClass}" data-id="${card.issue_idx}">
//             <input type="hidden" id="issue_idx" name="issue_idx" value="${card.issue_idx}" /><!--코드-->
//             <input type="hidden" id="reg_datetime" name="reg_datetime" value="${card.reg_datetime}" /><!--등록일시-->
//             <input type="hidden" id="${card.status}" name="status" value="${card.status_txt}" /><!--상태,상태값-->
//
//               <p class="text-[15px] font-normal text-gray-500 mb-1">No.${card.issue_idx}</p>
//               <p class="font-semibold text-lg text-gray-700 mb-4 truncate">${card.title || '제목을 입력하세요'}</p>
//               <div class="flex justify-between items-center">
//                 <p class="text-sm font-normal text-gray-400">${card.reg_date}</p>
//                 <div class="reg_emp_name rounded-full flex items-center justify-center bg-[#fbfbfb] border border-[#e9e9e9]">
//                     <p class="text-sm font-semibold" style="color:#${card.reg_emp_color};">${card.reg_emp_name}</p>
//                 </div>
//               </div>
//             </div>`;
//         //사라짐 효과여부 판단.
//         const $target = $(`.kanban-item[data-id='${card.issue_idx}']`);
//         let remove_animation="";
//         const now_status = $target.closest('.kanban-drag').data('status'); // .toUpperCase();
//         if (now_status === undefined) {//신규 생성 - 즉 삭제이슈 없음.
//             remove_animation="";
//         } else {//기존에 있던 카드를 제거후 추가
//             if(now_status==card.status ){//상태 변경없음. 삭제이슈 없음.
//                 remove_animation="";
//             }else{
//                 remove_animation="animate__flipOutX";
//             }
//             //else 상태 변경 - 카드 삭제후 생성 이슈!
//
//          }
//         //기존카드 삭제후 진행 섹션에 맞도록 생성
//         if($target.length>0) {
//             if (remove_animation != "") {//사라짐효과가 부여되었을때.
//                 // 기존 animate 클래스 제거
//                 $target.removeClass("animate__flipInX");
//                 $target.removeClass("animate__jello");
//                 $target.removeClass("animate__zoomIn");
//                 $target.removeClass("animate__flipOutX");
//                 // 새로운 애니메이션 적용
//                 console.log("사라짐 효과시작");
//                 $target.addClass("animate__animated animate__flipOutX");
//                 // 애니메이션 완료 후 제거
//                 $target.one("animationend", function () {
//                     $target.remove();
//                     console.log("사라짐 효과 끝");
//                 });
//             }else{// 부여된 효과가 없을땐 그냥 삭제.
//                 $target.remove();
//             }
//         }
//         //새로운 카드 생성.
//         switch (card.status) {
//             case "U": //미할당
//                 $(".kanban-drag[id='default']").prepend(div_card);
//                 break;
//             case "W" : //대기
//                 $(".kanban-drag[id='todo']").append(div_card);
//                 break;
//             case  "P" : //진행
//                 $(".kanban-drag[id='doing']").append(div_card);
//                 break;
//             case "C": //완료
//                 $(".kanban-drag[id='done']").append(div_card);
//                 break;
//             case "H": //반려
//                 $(".kanban-drag[id='reject']").append(div_card);
//                 break;
//         }
//     }

}