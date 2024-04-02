<template>
    <el-dialog :title="form.exeDate ? '编辑' : '新增'" v-model="visible"
      :close-on-click-modal="false" draggable>
      <el-form ref="dataFormRef" :model="form" :rules="dataRules" formDialogRef label-width="90px" v-loading="loading">
       <el-row :gutter="24">
    <el-col :span="12" class="mb20">
      <el-form-item label=" sharpe" prop="sharpe">
        <el-input v-model="form.sharpe" placeholder="请输入 sharpe"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label=" rnorm100" prop="rnorm100">
        <el-input v-model="form.rnorm100" placeholder="请输入 rnorm100"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label=" lastOrderPrice" prop="lastOrderPrice">
        <el-input v-model="form.lastOrderPrice" placeholder="请输入 lastOrderPrice"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label=" lastOrderPriceNow" prop="lastOrderPriceNow">
        <el-input v-model="form.lastOrderPriceNow" placeholder="请输入 lastOrderPriceNow"/>
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

<script setup lang="ts" name="StockDailyResultDialog">
import { useDict } from '/@/hooks/dict';
import { useMessage } from "/@/hooks/message";
import { getObj, addObj, putObj } from '/@/api/foxplus-app-backend/stockDailyResult'
import { rule } from '/@/utils/validate';
const emit = defineEmits(['refresh']);

// 定义变量内容
const dataFormRef = ref();
const visible = ref(false)
const loading = ref(false)
// 定义字典

// 提交表单数据
const form = reactive({
		exeDate:'',
	  sharpe: '',
	  rnorm100: '',
	  lastOrderPrice: '',
	  lastOrderPriceNow: '',
});

// 定义校验规则
const dataRules = ref({
        sharpe: [{required: true, message: '不能为空', trigger: 'blur'}],
        rnorm100: [{required: true, message: '不能为空', trigger: 'blur'}],
        lastOrderPrice: [{required: true, message: '不能为空', trigger: 'blur'}],
        lastOrderPriceNow: [{required: true, message: '不能为空', trigger: 'blur'}],
})

// 打开弹窗
const openDialog = (id: string) => {
  visible.value = true
  form.exeDate = ''

  // 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

  // 获取stockDailyResult信息
  if (id) {
    form.exeDate = id
    getstockDailyResultData(id)
  }
};

// 提交
const onSubmit = async () => {
	const valid = await dataFormRef.value.validate().catch(() => {});
	if (!valid) return false;

	try {
    loading.value = true;
		form.exeDate ? await putObj(form) : await addObj(form);
		useMessage().success(form.exeDate ? '修改成功' : '添加成功');
		visible.value = false;
		emit('refresh');
	} catch (err: any) {
		useMessage().error(err.msg);
	} finally {
    loading.value = false;
  }
};


// 初始化表单数据
const getstockDailyResultData = (id: string) => {
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