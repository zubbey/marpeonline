<template>
  <b-breadcrumb :items="items"></b-breadcrumb>
</template>

<script>
export default {
  props: ["id", "items"],
  data() {
    return {
    };
  }
};
</script>
<style>
.breadcrumb {
    background-color: #fff !important;
    box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
}
</style>>