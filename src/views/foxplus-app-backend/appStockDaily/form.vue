<template>
    <el-dialog :title="form.id ? '编辑' : '新增'" v-model="visible"
      :close-on-click-modal="false" draggable>
      <el-form ref="dataFormRef" :model="form" :rules="dataRules" formDialogRef label-width="90px" v-loading="loading">
       <el-row :gutter="24">
    <el-col :span="12" class="mb20">
      <el-form-item label="股票代码" prop="code">
        <el-input v-model="form.code" placeholder="请输入股票代码"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="股票完整代码" prop="fullCode">
        <el-input v-model="form.fullCode" placeholder="请输入股票完整代码"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="交易日期" prop="tradeDate">
        <el-input v-model="form.tradeDate" placeholder="请输入交易日期"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="开盘价(元)" prop="open">
        <el-input v-model="form.open" placeholder="请输入开盘价(元)"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="最高价(元)" prop="high">
        <el-input v-model="form.high" placeholder="请输入最高价(元)"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="最低价(元)" prop="low">
        <el-input v-model="form.low" placeholder="请输入最低价(元)"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="收盘价(元)" prop="close">
        <el-input v-model="form.close" placeholder="请输入收盘价(元)"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="成交量(手)" prop="volume">
        <el-input v-model="form.volume" placeholder="请输入成交量(手)"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="成交额(元)" prop="amount">
        <el-input v-model="form.amount" placeholder="请输入成交额(元)"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="涨跌额(元)" prop="amountChange">
        <el-input v-model="form.amountChange" placeholder="请输入涨跌额(元)"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="涨跌幅(%)" prop="pctChange">
        <el-input v-model="form.pctChange" placeholder="请输入涨跌幅(%)"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="换手率(%)" prop="turnover">
        <el-input v-model="form.turnover" placeholder="请输入换手率(%)"/>
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

<script setup lang="ts" name="AppStockDailyDialog">
import { useDict } from '/@/hooks/dict';
import { useMessage } from "/@/hooks/message";
import { getObj, addObj, putObj } from '/@/api/foxplus-app-backend/appStockDaily'
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
	  code: '',
	  fullCode: '',
	  tradeDate: '',
	  open: '',
	  high: '',
	  low: '',
	  close: '',
	  volume: '',
	  amount: '',
	  amountChange: '',
	  pctChange: '',
	  turnover: '',
});

// 定义校验规则
const dataRules = ref({
        code: [{required: true, message: '股票代码不能为空', trigger: 'blur'}],
        fullCode: [{required: true, message: '股票完整代码不能为空', trigger: 'blur'}],
        tradeDate: [{required: true, message: '交易日期不能为空', trigger: 'blur'}],
        open: [{required: true, message: '开盘价(元)不能为空', trigger: 'blur'}],
        high: [{required: true, message: '最高价(元)不能为空', trigger: 'blur'}],
        low: [{required: true, message: '最低价(元)不能为空', trigger: 'blur'}],
        close: [{required: true, message: '收盘价(元)不能为空', trigger: 'blur'}],
        volume: [{required: true, message: '成交量(手)不能为空', trigger: 'blur'}],
        amount: [{required: true, message: '成交额(元)不能为空', trigger: 'blur'}],
        amountChange: [{required: true, message: '涨跌额(元)不能为空', trigger: 'blur'}],
        pctChange: [{required: true, message: '涨跌幅(%)不能为空', trigger: 'blur'}],
        turnover: [{required: true, message: '换手率(%)不能为空', trigger: 'blur'}],
})

// 打开弹窗
const openDialog = (id: string) => {
  visible.value = true
  form.id = ''

  // 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

  // 获取appStockDaily信息
  if (id) {
    form.id = id
    getappStockDailyData(id)
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
const getappStockDailyData = (id: string) => {
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