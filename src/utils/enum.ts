/** 基础数据 */
export enum BaseData {
  /** 国家 */
  country = 'country',
  /** 省 */
  provice = 'provice',
  /** 城市 */
  city = 'city',
  /** 客商名称 */
  partyName = 'partyName',
  /** 地址 */
  address = 'address',
  /** 海港 */
  seaPort = 'seaPort',
  /** 海港-下拉label为英文 */
  seaPortEn = 'seaPortEn',
  /** 关口 */
  gateway = 'gateway',
  /** 币种 */
  currency = 'currency',
  /** 箱型 */
  boxSize = 'boxSize',
  /** 销售(type:1)|客服(type:2)|操作(type:3)|财务(type:4) */
  customerServer = 'customerServer',
  /** 客商下联系人 */
  partyContact = 'partyContact',
  /** 物流服务类型 */
  confServiceConfig = 'confServiceConfig',
  /** 物流工作单类型 */
  confJobConfig = 'confJobConfig',
  /** 包装类型 */
  packageType = 'packageType',
  /** 用户 */
  userList = 'userList',
  /** 资费类型 */
  chargeType = 'chargeType',
  /** 节点 */
  baseNode = 'baseNode',
  /** 部门 */
  departMent = 'departMent',
  /** 留言板 @userList */
  chatUserList = 'chatUserList',
  /** 审核人 */
  auditor = 'auditor',
  /** 合同 */
  contract = 'contract',
  /** 标准货物 */
  standardCargo = 'standardCargo',
  /** 关系转换中 - 外部系统 */
  exchangeSys = 'exchangeSys',
  /** 关系转换中 - 国家基础数据 */
  exchangeCountry = 'exchangeCountry',
  /** 关系转换中 -港口基础数据 */
  exchangePort = 'exchangePort',
  /** 关系转换中 -承运人基础数据 */
  exchangeCarrier = 'exchangeCarrier',
  /** 关系转换中 -中集内部公司基础数据 */
  exchangeCimcBranch = 'exchangeCimcBranch',
  /** 关系转换中 -航空公司基础数据 */
  exchangeAirLine = 'exchangeAirLine',
  /** 关系转换中 -航空港基础数据 */
  exchangeAirPort = 'exchangeAirPort',
  /** 关系转换中 -业务类型数据 */
  exchangeCimcProd = 'exchangeCimcProd',
  /** 关系转换中 -箱型数量数据 */
  exchangeCntrType = 'exchangeCntrType',
  /** 关系转换中 -字典数据 */
  exchangeDict = 'exchangeDict',
  /** 关系转换中 -包装类型数据 */
  exchangePackage = 'exchangePackage',
  /** 非物流类-合同 */
  nlContract = 'nlContract',
  /** 线路节点 */
  bizLineNode = 'bizLineNode',
  /** 客商下银行账户 */
  partyBankAccount = 'partyBankAccount',
}

export enum DictData {
  /** 地址类型 */
  addressType = 'point_type',
  /** 箱子类型 */
  containerType = 'container_type',
  /** 贸易条款 */
  tradeTerm = 'trade_term',
  /** 客商角色 */
  partyRole = 'party_role',
  /** 信用类型 */
  creditType = 'credit_type',
  /** 联系人类型 */
  contactType = 'contact_type',
  /** 职务 */
  jobTitle = 'job_title',
  /** 合同类型 */
  contractType = 'contract_type',
  /** 业务类型 */
  contractBizType = 'contract_biz_type',
  /** 附件类型 */
  docType = 'doc_type',
  /** 货物类型 */
  cargoType = 'cargo_type',
  /** 结算方式 */
  settlementMethod = 'settlement_method',
  /** 委托类型 */
  principalType = 'principal_type',
  /** 工作单类型 */
  woType = 'wo_type',
  /** 报价备注类型 */
  quoRemarkType = 'quo_remark_type',
  /** 订单状态 */
  mmtOrdStatus = 'mmt_ord_status',
  /** 资费类型 */
  chargeGroup = 'charge_group',
  /** 价格单位 */
  rateUnit = 'rate_unit',
  /** 集装箱来源 */
  containerSrc = 'container_src',
  /** 运输条款 */
  shippingTerm = 'shipping_term',
  /** 装箱 */
  loadingMode = 'loading_mode',
  /** 收款，付款等银行账号用途类型 */
  ccType = 'acc_type',
  /** 报关类型 */
  customs_type = 'customs_type',
  /** 运输方式 */
  transportType = 'transport_type',
  /** 发票类型 */
  invType = 'inv_type',
  /** 发票税类型 */
  taxInvType = 'tax_inv_type',
  /** 业务集装箱动态类型，进场，AV，出场,退队行为等 */
  eqBizType = 'eq_biz_type',
  /** 业务入队类型新购，二手购入等 */
  eq_onhire_type = 'eq_onhire_type',
  /** 业务退队类型，退还箱东，损毁出售等 */
  eq_offhire_type = 'eq_offhire_type',
  /** 业务发票类型，Invoice, DN */
  eq_inv_type = 'eq_inv_type',
  /** 业务收款方式, 租金 */
  q_chg_code = 'q_chg_code',
  /** 业务款项收支类型， 收入，支出 */
  eq_rc_flag = 'eq_rc_flag',
  /** 业务收款时间单位， Days */
  eq_chg_unit = 'eq_chg_unit',
  /** 业务集装箱状态，已删除，在队... */
  eq_eq_status = 'eq_eq_status',
  /** 业务出租类型，长租，短租... */
  eq_rental_type = 'eq_rental_type',
  /** 外部系统(接口中心对接) */
  external_system = 'external_system',
}

/** 时间格式 */
export enum TimeFormateType {
  YMD = 'YYYY-MM-DD',
  YMDHm = 'YYYY-MM-DD HH:mm',
  YMDHms = 'YYYY-MM-DD HH:mm:ss',
}

/** party 角色 */
export enum PartyRole {
  /** 委托单位 */
  customer = '15',
  /** 报关行 */
  baogaun = '28',
  /** 内陆船公司 */
  chuangongsi1 = '24',
  /** 国际船公司 */
  chuangongsi2 = '23',
  /** 结算单位-客户 */
  settCus = '32',
  /** 目的港操作代理 */
  hdlAgt = '31',
  /** 海外代理 */
  ovsAgt = '30',
  /** 本地代理 */
  lclAgt = '29',
  /** 铁路公司 */
  rl = '27',
  /** 拖车公司 */
  tc = '26',
  /** 航空公司 */
  al = '25',
  /** 内陆水运供应商 */
  dWater = '22',
  /** 铁运供应商 */
  rail = '21',
  /** 仓储供应商 */
  whs = '20',
  /** 空运供应商 */
  air = '19',
  /** 清关供应商 */
  cAgt = '18',
  /** 海运供应商 */
  shl = '17',
  /** 公路供应商 */
  trck = '16',
  /** 结算单位-供应商 */
  settSup = '33',
  /** 箱东 */
  eq_owner = '195',
  /** 堆场 */
  depot = '196',
  /** 出租人 */
  lessor = '197',
  /** 承租人 */
  lessee = '198',
}

/** 工作单接口查询类型 */
export enum QueryWoJobType {
  /** 海运进口 */
  si = 'si',
  /** 公路 */
  trk = 'trk',
  /** 报关 */
  cc = 'cc',
}

/** 新建对账单的类型 */
export enum ConfirmationType {
  /** 应收对账 */
  receivble = '1',
  /** 应付对账 */
  payable = '-1',
}

/** 对账单状态 */
export enum ConfirmationStatus {
  /** 草稿 */
  caogao = '0',
  /** 确认 */
  queren = '1',
  /** 作废 */
  zuofei = '2',
  /** 发票号回传 */
  fapiaohuichuan = '3',
  /** 发票已收到 */
  fapiaoyishoudao = '4',
  /** 已回退 */
  yihuitui = '5',
  /** 已生成发票 */
  fapiaowancheng = '6',
  /** 已生成付款申请 */
  fukuanwancheng = '7',
}

/** 发票状态 */
export enum InvoiceStatus {
  /** 草稿 */
  caogao = '0',
  /** 提交 */
  tijiao = '1',
  /** 作废 */
  zuofei = '2',
  /** 发票申请成功 */
  success = '3',
  /** 已回退 */
  yihuitui = '5',
}

/** 付款申请状态 */
export enum PaymentStatus {
  /** 草稿 */
  caogao = '0',
  /** 提交 */
  tijiao = '1',
  /** 同意 */
  tongyi = '2',
  /** 核销 */
  hexiao = '3',
  /** 已作废 */
  yizuofei = '4',
  /** 已回退 */
  yihuitui = '5',
}

/** 系统角色 */
export enum SysRole {
  /**
   * 系统角色 - 管理员
   */
  SYS_ADMIN_ROLE = 'ADMIN',
  /**
   * 系统角色 - 销售
   */
  SYS_SALES_ROLE = 'SALES',
  /**
   * 系统角色 - 客服
   */
  SYS_CUSSR_ROLE = 'CUSSR',
  /**
   * 系统角色 - 操作
   */
  SYS_OPERA_ROLE = 'OPERA',
  /**
   * 系统角色 - 财务
   */
  SYS_TREAS_ROLE = 'TREAS',
  /**
   * 系统角色 - 起运港操作
   */
  ORDOPER = 'ORDOPER',
  /**
   * 网服 - 管理员
   */
  WEB_SERVER_ADMIN = 'ADMIN6',
}

/** 导出模板 */
export enum ExportTemplate {
  /** 单订单 */
  ONE = 'CfmFwOneDTO',
  /** 多订单 */
  MUCH = 'CfmFwMuchDTO',
}

/** 设备状态 */
export enum EqStatus {
  /** 入队 */
  OnHire = 1,
  /** 出场 */
  OffHire = 2,
}

/** 核销状态 */
export enum WriteOffStatus {
  /** 入队 */
  unfinished = 0,
  /** 出场 */
  finished = 1,
}

export enum QuoteStatusEnum {
  /** 提交 */
  SUBMIT = 'UNAUD',
  /** 草稿 */
  DRAFT = 'DRAFT',
  /** 发布 */
  RELEASE = 'RELEASED',
  /** 失效 */
  INVALID = 'INVALID',
}
