<template>
  <div id="root">
    <p>{{ originalPrice }}</p>
    <p>{{ originalPrice1 }}</p>
    <p>{{ originalPrice2 }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['originalPrice', 'originalPrice1', 'originalPrice2'])
    }
}
</script>

<style>

</style>