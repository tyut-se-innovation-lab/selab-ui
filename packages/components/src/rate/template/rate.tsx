import { defineComponent, computed, ref } from 'vue';
import '../../less/components/rate/index.less';

export default defineComponent({
    name: 'se-rate',
    props: {
        icon: {
            type: String,
            default: 'mingcute:star-fill', // 默认图标名称为 star
        },
        max: {
            type: Number,
            default: 5, // 默认最大评分为 5
        },
        value: {
            type: Number,
            default: 0, // 默认评分为 0
        },
        hoverColor: {
            type: String,
            default: '#f39c12', // 悬浮时的颜色，默认为黄色
        },
        color: {
            type: String,
            default: 'white', // 默认图标颜色
        },
        selectedColor: {
            type: String,
            default: '#f39c12', // 默认选中时的颜色（黄色）
        }
    },
    setup(props, { emit }) {
        const rating = ref(props.value); // 当前评分
        const hoverRating = ref(0); // 当前悬浮的评分

        // 更新评分
        const handleClick = (index: number) => {
            rating.value = index;
            hoverRating.value = index;
            emit('update:value', rating.value); // 更新父组件的评分
        };

        // 鼠标悬浮时更新评分
        const handleMouseEnter = (index: number) => {
            hoverRating.value = index;
        };

        // 鼠标离开时恢复评分
        const handleMouseLeave = () => {
            hoverRating.value = rating.value;
        };

        // 动态计算每个评分项的颜色
        const getIconColor = (index: number) => {
            if (index <= rating.value) {
                return props.selectedColor; // 选中后的颜色
            }
            return hoverRating.value >= index ? props.hoverColor : props.color; // 悬浮颜色或默认颜色
        };

        return () => (
            <ul class="se-rate" onMouseleave={handleMouseLeave}>
                {[...Array(props.max)].map((_, index) => (
                    <div
                        key={index}
                        class={`se-rate-item ${index < rating.value ? 'active' : ''} ${hoverRating.value >= index + 1 ? 'hover' : ''}`}
                        onMouseenter={() => handleMouseEnter(index + 1)}
                        onClick={() => handleClick(index + 1)}
                    >
                        <se-icon
                            icon={props.icon}  // 使用 icon prop，若未提供则使用默认值
                            size={24}
                            color={getIconColor(index + 1)} // 根据当前状态返回颜色
                        />
                    </div>
                ))}
            </ul>
        );
    },
});
