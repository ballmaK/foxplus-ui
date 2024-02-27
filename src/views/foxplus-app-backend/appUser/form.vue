<template>
    <el-dialog :title="form.userId ? '编辑' : '新增'" v-model="visible"
      :close-on-click-modal="false" draggable>
      <el-form ref="dataFormRef" :model="form" :rules="dataRules" formDialogRef label-width="90px" v-loading="loading">
       <el-row :gutter="24">
    <el-col :span="12" class="mb20">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="盐值" prop="salt">
        <el-input v-model="form.salt" placeholder="请输入盐值"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="电话号码" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入电话号码"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="头像" prop="avatar">
        <el-input v-model="form.avatar" placeholder="请输入头像"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" placeholder="请输入昵称"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="邮箱地址" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱地址"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="最后一次密码修改时间" prop="lastModifiedTime">
        <el-input v-model="form.lastModifiedTime" placeholder="请输入最后一次密码修改时间"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="锁定标记，0未锁定，9已锁定" prop="lockFlag">
        <el-input v-model="form.lockFlag" placeholder="请输入锁定标记，0未锁定，9已锁定"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="微信登录openId" prop="wxOpenid">
        <el-input v-model="form.wxOpenid" placeholder="请输入微信登录openId"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="小程序openId" prop="miniOpenid">
        <el-input v-model="form.miniOpenid" placeholder="请输入小程序openId"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="QQ openId" prop="qqOpenid">
        <el-input v-model="form.qqOpenid" placeholder="请输入QQ openId"/>
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

<script setup lang="ts" name="AppUserDialog">
import { useDict } from '/@/hooks/dict';
import { useMessage } from "/@/hooks/message";
import { getObj, addObj, putObj } from '/@/api/foxplus-app-backend/appUser'
import { rule } from '/@/utils/validate';
const emit = defineEmits(['refresh']);

// 定义变量内容
const dataFormRef = ref();
const visible = ref(false)
const loading = ref(false)
// 定义字典

// 提交表单数据
const form = reactive({
		userId:'',
	  username: '',
	  password: '',
	  salt: '',
	  phone: '',
	  avatar: '',
	  nickname: '',
	  name: '',
	  email: '',
	  lastModifiedTime: '',
	  lockFlag: '',
	  wxOpenid: '',
	  miniOpenid: '',
	  qqOpenid: '',
});

// 定义校验规则
const dataRules = ref({
        username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
        salt: [{required: true, message: '盐值不能为空', trigger: 'blur'}],
        phone: [{required: true, message: '电话号码不能为空', trigger: 'blur'}],
        avatar: [{required: true, message: '头像不能为空', trigger: 'blur'}],
        nickname: [{required: true, message: '昵称不能为空', trigger: 'blur'}],
        name: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
        email: [{required: true, message: '邮箱地址不能为空', trigger: 'blur'}],
        lastModifiedTime: [{required: true, message: '最后一次密码修改时间不能为空', trigger: 'blur'}],
        lockFlag: [{required: true, message: '锁定标记，0未锁定，9已锁定不能为空', trigger: 'blur'}],
        wxOpenid: [{required: true, message: '微信登录openId不能为空', trigger: 'blur'}],
        miniOpenid: [{required: true, message: '小程序openId不能为空', trigger: 'blur'}],
        qqOpenid: [{required: true, message: 'QQ openId不能为空', trigger: 'blur'}],
})

// 打开弹窗
const openDialog = (id: string) => {
  visible.value = true
  form.userId = ''

  // 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

  // 获取appUser信息
  if (id) {
    form.userId = id
    getappUserData(id)
  }
};

// 提交
const onSubmit = async () => {
	const valid = await dataFormRef.value.validate().catch(() => {});
	if (!valid) return false;

	try {
    loading.value = true;
		form.userId ? await putObj(form) : await addObj(form);
		useMessage().success(form.userId ? '修改成功' : '添加成功');
		visible.value = false;
		emit('refresh');
	} catch (err: any) {
		useMessage().error(err.msg);
	} finally {
    loading.value = false;
  }
};


// 初始化表单数据
const getappUserData = (id: string) => {
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