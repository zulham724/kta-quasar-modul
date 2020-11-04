import multiguard from "vue-router-multiguard";
import store from "./../store";
//import moment from "moment";
//import { Notify } from "quasar";

// cek auth apakah sudah login atau belum
const auth = function(to, from, next) {
  let isLoggedIn = store().getters["Auth/isLoggedIn"];
  if (isLoggedIn) {
      next();
  } else {
      next("/login");
  }
};

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: multiguard([auth]),
    children: [
          { path: '', 
            component: () => import('pages/HomePage.vue') 
          },
          {
            path: "/editcoverdesign",
            name: "editcoverdesign",
            component: () => import("pages/Module/EditCoverDesign.vue"),
            props:true,
          },
          {
            path: "/edit/editcoverdesign",
            name: "editcoverdesignedit",
            component: () => import("pages/ModuleForEdit/EditCoverDesign.vue"),
            props:true,
          },
          {
            path: "/create",
            name: "create",
            component: () => import("pages/CreatePage.vue")
          },
          {
            path: "/edit/:moduleId",
            name: "edit",
            component: () => import("pages/EditPage.vue"),
            props:true,
          },
          {
            path: "/modulecontent/edit",
            name: "modulecontentedit",
            component: () => import("pages/Module/EditContent.vue"),
            props:true

          },
          {
            path: "/modulecontentforedit/edit",
            name: "modulecontenteditforedit",
            component: () => import("pages/ModuleForEdit/EditContent.vue"),
            props:true

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
            path: "/modul/:moduleId",
            name: "modul",
            component: () => import("pages/ModulPage.vue"),
            props:true

          },
          {
            path: "/profil",
            name: "profil",
            component: () => import("pages/ProfilPage.vue")
          },
          {
            path: "/modulecomments/:moduleId",
            name: "comment",
            component: () => import("pages/CommentModulPage.vue"),
            props:true
          },
          {
            path: "/modulereview",
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
            path: "/editcover",
            name: "editcover",
            component: () =>
                import ("pages/Cover/CoverEditPage.vue")
          },
          {
            path: "/create/cover/new",
            name: "newcover",
            component: () =>
                import ("pages/CreateCoverModul.vue")   
          },            
    ]
  },
  
  // {
  //   path: "/user/search",
  //   beforeEnter: multiguard([auth, actived, check_teacher_status]),
  //   name: "usersearch",
  //   component: () =>
  //       import ("pages/module/SearchPage.vue")
  // },
  {
    path: "/module/search",
    name: "modulesearch",
    component: () =>
        import ("pages/SearchPage.vue")
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
  },
]

export default routes
