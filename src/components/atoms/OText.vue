<template>
  <div
    class="default"
    :role="heading ? 'heading' : 'text'"
  >
    <component
      class="default"
      :is="type"
      :class="{
        xl3: xl3,
        xl2: xl2,
        xl: xl,
        lg: lg,
        med: med,
        base: base,
        sm: sm,
        xs: xs,
        bold: bold,
        textPrimary: textPrimary,
        textSecondary: textSecondary,
        disabled: disabled,
        semiBold: semiBold,
        textBlue: textBlue && isDefault,
        textRed: textRed,
        textGreen: textGreen,
        textWhite: textWhite,
        baseBold: baseBold,
        heading: Boolean,
        level: {
          type: Number,
          required: false,
          default: null,
        },
      }"
      :role="heading ? 'heading' : 'text'"
      :aria-level="level !== null ? level : ''"
      v-on="$listeners"
      :style="oTextStyle"
    >
      <slot />
    </component>
  </div>
</template>

<script>
import { trim } from '@/utils'

export default {
  name: 'OText',
  props: {
    xl3: Boolean,
    xl2: Boolean,
    xl: Boolean,
    lg: Boolean,
    med: Boolean,
    base: Boolean,
    sm: Boolean,
    xs: Boolean,
    heading: Boolean,
    level: {
      type: Number,
      required: false,
      default: null
    },
    oTextStyle: {
      type: String,
      required: false,
      default: ''
    },
    bold: Boolean,
    textPrimary: Boolean,
    textSecondary: Boolean,
    disabled: Boolean,
    semiBold: Boolean,
    textBlue: Boolean,
    textRed: Boolean,
    textGreen: Boolean,
    textWhite: Boolean,
    baseBold: Boolean
  },
  data () {
    const type = this.xl2 ? 'h1'
      : this.xl ? 'h2'
        : this.sm ? 'h4'
          : this.xs ? 'h5'
            : this.lg || this.heading ? 'h3'
              : 'div'

    return {
      text: '',
      isDefault: true,
      type
    }
  },
  mounted () {
    this.text = this.$slots.default
      ? trim(this.$slots.default[0].text)
      : this.$el.innerText
        ? trim(this.$el.innerText)
        : ''

    this.determineLinkColor()
  },
  methods: {
    determineLinkColor () {
      const link = document.getElementsByClassName('teleLink')
      // const style = window.getComputedStyle(link[0])
      // this.isDefault = style.getPropertyValue('color') !== 'rgb(70, 71, 73)'
    }
  }
}
</script>

<style scoped>
.default {
  margin: 0;
  padding: 0;
  color: var(--text-primary);
  font-size: 14px;
  line-height: 20px;
  font-family: var(--font-family);
}
.xl3 {
  font-size: var(--font-size-xl3, 44px) !important;
  line-height: var(--line-height, 48px) !important;
}
.xl2 {
  font-size: var(--font-size-xl2, 33px) !important;
  line-height: var(--line-height, 40px) !important;
}
.xl {
  font-size: var(--font-size-xl, 24px) !important;
  line-height: var(--line-height, 28px) !important;
}
.lg {
  font-size: var(--font-size-lg, 18px) !important;
  line-height: var(--line-height, 24px) !important;
}
.med {
  font-size: var(--font-size-med, 16px) !important;
  line-height: var(--line-height, 24px) !important;
}
.base {
  font-size: var(--font-size-base, 14px) !important;
  line-height: var(--line-height, 20px) !important;
}
.sm {
  font-size: var(--font-size-sm, 12px) !important;
  line-height: var(--line-height, 20px) !important;
}
.xs {
  font-size: var(--font-size-xs, 11px) !important;
  line-height: var(--line-height, 16px) !important;
}

.bold {
  font-weight: var(--font-bold-weight, 900) !important;
}
.baseBold {
  font-weight: var(--font-baseBold-weight, 700) !important;
}
.semiBold {
  font-weight: var(--font-semiBold-weight, 500) !important;
}
.textPrimary {
  color: var(--text-primary) !important;
}
.textSecondary {
  color: var(--text-secondary) !important;
}
.disabled {
  color: var(--text-disabled) !important;
}
.textBlue {
  color: blue !important;
}
.textRed {
  color: #d83933 !important;
}
.textGreen {
  color: #166e38 !important;
}
.textWhite {
  color: rgba(255, 255, 255, 0.87) !important;
}
</style>
