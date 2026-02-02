import type { Block } from 'payload';

export const EmptyBlock: Block = {
    slug: 'emptyBlock',
    interfaceName: 'EmptyBlock',
    imageURL: '/spazio-vuoto.png',
    labels: {
        singular: {
            it: 'Spazio vuoto',
            en: 'Empty Space'
        },
        plural: {
            it: 'Spazi vuoti',
            en: 'Empty Spaces'
        }
    },
    fields: []
};
