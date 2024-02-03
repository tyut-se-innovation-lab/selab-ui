import { ExtractPropTypes } from "@vue/runtime-core"

export const radioProps = {
    size: {
        type: String,
        default: ''
    },
    options: {
        type: Array as () => (String | Number | Boolean | null)[],
        default: () => []
    },
    name: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    }
}
export type RadioProps = ExtractPropTypes<typeof radioProps>