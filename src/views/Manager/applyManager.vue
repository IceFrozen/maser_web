<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input  placeholder="订单号" v-model="findApplyId"></el-input>
				</el-form-item>
			<!-- 	<el-form-item label="活动区域">
					<el-select placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="创建时间">
					<el-col :span="11">
						 <el-date-picker v-model="timeScope" type="daterange" align="right" placeholder="选择日期范围(未开发)" :picker-options="pickerOptions">
    </el-date-picker>
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
						<!-- <el-time-picker type="fixed-time" placeholder="选择时间"  style="width: 100%;"></el-time-picker> -->
					</el-col>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="search">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="applyList" highlight-current-row v-loading="listLoading"  @selection-change="selsChange" style="width: 100%;">
			<!-- <el-table-column type="selection">
			</el-table-column> -->
			<el-table-column type="expand">
      	<template scope="props">
        	<el-form label-position="left" inline class="demo-table-expand">
          	<el-form-item label="订单号:">
            	<span>{{ props.row.id }}</span>
          	</el-form-item>
          	<el-form-item label="提现金额:">
            	<span>￥{{ props.row.cash }}</span>
          	</el-form-item><br>
          	<el-form-item label="创建时间:">
            	<span>{{ props.row.createTime | time}}</span>
          	</el-form-item>
          	<el-form-item label="审核时间:">
            	<span>{{ props.row.endTime | time}}</span>
          	</el-form-item>
          	<el-form-item label="审核状态:">
            	<span>【{{ props.row.status | showStatue}}】</span>
          	</el-form-item><br />
          	<el-form-item label="推官员id:">
            	<span>{{ props.row.sellerId }}</span>
          	</el-form-item><br />
          	<el-form-item label="第三方返回:">
            	<span>{{ props.row.params }}</span>
          	</el-form-item>
          	<el-form-item label="审核备注">
            	<span>{{ props.row.description }}</span>
          	</el-form-item><br />
          	<div v-for="item in props.row.RebateDetail" >
          		<el-form-item label="来源订单号：">
            		<span>{{ item.orderId}}</span>
          		</el-form-item>
          		<el-form-item label="订单返现">
            		<span>{{ item.cash}}</span>
          		</el-form-item>
          		<br />	
          	</div>
        	</el-form>
      	</template>
    	</el-table-column>
			<el-table-column type="id" prop="id"  label="订单号" >
			</el-table-column>
			<el-table-column label="icon"  sortable>
		 				<template scope="scope"> <img v-bind:src="scope.row.seller.wxInfo.wxHeadimgurl" class="image" style="    width:50px;height:50px;border-radius:50px" /></template>
			</el-table-column>
			<el-table-column prop="seller.wxInfo.wxNickname" label="申请人"   sortable> <!--  :formatter="formatSex" -->
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" :formatter="showTime" sortable>
			</el-table-column>
			<el-table-column prop="cash" label="提现金额" sortable>
			</el-table-column>	
			<el-table-column prop="status" label="完成状态" :formatter="showStatue" sortable>
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<!-- <el-button size="small" @click="selectRow(scope.$index, scope.row)">查看</el-button> -->
					<el-button type="info" size="small" v-show= "scope.row.status == 0" @click="selectRow(scope.row.id,scope.row,1)">通过</el-button>
					<el-button type="info" size="small"  v-show="scope.row.status == 0" @click="selectRow(scope.row.id,scope.row,2)">不通过</el-button>
					<!-- <el-button type="danger" size="small"  v-show="scope.row.status <= -2" @click="selectRow(scope.row.id,scope.row,3)">异常回滚</el-button> -->
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			 <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> 
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageShow" :total="total" :current-page="page" style="float:right;">
			</el-pagination>
		</el-col>


	</section>
</template>

<script>
	import util from '../../common/js/util'
	import { mapState, mapActions } from 'vuex'
	export default {
		data() {
			return {
				findApplyId:"",
				sels:[],
				timeScope:"",
				pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
			}
		},
		computed: {
   		 ...mapState({
    		 		listLoading:state => state.applyManager.listLoading,
    		 		applyList:state=>state.applyManager.applyList,
    		 		total:state=>state.applyManager.total,
    		 		page:state=>state.applyManager.page,
    		 		pageShow:state=>state.applyManager.pageShow,
    		 })
  	},
  	filters: {
  		showStatue : transForShow,
  		time:util.formatDate.formatter
  	},
		methods: {
			//性别显示转换
			...mapActions([
				'getApplyList',
				'findApplyById',
				'applyCashById'
			]),
			search () {
				if(this.findApplyId.length == 0) {
					return this.getApplyList()
				}
				this.$store.dispatch("findApplyById",this.findApplyId)
			},
			handleCurrentChange(val) {
				
			},
			async selectRow(id,row,num) {
				// num = 1 审核通过
				// num = 2 审核不通过
				let self = this
				if(num !== 1 && num !== 2) {
					return this.$message({message:'操作有误',type: 'error'});
				}
				if(row.status === num) {
					this.$message({message:'已经操作',type: 'error'});
					return
				}
				let res = await this.applyCashById({id,num})
				if(res && res.isSucc >= 0) {
					this.$message({message:'成功',type: 'success'});
				}else{
					this.$message({message:res.des||'失败',type: 'error'});
				}
				return this.getApplyList()
			},
			selsChange: function (sels) {
			},
			showStatue:function(row) {
				return transForShow(row.status)
			},
			showTime:function (row,cloumn) {
				let c = cloumn.property
				return util.formatDate.formatter(row[c])
			},
			//批量删除
			batchRemove: function () {
				return 
			}
		},
		async created() {
		},
		async mounted() {
			await this.getApplyList()
		}
	}

function transForShow (num) {
  /*
    订单状态:
    -3:提现本地错误，需要回滚，
    -2 订单异常（转账）
    -1、审核不通过,
     0、等待审核;
     2、已经到账
     1、审核通过;
  */
  switch (num) {
    case -3 :
      return "本地订单异常"
    case -2 :
      return "订单异常"
    case -1 :
      return "审核未通过"
    case 0 :
      return "等待审核"
    case 1 :
      return "已经通过"
    case 2 :
      return "已经到账"
    default :
      return '未知:' + num
  }
}
</script>

<style scoped>

</style>