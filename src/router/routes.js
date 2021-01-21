import multiguard from "vue-router-multiguard";
import store from "./../store";
import moment from "moment";
//import { Notify } from "quasar";

// cek auth apakah sudah login atau belum
const auth = function(to, from, next) {
  let isLoggedIn = store().getters["Auth/isLoggedIn"];
  let isUnAuthorized = store().getters["Auth/isUnAuthorized"];
  if (isLoggedIn && !isUnAuthorized) {
      next();
  } else {
      next("/login");
  }
};

// kalo belum bayar atau masa aktif berakhir cma bisa lihat halaman trial
const isTrial = (from, to, next) => {
  store().dispatch('Auth/getAuth').then(res => {
      let user_activated_at = store().getters['Auth/auth'].user_activated_at
      const monthDifference = moment(new Date()).diff(
          new Date(user_activated_at),
          "months",
          true
      );
      // console.log(user_activated_at, monthDifference < 6, store().getters['Auth/auth'], res.data)
      if (user_activated_at != null && monthDifference < 6) from.name == 'trial' ? next('/') : next()
      else from.name != 'trial' ? next('/trial') : next()
  })
};

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: multiguard([auth, isTrial]),
    children: [
          { path: '', 
            beforeEnter: multiguard([auth]),
            component: () => import('pages/HomePage.vue') 
          },
          {
            path: "/editcoverdesign",
            name: "editcoverdesign",
            beforeEnter: multiguard([auth]),
            component: () => import("pages/Module/EditCoverDesign.vue"),
            props:true,
          },
          {
            path: "/edit/editcoverdesign",
            name: "editcoverdesignedit",
            beforeEnter: multiguard([auth]),
            component: () => import("pages/ModuleForEdit/EditCoverDesign.vue"),
            props:true,
          },
          {
            path: "/create",
            name: "create",
            beforeEnter: multiguard([auth]),
            component: () => import("pages/CreatePage.vue")
          },
          {
            path: "/edit/:moduleId",
            name: "edit",
            beforeEnter: multiguard([auth]),
            component: () => import("pages/EditPage.vue"),
            props:true,
          },
          {
            path: "/modulecontent/edit",
            name: "modulecontentedit",
            beforeEnter: multiguard([auth]),
            component: () => import("pages/Module/EditContent.vue"),
            props:true

          },
          {
            path: "/modulecontentforedit/edit",
            name: "modulecontenteditforedit",
            beforeEnter: multiguard([auth]),
            component: () => import("pages/ModuleForEdit/EditContent.vue"),
            props:true

          },
          {
            path: "/category/newest",
            name: "newest",
            beforeEnter: multiguard([auth]),
            component: () => import("pages/NewestModulPage.vue")
          },
          {
            path: "/category/tk",
            name: "tk",
            beforeEnter: multiguard([auth]),
            component: () =>
                import ("pages/TKPage.vue")   
          },
          {
            path: "/category/sd",
            beforeEnter: multiguard([auth]),
            name: "sd",
            component: () =>
                import ("pages/SDPage.vue")   
          },
          {
            path: "/category/smp",
            beforeEnter: multiguard([auth]),
            name: "smp",
            component: () =>
                import ("pages/SMPPage.vue")   
          },
          {
            path: "/category/sma",
            name: "sma",
            beforeEnter: multiguard([auth]),
            component: () => import("pages/SMAPage.vue")
          },
          {
            path: "/category/smk",
            name: "smk",
            beforeEnter: multiguard([auth]),
            component: () =>
                import ("pages/SMKPage.vue")   
          },
          {
            path: "/category/slb",
            name: "slb",
            beforeEnter: multiguard([auth]),
            component: () =>
                import ("pages/SLBPage.vue")   
          },    
          {
            path: "/modul/:moduleId",
            name: "modul",
            beforeEnter: multiguard([auth]),
            component: () => import("pages/ModulPage.vue"),
            props:true

          },
          {
            path: "/profil",
            name: "profil",
            beforeEnter: multiguard([auth]),
            component: () => import("pages/ProfilPage.vue")
          },
          {
            path: "/modulecomments/:moduleId",
            name: "comment",
            beforeEnter: multiguard([auth]),
            component: () => import("pages/CommentModulPage.vue"),
            props:true
          },
          {
            path: "/modulereview",
            name: "review",
            beforeEnter: multiguard([auth]),
            component: () => import("pages/ReviewModulPage.vue")
          },
          {
            path: "/create/cover",
            beforeEnter: multiguard([auth]),
            name: "cover",
            component: () =>
                import ("pages/Cover/CoverPage.vue")
          },
          {
            path: "/editcover",
            name: "editcover",
            beforeEnter: multiguard([auth]),
            component: () =>
                import ("pages/Cover/CoverEditPage.vue")
          },
          // {
          //   path: "/create/cover/new",
          //   name: "newcover",
          //   component: () =>
          //       import ("pages/CreateCoverModul.vue")   
          // },
          {
            path: "/announcement",
            
            beforeEnter: multiguard([auth]),
            component: () =>
                import ("pages/AnnouncementPage.vue")
        }     
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
    path: "/trial",
    name: "trial",
    beforeEnter: multiguard([isTrial]),
    component: () =>
        import ("pages/TrialPage.vue")
  },
  {
    path: "/payment",
    name: "payment",
    component: () =>
        import ("pages/PaymentPage.vue")
  },
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
