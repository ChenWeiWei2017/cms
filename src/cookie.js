/*存储cookie*/
export function setCookie(c_name,value,expire) {
  let d = new Date;
  d.setTime(d.getTime() + 24*60*60*1000*expire);
  window.document.cookie = c_name + "=" + value + ";path=/;expires=" + d.toUTCString();
}
/*获取cookie*/
export function getCookie(c_name){
  let v = window.document.cookie.match('(^|;) ?' + c_name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}
/*删除cookie*/
export function delCookie(c_name) {
  setCookie(c_name, "", -1);
}