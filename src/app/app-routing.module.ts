import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/providers/auth-guard.service';

const routes: Routes = [
 /* {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },*/


  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then( m => m.CustomersPageModule),

  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'profil/:id',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule),
  },
  {
    path: 'product/:id',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule),
  },
  {
    path: 'return',
    loadChildren: () => import('./return/return.module').then( m => m.ReturnPageModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then( m => m.ErrorPageModule)
  },
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then( m => m.PostsPageModule)
  },
  {
    path: 'post/:id',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'public-posts',
    loadChildren: () => import('./public-posts/public-posts.module').then( m => m.PublicPostsPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./services/services.module').then( m => m.ServicesPageModule)
  },
  {
    path: 'service/:id',
    loadChildren: () => import('./service/service.module').then( m => m.ServicePageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'user-detail/:id',
    loadChildren: () => import('./user-detail/user-detail.module').then( m => m.UserDetailPageModule)
  },
  {
    path: 'locations',
    loadChildren: () => import('./locations/locations.module').then( m => m.LocationsPageModule)
  },
  {
    path: 'location/:id',
    loadChildren: () => import('./location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'export-users',
    loadChildren: () => import('./export-users/export-users.module').then( m => m.ExportUsersPageModule)
  },
  {
    path: 'export-notes',
    loadChildren: () => import('./export-notes/export-notes.module').then( m => m.ExportNotesPageModule)
  },
  {
    path: 'file-new',
    loadChildren: () => import('./file-new/file-new.module').then( m => m.FileNewPageModule)
  },
  {
    path: 'file-detail/:id',
    loadChildren: () => import('./file-detail/file-detail.module').then( m => m.FileDetailPageModule)
  },
  {
    path: 'customers-pro',
    loadChildren: () => import('./customers-pro/customers-pro.module').then( m => m.CustomersProPageModule)
  },
  {
    path: 'category-detail/:id',
    loadChildren: () => import('./category-detail/category-detail.module').then( m => m.CategoryDetailPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
