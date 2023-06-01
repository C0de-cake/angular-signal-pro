import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {BrowserModule} from "@angular/platform-browser";
import {provideHttpClient} from "@angular/common/http";
import {routes} from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(BrowserModule), provideHttpClient(), provideRouter(routes)]
};
