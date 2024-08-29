import { CommonModule } from '@angular/common'
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    Pipe,
    PipeTransform,
    Renderer2,
    ViewChild,
} from '@angular/core'
import { LanguageService } from '../../language.service'

export type ButtonConfig = {
    name: string
    id: string
}

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
    @Input() pageItems: HTMLSpanElement[] = []
    downloadButtonText: string = ''
    @ViewChild('navbar') navElement: ElementRef
    @ViewChild('navItems') navItems: ElementRef
    @ViewChild('menuOpen') menuOpen: ElementRef
    @ViewChild('menuClose') menuClose: ElementRef

    navScrollHeight: string = 'h-12'
    panels: any = {}
    navBaseStyle: string = 'absolute h-16 '
    navScrollStyle = 'nav-on-scroll bg-neutral-600 ' + this.navScrollHeight
    navStyle: string = ''

    buttons: ButtonConfig[] = [
        { name: '', id: 'home' },
        { name: '', id: 'resume' },
        { name: '', id: 'about' },
        { name: '', id: 'portfolio' },
        { name: '', id: 'contact' },
    ]

    constructor(private lngService: LanguageService, private cdref: ChangeDetectorRef, private renderer: Renderer2) {
        this.navStyle = this.navBaseStyle
        lngService.getTranslation<{ [key: string]: string }>('navbar').subscribe({
            next: (result: { [key: string]: string }) => {
                for (let key in result) {
                    let buttonConfig = this.buttons.find((x) => x.id == key)
                    if (buttonConfig == undefined) continue
                    buttonConfig.name = result[key]
                }
                this.downloadButtonText = result['downloadButton']
            },
        })
    }

    toggleMenu() {
        if (this.menuOpen.nativeElement.classList.contains('menu-button-visible')) {
            this.menuOpen.nativeElement.classList.replace('menu-button-visible', 'menu-button-hidden')
            this.menuClose.nativeElement.classList.replace('menu-button-hidden', 'menu-button-visible')
            if (
                !this.navItems.nativeElement.classList.contains('nav-hidden') &&
                this.navItems.nativeElement.classList.contains('-left-1/2')
            ) {
                this.navItems.nativeElement.classList.replace('-left-1/2', 'nav-visible')
            }
            this.navItems.nativeElement.classList.replace('nav-hidden', 'nav-visible')
            return
        }
        this.navItems.nativeElement.classList.replace('nav-visible', 'nav-hidden')
        this.menuOpen.nativeElement.classList.replace('menu-button-hidden', 'menu-button-visible')
        this.menuClose.nativeElement.classList.replace('menu-button-visible', 'menu-button-hidden')
    }
    ngOnInit(): void {
        this.pageItems.forEach((x: HTMLSpanElement) => {
            this.panels[x.id] = x
        })
    }
    navigate(id: string) {
        let navHeight = parseInt(this.navScrollHeight.replace('h-', '')) * 4

        let el = this.panels[id]
        let offsetPosition = el.offsetTop - navHeight
        if (offsetPosition == 0 && id != 'home') return
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        })
        this.toggleMenu()
    }
    toggleMouseOver(hrItem: HTMLParagraphElement) {
        this.renderer.removeClass(hrItem, 'hr-hidden')
        this.renderer.addClass(hrItem, 'hr-visible')
        this.cdref.detectChanges()
    }
    toggleMouseOut(hrItem: HTMLParagraphElement) {
        this.renderer.removeClass(hrItem, 'hr-visible')
        this.renderer.addClass(hrItem, 'hr-hidden')
        this.cdref.detectChanges()
    }
    @HostListener('window:scroll', ['$event'])
    doSomething(event: any) {
        if (window.pageYOffset > 65) {
            this.navStyle = this.navScrollStyle
        } else {
            this.navStyle = this.navBaseStyle
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        if (window.innerWidth < 710) this.navScrollHeight = 'h-0'
        else {
            this.navItems.nativeElement.classList.replace('nav-visible', '-left-1/2')
            this.menuOpen.nativeElement.classList.replace('menu-button-hidden', 'menu-button-visible')
            this.menuClose.nativeElement.classList.replace('menu-button-visible', 'menu-button-hidden')
            this.navScrollHeight = 'h-12'
        }
    }

    setLanguage(code: string) {
        this.lngService.setLang(code)
    }
}
