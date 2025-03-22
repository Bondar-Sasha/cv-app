import {createContext, useContext} from 'react'

export const BreadContext = createContext<{
  currentBread: string
  setCurrentBread: (bread: string) => void
}>({currentBread: '', setCurrentBread: () => {}})

export const useBreadCrumbsContext = () => useContext(BreadContext)
