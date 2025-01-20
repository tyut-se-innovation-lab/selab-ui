import { defineComponent, ref, computed, watch, PropType } from 'vue';
import '../../less/components/Slider/index.less';

export default defineComponent({
    name: 'se-slider',
    props: {
        value: {
            type: Number as PropType<number>,
            required: false,
            default: 0,
        },
        min: {
            type: Number as PropType<number>,
            default: 0,
        },
        max: {
            type: Number as PropType<number>,
            default: 100,
        },
        step: {
            type: Number as PropType<number>,
            default: 1,
        },
        disabled: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        type: {
            type: String as PropType<string>,
            default: '',
        },
    },
    emits: ['update:value', 'change', 'input'],
    setup(props, { emit }) {
        const currentValue = ref(props.value);
        const sliderRef = ref<HTMLDivElement | null>(null);
        const dragging = ref(false);

        const percentage = computed(() => {
            const range = props.max - props.min;
            return ((currentValue.value - props.min) / range) * 100;
        });

        const sliderStyle = computed(() => {
            return props.type ? `se-Slider--${props.type}` : '';
        });

        const handleStyle = computed(() => ({
            left: `${percentage.value}%`,
        }));

        const updateValue = (newVal: number) => {
            const clampedValue = Math.min(props.max, Math.max(props.min, newVal));
            currentValue.value = clampedValue;
            emit('update:value', clampedValue);
            emit('input', clampedValue);
        };

        const onMouseDown = (event: MouseEvent) => {
            if (props.disabled) return;
            dragging.value = true;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            updateFromEvent(event);
        };

        const onMouseMove = (event: MouseEvent) => {
            if (!dragging.value || !sliderRef.value) return;
            updateFromEvent(event);
        };

        const onMouseUp = () => {
            if (!dragging.value) return;
            dragging.value = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            emit('change', currentValue.value);
        };

        const updateFromEvent = (event: MouseEvent) => {
            if (!sliderRef.value) return;
            const rect = sliderRef.value.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const width = rect.width;
            const newValue = ((offsetX / width) * (props.max - props.min)) + props.min;
            updateValue(Math.round(newValue / props.step) * props.step);
        };

        watch(
            () => props.value,
            (newValue) => {
                if (newValue !== currentValue.value) {
                    currentValue.value = newValue;
                }
            }
        );

        return () => (
            <div
                ref={sliderRef}
                class={`se-Slider ${sliderStyle.value}`}
                onMousedown={onMouseDown}
            >
                <div class="se-Slider__track">
                    <div
                        class="se-Slider__progress"
                        style={{ width: `${percentage.value}%` }}
                    ></div>
                </div>
                <div
                    class={`se-Slider__handle ${props.disabled ? 'se-Slider__handle--disabled' : ''}`}
                    style={handleStyle.value}
                    onMousedown={onMouseDown}
                ></div>
            </div>
        );
    },
});
