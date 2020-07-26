<template>
  <div>
    <b-row cols="1" cols-sm="2" cols-md="2"  cols-lg="4">
      <b-col>
        <content-placeholders :rounded="true">
          <content-placeholders-img />
          <content-placeholders-text :lines="2" />
        </content-placeholders>
      </b-col>
      <b-col>
        <content-placeholders :rounded="true">
          <content-placeholders-img />
          <content-placeholders-text :lines="2" />
        </content-placeholders>
      </b-col>
      <b-col>
        <content-placeholders :rounded="true">
          <content-placeholders-img />
          <content-placeholders-text :lines="2" />
        </content-placeholders>
      </b-col>
      <b-col>
        <content-placeholders :rounded="true">
          <content-placeholders-img />
          <content-placeholders-text :lines="2" />
        </content-placeholders>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Loading"
};
</script>

<style scoped>
</style>
