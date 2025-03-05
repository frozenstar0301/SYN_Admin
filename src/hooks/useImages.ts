import { useState, useEffect } from 'react';
import { ImageItem } from '../types';

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
});

export const useImages = () => {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const fetchImages = async () => {
        const response = await api.get('/images');

        if (response.data) setImages(response.data);
    };

    const uploadImage = async (file: File) => {
        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('image', file);
            const response = await api.post('/images/upload', formData);
            if (response.data) setImages(response.data);
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