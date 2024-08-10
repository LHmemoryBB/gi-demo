import http from '@/utils/http';

/**select**/
export const ipt_select = data => http.get('/api'+data.url,data.params);
//上传多张图
export const up_images = () => { return'/api/upload/files'};
//上传单张图
export const up_image = () => { return'/api/upload/file'};
export const upload_img_single = data => http.post('/api/upload/singleImg', data)
export const up_singleImg = () => { return'/api/upload/singleImg'};
export const up_singlePdf = () => { return'/api/upload/singlePdf'};

//登录
export const getUserInfo = data => http.post('/api/login', data);
//登录
export const logout = data => http.post('/api/logout', data);
/*路由*/
export const getUserRoutes = data => http.post('/api/menus');

/*底部备案号*/
export const getCompanyInfo = data => http.post('/api/companyInfo/getRecordNumber', data);

/*首页*/
export const getHomeDetail = data => http.post('/api/index', data);

export const getCenter = data => http.post('/api/center', data);
export const getCenterLeft = data => http.post('/api/centerLeft', data);
export const getCenterLeftEchart = data => http.post('/api/centerLeftEchart', data);
export const getCenterRightAmount = data => http.post('/api/centerRightAmount', data);
export const getCenterRightProfit = data => http.post('/api/centerRightProfit', data);
export const getCenterRightList = data => http.post('/api/centerRightList', data);
export const getCenterBottomLeftEchart = data => http.post('/api/centerBottomLeftEchart', data);
export const getCenterBottomRightEchart = data => http.post('/api/centerBottomRightEchart', data);

export const setResetSysPwd = data=>http.post('/api/sysUser/resetSysPwd', data);

/*配置查看*/
export const getConfigDetail = data => http.post('/api/companyInfo/detail', data);
/*配置修改*/
export const setConfigUpdate = data => http.post('/api/companyInfo/update', data);

/*邀请配置查看*/
export const getInviteDetail = data => http.post('/api/inviteConfig/detail', data);
/*邀请配置修改*/
export const setInviteUpdate = data => http.post('/api/inviteConfig/update', data);

/*邮箱查看*/
export const getMail = data => http.post('/api/warnMailInfo/detail', data);
/*邮箱修改*/
export const setMailUpdate = data => http.post('/api/warnMailInfo/update', data);

/*轮播查看*/
export const getBannerDetail = data => http.post('/api/banner/detail', data);
/*轮播修改*/
export const setBannerUpdate = data => http.post('/api/banner/update', data);

/*用户列表*/
export const getUserList = data => http.post('/api/userInfo/query', data);
/*用户新增*/
export const setUserAdd = data => http.post('/api/userInfo/insert', data);
/*用户修改*/
export const setUserEdit = data => http.post('/api/userInfo/update', data);
/*用户重置密码*/
export const setResetPassword = data => http.post('/api/userInfo/resetPassword', data);
/*用户重置秘钥*/
export const setResetApiKey = data => http.post('/api/userInfo/resetApiKey', data);
/*用户启用*/
export const setUserEnabled = data => http.post('/api/userInfo/enabled', data);
/*用户导出*/
export const getUserExport = () => { return'/api/userInfo/export'};

export const getUserApplyList = data => http.post('/api/userTransactionApply/query', data);
export const setApplyApproved = data => http.post('/api/userTransactionApply/approved', data);

/*用户充值*/
export const setUserBalance = data => http.post('/api/userInfo/add_balance', data);
/*用户资料*/
export const getUserResource = data => http.post('/api/userInfo/resource_detail', data);
/*用户资料修改*/
export const setUserResource = data => http.post('/api/userInfo/resource_add', data);
/*用户价格自定义*/
export const getUserPrice = data => http.post('/api/userInfo/user_price_list', data);
/*用户价格自定义修改*/
export const setUserPrice = data => http.post('/api/userInfo/product_price_custom', data);
/*用户账单*/
export const setUserTransaction = data => http.post('/api/orderLog/query', data);
/*用户余额日志*/
export const setUserBalanceLog = data => http.post('/api/userBalanceLog/query', data);



/*影票处理下拉框*/
export const AfterSaleDealResult = data => http.post('/api/filmAfterSaleApply/dealResult', data);
/*商城用户下拉框*/
export const AfterSaleShopUser = data => http.post('/api/filmAfterSaleApply/shopUser', data);
/*售后状态下拉框*/
export const AfterSaleStatus = data => http.post('/api/filmAfterSaleApply/afterSaleStatus', data);
/*影票审核列表*/
export const AfterSalequery = data => http.post('/api/filmAfterSaleApply/query', data);
/*影票审核详情*/
export const AfterSaleDetail = data => http.post('/api/filmAfterSaleApply/detail', data);
/*影票审核操作*/
export const AfterSaleApproved = data => http.post('/api/filmAfterSaleApply/approved', data);

/*产品分类管理列表*/
export const getProductCategoryList = data => http.post('/api/productCategory/query', data);
/*产品分类管理新增*/
export const setProductCategoryAdd = data => http.post('/api/productCategory/insert', data);
/*产品分类管理修改*/
export const setProductCategoryEdit = data => http.post('/api/productCategory/update', data);
/*产品分类管理删除*/
export const setProductCategoryDel = data => http.post('/api/productCategory/del', data);

/*产品信息列表*/
export const getProductList = data => http.post('/api/product/query', data);
/*产品信息新增*/
export const setProductAdd = data => http.post('/api/product/insert', data);
/*产品信息详情*/
export const getProductDetail = data => http.post('/api/product/detail', data);
/*产品信息修改*/
export const setProductEdit = data => http.post('/api/product/update', data);
/*产品信息删除*/
export const setProductDel = data => http.post('/api/product/del', data);
/*产品信息启停*/
export const setProductEnabled = data => http.post('/api/product/enabled', data);
/*产品信息上下架按钮*/
export const setProductMarketd = data => http.post('/api/product/marketd', data);

/*回收文件查看*/
export const getRecoveryDetail = data => http.post('/api/recoveryFile/detail', data);
/*回收文件修改*/
export const setRecoveryUpdate = data => http.post('/api/recoveryFile/update', data);

/*卡类配置*/
export const getCardCategory = data => http.post('/api/cardCategory/query', data);
export const setCardCategoryAdd = data => http.post('/api/cardCategory/insert', data);
export const setCardCategoryEdit = data => http.post('/api/cardCategory/update', data);
export const setCardCategoryDel = data => http.post('/api/cardCategory/del', data);
/*卡种配置*/
export const getCardType= data => http.post('/api/cardType/query', data);
export const setCardTypeAdd = data => http.post('/api/cardType/insert', data);
export const setCardTypeEdit = data => http.post('/api/cardType/update', data);
export const setCardTypeDel = data => http.post('/api/cardType/del', data);
/*面值配置*/
export const getCardPar = data => http.post('/api/cardPar/query', data);
export const setCardParAdd = data => http.post('/api/cardPar/insert', data);
export const setCardParEdit = data => http.post('/api/cardPar/update', data);
export const setCardParDel = data => http.post('/api/cardPar/del', data);

/*黑名单列表*/
export const setBlackInfoList = data => http.post('/api/blackInfo/query', data);
/*黑名单新增*/
export const setBlackInfoAdd = data => http.post('/api/blackInfo/insert', data);
/*黑名单编辑*/
export const setBlackInfoEdit = data => http.post('/api/blackInfo/update', data);
/*黑名单删除*/
export const setBlackInfoDel = data => http.post('/api/blackInfo/del', data);

/*订单管理列表*/
export const setOrderInfoList = data => http.post('/api/orderInfo/query', data);
/*订单管理更改订单状态*/
export const setOrderInfoChangeStatus = data => http.post('/api/orderInfo/changeStatus', data);
/*订单日志*/
export const getOrderLog = data => http.post('/api/orderInfo/log', data);
/*订单管理拉黑*/
export const setOrderInfoToBlack = data => http.post('/api/orderInfo/toBlack', data);
/*订单手动回调*/
export const setOrderCallBack = data => http.post('/api/orderInfo/callback', data);
/*订单返销*/
export const setOrderBuyBack = data => http.post('/api/orderInfo/buyback', data);
/*订单管导出*/
export const getOrderInfoExport = () => { return'/api/orderInfo/export'};
/*流水查询*/
export const getOrderFlow = data => http.post('/api/orderInfo/queryFlow', data);

/*订单管理列表*/
export const setOrderInfoListHis = data => http.post('/api/orderInfo/queryHis', data);
/*订单管理更改订单状态*/
export const setOrderInfoChangeStatusHis = data => http.post('/api/orderInfo/changeStatusHis', data);
/*订单日志*/
export const getOrderLogHis = data => http.post('/api/orderInfo/logHis', data);
/*订单管理拉黑*/
export const setOrderInfoToBlackHis = data => http.post('/api/orderInfo/toBlackHis', data);
/*订单手动回调*/
export const setOrderCallBackHis = data => http.post('/api/orderInfo/callbackHis', data);
/*订单返销*/
export const setOrderBuyBackHis = data => http.post('/api/orderInfo/buybackHis', data);
/*订单管导出*/
export const getOrderInfoExportHis = () => { return'/api/orderInfo/exportHis'};
/*流水查询*/
export const getOrderFlowHis = data => http.post('/api/orderInfo/queryFlowHis', data);

/*接口列表*/
export const setInterfaceInfoList = data => http.post('/api/interfaceInfo/query', data);
/*接口新增*/
export const setInterfaceInfoAdd = data => http.post('/api/interfaceInfo/insert', data);
/*接口编辑*/
export const setInterfaceInfoEdit = data => http.post('/api/interfaceInfo/update', data);
/*接口删除*/
export const setInterfaceInfoDel = data => http.post('/api/interfaceInfo/del', data);
/*接口启停*/
export const setInterfaceEnabled = data => http.post('/api/interfaceInfo/enabled', data);
/*接口套餐列表*/
export const setInterfaceProductList = data => http.post('/api/interfaceProduct/query', data);
/*接口套餐新增*/
export const setInterfaceProductAdd = data => http.post('/api/interfaceProduct/insert', data);
/*接口套餐编辑*/
export const setInterfaceProductEdit = data => http.post('/api/interfaceProduct/update', data);
/*接口套餐删除*/
export const setInterfaceProductDel = data => http.post('/api/interfaceProduct/del', data);
/*接口套餐启停*/
export const setInterfaceProductEnabled = data => http.post('/api/interfaceProduct/enabled', data);

/*清除数据*/
export const setMaintenanceClear = data => http.post('/api/maintenance/clear', data);

/*日志列表*/
export const getActLogList = data => http.post('/api/actLog/query', data);

/*接口使用情况列表*/
export const getInterfaceAnalysis = data => http.post('/api/interfaceAnalysis/query', data);

/*字典项管理列表*/
export const getDictionaryList = data => http.post('/api/dictionary/query', data);
/*字典项管理新增*/
export const setDictionaryAdd = data => http.post('/api/dictionary/insert', data);
/*字典项管理修改*/
export const setDictionaryEdit = data => http.post('/api/dictionary/update', data);
/*字典项管理删除*/
export const setDictionaryDel = data => http.post('/api/dictionary/del', data);

/*关于我们查看*/
export const getAboutMeDetail = data => http.post('/api/aboutMe/detail', data);
/*关于我们修改*/
export const setAboutMeUpdate = data => http.post('/api/aboutMe/update', data);

/*任务活动*/
export const getChargeInfoDetail = data => http.post('/api/charge/detail', data);
export const setChargeUpdate = data => http.post('/api/charge/update', data);
/*详细配置*/
export const getChargeDetail= data => http.post('/api/chargeDetail/query', data);
export const setChargeDetailAdd = data => http.post('/api/chargeDetail/insert', data);
export const setChargeDetailDetail = data => http.post('/api/chargeDetail/detail', data);
export const setChargeDetailEdit = data => http.post('/api/chargeDetail/update', data);
export const setChargeDetailDel = data => http.post('/api/chargeDetail/del', data);


// 任务配置下拉框接口
export const getPrice = data => http.get('/api/chargeDetail/selectPrice', data);
export const getSelectPlatForm = data => http.get('/api/chargeDetail/selectPlatForm', data);
export const getSelectOperator = data => http.get('/api/chargeDetail/selectOperator', data);



/*话单订单信息--获取订单列表*/
export const orderChargeInfoList = data => http.post('/api/orderChargeInfo/query', data);
/*话单订单信息--获取订单详情*/
export const orderChargeInfoDetail = data => http.get('/api/orderChargeInfo/orderDetail', data);
export const orderChargeInfoDetailHis = data => http.get('/api/orderChargeInfo/orderDetailHis', data);
/*话单订单信息--导出订单*/
export const orderChargeInfoExport = data => http.post('/api/orderChargeInfo/export', data);

/*话单订单信息--获取订单列表*/
export const orderChargeInfoListHis = data => http.post('/api/orderChargeInfo/queryHis', data);
/*话单订单信息--订单待验单列表查询*/
export const waitValidOrderList = data => http.post('/api/orderChargeInfo/waitValidOrder', data);
/*话单订单信息--导出订单*/
export const orderChargeInfoExportHis = data => http.post('/api/orderChargeInfo/exportHis', data);
/*话单订单信息--手动验单，修改状态*/
export const changeOrderStatus = data => http.post('/api/orderChargeInfo/changeOrderStatus', data);
/*话单订单信息--返销*/
export const chargeBuyback = data => http.post('/api/orderChargeInfo/buyback', data);
/*话单订单信息--历史订单返销*/
export const chargeBuybackHis = data => http.post('/api/orderChargeInfo/buybackHis', data);
/*话单订单信息--验单详情页*/
export const checkOrderDetail = data => http.get('/api/orderChargeInfo/checkOrderDetail', data);


/*--  系统权限管理  --*/
/*获取菜单管理列表*/
export const roleMenuList = data => http.post('/api/menu/query', data);
/*获取菜单按钮树*/
export const roleMenuTree = data => http.post('/api/menuTree', data);
/*新增菜单*/
export const roleMenuInsert = data => http.post('/api/menu/insert', data);
/*修改菜单*/
export const roleMenuEdit = data => http.post('/api/menu/edit', data);
/*删除菜单*/
export const roleMenuDel = data => http.post('/api/menu/del', data);
/*菜单下新增按钮*/
export const roleMenuInsertButton = data => http.post('/api/menu/insertButton', data);
/*菜单下修改按钮*/
export const roleMenuEditButton = data => http.post('/api/menu/editButton', data);
/*菜单下删除按钮*/
export const roleMenuDelButton = data => http.post('/api/menu/delButton', data);


/*角色管理列表*/
export const roleList = data => http.post('/api/role/query', data);
/*新增角色*/
export const roleInsert = data => http.post('/api/role/insert', data);
/*角色授权回显*/
export const roleEmpowerList = data => http.get('/api/role/empower_list', data);
/*删除角色*/
export const roleDelete = data => http.post('/api/role/del', data);
/*角色菜单授权*/
export const roleEmpowerMenu = data => http.post('/api/role/empower_menu', data);
/*角色菜单按钮授权*/
export const roleEmpowerMenuBtn = data => http.post('/api/role/empower_menu_button', data);
/*授权登录按钮*/
export const rolecanLogin = data => http.post('/api/role/canLogin', data);
