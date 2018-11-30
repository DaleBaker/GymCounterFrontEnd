import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatImports } from './MatImports';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GymDisplayComponent } from './Components/gym-display/gym-display.component';
import { ContactComponent } from './Components/contact/contact.component';
import { SingleCameraViewComponent } from './Components/single-camera-view/single-camera-view.component';
import { MultiCameraViewComponent } from './Components/multi-camera-view/multi-camera-view.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GymDisplayComponent,
    ContactComponent,
    SingleCameraViewComponent,
    MultiCameraViewComponent
  ],
  imports: [
    BrowserModule,
    MatImports,
    HttpClientModule,
    BrowserAnimationsModule, FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
