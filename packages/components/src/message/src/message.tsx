import { defineComponent, computed, VNode, ref, watch, onMounted } from "vue";
import "../../less/components/message/index.less";
import { getSizeMap, getStringWidth } from "@selab-ui/utils";
import SeIcon from "../../icon/template/icon.vue";
import { msgProps, iconMap } from "./message";

export default defineComponent({
  name: "SeMsg",
  props: msgProps,
  expose: ["close"],
  setup(props, { expose }): () => VNode {
    const messageClasses = computed(() => {
      return {
        ["se-msg"]: true,
        ["se-msg-" + props.type]: true,
        ["se-msg-" + props.size]: true,
      };
    });

    const message = computed(() => {
      if (typeof props.message === "function") return { value: props.message };
      else if (typeof props.message === "string")
        return {
          value: () => props.message,
          msgWidth: getStringWidth(props.message),
        };
      else return { value: () => props.message };
    });

    const visible = ref(false);

    // 计算 top 值，与 opacity 配合实现进出动画效果
    // visible 为 false 时，top - getSizeMap(props.size) * 60px
    // visible 为 true 时，top 0px
    const top = computed(() => {
      return (visible.value ? 0 : -props.height) + props.top;
    });

    const opacity = computed(() => {
      return visible.value ? 1 : 0;
    });

    let timeout: NodeJS.Timeout | null = null;

    const numWidth = computed(() => {
      return 6 + getStringWidth(props.repeatNum.toString());
    });

    function onCloseClick(): void {
      props.onCloseClick?.();
      setVisible(false);
    }

    /** isToClose 为 true 时,重启定时器;
     * isToClose 为 false 时仅清除定时器. */
    function setTimeClose(isToClose: boolean): void {
      clearTimeout(timeout!);
      if (props.duration > 0 && isToClose) {
        timeout = setTimeout(() => {
          setVisible(false);
        }, props.duration);
      }
    }

    function setVisible(val: boolean): void {
      if (val === false) props.onClose!(props.id);
      else visible.value = val;
    }

    watch(
      () => props.repeatNum,
      () => {
        setTimeClose(true);
      },
    );

    watch(
      () => visible.value,
      (val, oVal) => {
        if (val === false && oVal === true) {
          setTimeout(() => {
            props.onDestroy!();
          }, 300);
        }
      },
    );

    onMounted(() => {
      setTimeout(() => {
        visible.value = true;
      }, 0);
      setTimeClose(true);
    });

    expose({
      visible,
      closeVisible: () => setVisible(false),
    });
    return () => (
      <div
        class={`${
          messageClasses.value
            ? Object.keys(messageClasses.value).join(" ")
            : ""
        }`}
        style={`top:${top.value}px;z-index:${props.zIndex};opacity:${
          opacity.value
        };height:${typeof props.message === "string" ? "16px" : "auto"}`}
        onMouseenter={() => setTimeClose(false)}
        onMouseleave={() => setTimeClose(true)}
      >
        {(() => {
          if (props.icon)
            return (
              <div
                class="se-msg-icon"
                style={`line-height:${
                  typeof props.message !== "string"
                    ? // ? (props.height - 24) /
                      (props.height - 12) / getSizeMap(props.size) - 32
                    : "16"
                }px`}
              >
                <SeIcon
                  icon={"mdi:" + iconMap[props.icon]}
                  size={getSizeMap(props.size) * 16}
                  color="#"
                />
              </div>
            );
        })()}
        <div
          class="se-msg-content"
          style={
            message.value.msgWidth ? `width${message.value.msgWidth}px` : ""
          }
        >
          <span>{message.value.value()}</span>
        </div>
        {(() => {
          if (props.showClose)
            return (
              <div
                class={`se-msg-close se-msg-close-${props.type}`}
                onClick={onCloseClick}
              >
                <SeIcon
                  icon="mdi:close"
                  size={getSizeMap(props.size) * 16}
                  color="#"
                />
              </div>
            );
        })()}
        {(() => {
          if (props.repeatNum > 1)
            return (
              <span
                class={`se-msg-num se-msg-num-${props.type}`}
                style={`width: ${numWidth.value}px`}
              >
                {props.repeatNum}
              </span>
            );
        })()}
      </div>
    );
  },
});
