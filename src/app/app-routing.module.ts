import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module').then((m) => m.ChartsModule),
      data: { state: 'charts' },
    },
    { path: 'about', loadChildren: () => import('./about/about.module').then((m) => m.AboutModule) },
    { path: 'groups', loadChildren: () => import('./groups/groups.module').then((m) => m.GroupsModule) },
    { path: 'explore', loadChildren: () => import('./explore/explore.module').then((m) => m.ExploreModule) },
    {
      path: 'news',
      loadChildren: () => import('./news/news.module').then((m) => m.NewsModule),
      data: { state: 'news' },
    },
  ]),
  // { path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule) },
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
