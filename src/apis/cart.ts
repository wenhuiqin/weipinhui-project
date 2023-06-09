import instance from "@/utils/http"

export const getCart = (id: string) => instance.post("cart/list", id)

export const addGoods = (goodsInfo: {}) => instance.post("cart/add", goodsInfo)