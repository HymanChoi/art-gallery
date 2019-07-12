import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

// 路由懒加载
function loadView(view) {
	return () => import(`@/views/${view}.vue`)
}

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "home",
			component: loadView("Home")
		},
		{
			path: "/ArtistsList",
			name: "ArtistsList",
			component: loadView("ArtistsList")
		},
		{
			path: "/ArtistHome/:id",
			name: "ArtistHome",
			component: loadView("ArtistHome")
		},
		{
			path: "/ArtworksList",
			name: "ArtworksList",
			component: loadView("ArtworksList")
		},
		{
			path: "/ArtworkHome/:id",
			name: "ArtworkHome",
			component: loadView("ArtworkHome")
		},
		{
			path: "/RankingLists",
			name: "RankingLists",
			component: loadView("RankingLists")
		},
		{
			path: "/Upload",
			name: "Upload",
			component: loadView("Upload")
		},
		{
			path: "/UserHome",
			name: "UserHome",
			component: loadView("UserHome")
		},
		{
			path: "/ManagerHome",
			name: "ManagerHome",
			component: loadView("ManagerHome")
		},
		{
			path: "/Blank",
			name: "Blank",
			component: loadView("Blank")
		}
	]
})
