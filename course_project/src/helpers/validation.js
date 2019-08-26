export function isEmpty(val) {
  return val.trim().length === 0;
}

export function isValidEmail(val) {
  let reg = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
  return !reg.test(val);
}
