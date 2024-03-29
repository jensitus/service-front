import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {}

  transform(value: any, args?: any): any {

    value = this.linkifyURL(value);

    return this.domSanitizer.bypassSecurityTrustHtml(this.stylize(value));

  }

  private stylize(text: string): string {

    let stylizedText = '';

    if (text && text.length > 0) {
      // @ annotations
      for (const t of text.split(' ')) {
        if (t.startsWith('@') && t.length > 1) {
          stylizedText += `<a style="color: black;" href="#${t.substring(1)}">${t}</a> `;
        } else {
          stylizedText += t + ' ';
        }
      }
      return stylizedText;
    } else {
      return text;
    }

  }

  private linkifyURL(plainText): string {

    let replacedText;

    let replacePattern1;

    let replacePattern2;

    let replacePattern3;

    // URLs starting with http://, https://, or ftp://

    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;

    replacedText = plainText.replace(replacePattern1, '<a style="text-decoration:none" href="$1" target="_blank">$1</a>');

    // URLs starting with "www." (without // before it, or it'd re-link the ones done above).

    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

    replacedText = replacedText.replace(replacePattern2, '$1<a style="text-decoration:none" href="http://$2" target="_blank">$2</a>');

    // Change email addresses to mailto:: links.

    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;

    replacedText = replacedText.replace(replacePattern3, '<a style="text-decoration:none" href="mailto:$1">$1</a>');

    return replacedText;

  }

}
