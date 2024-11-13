import { useEffect, type ReactNode } from 'react'
import Analytics from '../../utils/Analytics'

type Props = {
  page: string
  children: ReactNode
}

export default function AnalyticsScreen({ page, children }: Props) {
  useEffect(() => {
    Analytics.ready(() => Analytics.screen(page))
  }, [])

  return children
}
