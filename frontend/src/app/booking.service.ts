import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }

  checkslot(data:any)
  {
return this.http.post("http://localhost:3000/checkslot",{item:data});
  }

  bookslot(data:any)
  {
    return this.http.post("http://localhost:3000/book-hall",{item:data});
  }

  getbookingdetails(user:any)
  {
 return this.http.post("http://localhost:3000/getbookingdetail",{item:user});
  }

  getbookingdata(user:any)
  {
 return this.http.get("http://localhost:3000/getbookingdetails");
  }

  deletebooking(item:any)
  {
   return this.http.post("http://localhost:3000/deletebooking",{"id":item});
  }

  currentbooking(user:any)
  {
    return this.http.get("http://localhost:3000/currentbookings");
  }

}
