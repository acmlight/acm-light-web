import { Namespace, FlatNamespace, KeyPrefix } from 'i18next'
import { FallbackNs } from 'react-i18next'
import i18next from  './i18n'

type $Tuple<T> = readonly [T?, ...T[]];
type $FirstNamespace<Ns extends Namespace> = Ns extends readonly any[] ? Ns[0] : Ns;

export async function getT<
  Ns extends FlatNamespace | $Tuple<FlatNamespace>,
  KPrefix extends KeyPrefix<FallbackNs<Ns extends FlatNamespace ? FlatNamespace : $FirstNamespace<FlatNamespace>>> = undefined
>(
  lng: 'es' | 'en',
  ns?: Ns,
  options: { keyPrefix?: KPrefix } = {}
) {
  if (lng && i18next.resolvedLanguage !== lng) {
    await i18next.changeLanguage(lng)
  }
  if (ns && !i18next.hasLoadedNamespace(ns as string | string[])) {
    await i18next.loadNamespaces(ns as string | string[])
  }
  return {
    t: Array.isArray(ns) ? i18next.getFixedT(lng, ns[0], options.keyPrefix) : i18next.getFixedT(lng, ns as FlatNamespace, options.keyPrefix),
    i18n: i18next
  }
}