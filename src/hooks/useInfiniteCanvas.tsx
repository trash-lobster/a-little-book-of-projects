import {
    InfiniteCanvasElement,
    InfiniteCanvasAPI,
} from '@reffy/infinite-canvas';
import { useState, useEffect } from 'react';

export function useInfiniteCanvas(id: string) {
    const [ready, setReady] = useState(false);
    const [canvasApi, setCanvasApi] = useState<InfiniteCanvasAPI | null>(null);

    useEffect(() => {
        const el = document.getElementById(id);
        if (!el || !(el instanceof InfiniteCanvasElement)) {
            console.warn('Element is not ready yet.');
            return;
        }
        const onLoad = async () => {
            setCanvasApi(await InfiniteCanvasAPI.forElement(el));
            setReady(true);
        };
        el.addEventListener('load', onLoad);
        return () => el.removeEventListener('load', onLoad);
    }, [id]);

    return {
        addImageFromLocal: (fileList: FileList) =>
            canvasApi?.addImageFromLocal(fileList),
        clearCanvas: () => canvasApi?.clearCanvas(),
        snapToCenter: () => canvasApi?.snapToCenter(),
        isReady: ready,
        api: canvasApi,
    };
}
