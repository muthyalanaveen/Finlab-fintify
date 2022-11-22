<template>
  <div>
    <div class="mt-4">
      <o-text
        lg
        bold
      >
        {{ title }}
      </o-text>
    </div>

    <a :href="'tel:'+this.customerSupportContact" class="teleLink">
      <div class="mt-4">
        <o-text
          md
          text-blue
        >
          Have a question? Give us a call.
        </o-text>
      </div>
      <div class="mt-2">
        <o-text
          md
          text-blue
        >
          {{ customerSupportContact }}
        </o-text>
      </div>
    </a>
  </div>
</template>

<script>

export default {
  name: 'NotFoundReturnMethod',
  data: () => ({
  }),
  props: {
    customerSupportContact: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
