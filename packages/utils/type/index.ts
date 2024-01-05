import type { AppContext, Plugin, PropType } from 'vue';

export type COMPWithInstall<T> = T & Plugin;

export type COMPInstallWithContext<T> = COMPWithInstall<T> & {
    _context: AppContext | null;
};

export type CreateProps<T> = {
    [K in keyof T]: {
        type: PropType<T[K]>;
        default: T[K];
        required?: boolean;
    };
};
