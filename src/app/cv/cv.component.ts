import { NgFor } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { AfterViewInit, Component, OnInit } from '@angular/core'
import { LanguageService } from '../language.service'
import { transition } from '@angular/animations'

export type Experience = {
    date: string
    position: string
    name: string
    description: string
}
export type Education = {
    date: string
    university: string
    degree: string
    description: string
}
export type Translation = {
    educationTitle: string
    experienceTitle: string
    degree: string
    education: Education
    experience: Experience[]
}

@Component({
    selector: 'app-cv',
    standalone: true,
    imports: [NgFor],
    templateUrl: './cv.component.html',
    styleUrl: './cv.component.css',
})
export class CvComponent {
    cv: Translation | any
    constructor(private lang: LanguageService) {
        lang.getTranslation<Translation>('cv').subscribe({
            next: (result: Translation) => (this.cv = result),
        })
    }
}
