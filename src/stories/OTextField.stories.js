import OTextField from '../components/molecules/OTextField.vue'
import { action } from '@storybook/addon-actions'

export default {
  title: 'OTextField',
  component: OTextField,
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
  components: { OTextField },
  methods: {
    logAction: action('field-changed')
  },
  template: '<o-text-field @onChange="logAction" v-bind="$props" />'
})

export const OrderNumber = Template.bind({})
OrderNumber.args = {
  name: 'Order Number OTextField',
  id: 'orderNum',
  title: 'Enter your order number',
  placeholder: '1234567'
}

export const EmailField = Template.bind({})
EmailField.args = {
  name: 'Email Here',
  id: 'orderNum',
  title: 'Enter your order number',
  placeholder: '1234567'
}
