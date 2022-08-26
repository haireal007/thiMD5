import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Tour} from "../../model/Tour";
import {TourService} from "../../service/tour.service";

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit,OnChanges {
  tours: Tour[] = []
  constructor(private tourService:TourService) { }

  ngOnInit(): void {
    this.tourService.getAll().subscribe((data)=>{
      this.tours = data
    })

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.tourService.getAll().subscribe((data)=>{
      this.tours = data
    })
  }
  search(input: any) {
    this.tourService.getAll().subscribe((data) => {
      let toursSearch:Tour[]=[]
      for (const d of data) {
        if (d.title.toLowerCase().normalize('NFD') .replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd').replace(/Đ/g, 'D').includes(input.toLowerCase().normalize('NFD') .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D'))){
          toursSearch.push(d)
        }
      }
      console.log(toursSearch)
      this.tours=toursSearch;
    })
  }


}
