<template>
  <div class="row my-5 bg-white rounded p-5">
    <div class="col">
      <ul class="nav nav-tabs more info d-flex justify-content-between text-center" id="myTab" role="tablist">
        <li class="nav-item" role="presentation" v-for="info in moreInfo" :key="info">
          <a ref="active" class="nav-link" :id="info+'-tab'" data-toggle="tab"  @click="getKey(info)" :href="'#'+info" role="tab" aria-controls="home" aria-selected="true">{{ info }}</a>
        </li>
      </ul>
      <content-placeholders v-if="product == null">
        <content-placeholders-heading :img="false" />
        <content-placeholders-text :lines="3" />
      </content-placeholders>
      <div class="tab-content pt-3" id="myTabContent" v-for="item in product" :key="item._id">
        <div class="col4 flex-fill tab-pane fade show active" id="DESCRIPTION" role="tabpanel" aria-labelledby="DESCRIPTION-tab'">
          <div v-for="(desc, index) in item.desc" :key="index">
            <p>{{ desc }}</p>
          </div>
        </div>

        <div class="col4 flex-fill tab-pane fade show active" id="WARRANTY" role="tabpanel" aria-labelledby="WARRANTY-tab'">
          <div>
            {{ 'there\'s no warranty' }}
          </div>
        </div>

        <div class="col4 flex-fill tab-pane fade show active" id="REVIEWS" role="tabpanel" aria-labelledby="REVIEWS-tab'">
          <div>
            {{ 'there\'s no available review' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  name: 'InfoText',
  data() {
    return {
      moreInfo: ['DESCRIPTION', 'WARRANTY', 'REVIEWS'],
      infoId: '',
    }
  },
  mounted(){
    // let descTab = this.$refs.DESCRIPTION;
    this.infoId == 'DESCRIPTION'

  },
  methods: {
    getKey(key){
      return this.infoId = key;
    },
    moreInfoSelect(index) { //More Info area tab selector
      return this.active = index
    },
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
