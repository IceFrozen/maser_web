<template>
  <div>
    <h1>vuex 测试</h1>
   
   
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

  export default {
    computed: {
  	// 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
     
    ])
    },
    methods: {
    ...mapActions([
     
    ])
    
    }
  }

</script>