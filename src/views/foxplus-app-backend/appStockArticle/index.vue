<template>
	<div class="avue-content">
		<avue-crud
			:table-loading="loading"
			ref="crud"
			v-model="form"
			@on-load="onLoad"
			@row-update="rowUpdate"
			@row-save="rowSave"
			@row-del="rowDel"
			@refresh-change="refreshChange"
			@size-change="sizeChange"
			@current-change="currentChange"
			:data="tableData"
			:option="tableOption"
			:before-open="beforeOpen"
		></avue-crud>
	</div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { fetchList, addObj, putObj, getObj, delObjs } from '/@/api/foxplus-app-backend/appStockArticle';
import { useMessage, useMessageBox } from '/@/hooks/message';
import type { Pagination } from '/@/hooks/table';

const crud = ref();
let loading = ref<boolean>(false);
let tableData = reactive([]);
let form = reactive<any>({});
let query = reactive({});
let page = reactive<Pagination>({
	current: 1,
	size: 10,
});
const tableOption = reactive({
	lazy: true,
	simplePage: true,
	searchGutter: 2,
	column: [
		{
			label: '标题',
			prop: 'title',
			rules: [
				{
					required: true,
					message: '请输入标题',
					trigger: 'blur',
				},
			],
		},
		{
			label: '概要',
			prop: 'summary',
			type: 'textarea',
			span: 24,
			minRows: 3,
			rules: [
				{
					required: true,
					message: '请输入概要',
					trigger: 'blur',
				},
			],
		},
		{
			label: '内容',
			prop: 'content',
			component: 'AvueUeditor',
			span: 24,
			minRows: 6,
			rules: [
				{
					required: true,
					message: '请输入内容',
					trigger: 'blur',
				},
			],
		},
		{
			label: '发布时间',
			prop: 'publishDate',
			type: 'date',
			format: 'yyyy-MM-dd',
			valueFormat: 'yyyy-MM-dd',
			display: false,
		},
		{
			label: '是否发布',
			type: 'switch',
			prop: 'isPublished',
			value: 1,
			dicData: [
				{
					label: '否',
					value: 0,
				},
				{
					label: '是',
					value: 1,
				},
			],
		},
	],
});
/******************************************业务******************************* */
async function onLoad(page: Pagination, params = {}) {
	loading.value = true;
	const res = await fetchList({ ...page, ...params });
	tableData = res.data.records;
	loading.value = false;
}
async function rowUpdate(row: any, done: any, loading: any) {
	try {
		await putObj(row);
		useMessage().success('操作成功');
		// 数据回调进行刷新
		onLoad(page);
		done(row);
	} catch (error) {
		window.console.log(error);
		loading();
	}
}
async function rowSave(row: any, done: any, loading: any) {
	try {
		await addObj(row);
		useMessage().success('操作成功');
		// 数据回调进行刷新
		done(row);
	} catch (error) {
		window.console.log(error);
		loading();
	}
}
async function beforeOpen(done: any, type: any) {
	if (['edit', 'view'].includes(type)) {
		const res = await getObj(form.id);
		form = res.data;
	}
	done();
}
function refreshChange() {
	onLoad(page, query);
}
function sizeChange(pageSize: number) {
	page.size = pageSize;
}
function currentChange(currentPage: number) {
	page.current = currentPage;
}
async function rowDel(row: any) {
	await useMessageBox().confirm('确定将选择数据删除?');
	await delObjs([row.id]);
	onLoad(page);
	useMessage().success('操作成功!');
}
</script>
