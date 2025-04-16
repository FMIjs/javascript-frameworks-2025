import {
  Component,
  computed,
  effect,
  HostBinding,
  Inject,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { API_URL } from '../injection-tokens';
import { UserService } from './user.service';
import { MyIfDirective } from './my-if.directive';
import { DatePipe, NgFor } from '@angular/common';
import { MyForDirective } from './my-for.directive';
import { MyButtonComponent } from './my-button/my-button.component';
import { debounceTime, single, throttleTime } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';
import { TestPipe } from './test.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [FormsModule, TestPipe, DatePipe],
  // imports: [MyIfDirective, MyForDirective, MyButtonComponent],
})
export class AppComponent {
  currentDate = new Date();
  myInputValue = signal('');
  myOtherValue = computed(() => {
    return `${this.myInputValue()} (${this.myInputValue().length})`;
  });

  constructor() {
    // toObservable(this.myInputValue)
    //   .pipe(debounceTime(1000))
    //   .subscribe(console.log);
    // effect(() => {
    //   console.log(this.myInputValue());
    // });
  }
  // @ViewChild('myButton') myButton!: MyButtonComponent;

  // // @HostBinding('class.test') value = true;
  // private msalService = inject(MsalService);
  // private userService = inject(UserService);
  // private apiUrl = inject<string>(API_URL);

  // isLoggedIn = false;
  // username: string | null = null;
  // show = false;

  // stringArray = ['One', 'Two', 'Three'];

  // ngAfterViewInit() {
  //   console.log(this.myButton);
  // }

  // constructor() {
  //   // @Inject(API_URL) private apiURL: string // private userService: UserService, // private msalService: MsalService,
  //   // console.log(this.apiURL);
  //   // Check if already logged in
  //   const account = this.msalService.instance.getActiveAccount();
  //   if (account) {
  //     this.isLoggedIn = true;
  //     this.username = account.username;
  //   }

  //   // Handle redirect result (for loginRedirect flow)
  //   this.msalService.instance.handleRedirectPromise().then((result) => {
  //     if (result?.account) {
  //       this.msalService.instance.setActiveAccount(result.account);
  //       this.isLoggedIn = true;
  //       this.username = result.account.username;
  //     }
  //   });
  // }

  // login() {
  //   this.msalService.loginRedirect();
  // }

  // logout() {
  //   const account = this.msalService.instance.getActiveAccount();

  //   this.msalService
  //     .logoutPopup({
  //       account,
  //       mainWindowRedirectUri: '/', // optional: where to "reset" the app after logout
  //     })
  //     .subscribe({
  //       next: (val) => {
  //         console.log('logout next', val);
  //       },
  //       error: (err) => {
  //         console.error('Logout failed:', err);
  //       },
  //       complete: () => {
  //         console.log('Completed');
  //       },
  //     });
  // }

  // toggleShow() {
  //   this.show = !this.show;
  // }

  // @memoize()
  // test(aa) {

  // }
}
