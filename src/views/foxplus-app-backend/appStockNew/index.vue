<template>
  <div class="layout-padding">
    <div class="layout-padding-auto layout-padding-view">
      <el-row v-show="showSearch">
        <el-form :model="state.queryForm" ref="queryRef" :inline="true" @keyup.enter="getDataList">
      <el-form-item label="证券代码" prop="code" >
        <el-input placeholder="请输入证券代码" v-model="state.queryForm.code" />
      </el-form-item>
      <el-form-item label="证券简称" prop="name" >
        <el-input placeholder="请输入证券简称" v-model="state.queryForm.name" />
      </el-form-item>
      <el-form-item label="申购代码" prop="subCode" >
        <el-input placeholder="请输入申购代码" v-model="state.queryForm.subCode" />
      </el-form-item>
      <el-form-item label="申购日期" prop="purchaseDate" >
        <el-input placeholder="请输入申购日期" v-model="state.queryForm.purchaseDate" />
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
            v-auth="'foxplus-app-backend_appStockNew_add'">
            新 增
          </el-button>
          <el-button plain :disabled="multiple" icon="Delete" type="primary"
            v-auth="'foxplus-app-backend_appStockNew_del'" @click="handleDelete(selectObjs)">
            删除
          </el-button>
          <right-toolbar v-model:showSearch="showSearch" :export="'foxplus-app-backend_appStockNew_export'"
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
          <el-table-column prop="code" label="证券代码"  show-overflow-tooltip/>
          <el-table-column prop="name" label="证券简称"  show-overflow-tooltip/>
          <el-table-column prop="subCode" label="申购代码"  show-overflow-tooltip/>
          <el-table-column prop="issueVolume" label="发行数量"  show-overflow-tooltip/>
          <el-table-column prop="onlineIssueVolume" label="上网发行数量"  show-overflow-tooltip/>
          <el-table-column prop="purchaseLimit" label="申购上限"  show-overflow-tooltip/>
          <el-table-column prop="maxPurchaseQuantity" label="顶格申购数量"  show-overflow-tooltip/>
          <el-table-column prop="purchaseDate" label="申购日期"  show-overflow-tooltip/>
          <el-table-column prop="issuePrice" label="发行价格"  show-overflow-tooltip/>
          <el-table-column prop="latestPrice" label="最新价"  show-overflow-tooltip/>
          <el-table-column prop="firstDayClosingPrice" label="首日收盘价（元）"  show-overflow-tooltip/>
          <el-table-column prop="lotteryAnnouncementDate" label="中签号公布日"  show-overflow-tooltip/>
          <el-table-column prop="lotteryPaymentDate" label="中签缴款日"  show-overflow-tooltip/>
          <el-table-column prop="listingDate" label="上市日期"  show-overflow-tooltip/>
          <el-table-column prop="issuePe" label="发行市盈率"  show-overflow-tooltip/>
          <el-table-column prop="industryPe" label="行业市盈率"  show-overflow-tooltip/>
          <el-table-column prop="winningRate" label="中签率（%）"  show-overflow-tooltip/>
          <el-table-column prop="continuousLimitUpDays" label="连续一字板数量"  show-overflow-tooltip/>
          <el-table-column prop="increaseRate" label="涨幅"  show-overflow-tooltip/>
          <el-table-column prop="profitPerLot" label="每中一签获利（元）"  show-overflow-tooltip/>
          <el-table-column prop="mainBusiness" label="主营业务"  show-overflow-tooltip/>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button icon="edit-pen" text type="primary" v-auth="'foxplus-app-backend_appStockNew_edit'"
              @click="formDialogRef.openDialog(scope.row.id)">编辑</el-button>
            <el-button icon="delete" text type="primary" v-auth="'foxplus-app-backend_appStockNew_del'" @click="handleDelete([scope.row.id])">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" v-bind="state.pagination" />
    </div>

    <!-- 编辑、新增  -->
    <form-dialog ref="formDialogRef" @refresh="getDataList(false)" />

  </div>
</template>

<script setup lang="ts" name="systemAppStockNew">
import { BasicTableProps, useTable } from "/@/hooks/table";
import { fetchList, delObjs } from "/@/api/foxplus-app-backend/appStockNew";
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
  downBlobFile('/foxplus-app-backend/appStockNew/export',Object.assign(state.queryForm, { ids: selectObjs }), 'appStockNew.xlsx')
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