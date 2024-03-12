import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { contact } from '../contactmodel';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  data: any | contact[];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getcontact();
  }

  getcontact() {
    this.api.getcontact().subscribe((res) => {
      this.data = res;
    });
  }

  // delete
  delete(id: number) {
    this.api.deletecontact(id).subscribe((res) => {
      alert('contato deletado com sucesso!');
      this.getcontact();
    });
  }

  logout() {
    localStorage.removeItem('logindata');
  }
}
