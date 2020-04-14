<template>
  <div class="wrap-crease">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<el-button type="primary" @click="handleCompile(1)">添加</el-button>
			</div>
			<div class="wrap-table">
				<el-table
					:data="classifyData"
					style="width: 100%">
					<el-table-column
						align="center"
						prop="typeName"
						label="类型名称"
						width="200">
					</el-table-column>
					<el-table-column
						align="center"
						prop="typeImgUrl"
						label="封面地址"
						width="200">
					</el-table-column>
					<el-table-column
						align="center"
						label="操作"
						width="200">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="handleCompile(scope.row)">编辑</el-button>
							<el-button type="danger" size="mini" @click="handleDeleseBtn(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-card>
		 
		<el-pagination
			class="wrap-page"
			background
			:page-size="6"
			:pager-count="11"
			layout="prev, pager, next"
			:total="totalCount"
			@current-change="handleSizeChange">
		</el-pagination>

		<el-dialog
			:title="hiddenSize ? '添加' : '编辑'"
			:visible.sync="hiddenSyncDialog"
			width="40%"
			>
			<el-form :model="compileUserData" :rules="rules" ref="compileUserData" label-width="100px" class="demo-ruleForm">
				<el-form-item label="类型名称" prop="typeName">
					<el-input v-model="compileUserData.typeName"></el-input>
				</el-form-item>
				<el-form-item label="封面地址" prop="typeImgUrl">
					<el-input v-model="compileUserData.typeImgUrl"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAddCompile">{{ hiddenSize ? '添加' : '保存' }}</el-button>
					<!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import { postFindVoideType, deleteInsertVoideType, addInsertVoideType, postUpdateVoideType } from "@/api/home"
export default {
	data () {
		return {
			page: 1,
			// pageSize: 
			totalCount: 0,
			classifyData: [],
			hiddenSyncDialog: false,
			hiddenSize: false,
			compileUserData: {
				typeName: '',
				typeImgUrl: '',
				typeId: ''
			},
			rules: {
				typeName: [
					{ required: true, message: '请输入类型名称', trigger: 'blur' }
				],
				typeImgUrl: [
					{ required: true, message: '请输入封面地址', trigger: 'blur' }
				]
			}
		}
	},
	created () {
		this.loadingClassify()
	},
	mounted () {

	},
	methods: {
		// 页面加载数据
		async loadingClassify() {
			let page = {
				page: this.page
			}
			try {
				const { data } = await postFindVoideType(page)
				if(data.code == 1) {
					console.log(data)
					this.classifyData = data.data
					this.totalCount = data.total
				} else {
					this.$message.error(data.msg)
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 删除按钮
		async handleDeleseBtn (val) {
			try {
				let params = {
					typeId: val.typeId
				}
				await this.$confirm('确定要删除此信息吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
				})
				// console.log('已删除')
				await deleteInsertVoideType(params)
				this.$message('删除成功')
				this.loadingClassify()
			} catch (err) {
				// console.log(err) 
				this.$message.error('已取消删除')
			}
		},

		// 编辑 和 添加
		async handleCompile (key) {
			try {
				this.hiddenSyncDialog = true
				if(key != 1) {
					this.hiddenSize = false
					this.compileUserData.typeName = key.typeName
					this.compileUserData.typeImgUrl = key.typeImgUrl
					this.compileUserData.typeId = key.typeId
				} else {
					this.hiddenSize = true
					this.compileUserData.typeName = ""
					this.compileUserData.typeImgUrl = ""
					this.compileUserData.typeId = ""
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 添加 保存 按钮
		async handleAddCompile() {
			let {
				typeName,
				typeImgUrl,
				typeId
			} = this.compileUserData
			let params = {
				typeName,
				typeImgUrl,
			}
			let typeData = {
				typeName,
				typeImgUrl,
				typeId
			}
			try {
				if(this.hiddenSize) {
					// console.log("添加")
					const { data } = await addInsertVoideType(params)
					if(data.code == 1) {
						this.$message("添加成功")
						this.loadingClassify()
						this.hiddenSyncDialog = false
					} else {
						this.$message.error(data.msg)
					}
				} else {
					// console.log("编辑")
					const { data } = await postUpdateVoideType(typeData)
					if(data.code == 1) {
						this.$message("修改成功")
						this.loadingClassify()
						this.hiddenSyncDialog = false
					}else {
						this.$message.error(data.msg)
					}
				}
			} catch (err) {
				console.log(err)
			}
		},
		handleSizeChange(page) {
			// console.log(page)
			this.page = page
			this.loadingClassify()
		}
	}
}
</script>

<style lang="less" scoped>
// .wrap-crease {
	
// }

.wrap-table {
	margin-top: 30px;
}

.wrap-page {
	margin-top: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>