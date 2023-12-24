// Import necessary modules and styles
import { defineComponent, computed } from 'vue';
import '../../less/components/card/index.less';

// Define the component
export default defineComponent({
  // Set the component name
  name: 'se-card',

  // Define the props
  props: {
    type: String
  },

  // Define the setup function
  setup(props, { slots }) {
    const buttonStyle = computed(() => {
      return props.type ? { ['se-card--' + props.type]: true } : {};
    });

    return () => (
        <div
            class={`se-card ${
                buttonStyle.value
                    ? Object.keys(buttonStyle.value).join(' ')
                    : ''
            }`}
        >
          {slots.default && slots.default()}
        </div>
    );
  }
});
