interface IFormFieldsData {
  label: string
  name: 'name' | 'education' | 'description'
  autoComplete: string
  multiline: boolean
  minRows: number
}

export const FormFieldsData: IFormFieldsData[] = [
  {
    label: 'Name',
    name: 'name',
    autoComplete: 'name',
    multiline: false,
    minRows: 1,
  },
  {
    label: 'Education',
    name: 'education',
    autoComplete: 'education',
    multiline: false,
    minRows: 1,
  },
  {
    label: 'Description',
    name: 'description',
    autoComplete: 'description',
    multiline: true,
    minRows: 7,
  },
]
