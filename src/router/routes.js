
const routes = [
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
          { path: '/', 
            component: () => import('pages/HomePage.vue') 
          },
          {
            path: "/create",
            name: "create",
            component: () => import("pages/CreatePage.vue")
          },
          {
            path: "/category/newest",
            name: "newest",
            component: () => import("pages/NewestModulPage.vue")
          },
          {
            path: "/category/tk",
            name: "tk",
            component: () =>
                import ("pages/TKPage.vue")   
          },
          {
            path: "/category/sd",
            name: "sd",
            component: () =>
                import ("pages/SDPage.vue")   
          },
          {
            path: "/category/smp",
            name: "smp",
            component: () =>
                import ("pages/SMPPage.vue")   
          },
          {
            path: "/category/sma",
            name: "sma",
            component: () => import("pages/SMAPage.vue")
          },
          {
            path: "/category/smk",
            name: "smk",
            component: () =>
                import ("pages/SMKPage.vue")   
          },
          {
            path: "/category/slb",
            name: "slb",
            component: () =>
                import ("pages/SLBPage.vue")   
          },    
          {
            path: "/modul",
            name: "modul",
            component: () => import("pages/ModulPage.vue")
          },
          {
            path: "/profil",
            name: "profil",
            component: () => import("pages/ProfilPage.vue")
          },
          {
            path: "/modul/comment",
            name: "comment",
            component: () => import("pages/CommentModulPage.vue")
          },
          {
            path: "/modul/review",
            name: "review",
            component: () => import("pages/ReviewModulPage.vue")
          },
          {
            path: "/create/cover",
            name: "cover",
            component: () =>
                import ("pages/Cover/CoverPage.vue")
          },
          {
            path: "/create/cover/new",
            name: "newcover",
            component: () =>
                import ("pages/CreateCoverModul.vue")   
          },            
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () =>
        import ("layouts/LoginLayout.vue")
  },
  {
    path: "/test",
    name: "test",
    component: () =>
        import ("pages/test.vue")
  },
  
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
