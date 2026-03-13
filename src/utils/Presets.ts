export interface PresetValues {
    useSystemClipboard: boolean;
    easyMotion: boolean;
    incSearch: boolean;
    hlSearch: boolean;
    surround: boolean;
    sneak: boolean;
    smartcase: boolean;
    ignorecase: boolean;
    camelCaseMotion: boolean;
}

const presets: Record<string, PresetValues> = {
    minimal: {
        useSystemClipboard: true,
        easyMotion: false,
        incSearch: false,
        hlSearch: false,
        surround: false,
        sneak: false,
        smartcase: false,
        ignorecase: false,
        camelCaseMotion: false,
    },
    default: {
        useSystemClipboard: true,
        easyMotion: true,
        incSearch: true,
        hlSearch: true,
        surround: true,
        sneak: false,
        smartcase: true,
        ignorecase: true,
        camelCaseMotion: false,
    },
    full: {
        useSystemClipboard: true,
        easyMotion: true,
        incSearch: true,
        hlSearch: true,
        surround: true,
        sneak: true,
        smartcase: true,
        ignorecase: true,
        camelCaseMotion: true,
    },
};

export function getPreset(name: string): PresetValues {
    return presets[name] ?? presets['default'];
}
