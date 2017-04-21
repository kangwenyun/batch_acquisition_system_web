<template>
  <div class="checkbatch">
    <div class="batch_header">接受中批次信息查看</div>
    <div class="line"></div>
    <div class="content_table">
      <el-table
        :data="batchData"
        style="width: 100%"
        stripe
        highlight-current-row
        @row-click = "rowClick"
        empty-text = "还没有当前阶段的批次信息哦~~~">
        <el-table-column type="expand">
          <template scope="props">
            <el-tree :data="props.row.detailData" 
                    :props="props.row.defaultProps" 
                    empty-text="还没有数据哦~~~"
                    @node-click="handleNodeClick"
                    highlight-current
                    style="border: 0;background: transparent"></el-tree>
          </template>
        </el-table-column>
        <el-table-column
            label="批次ID"
            prop="id">
        </el-table-column>
        <el-table-column
            label="货物总数"
            prop="totalNum">
        </el-table-column>
        <el-table-column
            label="批次已有数"
            prop="alreadyNum">
        </el-table-column>
      </el-table>
    </div>
    <div class="line"></div>
    <div class="content_tree">
      <el-tree :data="detailData" 
          :props="defaultProps" 
          empty-text="还没有数据哦~~~"
          @node-click="handleNodeClick"
          highlight-current
          default-expand-all
          class="tree"></el-tree>
    </div>
</div>
</template>

<script>
export default {
  name: 'checkallbatch',
  data () {
    return {
      batchData: [],
      // 下面的tree
      detailData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      var bdata = [{
        id: 'A1',
        totalNum: 50,
        alreadyNum: 1,
        detailData: [{
          label: 'A1-批次货物总数：50;批次货物已有数：1',
          children: [{
            label: 'T1-托盘总数：1',
            children: [
                {label: '1-类型：A；录入时间：2017-04-10 18:02:41；备注：0'}
            ]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }, {
        id: 'A2',
        totalNum: '50',
        alreadyNum: '0',
        detailData: [{
          label: 'A2-批次货物总数：50;批次货物已有数：0',
          children: []
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }]
      bdata.forEach(function (element) {
        this.batchData.push(element)
      }, this)
      this.rowClick(this.batchData[0])
    },
    rowClick (row) {
      console.log(row.detailData)
      this.detailData = row.detailData
    },
    handleNodeClick (data) {
      console.log(data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content_table{
  margin-bottom: 50px;
  border-top: 1px solid #c0cdd9;
}
.batch_header{
    border-left: 3px solid #59AfE4;
    padding-left: 5px;
    font-size: larger;
    text-align: -webkit-left;
}
.line{
  height: 1px;
  background-color: #c0cdd9;
  margin: 10px 0;
}
.content_tree{
  margin-top:40px;
}
.footer{
    margin-left: -600px;
    width: 1200px;
}
.tree{
    border: 0 !important;
    background: transparent !important;
}
</style>
