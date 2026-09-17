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

export type LinkObject = JsonObject

export type ResourceIdentifierObject = {
  type: string
  id: string
}

export type ExistingResourceObject = ResourceIdentifierObject & {
  id: string
  attributes: AttributesObject
  links?: LinkObject
  relationships?: Record<string, RelationshipObject>
}

export type NewResourceObject = Omit<ExistingResourceObject, 'id'>

export type ResourceObject = ExistingResourceObject | NewResourceObject

export type RelationshipObject = {
  data: ResourceIdentifierObject | ResourceIdentifierObject[]
  links?: LinkObject
}

export enum CaseType {
  camelCase = 'camelCase',
  snakeCase = 'snakeCase',
  kebabCase = 'kebabCase',
}

/**
 * Selective rules for deep key case conversion.
 *
 * Known key names use their serialized casing. `'preserve'` leaves an entire subtree unchanged.
 */
export type KeyTransformPolicy =
  | 'preserve'
  | {
      /** serialized key names with policies for their values */
      knownKeys?: Record<string, KeyTransformPolicy>
      /** when present, preserve unmatched key names and optionally apply a policy to their values */
      unknownKeys?: {
        valuePolicy?: KeyTransformPolicy
      }
    }

export type Options<TExtraOptions = void> = {
  /** key that should be used as the id */
  idKey?: string
  /** map of EntityType => Fields Array, e.g. `{"users": ["name", "age"], "images": ["width"]}` */
  fields?: Record<string, string[]>
  /** change case of the attribute keys */
  changeCase?: CaseType
  /** if true, also apply the change for sub objects */
  changeCaseDeep?: boolean
  /** key transformation rules keyed by JSON:API `data.type` */
  keyTransformPoliciesByResourceType?: Record<string, KeyTransformPolicy>
  /** custom properties, that are available in the transformer */
  extra?: TExtraOptions
}

export type SerializeOptions<TExtraOptions = void> = Options<TExtraOptions> & {
  relationships?: string[] | Record<string, string>
  included?: boolean
}
