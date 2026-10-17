import { setProjectAnnotations } from '@storybook/react';
import * as previewAnnotations from './.rnstorybook/preview';

// Aplica el preview de Storybook (decoradores, parámetros) a las stories compuestas en los tests.
setProjectAnnotations(previewAnnotations);
