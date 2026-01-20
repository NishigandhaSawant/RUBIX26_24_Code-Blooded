import { useEffect, useState, useCallback } from 'react'
import { supabaseServices } from '@/lib/supabase-services'

export function useAmbulanceTracking() {
  const [ambulances, setAmbulances] = useState<any[]>([]);
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      // Get ambulance events from Supabase
      const data = await supabaseServices.ambulance.getEvents()
      setAmbulances(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching ambulance events:', error);
      setAmbulances([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData()
    
    // Listen for real-time updates from Supabase
    const unsubscribe = supabaseServices.ambulance.listenToEvents((data) => {
      setAmbulances(Array.isArray(data) ? data : []);
    })

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  return {
    ambulances: Array.isArray(ambulances) ? ambulances : [],
    loading,
  };
}
