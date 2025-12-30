import React from 'react';
import { createComponent } from '@lit/react';
import { InfiniteCanvasElement } from '@reffy/infinite-canvas';

export const InfiniteCanvas = createComponent({
    tagName: 'infinite-canvas',
    elementClass: InfiniteCanvasElement,
    react: React,
    events: {
        onChange: 'change',
        onLoad: 'load',
        onSaveComplete: 'savecomplete',
        onSaveFail: 'savefail',
        onResize: 'resize',
    },
});
