import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { INavbar } from 'src/app/viewmodels/INavbar';
import { AuthService } from 'src/app/auths/services/auth.service';

@Component({
  selector: 'app-secondary-nav',
  templateUrl: './secondary-nav.component.html',
  styleUrls: ['./secondary-nav.component.css']
})
export class SecondaryNavComponent implements OnInit {

  @Input() model: INavbar;
  @Output() logoutInit = new EventEmitter();


  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  logOut() {
    this.model = {
      isAuthenticated: false,
      name: null,
      role: ''
    };
    this.logoutInit.emit(true);
  }
}
