export default function validConfig({needReplay, replayFunction}) {
  if(!needReplay) throw new Error('请传入需要请求重放的判断函数，返回值为Boolean！')
  if(!replayFunction) throw new Error('请传入重新请求新token的函数，并在函数内部实现业务逻辑！')
  return true
}