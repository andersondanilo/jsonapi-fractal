import { JsonObject } from 'type-fest'

export { JsonObject } from 'type-fest'

type BaseDocumentObject<ResourceObjectType> = {
  data: ResourceObjectType | ResourceObjectType[] | null
  meta?: MetaObject
  included?: ExistingResourceObject[]
}

export type ExistingDocumentObject = BaseDocumentObject<ExistingResourceObject>

export type NewDocumentObject = BaseDocumentObject<NewResourceObject>

export type DocumentObject = ExistingDocumentObject | NewDocumentObject

export type AttributesObject = JsonObject

export type MetaObject = JsonObject

export type ResourceIdentifierObject = {
  type: string
  id: string
}

export type ExistingResourceObject = ResourceIdentifierObject & {
  id: string
  attributes: AttributesObject
  relationships?: Record<string, RelationshipObject>
}

export type NewResourceObject = Omit<ExistingResourceObject, 'id'>

export type ResourceObject = ExistingResourceObject | NewResourceObject

export type RelationshipObject = {
  data: ResourceIdentifierObject | ResourceIdentifierObject[]
}

export enum CaseType {
  camelCase = 'camelCase',
  snakeCase = 'snakeCase',
  kebabCase = 'kebabCase',
}

export type Options<TExtraOptions = void> = {
  idKey?: string
  fields?: Record<string, string[]>
  changeCase?: CaseType
  extra?: TExtraOptions
}

export class JsonApiFractalError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'JsonApiFractalError'
  }
}
