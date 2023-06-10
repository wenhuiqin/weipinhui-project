import instance from "@/utils/http";

// 获取热门搜索
export const hotWords = () => instance.get("pro/hotword")

// 获取分类列表
export const getCategorylist = () => instance.get("pro/categorylist")

// 获取分类下的品牌列表
export const getBrandList = (category: string) => instance.get("pro/categorybrandlist", { params: { category } })

// 获取秒杀列表
export const getKillList = (num: number) => instance.get("pro/seckilllist", { params: { count: 1, limitNum: num } })

// 获取推荐列表
export const getRecommendList = (num: number) => instance.get("pro/recommendlist", { params: { count: 1, limitNum: num } })

// 获取搜索列表
export const getSearchList = (count: number, keywords: string) => instance.get("pro/search", { params: { count: count, limitNum: 10, keyword: keywords } })

// 获取产品详情
export const getDetailList = (id: string) => instance.get(`pro/detail/${id}`)

// 获取某分类下某品牌的产品列表
export const getGoodsList = (category: string, brand: string) => instance.get("pro/categorybrandprolist", { params: { category, brand } })