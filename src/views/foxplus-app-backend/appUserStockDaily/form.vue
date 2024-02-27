<template>
    <el-dialog :title="form.id ? '编辑' : '新增'" v-model="visible"
      :close-on-click-modal="false" draggable>
      <el-form ref="dataFormRef" :model="form" :rules="dataRules" formDialogRef label-width="90px" v-loading="loading">
       <el-row :gutter="24">
    <el-col :span="12" class="mb20">
      <el-form-item label="用户ID" prop="userId">
        <el-input v-model="form.userId" placeholder="请输入用户ID"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="交易日期" prop="dealDate">
        <el-input v-model="form.dealDate" placeholder="请输入交易日期"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="当日盈亏" prop="dailyProfit">
        <el-input v-model="form.dailyProfit" placeholder="请输入当日盈亏"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="累计盈亏" prop="cumulativeProfit">
        <el-input v-model="form.cumulativeProfit" placeholder="请输入累计盈亏"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="仓位" prop="position">
        <el-input v-model="form.position" placeholder="请输入仓位"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="成交金额" prop="dealAmount">
        <el-input v-model="form.dealAmount" placeholder="请输入成交金额"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="总费用" prop="totalFee">
        <el-input v-model="form.totalFee" placeholder="请输入总费用"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="市值" prop="totalMarketValue">
        <el-input v-model="form.totalMarketValue" placeholder="请输入市值"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="总资产" prop="totalAssets">
        <el-input v-model="form.totalAssets" placeholder="请输入总资产"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="净转入" prop="transferIn">
        <el-input v-model="form.transferIn" placeholder="请输入净转入"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="现金余额" prop="cashBalance">
        <el-input v-model="form.cashBalance" placeholder="请输入现金余额"/>
      </el-form-item>
      </el-col>

			</el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit" :disabled="loading">确认</el-button>
        </span>
      </template>
    </el-dialog>
</template>

<script setup lang="ts" name="AppUserStockDailyDialog">
import { useDict } from '/@/hooks/dict';
import { useMessage } from "/@/hooks/message";
import { getObj, addObj, putObj } from '/@/api/foxplus-app-backend/appUserStockDaily'
import { rule } from '/@/utils/validate';
const emit = defineEmits(['refresh']);

// 定义变量内容
const dataFormRef = ref();
const visible = ref(false)
const loading = ref(false)
// 定义字典

// 提交表单数据
const form = reactive({
		id:'',
	  userId: '',
	  dealDate: '',
	  dailyProfit: '',
	  cumulativeProfit: '',
	  position: '',
	  dealAmount: '',
	  totalFee: '',
	  totalMarketValue: '',
	  totalAssets: '',
	  transferIn: '',
	  cashBalance: '',
});

// 定义校验规则
const dataRules = ref({
        userId: [{required: true, message: '用户ID不能为空', trigger: 'blur'}],
        dealDate: [{required: true, message: '交易日期不能为空', trigger: 'blur'}],
        dailyProfit: [{required: true, message: '当日盈亏不能为空', trigger: 'blur'}],
        cumulativeProfit: [{required: true, message: '累计盈亏不能为空', trigger: 'blur'}],
        position: [{required: true, message: '仓位不能为空', trigger: 'blur'}],
        dealAmount: [{required: true, message: '成交金额不能为空', trigger: 'blur'}],
        totalFee: [{required: true, message: '总费用不能为空', trigger: 'blur'}],
        totalMarketValue: [{required: true, message: '市值不能为空', trigger: 'blur'}],
        totalAssets: [{required: true, message: '总资产不能为空', trigger: 'blur'}],
        transferIn: [{required: true, message: '净转入不能为空', trigger: 'blur'}],
        cashBalance: [{required: true, message: '现金余额不能为空', trigger: 'blur'}],
})

// 打开弹窗
const openDialog = (id: string) => {
  visible.value = true
  form.id = ''

  // 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

  // 获取appUserStockDaily信息
  if (id) {
    form.id = id
    getappUserStockDailyData(id)
  }
};

// 提交
const onSubmit = async () => {
	const valid = await dataFormRef.value.validate().catch(() => {});
	if (!valid) return false;

	try {
    loading.value = true;
		form.id ? await putObj(form) : await addObj(form);
		useMessage().success(form.id ? '修改成功' : '添加成功');
		visible.value = false;
		emit('refresh');
	} catch (err: any) {
		useMessage().error(err.msg);
	} finally {
    loading.value = false;
  }
};


// 初始化表单数据
const getappUserStockDailyData = (id: string) => {
  // 获取数据
  loading.value = true
  getObj(id).then((res: any) => {
    Object.assign(form, res.data)
  }).finally(() => {
    loading.value = false
  })
};

// 暴露变量
defineExpose({
  openDialog
});
</script>