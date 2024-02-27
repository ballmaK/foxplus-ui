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
      <el-form-item label="股票名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入股票名称"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="所属市场" prop="market">
        <el-input v-model="form.market" placeholder="请输入所属市场"/>
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

<script setup lang="ts" name="AppStockBaseDialog">
import { useDict } from '/@/hooks/dict';
import { useMessage } from "/@/hooks/message";
import { getObj, addObj, putObj } from '/@/api/foxplus-app-backend/appStockBase'
import { rule } from '/@/utils/validate';
const emit = defineEmits(['refresh']);

// 定义变量内容
const dataFormRef = ref();
const visible = ref(false)
const loading = ref(false)
// 定义字典
const { market_type } = useDict('market_type')

// 提交表单数据
const form = reactive({
		id:'',
	  code: '',
	  fullCode: '',
	  name: '',
	  market: '',
});

// 定义校验规则
const dataRules = ref({
        code: [{required: true, message: '股票代码不能为空', trigger: 'blur'}],
        fullCode: [{required: true, message: '股票完整代码不能为空', trigger: 'blur'}],
        name: [{required: true, message: '股票名称不能为空', trigger: 'blur'}],
        market: [{required: true, message: '所属市场不能为空', trigger: 'blur'}],
})

// 打开弹窗
const openDialog = (id: string) => {
  visible.value = true
  form.id = ''

  // 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

  // 获取appStockBase信息
  if (id) {
    form.id = id
    getappStockBaseData(id)
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
const getappStockBaseData = (id: string) => {
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