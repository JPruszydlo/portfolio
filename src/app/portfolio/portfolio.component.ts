import { CommonModule, NgFor } from '@angular/common'
import { Component, TransferState } from '@angular/core'
import { CarouselComponent } from '../components/carousel/carousel.component'
import { AccordionModule } from 'primeng/accordion'
import { BrowserModule } from '@angular/platform-browser'
import { LanguageService } from '../language.service'

export type PortfolioItem = {
    name: string
    link: string
    images: string[]
    description: string
}
export type Translation = {
    title: string
    linkName: string
    items: PortfolioItem[]
}

@Component({
    selector: 'app-portfolio',
    standalone: true,
    imports: [CommonModule, CarouselComponent, AccordionModule],
    templateUrl: './portfolio.component.html',
    styleUrl: './portfolio.component.css',
})
export class PortfolioComponent {
    portfolio: Translation | undefined

    constructor(private lngService: LanguageService) {
        lngService.getTranslation<Translation>('portfolio').subscribe({
            next: (result: Translation) => (this.portfolio = result),
        })
    }
}
