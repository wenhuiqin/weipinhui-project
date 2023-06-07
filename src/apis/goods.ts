import instance from "@/utils/http"

// 获取热门搜索
export const hotWords = () => instance.get("pro/hotword")

// 获取分类列表
export const getCategorylist = () => instance.get("pro/categorylist") 