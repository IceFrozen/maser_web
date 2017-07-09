<template>
<!-- 已经废弃 -->
<el-card class="box-card">
  <div v-for="g in groupShow" class="text item">
    {{ g.name}} ：{{g.s}}
  </div>
</el-card>
</template>
<style>
  .text {
    font-size: 30px;
  }

  .item {
    padding: 18px 0;
    text-align: center;
  }
  .box-card {
    width:100%;
  }
</style>
<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    data() {
      return {
      groupShow:[]
      }
    },
    computed: {
       ...mapState({
         }),
    },
    methods: {
    },
    async mounted() {
      if(!this.$route.params.groupShow){
        this.$router.replace('/404')
        return 
      }
      this.groupShow = this.$route.params.groupShow
    }
  }
  </script>