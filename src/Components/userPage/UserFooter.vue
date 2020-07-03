<template>
  <div>
      <footer class="sticky-footer">
      <div class="container">
        <div class="text-center">
          <small>Copyright © Marpe Online Procument {{data}}</small>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
    name: 'referral',
    data(){
        return {
            data: new Date().toDateString()
        }
    }
}
</script>

<style>

</style>>