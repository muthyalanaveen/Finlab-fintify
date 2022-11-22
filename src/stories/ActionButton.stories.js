import ActionButton from '../components/atoms/ActionButton.vue'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Action Button',
  component: ActionButton,
  argTypes: {
    color: {
      control:
      {
        type: 'select',
        options: ['primary', 'secondary']
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ActionButton },
  methods: {
    onClick: action('button-clicked')
  },
  template: '<action-button @click="onClick" v-bind="$props" />'
})

export const Primary = Template.bind({})
Primary.args = {
  label: 'Action Button'
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Secondary Button',
  color: 'secondary'
}
