import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
  { path: '', loadChildren: () => import('./listing/listing.module').then(m => m.ListingModule) },
  { path: ':id', loadChildren: () => import('./details/details.module').then(m => m.DetailsModule) }
] 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}