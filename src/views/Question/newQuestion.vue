<template>
	<el-form ref="form" :model="question" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:100%;min-width:600px;">
		<el-form-item label="问卷标题">
			<el-input v-model="question.name"></el-input>
		</el-form-item>
		<el-form-item label="问卷说明">
			<el-input type="textarea" v-model="question.desc"></el-input>
		</el-form-item>
<!-- 		<el-form-item label="活动区域">
			<el-select v-model="form.region" placeholder="请选择活动区域">
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="活动时间">
			<el-col :span="11">
				<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
			</el-col>
			<el-col class="line" :span="2">-</el-col>
			<el-col :span="11">
				<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
			</el-col>
		</el-form-item> -->
		<el-form-item label="是否发布">
			<el-switch on-text="" off-text="" v-model="question.delivery"></el-switch>
		</el-form-item>	
		<el-form-item label="新建题组">
			<el-button @click="editFormVisible = true">新建题组</el-button>
		</el-form-item>
		<!-- <el-form-item label="活动性质">
			<el-checkbox-group v-model="form.type">
				<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
				<el-checkbox label="地推活动" name="type"></el-checkbox>
				<el-checkbox label="线下主题活动" name="type"></el-checkbox>
				<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
			</el-checkbox-group>
		</el-form-item> -->
	<!-- 	<el-form-item label="特殊资源">
			<el-radio-group v-model="form.resource">
				<el-radio label="线上品牌商赞助"></el-radio>
				<el-radio label="线下场地免费"></el-radio>
			</el-radio-group>
		</el-form-item> -->
		<!-- <el-form-item label="活动形式">
			<el-input type="textarea" v-model="form.desc"></el-input>
		</el-form-item>
		 -->
		<el-collapse v-model="activeNames"  @change="handleChange">
			<div  v-for ="item in question.Groups">
  			<el-collapse-item :title="item.title" :name="item.index">
    			<!--列表-->
    			 <el-button type="primary" @click="newGroupAsk(item.index)">新建题目</el-button>
    			 <el-button type="primary" @click="DeletGroupAsk(item.index)">删除组</el-button>
    			 <br><br>
					<el-table :data="item.questions" highlight-current-row style="width: 100%;">
						<el-table-column  prop="index"  label="index">
						</el-table-column>
						<el-table-column prop="name" label="题干"sortable>
						</el-table-column>
						<el-table-column  prop="select"  label="选项" :formatter="showDetail" sortable>
							
						</el-table-column>			
						<el-table-column label="操作">
							<template scope="scope">
								<el-button type="danger" size="small" @click.native="DelAskSelection(scope.row.index)">删除</el-button>
							</template>
						</el-table-column>
				</el-table>
  		</el-collapse-item>
  		</div>
		</el-collapse>
		<br><br>
		<el-form-item style="margin:20px;width:100%;min-width:600px;">
			<el-button type="primary" size="large"  @click.native="commmitQuestion">创建问卷</el-button>
		</el-form-item>
<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" ref="editForm">
				<el-form-item label="组名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-table :data="editForm.select" highlight-current-row style="width: 100%;" label="选项">
						<el-table-column  prop="index"  label="id">
						</el-table-column>
						<el-table-column prop="selection" label="选项"sortable>
						</el-table-column>
						<el-table-column prop="score" label="分数" sortable>
						</el-table-column>
						<el-table-column label="操作">
						<template scope="scope">
							<el-button type="danger" size="small"  @click.native="DelEditFormSelection(scope.row.index)" >删除</el-button>
						</template>
			</el-table-column>
		</el-table>
				<el-form-item label="选项名：" prop="name"  :span="12">
					<el-row>
 					 <el-col :span="11"><el-input  thpe = "number" v-model="editForm.selection" auto-complete="off"></el-input></el-col>
 					  <el-col :span="2">  </el-col>
 					  <el-col :span="2">分数：</el-col>
 					 <el-col :span="5"><el-input  thpe = "number" v-model="editForm.score" auto-complete="off"></el-input></el-col>
 					 <el-col :span="5"><el-button type="primary" size="small"  @click.native="AddEditFormSelection" >添加选项</el-button></el-col>
					</el-row>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" >提交</el-button>
			</div>
		</el-dialog>
		<el-dialog title="编辑题目" v-model="editAddVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" ref="editForm">
				<el-form-item label="题干" prop="name">
					<el-input v-model="addAskEdit.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-table :data="addAskEdit.select" highlight-current-row style="width: 100%;" label="选项">
						<el-table-column  prop="index"  label="id">
						</el-table-column>
						<el-table-column prop="selection" label="选项"sortable>
						</el-table-column>
						<el-table-column prop="score" label="分数" sortable>
						</el-table-column>
						<el-table-column label="操作">
						<template scope="scope">
							<el-button type="danger" size="small"  @click.native="DelEditAskSelection(scope.row.index)" >删除</el-button>
						</template>
			</el-table-column>
		</el-table>
				<el-form-item label="选项名：" prop="name"  :span="12">
					<el-row>
 					 <el-col :span="11"><el-input  thpe = "number" v-model="addAskEdit.selection" auto-complete="off"></el-input></el-col>
 					  <el-col :span="2">  </el-col>
 					  <el-col :span="2">分数：</el-col>
 					 <el-col :span="5"><el-input  thpe = "number" v-model="addAskEdit.selection.score" auto-complete="off"></el-input></el-col>
 					 <el-col :span="5"><el-button type="primary" size="small"  @click.native="AddEditAskSelection" >添加选项</el-button></el-col>
					</el-row>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editAddVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editAskSubmit" >提交</el-button>
			</div>
		</el-dialog>
	</el-form>

</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import  _  from 'lodash'
	export default {
		data() {
			return {
				activeNames:[],
				editFormVisible:false,
				editAddVisible:false,
				form: {
					name: '',
					region: '',
					delivery: false,
					desc: '',
					Groups:[]
				},
				addAskEdit :{
					index:0,
					name:"题干",
					select:[],
					selection:""
				},
				editForm:{
					name:"组名",
					selection:"",
					score:1,
					select:[]
				}
			}
		},
		computed: {
   		 ...mapState({
    		 	question:state => state.newQuestion.question,
    		 }),
  	},
		methods: {
			...mapActions([
				"addGroup",
				"deleteGourp",
				"addAsk",
				"deleteAsk",
				"CommmitQuestion",
				"getQuestionInfo"
			]),
			showDetail ({select}) {
   				let tmp = ""
   				select.map(selectitem=>{
   							tmp += `${selectitem.selection}(${selectitem.score}分)   `
   				})
   				return tmp
   		},		
			onSubmit() {
			},
			newGroup() {

			},
			async commmitQuestion() {
				let success = await this.CommmitQuestion()
				if(success.isSucc == 0) {
					this.$message("创建成功")
				}else{
					this.$message({message:success.msg,type:"error"})
				}
			},
			handleChange(a,b,c) {
			},
			DelEditFormSelection(index){
				let tmp = []
				this.editForm.select.map(item=>{ 
					if(item.index === index) return 
						tmp.push(item)
				})
				this.editForm.select = tmp
			},
			DelEditAskSelection(index) {
				let tmp = []
				this.addAskEdit.select.map(item=>{ 
					if(item.index === index) return 
						tmp.push(item)
				})
				this.addAskEdit.select = tmp
			},
			AddEditAskSelection() {
				let index = this.addAskEdit.select.length + 1 
				this.addAskEdit.select.push({
					index:index,
					selection:	this.addAskEdit.selection,
					score:	this.addAskEdit.score
				})
			},
			AddEditFormSelection() {
				let index = this.editForm.select.length + 1 
				this.editForm.select.push({
					index:index,
					selection:	this.editForm.selection,
					score:	this.editForm.score
				})
			},
			editAskSubmit() {
				if(this.addAskEdit.name == "" || this.addAskEdit.select.length === 0) {
					this.$message("添加选项")
					return 
				}
				let success = this.addAsk({
					index:this.addAskEdit.index,
					name:this.addAskEdit.name,
					select:_.cloneDeep(this.addAskEdit.select)
				})
				if(success) {
					this.$message("success")
				} else{
					this.$message({message:"error",type:"error"})
				}
				this.editAddVisible =false
			},
			editSubmit (){
				if(this.editForm.name == "" || this.editForm.select.length === 0) {
					this.$message("添加选项")
					return 
				}
				let success = this.addGroup({
					name:this.editForm.name,
					select:this.editForm.select
				})
				if(success) {
					this.$message("success")
				} else{
					this.$message({message:"error",type:"error"})
				}
				this.editFormVisible =false
			},
			DeletGroupAsk(index) {
				this.deleteGourp(index)
			},
			DelAskSelection(index) {
				this.deleteAsk({
					groups:this.addAskEdit.index,
					index:index
				})
			},
			newGroupAsk (index) {
					if(!this.question.Groups[index - 1]){
						this.$message("error")
						return 
					}
					let group = this.question.Groups[index - 1]
					this.addAskEdit.index =group.index
					this.addAskEdit.select = _.cloneDeep(group.select)
					this.editAddVisible = true
					
			}
		},
		async mounted() {
			await this.getQuestionInfo();
		}
	}

</script>