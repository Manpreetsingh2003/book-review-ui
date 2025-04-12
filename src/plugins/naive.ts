import {
    create,
    NButton,
    NCard,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NMenu,
    NImage,
    NRate,
    NInput,
    NTag,
    NDivider,
    NDrawer,
    NIcon
} from 'naive-ui'

export const createNaiveUI = () =>
    create({
        components: [
            NButton,
            NCard,
            NLayout,
            NLayoutHeader,
            NLayoutContent,
            NLayoutFooter,
            NMenu,
            NImage,
            NRate,
            NInput,
            NTag,
            NDivider,
            NDrawer,
            NIcon
        ]
    })
