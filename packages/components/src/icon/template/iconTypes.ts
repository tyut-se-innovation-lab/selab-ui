import {ExtractPropTypes, PropType} from 'vue'

export const iconProps = {
    name: {
        type: String,
        default:"down"
    },
    iconSize: {
        type: [Number, String],
        default: '16px'
    },
    color: {
        type: String,
        default: 'black'
    },
    border:{
        type:String
    }


}
export type IconProps = ExtractPropTypes<typeof iconProps>


