<template>
  <div class="layout-padding">
    <div class="layout-padding-auto layout-padding-view">
      <el-row v-show="showSearch">
        <el-form :model="state.queryForm" ref="queryRef" :inline="true" @keyup.enter="getDataList">
      <el-form-item label="交易日" prop="tradeDate" >
        <el-input placeholder="请输入交易日" v-model="state.queryForm.tradeDate" />
      </el-form-item>
          <el-form-item>
            <el-button icon="search" type="primary" @click="getDataList">
              查询
            </el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <div class="mb8" style="width: 100%">
          <el-button icon="folder-add" type="primary" class="ml10" @click="formDialogRef.openDialog()"
            v-auth="'foxplus-app-backend_appStockReverseDebtRate_add'">
            新 增
          </el-button>
          <el-button plain :disabled="multiple" icon="Delete" type="primary"
            v-auth="'foxplus-app-backend_appStockReverseDebtRate_del'" @click="handleDelete(selectObjs)">
            删除
          </el-button>
          <right-toolbar v-model:showSearch="showSearch" :export="'foxplus-app-backend_appStockReverseDebtRate_export'"
                @exportExcel="exportExcel" class="ml10 mr20" style="float: right;"
            @queryTable="getDataList"></right-toolbar>
        </div>
      </el-row>
      <el-table :data="state.dataList" v-loading="state.loading" border 
        :cell-style="tableStyle.cellStyle" :header-cell-style="tableStyle.headerCellStyle"
				@selection-change="selectionChangHandle"
        @sort-change="sortChangeHandle">
        <el-table-column type="selection" width="40" align="center" />
        <el-table-column type="index" label="#" width="40" />
          <el-table-column prop="tradeDate" label="交易日"  show-overflow-tooltip/>
          <el-table-column prop="rate" label="收益率"  show-overflow-tooltip/>
          <el-table-column prop="label" label="显示文字"  show-overflow-tooltip/>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button icon="edit-pen" text type="primary" v-auth="'foxplus-app-backend_appStockReverseDebtRate_edit'"
              @click="formDialogRef.openDialog(scope.row.id)">编辑</el-button>
            <el-button icon="delete" text type="primary" v-auth="'foxplus-app-backend_appStockReverseDebtRate_del'" @click="handleDelete([scope.row.id])">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" v-bind="state.pagination" />
    </div>

    <!-- 编辑、新增  -->
    <form-dialog ref="formDialogRef" @refresh="getDataList(false)" />

  </div>
</template>

<script setup lang="ts" name="systemAppStockReverseDebtRate">
import { BasicTableProps, useTable } from "/@/hooks/table";
import { fetchList, delObjs } from "/@/api/foxplus-app-backend/appStockReverseDebtRate";
import { useMessage, useMessageBox } from "/@/hooks/message";
import { useDict } from '/@/hooks/dict';

// 引入组件
const FormDialog = defineAsyncComponent(() => import('./form.vue'));
// 定义查询字典

// 定义变量内容
const formDialogRef = ref()
// 搜索变量
const queryRef = ref()
const showSearch = ref(true)
// 多选变量
const selectObjs = ref([]) as any
const multiple = ref(true)

const state: BasicTableProps = reactive<BasicTableProps>({
  queryForm: {},
  pageList: fetchList
})

//  table hook
const {
  getDataList,
  currentChangeHandle,
  sizeChangeHandle,
  sortChangeHandle,
  downBlobFile,
	tableStyle
} = useTable(state)

// 清空搜索条件
const resetQuery = () => {
  // 清空搜索条件
  queryRef.value?.resetFields()
  // 清空多选
  selectObjs.value = []
  getDataList()
}

// 导出excel
const exportExcel = () => {
  downBlobFile('/foxplus-app-backend/appStockReverseDebtRate/export',Object.assign(state.queryForm, { ids: selectObjs }), 'appStockReverseDebtRate.xlsx')
}

// 多选事件
const selectionChangHandle = (objs: { id: string }[]) => {
  selectObjs.value = objs.map(({ id }) => id);
  multiple.value = !objs.length;
};

// 删除操作
const handleDelete = async (ids: string[]) => {
  try {
    await useMessageBox().confirm('此操作将永久删除');
  } catch {
    return;
  }

  try {
    await delObjs(ids);
    getDataList();
    useMessage().success('删除成功');
  } catch (err: any) {
    useMessage().error(err.msg);
  }
};
</script>