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
      <el-form-item label="券商账户" prop="brokerAccount">
        <el-input v-model="form.brokerAccount" placeholder="请输入券商账户"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="券商名称" prop="brokerName">
        <el-input v-model="form.brokerName" placeholder="请输入券商名称"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="初始现金(元)" prop="cash">
        <el-input v-model="form.cash" placeholder="请输入初始现金(元)"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="经手费" prop="brokerage">
        <el-input v-model="form.brokerage" placeholder="请输入经手费"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="佣金" prop="commission">
        <el-input v-model="form.commission" placeholder="请输入佣金"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="清仓后盈利" prop="clearProfit">
        <el-input v-model="form.clearProfit" placeholder="请输入清仓后盈利"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="清仓后成本" prop="clearCostPrice">
        <el-input v-model="form.clearCostPrice" placeholder="请输入清仓后成本"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="过户费" prop="transferTax">
        <el-input v-model="form.transferTax" placeholder="请输入过户费"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="印花税" prop="stampDuty">
        <el-input v-model="form.stampDuty" placeholder="请输入印花税"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="底部风格" prop="footerStyle">
        <el-input v-model="form.footerStyle" placeholder="请输入底部风格"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="首页是否展示" prop="showHome">
        <el-input v-model="form.showHome" placeholder="请输入首页是否展示"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="主题风格" prop="colorStyle">
        <el-input v-model="form.colorStyle" placeholder="请输入主题风格"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="绑定银行名称" prop="bindBankName">
        <el-input v-model="form.bindBankName" placeholder="请输入绑定银行名称"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="绑定银行密码" prop="bindBankPwd">
        <el-input v-model="form.bindBankPwd" placeholder="请输入绑定银行密码"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="当前使用，0否，1是" prop="inUse">
        <el-input v-model="form.inUse" placeholder="请输入当前使用，0否，1是"/>
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

<script setup lang="ts" name="AppStockUserConfigDialog">
import { useDict } from '/@/hooks/dict';
import { useMessage } from "/@/hooks/message";
import { getObj, addObj, putObj } from '/@/api/foxplus-app-backend/appStockUserConfig'
import { rule } from '/@/utils/validate';
const emit = defineEmits(['refresh']);

// 定义变量内容
const dataFormRef = ref();
const visible = ref(false)
const loading = ref(false)
// 定义字典
const { yes_no_type } = useDict('yes_no_type')

// 提交表单数据
const form = reactive({
		id:'',
	  userId: '',
	  brokerAccount: '',
	  brokerName: '',
	  cash: '',
	  brokerage: '',
	  commission: '',
	  clearProfit: '',
	  clearCostPrice: '',
	  transferTax: '',
	  stampDuty: '',
	  footerStyle: '',
	  showHome: '',
	  colorStyle: '',
	  bindBankName: '',
	  bindBankPwd: '',
	  inUse: '',
});

// 定义校验规则
const dataRules = ref({
        userId: [{required: true, message: '用户ID不能为空', trigger: 'blur'}],
        brokerAccount: [{required: true, message: '券商账户不能为空', trigger: 'blur'}],
        brokerName: [{required: true, message: '券商名称不能为空', trigger: 'blur'}],
        cash: [{required: true, message: '初始现金(元)不能为空', trigger: 'blur'}],
        brokerage: [{required: true, message: '经手费不能为空', trigger: 'blur'}],
        commission: [{required: true, message: '佣金不能为空', trigger: 'blur'}],
        clearProfit: [{required: true, message: '清仓后盈利不能为空', trigger: 'blur'}],
        clearCostPrice: [{required: true, message: '清仓后成本不能为空', trigger: 'blur'}],
        transferTax: [{required: true, message: '过户费不能为空', trigger: 'blur'}],
        stampDuty: [{required: true, message: '印花税不能为空', trigger: 'blur'}],
        footerStyle: [{required: true, message: '底部风格不能为空', trigger: 'blur'}],
        showHome: [{required: true, message: '首页是否展示不能为空', trigger: 'blur'}],
        colorStyle: [{required: true, message: '主题风格不能为空', trigger: 'blur'}],
        bindBankName: [{required: true, message: '绑定银行名称不能为空', trigger: 'blur'}],
        bindBankPwd: [{required: true, message: '绑定银行密码不能为空', trigger: 'blur'}],
        inUse: [{required: true, message: '当前使用，0否，1是不能为空', trigger: 'blur'}],
})

// 打开弹窗
const openDialog = (id: string) => {
  visible.value = true
  form.id = ''

  // 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

  // 获取appStockUserConfig信息
  if (id) {
    form.id = id
    getappStockUserConfigData(id)
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
const getappStockUserConfigData = (id: string) => {
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