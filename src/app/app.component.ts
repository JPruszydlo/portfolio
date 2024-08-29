import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { PrimeNGConfig } from 'primeng/api'
import { NavbarComponent } from './components/navbar/navbar.component'
import { BannerComponent } from './components/banner/banner.component'
import { CvComponent } from './cv/cv.component'
import { AboutComponent } from './about/about.component'
import { PortfolioComponent } from './portfolio/portfolio.component'
import { ContactComponent } from './contact/contact.component'
import { LanguageService } from './language.service'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        NavbarComponent,
        BannerComponent,
        CvComponent,
        AboutComponent,
        PortfolioComponent,
        ContactComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    providers: [],
})
export class AppComponent implements OnInit {
    title = 'portfolio'

    constructor(private primengConfig: PrimeNGConfig, private lang: LanguageService) {}

    ngOnInit(): void {
        this.lang.setLang('pl')
        this.primengConfig.ripple = true
    }
}
