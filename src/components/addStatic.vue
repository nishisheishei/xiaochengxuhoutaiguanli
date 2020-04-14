<template>
  <div class="wart-increase">
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form ref="form" :model="addUserForm" label-width="80px">
					<el-form-item label="视频名称">
						<el-input v-model="addUserForm.vName"></el-input>
					</el-form-item>
					<el-form-item label="视频时长">
						<el-input v-model="addUserForm.vTimeLength"></el-input>
					</el-form-item>
					<el-form-item label="视频地址">
						<el-input v-model="addUserForm.vUrl"></el-input>
					</el-form-item>
					<el-form-item label="封面地址">
						<el-input v-model="addUserForm.vCoverUrl"></el-input>
					</el-form-item>
					<el-form-item label="视频类型">
						<el-select v-model="addUserForm.vTypeName" placeholder="请选择活动区域" @change="handleSelectChange($event)">
							<el-option v-for="item in optionName" :key="item.typeId" :label="item.typeName" :value="item.typeId"></el-option>
							<!-- <el-option v-for="item in typeNameData" :key="item.typeId" :label="item.typeName" :value="item.typeId" ></el-option> -->
						</el-select>
					</el-form-item>
					<el-form-item label="是否推荐">
						<el-select v-model="addUserForm.isRecommend" placeholder="请选择活动区域">
							<el-option label="不推荐" value="0"></el-option>
							<el-option label="推荐" value="1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="备注">
						<el-input type="textarea" v-model="addUserForm.vIntroduction"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="handleAdditionBut">添加</el-button>
						<!-- <el-button>取消</el-button> -->
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
  </div>
</template>

<script>
import { postLoadVoideType, postInsertVoide } from '@/api/home'

export default {
	data () {
		return {
			addUserForm: {
				vName: '',
				vTimeLength: '',
				vUrl: '',
				vCoverUrl: '',
				vTypeName: '',
				vType: '',
				isRecommend: '',
				vIntroduction: ''
			},
			optionName: []
		}
	},
	created() {
		this.uploadRecomment() 
	},
	methods: {
		// 视频类型
		async uploadRecomment() {
			try{
				const { data } = await postLoadVoideType()
				if(data.code == 1) {
					this.optionName = data.data
				}else {
					this.$message.error(data.msg)
				}
			} catch(err) {
				console.log(err)
			}
		},
		// 拿到视频类型中的id和name
		handleSelectChange(key) {
			let type = this.optionName.find((item) => {
				return item.typeId === key;
			})
			this.addUserForm.vTypeName = type.typeName
			this.addUserForm.vType = type.typeId
		},
		async handleAdditionBut() {
			let {
					vName,
					vTimeLength,
					vUrl,
					vCoverUrl,
					vTypeName,
					vType,
					isRecommend,
					vIntroduction
				} = this.addUserForm
				let params = {
					vName,
					vTimeLength,
					vUrl,
					vCoverUrl,
					vTypeName,
					vType,
					isRecommend,
					vIntroduction
				}
			try{
				if(vName != "" && vTimeLength != "" && vUrl != "" && vCoverUrl != "" && vTypeName != "") {
					const { data } = await postInsertVoide(params)
					if(data.code == 1) {
						this.addUserForm.vName = '',
						this.addUserForm.vTimeLength = '',
						this.addUserForm.vUrl = '',
						this.addUserForm.vCoverUrl = '',
						this.addUserForm.vTypeName = '',
						this.addUserForm.vType = '',
						this.addUserForm.isRecommend = '',
						this.addUserForm.vIntroduction = ''
						this.$message({
							type: 'success',
							message: '添加成功'
						})
						this.$emit("addEmitClick", false)
					}else {
						this.$message.error('添加失败');
					}
				} else {
					this.$message.error('视频名称/视频时长/视频地址/封面地址/视频类型!内容不能为空!')
				}
			}catch(err) {
				console.log(err)
			}
		},
	}
}
</script>

<style scoped>
.wart-increase {
	margin-top: 20px;
}
.el-form-item__content {
	width: 200px;
}


</style>