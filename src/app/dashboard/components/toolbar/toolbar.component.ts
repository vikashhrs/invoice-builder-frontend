import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { JwtService } from 'src/app/core/services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();

  @Input('toggleIcon') toggleIcon: Boolean = false;
  constructor(private _jwtService: JwtService, private _router: Router) { }

  ngOnInit() {
  }

  logout(){
    this._jwtService.destroyToken();
    this._router.navigate(['login']);
  }

}
