import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Screen } from '../types/index';

export const useScreens = () => {
  const [screens, setScreens] = useState<Screen[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchScreens = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('screens')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setScreens(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch screens');
    } finally {
      setIsLoading(false);
    }
  };

  const saveScreen = async (screen: Partial<Screen>) => {
    try {
      setIsLoading(true);
      
      // First, check if any record exists
      const { data: existingData, error: fetchError } = await supabase
        .from('screens')
        .select('id')
        .limit(1);

      if (fetchError) throw fetchError;

      // Prepare the screen data with required fields
      const screenData = {
        ...screen,
        updated_at: new Date().toISOString(),
      };

      let result;
      
      if (existingData && existingData.length > 0) {
        // Update the existing record
        const { data, error } = await supabase
          .from('screens')
          .update(screenData)
          .eq('id', existingData[0].id)
          .select()
          .single();
          
        if (error) throw error;
        result = data;
      } else {
        console.log("screen::::", screenData);
        // Insert new record if none exists
        const { data, error } = await supabase
          .from('screens')
          .insert([screenData])
          .select()
          .single();
          
        if (error) throw error;
        result = data;
      }

      // Update the local state with the single record
      setScreens([result]);
      return result;

    } catch (err) {
      console.error('Save error:', err);
      setError(err instanceof Error ? err.message : 'Failed to save screen');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loadScreen = async () => {
    try {
      const { data: existingData, error: fetchError } = await supabase
        .from('screens')
        .select('*')
        .limit(1);

      if (fetchError) throw fetchError;
      console.log("existingData::::", existingData)

      if (existingData && existingData.length > 0) {
        // Update the existing record
        return existingData[0];
      } else {
        return {};
      }

      // setIsLoading(true);
      // const { data, error } = await supabase
      //   .from('screens')
      //   .select('*')
      //   .eq('id', id)
      //   .single();
      
      // console.log(data);

      // if (error) throw error;
      // return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load screen');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScreens();
  }, []);

  return {
    screens,
    isLoading,
    error,
    saveScreen,
    loadScreen,
    refreshScreens: fetchScreens,
  };
};