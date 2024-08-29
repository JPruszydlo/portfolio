import { NgFor } from '@angular/common'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

type Item = {
    src: string
    class: string
    zIndex: string
}

@Component({
    selector: 'app-carousel',
    standalone: true,
    imports: [NgFor],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit {
    @Input({ required: true }) images: string[] = []
    @Input() interval: number = 2000
    @Output() onClick: EventEmitter<void> = new EventEmitter<void>()
    idx: number = 0
    items: Item[] = []
    constructor() {}
    ngOnInit(): void {
        this.items = this.images.map((x: string) => {
            return { src: x, class: 'opacity-0', zIndex: 'z-0' }
        })
        this.items[0].class = 'show-item'
        setInterval(() => this.next(), this.interval)
    }

    next() {
        let lastIdx = this.idx

        if (this.idx == this.items.length - 1) {
            lastIdx = this.idx
            this.idx = 0
        } else {
            this.idx++
        }
        setTimeout(() => {
            this.items[lastIdx].class = 'opacity-0'
        }, 700)

        this.items[lastIdx].zIndex = 'z-0'
        this.items[this.idx].zIndex = 'z-10'
        this.items[this.idx].class = 'show-item'
    }
}
