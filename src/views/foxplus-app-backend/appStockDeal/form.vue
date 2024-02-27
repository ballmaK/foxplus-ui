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
      <el-form-item label="股票代码" prop="code">
        <el-input v-model="form.code" placeholder="请输入股票代码"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="交易日期" prop="dealDate">
        <el-input v-model="form.dealDate" placeholder="请输入交易日期"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="成交时间" prop="dealTime">
        <el-input v-model="form.dealTime" placeholder="请输入成交时间"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="成交价格" prop="dealPrice">
        <el-input v-model="form.dealPrice" placeholder="请输入成交价格"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="交易金额" prop="dealAmount">
        <el-input v-model="form.dealAmount" placeholder="请输入交易金额"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="成交数量" prop="dealVolume">
        <el-input v-model="form.dealVolume" placeholder="请输入成交数量"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="交易后持仓" prop="holdVolume">
        <el-input v-model="form.holdVolume" placeholder="请输入交易后持仓"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="交易后可用持仓" prop="validVolume">
        <el-input v-model="form.validVolume" placeholder="请输入交易后可用持仓"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="交易费用" prop="dealFee">
        <el-input v-model="form.dealFee" placeholder="请输入交易费用"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="其他费用" prop="otherFee">
        <el-input v-model="form.otherFee" placeholder="请输入其他费用"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="经手费" prop="brokerage">
        <el-input v-model="form.brokerage" placeholder="请输入经手费"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="印花税" prop="stampDuty">
        <el-input v-model="form.stampDuty" placeholder="请输入印花税"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="过户费" prop="transferTax">
        <el-input v-model="form.transferTax" placeholder="请输入过户费"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="佣金" prop="commission">
        <el-input v-model="form.commission" placeholder="请输入佣金"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="总费用" prop="totalFee">
        <el-input v-model="form.totalFee" placeholder="请输入总费用"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="交易前成本" prop="costBeforeDeal">
        <el-input v-model="form.costBeforeDeal" placeholder="请输入交易前成本"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="交易后成本" prop="costAfterDeal">
        <el-input v-model="form.costAfterDeal" placeholder="请输入交易后成本"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="交易盈亏" prop="dealProfit">
        <el-input v-model="form.dealProfit" placeholder="请输入交易盈亏"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="现金余额" prop="cashBalance">
        <el-input v-model="form.cashBalance" placeholder="请输入现金余额"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="交易类型" prop="dealType">
        <el-input v-model="form.dealType" placeholder="请输入交易类型"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="交易状态，0未结算，1已结算" prop="dealStatus">
        <el-input v-model="form.dealStatus" placeholder="请输入交易状态，0未结算，1已结算"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="交易方向，0买入，1卖出" prop="dealDirection">
        <el-input v-model="form.dealDirection" placeholder="请输入交易方向，0买入，1卖出"/>
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

<script setup lang="ts" name="AppStockDealDialog">
import { useDict } from '/@/hooks/dict';
import { useMessage } from "/@/hooks/message";
import { getObj, addObj, putObj } from '/@/api/foxplus-app-backend/appStockDeal'
import { rule } from '/@/utils/validate';
const emit = defineEmits(['refresh']);

// 定义变量内容
const dataFormRef = ref();
const visible = ref(false)
const loading = ref(false)
// 定义字典
const { deal_type,deal_stock_deal_status,deal_direction } = useDict('deal_type','deal_stock_deal_status','deal_direction')

// 提交表单数据
const form = reactive({
		id:'',
	  userId: '',
	  code: '',
	  dealDate: '',
	  dealTime: '',
	  dealPrice: '',
	  dealAmount: '',
	  dealVolume: '',
	  holdVolume: '',
	  validVolume: '',
	  dealFee: '',
	  otherFee: '',
	  brokerage: '',
	  stampDuty: '',
	  transferTax: '',
	  commission: '',
	  totalFee: '',
	  costBeforeDeal: '',
	  costAfterDeal: '',
	  dealProfit: '',
	  cashBalance: '',
	  dealType: '',
	  dealStatus: '',
	  dealDirection: '',
});

// 定义校验规则
const dataRules = ref({
        userId: [{required: true, message: '用户ID不能为空', trigger: 'blur'}],
        code: [{required: true, message: '股票代码不能为空', trigger: 'blur'}],
        dealDate: [{required: true, message: '交易日期不能为空', trigger: 'blur'}],
        dealTime: [{required: true, message: '成交时间不能为空', trigger: 'blur'}],
        dealPrice: [{required: true, message: '成交价格不能为空', trigger: 'blur'}],
        dealAmount: [{required: true, message: '交易金额不能为空', trigger: 'blur'}],
        dealVolume: [{required: true, message: '成交数量不能为空', trigger: 'blur'}],
        holdVolume: [{required: true, message: '交易后持仓不能为空', trigger: 'blur'}],
        validVolume: [{required: true, message: '交易后可用持仓不能为空', trigger: 'blur'}],
        dealFee: [{required: true, message: '交易费用不能为空', trigger: 'blur'}],
        otherFee: [{required: true, message: '其他费用不能为空', trigger: 'blur'}],
        brokerage: [{required: true, message: '经手费不能为空', trigger: 'blur'}],
        stampDuty: [{required: true, message: '印花税不能为空', trigger: 'blur'}],
        transferTax: [{required: true, message: '过户费不能为空', trigger: 'blur'}],
        commission: [{required: true, message: '佣金不能为空', trigger: 'blur'}],
        totalFee: [{required: true, message: '总费用不能为空', trigger: 'blur'}],
        costBeforeDeal: [{required: true, message: '交易前成本不能为空', trigger: 'blur'}],
        costAfterDeal: [{required: true, message: '交易后成本不能为空', trigger: 'blur'}],
        dealProfit: [{required: true, message: '交易盈亏不能为空', trigger: 'blur'}],
        cashBalance: [{required: true, message: '现金余额不能为空', trigger: 'blur'}],
        dealType: [{required: true, message: '交易类型不能为空', trigger: 'blur'}],
        dealStatus: [{required: true, message: '交易状态，0未结算，1已结算不能为空', trigger: 'blur'}],
        dealDirection: [{required: true, message: '交易方向，0买入，1卖出不能为空', trigger: 'blur'}],
})

// 打开弹窗
const openDialog = (id: string) => {
  visible.value = true
  form.id = ''

  // 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

  // 获取appStockDeal信息
  if (id) {
    form.id = id
    getappStockDealData(id)
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
const getappStockDealData = (id: string) => {
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