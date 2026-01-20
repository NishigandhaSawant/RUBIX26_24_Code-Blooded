import { useEffect, useState, useCallback } from 'react'
import { supabaseServices } from '@/lib/supabase-services'

export function useResourceDecay() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      // Get resource usage from Supabase
      const data = await supabaseServices.resource.getUsage()
      setResources(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching resource usage:', error);
      setResources([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData()
    
    // Listen for real-time updates from Supabase
    const unsubscribe = supabaseServices.resource.listenToUsage((data) => {
      setResources(Array.isArray(data) ? data : []);
    })

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  return {
    resources: Array.isArray(resources) ? resources : [],
    loading,
    error: null,
  };
}
