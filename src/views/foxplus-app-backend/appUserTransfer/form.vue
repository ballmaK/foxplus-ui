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
      <el-form-item label="转账日期" prop="transDate">
        <el-input v-model="form.transDate" placeholder="请输入转账日期"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="发生额(元)" prop="amount">
        <el-input v-model="form.amount" placeholder="请输入发生额(元)"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="交易类型，0转入，1转出" prop="type">
        <el-input v-model="form.type" placeholder="请输入交易类型，0转入，1转出"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="可用现金" prop="cash">
        <el-input v-model="form.cash" placeholder="请输入可用现金"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="可取现金" prop="bankCash">
        <el-input v-model="form.bankCash" placeholder="请输入可取现金"/>
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

<script setup lang="ts" name="AppUserTransferDialog">
import { useDict } from '/@/hooks/dict';
import { useMessage } from "/@/hooks/message";
import { getObj, addObj, putObj } from '/@/api/foxplus-app-backend/appUserTransfer'
import { rule } from '/@/utils/validate';
const emit = defineEmits(['refresh']);

// 定义变量内容
const dataFormRef = ref();
const visible = ref(false)
const loading = ref(false)
// 定义字典
const { user_transfer_type } = useDict('user_transfer_type')

// 提交表单数据
const form = reactive({
		id:'',
	  userId: '',
	  transDate: '',
	  amount: '',
	  type: '',
	  cash: '',
	  bankCash: '',
});

// 定义校验规则
const dataRules = ref({
        userId: [{required: true, message: '用户ID不能为空', trigger: 'blur'}],
        transDate: [{required: true, message: '转账日期不能为空', trigger: 'blur'}],
        amount: [{required: true, message: '发生额(元)不能为空', trigger: 'blur'}],
        type: [{required: true, message: '交易类型，0转入，1转出不能为空', trigger: 'blur'}],
        cash: [{required: true, message: '可用现金不能为空', trigger: 'blur'}],
        bankCash: [{required: true, message: '可取现金不能为空', trigger: 'blur'}],
})

// 打开弹窗
const openDialog = (id: string) => {
  visible.value = true
  form.id = ''

  // 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

  // 获取appUserTransfer信息
  if (id) {
    form.id = id
    getappUserTransferData(id)
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
const getappUserTransferData = (id: string) => {
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