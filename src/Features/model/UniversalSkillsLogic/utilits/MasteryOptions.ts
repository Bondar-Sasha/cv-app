import {i18n} from '@/Shared'

export interface MasteryTypes {
  value: string
  label: string
}

export const MasteryOptions: MasteryTypes[] = [
  {value: i18n.t('Novice'), label: i18n.t('Novice')},
  {value: i18n.t('Advanced'), label: i18n.t('Advanced')},
  {value: i18n.t('Competent'), label: i18n.t('Competent')},
  {value: i18n.t('Proficient'), label: i18n.t('Proficient')},
  {value: i18n.t('Expert'), label: i18n.t('Expert')},
]
