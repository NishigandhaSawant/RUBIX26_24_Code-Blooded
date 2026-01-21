import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export function useResourceDecay() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('resource_usage')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching resource usage:', error)
      } else {
        setData(data ?? [])
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  return { data, loading }
}
