<template>
    <el-dialog :title="form.roleId ? '编辑' : '新增'" v-model="visible"
      :close-on-click-modal="false" draggable>
      <el-form ref="dataFormRef" :model="form" :rules="dataRules" formDialogRef label-width="90px" v-loading="loading">
       <el-row :gutter="24">
    <el-col :span="12" class="mb20">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" placeholder="请输入角色名称"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="角色编码" prop="roleCode">
        <el-input v-model="form.roleCode" placeholder="请输入角色编码"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="form.roleDesc" placeholder="请输入角色描述"/>
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

<script setup lang="ts" name="AppRoleDialog">
import { useDict } from '/@/hooks/dict';
import { useMessage } from "/@/hooks/message";
import { getObj, addObj, putObj } from '/@/api/foxplus-app-backend/appRole'
import { rule } from '/@/utils/validate';
const emit = defineEmits(['refresh']);

// 定义变量内容
const dataFormRef = ref();
const visible = ref(false)
const loading = ref(false)
// 定义字典

// 提交表单数据
const form = reactive({
		roleId:'',
	  roleName: '',
	  roleCode: '',
	  roleDesc: '',
});

// 定义校验规则
const dataRules = ref({
        roleName: [{required: true, message: '角色名称不能为空', trigger: 'blur'}],
        roleCode: [{required: true, message: '角色编码不能为空', trigger: 'blur'}],
        roleDesc: [{required: true, message: '角色描述不能为空', trigger: 'blur'}],
})

// 打开弹窗
const openDialog = (id: string) => {
  visible.value = true
  form.roleId = ''

  // 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

  // 获取appRole信息
  if (id) {
    form.roleId = id
    getappRoleData(id)
  }
};

// 提交
const onSubmit = async () => {
	const valid = await dataFormRef.value.validate().catch(() => {});
	if (!valid) return false;

	try {
    loading.value = true;
		form.roleId ? await putObj(form) : await addObj(form);
		useMessage().success(form.roleId ? '修改成功' : '添加成功');
		visible.value = false;
		emit('refresh');
	} catch (err: any) {
		useMessage().error(err.msg);
	} finally {
    loading.value = false;
  }
};


// 初始化表单数据
const getappRoleData = (id: string) => {
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