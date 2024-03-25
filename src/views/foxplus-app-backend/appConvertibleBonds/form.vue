<template>
    <el-dialog :title="form.id ? '编辑' : '新增'" v-model="visible"
      :close-on-click-modal="false" draggable>
      <el-form ref="dataFormRef" :model="form" :rules="dataRules" formDialogRef label-width="90px" v-loading="loading">
       <el-row :gutter="24">
    <el-col :span="12" class="mb20">
      <el-form-item label="申购日期" prop="subDate">
        <el-input v-model="form.subDate" placeholder="请输入申购日期"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="债券代码" prop="bondCode">
        <el-input v-model="form.bondCode" placeholder="请输入债券代码"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="债券名称" prop="bondName">
        <el-input v-model="form.bondName" placeholder="请输入债券名称"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="正股代码" prop="code">
        <el-input v-model="form.code" placeholder="请输入正股代码"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="正股名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入正股名称"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="申购代码" prop="subCode">
        <el-input v-model="form.subCode" placeholder="请输入申购代码"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="配售代码" prop="shareCode">
        <el-input v-model="form.shareCode" placeholder="请输入配售代码"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="中签公布日" prop="signDate">
        <el-input v-model="form.signDate" placeholder="请输入中签公布日"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="计划发行量（亿元）" prop="planTotal">
        <el-input v-model="form.planTotal" placeholder="请输入计划发行量（亿元）"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="实际发行量（亿元）" prop="issueTotal">
        <el-input v-model="form.issueTotal" placeholder="请输入实际发行量（亿元）"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="发行价格（元）" prop="issuePrice">
        <el-input v-model="form.issuePrice" placeholder="请输入发行价格（元）"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="中签率" prop="successRate">
        <el-input v-model="form.successRate" placeholder="请输入中签率"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="上市日期" prop="listingDate">
        <el-input v-model="form.listingDate" placeholder="请输入上市日期"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="到期时间" prop="expireDate">
        <el-input v-model="form.expireDate" placeholder="请输入到期时间"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="转股价格" prop="price">
        <el-input v-model="form.price" placeholder="请输入转股价格"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="每股获配额" prop="quota">
        <el-input v-model="form.quota" placeholder="请输入每股获配额"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="中签号" prop="number">
        <el-input v-model="form.number" placeholder="请输入中签号"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="市场id" prop="marketId">
        <el-input v-model="form.marketId" placeholder="请输入市场id"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="股票市场id" prop="stockMarketId">
        <el-input v-model="form.stockMarketId" placeholder="请输入股票市场id"/>
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

<script setup lang="ts" name="AppConvertibleBondsDialog">
import { useDict } from '/@/hooks/dict';
import { useMessage } from "/@/hooks/message";
import { getObj, addObj, putObj } from '/@/api/foxplus-app-backend/appConvertibleBonds'
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
	  subDate: '',
	  bondCode: '',
	  bondName: '',
	  code: '',
	  name: '',
	  subCode: '',
	  shareCode: '',
	  signDate: '',
	  planTotal: '',
	  issueTotal: '',
	  issuePrice: '',
	  successRate: '',
	  listingDate: '',
	  expireDate: '',
	  price: '',
	  quota: '',
	  number: '',
	  marketId: '',
	  stockMarketId: '',
});

// 定义校验规则
const dataRules = ref({
        subDate: [{required: true, message: '申购日期不能为空', trigger: 'blur'}],
        bondCode: [{required: true, message: '债券代码不能为空', trigger: 'blur'}],
        bondName: [{required: true, message: '债券名称不能为空', trigger: 'blur'}],
        code: [{required: true, message: '正股代码不能为空', trigger: 'blur'}],
        name: [{required: true, message: '正股名称不能为空', trigger: 'blur'}],
        subCode: [{required: true, message: '申购代码不能为空', trigger: 'blur'}],
        shareCode: [{required: true, message: '配售代码不能为空', trigger: 'blur'}],
        signDate: [{required: true, message: '中签公布日不能为空', trigger: 'blur'}],
        planTotal: [{required: true, message: '计划发行量（亿元）不能为空', trigger: 'blur'}],
        issueTotal: [{required: true, message: '实际发行量（亿元）不能为空', trigger: 'blur'}],
        issuePrice: [{required: true, message: '发行价格（元）不能为空', trigger: 'blur'}],
        successRate: [{required: true, message: '中签率不能为空', trigger: 'blur'}],
        listingDate: [{required: true, message: '上市日期不能为空', trigger: 'blur'}],
        expireDate: [{required: true, message: '到期时间不能为空', trigger: 'blur'}],
        price: [{required: true, message: '转股价格不能为空', trigger: 'blur'}],
        quota: [{required: true, message: '每股获配额不能为空', trigger: 'blur'}],
        number: [{required: true, message: '中签号不能为空', trigger: 'blur'}],
        marketId: [{required: true, message: '市场id不能为空', trigger: 'blur'}],
        stockMarketId: [{required: true, message: '股票市场id不能为空', trigger: 'blur'}],
})

// 打开弹窗
const openDialog = (id: string) => {
  visible.value = true
  form.id = ''

  // 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

  // 获取appConvertibleBonds信息
  if (id) {
    form.id = id
    getappConvertibleBondsData(id)
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
const getappConvertibleBondsData = (id: string) => {
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