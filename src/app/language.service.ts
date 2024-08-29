import { HttpClient } from '@angular/common/http'
import { Injectable, OnInit, setTestabilityGetter } from '@angular/core'
import * as Transloco from '@jsverse/transloco'
import { concatAll, Observable, of, ReplaySubject, Subject } from 'rxjs'
import en from '../assets/i18n/en.json'
import pl from '../assets/i18n/pl.json'

@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    currentLang: { [key: string]: any } = pl
    langChange: Subject<any> = new Subject<any>()

    setLang(key: string) {
        this.currentLang = key == 'pl' ? pl : en
        this.langChange.next(this.currentLang)
    }

    getTranslation<T>(key: string): Subject<T> {
        let sub = new Subject<T>()
        this.langChange.subscribe({
            next: (value) => sub.next(this.currentLang[key] as T),
        })

        sub.next(this.currentLang[key] as T)
        return sub
    }
}
