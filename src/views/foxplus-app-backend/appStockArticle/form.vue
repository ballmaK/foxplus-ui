<template>
    <el-dialog :title="form.id ? '编辑' : '新增'" v-model="visible"
      :close-on-click-modal="false" draggable>
      <el-form ref="dataFormRef" :model="form" :rules="dataRules" formDialogRef label-width="90px" v-loading="loading">
       <el-row :gutter="24">
    <el-col :span="12" class="mb20">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="概要" prop="summary">
        <el-input v-model="form.summary" placeholder="请输入概要"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="存储富媒体内容的HTML" prop="content">
        <el-input v-model="form.content" placeholder="请输入存储富媒体内容的HTML"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="用户ID" prop="userId">
        <el-input v-model="form.userId" placeholder="请输入用户ID"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="发布时间" prop="publishDate">
        <el-input v-model="form.publishDate" placeholder="请输入发布时间"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="是否发布" prop="isPublished">
        <el-input v-model="form.isPublished" placeholder="请输入是否发布"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="封面图片文件路径或URL" prop="coverImage">
        <el-input v-model="form.coverImage" placeholder="请输入封面图片文件路径或URL"/>
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

<script setup lang="ts" name="AppStockArticleDialog">
import { useDict } from '/@/hooks/dict';
import { useMessage } from "/@/hooks/message";
import { getObj, addObj, putObj } from '/@/api/foxplus-app-backend/appStockArticle'
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
	  title: '',
	  summary: '',
	  content: '',
	  userId: '',
	  publishDate: '',
	  isPublished: '',
	  coverImage: '',
});

// 定义校验规则
const dataRules = ref({
        title: [{required: true, message: '标题不能为空', trigger: 'blur'}],
        summary: [{required: true, message: '概要不能为空', trigger: 'blur'}],
        content: [{required: true, message: '存储富媒体内容的HTML不能为空', trigger: 'blur'}],
        userId: [{required: true, message: '用户ID不能为空', trigger: 'blur'}],
        publishDate: [{required: true, message: '发布时间不能为空', trigger: 'blur'}],
        isPublished: [{required: true, message: '是否发布不能为空', trigger: 'blur'}],
        coverImage: [{required: true, message: '封面图片文件路径或URL不能为空', trigger: 'blur'}],
})

// 打开弹窗
const openDialog = (id: string) => {
  visible.value = true
  form.id = ''

  // 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

  // 获取appStockArticle信息
  if (id) {
    form.id = id
    getappStockArticleData(id)
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
const getappStockArticleData = (id: string) => {
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