import { useState, useEffect } from 'react';
import { FontItem } from '../types/index';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const useFonts = () => {
    const [fonts, setFonts] = useState<FontItem[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const fetchFonts = async () => {
        const response = await api.get('/fonts');

        if (response.data) setFonts(response.data);
    };

    const uploadFont = async (file: File) => {
        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('font', file);
            const response = await api.post('/fonts/upload', formData);
            if (response.data) setFonts(response.data);
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