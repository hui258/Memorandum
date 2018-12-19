<template>
  <el-card>
    <h2>备忘录管理</h2> 
    <el-button type="success" plain @click="showAdd = true">添加备忘录</el-button>
    <a href="#" @click.prevent="logout">退出</a>
    <el-table border :data="tableData" highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="title" label="标题"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button
            @click="del(scope.row.id)"
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增面板 -->
    <el-dialog title="新增备忘录" :visible.sync="showAdd">
      <el-form :model="addForm" label-position="right">
        <el-form-item label="标题">
          <el-input v-model="addForm.title" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleAdd">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改面板 -->
    <el-dialog title="修改备忘录" :visible.sync="showEdit">
      <el-form :model="editForm">
        <el-form-item label="标题">
          <el-input v-model="editForm.title" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEdit = false">取 消</el-button>
        <el-button type="primary" @click="postEdit">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  beforeCreate () {
    const token = window.localStorage.getItem('token')
    if (!token) {
      this.$router.push('/login')
    }
  },
  data () {
    return {
      tableData: [],
      showAdd: false,
      addForm: {
        title: ''
      },
      editForm: {},
      showEdit: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData () {
      this.$http
      .get("/user/todo")
      .then(res => {
        this.tableData = res.data
      })
      .catch(err => {
        console.log(err)
      })
    },
    add () {
      this.$http.post('/todo', this.addForm)
        .then(res => {
          this.$message({
            type: 'success',
            message: '添加成功！'
          })
          this.addForm.title = ''
          this.showAdd = false
          this.getData()
        }).catch(err => {
          this.$message({
            type: 'error',
            message: '添加失败！'
          })
        })
    },
    cancleAdd () {
      this.addForm.title = ''
      this.showAdd = false
    },
    edit (row) {
      this.showEdit = true
      this.editForm = row
    },
    postEdit () {
      this.$http.put(`/todo/${this.editForm.id}`, this.editForm)
        .then(res => {
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
          this.showEdit = false
          this.getData()
        }).catch(err => {
          this.$message({
            type: 'error',
            message: '修改失败！'
          })
        })
    },
    del (id) {
      this.$confirm('是否确定删除当前数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/todo/${id}`)
        .then(res => {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.showEdit = false
          this.getData()
        }).catch(err => {
          this.$message({
            type: 'error',
            message: '删除失败！'
          })
        })
      }).catch(() => {
        this.$message({
            type: 'info',
            message: '已取消删除'
        });
      })
      
    },
    logout () {
      window.localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.el-button {
  margin: 10px;
}
</style>
