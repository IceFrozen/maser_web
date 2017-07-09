<template>
  <!-- 已经废弃 -->
  <el-row class="container" >
    <el-col :span="24" class="header" style="height:180px;">
      <el-col :span="24" align="center" style="margin-top: 5%;">
        <span style="font-size:40px;top:10px" >{{AskInfo.name}}</span>
      </el-col>
    </el-col>
    <el-col :span="24" class="main" style="top:250px">
      <section class="content-container" >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-col  :span="12">
              <el-input placeholder="姓名" v-model="username" size="large">
                <template slot="prepend">姓名</template>
              </el-input>
            </el-col>
            <el-col  :span="6" style="margin-top: 10px;margin-left:50px">
             <el-radio-group v-model="sex">
             <el-radio class="radio" label="男" style="font-size:30px;">男</el-radio>
                 <el-radio class="radio" label="女" style="font-size:30px;">女</el-radio>
                  <template slot="prepend">性别</template>
              </el-radio-group>
            </el-col>
          </div>
          <br />
          <br />
           <div slot="header" class="clearfix">
           
               
          </div>
           <div slot="header" class="clearfix">
            <el-input placeholder="年龄" v-model="age"  size="large">
              <template slot="prepend">年龄</template>
            </el-input>
          </div>
          <div slot="header" class="clearfix">
            <el-input placeholder="联系方式" v-model="phoneNumber"  size="large">
              <template slot="prepend">手机</template>
            </el-input>
          </div>
        </el-card>
        <el-card class="box-card" v-for="group in AskInfo.Groups">
          <div slot="header" class="clearfix">
            <span style="line-height: 40px;font-size:35px;">{{group.title}}</span>
          </div>
          <el-col :span="24" class="breadcrumb-container">
            <el-card class="box-card" v-for="ask in group.questions">
              <div slot="header" class="clearfix">
                <span style="line-height: 40px;font-size:35px;">{{ask.index}}.{{ask.name}}</span>
              </div>
               <el-radio-group v-model="ask.isSelect" @change="changeRadio(ask,group)">
              <div v-for="askItem in ask.select" class="text item" style="font-size:25px;">
               <el-radio class="radio" :label="askItem.index" style="font-size:30px;">{{askItem.selection}}({{askItem.score}}分)</el-radio>
              </div>
              </el-radio-group>
            </el-card>
          </el-col>
          <div class="bottom clearfix">
            <el-input placeholder="本组得分" v-model="group.totalScore" size="large">
              <template slot="prepend">本组得分</template>
            </el-input>
          </div>
        </el-card>
         <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-button type="primary" size="large" style="width:100%;height:80px;font-size:30px" @click="subAsk">提交信息</el-button>
          </div>
         
        </el-card>
         
      </section>
    </el-col>
  </el-row>
</template>

<style>


</style>
<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    data() {
      return {
        addSource:{},
        username:"",
        phoneNumber:"",
        sex:"男",
        age:0
      }
    },
    computed: {
       ...mapState({
          AskInfo:state => state.questionDetail.askInfo,
         }),
    },
    methods: {
      ...mapActions([
        'setASKID',
        'subAskToServer'
        ]),
      onSubmit() {
        console.log('submit!');
      },
      changeRadio(ask,group){
        if(!this.addSource[group.id]){
           this.addSource[group.id] = []
        }
        let total = 0
        let select = ask.isSelect
        ask.select.map(ask=>{
          if(ask.index == select){
            total = parseInt(ask.score)
          }
        })
        let tmp = 0
        this.addSource[group.id][ask.index - 1] = total
        this.addSource[group.id].map(s => {
          tmp += s
        })
        group.totalScore = tmp
      },
      handleopen() {
        //console.log('handleopen');
      },
      handleclose() {
        //console.log('handleclose');
      },
      handleselect: function (a, b) {
      },
      async subAsk() {
        if(this.username.trim().length ==0) {
          this.$alert('需要填写名字', '', {
            confirmButtonText: '确定',
          },null)
          return
        }
        if(this.phoneNumber.trim().length == 0) {
          this.$alert('需要填写手机号', '', {
            confirmButtonText: '确定',
          },null)
          return
        }
        let senData = {
            username:this.username,
            phone:this.phoneNumber,
            sex:this.sex,
            age:this.age
        }
        let ret = this.validata()
        if(!ret) return 
        let res = await this.subAskToServer(senData)
        if(res.isSucc == 0){
          let groupShow = this.getGroupSource()
          this.$router.push({ name: 'questionShow', params: {groupShow}})
      
        }
      },
      getGroupSource() {
        let tmp = []
        this.AskInfo.Groups.map(g=>{
          tmp.push({name:g.title,s:g.totalScore})
        })
        return tmp

      },
      //退出登录
      validata(){
        let groups = this.AskInfo.Groups
        for(let i =0 ;i < groups.length;i++){
          let groupItem = groups[i]
          for(let j=0 ; j < groupItem.questions.length;j++){
            let q = groupItem.questions[j]
            if(q.isSelect == '-1') {
              this.$alert(groupItem.title +"中有问题没有写", '', {
                confirmButtonText: '确定',
              },null)
              return false
            }
          }
        }
        return true
      },
      logout: function () {
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          type: 'warning'
        }).then((res) => {
          return _this.$router.push('/login');
        }).catch(() => {

        });
      }
    },
    async mounted() {
      if(!this.$route.query.id){
        this.$router.replace('/404')
      }else{
        let ret = await this.setASKID(this.$route.query.id)
        if(!ret) return 
        if(ret.isSucc < 0){
          this.$router.replace('/404')
        }
      }
    }
  }

</script>
<style scoped lang="scss">
  @import '~scss_vars';
  
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .header {
      height: 60px;
      line-height: 60px;
      background: $color-primary;
      color:#fff;
      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        .userinfo-inner {
          cursor: pointer;
          color:#fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
        }
      }
      .logo {
        //width:230px;
        height:60px;
        font-size: 22px;
        padding-left:20px;
        padding-right:20px;
        border-color: rgba(238,241,146,0.3);
        border-right-width: 1px;
        border-right-style: solid;
        img {
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        }
        .txt {
          color:#fff;
        }
      }
      .logo-width{
        width:230px;
      }
      .logo-collapse-width{
        width:60px
      }
      .tools{
        padding: 0px 23px;
        width:14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
    }
    .main {
      display: flex;
      // background: #324057;
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
      aside {
        flex:0 0 230px;
        width: 230px;
        // position: absolute;
        // top: 0px;
        // bottom: 0px;
        .el-menu{
          height: 100%;
        }
        .collapsed{
          width:60px;
          .item{
            position: relative;
          }
          .submenu{
            position:absolute;
            top:0px;
            left:60px;
            z-index:99999;
            height:auto;
            display:none;
          }

        }
      }
      .menu-collapsed{
        flex:0 0 60px;
        width: 60px;
      }
      .menu-expanded{
        flex:0 0 230px;
        width: 230px;
      }
      .content-container {
        // background: #f1f2f7;
        flex:1;
        // position: absolute;
        // right: 0px;
        // top: 0px;
        // bottom: 0px;
        // left: 230px;
        overflow-y: scroll;
        padding: 20px;
        .breadcrumb-container {
          //margin-bottom: 15px;
          .title {
            width: 200px;
            float: left;
            color: #475669;
          }
          .breadcrumb-inner {
            float: right;
          }
        }
        .content-wrapper {
          background-color: #fff;
          box-sizing: border-box;
        }
      }
    }
  }
</style>