import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-current-booking',
  templateUrl: './current-booking.component.html',
  styleUrls: ['./current-booking.component.css']
})
export class CurrentBookingComponent implements OnInit {

  username:any
  bookings:any
  i:any
  id:any;
 

  constructor(private bookingservice:BookingService) { }

  ngOnInit(): void {
    this.bookingservice.currentbooking(this.username)
    .subscribe(res=>{
      this.bookings=res;
      console.log(this.bookings[0].Date);

      for (this.i of this.bookings)
      {
        this.i.Date=((this.i.Date).split('T')[0]);
        this.i.fromTime=new Date(this.i.fromTime);
        this.i.toTime=new Date(this.i.toTime);   
        this.i.fromTime=((this.i.fromTime).toLocaleTimeString());
        this.i.toTime=((this.i.toTime).toLocaleTimeString());    
      }
    })
  }
  }


