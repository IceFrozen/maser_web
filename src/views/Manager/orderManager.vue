<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input  placeholder="订单号" v-model="findOrderId"></el-input>
				</el-form-item>
			<!-- 	<el-form-item label="活动区域">
					<el-select placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="创建时间">
					<el-col :span="11">
						 <el-date-picker v-model="time" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions">
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
		<el-table :data="orders" highlight-current-row v-loading="listLoading"  @selection-change="selsChange" style="width: 100%;">	<el-table-column type="expand">
      	<template scope="props">
        	<el-form label-position="left" inline class="demo-table-expand">
          	<el-form-item label="订单号:">
            	<span>{{ props.row.id }}</span>
          	</el-form-item><br />
          	<el-form-item label="订单状态:">
            	<span>{{ props.row.status }}</span>
          	</el-form-item><br>
          	<el-form-item label="创建时间:">
            	<span>{{ props.row.createTime | time}}</span>
          	</el-form-item><br />
          	<el-form-item label="审核时间:">
            	<span>{{ props.row.payTime | time}}</span>
          	</el-form-item><br />
          	<el-form-item label="审核状态:">
            	<span>【{{ props.row.status | showStatue}}】</span>
          	</el-form-item><br />
          	<el-form-item label="用户id:">
            	<span>{{ props.row.userId }}</span>
          	</el-form-item><br />
          	<el-form-item label="订单金额：">
            	<span>{{ props.row.amount }}</span>
          	</el-form-item><br />
          	<el-form-item label="订单参数">
            	<span>{{ props.row.param }}</span>
          	</el-form-item><br />
          	<el-form-item label="产品id">
            	<span>{{ props.row.goodsId }}</span>
          	</el-form-item><br />	
          	<el-form-item label="url">
            	<span>{{ props.row.url }}</span>
          	</el-form-item>
        	</el-form>
      	</template>
    	</el-table-column>
			<el-table-column type="id" prop="id"   label="订单号">
			</el-table-column>
			<el-table-column label="icon"  sortable>
		 			<template scope="scope"> 
		 				<img v-bind:src="scope.row.playerInfo?scope.row.playerInfo.wxHeadimgurl:null" class="image" style="    width:50px;height:50px;border-radius:50px" />
		 			</template>
			</el-table-column>
			<el-table-column prop="playerInfo.wxNickname" label="用户昵称"  sortable>
			</el-table-column>
			<el-table-column prop="userId" label="用户id"  sortable>
			</el-table-column>
			<el-table-column prop="amount" label="订单金额"   sortable> <!--  :formatter="formatSex" -->
			</el-table-column>
			<el-table-column prop="createTime" label="订单开始时间" :formatter="showTime" sortable>
			</el-table-column>
			<el-table-column prop="payTime" label="订单结束时间" :formatter="showTime" sortable>
			</el-table-column>	
		<!-- 	<el-table-column prop="param" label="参数" sortable>
			</el-table-column>	 -->
			<el-table-column prop="status" label="状态" sortable>
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<!-- <el-button size="small" @click="selectRow(scope.$index, scope.row)">查看</el-button> -->
					<el-button type="info" size="small" @click="selectRow(scope.row.id,scope.row)">详情</el-button>
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
				findOrderId:"",
				sels:[],
				time:"",
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
    		 		listLoading:state => state.orderManager.listLoading,
    		 		orders:state=>state.orderManager.orders,
    		 		total:state=>state.orderManager.total,
    		 		page:state=>state.orderManager.page,
    		 		pageShow:state=>state.orderManager.pageShow,
    		 })
  	},
  	filters:{
  		time:util.formatDate.formatter,
  		showStatue:transForShow
  	},
		methods: {
			//性别显示转换
			...mapActions([
				'getOrderList',
				'findOrderById',
			]),
			search () {
					if(this.findOrderId.length == 0) {
					return this.getOrderList()
				}
				this.$store.dispatch("findOrderById",this.findOrderId)
			},
			handleCurrentChange(val) {
				
			},
			async selectRow(id,playerInfo) {
				this.$message("暂时未开放")
				//await this.setPlayerDetails({id,playerInfo})
				//this.$router.replace('/playerDetail')
			},
			selsChange: function (sels) {
			},
			showTime:function (row,cloumn) {
				let c = cloumn.property
				return util.formatDate.formatter(row[c])
			},
			//批量删除
			batchRemove: function () {
			}
		},
		mounted() {
			this.getOrderList()
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
    case 0 :
      return "创建等待支付"
    case 1 :
      return "支付成功"
    case -1 :
      return "支付取消"
    default :
      return '未知:' + num
  }
}
</script>

<style scoped>

</style>