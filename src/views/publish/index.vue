<template>
  <div class="warp-publish">
		<!-- 查询 -->
		<el-form ref="form" :model="userForm" label-width="80px">
			<el-form-item label="视频名称">
				<el-col :span="5">
					<el-input v-model="userForm.videoName"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="类型名称">
				<el-select v-model="userForm.typeId" placeholder="请选类型名称" clearable>
				<el-option
					:label="item.typeName"
					:value="item.typeId"
					v-for="item in typeNameData"
					:key="item.typeId"
					></el-option>
				<!-- <el-option label="区域二" value="区域二"></el-option> -->
				</el-select>
			</el-form-item>
			<el-form-item label="是否推荐">
				<el-select v-model="userForm.recommendId" placeholder="请选择" clearable>
				<el-option label="未推荐" value="0"></el-option>
				<el-option label="推荐" value="1"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" :loading="inFormationLoading" @click="LoadingInformation">查询</el-button>
				<el-button type="danger" @click="handleAddStatic">添加</el-button>
			</el-form-item>
		</el-form>
		<!-- 表格 -->
		<el-table
			ref="multipleTable"
			:data="detailsData"
			tooltip-effect="dark"
			style="width: 100%"
			>
		<!-- @selection-change="handleSelectionChange" -->
			<el-table-column
				prop="vId"
				type="selection"
				width="55">
			</el-table-column>
			<el-table-column
				prop="vName"
				label="视频名称"
				width="150">
			</el-table-column>
			<el-table-column
				prop="vTypeName"
				label="类型名称"
				width="120">
			</el-table-column>
			<el-table-column
				prop="vTimeLength"
				label="时长"
				width="120">
			</el-table-column>
			<el-table-column
				prop="vUrl"
				label="视频地址"
				width="120">
			</el-table-column>
			<el-table-column
				prop="vCoverUrl"
				label="封面地址"
				width="150">
			</el-table-column>
			<el-table-column
				align="center"
				prop="vUrl"
				label="是否推荐"
				width="120">
				<template slot-scope="scope">
					<span v-if="scope.row.isRecommend== '1'">是</span>
					<span v-else>否</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="vCoverUrl"
				label="操作"
				width="180"
				show-overflow-tooltip>
				<template slot-scope="scope">
					<el-button type="primary" size="mini" @click="handleAddModify(scope.row)">修改</el-button>
					<el-button type="danger" size="mini" @click="handleButtomDelete(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<el-pagination
			background	
			layout="prev, pager, next"
			:page-size="6"
			:total="totalCount"
			@current-change="handleCurrentChange">
		</el-pagination>

		<el-dialog title="视频详情" :visible.sync="dialogTableVisible">
			<el-form ref="form" :model="beforeChange" label-width="80px">
				<el-form-item label="视频名称">
					<el-input v-model="beforeChange.vName"></el-input>
				</el-form-item>
				<el-form-item label="类型名称">
					<!-- @change="getName(item)" -->
					<el-select  placeholder="请选择类型" filterable collapse-tags v-model="beforeChange.vTypeName" @change="pickRoleName($event)"> 
						<el-option v-for="item in typeNameData" :key="item.typeId" :label="item.typeName" :value="item.typeId" ></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="时长">
					<el-input v-model="beforeChange.vTimeLength"></el-input>
				</el-form-item>
				<el-form-item label="视频地址">
					<el-input v-model="beforeChange.vUrl"></el-input>
				</el-form-item>
				<el-form-item label="封面地址">
					<el-input v-model="beforeChange.vCoverUrl"></el-input>
				</el-form-item>
				<el-form-item label="是否推荐">
					<el-select  placeholder="请选择是否推荐" v-model="beforeChange.isRecommend">
						<el-option label="未推荐" value="0"></el-option>
						<el-option label="推荐" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="简介" prop="desc">
					<el-input type="textarea" v-model="beforeChange.vIntroduction"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAddPreservation">保存</el-button>
					<el-button @click="handleCancel">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- <div v-show='hidden' class="message-hidden"></div> -->

		<el-dialog title="添加视频" :visible.sync="addHidden">
			<addStatic @addEmitClick="handleAddClick"></addStatic>
		</el-dialog>
  </div>
</template>

<script>
import { postLoadVoideType, postFindVoide, postDeleteVoide, updateVoide } from '@/api/home'
import addStatic from "@/components/addStatic"
export default {
	name: 'publish',
	components: {
		addStatic
	},
	data () {
		return {
			// form表单
			userForm: {
				videoName: '',
				typeId: '',
				recommendId: '',
			},
			typeNameData: [],
			// loading
			inFormationLoading: false,

			// 每页显示的条数
			page: 1,
			// pageSizes: [6], 
			totalCount: 0,  // 总页数

			// table表格
			multipleSelection: [],
			// 修改显示隐藏
			dialogTableVisible: false,
			detailsData: [],
			// 修改数据
			beforeChange: {
				vName: '',
				vType: '',
				vTimeLength: '',
				vUrl: '',
				vCoverUrl: '',
				isRecommend: '',
				vIntroduction: '',
				vId: '',
				vTypeName: ''
			},
			// 添加页面
			addHidden: false
		}
	},
	created() {
		// 打开页面加载的数据
		this.pageLoadingData()
		// 页面加载上来拿到的数据
		this.pageLoadingInformation()
	},
	mounted() {

	},
	updated() {
		// this.pageLoadingInformation()
	},
	methods: {
		// 类型名称 下拉选项
		async pageLoadingData () {
			try{
				const { data } = await postLoadVoideType()
				if(data.code == 1) {
					this.typeNameData = data.data
				}else {
					this.$message.error('类型名称加载错误')
				}
			}catch (err) {
				// console.log(err)
			}
		},
		// 点击查询 拿到数据
		async LoadingInformation() {
			this.inFormationLoading = true
			let  { videoName, typeId, recommendId } = this.userForm
			let params = {
				vName: videoName,
				vType: typeId,
				isRecommend: recommendId,
				// page: this.page
				// rows: this.pageSizes
			}
			try {
				const { data } = await postFindVoide(params)
				
				if(data.code == 1) {
					this.detailsData = data.data
					this.totalCount = data.total
				} else {
					this.$message.error('获取数据错误')
				}
			}catch (err) {
				// console.log(err)
			}
			this.inFormationLoading = false
		},
		// 表格中的数据
		async pageLoadingInformation() {
			this.inFormationLoading = true
			let  { videoName, typeId, recommendId } = this.userForm
			let params = {
				vName: videoName,
				vType: typeId,
				isRecommend: recommendId,
				page: this.page
				// rows: this.pageSizes
			}
			try {
				const { data } = await postFindVoide(params)
				if(data.code == 1) {
					this.detailsData = data.data
					this.totalCount = data.total
				} else {
					this.$message.error('获取数据错误')
				}
			}catch (err) {
				// console.log(err)
			}
			this.inFormationLoading = false
		},

		handleCurrentChange(page) {
			this.page = page
			this.pageLoadingInformation()
		},
		// 表格中的删除按钮
		async handleButtomDelete(value) {
			let params = {
				vId: value.vId
			}
			try {
				await this.$confirm('确定要删除吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
				})
				await postDeleteVoide(params)

				this.$message({
          type: 'success',
          message: '删除成功'
				})
				this.pageLoadingInformation()
			}catch (err) {
				if (err === 'cancel') {
          return this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
        this.$message.error('删除失败')
			}

		},
		// 修改按钮
		handleAddModify(val) {
			this.dialogTableVisible = true
			this.beforeChange = val
		},

		// 取消按钮
		handleCancel() {
			this.dialogTableVisible = false
		},
		// el-select 中的change事件
		pickRoleName (id) {
			let	item = this.typeNameData.find((item)=>{//model就是上面的数据源
					return item.typeId === id;//筛选出匹配数据
			});
			this.beforeChange.vType = item.typeId
			this.beforeChange.vTypeName = item.typeName

		},
		// 保存按钮
		async handleAddPreservation() {
			let {
				vName,
				vType,
				vTimeLength,
				vUrl,
				vCoverUrl,
				isRecommend,
				vIntroduction,
				vId,
				vTypeName
			} = this.beforeChange

			if(vIntroduction == null) {
				vIntroduction = ""
			}
			if(vCoverUrl == null) {
				 vCoverUrl = ""
			}

			let params = {
				vName,
				vType,
				vTimeLength,
				vUrl,
				vCoverUrl,
				isRecommend,
				vIntroduction,
				vId,
				vTypeName
			} 
			try {
				const { data } = await updateVoide(params)
				if(data.code == 1) {
					this.$message(data.msg)
					this.dialogTableVisible = false
				} else {
					this.$message.error(data.msg)
				}
 			}catch(err) {
				// console.log(err)
			}
		},
		// 添加按钮
		handleAddStatic() {
			this.addHidden = true
		},
		handleAddClick(val) {
			// console.log(val)
			this.addHidden = val
		}
	}
}
</script>

<style lang="less" scrpot>
.warp-publish {
	position: relative;
	margin-top: 10px; 
}
// .el-input__inner {
// 	width: 200px;
// }
.el-header {
	margin-bottom: 15px;
}
.el-pagination {
	margin: 20px 0;
}
// .message-hidden {
// 	width: 600px;
// 	height: 400px;
// 	background-color: #fff;
// 	position: absolute;
// 	top:60px;
// 	left:170px;
// 	border: 1px solid #ccc;
// }
</style>