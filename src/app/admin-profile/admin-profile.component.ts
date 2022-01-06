import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AdminService } from '../services/admin-prof/admin.service';
@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  displayedColumns: string[] = ['fullName', 'email', 'userMobile', 'role'];
  dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _adminService: AdminService) { }

  ngOnInit() {
    this.getAllUsers()
    this.dataSource.paginator = this.paginator;

  }

  getAllUsers() {
    this._adminService.getAllUsers()
      .subscribe(res => {
        console.log("all users", res)
        this.dataSource = res

      },
        err => {
          console.log("error on getting all users", err)

        })
  }

}
