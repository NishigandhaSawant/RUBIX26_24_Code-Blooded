import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

export function useAmbulanceTracking(statusFilter?: string) {
  const [ambulances, setAmbulances] = useState<any[]>([]);
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      let query = supabase
        .from('ambulance_latest_positions')
        .select('*')
        .order('updated_at', { ascending: false });
      
      // Apply status filter if provided
      if (statusFilter && statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching ambulance positions:', error);
        setAmbulances([]);
      } else {
        setAmbulances(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching ambulance positions:', error);
      setAmbulances([]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  const trackAmbulance = async (ambulanceId: string) => {
    try {
      const { error } = await supabase
        .from('ambulance_events')
        .update({ updated_at: new Date().toISOString() })
        .eq('ambulance_id', ambulanceId)
        .order('updated_at', { ascending: false })
        .limit(1);
        
      if (error) {
        console.error('Error tracking ambulance:', error);
      } else {
        // Refresh data after update
        await fetchData();
      }
    } catch (error) {
      console.error('Error tracking ambulance:', error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    ambulances: Array.isArray(ambulances) ? ambulances : [],
    loading,
    trackAmbulance,
    refetch: fetchData
  };
}
