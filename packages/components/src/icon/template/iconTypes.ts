import {ExtractPropTypes} from 'vue'

export const iconProps = {
    name: {
        type: String,
        default: 'home',
    }

}
export type IconProps = ExtractPropTypes<typeof iconProps>


