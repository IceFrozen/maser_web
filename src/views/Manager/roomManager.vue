<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input  placeholder="房间号" v-model="findRoomId"></el-input>
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
		<el-table :data="rooms" highlight-current-row v-loading="listLoading"  @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection">
			</el-table-column>
			<el-table-column type="id" prop="id"  label="房间号" >
			</el-table-column>
			<el-table-column prop="creator" label="创建人"  sortable>
			</el-table-column>
			<el-table-column prop="base_info" label="房间信息"   sortable> <!--  :formatter="formatSex" -->
			</el-table-column>
			<el-table-column prop="num_of_turns" label="局数" sortable>
			</el-table-column>
			<el-table-column prop="next_button" label="下一个庄家"  sortable>
			</el-table-column>
			<el-table-column prop="ip" label="隶属服务器" sortable>
			</el-table-column>	
			<el-table-column prop="port" label="隶属服务器" sortable>
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<!-- <el-button size="small" @click="selectRow(scope.$index, scope.row)">查看</el-button> -->
					<el-button type="info" size="small" @click="selectRow(scope.row.id,scope.row)">查看</el-button>
					<el-button type="info" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
					<el-button type="info" size="small" @click="handleDel(scope.$index, scope.row)">结束</el-button>
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
				findRoomId:"",
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
    		 		listLoading:state => state.roomManager.listLoading,
    		 		rooms:state=>state.roomManager.rooms,
    		 		total:state=>state.roomManager.total,
    		 		page:state=>state.roomManager.page,
    		 		pageShow:state=>state.roomManager.pageShow,
    		 })
  	},
		methods: {
			//性别显示转换
			...mapActions([
				'getRoomList',
				'findRoomById',
			]),
			search () {
				console.log(this.time)
				return 
				this.$store.dispatch("findRoomById",this.findRoomId)
			},
			handleCurrentChange(val) {
				
			},
			async selectRow(id,playerInfo) {
				//await this.setPlayerDetails({id,playerInfo})
				//this.$router.replace('/playerDetail')
			},
			selsChange: function (sels) {
			},
			//批量删除
			batchRemove: function () {
				return 
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getRoomList()
		}
	}

</script>

<style scoped>

</style>