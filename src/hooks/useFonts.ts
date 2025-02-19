import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FontItem } from '../types/index';
import { cleanFontName } from '../utils/fontUtils';

export const useFonts = () => {
    const [fonts, setFonts] = useState<FontItem[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const fetchFonts = async () => {
        const { data } = await supabase
            .from('fonts')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setFonts(data);
    };

    const uploadFont = async (file: File) => {
        setIsUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const fontName = cleanFontName(file.name);

            const { data, error } = await supabase.storage
                .from('fonts')
                .upload(fileName, file);

            if (error) throw error;

            if (data) {
                const { data: publicURL } = supabase.storage
                    .from('fonts')
                    .getPublicUrl(fileName);

                await supabase.from('fonts').insert({
                    url: publicURL.publicUrl,
                    name: fontName,
                });

                fetchFonts();
            }
        } catch (error) {
            console.error('Error uploading font:', error);
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        fetchFonts();
    }, []);

    return { fonts, uploadFont, isUploading, refreshFonts: fetchFonts };
};