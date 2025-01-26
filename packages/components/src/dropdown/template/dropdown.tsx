import { defineComponent, computed, ref, onMounted, watch, reactive } from "vue";
import {MenuItem} from "./type.ts"; // 引入 se-icon 组件
import "../../less/components/dropdown/index.less"

export default defineComponent({
    name: "seDropdown",
    props: {
        type: {
            type: String,
            default: "default", // 默认类型
        },
        trigger: {
            type: String,
            default: "click", // 触发方式，click 或 hover
        },
        placement: {
            type: String,
            default: "bottomLeft", // 默认下拉菜单的位置
        },
        disabled: {
            type: Boolean,
            default: false, // 是否禁用
        },
        menuItems: {
            type: Array as () => MenuItem[],  // 这里用 MenuItem 数组
            default: () => [], // 默认值为空数组
        },
    },
    setup(props, { slots, emit }) {
        const visible = ref(false); // 控制下拉菜单的显示与隐藏
        const currentIndex = ref(-1); // 当前选中的菜单项
        const dropdownRef = ref<HTMLElement | null>(null);
        const triggerRef = ref<HTMLElement | null>(null);

        // 下拉菜单的类名
        const dropdownClasses = computed(() => [
            "se-dropdown",
            props.type ? `se-dropdown--${props.type}` : "",
            props.placement ? `se-dropdown--${props.placement}` : "",
            visible.value ? "se-dropdown--visible" : "",  // 根据 visible 状态更新类名
            props.disabled ? "se-dropdown--disabled" : "",
        ]);

        // 切换菜单显示与隐藏
        const toggleDropdown = (e: Event) => {
            if (props.disabled) return;
            visible.value = !visible.value;
            e.stopPropagation(); // 阻止事件冒泡
        };

        // 关闭菜单
        const closeDropdown = () => {
            visible.value = false;
        };

        // 处理点击菜单项
        const handleMenuItemClick = (index: number) => {
            currentIndex.value = index;
            closeDropdown();
            // 触发自定义的事件（将选中的菜单项内容传递给父组件）
            emit("onSelect", props.menuItems[index]); // 通过事件传递选中的菜单项内容
        };

        // 监听键盘事件，支持通过上下键选择菜单项
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!visible.value) return;

            if (e.key === "ArrowDown") {
                // 向下箭头
                if (currentIndex.value < props.menuItems.length - 1) {
                    currentIndex.value += 1;
                }
            } else if (e.key === "ArrowUp") {
                // 向上箭头
                if (currentIndex.value > 0) {
                    currentIndex.value -= 1;
                }
            } else if (e.key === "Enter") {
                // 回车确认选项
                handleMenuItemClick(currentIndex.value);
            }
        };

        // 点击外部区域关闭菜单
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node) && !triggerRef.value?.contains(e.target as Node)) {
                closeDropdown();
            }
        };

        // 组件挂载时，添加事件监听
        onMounted(() => {
            document.addEventListener("click", handleClickOutside);
            document.addEventListener("keydown", handleKeyDown);  // 监听键盘事件
        });

        // 监听 visible 状态，确保当 visible 变化时清除事件监听
        watch(visible, (newValue) => {
            if (!newValue) {
                document.removeEventListener("click", handleClickOutside);
                document.removeEventListener("keydown", handleKeyDown);
            }
        });

        // 防止在快速移动鼠标时关闭菜单
        let hideTimer: ReturnType<typeof setTimeout> | null = null;

        // 处理 hover 触发显示
        const handleMouseEnter = () => {
            if (props.trigger === "hover" && !props.disabled) {
                visible.value = true;
            }
        };

        const handleMouseLeave = () => {
            if (props.trigger === "hover" && !props.disabled) {
                // 延迟隐藏，给用户一些时间
                if (hideTimer) clearTimeout(hideTimer);
                hideTimer = setTimeout(() => {
                    visible.value = false;
                }, 200); // 延迟 200ms 关闭
            }
        };

        // 处理下拉菜单的 hover 状态，确保鼠标在菜单上时不会关闭
        const handleDropdownMouseEnter = () => {
            if (hideTimer) clearTimeout(hideTimer); // 清除定时器
            visible.value = true;
        };

        const handleDropdownMouseLeave = () => {
            // 延迟隐藏
            if (hideTimer) clearTimeout(hideTimer);
            hideTimer = setTimeout(() => {
                visible.value = false;
            }, 200); // 延迟 200ms 关闭
        };

        return () => (
            <div class={dropdownClasses.value} ref={dropdownRef}>
                <div
                    class="se-dropdown-trigger"
                    onClick={(e) => toggleDropdown(e)}
                    onMouseenter={handleMouseEnter}
                    onMouseleave={handleMouseLeave}
                    ref={triggerRef}
                    role="button"
                    aria-haspopup="true"
                    aria-expanded={visible.value.toString()}
                >
                    {slots.trigger ? slots.trigger() : <span>点击触发下拉</span>}
                </div>
                {visible.value && (
                    <div
                        class="se-dropdown-menu"
                        onMouseenter={handleDropdownMouseEnter}  // 增加对下拉菜单的 hover 监听
                        onMouseleave={handleDropdownMouseLeave}  // 增加对下拉菜单的 hover 监听
                    >
                        {props.menuItems.length === 0 ? (
                            <div>暂无菜单项</div>
                        ) : (
                            props.menuItems.map((item, index) => (
                                <div
                                    class={[
                                        "se-dropdown-item",
                                        currentIndex.value === index ? "se-dropdown-item--selected" : ""
                                    ]}
                                    onClick={() => handleMenuItemClick(index)}
                                    key={index}
                                    // style={{display:"inline"}}
                                >
                                    {item.icon && <se-icon  icon={item.icon} size={16} color={"#666"} />} {/* 渲染图标 */}
                                    {item.label} {/* 渲染文字 */}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        );
    },
});
