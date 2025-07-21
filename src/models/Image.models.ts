
export interface ImageBuilder {
    vueCode: string;
    css?: string;
    tailwindcss?: boolean;
    data?: Record<string, any>;
    width: number;
    height: number;
    format?: 'png'|'jpeg';
}
