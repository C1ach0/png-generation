
export interface ImageBuilder {
    content: string;
    framework?: 'vue'|'react'|'html';
    css?: string;
    tailwindcss?: boolean;
    data?: Record<string, any>;
    width: number;
    height: number;
    format?: 'png'|'jpeg';
}
