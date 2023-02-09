import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LocalMaterialModule } from "./shared/local-material.module";
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, LocalMaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
