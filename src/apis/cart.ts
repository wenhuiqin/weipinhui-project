import instance from "@/utils/http";

// 获取购物车数据
export const getCart = (id: string) => instance.post("cart/list", id)

// 添加购物车数据
export const addGoods = (goodsInfo: {}) => instance.post("cart/add", goodsInfo)

// 删除单条购物车数据
export const deleteGoods = (cartid: string) => instance.post("cart/remove", cartid)

// 修改一条状态
export const changeSelectone = (cartid: string, flag: boolean) => instance.post('cart/selectone', { cartid, flag })