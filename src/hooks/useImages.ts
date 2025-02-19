import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ImageItem } from '../types';

export const useImages = () => {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const fetchImages = async () => {
        const { data } = await supabase
            .from('images')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setImages(data);
    };

    const uploadImage = async (file: File) => {
        setIsUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;

            const { data, error } = await supabase.storage
                .from('images')
                .upload(fileName, file);

            if (error) throw error;

            if (data) {
                const { data: publicURL } = supabase.storage
                    .from('images')
                    .getPublicUrl(fileName);

                await supabase.from('images').insert({
                    url: publicURL.publicUrl,
                    name: file.name,
                });

                fetchImages();
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return { images, uploadImage, isUploading, refreshImages: fetchImages };
};