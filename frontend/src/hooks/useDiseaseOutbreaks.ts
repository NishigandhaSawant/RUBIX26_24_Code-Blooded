import { useEffect, useState, useCallback } from 'react'
import { supabaseServices } from '@/lib/supabase-services'

export type DiseaseOutbreak = {
  disease: string
  area: string
  severity: string
  total_cases: number
  reports: number
  latest_detection: string
  first_detection: string
  calculated_severity: string
  trend: string
}

export function useDiseaseOutbreaks() {
  const [outbreaks, setOutbreaks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    setLoading(true)

    try {
      // Get disease outbreaks from Supabase
      const data = await supabaseServices.disease.getOutbreaks()
      setOutbreaks(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching disease outbreaks:', error)
      setOutbreaks([])
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    fetchData()

    // Listen for real-time updates from Supabase
    const unsubscribe = supabaseServices.disease.listenToOutbreaks((data) => {
      setOutbreaks(Array.isArray(data) ? data : [])
    })

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [fetchData])

  return {
    outbreaks: Array.isArray(outbreaks) ? outbreaks : [],
    loading,
    error: null,
  }
}
