import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  courses;
  course$;
  author$;
  subscription: Subscription;
  fireList: AngularFireList<{}>;

  constructor(private db: AngularFireDatabase) {
    this.fireList = this.db.list('/courses');
    this.courses = this.fireList.valueChanges();

    // this.subscription = this.fireList.valueChanges().subscribe(response => {
    //   this.courses = response;
    //   console.log(response);
    // });

    this.course$ = this.db.object('/courses/1').valueChanges();
    this.author$ = this.db.object('/author').valueChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  add(course: HTMLInputElement) {
    this.fireList.push({
      name: course.value,
      price: 123,
      sections: [
        { name: 'Directives' },
        { name: 'Pipes' }
      ]
    });
    course.value = '';
  }

  update(course) {
    this.fireList.update('5', { name: 'new name' });
    console.log(course.$key);
  }
}
