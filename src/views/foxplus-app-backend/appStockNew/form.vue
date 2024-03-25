<template>
    <el-dialog :title="form.id ? '编辑' : '新增'" v-model="visible"
      :close-on-click-modal="false" draggable>
      <el-form ref="dataFormRef" :model="form" :rules="dataRules" formDialogRef label-width="90px" v-loading="loading">
       <el-row :gutter="24">
    <el-col :span="12" class="mb20">
      <el-form-item label="证券代码" prop="code">
        <el-input v-model="form.code" placeholder="请输入证券代码"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="证券简称" prop="name">
        <el-input v-model="form.name" placeholder="请输入证券简称"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="申购代码" prop="subCode">
        <el-input v-model="form.subCode" placeholder="请输入申购代码"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="发行数量" prop="issueVolume">
        <el-input v-model="form.issueVolume" placeholder="请输入发行数量"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="上网发行数量" prop="onlineIssueVolume">
        <el-input v-model="form.onlineIssueVolume" placeholder="请输入上网发行数量"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="申购上限" prop="purchaseLimit">
        <el-input v-model="form.purchaseLimit" placeholder="请输入申购上限"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="顶格申购数量" prop="maxPurchaseQuantity">
        <el-input v-model="form.maxPurchaseQuantity" placeholder="请输入顶格申购数量"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="申购日期" prop="purchaseDate">
        <el-input v-model="form.purchaseDate" placeholder="请输入申购日期"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="发行价格" prop="issuePrice">
        <el-input v-model="form.issuePrice" placeholder="请输入发行价格"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="最新价" prop="latestPrice">
        <el-input v-model="form.latestPrice" placeholder="请输入最新价"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="首日收盘价（元）" prop="firstDayClosingPrice">
        <el-input v-model="form.firstDayClosingPrice" placeholder="请输入首日收盘价（元）"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="中签号公布日" prop="lotteryAnnouncementDate">
        <el-input v-model="form.lotteryAnnouncementDate" placeholder="请输入中签号公布日"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="中签缴款日" prop="lotteryPaymentDate">
        <el-input v-model="form.lotteryPaymentDate" placeholder="请输入中签缴款日"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="上市日期" prop="listingDate">
        <el-input v-model="form.listingDate" placeholder="请输入上市日期"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="发行市盈率" prop="issuePe">
        <el-input v-model="form.issuePe" placeholder="请输入发行市盈率"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="行业市盈率" prop="industryPe">
        <el-input v-model="form.industryPe" placeholder="请输入行业市盈率"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="中签率（%）" prop="winningRate">
        <el-input v-model="form.winningRate" placeholder="请输入中签率（%）"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="连续一字板数量" prop="continuousLimitUpDays">
        <el-input v-model="form.continuousLimitUpDays" placeholder="请输入连续一字板数量"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="涨幅" prop="increaseRate">
        <el-input v-model="form.increaseRate" placeholder="请输入涨幅"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="每中一签获利（元）" prop="profitPerLot">
        <el-input v-model="form.profitPerLot" placeholder="请输入每中一签获利（元）"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="主营业务" prop="mainBusiness">
        <el-input v-model="form.mainBusiness" placeholder="请输入主营业务"/>
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

<script setup lang="ts" name="AppStockNewDialog">
import { useDict } from '/@/hooks/dict';
import { useMessage } from "/@/hooks/message";
import { getObj, addObj, putObj } from '/@/api/foxplus-app-backend/appStockNew'
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
	  name: '',
	  subCode: '',
	  issueVolume: '',
	  onlineIssueVolume: '',
	  purchaseLimit: '',
	  maxPurchaseQuantity: '',
	  purchaseDate: '',
	  issuePrice: '',
	  latestPrice: '',
	  firstDayClosingPrice: '',
	  lotteryAnnouncementDate: '',
	  lotteryPaymentDate: '',
	  listingDate: '',
	  issuePe: '',
	  industryPe: '',
	  winningRate: '',
	  continuousLimitUpDays: '',
	  increaseRate: '',
	  profitPerLot: '',
	  mainBusiness: '',
});

// 定义校验规则
const dataRules = ref({
        code: [{required: true, message: '证券代码不能为空', trigger: 'blur'}],
        name: [{required: true, message: '证券简称不能为空', trigger: 'blur'}],
        subCode: [{required: true, message: '申购代码不能为空', trigger: 'blur'}],
        issueVolume: [{required: true, message: '发行数量不能为空', trigger: 'blur'}],
        onlineIssueVolume: [{required: true, message: '上网发行数量不能为空', trigger: 'blur'}],
        purchaseLimit: [{required: true, message: '申购上限不能为空', trigger: 'blur'}],
        maxPurchaseQuantity: [{required: true, message: '顶格申购数量不能为空', trigger: 'blur'}],
        purchaseDate: [{required: true, message: '申购日期不能为空', trigger: 'blur'}],
        issuePrice: [{required: true, message: '发行价格不能为空', trigger: 'blur'}],
        latestPrice: [{required: true, message: '最新价不能为空', trigger: 'blur'}],
        firstDayClosingPrice: [{required: true, message: '首日收盘价（元）不能为空', trigger: 'blur'}],
        lotteryAnnouncementDate: [{required: true, message: '中签号公布日不能为空', trigger: 'blur'}],
        lotteryPaymentDate: [{required: true, message: '中签缴款日不能为空', trigger: 'blur'}],
        listingDate: [{required: true, message: '上市日期不能为空', trigger: 'blur'}],
        issuePe: [{required: true, message: '发行市盈率不能为空', trigger: 'blur'}],
        industryPe: [{required: true, message: '行业市盈率不能为空', trigger: 'blur'}],
        winningRate: [{required: true, message: '中签率（%）不能为空', trigger: 'blur'}],
        continuousLimitUpDays: [{required: true, message: '连续一字板数量不能为空', trigger: 'blur'}],
        increaseRate: [{required: true, message: '涨幅不能为空', trigger: 'blur'}],
        profitPerLot: [{required: true, message: '每中一签获利（元）不能为空', trigger: 'blur'}],
        mainBusiness: [{required: true, message: '主营业务不能为空', trigger: 'blur'}],
})

// 打开弹窗
const openDialog = (id: string) => {
  visible.value = true
  form.id = ''

  // 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

  // 获取appStockNew信息
  if (id) {
    form.id = id
    getappStockNewData(id)
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
const getappStockNewData = (id: string) => {
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