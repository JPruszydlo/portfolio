import { Component } from '@angular/core'
import { LanguageService } from '../language.service'
import { __values } from 'tslib'

export type Translation = {
    textme: string
    namePh: string
    phonePh: string
    mailPh: string
    textPh: string
    button: string
    contactData: string
    phone: string
    localisation: string
}

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css',
})
export class ContactComponent {
    contact: Translation | undefined
    constructor(private lang: LanguageService) {
        lang.getTranslation<Translation>('contact').subscribe({
            next: (value: Translation) => (this.contact = value),
        })
    }
}
