import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BackendService } from './backend.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ListingState } from 'src/app/listing/store';
import { DetailsState } from 'src/app/details/store/details.state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxsModule.forRoot([
      ListingState,
      DetailsState
    ], { developmentMode: true }),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule {}
