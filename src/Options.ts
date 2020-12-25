export default interface Options {
  idInKey?: string,
  idOutKey?: string,
  fields?: any,
  changeCase?: string,

  // custom properties
  [key: string]: any
}
