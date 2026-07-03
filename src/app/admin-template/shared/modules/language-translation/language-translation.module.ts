import { NgModule } from '@angular/core';
import { TranslatePipe, TranslateDirective, provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  imports: [TranslatePipe, TranslateDirective],
  exports: [TranslatePipe, TranslateDirective],
  providers: [
    provideTranslateService({
      lang: 'en',
      loader: provideTranslateHttpLoader()
    })
  ]
})
export class LanguageTranslationModule {
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
  }
}
