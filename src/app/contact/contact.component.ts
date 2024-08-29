import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { LanguageService } from '../language.service'
import { __values } from 'tslib'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MessageService } from 'primeng/api'
import { ElementRef } from '@angular/core'
import { InputMaskModule } from 'primeng/inputmask'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment'

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
export type Contact = {
    name: string
    phone: string
    email: string
    message: string
}
@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [ReactiveFormsModule, InputMaskModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css',
})
export class ContactComponent implements AfterViewInit {
    @ViewChild('formName') formName: ElementRef
    @ViewChild('formPhone') formPhone: ElementRef
    @ViewChild('formEmail') formEmail: ElementRef
    @ViewChild('formMessage') formMessage: ElementRef

    inputItems: { [key: string]: ElementRef } = {}

    contactForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        message: new FormControl('', [Validators.required]),
    })
    contact: Translation | undefined
    constructor(private lang: LanguageService, private toast: MessageService, private http: HttpClient) {
        lang.getTranslation<Translation>('contact').subscribe({
            next: (value: Translation) => (this.contact = value),
        })
    }
    ngAfterViewInit(): void {
        this.inputItems = {
            name: this.formName,
            phone: this.formPhone,
            email: this.formEmail,
            message: this.formMessage,
        }
    }
    numberOnly(event: any): boolean {
        const charCode = event.which ? event.which : event.keyCode
        if (charCode == 43 && event.target.value == '') {
            return true
        }
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false
        }
        return true
    }
    sendMessage() {
        let validationResult = this.contactForm.valid
        let invalidStyle = '1px solid red'
        if (!validationResult) {
            Object.keys(this.contactForm.controls).forEach((key: any) => {
                let formItem = this.contactForm.get(key)
                if (formItem != undefined) {
                    this.inputItems[key].nativeElement.style.border = formItem.errors == undefined ? '' : invalidStyle
                    setTimeout(() => {
                        this.inputItems[key].nativeElement.style.border = ''
                    }, 2000)
                }
            })
            this.toast.add({
                severity: 'warn',
                summary: 'Znaleziono błędy',
                detail: 'Formularz zawiera błędy, popraw je i spróbuj jeszcze raz',
                life: 8000,
            })
            return
        }

        let formData = this.contactForm.value as Contact
        let url = 'https://api.gk-system.myshort.pl/email/send'
        let user = environment.apiUser
        let pass = environment.apiPassword
        var header = {
            headers: new HttpHeaders().set('Authorization', `Basic ${btoa(`${user}:${pass}`)}`),
        }
        this.http.post(url, formData, header).subscribe({
            next: () => {
                this.toast.add({
                    severity: 'success',
                    summary: '',
                    detail: 'Dziękuje za kontakt, postaram się odpowiedzieć jak najszybciej to będzie możliwe',
                    life: 8000,
                })
                for (let item in this.inputItems) {
                    this.contactForm.controls.name.setValue('')
                    this.contactForm.controls.phone.setValue('')
                    this.contactForm.controls.email.setValue('')
                    this.contactForm.controls.message.setValue('')
                }
            },
            error: () => {
                this.toast.add({
                    severity: 'error',
                    summary: 'Coś poszło nie tak',
                    detail: 'Zadzwoń proszę do mnie lub napisz SMS',
                    life: 6000,
                })
            },
        })
    }
}
