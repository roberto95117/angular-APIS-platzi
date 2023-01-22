import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { CustomPreloadService } from './services/custom-preload.service';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { AdminGuard } from './guards/admin.guard';
const routes: Routes = [
  {
    path : '',
    loadChildren : () => import('./website/website.module').then(m => m.WebsiteModule),
    data : {
      preload : true
    }
  },
  {
    path : 'cms',
    canActivate: [AdminGuard],
    loadChildren : () => import('./cms/cms.module').then(m => m.CmsModule)
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //preloadingStrategy : CustomPreloadService  custom load
    preloadingStrategy : QuicklinkStrategy //preload by routerlinks
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
