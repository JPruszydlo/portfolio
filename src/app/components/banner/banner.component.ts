import { Component } from '@angular/core'
import { TranslocoModule, TranslocoPipe } from '@jsverse/transloco'
import { LanguageService } from '../../language.service'

@Component({
    selector: 'app-banner',
    standalone: true,
    imports: [TranslocoModule],
    templateUrl: './banner.component.html',
    styleUrl: './banner.component.css',
})
export class BannerComponent {
    translations: { [key: string]: string } = {}

    constructor(private lngService: LanguageService) {
        lngService.getTranslation<{ [key: string]: string }>('banner').subscribe({
            next: (result: { [key: string]: string }) => {
                this.translations = result
            },
        })
    }
}
