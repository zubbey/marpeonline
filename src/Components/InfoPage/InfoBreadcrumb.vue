<template>
  <div>
    <nav class="row justify-content-start bg-white rounded p-2 mb-3" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Home</router-link>
        </li>
        <li class="breadcrumb-item"><router-link to="/">Products</router-link></li>
        <li class="breadcrumb-item">{{ item.slug }}</li>
        <li class="breadcrumb-item active">{{ item.name }}</li>
      </ol>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['item'],
  name: 'InfoBreadcrumb'
}
</script>

<style scoped>
.breadcrumb{
  background: inherit;
}

.breadcrumb>li>a {
  text-decoration: none;
  color: #2c3539 !important;
  font-size: 18px;
}
.breadcrumb>li>a:hover {
  text-decoration: underline;
}

.breadcrumb-item.active {
  text-decoration: none !important;
  color: #f2be00 !important;
}
</style>
