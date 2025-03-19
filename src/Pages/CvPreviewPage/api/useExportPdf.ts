import {gql, useMutation} from '@apollo/client'
import type {ExportPdfInput} from 'cv-graphql'

export type ExportPdfArgs = {
  pdf: ExportPdfInput
}

export const EXPORT_PDF = gql`
  mutation ExportPdf($pdf: ExportPdfInput!) {
    exportPdf(pdf: $pdf)
  }
`

export const useExportPdf = () => {
  return useMutation<ExportPdfArgs>(EXPORT_PDF)
}
