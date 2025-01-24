// Import necessary modules and styles
import { defineComponent, computed } from "vue";
import "../../less/components/card/index.less";

export default defineComponent({
  name: "se-card",

  props: {
    type: {
      type: String,
      default: "default",
      validator: (value: string) =>
        [
          "default",
          "primary",
          "secondary",
          "success",
          "warning",
          "danger",
        ].includes(value),
    },
    title: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    hoverable: {
      type: Boolean,
      default: false,
    },
    bordered: {
      type: Boolean,
      default: true,
    },
  },

  setup(props, { slots }) {
    // Compute dynamic class names
    const cardClass = computed(() => ({
      "se-card": true,
      [`se-card--${props.type}`]: !!props.type,
      "se-card--hoverable": props.hoverable,
      "se-card--bordered": props.bordered,
    }));

    return () => (
      <div class={cardClass.value}>
        {/* Optional Icon */}
        {props.icon && <se-icon class="se-card-icon">{props.icon}</se-icon>}

        {/* Optional Title */}
        {props.title && <div class="se-card-title">{props.title}</div>}

        {/* Main Content */}
        <div class="se-card-content">
          {slots.default ? slots.default() : <span>No Content Available</span>}
        </div>

        {/* Footer Slot */}
        {slots.footer && <div class="se-card-footer">{slots.footer()}</div>}
      </div>
    );
  },
});
