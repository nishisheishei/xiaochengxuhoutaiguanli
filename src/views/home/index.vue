<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="100"
        :formatter="formatSex">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="100">
      </el-table-column> 
      <el-table-column
        prop="telephone"
        label="手机号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="eMail"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="80"
        :formatter="status">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showPopup(scope.row)">编辑</el-button>
          <el-button @click="open(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="warpPagination"
      background
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="totalCount">
    </el-pagination>
    <!-- 弹出框 -->
    <van-cell is-link @click="showPopup" v-show="showBianji">编辑</van-cell>
    <van-popup v-model="show" class="ranShows" closeable>
      <div>编辑</div>
      <el-form ref="formUser" :model="formUser" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="formUser.userName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="formUser.sex"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="formUser.age"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formUser.telephone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formUser.eMail"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formUser.status" placeholder="请选择活动区域">
            <el-option label="在用" value="1"></el-option>
            <el-option label="不在用" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </van-popup>
  </div>
</template>

<script>
import { loginAddPost } from '@/api/home'

export default {
  name: 'home',
  data() {
    return {
      showBianji: false,
      show: false,
      tableData: [],
      totalCount: 0,  // 总页数
      pageSize: 5, // 设置每页显示条目个数为10
      page: 1, // 设置当前页默认为1
      filterAutomobileInfs: [], //分页前的数据
      formUser: {
        userName: '',
        sex: '',
        age: '',
        telephone: '',
        eMail: '',
        status: '',
      }
    }
  },
  created () {
    // this.logindShouye()
    // this.loginAsturn()
  },
  methods: {
    // async loginAsturn() {
    //   try{
    //     const { data } = await loginAddPost()
    //     console.log(data)
    //   } catch(err) {
    //     console.log('获取数据错误')
    //   }
    // },
    async logindShouye() {
      try {
        const { data } = await this.axios({
          method: 'POST',
          url: 'api/dd_user/queryUser',
          params: {
            pageNum: this.page,
            pageSize: this.pageSize
          }
        })
        // console.log(data)
        if (data.resultCode == 200) {
          this.tableData = data.data.data
          this.totalCount = data.data.totalCount
          // this.totla = this.tableData.length
        } else {
          this.$message.error('请求失败')
        }
      } catch (err) {
        // console.log(err)
      }
    },
    formatSex: function (row, column, cellValue) {
      if (cellValue === "1"){
          return '男'
      }else if (cellValue === "2"){
          return '女'
      }
    },
    status: function (row, column, cellValue) {
      if (cellValue === "1"){
          return '在用'
      }else if (cellValue === "0"){
          return '不在用'
      }
    },
    handleClick (row) {
      // console.log(row);
      if(this.show == false) {
        this.show = true
      }
    },
    open (row) {
      this.$confirm('是否删除该数据', {
        type: 'warning'
      }).then(() => {
        // console.log(1)
        let id = row.id
        const { data } = this.axios.delete('/api/dd_user/deleteUserById/' + id)
        .then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.logindShouye()
        }).catch((err) => {
          // console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });         
      })
    },
    showPopup(row) {
      this.show = true
      // let { userName, sex, age, telephone, eMail, status } = this.formUser
      this.formUser.userName = row.userName
      this.formUser.sex = row.sex
      this.formUser.age = row.age
      this.formUser.telephone = row.telephone
      this.formUser.eMail = row.eMail
      this.formUser.status = row.status
      // if(row.status == 1) {
      //   this.formUser.status = '男'
      // } else if (row.status == 2) {
      //   this.formUser.status = '女'
      // }

    },
    // 分页中的change事件
    handleCurrentChange (page) {
      // console.log(page)
      this.page = page
      this.logindShouye()
    }
  }
}
</script>

<style lang="less" scoped>
.ranShows {
  width: 500px;
  height: 450px;
};

.warpPagination {
  margin-top: 30px; 
}
</style>