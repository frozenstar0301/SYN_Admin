export interface ImageItem {
    id: string;
    url: string;
    name?: string;
}

export interface FontItem {
    id: string;
    url: string;
    name: string;
}

export interface Screen {
    id: string;
    background_image_id: string | null;
    button_image_id: string | null;
    font_id: string | null;
}

export type ElementType = 'background' | 'signin' | 'signup';  