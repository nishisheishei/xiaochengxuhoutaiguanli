<template>
	<div class="wrat">
		<div class="div-wrat">
			<span>视界王国小程序后台管理系统</span>
			<el-button class="wrat-but" type="success" @click="handleClickBtn">退出</el-button>
		</div>
		<!-- <div>
			<button>退出</button>
		</div> -->
	</div>
</template>

<script>
import { removeUser } from '@/utlis/auth'
export default {
  name: 'AppHeader',
  data () {
    return {
      // userInfo: {}
    }
	},
	methods: {
		handleClickBtn() {
			this.$confirm('确定要退出吗？', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				removeUser()
				this.$router.push({ name: 'login' })
				this.$message({
					type: 'success',
					message: '退出成功!'
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消退出'
				});          
			});
		}
	}
}

</script>

<style lang="less" scoped>
.div-wrat{
	margin: 0 40px;
	span {
		line-height: 60px;
		font-size: 24px;
	}

	.wrat-but {
		float: right;
		margin-top: 10px;
		// margin-right: 40px;
	}
}
</style>
