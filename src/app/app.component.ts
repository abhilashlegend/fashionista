import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title){

  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event:any) => event instanceof NavigationEnd),
      map(() => {
        const child: ActivatedRoute | null = this.activatedRoute.firstChild;
        let title = child && child.snapshot.data['title'];
        if(title){
          return title;
        }
      })
    )
    .subscribe(title => {
      if(title){
        this.titleService.setTitle(`Fashionista - ${title}`)
      }
    });
  }

}
