<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input  placeholder="问卷id" v-model="findId"></el-input>
				</el-form-item>
			<!-- 	<el-form-item label="活动区域">
					<el-select placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="活动时间">
					<el-col :span="11">
						<el-date-picker type="date" placeholder="选择日期"  style="width: 100%;"></el-date-picker>
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
						<el-time-picker type="fixed-time" placeholder="选择时间"  style="width: 100%;"></el-time-picker>
					</el-col>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary" v-on:click="search">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="newQuestion">新建</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="questions" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="selection">
			</el-table-column>
			<el-table-column type="id" prop="id"  label="问卷id">
			</el-table-column>
			<el-table-column prop="name" label="问卷标题"sortable>
			</el-table-column>
			<el-table-column prop="status" label="问卷状态" sortable>
			</el-table-column>
			<el-table-column prop="upTime" label="问卷答题次数" sortable>
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<!-- <el-button size="small" @click="selectRow(scope.$index, scope.row)">查看</el-button> -->
					<el-button type="info" size="small" @click="selectRow(scope.row)">查看</el-button>
					<el-button type="info" size="small" @click="public(scope.row.id)">发布</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageShow" :total="total" :current-page="page" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
		<el-dialog title="提示" v-model="dialogVisible" size="tiny">
  				<div id="erweima">
  				{{dizhi}}
  				</div>
  			<span slot="footer" class="dialog-footer">
    		<el-button @click="dialogVisible = false">取 消</el-button>
    		<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import { mapState, mapActions } from 'vuex'
	export default {
		data() {
			return {
				dialogVisible:false,
				dizhi:"",
				findId:undefined,
				sels: [],//列表选中列
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				}

			}
		},
		computed: {
   		 ...mapState({
    		 	listLoading:state => state.question.listLoading,
    		 	questions:state=>state.question.questions,
    		 	total:state=>state.question.total,
    		 	page:state=>state.question.page,
    		 	pageShow:state=>state.question.pageShow
    		 })
  	},
		methods: {
			//性别显示转换
			...mapActions([
				"getQuestion",
				"setQuestionId"
			]),
			search () {
				this.$store.dispatch("findQuestionById",this.findId)
			},
			handleCurrentChange(){

			},
			async selectRow(row) {
			console.log(row)
				await this.setQuestionId(row.id)
				this.$router.replace('/newQuestion')
			},
			newQuestion() {
				this.$router.replace('/newQuestion')
			},
			public(id){
				this.dizhi = "http://lizhipeng.space:3011?id="+id
				this.dialogVisible = true
			},
			handleDel: function (index, row) {
			 this.$message('功能还在开发过程中')
			 return
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
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
			},
			//显示编辑界面
			handleEdit: function (index, row) {
			this.$message('功能还在开发过程中')
			 return
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.$message('功能还在开发过程中')
			 	return
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
			//编辑
			editSubmit: function () {
			this.$message('功能还在开发过程中')
			 return
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
			this.$message('功能还在开发过程中')
			 return
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				//this.sels = sels;
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
			this.getQuestion()
		}
	}

</script>

<style scoped>

</style>