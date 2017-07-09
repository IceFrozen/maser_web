<template>
	<section>
		<!--工具条-->
<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

<el-dialog title="发送推官员" v-model="dialogVisible" size="tiny">
 <el-form >
    <el-form-item label="当前推官员" v-if="playerInfo.wxInfo&&playerInfo.wxInfo.seller">
      <el-input v-model="playerInfo.wxInfo.seller.id" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="管理员id">
      <el-input v-model="sendId" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <el-table :data="sellers" height="250"  @cell-click="selectSeller">
    	<el-table-column type="id" prop="id"  label="用户id">
			</el-table-column>
			<el-table-column prop="icon" label="icon" sortable>
		 		<template scope="scope"> 
		 			<img :src="scope.row.wxInfo.wxHeadimgurl" class="image" style="width:50px;height:50px;border-radius:50px" />
		 		</template>
			</el-table-column>
			<el-table-column prop="wxInfo.wxNickname" label="昵称"sortable>
			</el-table-column>
  </el-table>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sendTo('player')">转移玩家</el-button>
    <el-button type="primary" @click="sendTo('seller')">转移推广员</el-button>
  </div>
</el-dialog>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item class="labelPosition" label="" >
					<!-- <el-input v-model="playerInfo.id"></el-input> -->
					<span>玩家身份：</span>
				</el-form-item>	
				<el-form-item class="labelPosition" label="id:" >
					<!-- <el-input v-model="playerInfo.id"></el-input> -->
					<span>【{{ playerInfo.id }}】</span>
				</el-form-item>	
					<el-form-item v-if="playerInfo.wxInfo">
						<img :src="playerInfo.wxInfo.wxHeadimgurl" class="image" style="width:30px;height:30px;border-radius:50px" />
				</el-form-item>
				<el-form-item label=""  v-if="playerInfo.wxInfo">
					<!-- <el-input v-model="playerInfo.wxInfo.wxNickname"></el-input> -->
						<span>【{{ playerInfo.wxInfo.wxNickname }}】</span>
				</el-form-item>	
				<el-form-item label="房卡">
					<!-- <el-input v-model="playerInfo.coin"></el-input> -->
					<span>【{{ playerInfo.coin }}】</span>
				</el-form-item>
				<el-form-item label="wxUnionid" v-if="playerInfo.wxInfo" >
					<!-- <el-input v-model="playerInfo.wxInfo.wxUnionid"></el-input> -->
					<span>【{{ playerInfo.wxInfo.wxUnionid }}】</span>
				</el-form-item>	
			<!-- 	<el-form-item label="sellerId">
					<el-input v-model="playerInfo.wxInfo.sellerId"></el-input>
					<span>【{{ playerInfo.wxInfo.sellerId }}】</span>
				</el-form-item> -->
			</el-form>
			<br/>
			<br/>
			<el-form :inline="true" label="推官员信息" v-if="playerInfo.wxInfo.seller">
				<el-form-item class="labelPosition" >
					<!-- <el-input v-model="playerInfo.id"></el-input> -->
					<span>推官员身份：</span>
				</el-form-item>	
					<el-form-item label="推官员:" v-if="playerInfo.wxInfo" >
						<img :src="playerInfo.wxInfo.wxHeadimgurl" class="image" style="width:30px;height:30px;border-radius:50px" />
				</el-form-item>
				<el-form-item  v-if="playerInfo.wxInfo">
					<!-- <el-input v-model="playerInfo.sellerInfo.wxInfo.wxNickname"></el-input> -->
						<span>【{{ playerInfo.wxInfo.wxNickname }}】</span>
				</el-form-item>	
				<el-form-item label="推官员 wxUnionid" v-if="playerInfo.wxInfo">
					<!-- <el-input v-model="playerInfo.sellerInfo.wxInfo.wxUnionid"></el-input> -->
					<span>【{{ playerInfo.wxInfo.wxUnionid }}】</span>
				</el-form-item>	
				<el-form-item label="推官员的id" v-if="playerInfo.wxInfo.seller" >
					<!-- <el-input v-model="playerInfo.sellerInfo.wxInfo.sellerId"></el-input> -->
					<span>【{{ playerInfo.wxInfo.seller.id }}】</span>
				</el-form-item>
				<el-form-item label="推官员的level" v-if="playerInfo.wxInfo.seller" >
					<!-- <el-input v-model="playerInfo.sellerInfo.wxInfo.sellerId"></el-input> -->
					<span>【{{ playerInfo.wxInfo.seller.level }}】级</span>
				</el-form-item>
			</el-form>
			<br/>
			<br/>
			<el-form :inline="true" v-if="playerInfo.wxInfo.seller">
				<el-form-item class="labelPosition" >
					<!-- <el-input v-model="playerInfo.id"></el-input> -->
					<span>所属推官员</span>
				<el-form-item label="id" v-if="playerInfo.wxInfo.seller.uplevel" >
					<!-- <el-input v-model="playerInfo.sellerInfo.wxInfo.sellerId"></el-input> -->
					<span>【{{ playerInfo.wxInfo.seller.uplevel.id}}】</span>
				</el-form-item>
				</el-form-item>	
					<el-form-item label="所属推官员:" v-if="playerInfo.wxInfo.seller.uplevel">
						<img :src="playerInfo.wxInfo.seller.uplevel.wxInfo.wxHeadimgurl" class="image" style="width:30px;height:30px;border-radius:50px" />
				</el-form-item>
				<el-form-item v-if="playerInfo.wxInfo.seller.uplevel">
					<!-- <el-input v-model="playerInfo.sellerInfo.wxInfo.wxNickname"></el-input> -->
						<span>【{{ playerInfo.wxInfo.seller.uplevel.wxInfo.wxNickname }}】</span>
				</el-form-item>	
				<el-form-item label="所属推官员 wxUnionid" v-if="playerInfo.wxInfo.seller.uplevel">
					<!-- <el-input v-model="playerInfo.sellerInfo.wxInfo.wxUnionid"></el-input> -->
					<span>【{{ playerInfo.wxInfo.seller.uplevel.wxInfo.wxUnionid }}】</span>
				</el-form-item>	
					<el-form-item label="所属推官员 level" v-if="playerInfo.wxInfo.seller.uplevel">
					<!-- <el-input v-model="playerInfo.sellerInfo.wxInfo.wxUnionid"></el-input> -->
					<span>【{{ playerInfo.wxInfo.seller.uplevel.level }}】级别</span>
				</el-form-item>	
			</el-form>
				<!-- <el-form-item label="活动区域">
					<el-select placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item> -->
				<!-- <el-form-item label="活动时间">
					<el-col :span="11">
						<el-date-picker type="date" placeholder="选择日期"  style="width: 100%;"></el-date-picker>
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
						<el-time-picker type="fixed-time" placeholder="选择时间"  style="width: 100%;"></el-time-picker>
					</el-col>
				</el-form-item> -->
		
			<br/>
			<br/>
		</el-col>
	<!-- 	<el-form :inline="true" class="toolbar" style="padding-bottom: 10px;">
			<el-form-item>
				<el-button type="primary" @click='AddCardNumber' :loading="isFetching">增加房卡</el-button>
			</el-form-item>
			<el-form-item>
				 <el-input-number v-model="addNumber" placeholder="增加房卡"></el-input-number>
			</el-form-item>
			<el-form-item>
				<el-button type="primary">退出房间</el-button>
			</el-form-item>	
			<el-form-item>
				<el-button type="primary">刷新</el-button>
			</el-form-item>
		</el-form> -->
		<!--列表-->
		<template>
			<el-tabs v-model="tableShowName">
    		<el-tab-pane label="玩家订单记录" name="cost">
    			<el-table :data="OrderHistory" highlight-current-row v-loading="isFetching"  style="width: 100%;">	<el-table-column type="expand">
      	<template scope="props">
        	<el-form label-position="left" inline class="demo-table-expand">
          	<el-form-item label="订单号:">
            	<span>{{ props.row.id }}</span>
          	</el-form-item><br />
          	<el-form-item label="订单状态:">
            	<span>{{ props.row.status }}</span>
          	</el-form-item><br>
          	<el-form-item label="创建时间:">
            	<span>{{ props.row.createTime | timeForm}}</span>
          	</el-form-item><br />
          	<el-form-item label="审核时间:">
            	<span>{{ props.row.payTime | timeForm}}</span>
          	</el-form-item><br />
          	<el-form-item label="审核状态:">
            	<span>【{{ props.row.status }}】</span>
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
			<el-table-column prop="amount" label="订单金额"   sortable> <!--  :formatter="formatSex" -->
				<template scope="scope">
					<span>{{scope.row.amount}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="订单开始时间" :formatter="showTime" sortable>
			</el-table-column>
			<el-table-column prop="payTime" label="订单结束时间" :formatter="showTime" sortable>
			</el-table-column>	
	
			<el-table-column prop="status" label="状态" sortable>
			</el-table-column>
			</el-table>
				
    	</el-tab-pane>

    	<el-tab-pane label="推广玩家" name="player">
    	<el-table :data="players" highlight-current-row v-loading="isFetching"   @selection-change="selsChange" style="width: 100%;">	
    		<el-table-column type="selection">
			</el-table-column>
    	<el-table-column type="expand">
      	<template scope="props">
        <!-- 	<el-form label-position="left" inline class="demo-table-expand">
          	<el-form-item label="订单号:">
            	<span>{{ props.row.id }}</span>
          	</el-form-item><br />
          	<el-form-item label="订单状态:">
            	<span>{{ props.row.status }}</span>
          	</el-form-item><br>
          	<el-form-item label="创建时间:">
            	<span>{{ props.row.createTime | timeForm}}</span>
          	</el-form-item><br />
          	<el-form-item label="审核时间:">
            	<span>{{ props.row.payTime | timeForm}}</span>
          	</el-form-item><br />
          	<el-form-item label="审核状态:">
            	<span>【{{ props.row.status }}】</span>
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
        	</el-form> -->
					<el-table :data="props.row.orders" highlight-current-row v-loading="false" style="width: 100%;">
						<el-table-column type="id" prop="id"  label="订单id">
						</el-table-column>
						<el-table-column prop="userId" label="用户id"  sortable>
						</el-table-column>
						<el-table-column prop="amount" label="订单金额"   sortable> <!--  :formatter="formatSex" -->
						</el-table-column>
						<el-table-column prop="createTime" label="订单开始时间" :formatter="showTime" sortable>
						</el-table-column>
						<el-table-column prop="payTime" label="订单结束时间" :formatter="showTime" sortable>
						</el-table-column>
						<el-table-column prop="status" label="订单状态">
						</el-table-column>		
					</el-table>
      	</template>
    	</el-table-column>
			<el-table-column type="id" prop="id"   label="玩家id">
			</el-table-column>
			<el-table-column prop="wxNickname" label="昵称"  sortable>
			</el-table-column>
			<el-table-column prop="wxHeadimgurl" label="icon" sortable>
		 		<template scope="scope"> 
		 			<img :src="scope.row.wxHeadimgurl" class="image" style="width:50px;height:50px;border-radius:50px" />
		 		</template>
			</el-table-column>
			<el-table-column prop="total" label="订单总金额"   sortable> <!--  :formatter="formatSex" -->
				<template scope="scope">
					<span>{{scope.row.total}}</span>
				</template>
			</el-table-column>
			</el-table>
			<el-col :span="24" class="toolbar">
			 <el-button type="danger" @click="dialogVisible = true" :disabled="false">玩家移交</el-button> 
		</el-col>
    	</el-tab-pane>
    	<el-tab-pane label="提现记录" name="play">
    	   暂不支持
    	</el-tab-pane>
			</el-tabs>		
		</template>
	</section>
</template>
<script>
	import { getUserList } from '../../api/api';
	import { Form } from './Form.vue'
	import { mapState, mapActions } from 'vuex'
	import util from '../../common/js/util'
	import transForShow from '../../common/js/util'
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				addNumber:undefined,
				tableShowName:"cost",
				dialogVisible:false,
				sendId:"",
				select_arrr : []
			}
		},
		/*
					historyIsFetcing :state=> state.user.playerList.playerDetail.historyIsFetcing,
    			PlayerHistory :state=> state.user.playerList.playerDetail.PlayerHistory,
    			DeTailHistory :state=> state.user.playerList.playerDetail.DeTailHistory,
    			CostHistorys_total :state=> state.user.playerList.playerDetail.CostHistorys_total,
    			DetailHostys_total :state=> state.user.playerList.playerDetail.DetailHostys_total,
    			PlayerHistorys_total :state=> state.user.playerList.playerDetail.PlayerHistorys_total,
    			CostHistorys_page :state=> state.user.playerList.playerDetail.CostHistorys_page,
    			DetailHostys_page :state=> state.user.playerList.playerDetail.DetailHostys_page,
    			PlayerHistorys_page :state=> state.user.playerList.playerDetail.PlayerHistorys_page,
		*/
		computed: {
   		 ...mapState({
    			isFetching :state=> state.user.playerList.playerDetail.isFetching,
    			userId :state=> state.user.playerList.playerDetail.userId,
    			OrderHistory :state=> state.user.playerList.playerDetail.OrderHistory,
    			playerInfo :state=> state.user.playerList.playerDetail.playerInfo,
    			DeTailHistory :state=> state.user.playerList.playerDetail.DeTailHistory,
    			pageShow :state=> state.user.playerList.playerDetail.pageShow,
    			players :state=> state.user.playerList.playerDetail.players,
    			sellers :state=> state.user.playerList.players,
    		})
  		},
  	filters:{
  		timeForm:util.formatDate.formatter,
  	},
		methods: {
			...mapActions([
					'getPlayerDetails',
					'getPlayerOrderHistory',
					'getSellerDownPlayerInfo',
					'changePlayer'
				]),
			showTime (row,cloumn){
				let c = cloumn.property
				return util.formatDate.formatter(row[c])
			},
			async sendTo (type="seller") {		
				let self = this
				if(this.sendId == null) {
					return this.$message("参数错误")
					this.dialogVisible =false
					this.sendId = null
					this.select_arrr = []
				}
				let data = await  this.changePlayer({
					sellerId:self.sendId,
					playerids:self.select_arrr,
					type:type
				})
				if(data.isSucc !== 0) {
					return this.$message(data.msg || "服务器错误")
				}
				this.dialogVisible =false
				this.sendId = null
				this.select_arrr = []

				await self.getPlayerDetails(this.userId)
				await self.getPlayerOrderHistory()
				await self.getSellerDownPlayerInfo()
			},
			selsChange (rows) {
				let self = this
				this.select_arrr = []
				rows.map(row=>{
					if(row.id === this.playerInfo.id) {
						return 
					}
					self.select_arrr.push(row.id)
				})
			},
			selectSeller (row) {
				if(!row.sellerInfo) {
					this.$message('不是推官员')
					return 
				}
				this.sendId = row.sellerInfo.id
			}
		},
		async mounted() {
			if(!this.userId){
				return this.$router.replace('/playerDetail')
			}
			let self = this
			await self.getPlayerDetails(this.userId)
			await self.getPlayerOrderHistory()
			await self.getSellerDownPlayerInfo()
			
		}
	};

</script>

<style scoped>

</style>