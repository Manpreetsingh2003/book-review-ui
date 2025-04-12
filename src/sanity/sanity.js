import { createClient } from '@sanity/client'

export const sanity = createClient({
    projectId: 'bvr3rbah',
    dataset: 'production',
    apiVersion: '2024-04-11',
    useCdn: true,
})