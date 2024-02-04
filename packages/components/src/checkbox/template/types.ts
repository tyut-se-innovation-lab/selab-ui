import { ExtractPropTypes } from "@vue/runtime-core"

export const checkboxProps = {
    size: {
        type: String,
        default: ''
    },
    options: {
        type: Array as () => (String | Number | Boolean | null)[],
        default: () => []
    },
    disabled: {
        type: Boolean,
        default: false
    }
}
export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>