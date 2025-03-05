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
    subpanel_image_id: string | null;
    email_image_id: string | null;
    password_image_id: string | null;
    checkbox_image_id: string | null;
    checkbox_background_color: string;
    font_id: string | null;
}

export type ElementType = 'background' | 'signin' | 'signup';  