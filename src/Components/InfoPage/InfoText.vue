<template>
  <div class="row my-5 bg-white rounded p-5">
    <div class="col">
      <content-placeholders v-if="desc == undefined">
        <content-placeholders-heading :img="false" />
        <content-placeholders-text :lines="3" />
      </content-placeholders>
      <div class="content">
        <div v-html="desc"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['desc'],
  name: 'InfoText',
  data() {
    return {
    }
  }
}
</script>

<style scoped>

a{color: #2f4153 !important;}

.col4 h6 {
  height: 25px;
  padding-bottom: 25px;
  border-bottom:1px solid lightgrey;
  color: grey;
  cursor: pointer;
}

.col4.active h6 {
  font-weight: bold;
  border-bottom:1px solid black !important;
  color: black;
}
</style>
