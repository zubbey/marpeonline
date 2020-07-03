<template>
  <div class="m-auto text-center">
  <h3 style="color: #ea5376" class="pb-4 text-center font-weight-bold">{{label}}</h3>
</div>
</template>

<script>
export default {
  name: 'Breadc',
  props: ['label']
}
</script>

<style scoped>
.breadcrumb {
  background: inherit !important;
  color: #2c3539 !important;
  font-size: 20px;
}

.breadcrumb>li>a {
  text-decoration: none !important;
  color: #2c3539 !important;
}

.breadcrumb>li {
  text-decoration: none !important;
  color: #919191 !important;
}
</style>
