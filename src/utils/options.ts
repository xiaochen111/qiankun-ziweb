// import Intl from './locales';

export type OptionType = {
  label?: any;
  value: any;
  nameCn?: any;
  nameEn?: any;
};

/**
 * 类型-下拉菜单
 */
export const typesOption: OptionType[] = [
  {
    label: '菜单',
    value: 1,
  },
  {
    label: '按钮',
    value: 2,
  },
];

/**
 * 用户状态
 */
export const UserStateOption: OptionType[] = [
  {
    label: '正常',
    value: 1,
  },
  {
    label: '无效',
    value: 0,
  },
];

export const BaseDataStateOption: OptionType[] = [
  {
    label: '正常',
    value: 1,
  },
  {
    label: '取消',
    value: 0,
  },
];

export const BaseDataCancelOption: OptionType[] = [
  {
    label: '正常',
    value: 0,
  },
  {
    label: '取消',
    value: 1,
  },
];

/*
 * 是否-下拉
 */
export const yesOrNoOptionList: OptionType[] = [
  {
    label: '是',
    value: false,
  },
  {
    label: '否',
    value: true,
  },
];

/**
 * 是否option
 */
export const whetherOption = (type: 'boolean' | 'number' = 'number'): OptionType[] => [
  {
    label: '是',
    value: type === 'boolean' ? true : 1,
  },
  {
    label: '否',
    value: type === 'boolean' ? false : 0,
  },
];

/** 供应商报价单状态 */
export const QuoteStatusOption: OptionType[] = [
  {
    label: '草稿',
    value: 'DRAFT',
  },
  {
    label: '已发布',
    value: 'RELEASED',
  },
  {
    label: '已失效',
    value: 'INVALID',
  },
];

/** 资费状态 */
export const tariffOption: OptionType[] = [
  {
    label: '草稿',
    value: 0,
  },
  {
    label: '对账完成',
    value: 1,
  },
  {
    label: '对账确认',
    value: 2,
  },
  {
    label: '发票申请',
    value: 3,
  },
  {
    label: '发票申请成功',
    value: 4,
  },
  {
    label: '发票号回传',
    value: 5,
  },
  {
    label: '发票已收到',
    value: 6,
  },
  {
    label: '付款申请',
    value: 7,
  },
  {
    label: '付款申请同意',
    value: 8,
  },
  {
    label: '已核销',
    value: 9,
  },
  {
    label: '作废',
    value: 10,
  },
];

/** 对账单来源 */
export const confirmationOriginOption: OptionType[] = [
  {
    label: '系统生成',
    value: 0,
  },
  {
    label: '人工创建',
    value: 1,
  },
];

/** 对账单状态 */
export const confirmationStatusOption: OptionType[] = [
  {
    label: '草稿',
    value: 0,
  },
  {
    label: '确认',
    value: 1,
  },
  {
    label: '作废',
    value: 2,
  },
  {
    label: '发票号回传',
    value: 3,
  },
  {
    label: '发票已收到',
    value: 4,
  },
  {
    label: '已回退',
    value: 5,
  },
  {
    label: '已生成发票',
    value: 6,
  },
  {
    label: '已生成付款申请',
    value: 7,
  },
];

/** 发票状态 */
export const invoiceStatusOption: OptionType[] = [
  {
    label: '草稿',
    value: 0,
  },
  {
    label: '提交',
    value: 1,
  },
  {
    label: '作废',
    value: 2,
  },
  {
    label: '发票申请成功',
    value: 3,
  },
  {
    label: '已回退',
    value: 5,
  },
];

/** 付款申请状态 */
export const paymentStatusOption: OptionType[] = [
  {
    label: '草稿',
    value: 0,
  },
  {
    label: '提交',
    value: 1,
  },
  {
    label: '同意',
    value: 2,
  },
  {
    label: '核销',
    value: 3,
  },
  {
    label: '已作废',
    value: 4,
  },
  {
    label: '已回退',
    value: 5,
  },
];

/** 银行流水类型 收/付 */
export const StatementTypeOption: OptionType[] = [
  {
    label: '收款',
    value: 1,
  },
  {
    label: '付款',
    value: -1,
  },
];

/** 银行流水 结算类型 */
export const SettlementTypeOption: OptionType[] = [
  {
    label: '现金',
    value: 1,
  },
  {
    label: '银行',
    value: 2,
  },
];

/** 核销状态 */
export const WriteOffOption: OptionType[] = [
  {
    label: '已核销',
    value: 1,
  },
  {
    label: '未核销',
    value: 0,
  },
];

/** 税率下拉 */
export const taxRateOption: OptionType[] = [
  {
    label: '0%',
    value: 0,
  },
  {
    label: '1%',
    value: 1,
  },
  {
    label: '6%',
    value: 6,
  },
  {
    label: '9%',
    value: 9,
  },
];
/**
 * 状态-下拉
 */
export const statusOption: any = {
  true: 'Active',
  false: 'Inactive',
};

/**
 * 状态-下拉
 */
export const statusCnOption: OptionType[] = [
  {
    label: '取消',
    value: false,
  },
  {
    label: '正常',
    value: true,
  },
];

/**
 * 是否取消-下拉
 */
export const isCancalOption: OptionType[] = [
  {
    label: '已取消',
    value: true,
  },
  {
    label: '正常',
    value: false,
  },
];

/**
 * 导出模板-下拉
 */
export const exportTemplateOption: OptionType[] = [
  {
    label: '单订单',
    value: 'CfmFwOneDTO',
  },
  {
    label: '多订单',
    value: 'CfmFwMuchDTO',
  },
];

// export const assignType = [
//   {
//     label: Intl.formatMessage('option.随机'),
//     value: 1,
//   },
//   {
//     label: Intl.formatMessage('option.指定'),
//     value: 2,
//   },
// ];

// export const nodeFour: OptionType[] = [
//   { label: Intl.formatMessage('option.进场'), value: 3 },
//   { label: Intl.formatMessage('option.修理'), value: 4 },
//   { label: 'AV', value: 6 },
//   { label: Intl.formatMessage('option.出场'), value: 7 },
// ];

/**
 * 非物流类合同类型-下拉
 */
export const nlContractTypeOption: OptionType[] = [
  {
    label: '框架合同',
    value: 1,
  },
  {
    label: '单次合同',
    value: 2,
  },
];

/**
 * 非物流类状态-下拉
 */
export const nlStatusOption: OptionType[] = [
  {
    label: '草稿',
    value: 0,
  },
  {
    label: '生效',
    value: 1,
  },
  {
    label: '已验收',
    value: 3,
  },
  {
    label: '作废',
    value: 2,
  },
];

/**
 * 非物流类采购类型-下拉
 */
export const nlPurchaseTypeOption: OptionType[] = [
  {
    label: '实物采购',
    value: 1,
  },
  {
    label: '服务采购',
    value: 2,
  },
];

/**
 * 非物流类采购单生成方式-下拉
 */
export const nlCreateTypeOption: OptionType[] = [
  {
    label: '关联合同生成',
    value: 1,
  },
  {
    label: '手工创建',
    value: 2,
  },
];

/** 客商类型 */
export const partyTypeOption: OptionType[] = [
  {
    label: '供应商',
    value: 2,
  },
  {
    label: '客户',
    value: 1,
  },
  {
    label: '供应商/客户',
    value: 3,
  },
];
/**
 * 预收预付申请单状态-下拉
 */
export const prePayStatusOption: OptionType[] = [
  {
    label: '草稿',
    value: 0,
  },
  {
    label: '提交',
    value: 1,
  },
  {
    label: '同意',
    value: 2,
  },
  {
    label: '核销',
    value: 3,
  },
  {
    label: '部分冲抵',
    value: 4,
  },
  {
    label: '全部冲抵',
    value: 5,
  },
];

/**
 * 预付类型-下拉
 */
export const prePayTypeOption: OptionType[] = [
  {
    label: '预付款',
    value: 1,
  },
  {
    label: '押金',
    value: 2,
  },
];

/**
 * 预收类型-下拉
 */
export const preReceivablesTypeOption: OptionType[] = [
  {
    label: '预收款',
    value: 1,
  },
  {
    label: '押金',
    value: 2,
  },
];
