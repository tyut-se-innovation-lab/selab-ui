import {ExtractPropTypes, PropType} from 'vue'

export const iconProps = {
    name: {
        type: String,
        default:"home"
    },
    size: {
        type: [String, Number] as PropType<string | number>,
        default: 'inherit'
    },
    color: {
        type: String,
        default: 'inherit'

    },


}
export type IconProps = ExtractPropTypes<typeof iconProps>


