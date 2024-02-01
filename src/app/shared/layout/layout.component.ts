import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatToolbarModule, MatSidenavModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  opened = true;

  public open() {
    if (this.opened) {
      this.opened = !this.opened;
    } else {
      this.opened = !this.opened;
    }

  }
}
