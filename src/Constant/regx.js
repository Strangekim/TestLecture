// . 모든 문자를 글자 제약 없이 통과시킬때 js 에서 undefined 가 통과되는 것을 막을 방법은 존재하지 않는가??

const regName = /^[가-힣]{1,8}$/;
const regPhone = /^\d{2,3}\d{3,4}\d{4}$/;
const regId = /^.{1,20}$/;
const regPw = /^.{4,20}$/;
const regArticleTitle = /^.{1,10}$/;
const regArticleCategory = /^[0-9]{1,2}$/;
const regArticleContent = /^.{1,500}$/;
const regCommentContent = /^.{1,100}$/;
const regCreateTime = /^[0-9]$/;
const regIdx = /^[0-9]{1,}$/;
const regUserGrade = /^[01]$/;
const regCategoryName = /^[가-힣]{1,8}$/;

// function regIdTestFunc(input) {
//     if (!regId.test(input) || !input) {
//         return false
//     } else return true
// }

// function regPwTestFunc(input) {
//     if (!regPw.test(input) || !input) {
//         return false
//     } else return true
// }

module.exports = {regId, regPw, regName, regPhone, regArticleTitle, regArticleCategory, regArticleContent, regCommentContent, regCreateTime, regIdx, regUserGrade, regCategoryName}
