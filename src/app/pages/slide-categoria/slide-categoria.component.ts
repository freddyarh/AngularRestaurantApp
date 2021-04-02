import { AfterViewInit, Component, OnInit } from '@angular/core';

// import { SwiperModule } from 'swiper/angular';

import Swiper from 'swiper';

@Component({
  selector: 'app-slide-categoria',
  templateUrl: './slide-categoria.component.html',
  styleUrls: ['./slide-categoria.component.css']
})

export class SlideCategoriaComponent implements OnInit, AfterViewInit {

  constructor() { }
  ngAfterViewInit(): void {

    setTimeout(function(){
    
      const swiper = new Swiper('.swiper-container', {
        // Optional parameters  
        loop: true
        
      });
    
    }, 1000);
  

    
   
  }

  ngOnInit() {
  }

}
