import { NgForOf } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { LanguageService } from '../language.service'

export type About = {
    title: string
    about: string
    skillsTitle: string
    skills: string[]
}

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [NgForOf],
    templateUrl: './about.component.html',
    styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {
    about: About | undefined
    constructor(private lang: LanguageService) {
        this.lang.getTranslation<About>('about').subscribe({
            next: (value: About) => (this.about = value),
        })
    }

    ngOnInit(): void {}
}
